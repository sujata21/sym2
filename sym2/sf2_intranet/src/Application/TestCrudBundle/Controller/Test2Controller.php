<?php

namespace Application\TestCrudBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Application\TestCrudBundle\Entity\Test2;
use Application\TestCrudBundle\Form\Test2Type;

/**
 * Test2 controller.
 *
 * @Route("/test2")
 */
class Test2Controller extends Controller
{

    /**
     * Lists all Test2 entities.
     *
     * @Route("/", name="test2")
     * @Method("GET")
     * @Template()
     */
    public function indexAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        
        $entity  = new Test2();
        $filterForm = $this->createForm(new Test2Type(), $entity);
        
        $qbl = $em->getRepository('ApplicationTestCrudBundle:Test2')
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
        
        $pageCount = $request->query->get('page-count');

        if ($pageCount == null) {
            $pageCount = 10;
        }

        $paginator = $this->get('knp_paginator');
        $pagination = $paginator->paginate(
                $query,
                $this->get('request')->query->get('page', 1),
                $pageCount,
                array('distinct' => false)
        );
            
        $filter_form   = $filterForm->createView();
        $csrfToken = $this->container->get('form.csrf_provider')->generateCsrfToken('authenticate');

        return compact('pagination', 'filter_form', 'csrfToken');
    }
        /**
     * Creates a new Test2 entity.
     *
     * @Route("/create", name="test2_create")
     * @Method("POST")
     * @Template("ApplicationTestCrudBundle:Test2:new.html.twig")
     */
    public function createAction(Request $request)
    {
        $entity = new Test2();
        $form = $this->createForm(new Test2Type(), $entity);
        $form->bind($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($entity);
            $em->flush();

            return $this->redirect($this->generateUrl('test2_show', array('id' => $entity->getId())));
        }

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    /**
    * Creates a form to create a Test2 entity.
    *
    * @param Test2 $entity The entity
    *
    * @return \Symfony\Component\Form\Form The form
    */
    private function createCreateForm(Test2 $entity)
    {
        $form = $this->createForm(new Test2Type(), $entity, array(
            'action' => $this->generateUrl('test2_create'),
            'method' => 'POST',
        ));

        //$form->add('submit', 'submit', array('label' => 'Create'));

        return $form;
    }

    /**
     * Displays a form to create a new Test2 entity.
     *
     * @Route("/new", name="test2_new")
     * @Template()
     */
    public function newAction()
    {
        $entity = new Test2();
        $form   = $this->createForm(new Test2Type(), $entity);

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    /**
     * Finds and displays a Test2 entity.
     *
     * @Route("/{id}", name="test2_show")
     * @Method("GET")
     * @Template()
     */
    public function showAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('ApplicationTestCrudBundle:Test2')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Test2 entity.');
        }

        $deleteForm = $this->createDeleteForm($id);

        return array(
            'entity'      => $entity,
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Displays a form to edit an existing Test2 entity.
     *
     * @Route("/{id}/edit", name="test2_edit")
     * @Method("GET")
     * @Template()
     */
    public function editAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('ApplicationTestCrudBundle:Test2')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Test2 entity.');
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
    * Creates a form to edit a Test2 entity.
    *
    * @param Test2 $entity The entity
    *
    * @return \Symfony\Component\Form\Form The form
    */
    private function createEditForm(Test2 $entity)
    {
        $form = $this->createForm(new Test2Type(), $entity, array(
            'action' => $this->generateUrl('test2_update', array('id' => $entity->getId())),
            'method' => 'POST',
        ));

        //$form->add('submit', 'submit', array('label' => 'Update'));

        return $form;
    }
    /**
     * Edits an existing Test2 entity.
     *
     * @Route("/{id}/update", name="test2_update")
     * @Method("POST")
     * @Template("ApplicationTestCrudBundle:Test2:edit.html.twig")
     */
    public function updateAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('ApplicationTestCrudBundle:Test2')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Test2 entity.');
        }

        $deleteForm = $this->createDeleteForm($id);
        $editForm = $this->createEditForm($entity);
        $editForm->handleRequest($request);

        if ($editForm->isValid()) {
            $em->flush();

            return $this->redirect($this->generateUrl('test2_show', array('id' => $id)));
        }

        return array(
            'entity'      => $entity,
            'edit_form'   => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        );
    }
    /**
     * Deletes a Test2 entity.
     *
     * @Route("/{id}/delete", name="test2_delete")
     * @Method("GET")
     */
    public function deleteAction(Request $request, $id)
    {
        //$form = $this->createDeleteForm($id);
        //$form->handleRequest($request);

        //if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $entity = $em->getRepository('ApplicationTestCrudBundle:Test2')->find($id);

            if (!$entity) {
                throw $this->createNotFoundException('Unable to find Test2 entity.');
            }

            $em->remove($entity);
            $em->flush();
        //}

        return $this->redirect($this->generateUrl('test2'));
    }

    /**
     * Creates a form to delete a Test2 entity by id.
     *
     * @param mixed $id The entity id
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createDeleteForm($id)
    {
        return $this->createFormBuilder()
            ->setAction($this->generateUrl('test2_delete', array('id' => $id)))
            ->setMethod('GET')
            ->add('submit', 'submit', array('label' => 'Delete'))
            ->getForm()
        ;
    }
}
