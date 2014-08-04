<?php

namespace Application\LDAPBundle\Entity;

use Doctrine\ORM\EntityRepository;

/**
 * LDAPUserGroupRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class LDAPUserGroupRepository extends EntityRepository
{
	public function getGroupUsers($groupId = -1){
						
		return $this->getEntityManager()		
			->createQueryBuilder('ug')
									->select('u')	
									->from('ApplicationLDAPBundle:LDAPUserGroup', 'ug')								
									->leftjoin('ApplicationLDAPBundle:LDAPUser', 'u', 'WITH', 'u.id=ug.ldapUser')									
									->where('ug.ldapGroup = :group_id')
									->setParameter('group_id', $groupId)									
									->orderBy('u.id', 'ASC')		
		->getQuery()
		->getArrayResult();		
	}
	
	public function deleteGroupUser($groupId, $userId){
		$this->getEntityManager()
		->createQuery('delete ApplicationLDAPBundle:LDAPUserGroup ug WHERE ug.ldapGroup = :group_id and ug.ldapUser = :user_id')
		->setParameter('user_id', $userId)
		->setParameter('group_id', $groupId)
		->execute()
		;
	}
	
	public function addGroupUser($group, $user){	
		
		$ug = new LDAPUserGroup();
		$ug->setLdapGroup($group);
		$ug->setLdapUser($user);		
		$this->getEntityManager()->persist($ug);
		$this->getEntityManager()->flush();
		
	}
}
