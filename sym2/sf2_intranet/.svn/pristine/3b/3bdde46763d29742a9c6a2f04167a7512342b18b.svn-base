<?php

namespace Application\HelpDeskBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Application\HelpDeskBundle\Entity\Device;

use Application\HelpDeskBundle\Form\DeviceType;

/**
 * Device controller.
 *
 * @Route("/device")
 */
class DeviceController extends Controller
{
	/**
	 * Lists all Device entities.
	 *
	 * @Route("/", name="device")
	 * @Template()
	 */
	public function indexAction(Request $request = null)
	{
		$em = $this->getDoctrine()->getManager();

		$entity  = new Device();
		$filterForm = $this->createForm(new DeviceType(), $entity);

		$qbl = $em->getRepository('ApplicationHelpDeskBundle:Device')
		->createQueryBuilder('a');

		if(is_object($request) && $request->isMethod('POST')){
			$filterForm->bind($request);
			$obj = $filterForm->getData();
			if($obj->getName() != ""){
				$qbl->where("a.name like :name");
				$qbl->setParameter('name', $obj->getName().'%');
			}
		} else {
			$qbl->where("1=1");
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
	 * Finds and displays a Device entity.
	 *
	 * @Route("/{id}/show", name="device_show")
	 * @Template()
	 */
	public function showAction($id)
	{
		$em = $this->getDoctrine()->getManager();

		$entity = $em->getRepository('ApplicationHelpDeskBundle:Device')->find($id);

		if (!$entity) {
			throw $this->createNotFoundException('Unable to find Device entity.');
		}

		$deleteForm = $this->createDeleteForm($id);

		return array(
				'entity'      => $entity,
				'delete_form' => $deleteForm->createView(),
		);
	}

	/**
	 * Displays a form to create a new Device entity.
	 *
	 * @Route("/new", name="device_new")
	 * @Template()
	 */
	public function newAction()
	{
		$entity = new Device();
		$form   = $this->createForm(new DeviceType(), $entity);

		return array(
				'entity' => $entity,
				'form'   => $form->createView(),
		);
	}

	/**
	 * Creates a new Device entity. xxxx
	 *
	 * @Route("/create", name="device_create")
	 * @Method("POST")
	 * @Template("ApplicationHelpDeskBundle:Device:new.html.twig")
	 */
	public function createAction(Request $request)
	{
		$entity  = new Device();
		$form = $this->createForm(new DeviceType(), $entity);
		$form->bind($request);

		if ($form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($entity);
			$em->flush();

			return $this->redirect($this->generateUrl('device_show', array('id' => $entity->getId())));
		}

		return array(
				'entity' => $entity,
				'form'   => $form->createView(),
		);
	}

	/**
	 * Displays a form to edit an existing Device entity.
	 *
	 * @Route("/{id}/edit", name="device_edit")
	 * @Template()
	 */
	public function editAction($id)
	{
		$em = $this->getDoctrine()->getManager();

		$entity = $em->getRepository('ApplicationHelpDeskBundle:Device')->find($id);

		if (!$entity) {
			throw $this->createNotFoundException('Unable to find Device entity.');
		}

		$editForm = $this->createForm(new DeviceType(), $entity);
		$deleteForm = $this->createDeleteForm($id);

		return array(
				'entity'      => $entity,
				'edit_form'   => $editForm->createView(),
				'delete_form' => $deleteForm->createView(),
		);
	}

	/**
	 * Edits an existing Device entity.
	 *
	 * @Route("/{id}/update", name="device_update")
	 * @Method("POST")
	 * @Template("ApplicationHelpDeskBundle:Device:edit.html.twig")
	 */
	public function updateAction(Request $request, $id)
	{
		$em = $this->getDoctrine()->getManager();

		$entity = $em->getRepository('ApplicationHelpDeskBundle:Device')->find($id);

		if (!$entity) {
			throw $this->createNotFoundException('Unable to find Device entity.');
		}

		$deleteForm = $this->createDeleteForm($id);
		$editForm = $this->createForm(new DeviceType(), $entity);
		$editForm->bind($request);

		if ($editForm->isValid()) {
			$em->persist($entity);
			$em->flush();

			return $this->redirect($this->generateUrl('device_edit', array('id' => $id)));
		}

		return array(
				'entity'      => $entity,
				'edit_form'   => $editForm->createView(),
				'delete_form' => $deleteForm->createView(),
		);
	}

	/**
	 * Deletes a Device entity.
	 *
	 * @Route("/{id}/delete", name="device_delete")
	 * @Method("GET")
	 */
	public function deleteAction(Request $request, $id)
	{
		$form = $this->createDeleteForm($id);
		$form->bind($request);

		if ($form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$entity = $em->getRepository('ApplicationHelpDeskBundle:Device')->find($id);

			if (!$entity) {
				throw $this->createNotFoundException('Unable to find Device entity.');
			}

			$em->remove($entity);
			$em->flush();
		}

		return $this->redirect($this->generateUrl('device'));
	}

	private function createDeleteForm($id)
	{
		return $this->createFormBuilder(array('id' => $id))
		->add('id', 'hidden')
		->getForm()
		;
	}
}
