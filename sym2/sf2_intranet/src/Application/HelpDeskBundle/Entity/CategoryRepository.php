<?php

namespace Application\HelpDeskBundle\Entity;

use Doctrine\ORM\EntityRepository;

/**
 * CategoryRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class CategoryRepository extends EntityRepository
{
	public function findByParentCategory($categoryId){
	
		return $this->getEntityManager()
		->createQuery('
				SELECT c FROM ApplicationHelpDeskBundle:Category c
				WHERE c.parent = :parent_id'
		)
		->setParameter('parent_id', $categoryId)
		->getResult();
	
	}
}
