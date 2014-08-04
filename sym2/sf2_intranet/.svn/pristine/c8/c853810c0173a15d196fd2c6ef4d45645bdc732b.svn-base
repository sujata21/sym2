<?php

namespace Application\HelpDeskBundle\Document;

use Doctrine\ODM\PHPCR\Mapping\Annotations as PHPCR;

use Symfony\Cmf\Component\Routing\RouteReferrersReadInterface;

use Symfony\Cmf\Bundle\CoreBundle\PublishWorkflow\PublishTimePeriodInterface;
use Symfony\Cmf\Bundle\CoreBundle\PublishWorkflow\PublishableInterface;

use Application\HelpDeskBundle\Utils\ArticleUtils;

/**
 * Object representing a event posting.
 *
 * @PHPCR\Document(versionable="full",referenceable=true)
 */
class Article implements RouteReferrersReadInterface, PublishTimePeriodInterface, PublishableInterface 
{
	/**
	 * ID / Path to to this object
	 * @PHPCR\Id
	 */
	public $path;

	/**
	 * Article category
	 * @PHPCR\String(nullable=true)
	 */
	public $category;

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
	 * Article title
	 * @PHPCR\String
	 *
	 */
	public $title;

	/**
	 * Article access
	 * @PHPCR\String
	 *
	 */
	public $access;

	/**
	 * Node name (same as slug)
	 * @PHPCR\String(nullable=true)
	 *
	 */
	public $slug;

	/**
	 * Article body text
	 * @PHPCR\String(nullable=true)
	 */
	public $body;

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
		$this->name = ArticleUtils::slugify($title);
		$this->slug = $this->name;
	}

	public function getCategory()
	{
		return $this->category;
	}

	public function setCategory($category)
	{
		$str = array('&nbsp;');
		$this->category = trim(strip_tags(str_replace($str, '', $category)));
	}

	public function getAccess()
	{
		return $this->access;
	}

	public function setAccess($access)
	{
		$str = array('&nbsp;');
		$this->access = trim(strip_tags(str_replace($str, '', $access)));
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
			$this->slug = ArticleUtils::slugify($this->title);
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

		// The user can create a Article from Admin, so
		// we let them choose and automatically make
		// this Article a child of selected blog.
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