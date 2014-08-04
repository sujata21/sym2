<?php

namespace AW\WorxShareBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use AW\WorxShareBundle\Entity\UsersClients;
use AW\WorxShareBundle\Form\UsersClientsType;

/**
 * UsersClients controller.
 *
 * @Route("/worxshare/usersclients")
 */
class UsersClientsController extends Controller
{
    /**
     * Lists all UsersClients entities.
     *
     * @Route("/{id}/index", name="worxshare_usersclients")
     * @Method("GET")
     * @Template()
     */
    public function indexAction($id)
    {
        $em = $this->getDoctrine()->getManager('worxshare');
		
        $entityUser = $em->getRepository('AWWorxShareBundle:User')->find($id);
        
        //find all clients that are not assigned to user
        $query = $em->createQuery('SELECT c.id,c.name FROM AWWorxShareBundle:Clients c WHERE c.id NOT IN (SELECT uc.clientId FROM AWWorxShareBundle:UsersClients uc WHERE uc.userId =:user_id) ORDER BY c.name ASC');
        //$query = $em->createQuery('SELECT MIN(c.id) FROM RSLibraryBundle:Collections c WHERE c.user_id=:userId');
        $query->setParameters(array('user_id' => $id));
        $entities = $query->getResult();
		
        //find assigned clients
        $entitiesAssigned = $em->getRepository('AWWorxShareBundle:UsersClients')->findBy(array('userId' => $id), array('client_name' => 'ASC'));
        
        return array(
            'entities' => $entities,
            'entitiesAssigned' => $entitiesAssigned,
        	'user_id' => $id,
        	'user_id' => $entityUser->getId(),
        	'user_name' => $entityUser->getName()
        );
        
        /* $html = $this->container->get('templating')->render('AWWorxShareBundle:UsersClients:index.html.twig', array('entities' => $entities));
        $jsonResponse = new Response(json_encode(array('html' => $html)));
        $jsonResponse->headers->set('Content-Type', 'application/json');
        
        return $jsonResponse; */
    }

    /**
     *
     * @Route("/usercheck/{id},{user_id}", name="worxshare_usersclients_usercheck")
     * @Method("GET")
     * @Template()
     */
    public function usercheckAction(Request $request, $id, $user_id)
    {
    	$em = $this->getDoctrine()->getManager('worxshare');
    	 
    	//check if Project is assigned to Users
    	$entityUsersProjects = $em->getRepository('AWWorxShareBundle:UsersProjects')->findBy(array('clientId' => $id, 'userId' => $user_id));
    	if ($entityUsersProjects) {
    		
    		$jsonResponse = new Response(json_encode(array(
    				'errorMsg' => 'hasUsers',
    				'projects' => self::findProjects($entityUsersProjects),
    				'success' => false
    		)));
    		$jsonResponse->headers->set('Content-Type', 'application/json');
    
    		return $jsonResponse;
    	}
    
    	$jsonResponse = new Response(json_encode(array('success' => true)));
    	$jsonResponse->headers->set('Content-Type', 'application/json');
    
    	return $jsonResponse;
    }
    
    private function findProjects($entityUsersProjects)
    {
    	$em = $this->getDoctrine()->getManager('worxshare');
    
    	$projectsAssigned = array();
    	 
    	foreach ($entityUsersProjects as $entityUserProject) {
    		$entitiesProjects = $em->getRepository('AWWorxShareBundle:Projects')->findBy(array('id' => $entityUserProject->getProjectId()));
    		$projectsAssigned[] = $entitiesProjects[0]->getName();
    	}
    	
    	return $projectsAssigned;
    }
    
    /**
     * Creates a new UsersClients entity.
     *
     * @Route("/{user_id}/create", name="worxshare_usersclients_create")
     * @Method("POST")
     * @Template()
     */
    public function createAction(Request $request, $user_id)
    {
    	$clientsAssigned = $request->request->get('clientsArray', null, true);
    	
    	$em = $this->getDoctrine()->getManager('worxshare');
    	
    	//delete all client->user relations from UsersClients table
    	$qb = $em->createQueryBuilder()
	    	->delete('AWWorxShareBundle:UsersClients', 'uc')
	    	->where('uc.userId = :user_id')
	    	->setParameter('user_id', $user_id);
    	$result = $qb->getQuery()->getSingleScalarResult();
    	
    	if (count($clientsAssigned) != 0) {
    		foreach ($clientsAssigned as $client) {
    		
    			$entity  = new UsersClients();
    		
    			$entity->setUserId($user_id);
    			$entity->setClientId($client["id"]);
    			$entity->setClientName($client["name"]);
    			$em->persist($entity);
    			$em->flush();
    		}
    	}

        $jsonResponse = new Response(json_encode(array('success' => true)));
        $jsonResponse->headers->set('Content-Type', 'application/json');
            
        return $jsonResponse;
    }

    /**
     * Displays a form to create a new UsersClients entity.
     *
     * @Route("/new", name="worxshare_usersclients_new")
     * @Method("GET")
     * @Template()
     */
    public function newAction()
    {
        $entity = new UsersClients();
        $form   = $this->createForm(new UsersClientsType(), $entity);

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    /**
     * Finds and displays a UsersClients entity.
     *
     * @Route("/{id}", name="worxshare_usersclients_show")
     * @Method("GET")
     * @Template()
     */
    public function showAction($id)
    {
        $em = $this->getDoctrine()->getManager('worxshare');

        $entity = $em->getRepository('AWWorxShareBundle:UsersClients')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find UsersClients entity.');
        }

        $deleteForm = $this->createDeleteForm($id);

        return array(
            'entity'      => $entity,
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Displays a form to edit an existing UsersClients entity.
     *
     * @Route("/{id}/edit", name="worxshare_usersclients_edit")
     * @Method("GET")
     * @Template()
     */
    public function editAction($id)
    {
        $em = $this->getDoctrine()->getManager('worxshare');

        $entity = $em->getRepository('AWWorxShareBundle:UsersClients')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find UsersClients entity.');
        }

        $editForm = $this->createForm(new UsersClientsType(), $entity);
        $deleteForm = $this->createDeleteForm($id);

        return array(
            'entity'      => $entity,
            'edit_form'   => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Edits an existing UsersClients entity.
     *
     * @Route("/{id}", name="worxshare_usersclients_update")
     * @Method("PUT")
     * @Template("AWWorxShareBundle:UsersClients:edit.html.twig")
     */
    public function updateAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager('worxshare');

        $entity = $em->getRepository('AWWorxShareBundle:UsersClients')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find UsersClients entity.');
        }

        $deleteForm = $this->createDeleteForm($id);
        $editForm = $this->createForm(new UsersClientsType(), $entity);
        $editForm->bind($request);

        if ($editForm->isValid()) {
            $em->persist($entity);
            $em->flush();

            return $this->redirect($this->generateUrl('worxshare_usersclients_edit', array('id' => $id)));
        }

        return array(
            'entity'      => $entity,
            'edit_form'   => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Deletes a UsersClients entity.
     *
     * @Route("/{id}", name="worxshare_usersclients_delete")
     * @Method("DELETE")
     */
    public function deleteAction(Request $request, $id)
    {
        $form = $this->createDeleteForm($id);
        $form->bind($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager('worxshare');
            $entity = $em->getRepository('AWWorxShareBundle:UsersClients')->find($id);

            if (!$entity) {
                throw $this->createNotFoundException('Unable to find UsersClients entity.');
            }

            $em->remove($entity);
            $em->flush();
        }

        return $this->redirect($this->generateUrl('worxshare_usersclients'));
    }

    /**
     * Creates a form to delete a UsersClients entity by id.
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
