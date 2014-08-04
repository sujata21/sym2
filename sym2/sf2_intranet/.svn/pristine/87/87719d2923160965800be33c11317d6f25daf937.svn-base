<?php

namespace Application\HelpDeskBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Status
 *
 * @ORM\Table(name="hd_status")
 * @ORM\Entity(repositoryClass="Application\HelpDeskBundle\Entity\StatusRepository")
 */
class Status
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
     * @ORM\ManyToOne(targetEntity="StatusType", inversedBy="issues")
     * @ORM\JoinColumn(name="status_type_id", referencedColumnName="id")
     **/
    private $statusType;
    
    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=255)
     * @Assert\NotNull()
     * @Assert\NotBlank()
     */
    private $name;


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
     * @return Status
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
     * Set statusType
     *
     * @param \Application\HelpDeskBundle\Entity\StatusType $statusType
     * @return Status
     */
    public function setStatusType(\Application\HelpDeskBundle\Entity\StatusType $statusType = null)
    {
        $this->statusType = $statusType;
    
        return $this;
    }

    /**
     * Get statusType
     *
     * @return \Application\HelpDeskBundle\Entity\StatusType 
     */
    public function getStatusType()
    {
        return $this->statusType;
    }
    
    public function __toString(){
    	return $this->getName();
    }
}