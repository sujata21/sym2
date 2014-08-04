<?php

namespace AW\SonyScriptBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Projects
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="AW\SonyScriptBundle\Entity\ProjectsRepository")
 * @ORM\HasLifecycleCallbacks()
 */
class Projects
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
     * @ORM\Column(name="type", type="string", length=255, nullable=true)
     */
    private $type;

    /**
     * @var string
     *
     * @ORM\Column(name="template", type="string", length=255, nullable=true)
     */
    private $template;

    /**
     * @var string
     *
     * @ORM\Column(name="template_copy", type="string", length=255, nullable=true)
     */
    private $template_copy;

    /**
     * @var string
     *
     * @ORM\Column(name="countries", type="string", length=255, nullable=true)
     */
    private $countries;

    /**
     * @var string
     *
     * @ORM\Column(name="alias", type="string", length=255, nullable=true)
     */
    private $alias;

    /**
     * @var string
     *
     * @ORM\Column(name="number", type="string", length=255, nullable=true)
     */
    private $number;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=255, nullable=true)
     */
    private $name;

    /**
     * @var string
     *
     * @ORM\Column(name="folder", type="string", length=255, nullable=true)
     */
    private $folder;

    /**
     * @var string
     *
     * @ORM\Column(name="spreadsheet_copy", type="string", length=255, nullable=true)
     */
    private $spreadsheet_copy;

    /**
     * @var string
     *
     * @ORM\Column(name="spreadsheet_org", type="string", length=255, nullable=true)
     */
    private $spreadsheet;

    /**
     * @var text
     *
     * @ORM\Column(name="logic", type="text", nullable=true)
     */
    private $logic;

    /**
     * @var text
     *
     * @ORM\Column(name="languages", type="text", nullable=true)
     */
    private $languages;
    
    /**
     * @var \DateTime
     *
     * @ORM\Column(name="created", type="datetime", nullable=true)
     */
    private $created;
    
    /**
     * @var \DateTime
     *
     * @ORM\Column(name="updated", type="datetime", nullable=true)
     */
    private $updated;
    
    /**
     * @var string
     *
     * @ORM\Column(name="status", type="string", length=1)
     */
    private $status = 0;//0 = active, 1=archive

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
     * Set type
     *
     * @param string $type
     * @return Projects
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
     * Set template
     *
     * @param string $template
     * @return Projects
     */
    public function setTemplate($template)
    {
        $this->template = $template;

        return $this;
    }

    /**
     * Get template
     *
     * @return string 
     */
    public function getTemplate()
    {
        return $this->template;
    }

    /**
     * Set countries
     *
     * @param string $countries
     * @return Projects
     */
    public function setCountries($countries)
    {
        $this->countries = $countries;

        return $this;
    }

    /**
     * Get countries
     *
     * @return string 
     */
    public function getCountries()
    {
        return $this->countries;
    }

    /**
     * Set alias
     *
     * @param string $alias
     * @return Projects
     */
    public function setAlias($alias)
    {
        $this->alias = $alias;

        return $this;
    }

    /**
     * Get alias
     *
     * @return string 
     */
    public function getAlias()
    {
        return $this->alias;
    }

    /**
     * Set number
     *
     * @param string $number
     * @return Projects
     */
    public function setNumber($number)
    {
        $this->number = $number;

        return $this;
    }

    /**
     * Get number
     *
     * @return string 
     */
    public function getNumber()
    {
        return $this->number;
    }

    /**
     * Set name
     *
     * @param string $name
     * @return Projects
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
     * Set spreadsheet
     *
     * @param string $spreadsheet
     * @return Projects
     */
    public function setSpreadsheet($spreadsheet)
    {
        $this->spreadsheet = $spreadsheet;

        return $this;
    }

    /**
     * Get spreadsheet
     *
     * @return string 
     */
    public function getSpreadsheet()
    {
        return $this->spreadsheet;
    }

    /**
     * Set output
     *
     * @param string $output
     * @return Projects
     */
    public function setOutput($output)
    {
        $this->output = $output;

        return $this;
    }

    /**
     * Get output
     *
     * @return string 
     */
    public function getOutput()
    {
        return $this->output;
    }
    
    /**
     * @ORM\PrePersist
     */
    public function prePersist()
    {
    	$this->setCreated(new \DateTime());
    }
    
    /**
     * @ORM\PreUpdate
     */
    public function preUpdate()
    {
    	$this->setUpdated(new \DateTime());
    }

    /**
     * Set created
     *
     * @param \DateTime $created
     * @return Projects
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
     * @return Projects
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
     * Set spreadsheet_copy
     *
     * @param string $spreadsheetCopy
     * @return Projects
     */
    public function setSpreadsheetCopy($spreadsheetCopy)
    {
        $this->spreadsheet_copy = $spreadsheetCopy;

        return $this;
    }

    /**
     * Get spreadsheet_copy
     *
     * @return string 
     */
    public function getSpreadsheetCopy()
    {
        return $this->spreadsheet_copy;
    }

    /**
     * Set template_copy
     *
     * @param string $templateCopy
     * @return Projects
     */
    public function setTemplateCopy($templateCopy)
    {
        $this->template_copy = $templateCopy;

        return $this;
    }

    /**
     * Get template_copy
     *
     * @return string 
     */
    public function getTemplateCopy()
    {
        return $this->template_copy;
    }

    /**
     * Set status
     *
     * @param string $status
     * @return Projects
     */
    public function setStatus($status)
    {
        $this->status = $status;

        return $this;
    }

    /**
     * Get status
     *
     * @return string 
     */
    public function getStatus()
    {
        return $this->status;
    }

    /**
     * Set logic
     *
     * @param string $logic
     * @return Projects
     */
    public function setLogic($logic)
    {
        $this->logic = $logic;

        return $this;
    }

    /**
     * Get logic
     *
     * @return string 
     */
    public function getLogic()
    {
        return $this->logic;
    }

    /**
     * Set folder
     *
     * @param string $folder
     * @return Projects
     */
    public function setFolder($folder)
    {
        $this->folder = $folder;

        return $this;
    }

    /**
     * Get folder
     *
     * @return string 
     */
    public function getFolder()
    {
        return $this->folder;
    }

    /**
     * Set languages
     *
     * @param string $languages
     * @return Projects
     */
    public function setLanguages($languages)
    {
        $this->languages = $languages;

        return $this;
    }

    /**
     * Get languages
     *
     * @return string 
     */
    public function getLanguages()
    {
        return $this->languages;
    }
}
