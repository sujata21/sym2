<?php
namespace Application\LDAPBundle\Command;

use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Application\LDAPBundle\Service\LDAPServer;

use Application\LDAPBundle\Entity\LDAPMailAlias;
use Application\LDAPBundle\Entity\LDAPMailAliasUser;


class LDAPMailAliasUpdateCommand extends ContainerAwareCommand {

	protected function configure()
	{
		$this
		->setName('ldap:mailalias:update')
		->setDescription('Update LDAP Mail Alias with from Intranet DB');
		//->setDefinition(array(new InputArgument('owner', InputArgument::REQUIRED, 'The group owner')));
	}
	protected function execute(InputInterface $input, OutputInterface $output)
	{
		

		//fetch all mail alias from db to compare and add the difference to Ldap
		$this->addMailAliasLdap();

		//add mail alias user to ldap from intranet Db
		$this->addMailAliasUserLdap();

				
	}
	public function getAliasusers($user){
		//Update the Mail Alias User
		$ldap_mailalias_username_arr = array();
		if($user != ''){
        		if(isset($user)){
        			if(is_array($user)){
        				foreach($user as $MailUser){
        					$user_array = explode(',',$MailUser);
							$username = explode('=',$user_array[0]);
							array_push($ldap_mailalias_username_arr, $username[1]);
						}
        			}else{
        				$user_array = explode(',',$user);
        				$username = explode('=',$user_array[0]);
        				array_push($ldap_mailalias_username_arr, $username[1]);

        			}
        		}

    	}
    	//var_dump($ldap_mailalias_username_arr);
		return $ldap_mailalias_username_arr ;

	}
	public function addMailAliasLdap(){
		$em = $this->getContainer()->get('doctrine')->getEntityManager();
		$ldapMailAliasService = $this->getContainer()->get('application_ldap_mailalias_service');
		
		$ldapMailAliasService->initialize();
		
		$MailAlias = $ldapMailAliasService->getAllMailAlias();
		$mail_alias = array();
		foreach ($MailAlias as $alias) {
			//var_dump($alias['cn']);
			array_push($mail_alias, strtolower($alias['cn']));
		}

		$alias_name = array();
		$db_alias = $em->getRepository('ApplicationLDAPBundle:LDAPMailAlias')->findAll();
		foreach ($db_alias as $row) {
			$alias_name_arr = explode("@",$row->getName());
			array_push($alias_name, strtolower($alias_name_arr[0]));
		
		}

		$not_in_ldap_alias = array_diff($alias_name,$mail_alias );
		var_dump($not_in_ldap_alias);
		foreach ($not_in_ldap_alias as $key => $value) {
			//add mail alias to Ldap 
        	      // echo $value; echo "\n";     
            $MailAlias_array = array( 'name'      => $value
                      , 'description'       => $value.' mail group'
                      , 'objectclass'       => 'groupOfNames'
                      , 'member'            =>  ''
        );
            $result_mailAlias = $ldapMailAliasService->addMailAlias($MailAlias_array);
		}

	}
	public function addMailAliasUserLdap(){
		$em = $this->getContainer()->get('doctrine')->getEntityManager();
		$ldapMailAliasService = $this->getContainer()->get('application_ldap_mailalias_service');
		
		$ldapMailAliasService->initialize();
		
		$MailAlias = $ldapMailAliasService->getAllMailAlias();
		/*$mail_alias = array();
		foreach ($MailAlias as $alias) {
			//var_dump($alias['cn']);
			array_push($mail_alias, $alias['cn']);
		}*/
		foreach ($MailAlias as $alias) {
			//var_dump($alias['cn']);
			$ldap_mailuser = $this->getAliasusers($alias['member']);
			//get all the users for this mail alias
			$alias_name_str = $alias['cn'].'@alchemyworx.com';
            $entity_alias = $em->getRepository('ApplicationLDAPBundle:LDAPMailAlias')->findOneBy(array('name'=>$alias_name_str));

			$entity_mail_alias_user = $em->getRepository('ApplicationLDAPBundle:LDAPMailAliasUser')->findBy(array('ldapMailAlias'=>$entity_alias));
			//echo count($entity_mail_alias_user);

			//echo "\n";
				if(count($entity_mail_alias_user)){
					foreach ($entity_mail_alias_user as $row) {
						if($row->getLdapUser() != NUll){
							//echo $row->getLdapUser()->getLastname();
							if(!in_array($row->getLdapUser()->getUserName(), $ldap_mailuser)){

								echo $row->getLdapUser()->getUserName().' user not in alias '.$alias['cn']."\n";

								$result = $ldapMailAliasService->saveMailAliasUser($alias['cn'],$row->getLdapUser()->getUserName());
							}
						}
						
							
					}
				}
		}

	}
}