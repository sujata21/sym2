<?php

namespace Application\LDAPBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Application\LDAPBundle\Entity\LDAPUserGroup;
use Application\LDAPBundle\Entity\LDAPMailAliasUser;
use Application\LDAPBundle\Entity\LDAPMailAlias;
use Application\LDAPBundle\Form\LDAPMailAliasUserType;
use Application\LDAPBundle\Form\Filter\LDAPMailAliasUserType as LDAPMailAliasUserFilterType;
use Application\LDAPBundle\Service\LDAPMailAlias as LDAPMailAliasService;
use Symfony\Component\Config\FileLocator;

/**
 * LDAPMailAliasUser controller.
 *
 * @Route("/admin/ldapmailaliasuser")
 */
class LDAPMailAliasUserController extends Controller
{

    /**
     * Lists all LDAPMailAliasUser entities.
     *
     * @Route("/", name="ldapmailaliasuser")
     * @Template()
     */
    public function indexAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        
        $entity  = new LDAPMailAliasUser();
        $filterForm = $this->createForm(new LDAPMailAliasUserFilterType(), $entity);
        
        $qbl = $em->getRepository('ApplicationLDAPBundle:LDAPMailAliasUser')
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
                            
                        $qbl->andWhere("a.".$key." like :".$key);
                        $qbl->setParameter($key, "%".$value."%");
                    }else {
                        
                            $qbl->andWhere("a.".$key." =:".$key);
                            $qbl->setParameter($key, $value);
                           
                    }
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
     * Creates a new LDAPMailAliasUser entity.
     *
     * @Route("/create", name="ldapmailaliasuser_create")
     * @Method("POST")
     * @Template("ApplicationLDAPBundle:LDAPMailAliasUser:new.html.twig")
     */
    public function createAction(Request $request)
    {
        $entity = new LDAPMailAliasUser();
        $form = $this->createForm(new LDAPMailAliasUserType(), $entity);
        $form->bind($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();

            $username = $entity->getLdapUser()->getUsername();
            echo $alias_name  = $entity->getLdapMailAlias()->getName();

            $alias_name_ldap = explode('@', $alias_name);
            
           
            //to check if the mailalias-user relation already exists in database
            $entity_mail_alias_user = $em->getRepository('ApplicationLDAPBundle:LDAPMailAliasUser')->findBy(array('ldapMailAlias'=>$entity->getLdapMailAlias(),'ldapUser'=>$entity->getLdapUser()));
            //echo count($entity_mail_alias_user); die();
            if(count($entity_mail_alias_user)<1){
                
                $ldapMailAliasService = $this->get('application_ldap_mailalias_service');
                $ldapMailAliasService->initialize();
                $result = $ldapMailAliasService->saveMailAliasUser($alias_name_ldap[0],$username);
                if($result){
                    $entity->setSubscribe(1);
                    $entity->setStatus(0);
                    $em->persist($entity);
                    $em->flush();
                }
                $em->persist($entity);
                $em->flush();
            }

            return $this->redirect($this->generateUrl('ldapmailaliasuser_show', array('id' => $entity->getId())));
        }

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    /**
    * Creates a form to create a LDAPMailAliasUser entity.
    *
    * @param LDAPMailAliasUser $entity The entity
    *
    * @return \Symfony\Component\Form\Form The form
    */
    private function createCreateForm(LDAPMailAliasUser $entity)
    {
        $form = $this->createForm(new LDAPMailAliasUserType(), $entity, array(
            'action' => $this->generateUrl('ldapmailaliasuser_create'),
            'method' => 'POST',
        ));

        //$form->add('submit', 'submit', array('label' => 'Create'));

        return $form;
    }

    /**
     * Displays a form to create a new LDAPMailAliasUser entity.
     *
     * @Route("/new", name="ldapmailaliasuser_new")
     * @Template()
     */
    public function newAction()
    {
        $entity = new LDAPMailAliasUser();
        $form   = $this->createForm(new LDAPMailAliasUserType(), $entity);

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }
    /**
     * Displays a form to create a new LDAPMailAliasUser entity.
     *
     * @Route("/group_owner/{group_id}", name="ldapmailaliasuser_new_admin")
     * @Template("ApplicationLDAPBundle:LDAPMailAliasUser:new_admin.html.twig")
     */
    public function group_ownerAction($group_id = NULL)
    {
       // echo $group_id;
        $em = $this->getDoctrine()->getManager();
        $entity_alias = $em->getRepository('ApplicationLDAPBundle:LDAPMailAlias')->find($group_id);
        $entity = new LDAPMailAliasUser();
        $entity->setLdapMailAlias($entity_alias);
        $form   = $this->createForm(new LDAPMailAliasUserType(), $entity);

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }
        /**
     * Creates a new LDAPMailAliasUser entity.
     *
     * @Route("/create_admin", name="ldapmailaliasuser_create_admin")
     * @Method("POST")
     * @Template("ApplicationLDAPBundle:LDAPMailAliasUser:new_admin.html.twig")
     */
    public function create_adminAction(Request $request)
    {
        $entity = new LDAPMailAliasUser();
        $form = $this->createForm(new LDAPMailAliasUserType(), $entity);
        $form->bind($request);

        if ($form->isValid()) {
           
            $em = $this->getDoctrine()->getManager();
            //check if it exists in mailaliasuse
            $entity_aliasuser =  $em->getRepository('ApplicationLDAPBundle:LDAPMailAliasUser')->findOneBy(array('ldapMailAlias'=>$entity->getLdapMailAlias(),'ldapUser'=>$entity->getLdapUser()));
            //echo $entity_aliasuser->getLdapMailAlias()->getName();
            if(!$entity_aliasuser){
                $entity_aliasuser = new LDAPMailAliasUser();
               // $entity_aliasuser->set
                $entity_aliasuser->setLdapMailAlias($entity->getLdapMailAlias());
                $entity_aliasuser->setLdapUser($entity->getLdapUser());
                $entity_aliasuser->setSubscribe(1);
                $entity_aliasuser->setStatus(0);
                $em->persist($entity_aliasuser);


                
            }
            //echo $entity->getLdapUser()->getUserId();  
            $entity_alias = $em->getRepository('ApplicationLDAPBundle:LDAPMailAlias')->find($entity->getLdapMailAlias()->getId());
            $entity_alias->setUserId($entity->getLdapUser()->getUserId());
            //$entity_alias->getUserId();
            $em->persist($entity_alias);
            //$entity_alias->getId();
            //update group owner
            $entity_group = $em->getRepository('ApplicationLDAPBundle:LDAPGroup')->findOneBy(array('ldapMailAlias'=>$entity_alias));
           // echo $entity_group->getId();
            if($entity_group){
                $entity_group->setUserId($entity->getLdapUser()->getUserId());
                $em->persist($entity_group);

            $entity_groupuser = $em->getRepository('ApplicationLDAPBundle:LDAPUserGroup')->findOneBy(array('ldapGroup'=>$entity_group,'ldapUser'=>$entity->getLdapUser()));
            //echo $entity_groupuser->getLdapUser();
                if(!$entity_groupuser){
                //echo 'test';
                    $entity_groupuser = new LDAPUserGroup();
               // $entity_aliasuser->set
                    $entity_groupuser->setLdapGroup($entity_group);
                    $entity_groupuser->setLdapUser($entity->getLdapUser());
               
                    $em->persist($entity_groupuser);
                
                }

            }
            
        
            $em->flush();
          //  die();

                $alias_name = explode('@', $entity_aliasuser->getLdapMailAlias()->getName());
                //$alias_name =  $entity_group->getName();
                $user_name  =  $entity_aliasuser->getLdapUser()->getUsername();
                $ldapMailAliasService = $this->get('application_ldap_mailalias_service');
                $ldapMailAliasService->initialize();
                $result = $ldapMailAliasService->saveMailAliasUser($alias_name[0],$user_name);
                if($entity_group){
                    $option = '-m';
                    $fileLocator = new FileLocator ( __DIR__ . '/../../LDAPBundle/Resources/script' );
                    $script = $fileLocator->locate ( 'ldap-group-adduser.sh' );
                    $cmd = $script." \"$user_name\" \"$alias_name\" \"$option\"";
                    $result = exec($cmd);
                }

 //die();
            return $this->redirect($this->generateUrl('ldapmailalias'));
        }

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }
    /**
     * Finds and displays a LDAPMailAliasUser entity.
     *
     * @Route("/{id}", name="ldapmailaliasuser_show")
     * @Method("GET")
     * @Template()
     */
    public function showAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('ApplicationLDAPBundle:LDAPMailAliasUser')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find LDAPMailAliasUser entity.');
        }

        $deleteForm = $this->createDeleteForm($id);

        return array(
            'entity'      => $entity,
            'delete_form' => $deleteForm->createView(),
        );
    }
   

    /**
     * Displays a form to edit an existing LDAPMailAliasUser entity.
     *
     * @Route("/{id}/edit", name="ldapmailaliasuser_edit")
     * @Method("GET")
     * @Template()
     */
    public function editAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('ApplicationLDAPBundle:LDAPMailAliasUser')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find LDAPMailAliasUser entity.');
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
    * Creates a form to edit a LDAPMailAliasUser entity.
    *
    * @param LDAPMailAliasUser $entity The entity
    *
    * @return \Symfony\Component\Form\Form The form
    */
    private function createEditForm(LDAPMailAliasUser $entity)
    {
        $form = $this->createForm(new LDAPMailAliasUserType(), $entity, array(
            'action' => $this->generateUrl('ldapmailaliasuser_update', array('id' => $entity->getId())),
            'method' => 'POST',
        ));

        //$form->add('submit', 'submit', array('label' => 'Update'));

        return $form;
    }
    /**
     * Edits an existing LDAPMailAliasUser entity.
     *
     * @Route("/{id}/update", name="ldapmailaliasuser_update")
     * @Method("POST")
     * @Template("ApplicationLDAPBundle:LDAPMailAliasUser:edit.html.twig")
     */
    public function updateAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('ApplicationLDAPBundle:LDAPMailAliasUser')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find LDAPMailAliasUser entity.');
        }

        $deleteForm = $this->createDeleteForm($id);
        $editForm = $this->createEditForm($entity);
        $editForm->handleRequest($request);

        if ($editForm->isValid()) {
            $em->flush();

            return $this->redirect($this->generateUrl('ldapmailaliasuser_show', array('id' => $id)));
        }

        return array(
            'entity'      => $entity,
            'edit_form'   => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        );
    }
    /**
     * Deletes a LDAPMailAliasUser entity.
     *
     * @Route("/{id}/delete", name="ldapmailaliasuser_delete")
     * @Method("GET")
     */
    public function deleteAction(Request $request, $id)
    {
        //$form = $this->createDeleteForm($id);
        //$form->handleRequest($request);

        //if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $entity = $em->getRepository('ApplicationLDAPBundle:LDAPMailAliasUser')->find($id);

            if (!$entity) {
                throw $this->createNotFoundException('Unable to find LDAPMailAliasUser entity.');
            }

            $em->remove($entity);
            $em->flush();
        //}

        return $this->redirect($this->generateUrl('ldapmailaliasuser'));
    }

    /**
     * Creates a form to delete a LDAPMailAliasUser entity by id.
     *
     * @param mixed $id The entity id
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createDeleteForm($id)
    {
        return $this->createFormBuilder()
            ->setAction($this->generateUrl('ldapmailaliasuser_delete', array('id' => $id)))
            ->setMethod('GET')
            ->add('submit', 'submit', array('label' => 'Delete'))
            ->getForm()
        ;
    }
    /**
     * Creates a new LDAPUser entity.
     *
     * @Route("/removealiasuser", name="ldapmailaliasuser_removealiasuser")
     * @Method("POST")
     */
    public function removealiasuserAction(Request $request)
    {
        $selected = array();
        $selected = $_POST['selected'];
        //var_dump($selected);
        foreach($selected as $row){
          //  echo $row;
           $ret =  $this->removeFromAlias($row);
        }
        if($ret) {
            echo 'Successfully Updated!!';
        }else{
            echo $ret;
        }       
        
                
        exit();
    }
    public function removeFromAlias($row)
    {
        //var_dump($row); //die();
        $em = $this->getDoctrine()->getManager();
        $entity = $em->getRepository('ApplicationLDAPBundle:LDAPMailAliasUser')->find($row);
        $username = $entity->getLdapUser()->getUsername(); 
         $alias = $entity->getLdapMailAlias()->getName();
        
         $alias_name = explode('@', $alias);
        //echo $alias_name[0];
            
        $ldapMailAliasService = $this->get('application_ldap_mailalias_service');
       // var_dump($ldapMailAliasService);
        $ldapMailAliasService->initialize();
        
        $result = $ldapMailAliasService->removeMailAliasUser($alias_name[0],$username);
       // die();
        //echo "\n";
        if($result){
            $em->remove($entity);
            $em->flush();
        }
          
        
        return $result;
    //  die();
    }
}
