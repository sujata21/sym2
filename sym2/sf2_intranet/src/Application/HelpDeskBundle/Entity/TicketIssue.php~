<?php

namespace Application\HelpDeskBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Gedmo\Mapping\Annotation as Gedmo;

/**
 * TicketIssue
 *
 * @ORM\Table(name="hd_ticket_issue")
 * @ORM\Entity(repositoryClass="Application\HelpDeskBundle\Entity\TicketIssueRepository")
 */
class TicketIssue
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
     * @ORM\ManyToOne(targetEntity="Ticket", inversedBy="ticketIssue")
     * @ORM\JoinColumn(name="ticket_id", referencedColumnName="id")
     **/
    private $ticket;
    
    /**
     * @var string
     *
     * @ORM\Column(name="message", type="text")
     * 
     */
    private $message;

    /**
     * @var string
     *
     * @ORM\Column(name="note", type="text", nullable=true)
     *
     */
    private $note;
    
    /**
     * @ORM\ManyToOne(targetEntity="Application\Sonata\UserBundle\Entity\User")
     * @ORM\JoinColumn(name="submitted_by", referencedColumnName="id")
     **/
    private $submitted_by;
    
    /**
     * @var \DateTime
     *
     * @ORM\Column(name="created_at", type="datetime")
     * @Gedmo\Timestampable(on="create")
     */
    private $created_at;

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
     * Set message
     *
     * @param string $message
     * @return TicketIssue
     */
    public function setMessage($message)
    {
        $this->message = $message;
    
        return $this;
    }

    /**
     * Get message
     *
     * @return string 
     */
    public function getMessage()
    {
        return $this->message;
    }

    /**
     * Set updated_at
     *
     * @param \DateTime $updatedAt
     * @return TicketIssue
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
     * @return TicketIssue
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
     * Set ticket
     *
     * @param \Application\HelpDeskBundle\Entity\Ticket $ticket
     * @return TicketIssue
     */
    public function setTicket(\Application\HelpDeskBundle\Entity\Ticket $ticket = null)
    {
        $this->ticket = $ticket;
    
        return $this;
    }

    /**
     * Get ticket
     *
     * @return \Application\HelpDeskBundle\Entity\Ticket 
     */
    public function getTicket()
    {
        return $this->ticket;
    }

    /**
     * Set note
     *
     * @param string $note
     * @return TicketIssue
     */
    public function setNote($note)
    {
        $this->note = $note;
    
        return $this;
    }

    /**
     * Get note
     *
     * @return string 
     */
    public function getNote()
    {
        return $this->note;
    }

    /**
     * Set submitted_by
     *
     * @param \Application\Sonata\UserBundle\Entity\User $submittedBy
     * @return TicketIssue
     */
    public function setSubmittedBy(\Application\Sonata\UserBundle\Entity\User $submittedBy = null)
    {
        $this->submitted_by = $submittedBy;
    
        return $this;
    }

    /**
     * Get submitted_by
     *
     * @return \Application\Sonata\UserBundle\Entity\User 
     */
    public function getSubmittedBy()
    {
        return $this->submitted_by;
    }
}