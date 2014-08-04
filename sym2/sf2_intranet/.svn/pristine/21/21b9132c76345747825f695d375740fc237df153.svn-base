<?php

namespace Application\UserBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use FOS\UserBundle\Controller\SecurityController;

use Symfony\Component\Security\Core\SecurityContext;

class DefaultController extends SecurityController {

	/**
     * @Route("/hello/{name}")
     * @Template()
     */
    public function indexAction($name)
    {
        return array('name' => $name);
    }
            
    
    protected function renderLogin(array $data)
    {
    	$template = sprintf('ApplicationUserBundle:Default:login.html.%s', $this->container->getParameter('fos_user.template.engine'));
    
    	return $this->container->get('templating')->renderResponse($template, $data);
    } 
	
}