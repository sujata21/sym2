<?php

namespace Application\LDAPBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Application\LDAPBundle\Entity\LDAPUserGroup;
use Symfony\Component\Config\FileLocator;

use Application\LDAPBundle\Form\LDAPUserGroupType;
use Application\LDAPBundle\Form\Filter\LDAPUserGroupType as LDAPUserGroupFilterType;
use Application\LDAPBundle\Service\LDAPMailAlias as LDAPMailAliasService;
use Application\LDAPBundle\Entity\LDAPMailAliasUser;


/**
 * LDAPUserGroup controller.
 *
 * @Route("/admin/ldapusergroup")
 */
class LDAPUserGroupController extends Controller
{
    /**
     * Lists all LDAPUserGroup entities.
     *
     * @Route("/", name="ldapusergroup")
     * @Template()
     */
    public function indexAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        
        $entity  = new LDAPUserGroup();
		$filterForm = $this->createForm(new LDAPUserGroupFilterType(), $entity);
        
        $qbl = $em->getRepository('ApplicationLDAPBundle:LDAPUserGroup')
		->createQueryBuilder('a');
		
	/*	if(is_object($request) && $request->isMethod('POST')){
			$filterForm->bind($request);
			$obj = $filterForm->getData();
			if($obj->getName() != ""){
				$qbl->where("a.name like :name");
				$qbl->setParameter('name', $obj->getName().'%');
			}
		}*/
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
     // echo  $qbl;
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
     * Finds and displays a LDAPUserGroup entity.
     *
     * @Route("/{id}/show", name="ldapusergroup_show")
     * @Template()
     */
    public function showAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('ApplicationLDAPBundle:LDAPUserGroup')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find LDAPUserGroup entity.');
        }

        $deleteForm = $this->createDeleteForm($id);

        return array(
            'entity'      => $entity,
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Displays a form to create a new LDAPUserGroup entity.
     *
     * @Route("/new", name="ldapusergroup_new")
     * @Template()
     */
    public function newAction()
    {
        $entity = new LDAPUserGroup();
        $form   = $this->createForm(new LDAPUserGroupType(), $entity);

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    /**
     * Creates a new LDAPUserGroup entity. xxxx
     *
     * @Route("/create", name="ldapusergroup_create")
     * @Method("POST")
     * @Template("ApplicationLDAPBundle:LDAPUserGroup:new.html.twig")
     */
    public function createAction(Request $request)
    {
        $entity  = new LDAPUserGroup();
        $form = $this->createForm(new LDAPUserGroupType(), $entity);
        $form->bind($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $username = $entity->getLdapUser()->getUsername();
            $grpname  = $entity->getLdapGroup()->getName();

            $entity_user = $em->getRepository('ApplicationLDAPBundle:LDAPUser')->findOneBy(array('username'=>$username));
            $entity_group = $em->getRepository('ApplicationLDAPBundle:LDAPGroup')->findOneBy(array('name'=>$grpname));
            //to check if the mailalias-user relation already exists in database
            $entity_group_user = $em->getRepository('ApplicationLDAPBundle:LDAPUserGroup')->findOneBy(array('ldapGroup'=>$entity_group,'ldapUser'=>$entity_user));
           
            if(count($entity_group_user)<1){
            //to ldapgroup
                $option = '-m';
                $fileLocator = new FileLocator ( __DIR__ . '/../../LDAPBundle/Resources/script' );
                $script = $fileLocator->locate ( 'ldap-group-adduser.sh' );
                $cmd = $script." \"$username\" \"$grpname\" \"$option\"";
                $result = exec($cmd);

                $em->persist($entity);
                $em->flush();
            }

            //add user to ldap mailalias and database            

            $alias_name = $grpname.'@alchemyworx.com';
            $entity_alias = $em->getRepository('ApplicationLDAPBundle:LDAPMailAlias')->findOneBy(array('name'=>$alias_name));
            
            //to check if the mailalias-user relation already exists in database
            $entity_mail_alias_user = $em->getRepository('ApplicationLDAPBundle:LDAPMailAliasUser')->findOneBy(array('ldapMailAlias'=>$entity_alias,'ldapUser'=>$entity_user));
            if(count($entity_mail_alias_user)<1){
                
                $ldapMailAliasService = $this->get('application_ldap_mailalias_service');
                $ldapMailAliasService->initialize();
                $result = $ldapMailAliasService->saveMailAliasUser($grpname,$username);

            //echo 'test';
                if( $result){
                    $entity_mailalias  = new LDAPMailAliasUser();
                    $entity_mailalias->setLdapMailAlias($entity_alias);
                    $entity_mailalias->setLdapUser($entity_user);
                    $entity_mailalias->setSubscribe(0);
                    $entity_mailalias->setStatus('1');
                    $em->persist($entity_mailalias);
                    $em->flush();
                }
            
            }
            //die();
            return $this->redirect($this->generateUrl('ldapusergroup_show', array('id' => $entity->getId())));
        }

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    /**
     * Displays a form to edit an existing LDAPUserGroup entity.
     *
     * @Route("/{id}/edit", name="ldapusergroup_edit")
     * @Template()
     */
    public function editAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('ApplicationLDAPBundle:LDAPUserGroup')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find LDAPUserGroup entity.');
        }

        $editForm = $this->createForm(new LDAPUserGroupType(), $entity);
        $deleteForm = $this->createDeleteForm($id);

        return array(
            'entity'      => $entity,
            'edit_form'   => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Edits an existing LDAPUserGroup entity.
     *
     * @Route("/{id}/update", name="ldapusergroup_update")
     * @Method("POST")
     * @Template("ApplicationLDAPBundle:LDAPUserGroup:edit.html.twig")
     */
    public function updateAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('ApplicationLDAPBundle:LDAPUserGroup')->find($id);
        $username = $entity->getLdapUser()->getUsername();
        $grpname  = $entity->getLdapGroup()->getName();
        $option = '-x';
        $fileLocator = new FileLocator ( __DIR__ . '/../../LDAPBundle/Resources/script' );
        $script = $fileLocator->locate ( 'ldap-group-adduser.sh' );
        $cmd = $script." \"$username\" \"$grpname\" \"$option\"";
        $result = exec($cmd);
        if (!$entity) {
            throw $this->createNotFoundException('Unable to find LDAPUserGroup entity.');
        }

        $deleteForm = $this->createDeleteForm($id);
        $result1 = exec($cmd);
        $editForm = $this->createForm(new LDAPUserGroupType(), $entity);
        $editForm->bind($request);

        if ($editForm->isValid()) {
            $em->persist($entity);
            $em->flush();
            $username = $entity->getLdapUser()->getUsername();
            $grpname  = $entity->getLdapGroup()->getName();
            $option = '-m';
            $fileLocator = new FileLocator ( __DIR__ . '/../../LDAPBundle/Resources/script');
            $script = $fileLocator->locate ( 'ldap-group-adduser.sh' );
            $cmd1 = $script." \"$username\" \"$grpname\" \"$option\"";
            $result1 = exec($cmd1);

            return $this->redirect($this->generateUrl('ldapusergroup_edit', array('id' => $id)));
        }

        return array(
            'entity'      => $entity,
            'edit_form'   => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Deletes a LDAPUserGroup entity.
     *
     * @Route("/{id}/delete", name="ldapusergroup_delete")
     * @Method("GET")
     */
    public function deleteAction(Request $request, $id)
    {
            $em = $this->getDoctrine()->getManager();
            $entity = $em->getRepository('ApplicationLDAPBundle:LDAPUserGroup')->find($id);

            $username = $entity->getLdapUser()->getUsername();
            $grpname  = $entity->getLdapGroup()->getName();
            $option = '-x';
            $fileLocator = new FileLocator ( __DIR__ . '/../../LDAPBundle/Resources/script' );
            $script = $fileLocator->locate ( 'ldap-group-adduser.sh' );
            $cmd = $script." \"$username\" \"$grpname\" \"$option\"";
            $result = exec($cmd);
            $em->remove($entity);
            $em->flush();
       

        return $this->redirect($this->generateUrl('ldapusergroup'));
    }

    private function createDeleteForm($id)
    {
        return $this->createFormBuilder(array('id' => $id))
            ->add('id', 'hidden')
            ->getForm()
        ;
    }
    /**
     * Creates a new LDAPUser entity.
     *
     * @Route("/removegroupuser", name="ldapusergroup_removegroupuser")
     * @Method("POST")
     */
    public function removegroupuserAction(Request $request)
    {
        $selected = array();
        $selected = $_POST['selected'];
        //var_dump($selected);
        foreach($selected as $row){
            $this->removeFromGroups($row);
        }
        echo 'Successfully Updated!!';
        exit();
    }
    public function removeFromGroups($row)
    {
       // echo $username;die();
        $em = $this->getDoctrine()->getManager();
        
        $entity = $em->getRepository('ApplicationLDAPBundle:LDAPUserGroup')->find($row);
        $user = $entity->getLdapUser()->getUsername(); 
        $group = $entity->getLdapGroup()->getName();
        //die();
        $option = '-x';
        $fileLocator = new FileLocator ( __DIR__ . '/../../LDAPBundle/Resources/script' );
        $script = $fileLocator->locate ( 'ldap-group-adduser.sh' );
        $cmd = $script." \"$user\" \"$group\" \"$option\"";
        
      $result = exec($cmd);
        
      $em->remove($entity);
     $em->flush();
        
        $this->removeFromAlias($entity->getLdapUser() , $entity->getLdapGroup()->getldapMailAlias());
        
        return true;
        //die();
    }
    public function removeFromAlias($user , $mailalias)
    {
          $username = $user->getUsername();
         $grpname =  $mailalias->getName();
         $alias_name = explode('@', $grpname);
        // $alias_name[0] = ucwords(str_replace('_', ' ',$alias_name[0]));
        //echo $alias_name['0'];  

        $em = $this->getDoctrine()->getManager();
        
        $entity = $em->getRepository('ApplicationLDAPBundle:LDAPMailAliasUser')->findOneBy(array('ldapMailAlias'=>$mailalias,'ldapUser'=>$user));

        
            
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
          
        
        return true;
    //  die();
    }
}
