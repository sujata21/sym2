<?php

namespace AW\TestPlatformBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use AW\TestPlatformBundle\Entity\Tests;
use AW\TestPlatformBundle\Form\TestsType;
use AW\TestPlatformBundle\Entity\Comments;
use AW\TestPlatformBundle\Form\CommentsType;

/**
 * Tests controller.
 *
 * @Route("/testplatform")
 */
class TestsController extends Controller
{
    /**
     * Lists all Tests entities.
     *
     * @Route("/", name="tests")
     * @Method("GET")
     * @Template()
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager('testplatform');

        $entities = $em->getRepository('AWTestPlatformBundle:Tests')->findAll();

        return array(
            'entities' => $entities,
        );
    }
    
    /**
     * Admin main page.
     *
     * @Route("/admin", name="admin_tests")
     * @Method("GET")
     * @Template()
     */
    public function adminAction()
    {
    	
    	return $this->render('AWTestPlatformBundle:Tests:admin.html.twig');
    	
    }
    
    /**
     * Welcome tab page.
     *
     * @Route("/welcome", name="welcome")
     * @Method("GET")
     * @Template()
     */
    public function welcomeAction()
    {
    	 
    	return $this->render('AWTestPlatformBundle:Tests:welcome.html.twig');
    	 
    }
    
    /**
     * Statistics tab page.
     *
     * @Route("/statistics", name="statistics")
     * @Method("GET")
     * @Template("AWTestPlatformBundle:Tests:statistics.html.twig")
     */
    public function statisticsAction()
    {
    
    	$em = $this->getDoctrine()->getManager('testplatform');
    	
    	//active tests count
    	$entities = $em->getRepository('AWTestPlatformBundle:Tests')->findBy(array('status' => '0'));
    	$testsActiveCount = count($entities);

    	//archive tests count
    	$entities = $em->getRepository('AWTestPlatformBundle:Tests')->findBy(array('status' => '1'));
    	$testsArchiveCount = count($entities);
    	
    	//all tests count
    	$entities = $em->getRepository('AWTestPlatformBundle:Tests')->findAll();
    	$testsCount = count($entities);
    	
    	//variable init
    	$diffTestsTime = 0;
    	 
    	foreach ($entities as $entity) {
    	
    		//get time difference for entities
    		if ($entity->getUpdated() != null) {
    			$diffTestsTime += date_timestamp_get($entity->getUpdated()) - date_timestamp_get($entity->getCreated());
    		}
    		
    	}
    	
    	//avg time difference
    	$diffAllTestsTime = $diffTestsTime/count($entities);
    	 
    	//avg time in hours
    	$diffAvgTestsTimeHours = round($diffAllTestsTime/1440, 2);
    	
	    //finds all comments ALL
	    $entities = $em->getRepository('AWTestPlatformBundle:Comments')->findAll();
    	$commAll = count($entities);
    	
    	//variable init
    	$diffCommTime = 0;
    	
    	foreach ($entities as $entity) {
    		
    		//get time difference for entities
    		if ($entity->getUpdated()) {
    			$diffCommTime += date_timestamp_get($entity->getUpdated()) - date_timestamp_get($entity->getCreated());
    		}
    		
    		//$diffTime = $entity->getUpdated()->format('U') - $entity->getCreated()->format('U');
    		//$diffTime = $entity->getCreated()->diff($entity->getUpdated());
    		//$diffTimeArray[$entity->getId()] = date('H:i:s',$diffTime);
    		
    		/*
    		$diffTimeDays += (int)$diffTime->format('%a');
    		$diffTimeHours += (int)$diffTime->format('%h');
    		$diffTimeMinutes += (int)$diffTime->format('%m');
    		$diffTimeSeconds += (int)$diffTime->format('%s');
    		*/
    		
    		/*
    		$diffTimeArray[$entity->getId()]['d'] = (int)$diffTime->format('%a');
    		$diffTimeArray[$entity->getId()]['h'] = (int)$diffTime->format('%h');
    		$diffTimeArray[$entity->getId()]['m'] = (int)$diffTime->format('%i');
    		$diffTimeArray[$entity->getId()]['s'] = (int)$diffTime->format('%s');
    		*/
    	}
    	
    	//avg time difference
    	$diffAllCommTime = $diffCommTime/count($entities);
    	
    	//avg time in hours
    	$diffAvgCommTimeHours = round($diffAllCommTime/1440, 2);
    	
    	//finds all comments with status 0 = NEW
    	$entitiesCommentsNew = $em->getRepository('AWTestPlatformBundle:Comments')->findBy(array('status' => 0));
    	$commNew = count($entitiesCommentsNew);
    	
    	//finds all comments with status 1 = DONE
    	$entitiesCommentsDone = $em->getRepository('AWTestPlatformBundle:Comments')->findBy(array('status' => 1));
    	$commDone = count($entitiesCommentsDone);
    	
    	//comments count for testers
    	$query = $em->createQuery('SELECT c.testers_email FROM AWTestPlatformBundle:Comments c GROUP BY c.testers_email ORDER BY c.testers_email ASC');
    	$entitiesCommsT = $query->getResult();
    	for ($i = 0; $i < count($entitiesCommsT); $i++) {
    		$entities = $em->getRepository('AWTestPlatformBundle:Comments')->findBy(array('testers_email' => $entitiesCommsT[$i]['testers_email']));
    		$entitiesCommsT[$i]['commsC'] = count($entities);
    	}

    	//comments count for devs
    	$query = $em->createQuery('SELECT c.dev_email FROM AWTestPlatformBundle:Comments c GROUP BY c.dev_email ORDER BY c.dev_email ASC');
    	$entitiesCommsD = $query->getResult();
    	for ($i = 0; $i < count($entitiesCommsD); $i++) {
    		$entities = $em->getRepository('AWTestPlatformBundle:Comments')->findBy(array('dev_email' => $entitiesCommsD[$i]['dev_email']));
    		$entitiesCommsD[$i]['commsD'] = count($entities);
    	}

    	return array(
    			'testsCount' => $testsCount,
	    		'testsActiveCount' => $testsActiveCount,
	    		'testsArchiveCount' => $testsArchiveCount,
	    		'commentsAll' => $commAll,
	    		'commentsNew' => $commNew,
	    		'commentsDone' => $commDone,
	    		'diffAvgCommTimeHours' => $diffAvgCommTimeHours,
	    		'diffAvgTestsTimeHours' => $diffAvgTestsTimeHours,
    			'commsT' => $entitiesCommsT,
    			'commsD' => $entitiesCommsD,
    	);
    
    }
    
    /**
     * Lists all Tests entities for Tests tab.
     *
     * @Route("/admintests", name="admin_tests1")
     * @Method("GET")
     * @Template()
     */
    public function adminTestsAction()
    {
    	/* $em = $this->getDoctrine()->getManager('testplatform');
    
    	$entities = $em->getRepository('AWTestPlatformBundle:Tests')->findAll(array('status' => '0'));
    	 
    	// tests count
    	$testsCount = count($entities);
    	
    	if (count($entities) != 0) {
    		//comments for test array
    		$comm = array();
    		
    		foreach ($entities as $entity) {
    		
    			//finds all comments
    			$entitiesComments = $em->getRepository('AWTestPlatformBundle:Comments')->findBy(array('testId' => $entity->getId()));
    			$comm[$entity->getId()] = count($entitiesComments);
    			 
    			//finds all comments with status 0 = NEW
    			$entitiesCommentsNew = $em->getRepository('AWTestPlatformBundle:Comments')->findBy(array('testId' => $entity->getId(), 'status' => 0));
    			$commNew[$entity->getId()] = count($entitiesCommentsNew);
    		
    			//finds all comments with status 1 = DONE
    			$entitiesCommentsDone = $em->getRepository('AWTestPlatformBundle:Comments')->findBy(array('testId' => $entity->getId(), 'status' => 1));
    			$commDone[$entity->getId()] = count($entitiesCommentsDone);
    		
    		}
    		
    		return array(
    				'entities' => $entities,
    				'comments' => $comm,
    				'commentsNew' => $commNew,
    				'commentsDone' => $commDone,
    				'testsCount' => $testsCount,
    		);
    	} */
    	
    	return $this->render('AWTestPlatformBundle:Tests:adminTests.html.twig');
    	
    	 
    }
    
    /**
     * Lists searched Tests entities for Tests tab. Searches in all tests incl. archive
     *
     * @Route("/searchbox/{status},{text},{who}", name="search")
     * @Method("GET")
     * @Template()
     */
    public function searchAction($status, $text, $who){
    	
    	$em = $this->getDoctrine()->getManager('testplatform');
    
    	$entities = $em->getRepository('AWTestPlatformBundle:Tests')->findAll();
    	
    	$query = $em->createQuery('SELECT t FROM AWTestPlatformBundle:Tests t WHERE t.status=:status AND t.name LIKE :text')
	    ->setParameters(array('text' => '%'.$text.'%', 'status' => $status));
	    $entities = $query->getResult();
    	
	    // tests count
	    $testsCount = count($entities);
	    
	    if (count($entities) != 0) {
	    	//comments for test array
	    	$comm = array();
	    	 
	    	foreach ($entities as $entity) {
	    	
	    		//finds all comments
	    		$entitiesComments = $em->getRepository('AWTestPlatformBundle:Comments')->findBy(array('testId' => $entity->getId()));
	    		$comm[$entity->getId()] = count($entitiesComments);
	    			
	    		//finds all comments with status 0 = NEW
	    		$entitiesCommentsNew = $em->getRepository('AWTestPlatformBundle:Comments')->findBy(array('testId' => $entity->getId(), 'status' => 0));
	    		$commNew[$entity->getId()] = count($entitiesCommentsNew);
	    	
	    		//finds all comments with status 1 = DONE
	    		$entitiesCommentsDone = $em->getRepository('AWTestPlatformBundle:Comments')->findBy(array('testId' => $entity->getId(), 'status' => 1));
	    		$commDone[$entity->getId()] = count($entitiesCommentsDone);
	    	
	    	}
	    	 
			switch ($who) {
    		    case 'admin':
    		        $jsonResponse['html']=$this->renderView('AWTestPlatformBundle:Tests:search.html.twig',array(
		    				'entities' => $entities,
		    				'comments' => $comm,
		    				'commentsNew' => $commNew,
		    				'commentsDone' => $commDone,
		    		));
    		        break;
    		    case 'tester':
    				$jsonResponse['html']=$this->renderView('AWTestPlatformBundle:Tests:searchList.html.twig',array(
		    				'entities' => $entities,
		    				'comments' => $comm,
		    				'commentsNew' => $commNew,
		    				'commentsDone' => $commDone,
		    		));
    		        break;
    		}
	    }else {
	    	$jsonResponse['html'] = '<div style="padding: 20px;font-weight: bold;">Sorry. No matching tests.</div>';
	    }
	    
	    $jsonResponse['testsCount'] = $testsCount;
	    
    	$response = new Response(json_encode($jsonResponse));
    	$response->headers->set('Content-Type', 'application/json');
    	return $response;
    }
	
    /**
     * Lists all Tests entities on admin page.
     *
     * @Route("/searchall/{status},{who}", name="search_all")
     * @Method("GET")
     * @Template()
     */
    public function searchAllAction($status,$who){
    	 
    	$em = $this->getDoctrine()->getManager('testplatform');
    
    	switch ($status) {
    	    case '1'://only inactive tests sessions
    	        //$entities = $em->getRepository('AWTestPlatformBundle:Tests')->findAll();
    	    	$entities = $em->getRepository('AWTestPlatformBundle:Tests')->findBy(array('status' => $status));
    	        break;
    	    case '0'://only active tests sessions - status = 0
    			$entities = $em->getRepository('AWTestPlatformBundle:Tests')->findBy(array('status' => $status));
    	        break;
    	    default://only active tests sessions - status = 0
    	    	$entities = $em->getRepository('AWTestPlatformBundle:Tests')->findBy(array('status' => '0'));
    	}
    	//$entities = $em->getRepository('AWTestPlatformBundle:Tests')->findAll();
    	// tests count
    	$testsCount = count($entities);
    	
    	if (count($entities) != 0) {
    		//comments for test array
    		$comm = array();
    		
    		foreach ($entities as $entity) {
    		
    			//finds all comments
    			$entitiesComments = $em->getRepository('AWTestPlatformBundle:Comments')->findBy(array('testId' => $entity->getId()));
    			$comm[$entity->getId()] = count($entitiesComments);
    			 
    			//finds all comments with status 0 = NEW
    			$entitiesCommentsNew = $em->getRepository('AWTestPlatformBundle:Comments')->findBy(array('testId' => $entity->getId(), 'status' => 0));
    			$commNew[$entity->getId()] = count($entitiesCommentsNew);
    		
    			//finds all comments with status 1 = DONE
    			$entitiesCommentsDone = $em->getRepository('AWTestPlatformBundle:Comments')->findBy(array('testId' => $entity->getId(), 'status' => 1));
    			$commDone[$entity->getId()] = count($entitiesCommentsDone);
    		
    		}
    		
    		switch ($who) {
    		    case 'admin':
    		        $jsonResponse['html']=$this->renderView('AWTestPlatformBundle:Tests:search.html.twig',array(
		    				'entities' => $entities,
		    				'comments' => $comm,
		    				'commentsNew' => $commNew,
		    				'commentsDone' => $commDone,
		    		));
    		        break;
    		    case 'tester':
    				$jsonResponse['html']=$this->renderView('AWTestPlatformBundle:Tests:searchList.html.twig',array(
		    				'entities' => $entities,
		    				'comments' => $comm,
		    				'commentsNew' => $commNew,
		    				'commentsDone' => $commDone,
		    		));
    		        break;
    		}
    		
    	}else {
    		$jsonResponse['html']= '<div style="padding: 20px;font-weight: bold;">No tests sessions found</div>';
    	}
    	
    	$jsonResponse['testsCount'] = $testsCount;
    	 
    	$response = new Response(json_encode($jsonResponse));
    	$response->headers->set('Content-Type', 'application/json');
    	return $response;
    }
    
    /**
     * Lists all Tests entities on tests index page.
     *
     * @Route("/list/", name="list_all")
     * @Method("GET")
     * @Template()
     */
    public function searchListAction(){
    
    	$em = $this->getDoctrine()->getManager('testplatform');
    
    	//only active tests
    	$entities = $em->getRepository('AWTestPlatformBundle:Tests')->findBy(array('status' => '0'));
    	 
    	// tests count
    	$testsCount = count($entities);
    	
    	if (count($entities) != 0) {
    		//comments for test array
    		$comm = array();
    		
    		foreach ($entities as $entity) {
    		
    			//finds all comments
    			$entitiesComments = $em->getRepository('AWTestPlatformBundle:Comments')->findBy(array('testId' => $entity->getId()));
    			$comm[$entity->getId()] = count($entitiesComments);
    			 
    			//finds all comments with status 0 = NEW
    			$entitiesCommentsNew = $em->getRepository('AWTestPlatformBundle:Comments')->findBy(array('testId' => $entity->getId(), 'status' => 0));
    			$commNew[$entity->getId()] = count($entitiesCommentsNew);
    		
    			//finds all comments with status 1 = DONE
    			$entitiesCommentsDone = $em->getRepository('AWTestPlatformBundle:Comments')->findBy(array('testId' => $entity->getId(), 'status' => 1));
    			$commDone[$entity->getId()] = count($entitiesCommentsDone);
    		
    		}
    		
    		$jsonResponse['html']=$this->renderView('AWTestPlatformBundle:Tests:searchList.html.twig',array(
    				'entities' => $entities,
    				'comments' => $comm,
    				'commentsNew' => $commNew,
    				'commentsDone' => $commDone,
    		));
    	}
    	
    	$jsonResponse['testsCount'] = $testsCount;
    
    	$response = new Response(json_encode($jsonResponse));
    	$response->headers->set('Content-Type', 'application/json');
    	return $response;
    }
    
    /**
     * Ends Tests and send email.
     *
     * @Route("/end/{id}", name="tests_end")
     * @Method("GET")
     * @Template()
     */
    public function endAction($id)
    {
    	$em = $this->getDoctrine()->getManager('testplatform');
    	//finds test
    	$entity = $em->getRepository('AWTestPlatformBundle:Tests')->find($id);
    	$entity->setUpdated(date("Y-m-d H:i:s"));
    	$em->persist($entity);
    	$em->flush();
    	
    	//finds all comments
    	$entities = new Comments();
    	$entities = $em->getRepository('AWTestPlatformBundle:Comments')->findBy(array('testId' => $id ));
    	
    	$message = \Swift_Message::newInstance()
    		->setContentType("text/html")
	        ->setSubject('AW Test Platform Report '.$entity->getName().'')
	        ->setFrom($entity->getEmail()) //testers email provided in test session
	        ->setTo('rstraburzynski@alchemyworx.com') //it should be dev@alchemyworx.com
	        ->setBody($this->renderView('AWTestPlatformBundle:Tests:email.html.twig', array(
	        																			'entity' => $entity,
	        																			'entities' => $entities,
	        																			)))
	    ;
	    if ($entity->getEmail()) {
	    	$ccEmail = $entity->getEmail();//copy of test report sended to testers email provided in test session
	    	$message->addCc($ccEmail);
	    }
	    
	    for ($i=0; $i <= count($entities)-1; $i++){
	    	//if ($entities[$i]->getAttachment() != null && $entities[$i]->getIsImage() == 1) { //attach only non image files
	    	if ($entities[$i]->getAttachment() != null) {//attach images and other files
	    		$attachment = __DIR__.'/../../../../web/uploads/awtestplatform/'.$entities[$i]->getAttachment();
	    		
	    		$message->attach(\Swift_Attachment::fromPath($attachment));
	    	}
	    }
	    
	    //sending emails to any other email address provided by tester
	    $emailsTo = $entity->getEmailTo();
	    $emailsToArray = explode(';', $emailsTo);
	    
	    if (!empty($emailsToArray)) {
		    foreach ($emailsToArray as $email) {
		    	
		    	$message->addCc($email);
		    	
		    }
	    }
	    
	    $this->get('mailer')->send($message);
	    
	    //$testMess = ';-)';
	    //return $this->render('AWTestPlatformBundle:Tests:end.html.twig', array('testMess' => $testMess));
	    //return $this->redirect($this->generateUrl('tests'));
	    
	    $jsonResponse['success'] = 1;
	    
	    $response = new Response(json_encode($jsonResponse));
	    $response->headers->set('Content-Type', 'application/json');
	    return $response;
    }
    
    /**
     * Ends Tests and send email.
     *
     * @Route("/adminend/{id},{devEmail}", name="admin_end")
     * @Method("GET")
     * @Template()
     */
    public function adminEndAction($id, $devEmail)
    {
    	$em = $this->getDoctrine()->getManager('testplatform');
    	//finds test
    	$entity = $em->getRepository('AWTestPlatformBundle:Tests')->find($id);
    	//$em->persist($entity);
    	//$em->flush();
    	 
    	//finds all comments
    	$entities = new Comments();
    	$entities = $em->getRepository('AWTestPlatformBundle:Comments')->findBy(array('testId' => $id ));
    	 
    	$message = \Swift_Message::newInstance()
    	->setContentType("text/html")
    	->setSubject('AW Test Platform Dev Report '.$entity->getName().'')
    	->setFrom($devEmail) //devs email provided in dev session
    	->setTo($entity->getEmail()) //it should be dev@alchemyworx.com
    	->setBody($this->renderView('AWTestPlatformBundle:Tests:email.html.twig', array(
    			'entity' => $entity,
    			'entities' => $entities,
    	)))
    	;
    	if ($devEmail) {
    		$ccEmail = $devEmail;//copy of dev report sended to devs email provided in dev session
    		$message->addCc($ccEmail);
    	}
    	 
    	for ($i=0; $i <= count($entities)-1; $i++){
    		//if ($entities[$i]->getAttachment() != null && $entities[$i]->getIsImage() == 1) { //attach only non image files
    		if ($entities[$i]->getAttachment() != null) {//attach images and other files
    			$attachment = __DIR__.'/../../../../web/uploads/awtestplatform/'.$entities[$i]->getAttachment();
    	   
    			$message->attach(\Swift_Attachment::fromPath($attachment));
    		}
    	}
    	 
    	$this->get('mailer')->send($message);
    
    	$jsonResponse['success'] = 1;
    	 
    	$response = new Response(json_encode($jsonResponse));
    	$response->headers->set('Content-Type', 'application/json');
    	return $response;
    }

    /**
     * Marks Test as archve.
     *
     * @Route("/adminarchive/{id},{status}", name="admin_archive")
     * @Method("GET")
     * @Template()
     */
    public function adminArchiveAction($id, $status)
    {
    	$em = $this->getDoctrine()->getManager('testplatform');
    	
    	$entity = $em->getRepository('AWTestPlatformBundle:Tests')->find($id);
    	
    	if (!$entity) {
    		throw $this->createNotFoundException('Unable to find Tests entity.');
    	}
    	
    	$entity->setStatus($status);
    	
    	$em->persist($entity);
    	$em->flush();
    	
    	$jsonResponse['success'] = 1;
    
    	$response = new Response(json_encode($jsonResponse));
    	$response->headers->set('Content-Type', 'application/json');
    	return $response;
    }
    
    /**
     * Creates a new Tests entity.
     *
     * @Route("/", name="tests_create")
     * @Method("POST")
     * @Template("AWTestPlatformBundle:Tests:new.html.twig")
     */
    public function createAction(Request $request)
    {
        $entity  = new Tests();
        $form = $this->createForm(new TestsType(), $entity);
        $form->bind($request);
        
        $entity->setUseragent($_SERVER['HTTP_USER_AGENT']);
        $entity->setIpaddress($_SERVER['REMOTE_ADDR']);
        if (isset($_SERVER['HTTP_REFERER'])) {
        	$entity->setReferrer($_SERVER['HTTP_REFERER']);
        }

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager('testplatform');
            
            $em->persist($entity);
            $em->flush();

            return $this->redirect($this->generateUrl('tests_test', array('id' => $entity->getId())));
        }

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }
    
    /**
     * Displays a test form to create a new Test.
     *
     * @Route("/test/{id}", name="tests_test")
     * @Method("GET")
     * @Template()
     */
    public function testAction($id)
    {
    	$em = $this->getDoctrine()->getManager('testplatform');

        $entity = $em->getRepository('AWTestPlatformBundle:Tests')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Tests entity.');
        }
        
        $comments = new Comments();
        $form = $this->createForm(new CommentsType(), $comments);
        
        //gets all comments
        $entities = $em->getRepository('AWTestPlatformBundle:Comments')->findBy(array('testId' => $id ));
        
        $deleteForm = $this->createDeleteForm($id);
        
        $uploadDir = __DIR__.'/../../../../web/uploads/testplatform';
    
    	return array(
            'entity' => $entity,
    		'entities' => $entities,
    		'uploaddir' => $uploadDir,
    		'form'   => $form->createView(),
    		'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Displays a form to create a new Tests entity.
     *
     * @Route("/new", name="tests_new")
     * @Method("GET")
     * @Template()
     */
    public function newAction()
    {
        $entity = new Tests();
        $form   = $this->createForm(new TestsType(), $entity);
        
        $entity->setUseragent($_SERVER['HTTP_USER_AGENT']);
        $entity->setIpaddress($_SERVER['REMOTE_ADDR']);
        if (isset($_SERVER['HTTP_REFERER'])) {
        	$entity->setReferrer($_SERVER['HTTP_REFERER']);
        }

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    /**
     * Finds and displays a Tests entity.
     *
     * @Route("/{id}", name="tests_show")
     * @Method("GET")
     * @Template()
     */
    public function showAction($id)
    {
        $em = $this->getDoctrine()->getManager('testplatform');

        $entity = $em->getRepository('AWTestPlatformBundle:Tests')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Tests entity.');
        }

        $deleteForm = $this->createDeleteForm($id);

        return array(
            'entity'      => $entity,
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Displays a form to edit an existing Tests entity.
     *
     * @Route("/{id}/edit", name="tests_edit")
     * @Method("GET")
     * @Template()
     */
    public function editAction($id)
    {
        $em = $this->getDoctrine()->getManager('testplatform');

        $entity = $em->getRepository('AWTestPlatformBundle:Tests')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Tests entity.');
        }

        $editForm = $this->createForm(new TestsType(), $entity);
        $deleteForm = $this->createDeleteForm($id);

        return array(
            'entity'      => $entity,
            'edit_form'   => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Edits an existing Tests entity.
     *
     * @Route("/{id}", name="tests_update")
     * @Method("PUT")
     * @Template("AWTestPlatformBundle:Tests:edit.html.twig")
     */
    public function updateAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager('testplatform');

        $entity = $em->getRepository('AWTestPlatformBundle:Tests')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Tests entity.');
        }

        $deleteForm = $this->createDeleteForm($id);
        $editForm = $this->createForm(new TestsType(), $entity);
        $editForm->bind($request);

        if ($editForm->isValid()) {
            $em->persist($entity);
            $em->flush();

            return $this->redirect($this->generateUrl('tests_edit', array('id' => $id)));
        }

        return array(
            'entity'      => $entity,
            'edit_form'   => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Deletes a Tests entity.
     *
     * @Route("/{id}", name="tests_delete")
     * @Method("DELETE")
     */
    public function deleteAction(Request $request, $id)
    {
        $form = $this->createDeleteForm($id);
        $form->bind($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager('testplatform');
            $entity = $em->getRepository('AWTestPlatformBundle:Tests')->find($id);

            if (!$entity) {
                throw $this->createNotFoundException('Unable to find Tests entity.');
            }

            $em->remove($entity);
            $em->flush();
        }

        return $this->redirect($this->generateUrl('tests'));
    }

    /**
     * Creates a form to delete a Tests entity by id.
     *
     * @param mixed $id The entity id
     *
     * @return Symfony\Component\Form\Form The form
     */
    private function createDeleteForm($id)
    {
        return $this->createFormBuilder(array('id' => $id))
            ->add('id', 'hidden')
            ->getForm()
        ;
    }
}
