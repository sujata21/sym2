<?php

namespace AW\ProfanityBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use AW\ProfanityBundle\Service\MailChecker;
use AW\ProfanityBundle\Entity\Email;
use AW\ProfanityBundle\Form\EmailType;


/**
 * Email controller.
 *
 * @Route("/email")
 */
class EmailController extends Controller
{
    /**
     * Lists all Email entities.
     *
     * @Route("/", name="email")
     * @Method("GET")
     * @Template()
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager('profanity');

        $entities = $em->getRepository('AWProfanityBundle:Email')->findAll();

        return array(
            'entities' => $entities,
        );
    }

    /**
     * Creates a new Email entity.
     *
     * @Route("/", name="email_create")
     * @Method("POST")
     * @Template("AWProfanityBundle:Email:new.html.twig")
     */
    public function createAction(Request $request)
    {
        $entity  = new Email();
        $form = $this->createForm(new EmailType(), $entity);
        $form->bind($request);

    //    var_dump($entity);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager('profanity');
            $entity->setSource('alchemyworxtest@gmail.com');
            $em->persist($entity);
            $em->flush();

            return $this->redirect($this->generateUrl('email_show', array('subject' => $entity->getName())));
        }

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    /**
     * Displays a form to create a new Email entity.
     *
     * @Route("/new", name="email_new")
     * @Method("GET")
     * @Template()
     */
    public function newAction()
    {
        $entity = new Email();
        $form   = $this->createForm(new EmailType(), $entity);
        
        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }


    /**
     * Finds and displays a Email entity.
     *
     * @Route("/{subject}", name="email_show")
     * @Method("GET")
     * @Template()
     */
    public function showAction($subject)
    {
        
        /* try to connect */
        $hostname = '{imap.googlemail.com:993/imap/ssl/novalidate-cert}INBOX';
            //$username = 'tiwari.sujata@gmail.com';
            $username = 'alchemyworxtest@gmail.com';
            $password='Welcome098765';
            /* try to connect */
            $mails = $this->get("aw_profanity.mail.checker")->receive($username, $password, $hostname,$subject);
            $result = explode('~', $mails);
            //var_dump($result);
            //echo $result[2];
            //$text = strip_tags($result[2], "");
        //$text = preg_replace('/[^a-zA-Z0-9]+/', ' ', $text);
        
        return array(
            'subject' => $subject,
            'poutput' => $result[0],
            'soutput' => $result[1],
            'spoutput' => $result[2],
        );
    }

    /**
     * Displays a form to edit an existing Email entity.
     *
     * @Route("/{id}/edit", name="email_edit")
     * @Method("GET")
     * @Template()
     */
    public function editAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('AWProfanityBundle:Email')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Email entity.');
        }

        $editForm = $this->createForm(new EmailType(), $entity);
        $deleteForm = $this->createDeleteForm($id);

        return array(
            'entity'      => $entity,
            'edit_form'   => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Edits an existing Email entity.
     *
     * @Route("/{id}", name="email_update")
     * @Method("PUT")
     * @Template("AWProfanityBundle:Email:edit.html.twig")
     */
    public function updateAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('AWProfanityBundle:Email')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Email entity.');
        }

        $deleteForm = $this->createDeleteForm($id);
        $editForm = $this->createForm(new EmailType(), $entity);
        $editForm->bind($request);

        if ($editForm->isValid()) {
            $em->persist($entity);
            $em->flush();

            return $this->redirect($this->generateUrl('email_edit', array('id' => $id)));
        }

        return array(
            'entity'      => $entity,
            'edit_form'   => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Deletes a Email entity.
     *
     * @Route("/{id}", name="email_delete")
     * @Method("DELETE")
     */
    public function deleteAction(Request $request, $id)
    {
        $form = $this->createDeleteForm($id);
        $form->bind($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $entity = $em->getRepository('AWProfanityBundle:Email')->find($id);

            if (!$entity) {
                throw $this->createNotFoundException('Unable to find Email entity.');
            }

            $em->remove($entity);
            $em->flush();
        }

        return $this->redirect($this->generateUrl('email'));
    }

    /**
     * Creates a form to delete a Email entity by id.
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
