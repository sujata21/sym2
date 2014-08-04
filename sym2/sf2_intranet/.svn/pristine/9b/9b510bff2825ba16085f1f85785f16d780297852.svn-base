<?php

namespace Application\LDAPBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Application\LDAPBundle\Entity\LDAPMailAccount;

use Application\LDAPBundle\Form\LDAPMailAccountType;

/**
 * LDAPMailAccount controller.
 *
 * @Route("/ldapmailaccount")
 */
class LDAPMailAccountController extends Controller
{
    /**
     * Lists all LDAPMailAccount entities.
     *
     * @Route("/", name="ldapmailaccount")
     * @Template()
     */
    public function indexAction(Request $request = null)
    {
        $em = $this->getDoctrine()->getManager();
        
        $entity  = new LDAPMailAccount();
		$filterForm = $this->createForm(new LDAPMailAccountType(), $entity);
        
        $qbl = $em->getRepository('ApplicationLDAPBundle:LDAPMailAccount')
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
				10
		);
			
		$filter_form   = $filterForm->createView();
		$csrfToken = $this->container->get('form.csrf_provider')->generateCsrfToken('authenticate');
		
					return compact('pagination', 'filter_form', 'csrfToken');
		    }

    
    	
			
		
    /**
     * Finds and displays a LDAPMailAccount entity.
     *
     * @Route("/{id}/show", name="ldapmailaccount_show")
     * @Template()
     */
    public function showAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('ApplicationLDAPBundle:LDAPMailAccount')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find LDAPMailAccount entity.');
        }

        $deleteForm = $this->createDeleteForm($id);

        return array(
            'entity'      => $entity,
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Displays a form to create a new LDAPMailAccount entity.
     *
     * @Route("/new", name="ldapmailaccount_new")
     * @Template()
     */
    public function newAction()
    {
        $entity = new LDAPMailAccount();
        $form   = $this->createForm(new LDAPMailAccountType(), $entity);

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    /**
     * Creates a new LDAPMailAccount entity. xxxx
     *
     * @Route("/create", name="ldapmailaccount_create")
     * @Method("POST")
     * @Template("ApplicationLDAPBundle:LDAPMailAccount:new.html.twig")
     */
    public function createAction(Request $request)
    {
        $entity  = new LDAPMailAccount();
        $form = $this->createForm(new LDAPMailAccountType(), $entity);
        $form->bind($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($entity);
            $em->flush();

            return $this->redirect($this->generateUrl('ldapmailaccount_show', array('id' => $entity->getId())));
        }

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    /**
     * Displays a form to edit an existing LDAPMailAccount entity.
     *
     * @Route("/{id}/edit", name="ldapmailaccount_edit")
     * @Template()
     */
    public function editAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('ApplicationLDAPBundle:LDAPMailAccount')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find LDAPMailAccount entity.');
        }

        $editForm = $this->createForm(new LDAPMailAccountType(), $entity);
        $deleteForm = $this->createDeleteForm($id);

        return array(
            'entity'      => $entity,
            'edit_form'   => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Edits an existing LDAPMailAccount entity.
     *
     * @Route("/{id}/update", name="ldapmailaccount_update")
     * @Method("POST")
     * @Template("ApplicationLDAPBundle:LDAPMailAccount:edit.html.twig")
     */
    public function updateAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('ApplicationLDAPBundle:LDAPMailAccount')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find LDAPMailAccount entity.');
        }

        $deleteForm = $this->createDeleteForm($id);
        $editForm = $this->createForm(new LDAPMailAccountType(), $entity);
        $editForm->bind($request);

        if ($editForm->isValid()) {
            $em->persist($entity);
            $em->flush();

            return $this->redirect($this->generateUrl('ldapmailaccount_edit', array('id' => $id)));
        }

        return array(
            'entity'      => $entity,
            'edit_form'   => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Deletes a LDAPMailAccount entity.
     *
     * @Route("/{id}/delete", name="ldapmailaccount_delete")
     * @Method("GET")
     */
    public function deleteAction(Request $request, $id)
    {
        $form = $this->createDeleteForm($id);
        $form->bind($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $entity = $em->getRepository('ApplicationLDAPBundle:LDAPMailAccount')->find($id);

            if (!$entity) {
                throw $this->createNotFoundException('Unable to find LDAPMailAccount entity.');
            }

            $em->remove($entity);
            $em->flush();
        }

        return $this->redirect($this->generateUrl('ldapmailaccount'));
    }

    private function createDeleteForm($id)
    {
        return $this->createFormBuilder(array('id' => $id))
            ->add('id', 'hidden')
            ->getForm()
        ;
    }
}
