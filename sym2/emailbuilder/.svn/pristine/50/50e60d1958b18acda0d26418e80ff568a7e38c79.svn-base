<?php

namespace Application\TemplateBundle\Document;

use Doctrine\ODM\PHPCR\Mapping\Annotations as PHPCR;

use Symfony\Cmf\Component\Routing\RouteReferrersReadInterface;

use Symfony\Cmf\Bundle\CoreBundle\PublishWorkflow\PublishTimePeriodInterface;
use Symfony\Cmf\Bundle\CoreBundle\PublishWorkflow\PublishableInterface;

use Application\TemplateBundle\Utils\TemplateUtils;

/**
 * Object representing a event posting.
 *
 * @PHPCR\Document(versionable="simple",referenceable=true)
 */
class Zsl implements RouteReferrersReadInterface, PublishTimePeriodInterface, PublishableInterface
{
	/**
	 * ID / Path to to this object
	 * @PHPCR\Id
	 */
	public $path;

	/**
	* @PHPCR\NodeName
	*/
	protected $name;

	/**
	 * @PHPCR\ParentDocument
	 */
	private $parent;

	/**
	 * Event - this is the parent document.
	 *
	 */
	public $event;

	/**
	 * Node name (same as slug)
	 * @PHPCR\String(nullable=true)
	 *
	 */
	public $slug;
	/**
	 * Post title
	 * @PHPCR\String
	 *
	 */
	public $title ="Title";
	/**
	 * Post title1
	 * @PHPCR\String
	 *
	 */
	public $title1="POD1 Title";

	/**
	 * Post image1
	 * @PHPCR\String(nullable=true)
	 *
	 */
	public $image1="POD1 Image";
	/**
	 * Post summary_body1;
	 * @PHPCR\String(nullable=true)
	 *
	 */
	public $summary1 ="POD1 Summary";

	/**
	 * Post cta1;
	 * @PHPCR\String(nullable=true)
	 *
	 */
	public $cta1 ="Call to Action";
	/**
	 * Post title2
	 * @PHPCR\String
	 *
	 */
	public $title2="POD2 Title";

	/**
	 * Post image2
	 * @PHPCR\String(nullable=true)
	 *
	 */
	public $image2='<img alt="" src="http://emailbuilder.alchemyworx.local/bundles/applicationmain/images/image_place_holder_300x169.jpg" />';
	/**
	 * Post summary2;
	 * @PHPCR\String(nullable=true)
	 *
	 */
	public $summary2 ="POD2 Summary";

	/**
	 * Post cta2;
	 * @PHPCR\String(nullable=true)
	 *
	 */
	public $cta2 ="Call to Action";
	/**
	 * Post title3
	 * @PHPCR\String
	 *
	 */
	public $title3="POD3 Title";

	/**
	 * Post image3
	 * @PHPCR\String(nullable=true)
	 *
	 */
	public $image3='<img alt="" src="http://emailbuilder.alchemyworx.local/bundles/applicationmain/images/image_place_holder_300x169.jpg" />';
	/**
	 * Post summary3;
	 * @PHPCR\String(nullable=true)
	 *
	 */
	public $summary3 ="POD3 Summary";

	/**
	 * Post cta3;
	 * @PHPCR\String(nullable=true)
	 *
	 */
	public $cta3 ="Call to Action";
	/**
	 * Post title4
	 * @PHPCR\String
	 *
	 */
	public $title4="POD4 Title";

	/**
	 * Post image4
	 * @PHPCR\String(nullable=true)
	 *
	 */
	public $image4='<img alt="" src="http://emailbuilder.alchemyworx.local/bundles/applicationmain/images/image_place_holder_140x78.jpg" />';
	/**
	 * Post summary4;
	 * @PHPCR\String(nullable=true)
	 *
	 */
	public $summary4 ="POD4 Summary";

	/**
	 * Post cta4;
	 * @PHPCR\String(nullable=true)
	 *
	 */
	public $cta4 ="Call to Action";
	/**
	 * Post title5
	 * @PHPCR\String
	 *
	 */
	public $title5="POD5 Title";

	/**
	 * Post image5
	 * @PHPCR\String(nullable=true)
	 *
	 */
	public $image5 = '<img alt="" src="http://emailbuilder.alchemyworx.local/bundles/applicationmain/images/image_place_holder_140x78.jpg" />';
	/**
	 * Post summary_body5;
	 * @PHPCR\String(nullable=true)
	 *
	 */
	public $summary5 ="POD5 Summary";

	/**
	 * Post cta5;
	 * @PHPCR\String(nullable=true)
	 *
	 */
	public $cta5 ="Call to Action";
	/**
	 * Post title6
	 * @PHPCR\String
	 *
	 */
	public $title6="POD6 Title";

	/**
	 * Post image6
	 * @PHPCR\String(nullable=true)
	 *
	 */
	public $image6='<img alt="" src="http://emailbuilder.alchemyworx.local/bundles/applicationmain/images/image_place_holder_140x78.jpg" />';
	/**
	 * Post summary6;
	 * @PHPCR\String(nullable=true)
	 *
	 */
	public $summary6 ="POD6 Summary";

	/**
	 * Post cta6;
	 * @PHPCR\String(nullable=true)
	 *
	 */
	public $cta6 ="Call to Action";
	/**
	 * Post title7
	 * @PHPCR\String
	 *
	 */
	public $title7="POD7 Title";

	/**
	 * Post image7
	 * @PHPCR\String(nullable=true)
	 *
	 */
	public $image7='<img alt="" src="http://emailbuilder.alchemyworx.local/bundles/applicationmain/images/image_place_holder_140x78.jpg" />';
	/**
	 * Post summary7;
	 * @PHPCR\String(nullable=true)
	 *
	 */
	public $summary7 ="POD7 Summary";

	/**
	 * Post cta7;
	 * @PHPCR\String(nullable=true)
	 *
	 */
	public $cta7 ="Call to Action";
	/**
	 * Post title8
	 * @PHPCR\String
	 *
	 */
	public $title8="POD8 Title";

	/**
	 * Post image8
	 * @PHPCR\String(nullable=true)
	 *
	 */
	public $image8='<img alt="" src="http://emailbuilder.alchemyworx.local/bundles/applicationmain/images/image_place_holder_310x173.jpg" />';
	/**
	 * Post summary8;
	 * @PHPCR\String(nullable=true)
	 *
	 */
	public $summary8 ="POD8 Summary";

	/**
	 * Post cta8;
	 * @PHPCR\String(nullable=true)
	 *
	 */
	public $cta8 ="Call to Action";
	/**
	 * Post title9
	 * @PHPCR\String
	 *
	 */
	public $title9="POD9 Title";

	/**
	 * Post image9
	 * @PHPCR\String(nullable=true)
	 *
	 */
	public $image9='<img alt="" src="http://emailbuilder.alchemyworx.local/bundles/applicationmain/images/image_place_holder_310x173.jpg" />';
	/**
	 * Post summary9;
	 * @PHPCR\String(nullable=true)
	 *
	 */
	public $summary9 ="POD9 Summary";

	/**
	 * Post cta9;
	 * @PHPCR\String(nullable=true)
	 *
	 */
	public $cta9 ="Call to Action";
	/**
	 * Post image_block1;
	 * @PHPCR\String(nullable=true)
	 *
	 */
	public $image_block1 ='<img alt="" src="http://emailbuilder.alchemyworx.local/bundles/applicationmain/images/image_place_holder_300x167.jpg" />';
	/**
	 * Post image_block2;
	 * @PHPCR\String(nullable=true)
	 *
	 */
	public $image_block2 ='<img alt="" src="http://emailbuilder.alchemyworx.local/bundles/applicationmain/images/image_place_holder_140x78.jpg" />';
	/**
	 * Post image_block3;
	 * @PHPCR\String(nullable=true)
	 *
	 */
	public $image_block3 ='<img alt="" src="http://emailbuilder.alchemyworx.local/bundles/applicationmain/images/image_place_holder_140x78.jpg" />';
	/**
	 * Post image_block4;
	 * @PHPCR\String(nullable=true)
	 *
	 */
	public $image_block4 ='<img alt="" src="http://emailbuilder.alchemyworx.local/bundles/applicationmain/images/image_place_holder_300x167.jpg" />';
	/**
	 * Post image_block5;
	 * @PHPCR\String(nullable=true)
	 *
	 */
	public $image_block5 ='<img alt="" src="http://emailbuilder.alchemyworx.local/bundles/applicationmain/images/image_place_holder_140x78.jpg" />';
	/**
	 * Post image_block6;
	 * @PHPCR\String(nullable=true)
	 *
	 */
	public $image_block6 ='<img alt="" src="http://emailbuilder.alchemyworx.local/bundles/applicationmain/images/image_place_holder_140x78.jpg" />';
	/**
	 * Post banner1;
	 * @PHPCR\String(nullable=true)
	 *
	 */
	public $banner1 ='<img alt="" src="http://emailbuilder.alchemyworx.local/bundles/applicationmain/images/image_place_holder_620x79.jpg" />';
	/**
	 * Post banner2;
	 * @PHPCR\String(nullable=true)
	 *
	 */
	public $banner2 ='<img alt="" src="http://emailbuilder.alchemyworx.local/bundles/applicationmain/images/image_place_holder_620x79.jpg" />';
	/**
	 * Post created_at;
	 * @PHPCR\String(nullable=true)
	 *
	 */
	public $created_at;
	/**
	 * Post display order
	 * @PHPCR\String(nullable=true)
	 */
	public $display_order;
	
	/**
	 * Date of publication
	 * @var \DateTime
	 */
	protected $date;

	/**
	 * List of referring routes
	 */
	protected $routes;

	/**
	 * Date to start publishing from
	 * @var \DateTime
	 */
	protected $publishStartDate;

	/**
	 * Date to stop publishing from
	 * @var \DateTime
	 */
	protected $publishEndDate;

	/**
	 * @PHPCR\VersionName
	 */
	private $versionName;

	/**
	 * @PHPCR\VersionCreated
	 */
	private $versionCreated;

	/**
	 * If the document should be publishable
	 * @var Boolean
	 */
	protected $isPublishable;

	public function __construct()
	{
		$this->date = new \DateTime();
	}

	public function getPath()
	{
		return $this->path;
	}
	
	public function getUrlBase(){
		return basename($this->path);
	}

	public function getTitle()
	{
		return $this->title;
	}

	public function setTitle($title)
	{
		$this->title = $title;
		$this->name = TemplateUtils::slugify($title);
		$this->slug = $this->name;
	}

	public function getName()
	{
		return $this->name;
	}

	public function setName($name)
	{
		$this->name = $name;
	}

	public function setParent($parent)
	{
		$this->parent = $parent;
	}

	public function getSlug()
	{
		if(!isset($this->slug)){
			$this->slug = TemplateUtils::slugify($this->title);
		}
		return $this->slug;
	}

	public function getBody()
	{
		return $this->body;
	}

	public function setBody($body)
	{
		$this->body = $body;
	}
	

	public function getDate()
	{
		return $this->date;
	}

	public function setDate($date)
	{
		$this->date = $date;
	}

	public function getParent()
	{
		return $this->getEvent();
	}

	public function getEvent()
	{
		return $this->event;
	}

	public function setEvent($event)
	{
		$this->event = $event;

		// The user can create a post from Admin, so
		// we let them choose and automatically make
		// this Post a child of selected blog.
		$this->parent = $event;
	}

	public function getBodyPreview($length = 255)
	{
		$suffix = strlen($this->body) > $length ? ' ...' : '';

		return substr($this->body, 0, 255).$suffix;
	}

	public function getRoutes()
	{
		return $this->routes;
	}

	public function __toString()
	{
		return (string) $this->title;
	}

	public function isPublishable()
	{
		return $this->isPublishable;
	}

	public function setPublishable($publishable)
	{
		$this->isPublishable = $publishable;
	}

	public function getPublishStartDate()
	{
		return $this->publishStartDate;
	}

	public function setPublishStartDate(\DateTime $publishStartDate = null)
	{
		$this->publishStartDate = $publishStartDate;
	}

	public function getPublishEndDate()
	{
		return $this->publishEndDate;
	}

	public function setPublishEndDate(\DateTime $publishEndDate = null)
	{
		$this->publishEndDate = $publishEndDate;
	}


}