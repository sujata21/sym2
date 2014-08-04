<?php

namespace AW\InterviewBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Interview
 *
 * @ORM\Table(name="interview")
 * @ORM\Entity
 * @ORM\HasLifecycleCallbacks
 */
class Interview
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
     * @ORM\Column(name="username", type="string", length=255,nullable=true)
     */
    private $username;

    /**
     * @var string
     *
     * @ORM\Column(name="jobtitle", type="string", length=255,nullable=true)
     */
    private $jobtitle;

    /**
     * @var string
     *
     * @ORM\Column(name="jobId", type="string", length=255,nullable=true)
     */
    private $jobId;

    /**
     * @var string
     *
     * @ORM\Column(name="url", type="string", length=255,nullable=true)
     */
    private $url;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="createdAt", type="datetime",nullable=true)
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
     * Set username
     *
     * @param string $username
     * @return Interview
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
     * Set jobtitle
     *
     * @param string $jobtitle
     * @return Interview
     */
    public function setJobtitle($jobtitle)
    {
        $this->jobtitle = $jobtitle;

        return $this;
    }

    /**
     * Get jobtitle
     *
     * @return string 
     */
    public function getJobtitle()
    {
        return $this->jobtitle;
    }

    /**
     * Set jobId
     *
     * @param string $jobId
     * @return Interview
     */
    public function setJobId($jobId)
    {
        $this->jobId = $jobId;

        return $this;
    }

    /**
     * Get jobId
     *
     * @return string 
     */
    public function getJobId()
    {
        return $this->jobId;
    }

    /**
     * Set url
     *
     * @param string $url
     * @return Interview
     */
    public function setUrl($url)
    {
        $this->url = $url;

        return $this;
    }

    /**
     * Get url
     *
     * @return string 
     */
    public function getUrl()
    {
        return $this->url;
    }

    /**
     * Set createdAt
     *
     * @param \DateTime $createdAt
     * @return Interview
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
