<?php

namespace Application\LDAPBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Application\LDAPBundle\Entity\LDAPUser;

/**
 * @Route("/")
 */
class DefaultController extends Controller
{
    /**
     * @Route("/hello/{name}")
     * @Template()
     */
    public function indexAction($name)
    {
        return array('name' => $name);
    }

    /**
     * Creates a new LDAPUser entity.
     *
     * @Route("/signature/{type}/{id}", name="signature")
     * @Template("ApplicationLDAPBundle:LDAPUser:signature.html.twig")
     */
    public function signatureAction($type='1',$id){

        $em = $this->getDoctrine()->getManager();
        $entity = $em->getRepository('ApplicationLDAPBundle:LDAPUser')->findOneBy(array('id'=>$id));

        $banner = $em->getRepository('ApplicationLDAPBundle:Banner')->findOneBy(array('department'=> $entity->getDepartmentId()));
        $location = '.jpg';
        if( $entity->getOffice() == 'London, United Kingdom'){
            $location = '_ldn.jpg';
        }
        if( $entity->getOffice() == 'Atlanta, United States'){
            $location = '_atl.jpg';
        }
        if( $entity->getOffice() == 'Sydney, Austrailia'){
            $location = '_syd.jpg';
        }
        
       $banner->setName(str_replace('.jpg', $location , $banner->getName()));
       //var_dump($banner->getName());

        return array(
            'entity'      => $entity,
            'banner'      => $banner,
            'type'        => $type,

        );


    }
    /**
     * Creates a new LDAPUser entity.
     *
     * @Route("/download_signature/{type}/{id}", name="download_signature")
     */
    public function Download_signature($type,$id){
        $host = $_SERVER['HTTP_HOST'];
        $sigUrl = 'http://'.$host.'/app_dev.php/signature/'.$id;
        $content = file_get_contents($sigUrl);

        $file = 'alchemyworx_signature.htm';



        $response = new Response();
        $response->headers->set('Content-type', 'application/octet-stream');
        $response->headers->set('Content-Disposition', sprintf('attachment; filename="%s"', $file));
        $response->setContent($content);
        //$response->send();
        return $response;


    }

}
