<?php

namespace Application\HelpDeskBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Application\HelpDeskBundle\Entity\Ticket;

use Application\HelpDeskBundle\Form\TicketType;
use Application\HelpDeskBundle\Form\TicketUpdateType;

/**
 * Ticket controller.
 *
 * @Route("/ticket")
 */
class TicketController extends Controller
{
    /**
     * Lists all Ticket entities.
     *
     * @Route("/", name="ticket")
     * @Template()
     */
    public function indexAction(Request $request = null)
    {
        $em = $this->getDoctrine()->getManager();
        
        $entity  = new Ticket();
		$filterForm = $this->createForm(new TicketType(), $entity);
        
        $qbl = $em->getRepository('ApplicationHelpDeskBundle:Ticket')
		->createQueryBuilder('a');
		
		if(is_object($request) && $request->isMethod('POST')){
			$filterForm->bind($request);
			$obj = $filterForm->getData();
			if($obj->getName() != ""){
				$qbl->where("a.name like :name");
				$qbl->setParameter('name', $obj->getName().'%');
			}
		}
       
       $query = $qbl->getQuery();
			
		$paginator = $this->get('knp_paginator');
		$pagination = $paginator->paginate(
				$query,
				$this->get('request')->query->get('page', 1),
				10,
				array('distinct' => false)
		);
			
		$filter_form   = $filterForm->createView();
		$csrfToken = $this->container->get('form.csrf_provider')->generateCsrfToken('authenticate');
		
		return compact('pagination', 'filter_form', 'csrfToken');
	}
   
    	
			
		
    /**
     * Finds and displays a Ticket entity.
     *
     * @Route("/{id}/show", name="ticket_show")
     * @Template()
     */
    public function showAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('ApplicationHelpDeskBundle:Ticket')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Ticket entity.');
        }

        $editForm = $this->createForm(new TicketUpdateType(), $entity);
        $deleteForm = $this->createDeleteForm($id);

        return array(
            'entity'      => $entity,
            'delete_form' => $deleteForm->createView(),
        	'edit_form'   => $editForm->createView(),
        );
    }

    /**
     * Displays a form to create a new Ticket entity.
     *
     * @Route("/new", name="ticket_new")
     * @Template()
     */
    public function newAction()
    {
        $entity = new Ticket();
        $entity->setSubmittedBy($this->getUser()->getId());
        $form   = $this->createForm(new TicketType(), $entity);

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    /**
     * Creates a new Ticket entity.
     *
     * @Route("/create", name="ticket_create")
     * @Method("POST")
     * @Template("ApplicationHelpDeskBundle:Ticket:new.html.twig")
     */
    public function createAction(Request $request)
    {
        $entity  = new Ticket();
        $entity->setSubmittedBy($this->getUser()->getId);
        
        $form = $this->createForm(new TicketType(), $entity);
        $form->bind($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($entity);
            $em->flush();

            return $this->redirect($this->generateUrl('ticket_show', array('id' => $entity->getId())));
        }

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    /**
     * Displays a form to edit an existing Ticket entity.
     *
     * @Route("/{id}/edit", name="ticket_edit")
     * @Template()
     */
    public function editAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('ApplicationHelpDeskBundle:Ticket')->find($id);
        //$entity->setSubmittedBy($this->getUser()->getId);
        
        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Ticket entity.');
        }

        $editForm = $this->createForm(new TicketType(), $entity);
        $deleteForm = $this->createDeleteForm($id);

        return array(
            'entity'      => $entity,
            'edit_form'   => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Edits an existing Ticket entity.
     *
     * @Route("/{id}/update", name="ticket_update")
     * @Method("POST")
     * @Template("ApplicationHelpDeskBundle:Ticket:edit.html.twig")
     */
    public function updateAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('ApplicationHelpDeskBundle:Ticket')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Ticket entity.');
        }

        $deleteForm = $this->createDeleteForm($id);
        $editForm = $this->createForm(new TicketType(), $entity);
        $editForm->bind($request);
                
        if ($editForm->isValid()) {
        	if($entity->getTicketIssue()->getMessage() == ""){
        		$entity->setTicketIssue(null);
        	}
                
            $em->persist($entity);
            $em->flush();
        	

           return $this->redirect($this->generateUrl('ticket'));
        } else {
        	$errors = $editForm->getErrors();
        	var_dump($errors);
        }

        return array(
            'entity'      => $entity,
            'edit_form'   => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Deletes a Ticket entity.
     *
     * @Route("/{id}/delete", name="ticket_delete")
     * @Method("GET")
     */
    public function deleteAction(Request $request, $id)
    {
        $form = $this->createDeleteForm($id);
        $form->bind($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $entity = $em->getRepository('ApplicationHelpDeskBundle:Ticket')->find($id);

            if (!$entity) {
                throw $this->createNotFoundException('Unable to find Ticket entity.');
            }

            $em->remove($entity);
            $em->flush();
        }

        return $this->redirect($this->generateUrl('ticket'));
    }

    
    /**
     * Close a Ticket entity.
     *
     * @Route("/close/{id}", name="ticket_close")
     * @Method("GET")
     */
    public function closeAction(Request $request, $id)
    {
    	return $this->redirect($this->generateUrl('ticket'));
    }
    
    private function createDeleteForm($id)
    {
        return $this->createFormBuilder(array('id' => $id))
            ->add('id', 'hidden')
            ->getForm()
        ;
    }    
    
    /**
     * Deletes a Ticket entity.
     *
     * @Route("/get_sub_category", name="ticket_delete")
     * @Method("GET")
     */
    public function get_sub_category(Request $request){
    
    	//if ($request->isXmlHttpRequest()){
    		
    		$categoryId = $request->get('category_id');
    		
    		$em = $this->getDoctrine()->getManager();
    		$categories = $em->getRepository('ApplicationHelpDeskBundle:Category')->findByParentCategory($categoryId);
    		
    		$result = array();
    		foreach ($categories as $category){
    			$result[] = array('optionValue' => $category->getId(), 'optionDisplay' => $category->getName());
    		}
    		
    		$response = new Response(json_encode($result));
    		$response->headers->set('Content-Type', 'application/json');
    		
    		return $response;
    	//}
    	
    }
    
}
