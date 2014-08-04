<?php
namespace  Application\LDAPBundle\Service;

use Symfony\Bundle\FrameworkBundle\Console\Application;

use Application\LDAPBundle\Service\LDAPServer;
use Doctrine\ORM\EntityManager;

class Service
{
	protected $ldapServer;
	protected $em;
	/**
	 * Constructor.
	 *
	 */
	public function __construct(EntityManager $em, $ldapServer){
		$this->em = $em;
		$this->ldapServer = $ldapServer;
	}

	public function getUser($username){	
    	return $this->em->getRepository('ApplicationSonataUserBundle:User')->findByUsername($username);		
	}

	public function authenticate($user, $password){
		if($this->ldapServer->connect()){
			
			if($this->ldapServer->bind($user, $password)){				
				return true;
			}
		}
		return false;
	}
}