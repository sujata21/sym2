<?php

namespace AW\InterviewBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Question
 *
 * @ORM\Table(name="question")
 * @ORM\Entity
 * @ORM\HasLifecycleCallbacks
 */
class Question
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
     * @ORM\Column(name="category", type="integer",nullable=true)
     */
    private $category;

    /**
     * @var string
     *
     * @ORM\Column(name="question", type="string", length=255,nullable=true)
     */
    private $question;

    /**
     * @var string
     *
     * @ORM\Column(name="type", type="string", length=50,nullable=true)
     */
    private $type;

    /**
     * @var string
     *
     * @ORM\Column(name="answer", type="string", length=100,nullable=true)
     */
    private $answer;

    /**
     * @var integer
     *
     * @ORM\Column(name="option_cnt", type="integer",nullable=true)
     */
    private $option_cnt;

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
     * Set category
     *
     * @param integer $category
     * @return Question
     */
    public function setCategory($category)
    {
        $this->category = $category;

        return $this;
    }

    /**
     * Get category
     *
     * @return integer 
     */
    public function getCategory()
    {
        return $this->category;
    }

    /**
     * Set question
     *
     * @param string $question
     * @return Question
     */
    public function setQuestion($question)
    {
        $this->question = $question;

        return $this;
    }

    /**
     * Get question
     *
     * @return string 
     */
    public function getQuestion()
    {
        return $this->question;
    }

    /**
     * Set type
     *
     * @param string $type
     * @return Question
     */
    public function setType($type)
    {
        $this->type = $type;

        return $this;
    }

    /**
     * Get type
     *
     * @return string 
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * Set answer
     *
     * @param string $answer
     * @return Question
     */
    public function setAnswer($answer)
    {
        $this->answer = $answer;

        return $this;
    }

    /**
     * Get answer
     *
     * @return string 
     */
    public function getAnswer()
    {
        return $this->answer;
    }

    /**
     * Set option_cnt
     *
     * @param integer $option_cnt
     * @return Question
     */
    public function setOptionCnt($option_cnt)
    {
        $this->option_cnt = $option_cnt;

        return $this;
    }

    /**
     * Get option_cnt
     *
     * @return integer
     */
    public function getOptionCnt()
    {
        return $this->option_cnt;
    }

    /**
     * Set createdAt
     *
     * @param \DateTime $createdAt
     * @return Question
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
