<?php

namespace Application\LDAPBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Application\LDAPBundle\Entity\Banner;
use Application\LDAPBundle\Form\BannerType;

/**
 * Banner controller.
 *
 * @Route("/admin/banner")
 */
class BannerController extends Controller
{

    /**
     * Lists all Banner entities.
     *
     * @Route("/", name="banner")
     * @Method("GET")
     * @Template()
     */
    public function indexAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        
        $entity  = new Banner();
        $filterForm = $this->createForm(new BannerType(), $entity);
        
        $qbl = $em->getRepository('ApplicationLDAPBundle:Banner')
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
     * Creates a new Banner entity.
     *
     * @Route("/create", name="banner_create")
     * @Method("POST")
     * @Template("ApplicationLDAPBundle:Banner:new.html.twig")
     */
    public function createAction(Request $request)
    {
        $entity = new Banner();
        $form = $this->createForm(new BannerType(), $entity);
        $form->bind($request);
        echo '<pre>';
        var_dump($entity);
        echo '</pre>'; //die();
        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($entity);
            $em->flush();

            return $this->redirect($this->generateUrl('banner_show', array('id' => $entity->getId())));
        }

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    /**
    * Creates a form to create a Banner entity.
    *
    * @param Banner $entity The entity
    *
    * @return \Symfony\Component\Form\Form The form
    */
    private function createCreateForm(Banner $entity)
    {
        $form = $this->createForm(new BannerType(), $entity, array(
            'action' => $this->generateUrl('banner_create'),
            'method' => 'POST',
        ));

        //$form->add('submit', 'submit', array('label' => 'Create'));

        return $form;
    }

    /**
     * Displays a form to create a new Banner entity.
     *
     * @Route("/new", name="banner_new")
     * @Template()
     */
    public function newAction()
    {
        $entity = new Banner();
        $form   = $this->createForm(new BannerType(), $entity);

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    /**
     * Finds and displays a Banner entity.
     *
     * @Route("/{id}", name="banner_show")
     * @Method("GET")
     * @Template()
     */
    public function showAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('ApplicationLDAPBundle:Banner')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Banner entity.');
        }

        $deleteForm = $this->createDeleteForm($id);

        return array(
            'entity'      => $entity,
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Displays a form to edit an existing Banner entity.
     *
     * @Route("/{id}/edit", name="banner_edit")
     * @Method("GET")
     * @Template()
     */
    public function editAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('ApplicationLDAPBundle:Banner')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Banner entity.');
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
    * Creates a form to edit a Banner entity.
    *
    * @param Banner $entity The entity
    *
    * @return \Symfony\Component\Form\Form The form
    */
    private function createEditForm(Banner $entity)
    {
        $form = $this->createForm(new BannerType(), $entity, array(
            'action' => $this->generateUrl('banner_update', array('id' => $entity->getId())),
            'method' => 'POST',
        ));

        //$form->add('submit', 'submit', array('label' => 'Update'));

        return $form;
    }
    /**
     * Edits an existing Banner entity.
     *
     * @Route("/{id}/update", name="banner_update")
     * @Method("POST")
     * @Template("ApplicationLDAPBundle:Banner:edit.html.twig")
     */
    public function updateAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('ApplicationLDAPBundle:Banner')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Banner entity.');
        }

        $deleteForm = $this->createDeleteForm($id);
        $editForm = $this->createEditForm($entity);
        $editForm->handleRequest($request);

        if ($editForm->isValid()) {
            $em->flush();

            return $this->redirect($this->generateUrl('banner_show', array('id' => $id)));
        }

        return array(
            'entity'      => $entity,
            'edit_form'   => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        );
    }
    /**
     * Deletes a Banner entity.
     *
     * @Route("/{id}/delete", name="banner_delete")
     * @Method("GET")
     */
    public function deleteAction(Request $request, $id)
    {
        //$form = $this->createDeleteForm($id);
        //$form->handleRequest($request);

        //if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $entity = $em->getRepository('ApplicationLDAPBundle:Banner')->find($id);

            if (!$entity) {
                throw $this->createNotFoundException('Unable to find Banner entity.');
            }

            $em->remove($entity);
            $em->flush();
        //}

        return $this->redirect($this->generateUrl('banner'));
    }

    /**
     * Creates a form to delete a Banner entity by id.
     *
     * @param mixed $id The entity id
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createDeleteForm($id)
    {
        return $this->createFormBuilder()
            ->setAction($this->generateUrl('banner_delete', array('id' => $id)))
            ->setMethod('GET')
            ->add('submit', 'submit', array('label' => 'Delete'))
            ->getForm()
        ;
    }
}
