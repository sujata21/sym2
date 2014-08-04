<?php

namespace Application\LDAPBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * LDAPMailAliasUser
 *
 * @ORM\Table(name="ldap_mail_alias_user")
 * @ORM\Entity(repositoryClass="Application\LDAPBundle\Entity\LDAPMailAliasUserRepository")
 * @ORM\HasLifecycleCallbacks()
 */
class LDAPMailAliasUser
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
     * @ORM\ManyToOne(targetEntity="LDAPUser")
     * @ORM\JoinColumn(name="ldap_user_id", referencedColumnName="id",onDelete="CASCADE")
     **/
    private $ldapUser;
   
    /**
     * @ORM\ManyToOne(targetEntity="LDAPMailAlias")
     * @ORM\JoinColumn(name="ldap_mail_alias_id", referencedColumnName="id",onDelete="CASCADE")
     **/
    private $ldapMailAlias;
    
    /**
     * @var \DateTime
     *
     * @ORM\Column(name="updated_at", type="datetime", nullable=true)
     */
    private $updated_at;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="created_at", type="datetime")
     */
    private $created_at;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="synchronized_at", type="datetime", nullable=true)
     */
    private $synchronized_at;
    /**
     * @var integer
     *
     * @ORM\Column(name="subscribe", type="integer", length=1,nullable=true)
     */
    private $subscribe;
     /**
     * @var integer
     *
     * @ORM\Column(name="status", type="integer", length=1,nullable=true)
     */
    private $status;

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
     * Set updated_at
     *
     * @param \DateTime $updatedAt
     * @return LDAPMailAliasUser
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
     * @return LDAPMailAliasUser
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
     * Set synchronized_at
     *
     * @param \DateTime $synchronizedAt
     * @return LDAPMailAliasUser
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
     * Set ldapUser
     *
     * @param \Application\LDAPBundle\Entity\LDAPUser $ldapUser
     * @return LDAPMailAliasUser
     */
    public function setLdapUser(\Application\LDAPBundle\Entity\LDAPUser $ldapUser = null)
    {
        $this->ldapUser = $ldapUser;
    
        return $this;
    }

    /**
     * Get ldapUser
     *
     * @return \Application\LDAPBundle\Entity\LDAPUser 
     */
    public function getLdapUser()
    {
        return $this->ldapUser;
    }

    /**
     * Set ldapMailAlias
     *
     * @param \Application\LDAPBundle\Entity\LDAPMailAlias $ldapMailAlias
     * @return LDAPMailAliasUser
     */
    public function setLdapMailAlias(\Application\LDAPBundle\Entity\LDAPMailAlias $ldapMailAlias = null)
    {
        $this->ldapMailAlias = $ldapMailAlias;
    
        return $this;
    }

    /**
     * Get ldapMailAlias
     *
     * @return \Application\LDAPBundle\Entity\LDAPMailAlias 
     */
    public function getLdapMailAlias()
    {
        return $this->ldapMailAlias;
    }
    /**
     * Set subscribe
     *
     * @param integer $subscribe
     */
    public function setSubscribe($subscribe)
    {
        $this->subscribe = $subscribe;

        return $this;
    }

    /**
     * Get subscribe
     *
     * @return integer
     */
    public function getSubscribe()
    {
        return $this->subscribe;
    }
    /**
     * Set status
     *
     * @param integer $status
     */
    public function setStatus($status)
    {
        $this->status = $status;

        return $this;
    }

    /**
     * Get status
     *
     * @return integer
     */
    public function getStatus()
    {
        return $this->status;
    }
    
}