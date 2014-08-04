<?php

namespace AW\WorxShareBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use AW\WorxShareBundle\Entity\Clients;
use AW\WorxShareBundle\Form\ClientsType;
use AW\WorxShareBundle\Entity\UsersClients;

/**
 * Clients controller.
 *
 * @Route("/worxshare/clients")
 */
class ClientsController extends Controller
{
    /**
     * Lists all Clients entities.
     *
     * @Route("/", name="worxshare_clients")
     * @Method("GET")
     * @Template()
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager('worxshare');

        $entities = $em->getRepository('AWWorxShareBundle:Clients')->findBy(array(), array('name' => 'ASC'));
		
        self::findProjects($entities);
        
        return array(
            'entities' => $entities,
        );
    }

    private function findProjects($entities)
    {
    	$em = $this->getDoctrine()->getManager('worxshare');
    	
    	foreach ($entities as $entity) {
    	
    		$projectsAssigned = array();
    	
    		//find all projects assigned
    		$entitiesClientsProjects = $em->getRepository('AWWorxShareBundle:ClientsProjects')->findBy(array('clientId' => $entity->getId()));
    		foreach ($entitiesClientsProjects as $entityClientProject) {
    			$entitiesProjects = $em->getRepository('AWWorxShareBundle:Projects')->findBy(array('id' => $entityClientProject->getProjectId()));
    			$projectsAssigned[] = $entitiesProjects[0]->getName();
    		}
    		$entity->projectsAssigned = $projectsAssigned;
    	
    	}
    	
    	return $entities;
    }
    
    /**
     * Creates a new Clients entity.
     *
     * @Route("/", name="worxshare_clients_create")
     * @Method("POST")
     * @Template("AWWorxShareBundle:Clients:new.html.twig")
     */
    public function createAction(Request $request)
    {
        $entity  = new Clients();
        $form = $this->createForm(new ClientsType(), $entity);
        $form->bind($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager('worxshare');
            $em->persist($entity);
            $em->flush();

            $entities = $em->getRepository('AWWorxShareBundle:Clients')->findBy(array(), array('name' => 'ASC'));
            
            self::findProjects($entities);
            
            $html = $this->container->get('templating')->render('AWWorxShareBundle:Clients:index.html.twig', array('entities' => $entities));
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
     * Displays a form to create a new Clients entity.
     *
     * @Route("/new", name="worxshare_clients_new")
     * @Method("GET")
     * @Template()
     */
    public function newAction()
    {
        $entity = new Clients();
        $form   = $this->createForm(new ClientsType(), $entity);

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    /**
     * Finds and displays a Clients entity.
     *
     * @Route("/{id}", name="worxshare_clients_show")
     * @Method("GET")
     * @Template()
     */
    public function showAction($id)
    {
        $em = $this->getDoctrine()->getManager('worxshare');

        $entity = $em->getRepository('AWWorxShareBundle:Clients')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Clients entity.');
        }

        $deleteForm = $this->createDeleteForm($id);

        return array(
            'entity'      => $entity,
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Displays a form to edit an existing Clients entity.
     *
     * @Route("/{id}/edit", name="worxshare_clients_edit")
     * @Method("GET")
     * @Template()
     */
    public function editAction($id)
    {
        $em = $this->getDoctrine()->getManager('worxshare');

        $entity = $em->getRepository('AWWorxShareBundle:Clients')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Clients entity.');
        }

        $editForm = $this->createForm(new ClientsType(), $entity);
        $deleteForm = $this->createDeleteForm($id);

        return array(
            'entity'      => $entity,
            'edit_form'   => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Edits an existing Clients entity.
     *
     * @Route("/{id}", name="worxshare_clients_update")
     * @Method("PUT")
     * @Template("AWWorxShareBundle:Clients:edit.html.twig")
     */
    public function updateAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager('worxshare');

        $entity = $em->getRepository('AWWorxShareBundle:Clients')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Clients entity.');
        }

        $editForm = $this->createForm(new ClientsType(), $entity);
        $editForm->bind($request);

        $em->persist($entity);
        $em->flush();
        
        //update client name in UsersClients table
        $query = $em->createQuery('UPDATE AWWorxShareBundle:UsersClients uc SET uc.client_name = ?1 WHERE uc.clientId = ?2');
        $query->setParameter(1, $entity->getName());
        $query->setParameter(2, $id);
        $query->getResult();
        
        $entities = $em->getRepository('AWWorxShareBundle:Clients')->findBy(array(), array('name' => 'ASC'));
        
        self::findProjects($entities);
        
        $html = $this->container->get('templating')->render('AWWorxShareBundle:Clients:index.html.twig', array('entities' => $entities));
        $jsonResponse = new Response(json_encode(array('html' => $html, 'success' => true)));
        $jsonResponse->headers->set('Content-Type', 'application/json');
             
        return $jsonResponse;
    }

    /**
     * Deletes a Clients entity.
     *
     * @Route("/{id}/delete", name="worxshare_clients_delete")
     * @Method("POST")
     */
    public function deleteAction(Request $request, $id)
    {
        
		$em = $this->getDoctrine()->getManager('worxshare');
		
		//check if Client is assigned to Users
		$entityUsersClients = $em->getRepository('AWWorxShareBundle:UsersClients')->findBy(array('clientId' => $id));
		if ($entityUsersClients) {
			$jsonResponse = new Response(json_encode(array('errorMsg' => 'hasUsers','success' => false)));
			$jsonResponse->headers->set('Content-Type', 'application/json');
		
			return $jsonResponse;
		}

		//check if Client has assigned to Projects
		$entityClientsProjects = $em->getRepository('AWWorxShareBundle:ClientsProjects')->findBy(array('clientId' => $id));
		if ($entityClientsProjects) {
			$jsonResponse = new Response(json_encode(array('errorMsg' => 'hasProjects','success' => false)));
			$jsonResponse->headers->set('Content-Type', 'application/json');
		
			return $jsonResponse;
		}		
		
        if (!$entityUsersClients && !$entityClientsProjects) {
            	
        	$entity = $em->getRepository('AWWorxShareBundle:Clients')->find($id);
            	
            if (!$entity) {
            	//throw $this->createNotFoundException('Unable to find Clients entity.');
            	$jsonResponse = new Response(json_encode(array('success' => false)));
            	$jsonResponse->headers->set('Content-Type', 'application/json');
            	
            	return $jsonResponse;
            }
            	
            //delete all client->user relations from UsersClients table
            /* $qb = $em->createQueryBuilder()
            	->delete('AWWorxShareBundle:UsersClients', 'uc')
            	->where('uc.clientId = :client_id')
            	//->andWhere('l.user_id = :user_id')
            	->setParameter('client_id', $id);
            	//->setParameter('user_id', $user->getId());
			$result = $qb->getQuery()->getSingleScalarResult(); */
            	
            //delete client
            $em->remove($entity);
            $em->flush();
            	
            $entities = $em->getRepository('AWWorxShareBundle:Clients')->findBy(array(), array('name' => 'ASC'));
            
            self::findProjects($entities);
            
            $html = $this->container->get('templating')->render('AWWorxShareBundle:Clients:index.html.twig', array('entities' => $entities));
            $jsonResponse = new Response(json_encode(array('html' => $html, 'success' => true)));
            $jsonResponse->headers->set('Content-Type', 'application/json');
            	 
            return $jsonResponse;
            	
		}
    }

    /**
     * Creates a form to delete a Clients entity by id.
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
