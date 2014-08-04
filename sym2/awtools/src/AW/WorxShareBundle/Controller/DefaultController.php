<?php

namespace AW\WorxShareBundle\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

/**
 * Default controller.
 *
 * @Route("/worxshare")
 */
class DefaultController extends Controller
{
    /**
     * @Route("/")
     * @Template("AWWorxShareBundle:Default:index.html.twig")
     */
    public function indexAction()
    {
    	$securityContext = $this->container->get('security.context');
    	
    	if( $securityContext->isGranted('IS_AUTHENTICATED_FULLY') ){
    		
    		$user = $this->container->get('security.context')->getToken()->getUser();
    		
    		$em = $this->getDoctrine()->getManager('worxshare');
		
	        $entities = $em->getRepository('AWWorxShareBundle:UsersClients')->findBy(array('userId' => $user->getId()), array('client_name' => 'ASC'));
	
			return array('entities' => self::findProjects($entities, $user->getId()));
    		
    	}else {
    		
    		//return $this->redirect('/worxshare/login');
    		return $this->redirect($this->generateUrl('fos_user_security_login'));
    		
    	}
    }
    
    private function findProjects($entities, $user_id)
    {
    	$em = $this->getDoctrine()->getManager('worxshare');
    	
    	foreach ($entities as $entity) {
    		 
    		$projectsAssigned = array();
    		
    		//find all projects assigned
    		$entitiesUsersProjects = $em->getRepository('AWWorxShareBundle:UsersProjects')->findBy(array('userId' => $user_id,'clientId' => $entity->getClientId()), array('projectName' => 'ASC'));
    		if ($entitiesUsersProjects) {
    			foreach ($entitiesUsersProjects as $entityUserProject) {
    				 
    				$project = array();
    				 
    				$entitiesProjects = $em->getRepository('AWWorxShareBundle:Projects')->findBy(array('id' => $entityUserProject->getProjectId()));
    				$project["id"] = $entitiesProjects[0]->getId();
    				$project["name"] = $entitiesProjects[0]->getName();
    				$project["info"] = $entitiesProjects[0]->getInfo();
    				
    				array_push($projectsAssigned, $project);
    			}
    		}
    		
    		$entity->projectsAssigned = $projectsAssigned;
    		 
    	}
    	return $entities;
    }
}
