<?php

namespace Application\LDAPBundle\Command;

use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Application\LDAPBundle\Service\LDAPServer;
use Application\LDAPBundle\Entity\LDAPGroup;
use Application\LDAPBundle\Entity\LDAPMailAlias;


class LDAPGroupAddCommand extends ContainerAwareCommand {

	protected function configure()
	{
		$this
		->setName('ldap:group:add')
		->setDescription('Add LDAP Groups');
		//->setDefinition(array(new InputArgument('owner', InputArgument::REQUIRED, 'The group owner')));
	}

	protected function execute(InputInterface $input, OutputInterface $output)
	{
		$filename = "/tmp/intranet/groupadd.log";
			if(file_exists($filename)){
				$handle = fopen($filename, "r");
				$contents = fread($handle, filesize($filename));
				fclose($handle);
			}
		$group_name = explode(' ',$contents);
		var_dump($group_name);
		//die();
		$ldapGroupService = $this->get('application_ldap_group_service');
		$ldapGroupService->initialize();
		foreach ($group_name as $value) {
			$groups = $ldapGroupService->getGroup($grp_name);
			$output = array();
			if($groups == NULL){
				$cmd = "sudo smbldap-groupadd \"$grp_name\"";
			}else{
				$cmd = "sudo smbldap-groupmod -n \"$grp_name\" \"$grp_newname\" ";
			
			}
			try {
				echo $result = exec($cmd);

			} catch(Exception $e){
				echo "$e\n";
			}
		}
		
	}
}