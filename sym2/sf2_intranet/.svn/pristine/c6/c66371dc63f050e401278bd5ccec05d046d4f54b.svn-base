<?php
namespace Application\HelpDeskBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Gedmo\Loggable\Entity\LogEntry;

/**
 * TicketLogEntry
 *
 * @ORM\Table(name="ticket_log_entry")
 * @ORM\Entity(repositoryClass="Application\HelpDeskBundle\Entity\TicketLogEntryRepository")
 */
class TicketLogEntry extends LogEntry
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     *
     */
    protected $id;

    /**
     * @var string
     */
    protected $action;

    /**
     * @var \DateTime
     */
    protected $loggedAt;

    /**
     * @var string
     */
    protected $objectId;

    /**
     * @var string
     */
    protected $objectClass;

    /**
     * @var integer
     */
    protected $version;

    /**
     * @var array
     */
    protected $data;

    /**
     * @var string
     */
    protected $username;


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
     * Set action
     *
     * @param string $action
     * @return TicketLogEntry
     */
    public function setAction($action)
    {
        $this->action = $action;
    
        return $this;
    }

    /**
     * Get action
     *
     * @return string 
     */
    public function getAction()
    {
        return $this->action;
    }

    /**
     * Set loggedAt
     *
     * @param \DateTime $loggedAt
     * 
     */
    public function setLoggedAt()
    {
        //$this->loggedAt = $loggedAt;
    }

    /**
     * Get loggedAt
     *
     * @return \DateTime 
     */
    public function getLoggedAt()
    {
        return $this->loggedAt;
    }

    /**
     * Set objectId
     *
     * @param string $objectId
     * @return TicketLogEntry
     */
    public function setObjectId($objectId)
    {
        $this->objectId = $objectId;
    
        return $this;
    }

    /**
     * Get objectId
     *
     * @return string 
     */
    public function getObjectId()
    {
        return $this->objectId;
    }

    /**
     * Set objectClass
     *
     * @param string $objectClass
     * @return TicketLogEntry
     */
    public function setObjectClass($objectClass)
    {
        $this->objectClass = $objectClass;
    
        return $this;
    }

    /**
     * Get objectClass
     *
     * @return string 
     */
    public function getObjectClass()
    {
        return $this->objectClass;
    }

    /**
     * Set version
     *
     * @param integer $version
     * @return TicketLogEntry
     */
    public function setVersion($version)
    {
        $this->version = $version;
    
        return $this;
    }

    /**
     * Get version
     *
     * @return integer 
     */
    public function getVersion()
    {
        return $this->version;
    }

    /**
     * Set data
     *
     * @param array $data
     * @return TicketLogEntry
     */
    public function setData($data)
    {
        $this->data = $data;
    
        return $this;
    }

    /**
     * Get data
     *
     * @return array 
     */
    public function getData()
    {
        return $this->data;
    }

    /**
     * Set username
     *
     * @param string $username
     * @return TicketLogEntry
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
}