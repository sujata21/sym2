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
class TouchstoneEmail implements RouteReferrersReadInterface, PublishTimePeriodInterface, PublishableInterface
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
	 * Post templatepath
	 * @PHPCR\String
	 *
	 */
	public $template;
	/**
	 * Post title1
	 * @PHPCR\String
	 *
	 */

	public $title1="POD1 Text";

	
	/**
	 * Post title2
	 * @PHPCR\String
	 *
	 */
	public $title2="POD2 Text";


	/**
	 * Post title3
	 * @PHPCR\String
	 *
	 */
	public $title3="POD3 Text";
	/**
	 * Post title4
	 * @PHPCR\String
	 *
	 */
	public $title4="POD4 Text";

	/**
	 * Post cta4
	 * @PHPCR\String
	 *
	 */
	public $cta4='<img style="display:block" width="12" height="45" border="0" alt="" src="http://preview01.alchemyworx.com/2014/alchemy_worx/touchstone/aw_p13961_welcome_trigger/_html/images/p13961_arrow.gif" />';
	
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