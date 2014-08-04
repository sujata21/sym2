<?php

namespace Application\LDAPBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * LDAPMailAlias
 *
 * @ORM\Table(name="ldap_mail_alias")
 * @ORM\Entity(repositoryClass="Application\LDAPBundle\Entity\LDAPMailAliasRepository")
 * @ORM\HasLifecycleCallbacks()
 */
class LDAPMailAlias
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=50)
     */
    private $name;
    /**
     * @ORM\ManyToOne(targetEntity="Application\Sonata\UserBundle\Entity\User")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="id", nullable=true)
     *
     **/
    private $user_id;
    /**
     * @var \DateTime
     *
     * @ORM\Column(name="updated_at", type="datetime",nullable=true)
     */
    private $updated_at;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="created_at", type="datetime",nullable=true)
     */
    private $created_at;

    /**
     * @var integer
     *
     * @ORM\Column(name="deleted", type="integer", length=1,nullable=true)
     */
    private $deleted;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="deleted_at", type="datetime",nullable=true)
     */
    private $deleted_at;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="synchronized_at", type="datetime", nullable=true)
     */
    private $synchronized_at;


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
     * Set name
     *
     * @param string $name
     * @return LDAPMailAlias
     */
    public function setName($name)
    {
        $this->name = $name;
    
        return $this;
    }

    /**
     * Get name
     *
     * @return string 
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set updated_at
     *
     * @param \DateTime $updatedAt
     * @return LDAPMailAlias
     */
    public function setUpdatedAt($updatedAt)
    {
        $this->updated_at = $updatedAt;
    
        return $this;
    }

    /**
     * Get updated_at
     *
     * @return \DateTime 
     */
    public function getUpdatedAt()
    {
        return $this->updated_at;
    }

    /**
     * Set created_at
     *
     * @param \DateTime $createdAt
     * @return LDAPMailAlias
     */
    public function setCreatedAt($createdAt)
    {
        $this->created_at = $createdAt;
    
        return $this;
    }

    /**
     * Get created_at
     *
     * @return \DateTime 
     */
    public function getCreatedAt()
    {
        return $this->created_at;
    }
    /**
     * @ORM\PrePersist
     */
    public function setCreatedAtValue()
    {
        if(!$this->getCreatedAt())
        {
            $this->created_at = new \DateTime();
        }
    }
    /**
     * Set deleted
     *
     * @param integer $deleted
     * @return LDAPMailAlias
     */
    public function setDeleted($deleted)
    {
        $this->deleted = $deleted;
    
        return $this;
    }

    /**
     * Get deleted
     *
     * @return integer 
     */
    public function getDeleted()
    {
        return $this->deleted;
    }

    /**
     * Set deleted_at
     *
     * @param \DateTime $deletedAt
     * @return LDAPMailAlias
     */
    public function setDeletedAt($deletedAt)
    {
        $this->deleted_at = $deletedAt;
    
        return $this;
    }

    /**
     * Get deleted_at
     *
     * @return \DateTime 
     */
    public function getDeletedAt()
    {
        return $this->deleted_at;
    }

    /**
     * Set synchronized_at
     *
     * @param \DateTime $synchronizedAt
     * @return LDAPMailAlias
     */
    public function setSynchronizedAt($synchronizedAt)
    {
        $this->synchronized_at = $synchronizedAt;
    
        return $this;
    }

    /**
     * Get synchronized_at
     *
     * @return \DateTime 
     */
    public function getSynchronizedAt()
    {
        return $this->synchronized_at;
    }
    /**
     * Set user_id
     *
     * @param \Application\Sonata\UserBundle\Entity\User $userId
     * @return LDAPUser
     */
    public function setUserId(\Application\Sonata\UserBundle\Entity\User $userId = null)
    {
        $this->user_id = $userId;

        return $this;
    }

    /**
     * Get user_id
     *
     * @return \Application\Sonata\UserBundle\Entity\User
     */
    public function getUserId()
    {
        return $this->user_id;
    }
    public function __toString(){
        return $this->getName();
    }
}