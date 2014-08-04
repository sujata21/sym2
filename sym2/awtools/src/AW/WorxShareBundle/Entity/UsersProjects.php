<?php

namespace AW\WorxShareBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * UsersProjects
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="AW\WorxShareBundle\Entity\UsersProjectsRepository")
 * @ORM\HasLifecycleCallbacks
 */
class UsersProjects
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
     * @var integer
     *
     * @ORM\Column(name="user_id", type="integer")
     */
    private $userId;

    /**
     * @var integer
     *
     * @ORM\Column(name="project_id", type="integer")
     */
    private $projectId;

    /**
     * @var integer
     *
     * @ORM\Column(name="client_id", type="integer")
     */
    private $clientId;

    /**
     * @var string
     *
     * @ORM\Column(name="project_name", type="string", length=255, nullable=true)
     */
    private $projectName;    

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="created", type="datetime")
     */
    private $created;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="updated", type="datetime", nullable=true)
     */
    private $updated;


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
     * Set userId
     *
     * @param integer $userId
     * @return UsersProjects
     */
    public function setUserId($userId)
    {
        $this->userId = $userId;

        return $this;
    }

    /**
     * Get userId
     *
     * @return integer 
     */
    public function getUserId()
    {
        return $this->userId;
    }

    /**
     * Set projectId
     *
     * @param integer $projectId
     * @return UsersProjects
     */
    public function setProjectId($projectId)
    {
        $this->projectId = $projectId;

        return $this;
    }

    /**
     * Get projectId
     *
     * @return integer 
     */
    public function getProjectId()
    {
        return $this->projectId;
    }

    /**
     * Set created
     *
     * @param \DateTime $created
     * @return UsersProjects
     */
    public function setCreated($created)
    {
        $this->created = $created;

        return $this;
    }

    /**
     * Get created
     *
     * @return \DateTime 
     */
    public function getCreated()
    {
        return $this->created;
    }

    /**
     * Set updated
     *
     * @param \DateTime $updated
     * @return UsersProjects
     */
    public function setUpdated($updated)
    {
        $this->updated = $updated;

        return $this;
    }

    /**
     * Get updated
     *
     * @return \DateTime 
     */
    public function getUpdated()
    {
        return $this->updated;
    }
    
    /**
     * @ORM\PrePersist()
     */
    public function prePersist()
    {
    	$this->created = new \DateTime();
    }
     
    /**
     * @ORM\PreUpdate()
     */
    public function preUpdate()
    {
    	$this->updated = new \DateTime();
    }

    /**
     * Set projectName
     *
     * @param string $projectName
     * @return UsersProjects
     */
    public function setProjectName($projectName)
    {
        $this->projectName = $projectName;

        return $this;
    }

    /**
     * Get projectName
     *
     * @return string 
     */
    public function getProjectName()
    {
        return $this->projectName;
    }

    /**
     * Set clientId
     *
     * @param integer $clientId
     * @return UsersProjects
     */
    public function setClientId($clientId)
    {
        $this->clientId = $clientId;

        return $this;
    }

    /**
     * Get clientId
     *
     * @return integer 
     */
    public function getClientId()
    {
        return $this->clientId;
    }
}
