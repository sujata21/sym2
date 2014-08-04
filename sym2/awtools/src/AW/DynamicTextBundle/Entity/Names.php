<?php

namespace AW\DynamicTextBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Names
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="AW\DynamicTextBundle\Entity\NamesRepository")
 */
class Names
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
     * @ORM\Column(name="fname", type="string", length=255)
     */
    private $fname;

    /**
     * @var string
     *
     * @ORM\Column(name="lname", type="string", length=255)
     */
    private $lname;


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
     * Set fname
     *
     * @param string $fname
     * @return Names
     */
    public function setFname($fname)
    {
        $this->fname = $fname;
    
        return $this;
    }

    /**
     * Get fname
     *
     * @return string 
     */
    public function getFname()
    {
        return $this->fname;
    }

    /**
     * Set lname
     *
     * @param string $lname
     * @return Names
     */
    public function setLname($lname)
    {
        $this->lname = $lname;
    
        return $this;
    }

    /**
     * Get lname
     *
     * @return string 
     */
    public function getLname()
    {
        return $this->lname;
    }
}
