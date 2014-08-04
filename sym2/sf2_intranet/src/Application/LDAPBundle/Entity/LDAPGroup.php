<?php

namespace Application\LDAPBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * LDAPGroup
 *
 * @ORM\Table(name="ldap_group")
 * @ORM\Entity(repositoryClass="Application\LDAPBundle\Entity\LDAPGroupRepository")
 * @ORM\HasLifecycleCallbacks()
 * 
 */
class LDAPGroup
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
     * @ORM\Column(name="name", type="string", length=50, unique=true)
     */

    private $name;
    /**
     * @var string
     *
     * @ORM\Column(name="mail_alias", type="string", length=50)
     */

    private $mail_alias;

    /**
     * @ORM\ManyToOne(targetEntity="Application\Sonata\UserBundle\Entity\User")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="id", nullable=true)
     *
     **/
    private $user_id;
    /**
     * @ORM\OneToOne(targetEntity="LDAPMailAlias")
     * @ORM\JoinColumn(name="ldap_mail_alias_id", referencedColumnName="id")
     **/
    private $ldapMailAlias;
    /**
     * @var string
     *
     * @ORM\Column(name="description", type="string", length=255)
     */
    private $description;

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
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    public function setId($id)
    {
    	$this->id = $id;
    }
    
    /**
     * Set name
     *
     * @param string $name
     * @return LDAPGroup
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
     * Set mail_alias
     *
     * @param string $MailAlias
     * @return LDAPGroup
     */
    public function setMailAlias($MailAlias)
    {
        $this->mail_alias = $MailAlias;

        return $this;
    }

    /**
     * Get mail_alias
     *
     * @return string
     */
    public function getMailAlias()
    {
        return $this->mail_alias;
    }
    /**
     * Set description
     *
     * @param string $description
     * @return LDAPGroup
     */
    public function setDescription($description)
    {
        $this->description = $description;
    
        return $this;
    }

    /**
     * Get description
     *
     * @return string 
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Set updated_at
     *
     * @param \DateTime $updatedAt
     * @return LDAPGroup
     */
    public function setUpdatedAt($updatedAt)
    {
        $this->updated_at = $updatedAt;
    
        return $this;
    }
	
    /**
     *  @ORM\PreUpdate
     */
    public function setUpdatedAtValue()
    {
    	$this->updated_at = new \DateTime();
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
     * @return LDAPGroup
     */
    public function setCreatedAt($createdAt)
    {
        $this->created_at = $createdAt;
    
        return $this;
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
     * Get created_at
     *
     * @return \DateTime 
     */
    public function getCreatedAt()
    {
        return $this->created_at;
    }
    

    /**
     * Set synchronized_at
     *
     * @param \DateTime $synchronizedAt
     * @return LDAPGroup
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
    
    public function __toString(){
    	return $this->getName();
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

}