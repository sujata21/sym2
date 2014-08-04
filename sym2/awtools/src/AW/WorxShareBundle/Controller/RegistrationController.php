<?php

namespace AW\WorxShareBundle\Controller;

use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use FOS\UserBundle\FOSUserEvents;
use FOS\UserBundle\Event\UserEvent;
use FOS\UserBundle\Event\FormEvent;
use FOS\UserBundle\Event\FilterUserResponseEvent;
use FOS\UserBundle\Controller\RegistrationController as BaseController;

class RegistrationController extends BaseController
{
	public function registerAction(Request $request)
	{
		/** @var $formFactory \FOS\UserBundle\Form\Factory\FactoryInterface */
        $formFactory = $this->container->get('fos_user.registration.form.factory');
        /** @var $userManager \FOS\UserBundle\Model\UserManagerInterface */
        $userManager = $this->container->get('fos_user.user_manager');
        /** @var $dispatcher \Symfony\Component\EventDispatcher\EventDispatcherInterface */
        $dispatcher = $this->container->get('event_dispatcher');
    
        $user = $userManager->createUser();
        $user->setEnabled(true);
    
        $dispatcher->dispatch(FOSUserEvents::REGISTRATION_INITIALIZE, new UserEvent($user, $request));
    
        $form = $formFactory->createForm();
        $form->setData($user);
    
        if ('POST' === $request->getMethod()) {
            $form->bind($request);
    
            if ($form->isValid()) {
                $event = new FormEvent($form, $request);
                $dispatcher->dispatch(FOSUserEvents::REGISTRATION_SUCCESS, $event);
    			
                $user->addRole($form->get('role')->getData());
                $userManager->updateUser($user);
                
                /* if (null === $response = $event->getResponse()) {
                    //$url = $this->container->get('router')->generate('fos_user_registration_confirmed');
                    //$response = new RedirectResponse($url);
                    
                    $html = $this->container->get('router')->generate('fos_user_registration_confirmed');
                } */
    			
                //login user after registration
                //$dispatcher->dispatch(FOSUserEvents::REGISTRATION_COMPLETED, new FilterUserResponseEvent($user, $request, $response));
            
				//$jsonResponse = new Response(json_encode( array('html' => $html, 'success' => true) ));
                $jsonResponse = new Response(json_encode( array('success' => true) ));
                $jsonResponse->headers->set('Content-Type', 'application/json');
                
                return $jsonResponse;
            
            }
        }
    	
        /* return $this->container->get('templating')->renderResponse('FOSUserBundle:Registration:register.html.'.$this->getEngine(), array(
                'form' => $form->createView(), 'success' => false
        )); */
        
        $html = $this->container->get('templating')->render('FOSUserBundle:Registration:register.html.'.$this->getEngine(), array(
		                'form' => $form->createView()
		        ));
        $jsonResponse = new Response(json_encode( array('html' => $html, 'success' => false) ));
        $jsonResponse->headers->set('Content-Type', 'application/json');
        
        return $jsonResponse;
	}
}