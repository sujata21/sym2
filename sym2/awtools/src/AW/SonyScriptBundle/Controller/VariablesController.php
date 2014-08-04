<?php

namespace AW\SonyScriptBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use AW\SonyScriptBundle\Entity\Variables;
use AW\SonyScriptBundle\Form\VariablesType;

/**
 * Variables controller.
 *
 * @Route("/sonyscript/variables")
 */
class VariablesController extends Controller
{
    /**
     * Lists all Variables entities.
     *
     * @Route("/", name="variables")
     * @Method("GET")
     * @Template()
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager('sonyscript');

        $entities = $em->getRepository('AWSonyScriptBundle:Variables')->findAll();

        return array(
            'entities' => $entities,
        );
    }

    /**
     * Creates a new Variables entity.
     *
     * @Route("/{id}", name="variables_create")
     * @Method("POST")
     * @Template("AWSonyScriptBundle:Variables:new.html.twig")
     */
    public function createAction(Request $request, $id)
    {
        $entity  = new Variables();
        
        $em = $this->getDoctrine()->getManager('sonyscript');
        
        $entity->setProjectId($id);
        $entity->setName($request->request->get('name'));
        $entity->setValue($request->request->get('value'));
        
        $em->persist($entity);
        $em->flush();
        
        $entities = $em->getRepository('AWSonyScriptBundle:Variables')->findBy(array('project_id' => $id ));
        
        $deleteForm = $this->createDeleteForm($entity->getId());
        
        $jsonResponse['html']=$this->renderView('AWSonyScriptBundle:Variables:index.html.twig',array(
        		'entities'=>$entities,
        		'delete_form' => $deleteForm->createView(),
        ));
        
        $response = new Response(json_encode($jsonResponse));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    /**
     * Displays a form to create a new Variables entity.
     *
     * @Route("/new", name="variables_new")
     * @Method("GET")
     * @Template()
     */
    public function newAction()
    {
        $entity = new Variables();
        $form   = $this->createForm(new VariablesType(), $entity);

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    /**
     * Finds and displays a Variables entity.
     *
     * @Route("/{id}", name="variables_show")
     * @Method("GET")
     * @Template()
     */
    public function showAction($id)
    {
        $em = $this->getDoctrine()->getManager('sonyscript');

        $entity = $em->getRepository('AWSonyScriptBundle:Variables')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Variables entity.');
        }

        $deleteForm = $this->createDeleteForm($id);

        return array(
            'entity'      => $entity,
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Displays a form to edit an existing Variables entity.
     *
     * @Route("/{id}/edit", name="variables_edit")
     * @Method("GET")
     * @Template()
     */
    public function editAction($id)
    {
        $em = $this->getDoctrine()->getManager('sonyscript');

        $entity = $em->getRepository('AWSonyScriptBundle:Variables')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Variables entity.');
        }

        $editForm = $this->createForm(new VariablesType(), $entity);
        $deleteForm = $this->createDeleteForm($id);

        return array(
            'entity'      => $entity,
            'edit_form'   => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Edits an existing Variables entity.
     *
     * @Route("/{id}", name="variables_update")
     * @Method("PUT")
     * @Template("AWSonyScriptBundle:Variables:edit.html.twig")
     */
    public function updateAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager('sonyscript');

        $entity = $em->getRepository('AWSonyScriptBundle:Variables')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Variables entity.');
        }

        $deleteForm = $this->createDeleteForm($id);
        $editForm = $this->createForm(new VariablesType(), $entity);
        $editForm->bind($request);

        if ($editForm->isValid()) {
            $em->persist($entity);
            $em->flush();

            return $this->redirect($this->generateUrl('variables_edit', array('id' => $id)));
        }

        return array(
            'entity'      => $entity,
            'edit_form'   => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Deletes a Variables entity.
     *
     * @Route("/delete/{id},{projectId}", name="variables_delete")
     * @Method("DELETE")
     */
    public function deleteAction(Request $request, $id, $projectId)
    {
        $form = $this->createDeleteForm($id);
        $form->bind($request);
		
        //if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager('sonyscript');
            $entity = $em->getRepository('AWSonyScriptBundle:Variables')->find($id);

            if (!$entity) {
                throw $this->createNotFoundException('Unable to find Variables entity.');
            }

            $em->remove($entity);
            $em->flush();
        //}
		        
        $entities = $em->getRepository('AWSonyScriptBundle:Variables')->findBy(array('project_id' => $projectId ));
        
        $deleteForm = $this->createDeleteForm($id);
        
        $jsonResponse['html']=$this->renderView('AWSonyScriptBundle:Variables:index.html.twig',array(
        		'entities'=>$entities,
        		'delete_form' => $deleteForm->createView(),
        ));
        
        $response = new Response(json_encode($jsonResponse));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    /**
     * Creates a form to delete a Variables entity by id.
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
