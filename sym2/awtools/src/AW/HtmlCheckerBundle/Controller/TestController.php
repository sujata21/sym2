<?php

namespace AW\HtmlCheckerBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\StreamedResponse;
use Symfony\Component\Form\FormError;
use AW\HtmlCheckerBundle\Entity\Test;
use AW\HtmlCheckerBundle\Form\TestType;
use AW\HtmlCheckerBundle\Entity\ScreenShots;

/**
 * Test controller.
 *
 * @Route("/htmlchecker")
 */
class TestController extends Controller
{
    /**
     * Lists all Test entities.
     *
     * @Route("/", name="test")
     * @Method("GET")
     * @Template()
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager('htmlchecker');

        $entities = $em->getRepository('AWHtmlCheckerBundle:Test')->findAll();

        return array(
            'entities' => $entities,
        );
    }

    /**
     * Creates a new Test entity.
     *
     * @Route("/", name="test_create")
     * @Method("POST")
     * @Template("AWHtmlCheckerBundle:Test:new.html.twig")
     */
    public function createAction(Request $request)
    {
        $entity  = new Test();
        $form = $this->createForm(new TestType(), $entity);
        $form->bind($request);

        $file = $form['file']->getData();

        //if ($form->isValid() && $file->getMimeType() == 'text/html') {
        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager('htmlchecker');
            
            $entity->setFile($file->getClientOriginalName());

            $em->persist($entity);
            $em->flush();
            
            $dir = __DIR__.'/../../../../web/uploads/awhtmlchecker/';
            $file->move($dir, $file->getClientOriginalName());
            //sys_get_temp_dir()
            return $this->redirect($this->generateUrl('test_show', array('id' => $entity->getId())));
           
        }

        $form->get('file')->addError(new FormError('File type error. Needs to be HTML file.'));

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    /**
     * Displays a form to create a new Test entity.
     *
     * @Route("/new", name="test_new")
     * @Method("GET")
     * @Template()
     */
    public function newAction()
    {
        $entity = new Test();
        $form   = $this->createForm(new TestType(), $entity);

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    /**
     * Finds and displays a Test entity.
     *
     * @Route("/{id}", name="test_show")
     * @Method("GET")
     * @Template()
     */
    public function showAction($id)
    {
        $em = $this->getDoctrine()->getManager('htmlchecker');

        $entity = $em->getRepository('AWHtmlCheckerBundle:Test')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Test entity.');
        }
        
        $dir = __DIR__.'/../../../../web/uploads/awhtmlchecker';
        //get file content as array
        $testFile = $entity->getFile();
        $previewFile = "preview_".$id."_".$testFile;
        $file = file($dir.'/'.$testFile);
        //make copy of file for preview
        //var_dump($testFile);die;
        copy($dir.'/'.$testFile, $dir.'/'."preview_".$id."_".$testFile);

        return array(
            'entity' => $entity,
            'file' => $file,
            'iframeHref' => 'http://'.$_SERVER['HTTP_HOST'].'/uploads/awhtmlchecker/'.$previewFile,
        );
    }

    function createPreviewEmail($filePreviewArray,$filePreviewName,$test,$wordsArray,$chars)
    {
        switch ($test) {
            case 'profanity':
                $tag = 'span';
                $tagStyle = "color:#ffffff;background-color:#ff0000";
                break;
            case 'spam':
                $tag = 'span';
                $tagStyle = "color:#ffffff;background-color:#FF9000";
                break;
        }
        $fp = fopen($filePreviewName, 'w');
        foreach ($filePreviewArray as $key => $value) {
            $valueOut = $value;
            if ($test == 'href') {
                //http://simplehtmldom.sourceforge.net/manual.htm
                $parser = $this->container->get('simple_html_dom');
                //$parser->load($filePreviewName);
                $parser->load($value);
                foreach($parser->find('a') as $element) {
                    //array_push($links, $element->find('img'));
                    //array_push($links, $element->innertext());
                    //array_push($links, $value->innertext());
                    //array_push($links, strlen($value->href));
                    //array_push($links, stripos($value->href, 'http://'));
                    $length = strlen($element->href);
                    $pos = stripos($element->href, ' ');
                    if ($length == 0 || $pos) {
                        $innerText = $element->innertext = '<div style="border:1px solid #ff0000;">'.$element->innertext().'</div>';
                        $valueOut = $parser->outertext;
                    }
                }
            }else {
                foreach ($wordsArray as $word) {
                    $value = str_replace(array("\r\n", "\n", "\r"), '', $value);
                    $pos = strpos($value, $word);
                    
                    if ($pos !== false) {
                        $charBefore = substr($value, $pos-1, 1);
                        $charAfter = substr($value, $pos+strlen($word), 1);
                        if (in_array($charBefore, $chars) && in_array($charAfter, $chars)) {
                            
                            $valueOut = str_replace($word, '<'.$tag.' style="'.$tagStyle.'"> '.$word.' </'.$tag.'>', $valueOut);
                        }
                    }
                }
            }
            fwrite($fp, $valueOut);
        }
        fclose($fp);
    }

    /**
     * @Route("/pt/{id}", name="profanity_test")
     * @Method("POST")
     */
    public function profanityTest($id)
    {
        $em = $this->getDoctrine()->getManager('htmlchecker');

        $entity = $em->getRepository('AWHtmlCheckerBundle:Test')->find($id);

        $dir = __DIR__.'/../../../../web/uploads/awhtmlchecker';
        //get file content as array
        $file = $entity->getFile();
        $fileContent = file($dir.'/'.$file);

        $results = array();
        $fileCSV = file_get_contents(__DIR__.'/../../../../web/bundles/awhtmlchecker/filters/profanityWords.csv');
        $pwords = str_getcsv($fileCSV);
        $chars = array('',' ','>','<','.');

        $filePreviewArray = file($dir.'/preview_'.$id.'_'.$file);
        $filePreviewName = $dir.'/preview_'.$id.'_'.$file;

        $this->createPreviewEmail($filePreviewArray,$filePreviewName,"profanity",$pwords,$chars);

        foreach ($fileContent as $key => $value) {
            foreach ($pwords as $pword) {
                $value = str_replace(array("\r\n", "\n", "\r"), '', $value);
                $pos = strpos($value, $pword);
                
                if ($pos !== false) {
                    $charBefore = substr($value, $pos-1, 1);
                    $charAfter = substr($value, $pos+strlen($pword), 1);
                    if (in_array($charBefore, $chars) && in_array($charAfter, $chars)) {
                        $valueOut = htmlentities($value);
                        $valueOut = str_replace($pword, '<span class="pword">'.$pword.'</span>', $valueOut);
                        $poslc = array(
                            'line' => $key + 1,
                            'col' => $pos,
                            'pword' => $pword,
                            'lineContent' => trim($valueOut));
                        array_push($results, $poslc);
                    }
                }
            }
        }

        $entity->setPtest(json_encode($results));
        $em->persist($entity);
        $em->flush();

        $jsonResponse['results'] = $results;

        $response = new Response(json_encode($jsonResponse));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    /**
     * @Route("/st/{id}", name="spam_test")
     * @Method("POST")
     */
    public function spamTest($id)
    {
        $em = $this->getDoctrine()->getManager('htmlchecker');

        $entity = $em->getRepository('AWHtmlCheckerBundle:Test')->find($id);

        $dir = __DIR__.'/../../../../web/uploads/awhtmlchecker';
        //get file content as array
        $file = $entity->getFile();
        $fileContent = file($dir.'/'.$file);

        $results = array();
        $fileCSV = file_get_contents(__DIR__.'/../../../../web/bundles/awhtmlchecker/filters/spamWords.csv');
        $swords = str_getcsv($fileCSV);
        $chars = array('',' ','>','<','.');

        $filePreviewArray = file($dir.'/preview_'.$id.'_'.$file);
        $filePreviewName = $dir.'/preview_'.$id.'_'.$file;

        $this->createPreviewEmail($filePreviewArray,$filePreviewName,"spam",$swords,$chars);

        foreach ($fileContent as $key => $value) {
            foreach ($swords as $sword) {
                $value = str_replace(array("\r\n", "\n", "\r"), '', $value);
                $pos = strpos($value, $sword);
                
                if ($pos !== false) {
                    $charBefore = substr($value, $pos-1, 1);
                    $charAfter = substr($value, $pos+strlen($sword), 1);
                    if (in_array($charBefore, $chars) && in_array($charAfter, $chars)) {
                        $valueOut = htmlentities($value);
                        $valueOut = str_replace($sword, '<span class="sword">'.$sword.'</span>', $valueOut);
                        $poslc = array(
                            'line' => $key + 1,
                            'col' => $pos,
                            'sword' => $sword,
                            'lineContent' => trim($valueOut));
                        array_push($results, $poslc);
                    }
                }
            }
        }

        $entity->setStest(json_encode($results));
        $em->persist($entity);
        $em->flush();

        $jsonResponse['results'] = $results;

        $response = new Response(json_encode($jsonResponse));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    /**
     * @Route("/lt/{id}", name="link_test")
     * @Method("POST")
     */
    public function linkTest($id)
    {
        $em = $this->getDoctrine()->getManager('htmlchecker');

        $entity = $em->getRepository('AWHtmlCheckerBundle:Test')->find($id);

        $dir = __DIR__.'/../../../../web/uploads/awhtmlchecker/';
        //get file content as array
        $file = $entity->getFile();
        $fileContent = file($dir.'/'.$file);

        //$filePreviewName = file_get_contents($dir.'/preview_'.$id.'_'.$file);
        $filePreviewArray = file($dir.'/preview_'.$id.'_'.$file);
        $filePreviewName = $dir.'/preview_'.$id.'_'.$file;

        $this->createPreviewEmail($filePreviewArray,$filePreviewName,"href",null,null);

        $results = array();
        foreach ($fileContent as $key => $value) {
            $regex = '/href=\"([^\"]*)\"/iU';
            preg_match($regex, $value, $match, PREG_OFFSET_CAPTURE);
            if (count($match) != 0) {
                $pos = $match[0][1];
                
                //find all chars between "" in href
                preg_match_all('/"(.*?)"/',$match[0][0],$match1);
                $hrefContent = $match1[0][0];
                $status = $this->checkHrefContent($hrefContent);
                $statusCode = '';
                if($status == 'valid') {
                    $url = str_replace("\"", "", $match1[0][0]);
                    $checkUrl = $this->checkUrl($url);
                    $statusCode = $checkUrl['http_code'];
                }
                $valueOut = htmlentities($value);
                $valueOut = str_replace(substr(htmlentities($match[0][0]),0,-1), '<span class="hmatch">'.$match[0][0].'</span>', $valueOut);
                //var_dump($valueOut);
                $poslc = array(
                    'line' => $key + 1,
                    'col' => $pos,
                    'statusCode' => $statusCode,
                    'status' => $status,
                    'lineContent' => trim($valueOut));
                array_push($results, $poslc);
            }
        }

        $entity->setHtest(json_encode($results));
        $em->persist($entity);
        $em->flush();

        $jsonResponse['results'] = $results;

        $response = new Response(json_encode($jsonResponse));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    /**
     * @Route("/ut/{id}", name="url_test")
     * @Method("POST")
     */
    public function urlTest($id)
    {
        $em = $this->getDoctrine()->getManager('htmlchecker');

        //remove all entries from previous test
        $entities = $em->getRepository('AWHtmlCheckerBundle:ScreenShots')->findBy(array('testId' => $id));
        foreach ($entities as $entity) {
            $em->remove($entity);
        }        
        $em->flush();

        $entity = $em->getRepository('AWHtmlCheckerBundle:Test')->find($id);

        $dir = __DIR__.'/../../../../web/bundles/awhtmlchecker/';

        //get html file content as array
        $awDir = __DIR__.'/../../../../web/uploads/awhtmlchecker/';
        $fileContent = file($awDir.'/'.$entity->getFile());

        //remove old screen shot images before capture new ones - just to keep free space on hdd
        $ssDir = __DIR__.'/../../../../web/uploads/awhtmlchecker/';
        if ($handle = opendir($ssDir)) {
            while (false !== ($entry = readdir($handle))) {
                if ($entry != "." && $entry != "..") {
                    $diff = time() - filectime($ssDir.$entry);
                    if ($diff > 86400) {//delete all files older than 24 hours
                        unlink($ssDir.$entry);
                    }
                }
            }
            closedir($handle);
        }

        $results = array();
        $file = file_get_contents($dir.'filters/spamWords.csv');
        foreach ($fileContent as $key => $value) {
            $regex = '/href=\"([^\"]*)\"/iU';
            preg_match($regex, $value, $match, PREG_OFFSET_CAPTURE);
            if (count($match) != 0) {
                $pos = $match[0][1];
                
                //find all chars between "" in href
                preg_match_all('/"(.*?)"/',$match[0][0],$match1);
                
                $statusCode = null;
                $url = null;
                if (strlen($match1[0][0]) == 2) {
                    $status = 'empty';
                }elseif (strpos($match1[0][0], ' ')) {
                    $status = 'whitespace';
                }else {
                    $status = 'valid';
                    $url = str_replace("\"", "", $match1[0][0]);
                    $checkUrl = $this->checkUrl($url);
                    $statusCode = $checkUrl['http_code'];
                    $url = $checkUrl['url'];
                    //$imgFileName = str_replace("http://", "", $url).'.jpg';
                }

                $valueOut = htmlentities($value);
                $valueOut = str_replace(substr(htmlentities($match[0][0]),0,-1), 'href=<span class="umatch">'.$match1[0][0].'</span>', $valueOut);
                $poslc = array(
                    'id' => $id,
                    'line' => $key + 1,
                    'col' => $pos,
                    'url' => $url,
                    'status' => $status,
                    'statusCode' => $statusCode,
                    'lineContent' => trim($valueOut),
                    //'pageContent' => $checkUrl['pageContent']
                );
                array_push($results, $poslc);
            }
        }

        $jsonResponse['results'] = $results;

        $response = new Response(json_encode($jsonResponse));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    public function checkHrefContent($hrefContent)
    {
        $status = '';
        if (strlen($hrefContent) == 2) {
            $status .= '- empty;<br>';
        }
        if (strpos(strtolower($hrefContent), 'http') <= 0) {
            $status .= '- http(s) missing;<br>';
        }
        if (strpos($hrefContent, ' ')) {
            $status .= '- whitespace;<br>';
        }
        if (strpos(strtolower($hrefContent), 'tbc')) {
            $status .= '- update this link;<br>';
        }

        if ((strlen($hrefContent) > 2) && (strpos(strtolower($hrefContent), 'http') > 0) && (!strpos($hrefContent, ' ')) && (!strpos(strtolower($hrefContent), 'tbc'))) {
            $status = 'valid';
        }

        return $status;
    }

    /**
     * @Route("/report/{id}", name="report_test")
     * @Method("GET")
     * @Template()
     */
    public function reportAction($id)
    {
        $em = $this->getDoctrine()->getManager('htmlchecker');

        $entity = $em->getRepository('AWHtmlCheckerBundle:Test')->find($id);

        $screenShots = $em->getRepository('AWHtmlCheckerBundle:ScreenShots')->findBy(array('testId' => $id));

        $dir = $_SERVER['DOCUMENT_ROOT'];
        $awDir = $_SERVER['DOCUMENT_ROOT'].'/uploads/awhtmlchecker/';
        
        $imagesBase64 = array();
        foreach ($screenShots as $image) {
            //convert images to base64
            $path = $image->getFilename();
            $type = pathinfo($path, PATHINFO_EXTENSION);
            $data = file_get_contents($awDir.$path);
            $imageBase64['image'] = 'data:image/' . $type . ';base64,' . base64_encode($data);
            $imageBase64['url'] = $image->getUrl();
            array_push($imagesBase64, $imageBase64);
        }
        
        $reportFile = $this->renderView('AWHtmlCheckerBundle:Test:report.html.twig', array(
                'ptest' => json_decode($entity->getPtest()),
                'stest' => json_decode($entity->getStest()),
                'htest' => json_decode($entity->getHtest()),
                //'screenShots' => $screenShots,
                'imagesBase64' => $imagesBase64
            ));

        //generate report file
        $reportFileNameHtml = "report_".$id.".html";
        $reportFileNamePdf = "report_".$id.".pdf";
        $fp = fopen($awDir.$reportFileNameHtml,"wb");
        fwrite($fp,$reportFile);
        fclose($fp);
        
        //$url = "http://aw2013.alchemyworx.local/uploads/awhtmlchecker/report_55.html";
        $comm = "wkhtmltopdf ".$awDir.$reportFileNameHtml." ".$awDir.$reportFileNamePdf."";
        exec($comm);

        $response = new Response();
        $response->setStatusCode(200);
    
        $response->headers->set('Content-Type', 'application/pdf'); 
        $response->headers->set('Content-Disposition', 'attachment; filename="'.$reportFileNamePdf.'"');
        /* $response->headers->set('Content-Transfer-Encoding', 'binary');
        $response->headers->set('Content-Length', filesize($filename));     
        $response->headers->set('Pragma', 'public');
        $response->headers->set('Expires', '0');
        $response->headers->set('Cache-Control', 'must-revalidate, post-check=0, pre-check=0');
        $response->headers->set('Cache-Control', 'private'); */
        $response->setContent(file_get_contents($awDir.$reportFileNamePdf));
        return $response;
        break;
        /*return array(
            'ptest' => json_decode($entity->getPtest()),
            'stest' => json_decode($entity->getStest()),
            'htest' => json_decode($entity->getHtest()),
            //'screenShots' => $screenShots,
            'imagesBase64' => $imagesBase64,
        );*/
    }

    /**
     * Gets $url screen thumbnail.
     *
     * @Route("/ust/", name="test_ust")
     * @Method("POST")
     */
    function getUrlScreenShot()
    {
        $url = $_POST['url'];
        $tid = $_POST['id'];
        $userAgent = $_POST['userAgent'];
        $awDir = __DIR__.'/../../../../web/uploads/awhtmlchecker/';
        $dir = __DIR__.'/../../../../web/';
        //$imgFileName = uniqid().'-'.str_replace("http://", "", $url).'.jpg';
        $imgFileName = uniqid().'.jpg';

        //create screen shot
        $comm = 'phantomjs '.$dir.'bundles/awhtmlchecker/phantomjs/rasterize.js "'.$url.'" '.$awDir.'/'.$imgFileName.' "'.$userAgent.'"';
        exec($comm);

        //compress image
        $image = new \Imagick($awDir.'/'.$imgFileName);
        $image->setImageCompressionQuality(10);
        $image->stripImage();
        $image->writeImage($dir.'uploads/awhtmlchecker/'.$imgFileName); 
        //remove image file from /tmp
        //unlink($tmpDir.'/'.$imgFileName);

        //store image filenames for report
        $em = $this->getDoctrine()->getManager('htmlchecker');

        $entity = new ScreenShots();
        $entity->setTestId($tid);
        //$entity->setFilename('http://'.$_SERVER['HTTP_HOST'].'/uploads/awhtmlchecker/'.$imgFileName);
        $entity->setFilename($imgFileName);
        $entity->setUrl($url);
        $em->persist($entity);
        $em->flush();

        $jsonResponse['img'] = 'http://'.$_SERVER['HTTP_HOST'].'/uploads/awhtmlchecker/'.$imgFileName;

        $response = new Response(json_encode($jsonResponse));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    function checkUrl($url){
        
        //$agent = "Mozilla/4.0 (compatible; MSIE 5.01; Windows NT 5.0)";
        //Mozilla/5.0 (iPhone; CPU iPhone OS 7_0_4 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11B554a Safari/9537.53
        //Mozilla/5.0 (Linux; U; Android 4.3; en-gb; GT-I9300 Build/JSS15J) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30
        //Mozilla/5.0 (iPad; CPU OS 7_0_4 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11B554a Safari/9537.53
        //Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; NOKIA; Lumia 925)
        if (!isset($_POST["userAgent"]) || $_POST["userAgent"] == null) {
            $agent = "Mozilla/4.0 (compatible; MSIE 5.01; Windows NT 5.0)";
        } else {
            $agent = $_POST["userAgent"];
        }
        $ch = curl_init($url);
        
        $options = array(
            CURLOPT_RETURNTRANSFER => true,     // return web page
            CURLOPT_HEADER         => true,    // don't return headers
            CURLOPT_FOLLOWLOCATION => true,     // follow redirects
            //CURLOPT_ENCODING       => "",       // handle all encodings
            CURLOPT_USERAGENT      => $agent, // who am i
            CURLOPT_AUTOREFERER    => true,     // set referer on redirect
            //CURLOPT_CONNECTTIMEOUT => 120,      // timeout on connect
            //CURLOPT_TIMEOUT        => 120,      // timeout on response
            //CURLOPT_MAXREDIRS      => 10,       // stop after 10 redirects
            CURLOPT_SSL_VERIFYPEER   => false,
            CURLOPT_SSL_VERIFYHOST   => false,
        );

        curl_setopt_array($ch, $options);
        
        $pageContent = curl_exec($ch);
        $checkResults = curl_getinfo($ch);
        curl_close($ch);
        
        return $checkResults;
    }

    /**
     * Displays a form to edit an existing Test entity.
     *
     * @Route("/{id}/edit", name="test_edit")
     * @Method("GET")
     * @Template()
     */
    public function editAction($id)
    {
        $em = $this->getDoctrine()->getManager('htmlchecker');

        $entity = $em->getRepository('AWHtmlCheckerBundle:Test')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Test entity.');
        }

        $editForm = $this->createForm(new TestType(), $entity);
        $deleteForm = $this->createDeleteForm($id);

        return array(
            'entity'      => $entity,
            'edit_form'   => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Edits an existing Test entity.
     *
     * @Route("/{id}", name="test_update")
     * @Method("PUT")
     * @Template("AWHtmlCheckerBundle:Test:edit.html.twig")
     */
    public function updateAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager('htmlchecker');

        $entity = $em->getRepository('AWHtmlCheckerBundle:Test')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Test entity.');
        }

        $deleteForm = $this->createDeleteForm($id);
        $editForm = $this->createForm(new TestType(), $entity);
        $editForm->bind($request);

        if ($editForm->isValid()) {
            $em->persist($entity);
            $em->flush();

            return $this->redirect($this->generateUrl('test_edit', array('id' => $id)));
        }

        return array(
            'entity'      => $entity,
            'edit_form'   => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Deletes a Test entity.
     *
     * @Route("/{id}", name="test_delete")
     * @Method("DELETE")
     */
    public function deleteAction(Request $request, $id)
    {
        $form = $this->createDeleteForm($id);
        $form->bind($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager('htmlchecker');
            $entity = $em->getRepository('AWHtmlCheckerBundle:Test')->find($id);

            if (!$entity) {
                throw $this->createNotFoundException('Unable to find Test entity.');
            }

            $em->remove($entity);
            $em->flush();
        }

        return $this->redirect($this->generateUrl('test'));
    }

    /**
     * Creates a form to delete a Test entity by id.
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
