<?php

namespace Application\TemplateBundle\Controller;

use Application\TemplateBundle\Form\TemplateType;

use Application\TemplateBundle\Document\BBC ;
use Application\TemplateBundle\Document\Zsl ;
use Application\TemplateBundle\Document\Touchstone ;
use Application\TemplateBundle\Document\Touchstone2 ;
use Application\TemplateBundle\Document\BBCEmail;
use Application\TemplateBundle\Document\ZslEmail;


use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Cmf\Bundle\CoreBundle\PublishWorkflow\PublishWorkflowChecker;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Security\Core\SecurityContextInterface;
use Symfony\Component\Templating\EngineInterface;
use FOS\RestBundle\View\ViewHandlerInterface;
use FOS\RestBundle\View\View;
use Symfony\Component\HttpFoundation\Response;


/**
 * @Route("/template")
 *
 */
class TemplateController extends Controller
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
	 * @Route("/", name="template")
	 * @Template
	 */
	function indexAction()
	{
		//die();
		$this->dm = $this->get('doctrine_phpcr.odm.default_document_manager');
		$zsl = $this->dm->getRepository('Application\TemplateBundle\Document\Zsl')->findAll();
		$this->getRequest()->setLocale("en");
		$baseUrl = "/template/"; 
		if($this->get('kernel')->getEnvironment() == 'dev'){
			$baseUrl = '/app_dev.php'.$baseUrl;
		}
		foreach ($zsl as $decendant) {
			$template[$decendant->title] = 'zsl';
		}

		$bbc = $this->dm->getRepository('Application\TemplateBundle\Document\BBC')->findAll();
		$this->getRequest()->setLocale("en");
		$baseUrl = "/template/"; 
		if($this->get('kernel')->getEnvironment() == 'dev'){
			$baseUrl = '/app_dev.php'.$baseUrl;
		}
		foreach ($bbc as $decendant) {
			$template[$decendant->title] = 'bbc';
		}

		$touchstone = $this->dm->getRepository('Application\TemplateBundle\Document\Touchstone')->findAll();
		$this->getRequest()->setLocale("en");
		$baseUrl = "/template/"; 
		if($this->get('kernel')->getEnvironment() == 'dev'){
			$baseUrl = '/app_dev.php'.$baseUrl;
		}
		foreach ($bbc as $decendant) {
			$template[$decendant->title] = 'touchstone';
		}
		$touchstone2 = $this->dm->getRepository('Application\TemplateBundle\Document\Touchstone2')->findAll();
		$this->getRequest()->setLocale("en");
		$baseUrl = "/template/"; 
		if($this->get('kernel')->getEnvironment() == 'dev'){
			$baseUrl = '/app_dev.php'.$baseUrl;
		}
		foreach ($touchstone2 as $decendant) {
			$template[$decendant->title] = 'touchstone2';
		}
		
		$bbcemails = $this->dm->getRepository('Application\TemplateBundle\Document\BBCEmail')->findBy(array(), array('created_at'=>'desc'),2);
		$this->getRequest()->setLocale("en");
		$baseUrl_bbcemail = "/email/"; 
		if($this->get('kernel')->getEnvironment() == 'dev'){
			$baseUrl_bbcemail = '/app_dev.php'.$baseUrl_bbcemail;
		}

		$zslemails = $this->dm->getRepository('Application\TemplateBundle\Document\ZslEmail')->findBy(array(), array('created_at'=>'desc'),2);
		$this->getRequest()->setLocale("en");
		$baseUrl_zslemail = "/email/"; 
		if($this->get('kernel')->getEnvironment() == 'dev'){
			$baseUrl_zslemail = '/app_dev.php'.$baseUrl_zslemail;
		}

		foreach ($bbcemails as $email) {
			//echo $emails->template;
			if($email->created_at != ''){
				$email->created_at = $email->created_at->format("Y.m.d");
			}else{
				$email->created_at = '--';
			}
		}

		foreach ($zslemails as $zslemail) {
			//echo $emails->template;
			if($zslemail->created_at != ''){
				$zslemail->created_at = $zslemail->created_at->format("Y.m.d");
			}else{
				$zslemail->created_at = '--';
			}
		}
		$res = array(
			'template' => $template,
            'bbc' => $bbc,
            'zsl' => $zsl,
            'touchstone' => $touchstone,
            'touchstone2' => $touchstone2,
           	'bbcemails'	 => $bbcemails,
           	'zslemails'	 => $zslemails,
			'baseUrl' 	 => $baseUrl,
			'baseUrl_bbcemail' => $baseUrl_bbcemail,
			'baseUrl_zslemail' => $baseUrl_zslemail,
        );
        return $res;
		
	}
	/**
	 * @Route("/{path}", requirements={"path" = "(?!(edit|delete|create)).+"}, name="template_view")
	 * @Template
	 */
	function viewAction($path)
	{
		$this->dm = $this->get('doctrine_phpcr.odm.default_document_manager');
		
		
		$info = $this->getInfo($path);
				
		$root = $info['node'];
		$templatePathName = $path;
		$path = $root.trim($path, "/");	
		
		$template = $this->dm->getRepository($info['doc'])->find($path);
				
		if (!$template) {
			$template = $info['inst'];
			$template->path = $path;
        	$template->title = $templatePathName;
        	$this->dm->persist($template);
        	$this->dm->flush();
		}
		
		$header = "";
		
		$res =  array(
				'template' => $template,
				'templatePathName' => $templatePathName,
		);
		return $this->render('ApplicationTemplateBundle:Template:'.$info['twig_file'], $res);
	}

	function getInfo($path){
		//echo $path;
		$pos_zsl =  stristr($path,'zsl');
		$pos_bbc =  stristr($path,'bbc');
		$pos_touchstone =  stristr($path,'touchstone'); 
		$pos_touchstone2 =  stristr($path,'touchstone2'); 
		$pos_touchstone4 =  stristr($path,'touchstone4'); 
		$pos_touchstone3 =  stristr($path,'touchstone3'); 
		if($pos_bbc){
			$info['twig_file'] = 'bbc_template.html.twig';
			$info['node'] = $this->container->getParameter('bbc_template_doc');
			$info['doc'] = 'Application\TemplateBundle\Document\BBC';
			$info['inst'] = new BBC();
			
		
		}
		if($pos_zsl){
			$info['twig_file'] = 'zsl_template.html.twig';
			$info['node'] = $this->container->getParameter('zsl_template_doc');
			$info['doc'] = 'Application\TemplateBundle\Document\Zsl';
			$info['inst'] = new Zsl();
		
		}
		if($pos_touchstone){
			$info['twig_file'] = 'touchstone_template.html.twig';
			$info['node'] = $this->container->getParameter('touchstone_template_doc');
			$info['doc'] = 'Application\TemplateBundle\Document\Touchstone';
			$info['inst'] = new Touchstone();
		} 
		if($pos_touchstone2){
			$info['twig_file'] = 'touchstone2_template.html.twig';
			$info['node'] = $this->container->getParameter('touchstone2_template_doc');
			$info['doc'] = 'Application\TemplateBundle\Document\Touchstone2';
			$info['inst'] = new Touchstone2();
		} 
		if($pos_touchstone3){
			$info['twig_file'] = 'touchstone3_template.html.twig';
			$info['node'] = $this->container->getParameter('touchstone2_template_doc');
			$info['doc'] = 'Application\TemplateBundle\Document\Touchstone2';
			$info['inst'] = new Touchstone2();
		} 
		if($pos_touchstone4){
			$info['twig_file'] = 'touchstone4_template.html.twig';
			$info['node'] = $this->container->getParameter('touchstone2_template_doc');
			$info['doc'] = 'Application\TemplateBundle\Document\Touchstone2';
			$info['inst'] = new Touchstone2();
		} 
		
		//var_dump($info); die();
		return $info;
	}
	

	
	/**
	 * @Route("/edit/{path}", name="template_edit", requirements={"path"=".+"})
	 * @Template
	 */
	function editAction($path)
	{
		
	}

	/**
	 * @Route("/create/{parentPath}", requirements={"parentPath" = ".*"}, name="template_create")
	 * @Template
	 */
	function createAction($parentPath)
	{
		
	}


	/**
	 * @Route("/delete/{path}", requirements={"path" = ".+"}, name="template_delete")
	 */
	function deleteAction($path)
	{
		
	}


	/**
	 * Helper method to store a flash message in the session
	 *
	 * @param $message
	 * @return void
	 */
	private function _flash($message)
	{
		//$this->getRequest()->getSession()->setFlash('event', $message);
	}
}
