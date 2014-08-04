<?php

namespace AW\WorxShareBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use AW\WorxShareBundle\Entity\Comments;
use AW\WorxShareBundle\Form\CommentsType;

/**
 * Comments controller.
 *
 * @Route("/worxshare/comments")
 */
class CommentsController extends Controller
{
    /**
     * Lists all Comments entities.
     *
     * @Route("/{projectId}/load", name="worxshare_comments_load")
     * @Method("POST")
     * @Template()
     */
    public function indexAction(Request $request, $projectId)
    {
        $em = $this->getDoctrine()->getManager('worxshare');
		
        $entities = $em->getRepository('AWWorxShareBundle:Comments')->findBy(array('projectId' => $projectId, 'imageId' => $_POST["imageId"]), array('created' => 'DESC'));
		
        //comments array - no need to pass everything from entities
        $comments = array();
        foreach ($entities as $entity) {
        	$comment = array();
        	array_push($comment, $entity->getId());
        	array_push($comment, $entity->getCoordX());
        	array_push($comment, $entity->getCoordY());
        	array_push($comment, $entity->getText());
        	array_push($comment, $entity->getImageId());

        	array_push($comments, $comment);
        }
        
    	$html = $this->container->get('templating')->render('AWWorxShareBundle:Comments:index.html.twig', array('entities' => $entities));
    	$jsonResponse = new Response(json_encode(array('html' => $html, 'comments' => $comments,'success' => true)));
        $jsonResponse->headers->set('Content-Type', 'application/json');
    
    	return $jsonResponse;
    }

    /**
     * Creates a new Comments entity.
     *
     * @Route("/{projectId},{userId}/create", name="worxshare_comments_create")
     * @Method("POST")
     * @Template()
     */
    public function createAction(Request $request, $projectId, $userId)
    {
        $em = $this->getDoctrine()->getManager('worxshare');
    	
    	//foreach ($_POST["commsArray"] as $commArray) {
    	$comment = 	$_POST["comment"];
        
    	$entity  = new Comments();

    	$entity ->setProjectId($projectId)
		    	->setUserId($userId)
		    	->setCoordX($comment[1])
		    	->setCoordY($comment[2])
		    	->setText($comment[3])
		    	->setImageId($comment[4]);
    		
    	$em->persist($entity);
    	$em->flush();
    		
    	//}
    	$entities = $em->getRepository('AWWorxShareBundle:Comments')->findBy(array('projectId' => $projectId, 'imageId' => $comment[4]), array('created' => 'ASC'));
    	    	
    	$html = $this->container->get('templating')->render('AWWorxShareBundle:Comments:index.html.twig', array('entities' => $entities));
    	$jsonResponse = new Response(json_encode(array('html' => $html,'success' => true)));
        $jsonResponse->headers->set('Content-Type', 'application/json');
    
    	return $jsonResponse;
    }

    /**
     * Displays a form to create a new Comments entity.
     *
     * @Route("/new", name="worxshare_comments_new")
     * @Method("GET")
     * @Template()
     */
    public function newAction()
    {
        $entity = new Comments();
        $form   = $this->createForm(new CommentsType(), $entity);

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    /**
     * Finds and displays a Comments entity.
     *
     * @Route("/{id}", name="worxshare_comments_show")
     * @Method("GET")
     * @Template()
     */
    public function showAction($id)
    {
        $em = $this->getDoctrine()->getManager('worxshare');

        $entity = $em->getRepository('AWWorxShareBundle:Comments')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Comments entity.');
        }

        $deleteForm = $this->createDeleteForm($id);

        return array(
            'entity'      => $entity,
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Displays a form to edit an existing Comments entity.
     *
     * @Route("/{id}/edit", name="worxshare_comments_edit")
     * @Method("GET")
     * @Template()
     */
    public function editAction($id)
    {
        $em = $this->getDoctrine()->getManager('worxshare');

        $entity = $em->getRepository('AWWorxShareBundle:Comments')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Comments entity.');
        }

        $editForm = $this->createForm(new CommentsType(), $entity);
        $deleteForm = $this->createDeleteForm($id);

        return array(
            'entity'      => $entity,
            'edit_form'   => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Edits an existing Comments entity.
     *
     * @Route("/{id}", name="worxshare_comments_update")
     * @Method("PUT")
     * @Template("AWWorxShareBundle:Comments:edit.html.twig")
     */
    public function updateAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager('worxshare');

        $entity = $em->getRepository('AWWorxShareBundle:Comments')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Comments entity.');
        }

        $deleteForm = $this->createDeleteForm($id);
        $editForm = $this->createForm(new CommentsType(), $entity);
        $editForm->bind($request);

        if ($editForm->isValid()) {
            $em->persist($entity);
            $em->flush();

            return $this->redirect($this->generateUrl('worxshare_comments_edit', array('id' => $id)));
        }

        return array(
            'entity'      => $entity,
            'edit_form'   => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Deletes a Comments entity.
     *
     * @Route("/{id}", name="worxshare_comments_delete")
     * @Method("DELETE")
     */
    public function deleteAction(Request $request, $id)
    {
        $form = $this->createDeleteForm($id);
        $form->bind($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager('worxshare');
            $entity = $em->getRepository('AWWorxShareBundle:Comments')->find($id);

            if (!$entity) {
                throw $this->createNotFoundException('Unable to find Comments entity.');
            }

            $em->remove($entity);
            $em->flush();
        }

        return $this->redirect($this->generateUrl('worxshare_comments'));
    }

    /**
     * Creates a form to delete a Comments entity by id.
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
