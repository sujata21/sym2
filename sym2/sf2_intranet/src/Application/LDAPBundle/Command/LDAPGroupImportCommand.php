<?php

namespace Application\LDAPBundle\Command;

use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Application\LDAPBundle\Service\LDAPServer;
use Application\LDAPBundle\Entity\LDAPGroup;
use Application\LDAPBundle\Entity\LDAPUserGroup;
use Application\LDAPBundle\Entity\LDAPMailAlias;
use Application\LDAPBundle\Entity\LDAPMailAliasUser;

class LDAPGroupImportCommand extends ContainerAwareCommand {

	protected function configure()
	{
		$this
		->setName('ldap:group:import')
		->setDescription('Import LDAP Groups');
		//->setDefinition(array(new InputArgument('owner', InputArgument::REQUIRED, 'The group owner')));
	}

	protected function execute(InputInterface $input, OutputInterface $output)
	{
		$em = $this->getContainer()->get('doctrine')->getEntityManager();
				
		$ldapGroupService = $this->getContainer()->get('application_ldap_group_service');
		
		$ldapGroupService->initialize();
		
		$groups = $ldapGroupService->getGroups();
		//var_dump($groups); 
		$group_owner = $em->getRepository('ApplicationLDAPBundle:LDAPUser')->findOneByUsername('admin');	
		$owner = $group_owner->getUserId();
		foreach($groups as $group){						
			$grp = $em->getRepository('ApplicationLDAPBundle:LDAPGroup')->findByName(trim($group['cn']));								
			if( !is_array($grp) || (is_array($grp) && count($grp)==0)){
				//echo $group['cn'];
				//var_dump($group);
				$mailalias = str_replace(' ', '_',strtolower(trim($group['cn']).'@alchemyworx.com'));
				//Create mail alias for every group
				$entity_alias  = new LDAPMailAlias();
        		$entity_alias->setName($mailalias);
        		$entity_alias->setUserId($owner);
        		$em->persist($entity_alias);
        		$em->flush();
        		

				$ldapGroup = new LDAPGroup();				
				$ldapGroup->setName(trim($group['cn']));
				if(!isset($group['description'])){
					$group['description'] = $group['cn']." Group";
				}
				$ldapGroup->setDescription($group['description']);
				$ldapGroup->setUserId($owner);
				$ldapGroup->setMailAlias($mailalias);
				$ldapGroup->setLdapMailAlias($entity_alias);
				$em->persist($ldapGroup);	
				$em->flush();			
				// save the group user
				if(isset($group['memberuid'])){
        			if(is_array($group['memberuid'])){
        				foreach($group['memberuid'] as $groupuser){
        					$this->createGroupUser($groupuser,$ldapGroup->getId(),$entity_alias->getId());
        				}
        			
        			}else{
        				$this->createGroupUser($group['memberuid'],$ldapGroup->getId(),$entity_alias->getId());

        			}
        		}
			}		
		}
		//$em->flush();
	}
	public function createGroupUser($user,$groupid,$aliasid){
		if($user != ''){
			//var_dump($user);
				
			$user_array = explode(',',$user);
			foreach($user_array as $username){
				//echo $username;
				$em = $this->getContainer()->get('doctrine')->getEntityManager();
				//get ldap user object
				$ldap_user = $em->getRepository('ApplicationLDAPBundle:LDAPUser')->findOneByUsername(trim($username));
				if (!($ldap_user == NULL)) {
					//echo $ldap_user->getUsername();
					//get ldap alias object
					$group = $em->getRepository('ApplicationLDAPBundle:LDAPGroup')->find($groupid);


					$alias = $em->getRepository('ApplicationLDAPBundle:LDAPMailAlias')->find($aliasid);
					
				 	//create new record for mail alias
					$group_user = new LDAPUserGroup();
        			$group_user->setLdapUser($ldap_user);
        			$group_user->setLdapGroup($group);
        			$em->persist($group_user);
        			$em->flush();

        			$alias_user = new LDAPMailAliasUser();
        			$alias_user->setLdapUser($ldap_user);
        			$alias_user->setLdapMailAlias($alias);
        			$alias_user->setSubscribe(1);
        			$alias_user->setStatus(0);
        			$em->persist($alias_user);
        			$em->flush();
				}
				
			}
			
		}
	}
}