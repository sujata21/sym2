<?php

namespace AW\WorxShareBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use AW\WorxShareBundle\Entity\ClientsProjects;
use AW\WorxShareBundle\Form\ClientsProjectsType;

/**
 * ClientsProjects controller.
 *
 * @Route("/worxshare/clientsprojects")
 */
class ClientsProjectsController extends Controller
{
    /**
     * Lists all ClientsProjects entities.
     *
     * @Route("/{id}/index", name="worxshare_clientsprojects")
     * @Method("GET")
     * @Template()
     */
    public function indexAction($id)
    {
        $em = $this->getDoctrine()->getManager('worxshare');
		
        //find all projects not assigned to client
        $query = $em->createQuery('SELECT p.id,p.name FROM AWWorxShareBundle:Projects p WHERE p.id NOT IN (SELECT cp.projectId FROM AWWorxShareBundle:ClientsProjects cp WHERE cp.clientId =:client_id) ORDER BY p.name ASC');
        $query->setParameters(array('client_id' => $id));
        $entities = $query->getResult();
		
        //find assigned projects
        $entitiesAssigned = $em->getRepository('AWWorxShareBundle:ClientsProjects')->findBy(array('clientId' => $id), array('projectName' => 'ASC'));
        
        return array(
            'entities' => $entities,
            'entitiesAssigned' => $entitiesAssigned,
        	'client_id' => $id
        );
    }

    /**
     *
     * @Route("/usercheck/{id},{client_id}", name="worxshare_clientsprojects_usercheck")
     * @Method("GET")
     * @Template()
     */
    public function usercheckAction(Request $request, $id, $client_id)
    {
        $em = $this->getDoctrine()->getManager('worxshare');
    	
    	//check if Project is assigned to Users
    	$entityUsersProjects = $em->getRepository('AWWorxShareBundle:UsersProjects')->findBy(array('projectId' => $id, 'clientId' => $client_id));
    	
    	if ($entityUsersProjects) {
    		
    		$jsonResponse = new Response(json_encode(array(
    				'errorMsg' => 'hasUsers',
    				'users' => self::findUsers($entityUsersProjects),
    				'success' => false
    		)));
    		$jsonResponse->headers->set('Content-Type', 'application/json');
    		
    		return $jsonResponse;
    	}

        $jsonResponse = new Response(json_encode(array('success' => true)));
        $jsonResponse->headers->set('Content-Type', 'application/json');
            
        return $jsonResponse;
    }
    
    private function findUsers($entityUsersProjects)
    {
    	$em = $this->getDoctrine()->getManager('worxshare');
    	 
    	//foreach ($entityUsersProjects as $entityUserProject) {
    	$usersAssigned = array();
    		 
    	foreach ($entityUsersProjects as $entityUserProject) {
    		$entitiesUsers = $em->getRepository('AWWorxShareBundle:User')->findBy(array('id' => $entityUserProject->getUserId()));
    		$usersAssigned[] = $entitiesUsers[0]->getName();
    	}
    	
    	return $usersAssigned;
    }
    
    /**
     * Creates a new ClientsProjects entity.
     *
     * @Route("/{client_id}/create", name="worxshare_clientsprojects_create")
     * @Method("POST")
     * @Template("AWWorxShareBundle:ClientsProjects:new.html.twig")
     */
    public function createAction(Request $request, $client_id)
    {
        $projectsArray = $request->request->get('projectsArray', null, true);
    	
    	$em = $this->getDoctrine()->getManager('worxshare');
    	
    	//delete all client->projects relations from ClientsProjects table
    	$qb = $em->createQueryBuilder()
	    	->delete('AWWorxShareBundle:ClientsProjects', 'cp')
	    	->where('cp.clientId = :client_id')
	    	->setParameter('client_id', $client_id);
    	$result = $qb->getQuery()->getSingleScalarResult();
    	
    	if (count($projectsArray) != 0) {
    		foreach ($projectsArray as $project) {
    		
    			$entity  = new ClientsProjects();
    		
    			$entity->setClientId($client_id);
    			$entity->setProjectId($project["id"]);
    			$entity->setProjectName($project["name"]);
    			$em->persist($entity);
    			$em->flush();
    		}
    	}

        $jsonResponse = new Response(json_encode(array('success' => true)));
        $jsonResponse->headers->set('Content-Type', 'application/json');
            
        return $jsonResponse;
    }

    /**
     * Displays a form to create a new ClientsProjects entity.
     *
     * @Route("/new", name="worxshare_clientsprojects_new")
     * @Method("GET")
     * @Template()
     */
    public function newAction()
    {
        $entity = new ClientsProjects();
        $form   = $this->createForm(new ClientsProjectsType(), $entity);

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    /**
     * Finds and displays a ClientsProjects entity.
     *
     * @Route("/{id}", name="worxshare_clientsprojects_show")
     * @Method("GET")
     * @Template()
     */
    public function showAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('AWWorxShareBundle:ClientsProjects')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find ClientsProjects entity.');
        }

        $deleteForm = $this->createDeleteForm($id);

        return array(
            'entity'      => $entity,
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Displays a form to edit an existing ClientsProjects entity.
     *
     * @Route("/{id}/edit", name="worxshare_clientsprojects_edit")
     * @Method("GET")
     * @Template()
     */
    public function editAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('AWWorxShareBundle:ClientsProjects')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find ClientsProjects entity.');
        }

        $editForm = $this->createForm(new ClientsProjectsType(), $entity);
        $deleteForm = $this->createDeleteForm($id);

        return array(
            'entity'      => $entity,
            'edit_form'   => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Edits an existing ClientsProjects entity.
     *
     * @Route("/{id}", name="worxshare_clientsprojects_update")
     * @Method("PUT")
     * @Template("AWWorxShareBundle:ClientsProjects:edit.html.twig")
     */
    public function updateAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('AWWorxShareBundle:ClientsProjects')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find ClientsProjects entity.');
        }

        $deleteForm = $this->createDeleteForm($id);
        $editForm = $this->createForm(new ClientsProjectsType(), $entity);
        $editForm->bind($request);

        if ($editForm->isValid()) {
            $em->persist($entity);
            $em->flush();

            return $this->redirect($this->generateUrl('worxshare_clientsprojects_edit', array('id' => $id)));
        }

        return array(
            'entity'      => $entity,
            'edit_form'   => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Deletes a ClientsProjects entity.
     *
     * @Route("/{id}", name="worxshare_clientsprojects_delete")
     * @Method("DELETE")
     */
    public function deleteAction(Request $request, $id)
    {
        $form = $this->createDeleteForm($id);
        $form->bind($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $entity = $em->getRepository('AWWorxShareBundle:ClientsProjects')->find($id);

            if (!$entity) {
                throw $this->createNotFoundException('Unable to find ClientsProjects entity.');
            }

            $em->remove($entity);
            $em->flush();
        }

        return $this->redirect($this->generateUrl('worxshare_clientsprojects'));
    }

    /**
     * Creates a form to delete a ClientsProjects entity by id.
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
