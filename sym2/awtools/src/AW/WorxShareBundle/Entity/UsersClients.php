<?php

namespace AW\WorxShareBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * UsersClients
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="AW\WorxShareBundle\Entity\UsersClientsRepository")
 * @ORM\HasLifecycleCallbacks
 */
class UsersClients
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
     * @ORM\Column(name="client_id", type="integer")
     */
    private $clientId;

    /**
     * @var string
     *
     * @ORM\Column(name="client_name", type="string", length=255, nullable=true)
     */
    private $client_name;

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
     * @return UsersClients
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
     * Set clientId
     *
     * @param integer $clientId
     * @return UsersClients
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

    /**
     * Set created
     *
     * @param \DateTime $created
     * @return UsersClients
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
     * @return UsersClients
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
     * Set client_name
     *
     * @param string $clientName
     * @return UsersClients
     */
    public function setClientName($clientName)
    {
        $this->client_name = $clientName;

        return $this;
    }

    /**
     * Get client_name
     *
     * @return string 
     */
    public function getClientName()
    {
        return $this->client_name;
    }
}
