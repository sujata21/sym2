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
 * @PHPCR\Document(versionable="full",referenceable=true)
 */
class Touchstone2Email implements RouteReferrersReadInterface, PublishTimePeriodInterface, PublishableInterface
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
	 * Post header
	 * @PHPCR\String
	 *
	 */
	public $header ="Header";
	/**
	 * Post template
	 * @PHPCR\String
	 *
	 */
	public $template ="Template";
	/**
	 * Post menu_text1
	 * @PHPCR\String
	 *
	 */
	public $menu_text1 ="menu_text1";
	/**
	 * Post menu_text2
	 * @PHPCR\String
	 *
	 */
	public $menu_text2 ="menu_text2";
	/**
	 * Post menu_text3
	 * @PHPCR\String
	 *
	 */
	public $menu_text3 ="menu_text3";
	/**
	 * Post hero
	 * @PHPCR\String
	 *
	 */
	public $hero='<img src="http://placehold.it/270x350" />';
	/**
	 * Post title1
	 * @PHPCR\String
	 *
	 */
	public $title1="POD1 Text";
	/**
	 * Post summary1
	 * @PHPCR\String
	 *
	 */
	public $summary1="POD1 summary";

	/**
	 * Post cta1
	 * @PHPCR\String
	 *
	 */
	public $cta1="POD1 cta";
	/**
	 * Post cta1_link
	 * @PHPCR\String
	 *
	 */
	public $cta1_link='<img src="/bundles/applicationtemplate/images/touchstone/arrow.gif" style="display:block" width="12" height="45" border="0" />';

	
	/**
	 * Post title2
	 * @PHPCR\String
	 *
	 */
	public $title2="POD2 Text";
	/**
	 * Post summary2
	 * @PHPCR\String
	 *
	 */
	public $summary2="POD2 summary";

	/**
	 * Post cta2
	 * @PHPCR\String
	 *
	 */
	public $cta2="POD2 cta";
	/**
	 * Post cta2_link
	 * @PHPCR\String
	 *
	 */
	public $cta2_link='<img src="/bundles/applicationtemplate/images/touchstone/arrow.gif" style="display:block" width="12" height="45" border="0" />';

	/**
	 * Post title3
	 * @PHPCR\String
	 *
	 */
	public $title3="POD3 Text";
	/**
	 * Post summary3
	 * @PHPCR\String
	 *
	 */
	public $summary3="POD3 summary";

	/**
	 * Post cta3
	 * @PHPCR\String
	 *
	 */
	public $cta3="POD3 cta";
	/**
	 * Post cta3_link
	 * @PHPCR\String
	 *
	 */
	public $cta3_link='<img src="/bundles/applicationtemplate/images/touchstone/arrow.gif" style="display:block" width="12" height="45" border="0" />';
	/**
	 * Post title4
	 * @PHPCR\String
	 *
	 */
	public $title4="POD4 Text";
	/**
	 * Post summary4
	 * @PHPCR\String
	 *
	 */
	public $summary4="POD4 summary";

	/**
	 * Post cta4
	 * @PHPCR\String
	 *
	 */
	public $cta4="POD4 cta";
	/**
	 * Post cta4_link
	 * @PHPCR\String
	 *
	 */
	public $cta4_link='<img style="display:block" width="13" height="13" border="0" alt="" src="/bundles/applicationtemplate/images/touchstone/cta_arrow.png" />';

	/**
	 * Post created_at;
	 * @PHPCR\String(nullable=true)
	 *
	 */
	public $created_at;
	/**
	 * Post status;
	 * @PHPCR\String(nullable=true)
	 *
	 */
	public $status="0";
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