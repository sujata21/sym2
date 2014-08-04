<?php

namespace AW\WorxShareBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use AW\WorxShareBundle\Entity\User;
use AW\WorxShareBundle\Form\UserType;
use AW\WorxShareBundle\Entity\UsersClients;

/**
 * User controller.
 *
 * @Route("/worxshare/user")
 */
class UserController extends Controller
{
    /**
     * Lists all User entities.
     *
     * @Route("/", name="worxshare_user")
     * @Method("GET")
     * @Template()
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager('worxshare');

        $entities = $em->getRepository('AWWorxShareBundle:User')->findBy(array(), array('name' => 'ASC'));

        /* return array(
            'entities' => $entities,
        ); */
        
        $html = $this->container->get('templating')->render('AWWorxShareBundle:User:index.html.twig', array('entities' => $entities));
        $jsonResponse = new Response(json_encode(array('html' => $html, 'success' => true)));
        $jsonResponse->headers->set('Content-Type', 'application/json'); 
        
        return $jsonResponse;
    }

    /**
     * Creates a new User entity.
     *
     * @Route("/", name="worxshare_user_create")
     * @Method("POST")
     * @Template("AWWorxShareBundle:User:new.html.twig")
     */
    public function createAction(Request $request)
    {
        $entity  = new User();
        $form = $this->createForm(new UserType(), $entity);
        $form->bind($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager('worxshare');
            $em->persist($entity);
            $em->flush();

            return $this->redirect($this->generateUrl('worxshare_user_show', array('id' => $entity->getId())));
        }

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    /**
     * Displays a form to create a new User entity.
     *
     * @Route("/new", name="worxshare_user_new")
     * @Method("GET")
     * @Template()
     */
    public function newAction()
    {
        $entity = new User();
        $form   = $this->createForm(new UserType(), $entity);

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    /**
     * Finds and displays a User entity.
     *
     * @Route("/{id}", name="worxshare_user_show")
     * @Method("GET")
     * @Template()
     */
    public function showAction($id)
    {
        $em = $this->getDoctrine()->getManager('worxshare');

        $entity = $em->getRepository('AWWorxShareBundle:User')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find User entity.');
        }

        $deleteForm = $this->createDeleteForm($id);

        return array(
            'entity'      => $entity,
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Displays a form to edit an existing User entity.
     *
     * @Route("/{id}/edit", name="worxshare_user_edit")
     * @Method("GET")
     * @Template()
     */
    public function editAction($id)
    {
        $em = $this->getDoctrine()->getManager('worxshare');

        $entity = $em->getRepository('AWWorxShareBundle:User')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find User entity.');
        }
		
        $id = $entity->getId();
        
        $editForm = $this->createForm(new UserType(), $entity);
        //$deleteForm = $this->createDeleteForm($id);

        return array(
            'entity'      => $entity,
            'edit_form'   => $editForm->createView(),
            //'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Edits an existing User entity.
     *
     * @Route("/{id}/update", name="worxshare_user_update")
     * @Method("PUT")
     * @Template("AWWorxShareBundle:User:edit.html.twig")
     */
    public function updateAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager('worxshare');

        /* $entity = $em->getRepository('AWWorxShareBundle:User')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find User entity.');
        } */

        /* $editForm = $this->createForm(new UserType(), $entity);
        $editForm->bind($request);

        if ($editForm->isValid()) { */
            
        	$loggedUser = $this->container->get('security.context')->getToken()->getUser();
        
	        $userManager = $this->container->get('fos_user.user_manager');
	        $user = $userManager->findUserBy(array('id' => $id));
        	$role = $user->getRoles();
	        
        	if ($id != $loggedUser->getId()) {
        		$user->removeRole($role[0]);
        		$user->addRole($request->request->get('aw_worxsharebundle_usertype[role]', null, true));
        	}
        	
        	$user->setEmail($request->request->get('aw_worxsharebundle_usertype[email]', null, true));
        	$user->setName($request->request->get('aw_worxsharebundle_usertype[name]', null, true));
        	$userManager->updateUser($user);
        	
        	$userName = $loggedUser->getName();
        	
        	/* $em->persist($entity);
            $em->flush(); */
			
            $entities = $em->getRepository('AWWorxShareBundle:User')->findBy(array(), array('name' => 'ASC'));
            
            $html = $this->container->get('templating')->render('AWWorxShareBundle:User:index.html.twig', array('entities' => $entities));
	        $jsonResponse = new Response(json_encode(array('html' => $html, 'userName' => $userName, 'success' => true)));
	        $jsonResponse->headers->set('Content-Type', 'application/json'); 
	        
	        return $jsonResponse;
        /* }

        return array(
            'entity'      => $entity,
            'edit_form'   => $editForm->createView()
        ); */
    }

    /**
     * Lock an existing User entity.
     *
     * @Route("/{id}/lock", name="worxshare_user_lock")
     * @Method("POST")
     * @Template()
     */
    public function lockAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager('worxshare');
		
        $user = $this->container->get('security.context')->getToken()->getUser();
        
        $entity = $em->getRepository('AWWorxShareBundle:User')->find($id);

        if (!$entity) {
            //throw $this->createNotFoundException('Unable to find User entity.');
        	$jsonResponse = new Response(json_encode( array('success' => false) ));
        	$jsonResponse->headers->set('Content-Type', 'application/json');
        	
        	return $jsonResponse;
        }
        
        if ($entity->getId() == $user->getId()) {
        	$jsonResponse = new Response(json_encode( array('success' => false, 'errorMsg' => 'loggedin') ));
        	$jsonResponse->headers->set('Content-Type', 'application/json');
        	 
        	return $jsonResponse;
        }
		
        $entity->setLocked(true);
        
        $em->persist($entity);
        $em->flush();

        $jsonResponse = new Response(json_encode( array('success' => true) ));
        $jsonResponse->headers->set('Content-Type', 'application/json');
        
        return $jsonResponse;
    }

    /**
     * Unlock an existing User entity.
     *
     * @Route("/{id}/unlock", name="worxshare_user_unlock")
     * @Method("POST")
     * @Template()
     */
    public function unlockAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager('worxshare');

        $entity = $em->getRepository('AWWorxShareBundle:User')->find($id);

        if (!$entity) {
            //throw $this->createNotFoundException('Unable to find User entity.');
        	$jsonResponse = new Response(json_encode( array('success' => false) ));
        	$jsonResponse->headers->set('Content-Type', 'application/json');
        	
        	return $jsonResponse;
        }
		
        $entity->setLocked(false);
        
        $em->persist($entity);
        $em->flush();

        $jsonResponse = new Response(json_encode( array('success' => true) ));
        $jsonResponse->headers->set('Content-Type', 'application/json');
        
        return $jsonResponse;
    }

    /**
     * Deletes a User entity.
     *
     * @Route("/{id}/delete", name="worxshare_user_delete")
     * @Method("POST")
     */
    public function deleteAction(Request $request, $id)
    {
		$em = $this->getDoctrine()->getManager('worxshare');
		
		$entity = $em->getRepository('AWWorxShareBundle:User')->find($id);
		
    	//check if loggedin user
    	$user = $this->container->get('security.context')->getToken()->getUser();
    	if ($entity->getId() == $user->getId()) {
    		$jsonResponse = new Response(json_encode( array('success' => false, 'errorMsg' => 'loggedin') ));
    		$jsonResponse->headers->set('Content-Type', 'application/json');
    		 
    		return $jsonResponse;
    	}
    	
    	//check if User has assigned Projects
    	$entityUsersProjects = $em->getRepository('AWWorxShareBundle:UsersProjects')->findBy(array('userId' => $id));
    	if ($entityUsersProjects) {
    		$jsonResponse = new Response(json_encode(array('errorMsg' => 'hasProjects','success' => false)));
    		$jsonResponse->headers->set('Content-Type', 'application/json');
    	
    		return $jsonResponse;
    	}
    	    	
    	//check if User is assigned to Clients
        $entityUsersClients = $em->getRepository('AWWorxShareBundle:UsersClients')->findBy(array('userId' => $id));
        if ($entityUsersClients) {
        	$jsonResponse = new Response(json_encode(array('errorMsg' => 'hasClients','success' => false)));
        	$jsonResponse->headers->set('Content-Type', 'application/json');
        
        	return $jsonResponse;
        }
        
        if (!$entityUsersClients && !$entityUsersProjects) {
        	
        	if (!$entity) {
        		//throw $this->createNotFoundException('Unable to find User entity.');
        		$jsonResponse = new Response(json_encode( array('success' => false) ));
        		$jsonResponse->headers->set('Content-Type', 'application/json');
        	
        		return $jsonResponse;
        	}
        	
        	//delete user->clients relations from UsersClients table
        	/* $qb = $em->createQueryBuilder()
        	 ->delete('AWWorxShareBundle:UsersClients', 'uc')
        	->where('uc.userId = :user_id')
        	//->andWhere('l.user_id = :user_id')
        	->setParameter('user_id', $id);
        	//->setParameter('user_id', $user->getId());
        	$result = $qb->getQuery()->getSingleScalarResult(); */
        	
        	//delete user->projects relations from UsersProjects table
        	/* $qb = $em->createQueryBuilder()
        	 ->delete('AWWorxShareBundle:UsersProjects', 'up')
        	->where('up.userId = :user_id')
        	//->andWhere('l.user_id = :user_id')
        	->setParameter('user_id', $id);
        	//->setParameter('user_id', $user->getId());
        	$result = $qb->getQuery()->getSingleScalarResult(); */
        	
        	//user delete
        	$em->remove($entity);
        	$em->flush();
        	
        	return self::indexAction();
        }
    }

    /**
     * Creates a form to delete a User entity by id.
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
