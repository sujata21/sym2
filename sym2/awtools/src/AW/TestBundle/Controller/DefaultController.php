<?php

namespace AW\TestBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

/**
 * Image controller.
 *
 * @Route("/test")
 */
class DefaultController extends Controller
{
    /**
     * @Route("/iframe")
     * @Template()
     */
    public function indexAction()
    {
        /* if ($source != 'email') {
        	$height = 600;
        	$message = 'not from email';
        }else {
        	$height = 300;
        	$message = 'from email';
        }
        
        $hostname = gethostbyaddr($_SERVER['REMOTE_ADDR']); */
    	
    	//return array('height' => $height, 'message' => $message, 'hostname' => $hostname);
    	return array('text' => 'dummy text');
    }
    
        
    /**
    * @Route("/content/{text}", name="test_content")
    * @Template()
    */
    public function contentAction($text)
    {    
    
        return array('text' => $text);
        
    }
    
}
