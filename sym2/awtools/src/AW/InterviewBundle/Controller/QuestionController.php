<?php

namespace AW\InterviewBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use AW\InterviewBundle\Entity\Question;
use AW\InterviewBundle\Entity\Options;
use AW\InterviewBundle\Form\QuestionType;
use AW\InterviewBundle\Entity\TestCategory;

/**
 * Question controller.
 *
 * @Route("/question")
 */
class QuestionController extends Controller
{
    /**
     * Lists all Question entities.
     *
     * @Route("/list/{catid}", name="question")
     * @Method("GET")
     * @Template()
     */
    public function indexAction($catid)
    {
        $em = $this->getDoctrine()->getManager('interview');

        $cat_search = $em->getRepository('AWInterviewBundle:TestCategory')->findAll();
        //var_dump($categories);
       /* for($i=0;$i<count($cat_search);$i++){
            $cat_search[$i] = $cat_search[$i]->getName();
        }*/

        if($catid == 'all'){

            $entities = $em->getRepository('AWInterviewBundle:Question')->findAll();
            $categories = $em->getRepository('AWInterviewBundle:TestCategory')->findAll();
            //var_dump($categories);
            for($i=0;$i<count($categories);$i++){
                $cat[$categories[$i]->getId()] = $categories[$i]->getName();
            }
        }else{
            $entities = $em->getRepository('AWInterviewBundle:Question')->findBy(array('category' => $catid ));
            $categories = $em->getRepository('AWInterviewBundle:TestCategory')->findBy(array('id' => $catid ));
           // var_dump($categories);
            $cat[$categories[0]->getId()] = $categories[0]->getName();


        }

        return array(
            'entities' => $entities,
            'cat' => $cat,
            'catsearch' => $cat_search,
        );
    }

    /**
     * Creates a new Question entity.
     *
     * @Route("/", name="question_create")
     * @Method("POST")
     * @Template("AWInterviewBundle:Question:new.html.twig")
     */
    public function createAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager('interview');
        $entity  = new Question();
        $form = $this->createForm(new QuestionType($em), $entity);
        $form->bind($request);

        if ($form->isValid()) {
            $em->persist($entity);
            $em->flush();

            return $this->redirect($this->generateUrl('question_answer', array('id' => $entity->getId())));
        }

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    /**
     * Displays a form to create a new Question entity.
     *
     * @Route("/new", name="question_new")
     * @Method("GET")
     * @Template()
     */
    public function newAction()
    {
        $entity = new Question();
        $em = $this->getDoctrine()->getManager('interview');
        $form   = $this->createForm(new QuestionType($em), $entity);

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }
    /**
     * Finds and displays a Question entity.
     *
     * @Route("/answer/{id}", name="question_answer")
     * @Method("GET")
     * @Template()
     */
    public function answerAction($id)
    {
        $em = $this->getDoctrine()->getManager('interview');

        $entity = $em->getRepository('AWInterviewBundle:Question')->find($id);
       // var_dump($entity);
        return array(
            'entity'      => $entity,

        );


    }
    /**
     * @Route("/save", name="question_save")
     * @Template()
     */
    public function saveAction()
    {

        //var_dump($_POST);
        $em = $this->getDoctrine()->getManager('interview');
        //update question in information
        $entity = $em->getRepository('AWInterviewBundle:Question')->find($_POST['question_id']);
        //var_dump($entity);
        $entity->setAnswer($_POST['correct_ans']);
        $entity->setOptionCnt($_POST['optioncnt']);
        $em->persist($entity);
        $em->flush();

        //add options

        for($i=1;$i<=$_POST['optioncnt'];$i++){
            $answer = new Options();
            $answer->setOpAnswer($_POST['option'.$i]);
            $answer->setQuestionId($_POST['question_id']);
            $em->persist($answer);
            $em->flush();
        }

        echo 'Question Created';
        exit();

    }
    /**
     * Finds and displays a Question entity.
     *
     * @Route("/{id}", name="question_show")
     * @Method("GET")
     * @Template()
     */
    public function showAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('AWInterviewBundle:Question')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Question entity.');
        }

        $deleteForm = $this->createDeleteForm($id);

        return array(
            'entity'      => $entity,
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Displays a form to edit an existing Question entity.
     *
     * @Route("/{id}/edit", name="question_edit")
     * @Method("GET")
     * @Template()
     */
    public function editAction($id)
    {
        $em = $this->getDoctrine()->getManager('interview');


        $entity = $em->getRepository('AWInterviewBundle:Question')->find($id);
       // var_dump($entity);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Question entity.');
        }

        $editForm = $this->createForm(new QuestionType($em), $entity);
        $deleteForm = $this->createDeleteForm($id);

        return array(
            'entity'      => $entity,
            'edit_form'   => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Edits an existing Question entity.
     *
     * @Route("/{id}/update", name="question_update")
     * @Method("PUT")
     * @Template("AWInterviewBundle:Question:edit.html.twig")
     */
    public function updateAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager('interview');

        $entity = $em->getRepository('AWInterviewBundle:Question')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Question entity.');
        }

        $deleteForm = $this->createDeleteForm($id);
        $editForm = $this->createForm(new QuestionType($em), $entity);
        $editForm->bind($request);

        if ($editForm->isValid()) {
            $em->persist($entity);
            $em->flush();

            return $this->redirect($this->generateUrl('question', array('catid' => 'all')));
        }

        return array(
            'entity'      => $entity,
            'edit_form'   => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Deletes a Question entity.
     *
     * @Route("/delete/{id}/{catid}", name="question_delete")
     */
    public function deleteAction(Request $request, $id,$catid)
    {

            $em = $this->getDoctrine()->getManager('interview');
            $entity = $em->getRepository('AWInterviewBundle:Question')->find($id);

            if (!$entity) {
                throw $this->createNotFoundException('Unable to find Question entity.');
            }

            $em->remove($entity);
            $em->flush();


        return $this->redirect($this->generateUrl('question', array('catid' => $catid)));
    }

    /**
     * Creates a form to delete a Question entity by id.
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
