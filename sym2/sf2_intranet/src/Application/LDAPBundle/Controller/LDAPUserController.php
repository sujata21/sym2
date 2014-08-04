<?php

namespace Application\LDAPBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\Config\FileLocator;
use Application\LDAPBundle\Entity\LDAPUser;
use Application\LDAPBundle\Entity\LDAPUserGroup;
use Application\LDAPBundle\Entity\LDAPMailAliasUser;
use Application\LDAPBundle\Service\LDAPServer as LDAPServer;
use Application\LDAPBundle\Form\LDAPUserType;
use Application\LDAPBundle\Form\Filter\LDAPUserType as LDAPUserFilterType;
use Application\LDAPBundle\Entity\LDAPMailAccount;
use Application\LDAPBundle\Entity\Department;
use Application\LDAPBundle\Service\LDAPMailAlias as LDAPMailAliasService;
/**
 * LDAPUser controller.
 *
 * @Route("/admin/ldapuser")
 */
class LDAPUserController extends Controller
{
	/**
	 * Lists all LDAPUser entities.
	 *
	 * @Route("/", name="ldapuser")
	 * @Template()
	 */
	//public function indexAction(Request $request = null)
	public function indexAction(Request $request)
	{
		$em = $this->getDoctrine()->getManager();

		$entity  = new LDAPUser();
		$filterForm = $this->createForm(new LDAPUserFilterType(), $entity);

		$qbl = $em->getRepository('ApplicationLDAPBundle:LDAPUser')->createQueryBuilder('a');
		//$enableflag = 0;
       // $qbl->where('a.enabled = :flag');
       // $qbl->setParameter('flag', 1);

		/*if(is_object($request) && $request->isMethod('POST')){
			$filterForm->bind($request);
			$obj = $filterForm->getData();
			if($obj->getName() != ""){
				$qbl->where("a.name like :name");
				$qbl->setParameter('name', $obj->getName().'%');
			}
		}*/
		$users = $em->getRepository('ApplicationLDAPBundle:LDAPUser')->findAll();
        foreach($users as $user){
              //if(!is_array($user) || (is_array($user) && !isset($user[0]) )){
               // var_dump($user->getShadowLastChange()); die();

                  $shadowlastchange = $user->getShadowLastChange();
                  $startTimeStamp = strtotime("1970/01/01");
                  $endTimeStamp = strtotime(date("Y/m/d"));
                  $timeDiff = $endTimeStamp - $startTimeStamp;
                  $numberDays = $timeDiff / 86400;
                  $numberDays = intval($numberDays);
                  $expired = $numberDays - $shadowlastchange;
                  $days_left = 45 - $expired;
                  $days_to_expire[$user->getId()] = $days_left;
                     
        }

		if ($this->get('request')->request->has('filter-submit')) {
            
            $params = array_values($this->getRequest()->request->all());
            //echo 'enabled-->'.$params[0]['enabled'];
            if($params[0]['enabled'] == ''){
            	$params[0]['enabled'] = 1;
            }
           // var_dump(count($params));
			
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
						if($key == 'department'){
							$department = $em->getRepository('ApplicationLDAPBundle:Department')->find($value);
							$value = $department->getName();
						}
						$qbl->andWhere("a.".$key." like :".$key);
						$qbl->setParameter($key, "%".$value."%");
						//if($key =='enabled'){
							//$enableflag = 1;
						//}
						//echo $value;
						//echo $key;
					}
				}
			}
        }else{
        	$qbl->where('a.enabled = :flag');
       		$qbl->setParameter('flag', 1);
        }

		//echo $qbl;
		/*if($enableflag == 0){
			$qbl->where('a.enabled = :flag');
       		$qbl->setParameter('flag', 1);
		}*/
		$query = $qbl->getQuery();
       //var_dump($query); die();
		//die();
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

		return compact('pagination', 'filter_form', 'csrfToken','days_to_expire');
	}

	/**
	 * Finds and displays a LDAPUser entity.
	 *
	 * @Route("/{id}/show", name="ldapuser_show")
	 * @Route("/profile/{id}", name="ldapuser_profile")
	 * @Template()
	 */
	public function showAction($id=null)
	{
		$em = $this->getDoctrine()->getManager();

		if(is_null($id)){
			$id = $this->getUser()->getId();
			$entity = $em->getRepository('ApplicationLDAPBundle:LDAPUser')->findOneBy(array('user_id' => $id));
		}else{
			$entity = $em->getRepository('ApplicationLDAPBundle:LDAPUser')->findOneBy(array('id' => $id));
		}
		

		

		if (!$entity) {
			throw $this->createNotFoundException('Unable to find LDAPUser entity.');
		}

		$deleteForm = $this->createDeleteForm($id);

		return array(
				'entity'      => $entity,
				'delete_form' => $deleteForm->createView(),
		);
	}

	/**
	 * Displays a form to create a new LDAPUser entity.
	 *
	 * @Route("/new", name="ldapuser_new")
	 * @Template()
	 */
	public function newAction()
	{
		$securityContext = $this->container->get('security.context');
		$entity = new LDAPUser();
		$form   = $this->createForm(new LDAPUserType($securityContext), $entity);

		return array(
				'entity' => $entity,
				'form'   => $form->createView(),
		);
	}

	/**
	 * Creates a new LDAPUser entity.
	 *
	 * @Route("/create", name="ldapuser_create")
	 * @Method("POST")
	 * @Template("ApplicationLDAPBundle:LDAPUser:new.html.twig")
	 */
	public function createAction(Request $request)
	{
		$securityContext = $this->container->get('security.context');
		$entity  = new LDAPUser();
		$form = $this->createForm(new LDAPUserType($securityContext), $entity);
		$form->bind($request);

		if ($form->isValid()) {
			$em = $this->getDoctrine()->getManager();
            $entity->setDepartment($entity->getDepartmentId()->getName());
			$em->persist($entity);
			$em->flush();

			return $this->redirect($this->generateUrl('ldapuser_show', array('id' => $entity->getId())));
		}

		return array(
				'entity' => $entity,
				'form'   => $form->createView(),
		);
	}

	/**
	 * Displays a form to edit an existing LDAPUser entity.
	 *
	 * @Route("/{id}/edit", name="ldapuser_edit")
	 * @Template()
	 */
	public function editAction($id)
	{
		$securityContext = $this->container->get('security.context');
		$em = $this->getDoctrine()->getManager();

		$entity = $em->getRepository('ApplicationLDAPBundle:LDAPUser')->find($id);

		if (!$entity) {
			throw $this->createNotFoundException('Unable to find LDAPUser entity.');
		}

		$editForm = $this->createForm(new LDAPUserType($securityContext), $entity);
		$deleteForm = $this->createDeleteForm($id);

		return array(
				'entity'      => $entity,
				'edit_form'   => $editForm->createView(),
				'delete_form' => $deleteForm->createView(),
		);
	}

	/**
	 * Edits an existing LDAPUser entity.
	 *
	 * @Route("/{id}/update", name="ldapuser_update")
	 * @Method("POST")
	 * @Template("ApplicationLDAPBundle:LDAPUser:edit.html.twig")
	 */
	public function updateAction(Request $request, $id)
	{
		$securityContext = $this->container->get('security.context');
		$em = $this->getDoctrine()->getManager();

		$entity = $em->getRepository('ApplicationLDAPBundle:LDAPUser')->find($id);

		if (!$entity) {
			throw $this->createNotFoundException('Unable to find LDAPUser entity.');
		}

		$deleteForm = $this->createDeleteForm($id);
		$editForm = $this->createForm(new LDAPUserType($securityContext), $entity);
		$editForm->bind($request);

		if ($editForm->isValid()) {
            $entity->setDepartment($entity->getDepartmentId()->getName());
			$em->persist($entity);
			$em->flush();

			if($entity->getMailAccount() == '1'){
				$account = $em->getRepository('ApplicationLDAPBundle:LDAPMailAccount')->findOneByName($entity->getUsername());
				if(empty($account)){					
					$macct = new LDAPMailAccount();
					$macct->setName($entity->getUsername());
					$em->persist($macct);
					$em->flush();					
				}				
			} else {
				$account = $em->getRepository('ApplicationLDAPBundle:LDAPMailAccount')->findOneByName($entity->getUsername());
				if(!empty($account)){
					$em->remove($account);
					$em->flush();
				}
			}

			return $this->redirect($this->generateUrl('ldapuser_show', array('id' => $entity->getId())));
		}

		return array(
				'entity'      => $entity,
				'edit_form'   => $editForm->createView(),
				'delete_form' => $deleteForm->createView(),
		);
	}

	/**
	 * Deletes a LDAPUser entity.
	 *
	 * @Route("/{id}/delete", name="ldapuser_delete")
	 * @Method("GET")
	 */
	public function deleteAction(Request $request, $id)
	{
		$form = $this->createDeleteForm($id);
		$form->bind($request);

		if ($form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$entity = $em->getRepository('ApplicationLDAPBundle:LDAPUser')->find($id);

			if (!$entity) {
				throw $this->createNotFoundException('Unable to find LDAPUser entity.');
			}

			$em->remove($entity);
			$em->flush();
		}

		return $this->redirect($this->generateUrl('ldapuser'));
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
     * @Route("/enable", name="ldapuser_enable")
     * @Method("POST")
     */
    public function enableAction(Request $request)
    {
       // $req = explode('~',$_POST);
       // var_dump($_POST);

        $em = $this->getDoctrine()->getManager();
        $selected = array();
        $selected = $_POST['selected'];
        $option = $_POST['flag'];

        //var_dump($selected);
        foreach($selected as $row){
           // echo $row;
            $entity = $em->getRepository('ApplicationLDAPBundle:LDAPUser')->find($row);
            //var_dump($entity);
            if($option == 1){
                $entity->setEnabled(1);
                $flag = 1;
            }if($option == 2){
                $entity->setEnabled(0);
                $flag = 1;
            }if($option == 3){
                $entity->setMailAccount(1);
                $flag = 1;
            }if($option == 4){
                $entity->setMailAccount(0);
                $flag = 1;
            }if($option == 5){
                $res = $this->changePasswordParameters($entity->getUsername());
                if($res == 'true'){
                    $today = time(); // or your date as well
                    $your_date = strtotime("1970-01-01");
                    $datediff = $today - $your_date;
                    $dateshadow = floor($datediff/(60*60*24));
                    $shadowLastChange = $dateshadow;
                    $entity->setShadowLastChange($shadowLastChange);
                    $flag = 1;
                }else{
                    $flag = 0;
                    echo 'Error!! ... Try again Later.';
                }
            }if($option == 6){
            	$res = $this->removeFromGroups($entity->getUsername());
            	$flag = 1;
            }
            if($option == 7){
            	$res = $this->removeFromAlias($entity->getUsername());

            	$flag = 1;
            }
            if($flag == 1){
                $entity->setUpdatedAt(new \DateTime());
                $em->persist($entity);
                $em->flush();
                echo 'Successfully Updated!!';
            }
        }
        exit();


    }
    public function removeFromGroups($username)
    {
    	//echo $username;
    	$em = $this->getDoctrine()->getManager();
    	$entity_user = $em->getRepository('ApplicationLDAPBundle:LDAPUser')->findOneBy(array('username'=>$username));
        $entity = $em->getRepository('ApplicationLDAPBundle:LDAPUserGroup')->findBy(array('ldapUser'=>$entity_user));

        foreach ($entity as $row) {

        	//Remove user from Ldap
        $grpname = $row->getldapGroup()->getName();
        $option = '-x';
        $fileLocator = new FileLocator ( __DIR__ . '/../../LDAPBundle/Resources/script' );
        $script = $fileLocator->locate ( 'ldap-group-adduser.sh' );
        $cmd = $script." \"$username\" \"$grpname\" \"$option\"";
        $result = exec($cmd);
       	//echo $row->getId()."\n"; 
       	//echo "\n";
     		//if($result){
       			$em->remove($row);
		    	$em->flush();
       		//}
        }
        return true;
    	//die();
    }
     public function removeFromAlias($username)
    {
    	//echo $username;
    	$em = $this->getDoctrine()->getManager();
    	$entity_user = $em->getRepository('ApplicationLDAPBundle:LDAPUser')->findOneBy(array('username'=>$username));
        $entity = $em->getRepository('ApplicationLDAPBundle:LDAPMailAliasUser')->findBy(array('ldapUser'=>$entity_user));

        foreach ($entity as $row) {

        	//Remove user from Ldap
        $grpname = $row->getldapMailAlias()->getName();
        $alias_name = explode('@', $grpname);
       // $alias_name[0] = ucwords(str_replace('_', ' ',$alias_name[0]));
        //echo $alias_name['0'];
        $ldapMailAliasService = $this->get('application_ldap_mailalias_service');
       // var_dump($ldapMailAliasService);
        $ldapMailAliasService->initialize();
        $result = $ldapMailAliasService->removeMailAliasUser($alias_name[0],$username);
       	//echo "\n";
       	if($result){
       		$em->remove($row);
		    $em->flush();
       	}
     	
        }
        
        return true;
    //	die();
    }
    
    /**
     * Creates a new LDAPUser entity.
     *
     * @Route("/download_signature/{type}/{id}", name="ldapuser_download_signature")
     */
    public function Download_signature($type,$id){
        $host = $_SERVER['HTTP_HOST'];
        $sigUrl = 'http://'.$host.'/app_dev.php/admin/ldapuser/signature/'.$id;
        $content = file_get_contents($sigUrl);

        $file = 'alchemyworx_signature.htm';



        $response = new Response();
        $response->headers->set('Content-type', 'application/octet-stream');
        $response->headers->set('Content-Disposition', sprintf('attachment; filename="%s"', $file));
        $response->setContent($content);
        //$response->send();
        return $response;


    }
    public function getLdapserverUser($username)
    {
        $ldapserver = $this->get('application_ldap_service_server');
        if($ldapserver->connect()){
           // echo 'true';
    }
        $filter = "uid=$username";
        $attributes      = array('cn'
        , 'displayName'
        , 'ou'
        , 'physicalDeliveryOfficeName'
        , 'title'
        , 'telephoneNumber'
        , 'sn'
        , 'givenName'
        , 'homeDirectory'
        , 'mail'
        , 'mobile'
        , 'loginShell'
        , 'homePhone'
        , 'shadowlastchange'
        ,) ;
        $distinguishedName = $ldapserver->getUserdn();

        $results = $ldapserver->search($distinguishedName, $filter, $attributes);
        $data = array();
        foreach ($results as $key=>$val) {
            if(is_array($val)){
                foreach($val as $k=>$v){
                    if(!is_numeric($k)){
                        if(isset($v["count"]) && $v["count"] == 1){
                            $data[$key][$k] = $v[0];
                        }
                    }
                }
            }
        }
        return $data;
        //die();
    }
    public function changePasswordParameters($username){
        $ldapserver = $this->get('application_ldap_service_server');
        $result = false;
        $user = $this->getLdapserverUser($username);
        //var_dump($user);
        if(!empty($user)){
            $sambaPwdLastSet 	= strtotime("now");
            $sambaPwdMustChange     = strtotime("now + 45 days");
            $today = time(); // or your date as well
            $your_date = strtotime("1970-01-01");
            $datediff = $today - $your_date;
            $dateshadow = floor($datediff/(60*60*24));
            $shadowLastChange = $dateshadow;

            $attributes = array( 'mail' 		=> $user[0]['mail']
            , 'sambaPwdLastSet'		    => $sambaPwdLastSet
            , 'sambaPwdMustChange'  	=> $sambaPwdMustChange
            , 'shadowLastChange'        => $shadowLastChange
            );
            //var_dump($attributes);
            if(isset($user[0]['cn'])){
                $distinguishedName = "uid={$user[0]['cn']},{$ldapserver->getUserdn()}";
            }
           $ldapserver->bind("cn=admin,dc=alchemyworx,dc=local", "st0n3s2010", true);
            $result = ldap_modify($ldapserver->getConnection(), $distinguishedName, $attributes);

            $error  = ldap_error($ldapserver->getConnection());
            //echo $error;
        }
        //var_dump($result);
        //$result = 'false';
        return $result;
    }

}
