<?php
namespace Application\LDAPBundle\Security\Core\User;

use Symfony\Component\Security\Core\User\UserProviderInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\Exception\UsernameNotFoundException;
use Symfony\Component\Security\Core\Exception\UnsupportedUserException;
use Application\LDAPBundle\Service\Service;
use Doctrine\ORM\EntityManager;

class LDAPUserProvider implements UserProviderInterface
{
	private $service;
	private $em;
	private $userClass;
	
	public function __construct(Service $service, EntityManager $em, $userClass)
	{
		$this->service  = $service;
		$this->em       = $em;
		$this->userClass = $userClass;
	}

	public function loadUserByUsername($username)
	{		
		// Do we have a local record?
		if ($user = $this->findUserBy(array('username' => $username))) {
			return $user;
		}

		// Try service
		if ($record = $this->service->getUser($username)) {			
			$record->setLastLogin(date('Y-m-d H:i:s'));				
			return $record;
		} else {
			$user = new $this->userClass();
			$user->setUsername($username);
			$user->setPassword('!password');
			$email = $username.'@alchemyworx.com';				
			$user->setEmail($email);
			$user->setEnabled(true);			
			// Get groups
			//set groups
			return $user;
		}
		throw new UsernameNotFoundException(sprintf('No record found for user %s', $username));
	}

	public function refreshUser(UserInterface $user)
	{
		return $this->loadUserByUsername($user->getUsername());
	}

	public function supportsClass($class)
	{
		return $class === $this->userClass;
	}

	protected function findUserBy(array $criteria)
	{	
		$repository = $this->em->getRepository($this->userClass);
		return $repository->findOneBy($criteria);
	}
}