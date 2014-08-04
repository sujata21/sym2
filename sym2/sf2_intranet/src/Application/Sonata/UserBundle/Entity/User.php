<?php

namespace Application\Sonata\UserBundle\Entity;

use Application\Sonata\UserBundle\Model\User as AbstractedUser;
use Doctrine\ORM\Mapping as ORM;

/**
 * 
 *
 */
class User extends AbstractedUser
{
    /**
     * @var integer
     */
    protected $id;

    /**
     * @var \Doctrine\Common\Collections\Collection
     */
    protected $groups;
    

    /**
     * Constructor
     */
    public function __construct()
    {
    	parent::__construct();
    	$this->groups = new \Doctrine\Common\Collections\ArrayCollection();
    }
    
    
    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }
      

    /**
     * Add groups
     *
     * @param \Application\Sonata\UserBundle\Entity\Group $groups
     * @return User
     */
    public function addGroup(\FOS\UserBundle\Model\GroupInterface $groups)
    {
        $this->groups[] = $groups;
    
        return $this;
    }

    /**
     * Remove groups
     *
     * @param \Application\Sonata\UserBundle\Entity\Group $groups
     */
    public function removeGroup(\FOS\UserBundle\Model\GroupInterface $groups)
    {
        $this->groups->removeElement($groups);
    }

    /**
     * Get groups
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getGroups()
    {
        return $this->groups;
    }
    
    public function __toString(){
    	return $this->getUsername();
    }
}