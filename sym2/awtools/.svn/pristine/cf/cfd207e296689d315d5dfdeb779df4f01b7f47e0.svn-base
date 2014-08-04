<?php

namespace AW\WorxShareBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * ProjectsImages
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="AW\WorxShareBundle\Entity\ProjectsImagesRepository")
 * @ORM\HasLifecycleCallbacks
 */
class ProjectsImages
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
     * @ORM\Column(name="name", type="string", length=255, nullable=true)
     * @Assert\NotBlank()
     * 
     */
    private $name;

    /**
     * @var string
     *
     * @ORM\Column(name="unique_name", type="string", length=255)
     * 
     */
    private $unique_name;

    /**
     * @var string
     *
     * @ORM\Column(name="info", type="text", nullable=true)
     */
    private $info;

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
     * @var integer
     *
     * @ORM\Column(name="project_id", type="integer")
     */
    private $projectId;


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
     * @return ProjectsImages
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
     * Set info
     *
     * @param string $info
     * @return ProjectsImages
     */
    public function setInfo($info)
    {
        $this->info = $info;

        return $this;
    }

    /**
     * Get info
     *
     * @return string 
     */
    public function getInfo()
    {
        return $this->info;
    }

    /**
     * Set created
     *
     * @param \DateTime $created
     * @return ProjectsImages
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
     * @return ProjectsImages
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
     * Set projectId
     *
     * @param integer $projectId
     * @return ProjectsImages
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
     * Set unique_name
     *
     * @param string $uniqueName
     * @return ProjectsImages
     */
    public function setUniqueName($uniqueName)
    {
        $this->unique_name = $uniqueName;

        return $this;
    }

    /**
     * Get unique_name
     *
     * @return string 
     */
    public function getUniqueName()
    {
        return $this->unique_name;
    }
}
