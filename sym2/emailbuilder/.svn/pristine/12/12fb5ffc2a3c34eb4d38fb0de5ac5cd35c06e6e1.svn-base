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
class BBC implements RouteReferrersReadInterface, PublishTimePeriodInterface, PublishableInterface
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
	 * Post title
	 * @PHPCR\String
	 *
	 */
	public $title ="Template Title";
	/**
	 * Post summary_image
	 * @PHPCR\String(nullable=true)
	 *
	 */
	public $summary_image ="Template Thumbnail"; 

	/**
	 * Node name (same as slug)
	 * @PHPCR\String(nullable=true)
	 *
	 */
	public $slug;
	/**
	 * Post body text
	 * @PHPCR\String(nullable=true)
	 */
	public $body="Template body";

	/**
	 * Post summary_body text
	 * @PHPCR\String(nullable=true)
	 */
	public $summary_body;
	/**
	 * Post banner text
	 * @PHPCR\String(nullable=true)
	 */
	public $banner='<img alt="" src="http://emailbuilder.alchemyworx.local/bundles/applicationmain/images/image_place_holder_banner.jpg" />';
	/**
	 * Post signature text
	 * @PHPCR\String(nullable=true)
	 */
	public $signature ='<img alt="" src="http://emailbuilder.alchemyworx.local/bundles/applicationmain/images/image_place_holder_signature.jpg" />'; 
	/**
	 * Post title1
	 * @PHPCR\String
	 *
	 */
	public $title1="Template Subject Line";
	/**
	 * Post summary_image1
	 * @PHPCR\String(nullable=true)
	 *
	 */
	public $image1='<img alt="" src="http://emailbuilder.alchemyworx.local/bundles/applicationmain/images/image_place_holder_hero.jpg" />';
	/**
	 * Post summary_body1;
	 * @PHPCR\String(nullable=true)
	 *
	 */
	public $summary_body1="Intro copy";
	/**
	 * Post cta1;
	 * @PHPCR\String(nullable=true)
	 *
	 */
	public $cta1="Template Block 1 CTA";
	/**
	 * Post title2
	 * @PHPCR\String
	 *
	 */
	public $title2="Top left content pod headline";
	/**
	 * Post image2
	 * @PHPCR\String(nullable=true)
	 *
	 */
	public $image2='<img alt="" src="http://emailbuilder.alchemyworx.local/bundles/applicationmain/images/image_place_holder_pods_image_1.jpg" />';
	/**
	 * Post summary_body2;
	 * @PHPCR\String(nullable=true)
	 *
	 */
	public $summary_body2="Top left content pod text";
	/**
	 * Post cta2;
	 * @PHPCR\String(nullable=true)
	 *
	 */
	public $cta2="Call to Action";
	/**
	 * Post title3
	 * @PHPCR\String
	 *
	 */
	public $title3 ="Top right content pod headline";
	/**
	 * Post image3
	 * @PHPCR\String(nullable=true)
	 *
	 */
	public $image3='<img alt="" src="http://emailbuilder.alchemyworx.local/bundles/applicationmain/images/image_place_holder_pods_image_2.jpg" />';
	/**
	 * Post summary_body3;
	 * @PHPCR\String(nullable=true)
	 *
	 */
	public $summary_body3="Top right content pod text";
	/**
	 * Post cta3;
	 * @PHPCR\String(nullable=true)
	 *
	 */
	public $cta3="Call to Action";
	/**
	 * Post title4
	 * @PHPCR\String
	 *
	 */
	public $title4="Middle content pod headline";
	/**
	 * Post image4
	 * @PHPCR\String(nullable=true)
	 *
	 */
	public $image4='<img alt="" src="http://emailbuilder.alchemyworx.local/bundles/applicationmain/images/image_place_holder_pods_image_3.jpg" />';
	/**
	 * Post summary_body4;
	 * @PHPCR\String(nullable=true)
	 *
	 */
	public $summary_body4="Middle content pod Text";
	/**
	 * Post cta4;
	 * @PHPCR\String(nullable=true)
	 *
	 */
	public $cta4="Call to Action";
	/**
	 * Post title5
	 * @PHPCR\String
	 *
	 */
	public $title5="Bottom left content pod headline";

	/**
	 * Post image5
	 * @PHPCR\String(nullable=true)
	 *
	 */
	public $image5='<img alt="" src="http://emailbuilder.alchemyworx.local/bundles/applicationmain/images/image_place_holder_pods_image_4.jpg" />';
	/**
	 * Post summary_body5;
	 * @PHPCR\String(nullable=true)
	 *
	 */
	public $summary_body5="Bottom left content pod Text";

	/**
	 * Post cta5;
	 * @PHPCR\String(nullable=true)
	 *
	 */
	public $cta5="Call to Action";
	/**
	 * Post title2
	 * @PHPCR\String
	 *
	 */
	public $title6="Bottom rigth content pod headline";

	/**
	 * Post image6
	 * @PHPCR\String(nullable=true)
	 *
	 */
	public $image6='<img alt="" src="http://emailbuilder.alchemyworx.local/bundles/applicationmain/images/image_place_holder_pods_image_5.jpg" />';
	/**
	 * Post summary_body6;
	 * @PHPCR\String(nullable=true)
	 *
	 */
	public $summary_body6 ="Bottom left content pod Text";

	/**
	 * Post cta6;
	 * @PHPCR\String(nullable=true)
	 *
	 */

	public $cta6 ="Call to Action";
	/**
	 * Post background;
	 * @PHPCR\String(nullable=true)
	 *
	 */
	public $background ="#f0ab00";

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