<?php

namespace AW\WorxShareBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use AW\WorxShareBundle\Entity\Projects;
use AW\WorxShareBundle\Form\ProjectsType;
use AW\WorxShareBundle\Entity\ClientsProjects;
use AW\WorxShareBundle\Entity\UsersProjects;
use AW\WorxShareBundle\Entity\Comments;

/**
 * Projects controller.
 *
 * @Route("/worxshare/projects")
 */
class ProjectsController extends Controller
{
    /**
     * Lists all Projects entities.
     *
     * @Route("/", name="worxshare_projects")
     * @Method("GET")
     * @Template()
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager('worxshare');
		
        $entities = $em->getRepository('AWWorxShareBundle:Projects')->findBy(array(), array('name' => 'ASC'));
		
        self::findClients($entities);
        
        return array(
            'entities' => $entities,
        );
    }
    
    private function findClients($entities)
    {
    	
    	$em = $this->getDoctrine()->getManager('worxshare');
    	
    	foreach ($entities as $entity) {
    		 
    		$clientsAssigned = array();
    		 
    		//find all clients assigned
    		$entitiesClientsProjects = $em->getRepository('AWWorxShareBundle:ClientsProjects')->findBy(array('projectId' => $entity->getId()));
    		foreach ($entitiesClientsProjects as $entityClientProject) {
    			$entitiesClient = $em->getRepository('AWWorxShareBundle:Clients')->findBy(array('id' => $entityClientProject->getClientId()));
    			$clientsAssigned[] = $entitiesClient[0]->getName();
    		}
    		$entity->clientsAssigned = $clientsAssigned;
    		
    		self::getImagesArray($entity);
    		 
    	}
    	
    	return $entities;
    }
	
    /**
     * Get uploaded images array
     */
    private function getImagesArray($entity){
    	 
    	$imagesDir = __DIR__.'/../../../../web/uploads/awworxshare/'.$entity->getFolder();
    	//$images = scandir($imagesDir);
    	$em = $this->getDoctrine()->getManager('worxshare');
    	
    	$imagesFiles = array();
    	
    	$images = $em->getRepository('AWWorxShareBundle:ProjectsImages')->findBy(array('projectId' => $entity->getId()));
    	foreach($images as $file)
    	{
    		//if (!is_dir("$imagesDir/$file"))
    		//{
    		$image = array();	
    		
    		$image["id"] = $file->getId();
    		$image["name"] = $file->getName();
    		$image["unique_name"] = $file->getUniqueName();
    		$image["info"] = $file->getInfo();
    		
    		array_push($imagesFiles, $image);
    		//}
    	}
    	
    	$entity->images = $imagesFiles;
    	
    	return $entity;
    }

    /**
     * Opens Project.
     *
     * @Route("/{id}/open", name="worxshare_projects_open")
     * @Method("GET")
     * @Template()
     */
    public function openAction($id)
    {
    	$em = $this->getDoctrine()->getManager('worxshare');
    
    	$entity = $em->getRepository('AWWorxShareBundle:Projects')->find($id);
    
    	$images = $em->getRepository('AWWorxShareBundle:ProjectsImages')->findBy(array('projectId' => $id));
    
    	$html = $this->container->get('templating')->render('AWWorxShareBundle:Projects:open.html.twig', array('entity' => $entity, 'images' => $images));
    	$jsonResponse = new Response(json_encode(array('html' => $html, 'success' => true)));
    	$jsonResponse->headers->set('Content-Type', 'application/json');
    
    	return $jsonResponse;
    }
        
    /**
     * Creates a new Projects entity.
     *
     * @Route("/", name="worxshare_projects_create")
     * @Method("POST")
     * @Template("AWWorxShareBundle:Projects:new.html.twig")
     */
    public function createAction(Request $request)
    {
        $entity  = new Projects();
        $form = $this->createForm(new ProjectsType(), $entity);
        $form->bind($request);
		
        if ($form->isValid()) {
			
        	//upload dir
        	$dir = __DIR__.'/../../../../web/uploads/awworxshare/';
        	//add datetime stamp to project folder name to make it unique
        	$projectFolder = str_replace(" ", "_", $form['name']->getData()).'_'.date("YmdHis").rand(0, 99);
        	
        	//create project folder
        	mkdir($dir.$projectFolder, 0755);
        	
        	$em = $this->getDoctrine()->getManager('worxshare');
        	$entity->setFolder($projectFolder);
        	$em->persist($entity);
            $em->flush();

            $entities = $em->getRepository('AWWorxShareBundle:Projects')->findBy(array(), array('name' => 'ASC'));
            
            self::findClients($entities);
            
            $html = $this->container->get('templating')->render('AWWorxShareBundle:Projects:index.html.twig', array('entities' => $entities));
            $jsonResponse = new Response(json_encode(array('html' => $html, 'success' => true)));
            $jsonResponse->headers->set('Content-Type', 'application/json');
             
            return $jsonResponse;
        }

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    /**
     * Displays a form to create a new Projects entity.
     *
     * @Route("/new", name="worxshare_projects_new")
     * @Method("GET")
     * @Template()
     */
    public function newAction()
    {
        $entity = new Projects();
        $form   = $this->createForm(new ProjectsType($this->getDoctrine()->getManager('worxshare')), $entity, array('client_id' => null));

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    /**
     * Finds and displays a Projects entity.
     *
     * @Route("/{id}", name="worxshare_projects_show")
     * @Method("GET")
     * @Template()
     */
    public function showAction($id)
    {
        $em = $this->getDoctrine()->getManager('worxshare');

        $entity = $em->getRepository('AWWorxShareBundle:Projects')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Projects entity.');
        }

        $deleteForm = $this->createDeleteForm($id);

        return array(
            'entity'      => $entity,
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Displays a form to edit an existing Projects entity.
     *
     * @Route("/{id}/edit", name="worxshare_projects_edit")
     * @Method("GET")
     * @Template()
     */
    public function editAction($id)
    {
        $em = $this->getDoctrine()->getManager('worxshare');

        $entity = $em->getRepository('AWWorxShareBundle:Projects')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Projects entity.');
        }

        $editForm = $this->createForm(new ProjectsType(), $entity);
        $deleteForm = $this->createDeleteForm($id);

        return array(
            'entity'      => $entity,
            'edit_form'   => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Edits an existing Projects entity.
     *
     * @Route("/{id}", name="worxshare_projects_update")
     * @Method("PUT")
     * @Template("AWWorxShareBundle:Projects:edit.html.twig")
     */
    public function updateAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager('worxshare');

        $entity = $em->getRepository('AWWorxShareBundle:Projects')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Projects entity.');
        }

        $editForm = $this->createForm(new ProjectsType(), $entity);
        $editForm->bind($request);

        $em->persist($entity);
        $em->flush();
        
        //update project name in UsersProjects table
        $query = $em->createQuery('UPDATE AWWorxShareBundle:UsersProjects up SET up.projectName = ?1 WHERE up.projectId = ?2');
        $query->setParameter(1, $entity->getName());
        $query->setParameter(2, $id);
        $query->getResult();
        //update project name in ClientsProjects table
        $query = $em->createQuery('UPDATE AWWorxShareBundle:ClientsProjects cp SET cp.projectName = ?1 WHERE cp.projectId = ?2');
        $query->setParameter(1, $entity->getName());
        $query->setParameter(2, $id);
        $query->getResult();
        
        $entities = $em->getRepository('AWWorxShareBundle:Projects')->findBy(array(), array('name' => 'ASC'));
        
        self::findClients($entities);
        
        $html = $this->container->get('templating')->render('AWWorxShareBundle:Projects:index.html.twig', array('entities' => $entities));
        $jsonResponse = new Response(json_encode(array('html' => $html, 'success' => true)));
        $jsonResponse->headers->set('Content-Type', 'application/json');
             
        return $jsonResponse;
    }
    
    /**
     * Deletes a Projects entity.
     *
     * @Route("/{id}/delete", name="worxshare_projects_delete")
     * @Method("POST")
     */
    public function deleteAction(Request $request, $id)
    {
        
    	$em = $this->getDoctrine()->getManager('worxshare');
    	
    	//check if Project is assigned to Clients
    	$entityClientsProjects = $em->getRepository('AWWorxShareBundle:ClientsProjects')->findBy(array('projectId' => $id));
    	if ($entityClientsProjects) {
    		$jsonResponse = new Response(json_encode(array('errorMsg' => 'hasClients','success' => false)));
    		$jsonResponse->headers->set('Content-Type', 'application/json');
    		
    		return $jsonResponse;
    	}
    	
    	//check if Project is assigned to Users
    	$entityUsersProjects = $em->getRepository('AWWorxShareBundle:UsersProjects')->findBy(array('projectId' => $id));
    	if ($entityUsersProjects) {
    		$jsonResponse = new Response(json_encode(array('errorMsg' => 'hasUsers','success' => false)));
    		$jsonResponse->headers->set('Content-Type', 'application/json');
    		
    		return $jsonResponse;
    	}
    	
    	//check if Project has assigned Comments
    	$entityComments = $em->getRepository('AWWorxShareBundle:Comments')->findBy(array('projectId' => $id, 'status' => true));
    	if ($entityComments) {
    		$jsonResponse = new Response(json_encode(array('errorMsg' => 'hasComments','success' => false)));
    		$jsonResponse->headers->set('Content-Type', 'application/json');
    		
    		return $jsonResponse;
    	}
    	
    	if (!$entityClientsProjects && !$entityUsersProjects && !$entityComments) {
    		 
    		$entity = $em->getRepository('AWWorxShareBundle:Projects')->find($id);
    		 
    		/* //delete all comments 
    		$qb = $em->createQueryBuilder()
    		->delete('AWWorxShareBundle:UsersClients', 'uc')
    		->where('uc.clientId = :client_id')
    		//->andWhere('l.user_id = :user_id')
    		->setParameter('client_id', $id);
    		//->setParameter('user_id', $user->getId());
    		$result = $qb->getQuery()->getSingleScalarResult(); */
    		
    		//delete upload dir
    		/* $dir = __DIR__.'/../../../../web/uploads/awworxshare/';
    		rmdir($dir.$entity->getFolder()); */
    		
    		//delete project
    		$em->remove($entity);
    		$em->flush();
    		
    		
    		
    		$entities = $em->getRepository('AWWorxShareBundle:Projects')->findBy(array(), array('name' => 'ASC'));
    		
    		self::findClients($entities);
    		
    		$html = $this->container->get('templating')->render('AWWorxShareBundle:Projects:index.html.twig', array('entities' => $entities));
    		$jsonResponse = new Response(json_encode(array('html' => $html, 'success' => true)));
    		$jsonResponse->headers->set('Content-Type', 'application/json');
    	
    		return $jsonResponse;
    		 
    	}
    }

    /**
     * Creates a form to delete a Projects entity by id.
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
