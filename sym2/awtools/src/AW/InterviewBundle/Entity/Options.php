<?php

namespace AW\InterviewBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Options
 *
 * @ORM\Table(name="options")
 * @ORM\Entity
 */
class Options
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
     * @ORM\Column(name="question_id", type="integer")
     */
    private $questionId;

    /**
     * @var string
     *
     * @ORM\Column(name="op_answer", type="string", length=255)
     */
    private $opAnswer;


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
     * Set questionId
     *
     * @param integer $questionId
     * @return Options
     */
    public function setQuestionId($questionId)
    {
        $this->questionId = $questionId;

        return $this;
    }

    /**
     * Get questionId
     *
     * @return integer 
     */
    public function getQuestionId()
    {
        return $this->questionId;
    }

    /**
     * Set opAnswer
     *
     * @param string $opAnswer
     * @return Options
     */
    public function setOpAnswer($opAnswer)
    {
        $this->opAnswer = $opAnswer;

        return $this;
    }

    /**
     * Get opAnswer
     *
     * @return string 
     */
    public function getOpAnswer()
    {
        return $this->opAnswer;
    }
}
