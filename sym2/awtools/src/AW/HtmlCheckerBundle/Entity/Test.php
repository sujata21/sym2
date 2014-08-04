<?php

namespace AW\HtmlCheckerBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Test
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="AW\HtmlCheckerBundle\Entity\TestRepository")
 * @ORM\HasLifecycleCallbacks()
 */
class Test
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
     * @ORM\Column(name="file", type="string")
     */
    private $file;

    /**
     * @var text
     *
     * @ORM\Column(name="ptest", type="text", nullable=true)
     */
    private $ptest;

    /**
     * @var text
     *
     * @ORM\Column(name="stest", type="text", nullable=true)
     */
    private $stest;

    /**
     * @var text
     *
     * @ORM\Column(name="htest", type="text", nullable=true)
     */
    private $htest;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="createdAt", type="datetime")
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
     * Set createdAt
     *
     * @param \DateTime $createdAt
     * @return Test
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
     * @ORM\PrePersist
     */
    public function prePersist()
    {
        $this->setCreatedAt(new \DateTime());
    }

    /**
     * Set file
     *
     * @param boolean $file
     * @return Comments
     */
    public function setFile($file)
    {
        $this->file = $file;
    
        return $this;
    }

    /**
     * Get file
     *
     * @return boolean 
     */
    public function getFile()
    {
        return $this->file;
    }

    /**
     * Set ptest
     *
     * @param string $ptest
     * @return Test
     */
    public function setPtest($ptest)
    {
        $this->ptest = $ptest;

        return $this;
    }

    /**
     * Get ptest
     *
     * @return string 
     */
    public function getPtest()
    {
        return $this->ptest;
    }

    /**
     * Set stest
     *
     * @param string $stest
     * @return Test
     */
    public function setStest($stest)
    {
        $this->stest = $stest;

        return $this;
    }

    /**
     * Get stest
     *
     * @return string 
     */
    public function getStest()
    {
        return $this->stest;
    }

    /**
     * Set hstest
     *
     * @param string $htest
     * @return Test
     */
    public function setHtest($htest)
    {
        $this->htest = $htest;

        return $this;
    }

    /**
     * Get htest
     *
     * @return string 
     */
    public function getHtest()
    {
        return $this->htest;
    }
}
