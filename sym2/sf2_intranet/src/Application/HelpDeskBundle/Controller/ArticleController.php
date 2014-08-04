<?php

namespace Application\HelpDeskBundle\Controller;

use Application\HelpDeskBundle\Form\ArticleType;
use Application\HelpDeskBundle\Document\Article;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Cmf\Bundle\CoreBundle\PublishWorkflow\PublishWorkflowChecker;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Security\Core\SecurityContextInterface;
use Symfony\Component\Templating\EngineInterface;
use FOS\RestBundle\View\ViewHandlerInterface;
use FOS\RestBundle\View\View;

use Application\HelpDeskBundle\Repository\ArticleRepository;

/**
 * @Route("/help")
 *
 */
class ArticleController extends Controller
{
		
	/**
	 * @var DocumentManager
	 */
	protected $dm;
	
	/**
	 * @var SecurityContextInterface
	 */
	protected $securityContext;
	
	/**
	 * The permission to check for when doing the publish workflow check.
	 *
	 * @var string
	 */
	private $publishWorkflowPermission = PublishWorkflowChecker::VIEW_ATTRIBUTE;
		
	/**
	 * @Route("/cat", name="get_article_categories")
	 * @Method("GET")
	 * @Template
	 */
	public function getCategoriesAction()
	{
		if (!isset($_GET['parent'])) {
			$parent = null;
			$path = null;
		}else {
			$parent = $_GET['parent'];
			$path = $_GET['path'];
		}

		$em = $this->getDoctrine()->getManager();
		$categories = $em->getRepository('ApplicationHelpDeskBundle:ArticleCategory')->findBy(array('parent' => $parent));

		$this->dm = $this->get('doctrine_phpcr.odm.default_document_manager');
		if ($this->get('security.context')->isGranted('ROLE_ADMIN')) {
		    $articles = $this->dm->getRepository('Application\HelpDeskBundle\Document\Article')->findBy(array('category' => $path));
		}else {
			$articles = $this->dm->getRepository('Application\HelpDeskBundle\Document\Article')->findBy(array('category' => $path, 'access' => 'public'));
		}

		$articlesCount = count($articles);

		$html = $this->container->get('templating')->render('ApplicationHelpDeskBundle:Article:getCategories.html.twig', array('categories' => $categories));

		$response = new Response(json_encode(array(
			'html' => $html,
			'articlesCount' => $articlesCount
			)));
		$response->headers->set('Content-Type', 'application/json');

		return $response;

		/*return array(
			'categories' => $categories,
			'articlesCount' => count($articles),
		);*/
	}

	/**
	 * @Route("/", name="help")
	 * @Template
	 */
	function indexAction()
	{
		$em = $this->getDoctrine()->getManager();
		$categories = $em->getRepository('ApplicationHelpDeskBundle:ArticleCategory')->findBy(array('parent' => null));
		$categoriesAll = $em->getRepository('ApplicationHelpDeskBundle:ArticleCategory')->findAll();

		$baseUrl = "/help/"; 
		if($this->get('kernel')->getEnvironment() == 'dev'){
			$baseUrl = '/app_dev.php'.$baseUrl;
		}

		$pagination = null;
		$decendants = null;	
		$this->dm = $this->get('doctrine_phpcr.odm.default_document_manager');
		if ($this->get('security.context')->isGranted('ROLE_ADMIN')) {
		    $decendants = $this->dm->getRepository('Application\HelpDeskBundle\Document\Article')->findAll();
		}else {
			$decendants = $this->dm->getRepository('Application\HelpDeskBundle\Document\Article')->findBy(array('access' => 'public'));
		}
		
		//$decendants = $this->dm->getRepository('Application\EmailWorxBundle\Document\Post')->findBy(array(), array('date' => 'ASC'));			

		$paginator  = $this->get('knp_paginator');
		$pagination = $paginator->paginate(
				$decendants,
				$this->get('request')->query->get('page', 1)/*page number*/,
				10/*limit per page*/
		);

		//return $this->redirect($this->generateUrl('help-view', array('path' => 'list')));
		return array(
			'pagination' => $pagination,
			'baseUrl' => $baseUrl,
			'categories' => $categories,
			'categoriesAll' => $categoriesAll,
		);
	}


	/**
	 * @Route("/{path}", requirements={"path" = "(?!(edit|delete|create)).+"}, name="help-view")
	 * @Template
	 */
	function viewAction($path)
	{
		if ($path == 'search') {
			
			return $this->render('ApplicationHelpDeskBundle:Article:search.html.twig', self::searchAction());

		}else {
			$root = "/cms/content/help/";
			$eventPathName = $path;
			$path = $root.trim($path, "/");	
			$this->dm = $this->get('doctrine_phpcr.odm.default_document_manager');
			$article = $this->dm->getRepository('Application\HelpDeskBundle\Document\Article')->find($path);

			$em = $this->getDoctrine()->getManager();
        
	        $articleCategories = $em->getRepository('ApplicationHelpDeskBundle:ArticleCategory')->findAllOrderByPath();

			$this->getRequest()->setLocale("en");
			
			//add breadcrumbs
			//$breadcrumbs = $this->get("white_october_breadcrumbs");
			//$breadcrumbs->addItem("Home", $this->get("router")->generate("home_page"));
			
			$pagination = null;
			$decendants = null;		
			if(rtrim($path,"/") == $root.'list'){
				$decendants = $this->dm->getRepository('Application\HelpDeskBundle\Document\Article')->findAll($path);			
				//$decendants = $this->dm->getRepository('Application\EmailWorxBundle\Document\Post')->findBy(array(), array('date' => 'ASC'));			

				$paginator  = $this->get('knp_paginator');
				$pagination = $paginator->paginate(
						$decendants,
						$this->get('request')->query->get('page', 1)/*page number*/,
						10/*limit per page*/
				);
				
				$articleCategories = null;

				//add breadcrumbs
				//$breadcrumbs->addItem("Blog");
			}else{
				//add breadcrumbs
				//$breadcrumbs->addItem("Blog", $this->get("router")->generate("help"));
				//$breadcrumbs->addItem(htmlspecialchars_decode($article->getTitle()), $this->get("router")->generate("emailworx-view", array('path' => $path)));
			}
		
			$baseUrl = "/help/"; 
			if($this->get('kernel')->getEnvironment() == 'dev'){
				$baseUrl = '/app_dev.php'.$baseUrl;
			}
			
			if (!$article && empty($decendants)) {
				
				$em = $this->getDoctrine()->getManager();
        
		        $articleCategories = $em->getRepository('ApplicationHelpDeskBundle:ArticleCategory')->findAllOrderByPath();

				$article = new Article();
				$path = '/cms/content/help/'.$eventPathName;			
	        	$article->path = $path;
	        	$article->category = 'Category';
	        	$article->access = 'public';
	        	$article->title = $eventPathName;
	        	$article->body = 'Article description';
	        	$this->dm->persist($article);
	        	$this->dm->flush();  	
	        	
			}
		}
		
		return array(
				'article' => $article,
				'articleCategories' => $articleCategories,
				'eventPathName' => $eventPathName,
				'decendants' => $decendants,
				'baseUrl' => $baseUrl,
				'pagination' => $pagination,
		);
	}

	/**
	 * @Route("/search", name="help-search")
	 * @Method("POST")
	 * @Template
	 */
	function searchAction()
	{		
		$this->dm = $this->get('doctrine_phpcr.odm.default_document_manager');
		$qb = $this->dm->createQueryBuilder();
		$qb->from()->document('Application\HelpDeskBundle\Document\Article', 'a');

		if (isset($_POST['search_term'])) {
			$qb->where()->like()->field('a.body')->literal('%'.$_POST['search_term'].'%');
		}

		if (isset($_POST['search_path'])) {
			$qb->where()->eq()->field('a.category')->literal($_POST['search_path']);
		}

		//var_dump($qb->getQuery()->getStatement());
		$results = $qb->getQuery()->getResult();	

		return array(
				'results' => $results,
		);
	}

	/**
	 * @Route("/edit/{path}", name="edit", requirements={"path"=".+"})
	 * @Template
	 */
	function editAction($path)
	{
		
	}

	/**
	 * @Route("/create", name="help-create")
	 * @Template
	 */
	function createAction()
	{
		$root = "/cms/content/help/";		
		$this->dm = $this->get('doctrine_phpcr.odm.default_document_manager');
		$path = $root.'new-post-100';
		$article = new Article();
		$article->path = $path;
		$article->category = 'Category';
		$article->access = 'public';
	    $article->title = 'Article title';
		$article->body = 'Article description';
		$article->dm->persist($event);
		$this->dm->flush();
				
		return array(
				'event' => $event				
		);
	}


	/**
	 * @Route("/delete/{path}", requirements={"path" = ".+"}, name="delete")
	 */
	function deleteAction($path)
	{
		$this->dm = $this->get('doctrine_phpcr.odm.default_document_manager');
		$event = $this->dm->getRepository('Application\HelpDeskBundle\Document\Event')->find($path);
		$this->dm->remove($event);
		$this->dm->flush();
		$this->_flash("Document Deleted");
	}


	/**
	 * Helper method to store a flash message in the session
	 *
	 * @param $message
	 * @return void
	 */
	private function _flash($message)
	{
		$this->getRequest()->getSession()->setFlash('event', $message);
	}
}
