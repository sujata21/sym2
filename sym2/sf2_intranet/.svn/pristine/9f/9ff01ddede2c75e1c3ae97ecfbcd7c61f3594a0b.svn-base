<?php

namespace Application\LDAPBundle\Command;

use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Application\LDAPBundle\Service\LDAPServer;
use Application\LDAPBundle\Entity\LDAPUser;
use FOS\UserBundle\Util\UserManipulator;


class LDAPUserImportCommand extends ContainerAwareCommand {

    
	protected function configure()
	{
		$this
		->setName('ldap:user:import')
		->setDescription('Import LDAP Users');
	}

	protected function execute(InputInterface $input, OutputInterface $output)
	{
		$em = $this->getContainer()->get('doctrine')->getEntityManager();
				
		$ldapUserService = $this->getContainer()->get('application_ldap_user_service');
		
		$ldapUserService->initialize();
		
		$users = $ldapUserService->getUsers();

		foreach($users as $user){
			//to check if the user already exist in fos-user User table
			//$usermanager = $this->userManager();
			//var_dump($user);
			
			$usr = $em->getRepository('ApplicationLDAPBundle:LDAPUser')->findOneByUsername(trim($user['uid']));

			if(is_object($usr)){

                $usr->setUsername(trim($user['uid']));
				if(!isset($user['givenname'])){
					$user['givenname'] = ucfirst($user['uid']);
				}
                $usr->setFirstname($user['givenname']);
				$email = trim($user['uid']).'@alchemyworx.com';
                $usr->setEmail($email);
                if(isset($user['shadowlastchange'])){
                    $usr->setShadowLastChange($user['shadowlastchange']);
                }
                $usr->setEnabled(true);
				$em->persist($usr);
			}else{
				//to create fos user
				$username = ucfirst($user['uid']);
				$email = trim($user['uid']).'@alchemyworx.com';
					if(isset($user['userpassword'])){
						$password = $user['userpassword'];
					}

				$manipulator = $this->getContainer()->get('fos_user.util.user_manipulator');
				$fosuser = $manipulator->create($username, 'test', $email,true,0);
				//var_dump($fosuser);

				$usr = new LDAPUser();
				$usr->setUsername(trim($user['uid']));
					if(!isset($user['givenname'])){
						$user['givenname'] = ucfirst($user['uid']);
					}
                $usr->setFirstname($user['givenname']);
				$email = trim($user['uid']).'@alchemyworx.com';
                $usr->setEmail($email);
                	if(isset($user['shadowlastchange'])){
                    	$usr->setShadowLastChange($user['shadowlastchange']);
                	}
             
                $usr->setUserId($fosuser);
                $usr->setEnabled(true);

				$em->persist($usr);
			}

		}
		$em->flush();
	}

}