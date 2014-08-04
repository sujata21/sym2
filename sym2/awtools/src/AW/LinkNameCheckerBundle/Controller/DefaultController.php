<?php

namespace AW\LinkNameCheckerBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\StreamedResponse;
use AW\LinkNameCheckerBundle\Form\TestType;
//use Symfony\Component\Form\FormError;

/**
 * Test controller.
 *
 * @Route("/linknamechecker")
 */
class DefaultController extends Controller
{
    /**
     * @Route("/", name="linknamechecker_index")
     * @Method("GET")
     * @Template()
     */
    public function indexAction()
    {
        $form = $this->createForm(new TestType());
        $csvFile = null;
        if (isset($_GET["csvFile"])) {
        	$csvFile = 'http://'.$_SERVER['HTTP_HOST'].'/uploads/awlinknamechecker/'.$_GET["csvFile"];
        }
        return array(
            'csvFile' => $csvFile,
            'form' => $form->createView(),
        );
    }

    /**
     * @Route("/", name="linknamechecker_test")
     * @Method("POST")
     * @Template("AWHtmlCheckerBundle:Default:new.html.twig")
     */
    public function createAction(Request $request)
    {
        $dir = __DIR__.'/../../../../web/uploads/awlinknamechecker/';
        $this->deleteOldFiles($dir);

        $form = $this->createForm(new TestType());
        $form->bind($request);

        if ($form->isValid()) {
            if (count($_FILES['files']['name']) > 0) {
                foreach ($_FILES["files"]["error"] as $key => $error) {
                    if ($error == UPLOAD_ERR_OK) {
                        
                        $tmp_name = $_FILES["files"]["tmp_name"][$key];
                        $name = $_FILES["files"]["name"][$key];
                        $name = str_replace(" ", "_", $name);

                        move_uploaded_file($tmp_name, $dir.$name);

                        $fileContent = file($dir.$name);
                        $linksArray = array();
				        $i = 1;
				        foreach ($fileContent as $key => $line) {
				            //find all <a> tags
				            preg_match_all('/<a(.*?)>/',$line,$match);
				            if (count($match[0]) > 0) {
				                foreach ($match[0] as $value) {
				                	$regex = '/name=\"([^\"]*)\"/iU';
            						preg_match($regex, $value, $nameMatch, PREG_OFFSET_CAPTURE);
            						$linkArray = array(
					                    'count' => $i++.",", 
					                    'line' => ($key+1).",", 
					                    'linkName' => $nameMatch[1][0].",",
					                    'link' => $value."\n",
					                );
					                array_push($linksArray, $linkArray);
				                }
				            }
				        }
				        $csvFile = $name.".csv";
				        if (file_exists($dir.$csvFile)) {
				        	unlink($dir.$csvFile);
				        }
				        file_put_contents($dir.$csvFile, "COUNT,LINE_NUMBER,LINK_NAME,LINK\n", FILE_APPEND);
				        foreach ($linksArray as $value) {
				     		foreach ($value as $value1) {
				     			file_put_contents($dir.$csvFile, $value1, FILE_APPEND);
				     		}
				        }				        
                    }
                }
            }

            return $this->redirect($this->generateUrl('linknamechecker_index', array(
            	'csvFile' => $csvFile,
            	)));
           
        }

        //$form->get('file')->addError(new FormError('File type error. Needs to be HTML file.'));

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    public function deleteOldFiles($dir)
    {
    	if ($handle = opendir($dir)) {
            while (false !== ($entry = readdir($handle))) {
                if ($entry != "." && $entry != "..") {
                    $diff = time() - filectime($dir.$entry);
                    if ($diff > 86400) {//delete all files older than 24 hours
                        unlink($dir.$entry);
                    }
                }
            }
            closedir($handle);

            return true;
        }

        return false;
    }
}
