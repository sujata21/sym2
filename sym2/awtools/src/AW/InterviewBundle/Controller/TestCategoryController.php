<?php

namespace AW\InterviewBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use AW\InterviewBundle\Entity\TestCategory;
use AW\InterviewBundle\Form\TestCategoryType;

/**
 * TestCategory controller.
 *
 * @Route("/category")
 */
class TestCategoryController extends Controller
{
    /**
     * Lists all TestCategory entities.
     *
     * @Route("/", name="category")
     * @Method("GET")
     * @Template()
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager('interview');

        $entities = $em->getRepository('AWInterviewBundle:TestCategory')->findAll();

        return array(
            'entities' => $entities,
        );
    }

    /**
     * Creates a new TestCategory entity.
     *
     * @Route("/", name="category_create")
     * @Method("POST")
     * @Template("AWInterviewBundle:TestCategory:new.html.twig")
     */
    public function createAction(Request $request)
    {
        $entity  = new TestCategory();
        $form = $this->createForm(new TestCategoryType(), $entity);
        $form->bind($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager('interview');
            $em->persist($entity);
            $em->flush();

            return $this->redirect($this->generateUrl('category'));
        }

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    /**
     * Displays a form to create a new TestCategory entity.
     *
     * @Route("/new", name="category_new")
     * @Method("GET")
     * @Template()
     */
    public function newAction()
    {
        $entity = new TestCategory();

        $form   = $this->createForm(new TestCategoryType(), $entity);

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    /**
     * Finds and displays a TestCategory entity.
     *
     * @Route("/{id}", name="category_show")
     * @Method("GET")
     * @Template()
     */
    public function showAction($id)
    {
        $em = $this->getDoctrine()->getManager('interview');

        $entity = $em->getRepository('AWInterviewBundle:TestCategory')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find TestCategory entity.');
        }

        $deleteForm = $this->createDeleteForm($id);

        return array(
            'entity'      => $entity,
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Displays a form to edit an existing TestCategory entity.
     *
     * @Route("/{id}/edit", name="category_edit")
     * @Method("GET")
     * @Template()
     */
    public function editAction($id)
    {
        $em = $this->getDoctrine()->getManager('interview');

        $entity = $em->getRepository('AWInterviewBundle:TestCategory')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find TestCategory entity.');
        }

        $editForm = $this->createForm(new TestCategoryType(), $entity);
        $deleteForm = $this->createDeleteForm($id);

        return array(
            'entity'      => $entity,
            'edit_form'   => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Edits an existing TestCategory entity.
     *
     * @Route("/{id}", name="category_update")
     * @Method("PUT")
     * @Template("AWInterviewBundle:TestCategory:edit.html.twig")
     */
    public function updateAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager('interview');

        $entity = $em->getRepository('AWInterviewBundle:TestCategory')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find TestCategory entity.');
        }

        $deleteForm = $this->createDeleteForm($id);
        $editForm = $this->createForm(new TestCategoryType(), $entity);
        $editForm->bind($request);

        if ($editForm->isValid()) {
            $em->persist($entity);
            $em->flush();

            return $this->redirect($this->generateUrl('category'));
        }

        return array(
            'entity'      => $entity,
            'edit_form'   => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Deletes a TestCategory entity.
     *
     * @Route("/delete/{id}", name="category_delete")

     */
    public function deleteAction(Request $request, $id)
    {


            $em = $this->getDoctrine()->getManager('interview');
            $entity = $em->getRepository('AWInterviewBundle:TestCategory')->find($id);

            if (!$entity) {
                throw $this->createNotFoundException('Unable to find TestCategory entity.');
            }
           // echo '<pre>';
            $em->remove($entity);
            $em->flush();
            $job_title = $em->getRepository('AWInterviewBundle:JobTitle')->findAll();
            //var_dump($job_title);
            foreach($job_title as $job){

                $cat = explode(',',$job->getCategory());
                if (in_array($id, $cat)) {
                  //  echo $job->getId().'delete job';
                    $em->remove($job);
                    $em->flush();
                    $interview = $em->getRepository('AWInterviewBundle:Interview')->findBy(array('jobId' => $job->getId() ));
                    $em->remove($interview);
                    $em->flush();
                }

            }
       // echo '</pre>';
       // die();



        return $this->redirect($this->generateUrl('category'));
    }

    /**
     * Creates a form to delete a TestCategory entity by id.
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
