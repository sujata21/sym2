<?php

namespace AW\InterviewBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Result
 *
 * @ORM\Table(name="result")
 * @ORM\Entity

 */
class Result
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
     * @ORM\Column(name="uid", type="string", length=255,nullable=true)
     */
    private $uid;

    /**
     * @var integer
     *
     * @ORM\Column(name="jobid", type="integer",nullable=true)
     */
    private $jobid;

    /**
     * @var integer
     *
     * @ORM\Column(name="catid", type="integer",nullable=true)
     */
    private $catid;

    /**
     * @var integer
     *
     * @ORM\Column(name="score", type="integer",nullable=true)
     */
    private $score;

    /**
     * @var float
     *
     * @ORM\Column(name="percentage", type="float",nullable=true)
     */
    private $percentage;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="stime", type="datetime",nullable=true)
     */
    private $stime;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="etime", type="datetime",nullable=true)
     */
    private $etime;

    /**
     * @var string
     *
     * @ORM\Column(name="ip", type="string", length=255,nullable=true)
     */
    private $ip;

    /**
     * @var string
     *
     * @ORM\Column(name="interview_title", type="string", length=255,nullable=true)
     */
    private $interviewTitle;


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
     * Set uid
     *
     * @param string $uid
     * @return Result
     */
    public function setUid($uid)
    {
        $this->uid = $uid;

        return $this;
    }

    /**
     * Get uid
     *
     * @return string 
     */
    public function getUid()
    {
        return $this->uid;
    }

    /**
     * Set jobid
     *
     * @param integer $jobid
     * @return Result
     */
    public function setJobid($jobid)
    {
        $this->jobid = $jobid;

        return $this;
    }

    /**
     * Get jobid
     *
     * @return integer 
     */
    public function getJobid()
    {
        return $this->jobid;
    }

    /**
     * Set catid
     *
     * @param integer $catid
     * @return Result
     */
    public function setCatid($catid)
    {
        $this->catid = $catid;

        return $this;
    }

    /**
     * Get catid
     *
     * @return integer 
     */
    public function getCatid()
    {
        return $this->catid;
    }

    /**
     * Set score
     *
     * @param integer $score
     * @return Result
     */
    public function setScore($score)
    {
        $this->score = $score;

        return $this;
    }

    /**
     * Get score
     *
     * @return integer 
     */
    public function getScore()
    {
        return $this->score;
    }

    /**
     * Set percentage
     *
     * @param float $percentage
     * @return Result
     */
    public function setPercentage($percentage)
    {
        $this->percentage = $percentage;

        return $this;
    }

    /**
     * Get percentage
     *
     * @return float 
     */
    public function getPercentage()
    {
        return $this->percentage;
    }

    /**
     * Set stime
     *
     * @param \DateTime $stime
     * @return Result
     */
    public function setStime($stime)
    {
        $this->stime = $stime;

        return $this;
    }

    /**
     * Get stime
     *
     * @return \DateTime 
     */
    public function getStime()
    {
        return $this->stime;
    }

    /**
     * Set etime
     *
     * @param \DateTime $etime
     * @return Result
     */
    public function setEtime($etime)
    {
        $this->etime = $etime;

        return $this;
    }

    /**
     * Get etime
     *
     * @return \DateTime 
     */
    public function getEtime()
    {
        return $this->etime;
    }

    /**
     * Set ip
     *
     * @param string $ip
     * @return Result
     */
    public function setIp($ip)
    {
        $this->ip = $ip;

        return $this;
    }

    /**
     * Get ip
     *
     * @return string 
     */
    public function getIp()
    {
        return $this->ip;
    }

    /**
     * Set interviewTitle
     *
     * @param string $interviewTitle
     * @return Result
     */
    public function setInterviewTitle($interviewTitle)
    {
        $this->interviewTitle = $interviewTitle;

        return $this;
    }

    /**
     * Get interviewTitle
     *
     * @return string 
     */
    public function getInterviewTitle()
    {
        return $this->interviewTitle;
    }
}
