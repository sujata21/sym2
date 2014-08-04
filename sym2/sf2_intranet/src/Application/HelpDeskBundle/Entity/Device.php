<?php

namespace Application\HelpDeskBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Gedmo\Mapping\Annotation as Gedmo;

/**
 * Device
 *
 * @ORM\Table(name="hd_device")
 * @ORM\Entity(repositoryClass="Application\HelpDeskBundle\Entity\DeviceRepository")
 */
class Device
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
     * @ORM\ManyToOne(targetEntity="DeviceType", inversedBy="devices")
     * @ORM\JoinColumn(name="device_type_id", referencedColumnName="id")
    **/
    private $deviceType;
    
    /**
     * @var string
     * @Assert\NotNull()
     * @Assert\NotBlank()
     *
     * @ORM\Column(name="name", type="string", length=255, unique=true)
     */
    private $name;
    
    /**
     * @var string
     *
     * @ORM\Column(name="asset_tag", type="string", length=255, unique=true)
     */
    private $asset_tag;

    /**
     * @var string
     *
     * @ORM\Column(name="ip_address", type="string", length=15, nullable=true)
     */
    private $ip_address;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="updated_at", type="datetime", nullable=true)
     * @Gedmo\Timestampable(on="update")
     */
    private $updated_at;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="created_at", type="datetime")
     * @Gedmo\Timestampable(on="create")
     */
    private $created_at;


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
     * @return Device
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
     * Set ip_address
     *
     * @param string $ipAddress
     * @return Device
     */
    public function setIpAddress($ipAddress)
    {
        $this->ip_address = $ipAddress;
    
        return $this;
    }

    /**
     * Get ip_address
     *
     * @return string 
     */
    public function getIpAddress()
    {
        return $this->ip_address;
    }

    /**
     * Set updated_at
     *
     * @param \DateTime $updatedAt
     * @return Device
     */
    public function setUpdatedAt($updatedAt)
    {
        $this->updated_at = $updatedAt;
    
        return $this;
    }

    /**
     * Get updated_at
     *
     * @return \DateTime 
     */
    public function getUpdatedAt()
    {
        return $this->updated_at;
    }

    /**
     * Set created_at
     *
     * @param \DateTime $createdAt
     * @return Device
     */
    public function setCreatedAt($createdAt)
    {
        $this->created_at = $createdAt;
    
        return $this;
    }

    /**
     * Get created_at
     *
     * @return \DateTime 
     */
    public function getCreatedAt()
    {
        return $this->created_at;
    }

    /**
     * Set deviceType
     *
     * @param \Application\HelpDeskBundle\Entity\DeviceType $deviceType
     * @return Device
     */
    public function setDeviceType(\Application\HelpDeskBundle\Entity\DeviceType $deviceType = null)
    {
        $this->deviceType = $deviceType;
    
        return $this;
    }

    /**
     * Get deviceType
     *
     * @return \Application\HelpDeskBundle\Entity\DeviceType 
     */
    public function getDeviceType()
    {
        return $this->deviceType;
    }

    /**
     * Set asset_tag
     *
     * @param string $assetTag
     * @return Device
     */
    public function setAssetTag($assetTag)
    {
        $this->asset_tag = $assetTag;
    
        return $this;
    }

    /**
     * Get asset_tag
     *
     * @return string 
     */
    public function getAssetTag()
    {
        return $this->asset_tag;
    }
}