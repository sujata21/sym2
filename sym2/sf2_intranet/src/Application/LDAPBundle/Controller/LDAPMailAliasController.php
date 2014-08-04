<?php

namespace Application\LDAPBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Application\LDAPBundle\Entity\LDAPMailAlias;

use Application\LDAPBundle\Form\LDAPMailAliasType;
use Application\LDAPBundle\Form\Filter\LDAPMailAliasType as LDAPMailAliasFilterType;
use Application\LDAPBundle\Service\LDAPServer as LDAPServer;
use Application\LDAPBundle\Service\LDAPMailAlias as LDAPMailAliasService;


/**
 * LDAPMailAlias controller.
 *
 * @Route("/ldapmailalias")
 */
class LDAPMailAliasController extends Controller
{
    /**
     * Lists all LDAPMailAlias entities.
     *
     * @Route("/", name="ldapmailalias")
     * @Template()
     */
    public function indexAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        
        $entity  = new LDAPMailAlias();
		//$filterForm = $this->createForm(new LDAPMailAliasType(), $entity);
        $filterForm = $this->createForm(new LDAPMailAliasFilterType(), $entity);
        
        $qbl = $em->getRepository('ApplicationLDAPBundle:LDAPMailAlias')
		->createQueryBuilder('a');
		//die();
        if ($this->get('request')->request->has('filter-submit')) {
            $params = array_values($this->getRequest()->request->all());
            $keysToUnset = array('_token');
            foreach ($keysToUnset as &$keyToUnset) {
                if (array_key_exists($keyToUnset, $params[0])) {
                    unset($params[0][$keyToUnset]);
                }
            }
            $arrayKeys = array_keys($params[0]);
           // var_dump($params); die();
            foreach ($params[0] as $key => $value) {
                if (trim($value) != '') {
                        $qbl->Where('a.'.$key." like :".$key);
                        $qbl->setParameter($key, "%".$value."%");

                }
            }

		}
       
       $query = $qbl->getQuery();

		$pageCount = $request->query->get('page-count');

        if ($pageCount == null) {
            $pageCount = 50;
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
     * Finds and displays a LDAPMailAlias entity.
     *
     * @Route("/{id}/show", name="ldapmailalias_show")
     * @Template()
     */
    public function showAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('ApplicationLDAPBundle:LDAPMailAlias')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find LDAPMailAlias entity.');
        }

        $deleteForm = $this->createDeleteForm($id);

        return array(
            'entity'      => $entity,
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Displays a form to create a new LDAPMailAlias entity.
     *
     * @Route("/new", name="ldapmailalias_new")
     * @Template()
     */
    public function newAction()
    {
        
        $entity = new LDAPMailAlias();
        $form   = $this->createForm(new LDAPMailAliasType(), $entity);

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    /**
     * Creates a new LDAPMailAlias entity. xxxx
     *
     * @Route("/create", name="ldapmailalias_create")
     * @Method("POST")
     * @Template("ApplicationLDAPBundle:LDAPMailAlias:new.html.twig")
     */
    public function createAction(Request $request)
    {
        $entity  = new LDAPMailAlias();
        $form = $this->createForm(new LDAPMailAliasType(), $entity);
        $form->bind($request);
        $alias_name =str_replace(' ','_',strtolower($entity->getName()));
        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $entity->setName($alias_name.'@alchemyworx.com');
            $entity->setUserId($this->getUser());
            $em->persist($entity);
            $em->flush();

            $alias_name = explode('@', $entity->getName());
            $ldapMailAliasService = $this->get('application_ldap_mailalias_service');
            $ldapMailAliasService->initialize();
            $MailAlias = array( 'name'      => $alias_name[0]
                      , 'description'       => $alias_name[0].' mail group'
                      , 'objectclass'       => 'groupOfNames'
                      , 'member'            =>  ''
        );
              
        $result = $ldapMailAliasService->addMailAlias($MailAlias);
        
            
        //    die();

            return $this->redirect($this->generateUrl('ldapmailalias_show', array('id' => $entity->getId())));
        }

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    /**
     * Displays a form to edit an existing LDAPMailAlias entity.
     *
     * @Route("/{id}/edit", name="ldapmailalias_edit")
     * @Template()
     */
    public function editAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('ApplicationLDAPBundle:LDAPMailAlias')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find LDAPMailAlias entity.');
        }

        $editForm = $this->createForm(new LDAPMailAliasType(), $entity);
        $deleteForm = $this->createDeleteForm($id);

        return array(
            'entity'      => $entity,
            'edit_form'   => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Edits an existing LDAPMailAlias entity.
     *
     * @Route("/{id}/update", name="ldapmailalias_update")
     * @Method("POST")
     * @Template("ApplicationLDAPBundle:LDAPMailAlias:edit.html.twig")
     */
    public function updateAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('ApplicationLDAPBundle:LDAPMailAlias')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find LDAPMailAlias entity.');
        }

        $deleteForm = $this->createDeleteForm($id);
        $editForm = $this->createForm(new LDAPMailAliasType(), $entity);
        $editForm->bind($request);

        if ($editForm->isValid()) {
            $em->persist($entity);
            $em->flush();


            return $this->redirect($this->generateUrl('ldapmailalias_edit', array('id' => $id)));
        }

        return array(
            'entity'      => $entity,
            'edit_form'   => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Deletes a LDAPMailAlias entity.
     *
     * @Route("/{id}/delete", name="ldapmailalias_delete")
     * @Method("GET")
     */
    public function deleteAction(Request $request, $id)
    {
      
            $em = $this->getDoctrine()->getManager();
            $entity = $em->getRepository('ApplicationLDAPBundle:LDAPMailAlias')->find($id);

            $alias_name = explode('@', $entity->getName());

            $em->remove($entity);
            $em->flush();


            $ldapMailAliasService = $this->get('application_ldap_mailalias_service');
            $ldapMailAliasService->initialize();
            
            $result = $ldapMailAliasService->deleteMailAlias($alias_name[0]);
            
     
        return $this->redirect($this->generateUrl('ldapmailalias'));
    }

    private function createDeleteForm($id)
    {
        return $this->createFormBuilder(array('id' => $id))
            ->add('id', 'hidden')
            ->getForm()
        ;
    }
}
