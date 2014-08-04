<?php

namespace Application\TemplateBundle\Controller;

use Application\TemplateBundle\Document\BBC ;
use Application\TemplateBundle\Document\Zsl ;
use Application\TemplateBundle\Document\Touchstone ;
use Application\TemplateBundle\Document\Touchstone2 ;
use Application\TemplateBundle\Document\BBCEmail;
use Application\TemplateBundle\Document\ZslEmail;
use Application\TemplateBundle\Document\TouchstoneEmail;
use Application\TemplateBundle\Document\Touchstone2Email;
use Application\TemplateBundle\Document\BBCArchive ;
use Application\TemplateBundle\Document\ZslArchive ;
use Application\TemplateBundle\Document\TouchstoneArchive;
use Application\TemplateBundle\Document\Touchstone2Archive;


use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\DomCrawler\Crawler;
use Symfony\Component\Config\FileLocator;

use Application\TemplateBundle\Utils\EmailUtils;
/**
 * @Route("/archive")
 *
 */
class ArchieveController extends Controller
{
    /**
     * @Route("/",name="archieve")
     * @Template()
     */
    public function indexAction()
    {
    	
    	$info = $this->getInfo('bbc',NULL);
    	//var_dump($info);
		$root = $info['archive'];
        $this->dm = $this->get('doctrine_phpcr.odm.default_document_manager');
		$decendants = $this->dm->getRepository($info['archivedoc'])->findBy(array(), array('created_at'=>'desc'));
	

		$this->getRequest()->setLocale("en");
		$baseUrl = "/archive/"; 
		if($this->get('kernel')->getEnvironment() == 'dev'){
			$baseUrl = '/app_dev.php'.$baseUrl;
		}
		//$decendants[0]->geteDate();
		foreach ($decendants as $decendant) {
			 $decendant->created_at = $decendant->created_at->format("Y.m.d");
		}
		return array('decendants' => $decendants,'baseUrl' => $baseUrl);
    }
    function getInfo($template=NULl,$email=NULL){
        //echo stristr($template,'bbc');

        //echo $template; 
        //echo stristr($template,'zsl');
        
        if(stristr($template,'zsl') == 'zsl'){
            $info['twig_file'] = 'zsl_view.html.twig';
            $info['preview'] = 'zsl_preview.html.twig';
            $info['node'] = $this->container->getParameter('zsl_email_doc');
            $info['template'] = $this->container->getParameter('zsl_template_doc');
            $info['archive'] = $this->container->getParameter('zsl_archive_doc');
            $info['templatedoc'] = 'Application\TemplateBundle\Document\Zsl';
            $info['emaildoc'] = 'Application\TemplateBundle\Document\ZslEmail';
            $info['archivedoc'] = 'Application\TemplateBundle\Document\ZslArchive';
            $info['inst'] = new ZslEmail();
            $info['inst_archive'] = new ZslArchive();
            $info['create'] = 'ZSL';
            
        }
        if(stristr($template,'bbc') == 'bbc'){
            
            $info['twig_file'] = 'bbc_view.html.twig';
            $info['preview'] = 'download_email.html.twig';
            $info['node'] = $this->container->getParameter('bbc_email_doc');
            $info['template'] = $this->container->getParameter('bbc_template_doc');
            $info['archive'] = $this->container->getParameter('bbc_archive_doc');
            $info['emaildoc'] = 'Application\TemplateBundle\Document\BBCEmail';
            $info['templatedoc'] = 'Application\TemplateBundle\Document\BBC';
            $info['archivedoc'] = 'Application\TemplateBundle\Document\BBCArchive';
            $info['inst'] = new BBCEmail();
            $info['inst_archive'] = new BBCArchive();
            $info['create'] = 'BBC';
        } 
        if(stristr($template,'touchstone') == 'touchstone'){
			$info['twig_file'] = 'touchstone_view.html.twig';
			$info['preview'] = 'touchstone_preview.html.twig';
			$info['node'] = $this->container->getParameter('touchstone_email_doc');
			$info['template'] = $this->container->getParameter('touchstone_template_doc');
			$info['archive'] = $this->container->getParameter('touchstone_archive_doc');
			$info['emaildoc'] = 'Application\TemplateBundle\Document\TouchstoneEmail';
			$info['templatedoc'] = 'Application\TemplateBundle\Document\Touchstone';
			$info['archivedoc'] = 'Application\TemplateBundle\Document\TouchstoneArchive';
			$info['inst'] = new TouchstoneEmail();
			$info['inst_archive'] = new TouchstoneArchive();
			$info['create'] = 'Touchstone';
		}
		if(stristr($template,'touchstone2') == 'touchstone2'){
			$info['twig_file'] = 'touchstone2_view.html.twig';
			$info['preview'] = 'touchstone2_preview.html.twig';
			$info['node'] = $this->container->getParameter('touchstone2_email_doc');
			$info['template'] = $this->container->getParameter('touchstone2_template_doc');
			$info['archive'] = $this->container->getParameter('touchstone2_archive_doc');
			$info['emaildoc'] = 'Application\TemplateBundle\Document\Touchstone2Email';
			$info['templatedoc'] = 'Application\TemplateBundle\Document\Touchstone2';
			$info['archivedoc'] = 'Application\TemplateBundle\Document\Touchstone2Archive';
			$info['inst'] = new Touchstone2Email();
			$info['inst_archive'] = new Touchstone2Archive();
			$info['create'] = 'Touchstone2';
		} 
		if(stristr($template,'touchstone3') == 'touchstone3'){
			$info['twig_file'] = 'touchstone3_view.html.twig';
			$info['preview'] = 'touchstone3_preview.html.twig';
			$info['node'] = $this->container->getParameter('touchstone2_email_doc');
			$info['template'] = $this->container->getParameter('touchstone2_template_doc');
			$info['archive'] = $this->container->getParameter('touchstone2_archive_doc');
			$info['emaildoc'] = 'Application\TemplateBundle\Document\Touchstone2Email';
			$info['templatedoc'] = 'Application\TemplateBundle\Document\Touchstone2';
			$info['archivedoc'] = 'Application\TemplateBundle\Document\Touchstone2Archive';
			$info['inst'] = new Touchstone2Email();
			$info['inst_archive'] = new Touchstone2Archive();
			$info['create'] = 'Touchstone2';
		}
		if(stristr($template,'touchstone4') == 'touchstone4'){
			$info['twig_file'] = 'touchstone4_view.html.twig';
			$info['preview'] = 'touchstone4_preview.html.twig';
			$info['node'] = $this->container->getParameter('touchstone2_email_doc');
			$info['template'] = $this->container->getParameter('touchstone2_template_doc');
			$info['archive'] = $this->container->getParameter('touchstone2_archive_doc');
			$info['emaildoc'] = 'Application\TemplateBundle\Document\Touchstone2Email';
			$info['templatedoc'] = 'Application\TemplateBundle\Document\Touchstone2';
			$info['archivedoc'] = 'Application\TemplateBundle\Document\Touchstone2Archive';
			$info['inst'] = new Touchstone2Email();
			$info['inst_archive'] = new Touchstone2Archive();
			$info['create'] = 'Touchstone2';
		}
		
//var_dump($info);
    //  die();
        return $info;
    }
     /**
     * @Route("/show/{path}/{template}",name="archieve_show")
     * @Template()
     */
    public function showAction($path,$template)
    {	
    	//$email = $path;
    	$info = $this->getInfo($template,$path);
		$root = $info['archive'];
		$this->dm = $this->get('doctrine_phpcr.odm.default_document_manager');
		$arc_path = $root.trim($path, "/");	
		//echo $info['archivedoc'];
		$archieve = $this->dm->getRepository($info['archivedoc'])->find($arc_path);
		//var_dump($archieve);

		$baseUrl = "/archive/"; 
		if($this->get('kernel')->getEnvironment() == 'dev'){
			$baseUrl = '/app_dev.php'.$baseUrl;
		}

    	 $iframe_path = $baseUrl.'view/'.$path.'/'.$template;
    	$versioninfo = $this->dm->getAllLinearVersions($archieve);
		$i = 0;
    	foreach($versioninfo as $version){
    		$ver_array[$i] = $version['name'];
    		$i++;
    	}

    	$res = array(		
    		'template' => $template,   
		   'email' => $path,
           'iframe_path' => $iframe_path,
           'version' =>$ver_array,		

        );
        return $res;
    }
    /**
     * @Route("/view/{path}/{template}",name="archieve_view")
     * @Template
     */
    public function viewAction($path,$template)
    {
    	//echo $path; die();
    	$info = $this->getInfo($template,$path);
		$root = $info['archive'];
		$this->dm = $this->get('doctrine_phpcr.odm.default_document_manager');
		$arc_path = $root.trim($path, "/");	
		$archieve = $this->dm->getRepository($info['archivedoc'])->find($arc_path);

		$result = EmailUtils::getEmaildata($archieve,$template);
		

		$res =  array(
				'event' => $result['event'],
				'image' =>$result['image'],
				'cta'	=>$result['cta'],
				'title' =>$result['title'],
				'background'=>$result['background'],
				);
		return $this->render('ApplicationTemplateBundle:Email:'.$info['preview'], $res);
    }
    /**
     * @Route("/final/{path}/{template}" , name="archieve_final")
     */
    public function finalAction($path,$template)
    {
    	$info = $this->getInfo($template,$path);
		$root = $info['archive'];
    	
       	$eventPathName = $path;
			
		$this->dm = $this->get('doctrine_phpcr.odm.default_document_manager');
		


    	$arc_root = $info['archive'];
		$archievepath = $arc_root.trim($path, "/");
       	$archieve = $this->dm->getRepository($info['archivedoc'])->find($archievepath);
		if(!$archieve){
			//create a new archieve document which replicat of email
			$archieve = $info['inst_archive'];
			$archieve->path = $archievepath;
        	$archieve->title = $eventPathName;
        	$archieve->template = $template;
        	$archieve->created_at = new \DateTime();
        	$this->dm->persist($archieve);
        	$this->dm->flush();
			
			$this->createArchieve($path,$template);
		}else{
			
			$this->dm->checkpoint($archieve);
			$this->createArchieve($path,$template);
			
		}
		$this->snapshot($path,$template);
		echo 'Saved!!';
		exit;
	
    }
    /**
	 * @Route("/viewVersion/{email}/{ver}/{template}", name="archieve_viewVersion")
	 * @Template
	 */
	public function viewVersionAction($email,$ver,$template)
	{
		$info = $this->getInfo($template,$email);
		//var_dump($info);
		$root = $info['archive'];

		$ver = str_replace('_','.',$ver);
		//$root = $this->container->getParameter('archive_doc');
		$this->dm = $this->get('doctrine_phpcr.odm.default_document_manager');
		$path = $root.trim($email, "/");	
		$event = $this->dm->getRepository($info['archivedoc'])->find($path);
		
				
		$version = $this->dm->findVersionByName($info['archivedoc'], $event->path, $ver);

		$result = EmailUtils::getEmaildata($version,$template);
		//echo $version->title1;  //die();
		$res =  array(
				'event' => $result['event'],
				'image' =>$result['image'],
				'cta'	=>$result['cta'],
				'title' =>$result['title'],
				'background'=>$result['background'],
				);	
		return $this->render('ApplicationTemplateBundle:Email:'.$info['preview'], $res);
    	
	}
    
    function createArchieve($path,$template)
    {
    	$info = $this->getInfo($template,$path);
		$root = $info['node'];
       	$eventPathName = $path;
		$emailpath = $root.trim($path, "/");	
		$this->dm = $this->get('doctrine_phpcr.odm.default_document_manager');
		$email = $this->dm->getRepository($info['emaildoc'])->find($emailpath);
		echo $email->hero;


    	$arc_root = $info['archive'];
		$archievepath = $arc_root.trim($path, "/");
		$archieve = $this->dm->getRepository($info['archivedoc'])->find($archievepath);
		$archieve->template = $template;


		//create a new archieve document which replicat of email
		echo $function_name = 'create'.$info['create'];
		$archieve = EmailUtils::$function_name($archieve,$email);
		echo $archieve->hero;
  		$this->dm->persist($archieve);
        $this->dm->flush();

    }
    /**
	 * @Route("/typeahead", name="archieve_typeahead")
	 */
	function typeaheadAction()
	{
		//var_dump($_POST);
		$template = $_POST['template'];
		$info = $this->getInfo($template,NULL);
		$data = $_POST['data']; //die();
		if($_POST['date'] != ''){
			$Emaildate = explode('~',$_POST['date']);
			$from = EmailUtils::formatDate($Emaildate[0] ,'from');
			$to = EmailUtils::formatDate($Emaildate[1] ,'to');
		}else{
			//echo 'test';
			$Emaildate = '';

		}
		//var_dump($Emaildate);
		$res_str = '';
		$this->dm = $this->get('doctrine_phpcr.odm.default_document_manager');
		//echo '%'.$data.'%';
         $qb = $this->dm->createQueryBuilder();
		$qb->from()->document($info['archivedoc'],'a')->end();
					
		$qb->where()->orX()
						->like()->lowerCase()->field('a.title')->end()->literal('%'.strtolower($data).'%')->end()
   						->like()->lowerCase()->field('a.title1')->end()->literal('%'.strtolower($data).'%')->end();
   						//->like()->lowerCase()->field('a.template')->end()->literal('%'.strtolower($data).'%')->end();
   						
		if($Emaildate != ''){
				//echo 'test';
			$qb->andWhere()->andX()
						->gte()->field('a.created_at')->literal($from)->end()
   						->lte()->field('a.created_at')->literal($to)->end();
   		}
		//$qb->andWhere()->eq()->field('a.status')->literal('0')->end();
		$qb->andWhere()->like()->lowerCase()->field('a.template')->end()->literal('%'.strtolower($template).'%')->end();
		$qb->orderBy()->desc()->field('a.created_at')->end();
		//echo $qb->getQuery()->getStatement();
        $decendants = $qb->getQuery()->execute();
        	//echo count($decendants);
		if(count($decendants) == 0){
			echo '0';
		}else{
			foreach ($decendants as $key =>$value) {
				//$path = explode('/',$value->path);
				//$emailPath = $path[count($path)-1];
			
			$email = $value->title.'~'.str_replace('template_','',$value->template).'~'.$value->title1.'~'.$value->created_at->format("Y.m.d");
			$res_str = $res_str.$email.'|';
			
			
			}
			echo $res_str;
		}
		exit;
		
	}
	
	/**
	 * @Route("/snapshot/{path}/{template}", name="archieve_snapshot")
	 */
	function snapshot($path,$template)
	{
		$info = $this->getInfo($template,$path);
		$root = $info['archive'];
		//$root = $this->container->getParameter('archive_doc');
		$emailpath = $root.trim($path, "/");	
		$this->dm = $this->get('doctrine_phpcr.odm.default_document_manager');
		$event = $this->dm->getRepository($info['archivedoc'])->find($emailpath);
		
		//echo $info['archivedoc'];

		$result = EmailUtils::getEmaildata($event,$template);
		
		$content = $this->renderView(
    					'ApplicationTemplateBundle:Email:'.$info['preview'],	array('event' => $result['event'],'image' =>$result['image'],
				'cta'	=>$result['cta'],'title' =>$result['title'],'background'=>$result['background'])
		);
		echo $imagepath = EmailUtils::createImage($path,$content,'archive/');
		//$resize_com = "convert -size 155x303 ".$imagepath." -resize 155x303 ".$imagepath;
		//exec($resize_com);
	}
	

}
