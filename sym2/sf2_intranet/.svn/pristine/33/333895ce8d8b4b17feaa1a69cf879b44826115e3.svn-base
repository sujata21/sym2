<?php

namespace Application\LDAPBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * LDAPUser
 *
 * @ORM\Table(name="ldap_user")
 * @ORM\Entity(repositoryClass="Application\LDAPBundle\Entity\LDAPUserRepository")
 * @ORM\HasLifecycleCallbacks()
 */
class LDAPUser
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
     * @ORM\OneToOne(targetEntity="Application\Sonata\UserBundle\Entity\User")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="id", nullable=true)     
     *
     **/
    private $user_id;

    /**
     * @ORM\ManyToOne(targetEntity="Application\LDAPBundle\Entity\Department")
     * @ORM\JoinColumn(name="department_id", referencedColumnName="id", nullable=true)
     *
     **/
    private $department_id;
    
    /**
     * @var string
     *
     * @ORM\Column(name="username", type="string", length=255, unique=true)
     */
    private $username;

    /**
     * @var string
     *
     * @ORM\Column(name="firstname", type="string", length=255)
     */
    private $firstname;

    /**
     * @var string
     *
     * @ORM\Column(name="lastname", type="string", length=255, nullable=true)
     */
    private $lastname;

    /**
     * @var string
     *
     * @ORM\Column(name="job_title", type="string", length=50, nullable=true)
     */
    private $job_title;

    /**
     * @var string
     *
     * @ORM\Column(name="email", type="string", length=255)
     */
    private $email;

    /**
     * @var string
     *
     * @ORM\Column(name="department", type="string", length=25, nullable=true)
     */
    private $department;

    /**
     * @var string
     *
     * @ORM\Column(name="office", type="string", length=25, nullable=true)
     */
    private $office;

    /**
     * @var string
     *
     * @ORM\Column(name="telephone", type="string", length=20, nullable=true)
     */
    private $telephone;
    /**
     * @var string
     *
     * @ORM\Column(name="mobile", type="string", length=20, nullable=true)
     */
    private $mobile;

    /**
     * @var boolean
     *
     * @ORM\Column(name="enabled", type="boolean")
     */
    private $enabled;
    
    /**
     * @var boolean
     *
     * @ORM\Column(name="mail_account", type="boolean", nullable=true)
     */
    private $mail_account;
    
    /**
     * @var boolean
     *
     * @ORM\Column(name="deleted", type="boolean", nullable=true)
     */
    private $deleted;
    
    /**
     * @var \DateTime
     *
     * @ORM\Column(name="deleted_at", type="datetime", nullable=true)
     */
    private $deleted_at;
    
    /**
     * @var \DateTime
     *
     * @ORM\Column(name="synchronized_at", type="datetime", nullable=true)
     */
    private $synchronized_at;
    
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
     * @ORM\OneToMany(targetEntity="LDAPUserGroup", mappedBy="ldapUser")
     **/
    private $groups;
    /**
     * @var string
     *
     * @ORM\Column(name="shadowLastChange", type="string", length=50, nullable=true)
     */
    private $shadowLastChange;
    
    
    public function __construct() {
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
     * Set username
     *
     * @param string $username
     * @return LDAPUser
     */
    public function setUsername($username)
    {
        $this->username = $username;
    
        return $this;
    }

    /**
     * Get username
     *
     * @return string 
     */
    public function getUsername()
    {
        return $this->username;
    }

    /**
     * Set firstname
     *
     * @param string $firstname
     * @return LDAPUser
     */
    public function setFirstname($firstname)
    {
        $this->firstname = $firstname;
    
        return $this;
    }

    /**
     * Get firstname
     *
     * @return string 
     */
    public function getFirstname()
    {
        return $this->firstname;
    }

    /**
     * Set lastname
     *
     * @param string $lastname
     * @return LDAPUser
     */
    public function setLastname($lastname)
    {
        $this->lastname = $lastname;
    
        return $this;
    }

    /**
     * Get lastname
     *
     * @return string 
     */
    public function getLastname()
    {
        return $this->lastname;
    }

    /**
     * Set job_title
     *
     * @param string $jobTitle
     * @return LDAPUser
     */
    public function setJobTitle($jobTitle)
    {
        $this->job_title = $jobTitle;
    
        return $this;
    }

    /**
     * Get job_title
     *
     * @return string 
     */
    public function getJobTitle()
    {
        return $this->job_title;
    }

    /**
     * Set email
     *
     * @param string $email
     * @return LDAPUser
     */
    public function setEmail($email)
    {
        $this->email = $email;
    
        return $this;
    }

    /**
     * Get email
     *
     * @return string 
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * Set department
     *
     * @param string $department
     * @return LDAPUser
     */
    public function setDepartment($department)
    {
        $this->department = $department;
    
        return $this;
    }

    /**
     * Get department
     *
     * @return string 
     */
    public function getDepartment()
    {
        return $this->department;
    }

    /**
     * Set office
     *
     * @param string $office
     * @return LDAPUser
     */
    public function setOffice($office)
    {
        $this->office = $office;
    
        return $this;
    }

    /**
     * Get office
     *
     * @return string 
     */
    public function getOffice()
    {
        return $this->office;
    }

    /**
     * Set telephone
     *
     * @param string $telephone
     * @return LDAPUser
     */
    public function setTelephone($telephone)
    {
        $this->telephone = $telephone;
    
        return $this;
    }

    /**
     * Get telephone
     *
     * @return string 
     */
    public function getTelephone()
    {
        return $this->telephone;
    }

    /**
     * Set mobile
     *
     * @param string $mobile
     * @return LDAPUser
     */
    public function setMobile($mobile)
    {
        $this->mobile = $mobile;

        return $this;
    }

    /**
     * Get mobile
     *
     * @return string
     */
    public function getMobile()
    {
        return $this->mobile;
    }
    /**
     * Set enabled
     *
     * @param integer $enabled
     * @return LDAPUser
     */
    public function setEnabled($enabled)
    {
        $this->enabled = $enabled;
    
        return $this;
    }

    /**
     * Get enabled
     *
     * @return integer 
     */
    public function getEnabled()
    {
        return $this->enabled;
    }

    /**
     * Set mail_account
     *
     * @param integer $mailAccount
     * @return LDAPUser
     */
    public function setMailAccount($mailAccount)
    {
        $this->mail_account = $mailAccount;
    
        return $this;
    }

    /**
     * Get mail_account
     *
     * @return integer 
     */
    public function getMailAccount()
    {
        return $this->mail_account;
    }

    /**
     * Set deleted
     *
     * @param integer $deleted
     * @return LDAPUser
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
     * @return LDAPUser
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
     * @return LDAPUser
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
     *  @ORM\PreUpdate
    */
    public function setUpdatedAtValue()
    {
    	$this->updated_at = new \DateTime();
    }

    /**
     * Set updated_at
     *
     * @param \DateTime $updatedAt
     * @return LDAPUser
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
     * @return LDAPUser
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
    
    public function __toString(){
    	return $this->getUsername();
    }

    /**
     * Add groups
     *
     * @param \Application\LDAPBundle\Entity\LDAPUserGroup $groups
     * @return LDAPUser
     */
    public function addGroup(\Application\LDAPBundle\Entity\LDAPUserGroup $groups)
    {
        $this->groups[] = $groups;
    
        return $this;
    }

    /**
     * Remove groups
     *
     * @param \Application\LDAPBundle\Entity\LDAPUserGroup $groups
     */
    public function removeGroup(\Application\LDAPBundle\Entity\LDAPUserGroup $groups)
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
    /**
     * Set shadowLastChange
     *
     * @param string $shadowLastChange
     * @return LDAPUser
     */
    public function setShadowLastChange($shadowLastChange)
    {
        $this->shadowLastChange = $shadowLastChange;

        return $this;
    }

    /**
     * Get shadowLastChange
     *
     * @return string
     */
    public function getShadowLastChange()
    {
        return $this->shadowLastChange;
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
     * Set department_id
     *
     * @param \Application\LDAPBundle\Entity\Department $departmentId
     * @return LDAPUser
     */
    public function setDepartmentId(\Application\LDAPBundle\Entity\Department $departmentId = null)
    {
        $this->department_id = $departmentId;

        return $this;
    }

    /**
     * Get department_id
     *
     * @return \Application\LDAPBundle\Entity\Department
     */
    public function getDepartmentId()
    {
        return $this->department_id;
    }
}