<?php

namespace Application\HelpDeskBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Gedmo\Mapping\Annotation as Gedmo;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * DeviceType
 *
 * @ORM\Table(name="hd_device_type")
 * @ORM\Entity(repositoryClass="Application\HelpDeskBundle\Entity\DeviceTypeRepository")
 */
class DeviceType
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
     * @ORM\Column(name="name", type="string", length=255, unique=true)
     * @Assert\NotNull()
     * @Assert\NotBlank()
     */
    private $name;

    /**
     * @ORM\OneToMany(targetEntity="Device", mappedBy="deviceType")
     */
    protected $devices;

    public function __construct()
    {
    	$this->devices = new ArrayCollection();
    }
    
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
     * @return DeviceType
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
     * Add devices
     *
     * @param \Application\HelpDeskBundle\Entity\Device $devices
     * @return DeviceType
     */
    public function addDevice(\Application\HelpDeskBundle\Entity\Device $devices)
    {
        $this->devices[] = $devices;
    
        return $this;
    }

    /**
     * Remove devices
     *
     * @param \Application\HelpDeskBundle\Entity\Device $devices
     */
    public function removeDevice(\Application\HelpDeskBundle\Entity\Device $devices)
    {
        $this->devices->removeElement($devices);
    }

    /**
     * Get devices
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getDevices()
    {
        return $this->devices;
    }
    
    public function __toString(){
    	return $this->getName();
    }
}