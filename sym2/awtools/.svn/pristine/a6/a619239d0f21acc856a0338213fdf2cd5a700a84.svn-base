<?php

namespace AW\ProfanityBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Email
 *
 * @ORM\Table(name="awemail")
 * @ORM\Entity(repositoryClass="AW\ProfanityBundle\Entity\EmailRepository")
 * @ORM\HasLifecycleCallbacks
 */
class Email
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
     * @ORM\Column(name="name", type="string", length=255)
     */
    private $name;

    /**
     * @var string
     *
     * @ORM\Column(name="source", type="string", length=255,nullable=true)
     */
    private $source;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="created_at", type="datetime",nullable=true)
     */
    private $createdAt;


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
     * @return Email
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
     * Set source
     *
     * @param string $source
     * @return Email
     */
    public function setSource($source)
    {
        $this->source = $source;

        return $this;
    }

    /**
     * Get source
     *
     * @return string 
     */
    public function getSource()
    {
        return $this->source;
    }

    /**
     * Set createdAt
     *
     * @param \DateTime $createdAt
     * @return Email
     */
    public function setCreatedAt($createdAt)
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    /**
     * Get createdAt
     *
     * @return \DateTime 
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
    }
    /**
     * @ORM\PrePersist()
     */
    public function setCreatedAtValue()
    {
        // Add your code here
        if(!$this->getCreatedAt())
        {
            $this->createdAt = new \DateTime();
        }
    }
}
