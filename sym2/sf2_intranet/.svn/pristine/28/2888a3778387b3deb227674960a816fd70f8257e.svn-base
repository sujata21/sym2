<?php

namespace Application\MainBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

class DefaultController extends Controller
{
    /**
     * @Route("/", name="_homepage")
     * @Template()
     */
    public function indexAction()
    {
   		return array();     
    }
    
    /**
     * @Route("/test_login", name="test_login")
     * @Template()
     */
    public function loginAction()
    {
    	$session = $this->getRequest()->getSession();
    	$session->set('referer', $this->getRequest()->getRequestUri());
    	
    	$csrfToken = $this->container->has('form.csrf_provider')
    	? $this->container->get('form.csrf_provider')->generateCsrfToken('authenticate')
    	: null;
    	
    	return array('csrf_token' => $csrfToken);
    }
    
}