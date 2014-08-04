<?php

namespace Application\TemplateBundle\Controller;

use Application\TemplateBundle\Form\TemplateType;

use Application\TemplateBundle\Document\BBC ;
use Application\TemplateBundle\Document\Zsl ;
use Application\TemplateBundle\Document\Touchstone ;
use Application\TemplateBundle\Document\BBCEmail;
use Application\TemplateBundle\Document\ZslEmail;
use Application\TemplateBundle\Document\TouchstoneEmail;
use Application\TemplateBundle\Document\Touchstone2Email;

use Application\TemplateBundle\Entity\Emaillog;

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
use Symfony\Component\DomCrawler\Crawler;
use Symfony\Component\Config\FileLocator;
use Application\TemplateBundle\Utils\EmailUtils;


/**
 * @Route("/email")
 *
 */
class EmailController extends Controller
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
	 * @Route("/", name="email")
	 * @Template
	 */
	function indexAction()
	{
		//die();
		$this->dm = $this->get('doctrine_phpcr.odm.default_document_manager');
		$decendants = $this->dm->getRepository('Application\TemplateBundle\Document\Email')->findBy(array(), array('created_at'=>'desc'));
		$this->getRequest()->setLocale("en");
		$baseUrl = "/email/"; 
		if($this->get('kernel')->getEnvironment() == 'dev'){
			$baseUrl = '/app_dev.php'.$baseUrl;
		}
		//$decendants[0]->geteDate();
		

		$res = array(
           'decendants' => $decendants,
		   'baseUrl' => $baseUrl,
        );
        return $res;
		
	}
	/**
	 * @Route("/add/{template}", name="email_add")
	 * @Template
	 */
	function addAction($template)
	{
		//die();
		//echo $root = $this->container->getParameter('email_doc');
		$now = date('jnY_His_a');
		
		$email = 'Email_Editor_'.$now;


		$res = array(
           'template' => $template,
           'email'=> $email,
           
			
        );
        return $res;
		
	}
	function getInfo($template=NULl,$email=NULL){
		if(stristr($template,'zsl') == 'zsl'){
			$info['twig_file'] = 'zsl_view.html.twig';
			$info['preview'] = 'zsl_preview.html.twig';
			$info['node'] = $this->container->getParameter('zsl_email_doc');
			$info['template'] = $this->container->getParameter('zsl_template_doc');
			$info['templatedoc'] = 'Application\TemplateBundle\Document\Zsl';
			$info['emaildoc'] = 'Application\TemplateBundle\Document\ZslEmail';
			$info['inst'] = new ZslEmail();
			//$info['inst_archive'] = new ZslArchive();
			$info['create'] = 'ZSL';
		}
		if(stristr($template,'bbc') == 'bbc'){
			$info['twig_file'] = 'bbc_view.html.twig';
			$info['preview'] = 'download_email.html.twig';
			$info['node'] = $this->container->getParameter('bbc_email_doc');
			$info['template'] = $this->container->getParameter('bbc_template_doc');
			$info['emaildoc'] = 'Application\TemplateBundle\Document\BBCEmail';
			$info['templatedoc'] = 'Application\TemplateBundle\Document\BBC';
			$info['inst'] = new BBCEmail();
			//$info['inst_archive'] = new BBCArchive();
			$info['create'] = 'BBC';
		} 
		if(stristr($template,'touchstone') == 'touchstone'){
			$info['twig_file'] = 'touchstone_view.html.twig';
			$info['preview'] = 'touchstone_preview.html.twig';
			$info['node'] = $this->container->getParameter('touchstone_email_doc');
			$info['template'] = $this->container->getParameter('touchstone_template_doc');
			$info['emaildoc'] = 'Application\TemplateBundle\Document\TouchstoneEmail';
			$info['templatedoc'] = 'Application\TemplateBundle\Document\Touchstone';
			$info['inst'] = new TouchstoneEmail();
			//$info['inst_archive'] = new BBCArchive();
			$info['create'] = 'Touchstone';
		} 
		if(stristr($template,'touchstone2') == 'touchstone2'){
			$info['twig_file'] = 'touchstone2_view.html.twig';
			$info['preview'] = 'touchstone2_preview.html.twig';
			$info['node'] = $this->container->getParameter('touchstone2_email_doc');
			$info['template'] = $this->container->getParameter('touchstone2_template_doc');
			$info['emaildoc'] = 'Application\TemplateBundle\Document\Touchstone2Email';
			$info['templatedoc'] = 'Application\TemplateBundle\Document\Touchstone2';
			$info['inst'] = new Touchstone2Email();
			//$info['inst_archive'] = new BBCArchive();
			$info['create'] = 'Touchstone2';
		} 
		if(stristr($template,'touchstone3') == 'touchstone3'){
			$info['twig_file'] = 'touchstone3_view.html.twig';
			$info['preview'] = 'touchstone3_preview.html.twig';
			$info['node'] = $this->container->getParameter('touchstone2_email_doc');
			$info['template'] = $this->container->getParameter('touchstone2_template_doc');
			$info['emaildoc'] = 'Application\TemplateBundle\Document\Touchstone2Email';
			$info['templatedoc'] = 'Application\TemplateBundle\Document\Touchstone2';
			$info['inst'] = new Touchstone2Email();
			//$info['inst_archive'] = new BBCArchive();
			$info['create'] = 'Touchstone2';
		} 
		if(stristr($template,'touchstone4') == 'touchstone4'){
			$info['twig_file'] = 'touchstone4_view.html.twig';
			$info['preview'] = 'touchstone4_preview.html.twig';
			$info['node'] = $this->container->getParameter('touchstone2_email_doc');
			$info['template'] = $this->container->getParameter('touchstone2_template_doc');
			$info['emaildoc'] = 'Application\TemplateBundle\Document\Touchstone2Email';
			$info['templatedoc'] = 'Application\TemplateBundle\Document\Touchstone2';
			$info['inst'] = new Touchstone2Email();
			//$info['inst_archive'] = new BBCArchive();
			$info['create'] = 'Touchstone2';
		} 

		//echo $info['twig_file'];
//var_dump($info);
	//	die();
		return $info;
	}
	/**
	 * @Route("/newemail/{template}/{email}", name="email_newemail")
	 * @Template
	 */
	function newemailAction($template,$email)
	{
		//echo 'templatename--->'.$template;

		$info = $this->getInfo($template,$email);

		//var_dump($info);
	//die();
		$root = $info['node'];
		$eventPathName = $email;
		$path = $root.trim($email, "/");	
		//echo $info['emaildoc'];
		//echo 'ins'.$info['inst'];
		//die();
	    $this->dm = $this->get('doctrine_phpcr.odm.default_document_manager');

		$emailpath = $root.trim($email, "/");	
		$event = $this->dm->getRepository($info['emaildoc'])->find($emailpath);

		//echo $event->template;

		$this->getRequest()->setLocale("en");
		//die();
		 $template_path = $info['template'].trim($template, "/");	
		
		if (!$event ) {
			//echo 'test';
		$event = $info['inst'];
		$event->path = $path;
		$event->template = $template;
        $event->title = $eventPathName;
        $event->created_at = new \DateTime();
        $this->dm->persist($event);
        $this->dm->flush();
        //echo $template_path;
        $email_create = $this->createEmail($template ,$emailpath); 
        
		}
		//die();
		$versioninfo = $this->dm->getAllLinearVersions($event);
		$i = 0;
    	foreach($versioninfo as $version){
    		$ver_array[$i] = $version['name'];
    		$i++;
    	}
    	$baseUrl = "/email/"; 
		if($this->get('kernel')->getEnvironment() == 'dev'){
			$baseUrl = '/app_dev.php'.$baseUrl;
		}
		  $iframe_path = $baseUrl.'new/'.$template.'/'.$email;
		//die();
		 $imageupdate = 0;
		 //echo $info['create'];
		 if($info['create'] == 'BBC'){
		 	$imageupdate = 1;
		 }
		
		$res = array(
		   'event' =>$event,
		   'path' => $path,
           'iframe_path' => $iframe_path,
           'email'=> $email,
           'version' =>$ver_array,
           'template' => $template,
           'imageupdate' =>$imageupdate,	

        );
        
        return $res;
		
	}


	/**
	 * @Route("/new/{template}/{path}", requirements={"path" = "(?!(edit|delete|create)).+"}, name="email_view")
	 * @Template
	 */
	function viewAction($template,$path)
	{
		//echo $template;
		$info = $this->getInfo($template,$path);
		$root = $info['node'];

		$eventPathName = $path;
		$path = $root.trim($path, "/");	
		$this->dm = $this->get('doctrine_phpcr.odm.default_document_manager');
		$event = $this->dm->getRepository($info['emaildoc'])->find($path);

//echo $event->snippet;
		$template_path = $info['template'].trim($template, "/");	 
		$template_obj = $this->dm->getRepository($info['templatedoc'])->find($template_path);
		
		//$background = $event->background; //die();
		//echo $template->body;die();
		
		$this->getRequest()->setLocale("en");
	
		$decendants = null;		
		//$background = $event->background;
		
		//die();
		$baseUrl = "/email/"; 
		if($this->get('kernel')->getEnvironment() == 'dev'){
			$baseUrl = '/app_dev.php'.$baseUrl;
		}
		
		
		
		$header = "";
		
		$res = array(
				'event' => $event,
				//'background' =>$background,
				'eventPathName' => $eventPathName,
				'decendants' => $decendants,
				'baseUrl' => $baseUrl,
				//'edit' => $this->generateUrl('email_edit', array('path' => $path)),
				//'delete' => $this->generateUrl('email_delete', array('path' => $path)),
				//'create' => $this->generateUrl('email_create', array('parentPath' => $path))
		);
		//echo $info['twig_file']; //die();
		return $this->render('ApplicationTemplateBundle:Email:'.$info['twig_file'], $res);
	}

	function createEmail($temp_path,$path){

		//echo $temp_path; 
		$info = $this->getInfo($temp_path,$path);
		//var_dump($info); die();
		$this->dm = $this->get('doctrine_phpcr.odm.default_document_manager');
		//fetch template
		$temp_root_path = $info['template'].$temp_path;
		$template_obj = $this->dm->getRepository($info['templatedoc'])->find($temp_root_path);
		$email_obj = $this->dm->getRepository($info['emaildoc'])->find($path);
			//die();
		 $function_name = 'create'.$info['create']; //die();
		 //echo $function_name;
		$email_obj = EmailUtils::$function_name($email_obj,$template_obj);
		if($email_obj->template == 'touchstone3'){
                $email_obj->hero = '<img style="display:block" border="0" src="http://placehold.it/270x200" />';
        }elseif($email_obj->template == 'touchstone4'){
                $email_obj->hero = '<img style="display:block" border="0" src="http://placehold.it/570x200" class="w280" />';
        }else{
                $email_obj->hero = $template_obj->hero;
        }
		
		if($info['create'] == 'BBC'){
			$background_color = $email_obj->background; //die();
		}
			 	
        	$this->dm->persist($email_obj);
        	$this->dm->flush();
        	//echo 'heroimage'.$email_obj->hero; 
        	//die();
        	return true;
	}

	/**
	 * @Route("/version/{path}/{template}", name="email_version")
	 */
	function versionAction($path,$template)
	{
		$info = $this->getInfo($template,$path);
		//var_dump($info);

		$root = $info['node'];
		$this->dm = $this->get('doctrine_phpcr.odm.default_document_manager');
		//echo $info['emaildoc'];
		 $path = $root.trim($path, "/");	
		$event = $this->dm->getRepository($info['emaildoc'])->find($path);
		$event->title;
		$this->dm->checkpoint($event);

		$versioninfo = $this->dm->getAllLinearVersions($event);
    	//var_dump($versioninfo);
    	//$firstVersion = reset($versioninfo);
    	//var_dump($versioninfo);
    	$i = 0;
    	foreach($versioninfo as $version){
    		$ver_array[$i] =  $version['name'];
    		$i++;
    	}
    	//var_dump($ver_array);
    	return new Response(json_encode($ver_array));

    
	}
	/**
	 * @Route("/restore/{path}/{ver}/{template}", name="email_restore")
	 */
	function restoreAction($path,$ver,$template)
	{
		$info = $this->getInfo($template,$email);
		//var_dump($info);
		$root = $info['node'];
		$ver = str_replace('_','.',$ver);
		
		$email_path = $root.trim($path, "/"); 
		$this->dm = $this->get('doctrine_phpcr.odm.default_document_manager');
		
		// find the head version
		$event = $this->dm->getRepository($info['emaildoc'])->find($email_path);
		//echo $event->title2;
		//fetch the version to be restored
		$oldVersion = $this->dm->findVersionByName($info['emaildoc'], $event->path,$ver);
		//echo $oldVersion->title2; // "Test"

		// restore the head to the old version
		$this->dm->restoreVersion($oldVersion);
		$this->dm->checkout($event);

		// the article document is refreshed
		//echo $event->title2; // "Test"
		exit;
		
    	//return new Response(json_encode($ver_array));

    	
	}
	/**
	 * @Route("/viewVersion/{email}/{ver}/{template}", name="email_viewVersion")
	 * @Template
	 */
	function viewVersionAction($email,$ver,$template)
	{
		$info = $this->getInfo($template,$email);
		//var_dump($info);
		$root = $info['node'];

		$ver = str_replace('_','.',$ver);
		//$root = $this->container->getParameter('email_doc');
		$this->dm = $this->get('doctrine_phpcr.odm.default_document_manager');
		$path = $root.trim($email, "/");	
		$event = $this->dm->getRepository($info['emaildoc'])->find($path);
		
		//echo $event->ackground;
		
		$version = $this->dm->findVersionByName($info['emaildoc'], $event->path, $ver);

		$result = EmailUtils::getEmaildata($version,$template);
		//echo $version->title1;  //die();
		$res=  array(
				'event' => $result['event'],
				'image' =>$result['image'],
				'cta'	=>$result['cta'],
				'title' =>$result['title'],
				'background'=>$result['background'],
				);
		return $this->render('ApplicationTemplateBundle:Email:'.$info['preview'], $res);
	}

	/**
	 * @Route("/download_email/{path}/{template}", name="email_downloadEmail")
	 * @Template
	 */
	function download_emailAction( $path, $template)
	{
		//echo $path;
		$info = $this->getInfo($template,$path);
		//var_dump($info);
		$root = $info['node'];
		 //echo stristr($template , 'zsl');
		$this->dm = $this->get('doctrine_phpcr.odm.default_document_manager');
		$eventPathName = $path;
		$path = $root.trim($path, "/");	
		$event = $this->dm->getRepository($info['emaildoc'])->find($path);
		// echo $info['emaildoc'];
		
		$result = EmailUtils::getEmaildata($event , $event->template);

 		$res = array(
				'event' => $result['event'],
				'image' =>$result['image'],
				'cta'	=>$result['cta'],
				'title' =>$result['title'],
				'background'=>$result['background'],
				);
 		return $this->render('ApplicationTemplateBundle:Email:'.$info['preview'], $res);
	}
		/**
	 * @Route("/download/{path}/{template}", name="email_preview")
	 * @Template
	 */
	function downloadAction($path,$template)
	{
		
		$info = $this->getInfo($template,$path);
		//var_dump($info);
		$root = $info['node'];
		$emailpath = $root.trim($path, "/");	
		$this->dm = $this->get('doctrine_phpcr.odm.default_document_manager');
		$event = $this->dm->getRepository($info['emaildoc'])->find($emailpath);
		
		$result = EmailUtils::getEmaildata($event,$template);
		
		$content = $this->renderView(
    					'ApplicationTemplateBundle:Email:'.$info['preview'],	array('event' => $result['event'],'image' =>$result['image'],
				'cta'	=>$result['cta'],'title' =>$result['title'],'background'=>$result['background'])
		);
		//echo $event->title2;
		 $file = $path.'.html';

		 $response = new Response();
        $response->headers->set('Content-type', 'application/octet-stream');
        $response->headers->set('Content-Disposition', sprintf('attachment; filename="%s"', $file));
        $response->setContent($content);
        //$response->send();
        return $response;
		
	}
	/**
	 * @Route("/source/{path}/{template}", name="email_souce")
	 * @Template
	 */
	function sourceAction($path,$template)
	{

		$info = $this->getInfo($template,$path);
		//var_dump($info);
		$root = $info['node'];
		$emailpath = $root.trim($path, "/");	
		$this->dm = $this->get('doctrine_phpcr.odm.default_document_manager');
		$event = $this->dm->getRepository($info['emaildoc'])->find($emailpath);
		
		$result = EmailUtils::getEmaildata($event,$template);
		

		$content = $this->renderView(
    					'ApplicationTemplateBundle:Email:'.$info['preview'],	array('event' => $result['event'],'image' =>$result['image'],
				'cta'	=>$result['cta'],'title' =>$result['title'],'background'=>$result['background'])
		);
		//return new Response($content);
		return array(
				'event' => $content,

		);
     
		
	}
	/**
	 * @Route("/snapshot/{path}/{template}", name="email_snapshot")
	 */
	function snapshotAction($path,$template)
	{
		$info = $this->getInfo($template,$path);
		//var_dump($info);
		$root = $info['node'];
		$emailpath = $root.trim($path, "/");	
		$this->dm = $this->get('doctrine_phpcr.odm.default_document_manager');
		$event = $this->dm->getRepository($info['emaildoc'])->find($emailpath);
		
		$result = EmailUtils::getEmaildata($event,$template);
		
		$content = $this->renderView(
    					'ApplicationTemplateBundle:Email:'.$info['preview'],	array('event' => $result['event'],'image' =>$result['image'],
				'cta'	=>$result['cta'],'title' =>$result['title'],'background'=>$result['background'])
		);
		// return array('image' => $path.'.jpg');
		echo $path;
		 //die();
		$imagepath = EmailUtils::createImage($path,$content,'');

		$response = new Response();
		 
        $response->headers->set('Content-type', 'image/jpg');
        $response->headers->set('Content-Disposition', sprintf('attachment; filename="%s"', $path.'.jpg'));
       	$response->sendHeaders();
        $response->setContent(readfile($imagepath));
        //$response->send();
        return $response;
	}
	
	/**
	 * @Route("/", name="email")
	 * @Template
	 */
	function searchAction()
	{

		$info = $this->getInfo('bbc',NULL);
		//var_dump($info);
		$root = $info['node'];
		$this->dm = $this->get('doctrine_phpcr.odm.default_document_manager');
		$decendants = $this->dm->getRepository($info['emaildoc'])->findBy(array('status'=>'0'), array('created_at'=>'desc'));
		$this->getRequest()->setLocale("en");
		$baseUrl = "/email/"; 
		if($this->get('kernel')->getEnvironment() == 'dev'){
			$baseUrl = '/app_dev.php'.$baseUrl;
		}
		foreach ($decendants as $decendant) {
			if($decendant->created_at != ''){
				$decendant->created_at = $decendant->created_at->format("Y.m.d");
			}else{
				$decendant->created_at = '--';
			}
		}

		return array('decendants' => $decendants,'baseUrl' => $baseUrl );
	}
	
	/**
	 * @Route("/typeahead", name="email_typeahead")
	 */
	function typeaheadAction()
	{
		//var_dump($_POST);
		$data = $_POST['data']; //die();
		$template = $_POST['template'];
		$info = $this->getInfo($template,NULL);

		if($_POST['date'] != ''){
			$Emaildate = explode('~',$_POST['date']);
			$from = EmailUtils::formatDate($Emaildate[0] ,'from');
			$to = EmailUtils::formatDate($Emaildate[1] ,'to');
		}else{
			$Emaildate = '';
		}
		
		$res_str = '';
		$this->dm = $this->get('doctrine_phpcr.odm.default_document_manager');
		
         $qb = $this->dm->createQueryBuilder();
		$qb->from()->document($info['emaildoc'],'a')->end();
			
		$qb->where()->orX()
						->like()->lowerCase()->field('a.title')->end()->literal('%'.strtolower($data).'%')->end()
   						->like()->lowerCase()->field('a.title1')->end()->literal('%'.strtolower($data).'%')->end();
   						//->like()->lowerCase()->field('a.template')->end()->literal('%'.strtolower($template).'%')->end();
   						
		if($Emaildate != ''){
				
			$qb->andWhere()->andX()
						->gte()->field('a.created_at')->literal($from)->end()
   						->lte()->field('a.created_at')->literal($to)->end();
   		}
		$qb->andWhere()->like()->lowerCase()->field('a.template')->end()->literal('%'.strtolower($template).'%')->end();
		$qb->andWhere()->eq()->field('a.status')->literal('0')->end();
		$qb->orderBy()->desc()->field('a.created_at')->end();
	//	echo $qb->getQuery()->getStatement();
        $decendants = $qb->getQuery()->execute();
        
		if(count($decendants) == 0){
			echo '0';
		}else{
			foreach ($decendants as $key =>$value) {
				$email = $value->title.'~'.str_replace('template_','',$value->template).'~'.$value->title1.'~'.$value->created_at->format("Y.m.d");
				$res_str = $res_str.$email.'|';
			}
			echo $res_str;
		}
	exit;

		
	}

	/**
	 * @Route("/linkchecker/{path}/{template}", name="email_linkchecker")
	 * @Template
	 */
	function linkcheckerAction($path,$template)
	{
		//echo $path; 
		$info = $this->getInfo($template,$path);
		//var_dump($info);
		$root = $info['node'];
		
		$emailpath = $root.trim($path, "/");	
		$this->dm = $this->get('doctrine_phpcr.odm.default_document_manager');
		$email = $this->dm->getRepository($info['emaildoc'])->find($emailpath);
		if(($template == 'touchstone2') || ($template == 'touchstone3') || ($template == 'touchstone4') ){
			$image['link']['cta1'] =EmailUtils::getLink($email->cta1_link);
            $image['link']['cta2'] =EmailUtils::getLink($email->cta2_link);
            $image['link']['cta3'] =EmailUtils::getLink($email->cta3_link);
            $image['link']['menu1'] =EmailUtils::getLink($email->menu_text1);
            $image['link']['menu2'] =EmailUtils::getLink($email->menu_text2);
            $image['link']['menu3'] =EmailUtils::getLink($email->menu_text3);
		}elseif($template == 'touchstone2'){
			$image['link']['title4'] = EmailUtils::getLink($email->cta4);
		}else{
		//$image['link']['signature'] = $this->getLink($email->signature);
		//$image['link']['banner'] = $this->getLink($email->banner);
		//$image['link']['image1'] = $this->getLink($email->image1);
		$image['link']['image2'] = EmailUtils::getLink($email->image2);
		$image['link']['image3'] = EmailUtils::getLink($email->image3);
		$image['link']['image4'] = EmailUtils::getLink($email->image4);
		$image['link']['image5'] = EmailUtils::getLink($email->image5);
		$image['link']['image6'] = EmailUtils::getLink($email->image6);

		if(stristr($template, 'zsl')){
			$image['link']['image1'] = EmailUtils::getLink($email->image1);
			$image['link']['image7'] = EmailUtils::getLink($email->image7);
			$image['link']['image8'] = EmailUtils::getLink($email->image8);
			$image['link']['image9'] = EmailUtils::getLink($email->image9);

			$image['link']['banner1'] = EmailUtils::getLink($email->banner1);
			$image['link']['banner2'] = EmailUtils::getLink($email->banner2);

			$image['link']['image_block1'] = EmailUtils::getLink($email->image_block1);
			$image['link']['image_block2'] = EmailUtils::getLink($email->image_block2);
			$image['link']['image_block3'] = EmailUtils::getLink($email->image_block3);
			$image['link']['image_block4'] = EmailUtils::getLink($email->image_block4);
			$image['link']['image_block5'] = EmailUtils::getLink($email->image_block5);
			$image['link']['image_block6'] = EmailUtils::getLink($email->image_block6);

		}

		}
		
		

		//var_dump($image['link']);
		foreach ($image['link'] as $key => $value) {
			//echo $key;
			//echo '<pre>';
			$Link_res = EmailUtils::checkUrl($value);

			$link['info'][$key] = $Link_res;
			//$link['url'][$key] = $Link_res['url'];
			//echo '</pre>';
		}
		//var_dump($link['info']);
		return array(
				
				'link'	=>$link,
				
				);

		//die();
	}
	
    /**
	 * @Route("/emaillog/{email}", name="email_emaillog")
	 */
	function emaillogAction($email)
	{
		$em = $this->getDoctrine()->getManager();
		$entity = $em->getRepository('ApplicationTemplateBundle:Emaillog')->findOneBy(array('name' => $email));
		if(!$entity){
			$entity  = new Emaillog();
			$entity->setName($email);
			$entity->setUser($this->getUser());
			$entity->setIpAdress($_SERVER['REMOTE_ADDR']);
			$entity->setUpdatedAt(new \DateTime());
			$entity->setStatus('locked');
			$em->persist($entity);
    		$em->flush();
		}else{
			 $last_updated =  $entity->getUpdatedAt();
			 var_dump(strtotime($last_updated->format("Y-m-d H:i:s")));	
			  $current_time = strtotime(date("Y-m-d H:i:s"));

			$entity->setUpdatedAt(new \DateTime());
			$em->persist($entity);
    		$em->flush();
			//echo 'false';
		}
			
			exit;
	}
	/**
	 * @Route("/getEmaillog/{email}", name="email_getEmaillog")
	 */
	function getEmaillogAction($email)
	{
		$em = $this->getDoctrine()->getManager();
		$entity = $em->getRepository('ApplicationTemplateBundle:Emaillog')->findOneBy(array('name' => $email));
		if(!$entity){
			echo 'allow';   
		}else{
			$last_updated =  $entity->getUpdatedAt();
			$last_updated = strtotime($last_updated->format("Y-m-d H:i:s"));	
			$current_time = strtotime(date("Y-m-d H:i:s"));
			$diff =  $current_time - $last_updated;
				if($diff > 10 || (!$entity)){
					echo 'allow';   
				}else{
					echo 'locked';
				}
		}
		
			
			exit;
	}
	/**
	 * @Route("/delete/{path}/{template}", name="email_delete")
	 */
	function deleteAction($path,$template)
	{
		//echo $path; 
		//echo $path; 
		$info = $this->getInfo($template,$path);
		$root = $info['node'];

		//$root = $this->container->getParameter('email_doc');
		$this->dm = $this->get('doctrine_phpcr.odm.default_document_manager');
		$path = $root.trim($path, "/");	//die();
		$event = $this->dm->getRepository($info['emaildoc'])->find($path);
		//echo $event->title;
		$event->status = 1;
		$this->dm->persist($event);
        $this->dm->flush();
        return $this->redirect($this->generateUrl('email'));
        //exit;
		//die();

	}
	/**
	 * @Route("/imageUpdate/{path}/{template}", name="email_imageUpdate")
	 */
	function imageUpdateAction($path,$template='bbc')
	{
		//echo $path;
		//var_dump($_POST);
		$info = $this->getInfo($template,$path);
		$root = $info['node'];
		
		$imagePath = 'http://ichef.bbci.co.uk/images/ic/';
		$podDimension = '304x171/';
		$middlePodDimension = '304x171/';
		$noDimension = 'raw/';


		$this->dm = $this->get('doctrine_phpcr.odm.default_document_manager');
		$path = $root.trim($path, "/");	//die();
		$email = $this->dm->getRepository($info['emaildoc'])->find($path);
		//echo $email->getSignature();

		$image['signature'] = '<img alt="" src="'.$imagePath.$noDimension.$_POST['signature'].'.jpg" />';
		$image['hero'] = '<img alt="" src="'.$imagePath.$noDimension.$_POST['hero'].'.jpg" />';
		$image['pod1'] = '<img alt="" src="'.$imagePath.$podDimension.$_POST['pod1'].'.jpg" />';
		$image['pod2'] = '<img alt="" src="'.$imagePath.$podDimension.$_POST['pod2'].'.jpg" />';
		$image['pod3'] = '<img alt="" src="'.$imagePath.$podDimension.$_POST['pod3'].'.jpg" />';
		$image['pod4'] = '<img alt="" src="'.$imagePath.$podDimension.$_POST['pod4'].'.jpg" />';
		$image['pod5'] = '<img alt="" src="'.$imagePath.$podDimension.$_POST['pod5'].'.jpg" />';
		$image['banner'] = '<img alt="" src="'.$imagePath.$noDimension.$_POST['banner'].'.jpg" />';
		//var_dump($image);
		if($_POST['signature'] != ''){
			$email->setSignature($image['signature']);
		}
		if($_POST['hero'] != ''){
			$email->image1 = $image['hero'];
		}
		if($_POST['pod1']!= ''){
			$email->image2 = $image['pod1'];
		}
		if($_POST['pod2']!= ''){
			$email->image3 = $image['pod2'];
		}
		if($_POST['pod3']!= ''){
			$email->image4 = $image['pod3'];
		}
		if($_POST['pod4']!= ''){
			$email->image5 = $image['pod4'];
		}
		if($_POST['pod5']!= ''){
			$email->image6 = $image['pod5'];
		}
		if($_POST['banner']!= ''){
			$email->banner = $image['banner'];
		}
		$this->dm->persist($email);
        $this->dm->flush();

		exit;

	}
	
	




	/**
	 * @Route("/edit/{path}", name="email_edit", requirements={"path"=".+"})
	 * @Template
	 */
	function editAction($path)
	{
		
	}

	/**
	 * @Route("/create/{parentPath}", requirements={"parentPath" = ".*"}, name="email_create")
	 * @Template
	 */
	function createAction($parentPath)
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
