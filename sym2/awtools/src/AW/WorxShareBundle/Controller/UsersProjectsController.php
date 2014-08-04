<?php

namespace AW\WorxShareBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use AW\WorxShareBundle\Entity\UsersProjects;
use AW\WorxShareBundle\Form\UsersProjectsType;

/**
 * UsersProjects controller.
 *
 * @Route("/worxshare/usersprojects")
 */
class UsersProjectsController extends Controller
{
    /**
     * Lists all UsersProjects entities.
     *
     * @Route("/{id}/index", name="worxshare_usersprojects")
     * @Method("GET")
     * @Template()
     */
    public function indexAction($id)
    {
        $em = $this->getDoctrine()->getManager('worxshare');
        
        $entityUser = $em->getRepository('AWWorxShareBundle:User')->find($id);

        //$entities = $em->getRepository('AWWorxShareBundle:UsersProjects')->findAll();
        //find assigned clients
        $entitiesClients = $em->getRepository('AWWorxShareBundle:UsersClients')->findBy(array('userId' => $id), array('client_name' => 'ASC'));

        /* $query = $em->createQuery('SELECT c.id,c.name FROM AWWorxShareBundle:Clients c WHERE c.id NOT IN (SELECT uc.clientId FROM AWWorxShareBundle:UsersClients uc WHERE uc.userId =:user_id) ORDER BY c.name ASC');
        //$query = $em->createQuery('SELECT MIN(c.id) FROM RSLibraryBundle:Collections c WHERE c.user_id=:userId');
        $query->setParameters(array('user_id' => $id));
        $entitiesClients = $query->getResult(); */

        return array(
            'entitiesClients' => $entitiesClients,
        	'user_id' => $id,
        	'user_name' => $entityUser->getName()
        );
    }

    /**
     * Lists all Projects assigned to chosen Client.
     *
     * @Route("/{client_id},{user_id}/projects", name="worxshare_usersprojects_projects")
     * @Method("GET")
     * @Template()
     */
    public function projectsAction($client_id, $user_id)
    {
        $em = $this->getDoctrine()->getManager('worxshare');
        
        //find all projects assigned to client and not assigned to user
        $query = $em->createQuery('SELECT p.id,p.name FROM AWWorxShareBundle:Projects p 
        						   WHERE p.id NOT IN (SELECT up.projectId FROM AWWorxShareBundle:UsersProjects up WHERE up.userId =:user_id AND up.clientId =:client_id) 
        						   AND p.id IN (SELECT cp.projectId FROM AWWorxShareBundle:ClientsProjects cp WHERE cp.clientId =:client_id) 
        						   ORDER BY p.name ASC');
        $query->setParameters(array('user_id' => $user_id, 'client_id' => $client_id));
        //$query->setParameters(array('user_id' => $user_id));
        $entitiesProjects = $query->getResult();
	
        //find assigned projects to user
        $entitiesProjectAssigned = $em->getRepository('AWWorxShareBundle:UsersProjects')->findBy(array('userId' => $user_id, 'clientId' => $client_id), array('projectName' => 'ASC'));
        
        $html = $this->container->get('templating')->render('AWWorxShareBundle:UsersProjects:projects.html.twig', array('entitiesProjects' => $entitiesProjects, 'client_id' => $client_id));
        $htmlProjectsAssigned = $this->container->get('templating')->render('AWWorxShareBundle:UsersProjects:projectsAssigned.html.twig', array('entitiesProjectsAssigned' => $entitiesProjectAssigned, 'client_id' => $client_id));
        $jsonResponse = new Response(json_encode(array('html' => $html, 'htmlProjectsAssigned' => $htmlProjectsAssigned, 'success' => true)));
        $jsonResponse->headers->set('Content-Type', 'application/json');
        
        return $jsonResponse;
    }

    /**
     * Creates a new UsersProjects entity.
     *
     * @Route("/create/{user_id},{client_id}", name="worxshare_usersprojects_create")
     * @Method("POST")
     * @Template("AWWorxShareBundle:UsersProjects:new.html.twig")
     */
    public function createAction(Request $request, $user_id, $client_id)
    {
        $projectsAssigned = $request->request->get('projectsArray', null, true);
    	
    	$em = $this->getDoctrine()->getManager('worxshare');
    	
    	//delete all client->user relations from UsersClients table
    	$qb = $em->createQueryBuilder()
	    	->delete('AWWorxShareBundle:UsersProjects', 'up')
	    	->where('up.userId = :user_id')
	    	->andWhere('up.clientId = :client_id')
	    	->setParameter('user_id', $user_id)
	    	->setParameter('client_id', $client_id);
    	$result = $qb->getQuery()->getSingleScalarResult();
    	
    	if (count($projectsAssigned) != 0) {
    		foreach ($projectsAssigned as $project) {
    		
    			$entity  = new UsersProjects();
    		
    			$entity->setUserId($user_id);
    			$entity->setProjectId($project["id"]);
    			$entity->setProjectName($project["name"]);
    			$entity->setClientId($project["client_id"]);
    			$em->persist($entity);
    			$em->flush();
    		}
    	}

        $jsonResponse = new Response(json_encode(array('success' => true)));
        $jsonResponse->headers->set('Content-Type', 'application/json');
            
        return $jsonResponse;
    }

    /**
     * Displays a form to create a new UsersProjects entity.
     *
     * @Route("/new", name="worxshare_usersprojects_new")
     * @Method("GET")
     * @Template()
     */
    public function newAction()
    {
        $entity = new UsersProjects();
        $form   = $this->createForm(new UsersProjectsType(), $entity);

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    /**
     * Finds and displays a UsersProjects entity.
     *
     * @Route("/{id}", name="worxshare_usersprojects_show")
     * @Method("GET")
     * @Template()
     */
    public function showAction($id)
    {
        $em = $this->getDoctrine()->getManager('worxshare');

        $entity = $em->getRepository('AWWorxShareBundle:UsersProjects')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find UsersProjects entity.');
        }

        $deleteForm = $this->createDeleteForm($id);

        return array(
            'entity'      => $entity,
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Displays a form to edit an existing UsersProjects entity.
     *
     * @Route("/{id}/edit", name="worxshare_usersprojects_edit")
     * @Method("GET")
     * @Template()
     */
    public function editAction($id)
    {
        $em = $this->getDoctrine()->getManager('worxshare');

        $entity = $em->getRepository('AWWorxShareBundle:UsersProjects')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find UsersProjects entity.');
        }

        $editForm = $this->createForm(new UsersProjectsType(), $entity);
        $deleteForm = $this->createDeleteForm($id);

        return array(
            'entity'      => $entity,
            'edit_form'   => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Edits an existing UsersProjects entity.
     *
     * @Route("/{id}", name="worxshare_usersprojects_update")
     * @Method("PUT")
     * @Template("AWWorxShareBundle:UsersProjects:edit.html.twig")
     */
    public function updateAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager('worxshare');

        $entity = $em->getRepository('AWWorxShareBundle:UsersProjects')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find UsersProjects entity.');
        }

        $deleteForm = $this->createDeleteForm($id);
        $editForm = $this->createForm(new UsersProjectsType(), $entity);
        $editForm->bind($request);

        if ($editForm->isValid()) {
            $em->persist($entity);
            $em->flush();

            return $this->redirect($this->generateUrl('worxshare_usersprojects_edit', array('id' => $id)));
        }

        return array(
            'entity'      => $entity,
            'edit_form'   => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Deletes a UsersProjects entity.
     *
     * @Route("/{id}", name="worxshare_usersprojects_delete")
     * @Method("DELETE")
     */
    public function deleteAction(Request $request, $id)
    {
        $form = $this->createDeleteForm($id);
        $form->bind($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager('worxshare');
            $entity = $em->getRepository('AWWorxShareBundle:UsersProjects')->find($id);

            if (!$entity) {
                throw $this->createNotFoundException('Unable to find UsersProjects entity.');
            }

            $em->remove($entity);
            $em->flush();
        }

        return $this->redirect($this->generateUrl('worxshare_usersprojects'));
    }

    /**
     * Creates a form to delete a UsersProjects entity by id.
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
