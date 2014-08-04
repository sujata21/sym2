<?php

namespace Application\HelpDeskBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * Ticket
 *
 * @ORM\Table(name="hd_ticket")
 * @ORM\Entity(repositoryClass="Application\HelpDeskBundle\Entity\TicketRepository")
 * @Gedmo\Mapping\Annotation\Loggable(logEntryClass="Application\HelpDeskBundle\Entity\TicketLogEntry")
 * @ORM\HasLifecycleCallbacks()
 */
class Ticket
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
	 * @ORM\Column(name="subject", type="string", length=255)
	 * @Assert\NotNull()
	 * @Assert\NotBlank()
	 */
	private $subject;

	/**
	 * @var string
	 *
	 * @ORM\Column(name="from_email", type="string", length=255, nullable=false)
	 * @Assert\Email(
	 *     message = "The email '{{ value }}' is not a valid email.",
	 *     checkMX = true
	 *      )
	 */
	private $from_email;

	/**
	 * @ORM\ManyToOne(targetEntity="Application\Sonata\UserBundle\Entity\User")
	 * @ORM\JoinColumn(name="submitted_by", referencedColumnName="id")
	 * @Gedmo\Mapping\Annotation\Versioned
	 * 
	 **/
	private $submitted_by;

	/**
	 * @ORM\ManyToOne(targetEntity="Application\Sonata\UserBundle\Entity\User")
	 * @ORM\JoinColumn(name="assigned_to", referencedColumnName="id", nullable=true)
	 * @Gedmo\Mapping\Annotation\Versioned
	 * 
	 **/
	private $assigned_to;

	/**
	 * @ORM\ManyToOne(targetEntity="Application\HelpDeskBundle\Entity\Status")
	 * @ORM\JoinColumn(name="status_id", referencedColumnName="id")
	 * @Gedmo\Mapping\Annotation\Versioned
	 * 
	 **/
	private $status;

	/**
	 * @ORM\ManyToOne(targetEntity="Application\HelpDeskBundle\Entity\Category")
	 * @ORM\JoinColumn(name="category_id", referencedColumnName="id", nullable=true)
	 * 
	 **/
	private $category;

	/**
	 * @ORM\ManyToOne(targetEntity="Application\HelpDeskBundle\Entity\Category")
	 * @ORM\JoinColumn(name="sub_category_id", referencedColumnName="id", nullable=true)
	 **/
	private $subCategory;


	/**
	 * @var \DateTime
	 *
	 * @ORM\Column(name="updated_at", type="datetime")
	 * @Gedmo\Mapping\Annotation\Timestampable(on="update")
	 */
	private $updated_at;

	/**
	 * @var \DateTime
	 *
	 * @ORM\Column(name="created_at", type="datetime")
	 * @Gedmo\Mapping\Annotation\Timestampable(on="create")
	 */
	private $created_at;

	/**
	 * @ORM\OneToOne(targetEntity="TicketIssue", mappedBy="ticket", cascade={"persist", "refresh", "remove"})
	 */
	protected $ticketIssue;

	/**
	 * @ORM\OneToMany(targetEntity="TicketIssue", mappedBy="ticket")
	 * @ORM\OrderBy({"created_at" = "DESC"})
	 */
	protected $ticketIssues;

	public function __construct()
	{
		$this->ticketIssues = new ArrayCollection();
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
	 * Set subject
	 *
	 * @param string $subject
	 * @return Ticket
	 */
	public function setSubject($subject)
	{
		$this->subject = $subject;

		return $this;
	}

	/**
	 * Get subject
	 *
	 * @return string
	 */
	public function getSubject()
	{
		return $this->subject;
	}

	/**
	 * Set from_email
	 *
	 * @param string $fromEmail
	 * @return Ticket
	 */
	public function setFromEmail($fromEmail)
	{
		$this->from_email = $fromEmail;

		return $this;
	}

	/**
	 * Get from_email
	 *
	 * @return string
	 */
	public function getFromEmail()
	{
		return $this->from_email;
	}

	/**
	 * Set updated_at
	 *
	 * @param \DateTime $updatedAt
	 * @return Ticket
	 */
	public function setUpdatedAt($updatedAt)
	{
		$this->updated_at = $updatedAt;

		return $this;
	}

	/**
	 * @ORM\PreUpdate
	 */
	public function setUpdateAtValue()
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
	 * @return Ticket
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
	 * Set submitted_by
	 *
	 * @param \Application\Sonata\UserBundle\Entity\User $submittedBy
	 * @return Ticket
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

	/**
	 * Set assigned_to
	 *
	 * @param \Application\Sonata\UserBundle\Entity\User $assignedTo
	 * @return Ticket
	 */
	public function setAssignedTo(\Application\Sonata\UserBundle\Entity\User $assignedTo = null)
	{
		$this->assigned_to = $assignedTo;

		return $this;
	}

	/**
	 * Get assigned_to
	 *
	 * @return \Application\Sonata\UserBundle\Entity\User
	 */
	public function getAssignedTo()
	{
		return $this->assigned_to;
	}

	/**
	 * Add ticketIssues
	 *
	 * @param \Application\HelpDeskBundle\Entity\TicketIssue $ticketIssues
	 * @return Ticket
	 */
	public function addTicketIssue(\Application\HelpDeskBundle\Entity\TicketIssue $ticketIssues)
	{
		$this->ticketIssues[] = $ticketIssues;

		return $this;
	}

	/**
	 * Remove ticketIssues
	 *
	 * @param \Application\HelpDeskBundle\Entity\TicketIssue $ticketIssues
	 */
	public function removeTicketIssue(\Application\HelpDeskBundle\Entity\TicketIssue $ticketIssues)
	{
		$this->ticketIssues->removeElement($ticketIssues);
	}

	/**
	 * Get ticketIssues
	 *
	 * @return \Doctrine\Common\Collections\Collection
	 */
	public function getTicketIssues()
	{
		return $this->ticketIssues;
	}

	/**
	 * Set ticketIssue
	 *
	 * @param \Application\HelpDeskBundle\Entity\TicketIssue $ticketIssue
	 * @return Ticket
	 */
	public function setTicketIssue(\Application\HelpDeskBundle\Entity\TicketIssue $ticketIssue = null)
	{
		$this->ticketIssue = $ticketIssue;

		return $this;
	}

	/**
	 * Get ticketIssue
	 *
	 * @return \Application\HelpDeskBundle\Entity\TicketIssue
	 */
	public function getTicketIssue()
	{
		return $this->ticketIssue;
	}

	/**
	 * @ORM\PrePersist
	 * @ORM\PreUpdate()
	 */
	public function setTicketIssueValue()
	{
		if(is_object($this->ticketIssue)){
			$issueMessage = $this->ticketIssue->getMessage();
			if(empty($issueMessage)){
				$this->setTicketIssue(null);
			} else {
				$this->ticketIssue->setTicket($this);
				$this->ticketIssue->setSubmittedBy(($this->getSubmittedBy()));
			}
		}		
	}


	/**
	 * Set status
	 *
	 * @param \Application\HelpDeskBundle\Entity\Status $status
	 * @return Ticket
	 */
	public function setStatus(\Application\HelpDeskBundle\Entity\Status $status = null)
	{
		$this->status = $status;

		return $this;
	}

	/**
	 * Get status
	 *
	 * @return \Application\HelpDeskBundle\Entity\Status
	 */
	public function getStatus()
	{
		return $this->status;
	}

	/**
	 * Set category
	 *
	 * @param \Application\HelpDeskBundle\Entity\Category $category
	 * @return Ticket
	 */
	public function setCategory(\Application\HelpDeskBundle\Entity\Category $category = null)
	{
		$this->category = $category;

		return $this;
	}

	/**
	 * Get category
	 *
	 * @return \Application\HelpDeskBundle\Entity\Category
	 */
	public function getCategory()
	{
		return $this->category;
	}

	/**
	 * Set subCategory
	 *
	 * @param \Application\HelpDeskBundle\Entity\Category $subCategory
	 * @return Ticket
	 */
	public function setSubCategory(\Application\HelpDeskBundle\Entity\Category $subCategory = null)
	{
		$this->subCategory = $subCategory;

		return $this;
	}

	/**
	 * Get subCategory
	 *
	 * @return \Application\HelpDeskBundle\Entity\Category
	 */
	public function getSubCategory()
	{
		return $this->subCategory;
	}
}