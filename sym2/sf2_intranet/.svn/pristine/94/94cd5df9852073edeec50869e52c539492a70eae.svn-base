<?php

namespace Application\TestCrudBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Application\TestCrudBundle\Entity\Test1;
use Application\TestCrudBundle\Form\Test1Type;

/**
 * Test1 controller.
 *
 * @Route("/test1")
 */
class Test1Controller extends Controller
{

    /**
     * Lists all Test1 entities.
     *
     * @Route("/", name="test1")
     * @Method("GET")
     * @Template()
     */
    public function indexAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        
        $entity  = new Test1();
        $filterForm = $this->createForm(new Test1Type(), $entity);
        
        $qbl = $em->getRepository('ApplicationTestCrudBundle:Test1')
        ->createQueryBuilder('a');
        
        if ($this->get('request')->request->has('filter-submit')) {
            
            $params = array_values($this->getRequest()->request->all());
            
            //remove entries from params array that are not related with DB
            $keysToUnset = array('_token');
            foreach ($keysToUnset as &$keyToUnset) {
                if (array_key_exists($keyToUnset, $params[0])) {
                    unset($params[0][$keyToUnset]);
                }    
            }
            
            //get array containnig keys from params array to check for where/andWhere clause in query building fase
            $arrayKeys = array_keys($params[0]);
            //reset both arrays
            reset($arrayKeys);
            reset($params[0]);

            foreach ($params[0] as $key => $value) {
                if (trim($value) != '') {
                    if (current($params[0]) == current($arrayKeys)) {
                        $qbl->where("a.".$key." like :".$key);
                        $qbl->setParameter($key, "%".$value."%");
                    }else {
                        $qbl->andWhere("a.".$key." like :".$key);
                        $qbl->setParameter($key, "%".$value."%");
                    }
                }
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
     * Creates a new Test1 entity.
     *
     * @Route("/", name="test1_create")
     * @Method("POST")
     * @Template("ApplicationTestCrudBundle:Test1:new.html.twig")
     */
    public function createAction(Request $request)
    {
        $entity = new Test1();
        $form = $this->createCreateForm($entity);
        $form->handleRequest($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($entity);
            $em->flush();

            return $this->redirect($this->generateUrl('test1_show', array('id' => $entity->getId())));
        }

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    /**
    * Creates a form to create a Test1 entity.
    *
    * @param Test1 $entity The entity
    *
    * @return \Symfony\Component\Form\Form The form
    */
    private function createCreateForm(Test1 $entity)
    {
        $form = $this->createForm(new Test1Type(), $entity, array(
            'action' => $this->generateUrl('test1_create'),
            'method' => 'POST',
        ));

        $form->add('submit', 'submit', array('label' => 'Create'));

        return $form;
    }

    /**
     * Displays a form to create a new Test1 entity.
     *
     * @Route("/new", name="test1_new")
     * @Method("GET")
     * @Template()
     */
    public function newAction()
    {
        $entity = new Test1();
        $form   = $this->createCreateForm($entity);

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    /**
     * Finds and displays a Test1 entity.
     *
     * @Route("/{id}", name="test1_show")
     * @Method("GET")
     * @Template()
     */
    public function showAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('ApplicationTestCrudBundle:Test1')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Test1 entity.');
        }

        $deleteForm = $this->createDeleteForm($id);

        return array(
            'entity'      => $entity,
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Displays a form to edit an existing Test1 entity.
     *
     * @Route("/{id}/edit", name="test1_edit")
     * @Method("GET")
     * @Template()
     */
    public function editAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('ApplicationTestCrudBundle:Test1')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Test1 entity.');
        }

        $editForm = $this->createEditForm($entity);
        $deleteForm = $this->createDeleteForm($id);

        return array(
            'entity'      => $entity,
            'edit_form'   => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
    * Creates a form to edit a Test1 entity.
    *
    * @param Test1 $entity The entity
    *
    * @return \Symfony\Component\Form\Form The form
    */
    private function createEditForm(Test1 $entity)
    {
        $form = $this->createForm(new Test1Type(), $entity, array(
            'action' => $this->generateUrl('test1_update', array('id' => $entity->getId())),
            'method' => 'PUT',
        ));

        $form->add('submit', 'submit', array('label' => 'Update'));

        return $form;
    }
    /**
     * Edits an existing Test1 entity.
     *
     * @Route("/{id}", name="test1_update")
     * @Method("PUT")
     * @Template("ApplicationTestCrudBundle:Test1:edit.html.twig")
     */
    public function updateAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('ApplicationTestCrudBundle:Test1')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Test1 entity.');
        }

        $deleteForm = $this->createDeleteForm($id);
        $editForm = $this->createEditForm($entity);
        $editForm->handleRequest($request);

        if ($editForm->isValid()) {
            $em->flush();

            return $this->redirect($this->generateUrl('test1_edit', array('id' => $id)));
        }

        return array(
            'entity'      => $entity,
            'edit_form'   => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        );
    }
    /**
     * Deletes a Test1 entity.
     *
     * @Route("/{id}", name="test1_delete")
     * @Method("DELETE")
     */
    public function deleteAction(Request $request, $id)
    {
        $form = $this->createDeleteForm($id);
        $form->handleRequest($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $entity = $em->getRepository('ApplicationTestCrudBundle:Test1')->find($id);

            if (!$entity) {
                throw $this->createNotFoundException('Unable to find Test1 entity.');
            }

            $em->remove($entity);
            $em->flush();
        }

        return $this->redirect($this->generateUrl('test1'));
    }

    /**
     * Creates a form to delete a Test1 entity by id.
     *
     * @param mixed $id The entity id
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createDeleteForm($id)
    {
        return $this->createFormBuilder()
            ->setAction($this->generateUrl('test1_delete', array('id' => $id)))
            ->setMethod('DELETE')
            ->add('submit', 'submit', array('label' => 'Delete'))
            ->getForm()
        ;
    }
}
