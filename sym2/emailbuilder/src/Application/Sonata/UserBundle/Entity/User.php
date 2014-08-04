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
        return parent::__construct();
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
      

    
    public function __toString(){
    	return $this->getUsername();
    }
}