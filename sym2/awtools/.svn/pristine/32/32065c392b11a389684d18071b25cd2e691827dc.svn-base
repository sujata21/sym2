<?php

namespace AW\WorxShareBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use AW\WorxShareBundle\Entity\ProjectsImages;
use AW\WorxShareBundle\Form\ProjectsImagesType;

/**
 * ProjectsImages controller.
 *
 * @Route("/worxshare/projectsimages")
 */
class ProjectsImagesController extends Controller
{
    /**
     * Lists all ProjectsImages entities.
     *
     * @Route("/", name="worxshare_projectsimages")
     * @Method("GET")
     * @Template()
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager('worxshare');

        $entities = $em->getRepository('AWWorxShareBundle:ProjectsImages')->findAll();

        return array(
            'entities' => $entities,
        );
    }

    /**
     * Creates a new ProjectsImages entity.
     *
     * @Route("/{project_id}/create", name="worxshare_projectsimages_create")
     * @Method("POST")
     * @Template("AWWorxShareBundle:ProjectsImages:new.html.twig")
     */
    public function createAction(Request $request, $project_id)
    {
    	
    	$entity  = new ProjectsImages();
        $form = $this->createForm(new ProjectsImagesType(), $entity);
        $form->bind($request);

        if ($form->isValid()) {
            
        	$file = $_FILES['image']['tmp_name'];
        	 
        	if ($file) {

        		$em = $this->getDoctrine()->getManager('worxshare');
        		
        		$entityProject = $em->getRepository('AWWorxShareBundle:Projects')->find($project_id);
        		
        		//upload dir
        		$dir = __DIR__.'/../../../../web/uploads/awworxshare/';
        		 
        		if ($_FILES["image"]["error"] == UPLOAD_ERR_OK) {
        			$tmp_name = $_FILES["image"]["tmp_name"];
        			$name = $_FILES["image"]["name"];
        			//add datetime stamp to image filename to make it unique
        			$unique_name = date("YmdHis").rand(0, 99).'_'.str_replace(" ", "_", $_FILES["image"]["name"]);
        			move_uploaded_file($tmp_name, $dir.$entityProject->getFolder().'/'.$name);
        			//set full permission to uploaded image file
        			chmod($dir.$entityProject->getFolder().'/'.$name, 0755);
        			//rename image file to make it unique
        			rename($dir.$entityProject->getFolder().'/'.$name, $dir.$entityProject->getFolder().'/'.$unique_name);
        		}
        	}
        	$entity->setUniqueName($unique_name);
        	$entity->setProjectId($project_id);
        	$em->persist($entity);
            $em->flush();

            //return $this->redirect($this->generateUrl('worxshare_projectsimages_show', array('id' => $entity->getId())));
            //$html = $this->container->get('templating')->render('AWWorxShareBundle:Projects:index.html.twig', array('entities' => $entities));
            $jsonResponse = new Response(json_encode(array('success' => true)));
            $jsonResponse->headers->set('Content-Type', 'application/json');
             
            return $jsonResponse;
        }

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    /**
     * Displays a form to create a new ProjectsImages entity.
     *
     * @Route("/new/{project_id}", name="worxshare_projectsimages_new")
     * @Method("GET")
     * @Template()
     */
    public function newAction(Request $request, $project_id)
    {
    	$em = $this->getDoctrine()->getManager('worxshare');
    	
    	$folder = $em->getRepository('AWWorxShareBundle:Projects')->find($project_id); 
    	$entities = $em->getRepository('AWWorxShareBundle:ProjectsImages')->findBy(array('projectId' => $project_id));
    	
    	$entity = new ProjectsImages();
        $form   = $this->createForm(new ProjectsImagesType(), $entity);

        return array(
            'entity' => $entity,
            'folder' => $folder,
            'entities' => $entities,
            'project_id' => $project_id,
            'form'   => $form->createView(),
        );
    }

    /**
     * Finds and displays a ProjectsImages entity.
     *
     * @Route("/{id}", name="worxshare_projectsimages_show")
     * @Method("GET")
     * @Template()
     */
    public function showAction($id)
    {
        $em = $this->getDoctrine()->getManager('worxshare');

        $entity = $em->getRepository('AWWorxShareBundle:ProjectsImages')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find ProjectsImages entity.');
        }

        $deleteForm = $this->createDeleteForm($id);

        return array(
            'entity'      => $entity,
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Displays a form to edit an existing ProjectsImages entity.
     *
     * @Route("/{id}/edit", name="worxshare_projectsimages_edit")
     * @Method("GET")
     * @Template()
     */
    public function editAction($id)
    {
        $em = $this->getDoctrine()->getManager('worxshare');

        $entity = $em->getRepository('AWWorxShareBundle:ProjectsImages')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find ProjectsImages entity.');
        }

        $editForm = $this->createForm(new ProjectsImagesType(), $entity);
        $deleteForm = $this->createDeleteForm($id);

        return array(
            'entity'      => $entity,
            'edit_form'   => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Edits an existing ProjectsImages entity.
     *
     * @Route("/{id}", name="worxshare_projectsimages_update")
     * @Method("PUT")
     * @Template("AWWorxShareBundle:ProjectsImages:edit.html.twig")
     */
    public function updateAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager('worxshare');

        $entity = $em->getRepository('AWWorxShareBundle:ProjectsImages')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find ProjectsImages entity.');
        }

        $deleteForm = $this->createDeleteForm($id);
        $editForm = $this->createForm(new ProjectsImagesType(), $entity);
        $editForm->bind($request);

        if ($editForm->isValid()) {
            $em->persist($entity);
            $em->flush();

            return $this->redirect($this->generateUrl('worxshare_projectsimages_edit', array('id' => $id)));
        }

        return array(
            'entity'      => $entity,
            'edit_form'   => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Deletes a ProjectsImages entity.
     *
     * @Route("/{id}/delete", name="worxshare_projectsimages_delete")
     * 
     */
    public function deleteAction(Request $request, $id)
    {
        //$form = $this->createDeleteForm($id);
       // $form->bind($request);

        //if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager('worxshare');
            $entity = $em->getRepository('AWWorxShareBundle:ProjectsImages')->find($id);

            if (!$entity) {
                throw $this->createNotFoundException('Unable to find ProjectsImages entity.');
            }

            $em->remove($entity);
            $em->flush();
        //}

        //return $this->redirect($this->generateUrl('worxshare_projectsimages'));
        $jsonResponse = new Response(json_encode( array('success' => true) ));
        $jsonResponse->headers->set('Content-Type', 'application/json');
        
        return $jsonResponse;
    }

    /**
     * Creates a form to delete a ProjectsImages entity by id.
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
