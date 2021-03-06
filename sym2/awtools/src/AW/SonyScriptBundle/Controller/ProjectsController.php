<?php

namespace AW\SonyScriptBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use AW\SonyScriptBundle\Entity\Projects;
use AW\SonyScriptBundle\Form\ProjectsType;
use AW\SonyScriptBundle\Entity\Variables;

/**
 * Projects controller.
 *
 * @Route("/sonyscript")
 */
class ProjectsController extends Controller
{
    /**
     * Lists all Projects entities.
     *
     * @Route("/", name="projects")
     * @Method("GET")
     * @Template()
     */
    public function indexAction()
    {
        return $this->render('AWSonyScriptBundle:Projects:index.html.twig');
    }
	
    /**
     * Lists all Projects entities.
     *
     * @Route("/{status}", name="projects_listall")
     * @Method("GET")
     * @Template()
     */
    public function listallAction($status)
    {
    	$em = $this->getDoctrine()->getManager('sonyscript');
    
    	switch ($status) {
    		case '1'://only inactive projects
    			$entities = $em->getRepository('AWSonyScriptBundle:Projects')->findBy(array('status' => $status));
    			break;
    		case '0'://only active projects - status = 0
    			$entities = $em->getRepository('AWSonyScriptBundle:Projects')->findBy(array('status' => $status));
    			break;
    		default://only active projects - dummy status = 2 passed from jquery is only for this operation
    			$entities = $em->getRepository('AWSonyScriptBundle:Projects')->findBy(array('status' => '0'));
    	}
    	$projectsCount = count($entities);
    	//$entities = $em->getRepository('AWSonyScriptBundle:Projects')->findAll();
    
    	if (count($entities) != 0) {
    		$jsonResponse['html']=$this->renderView('AWSonyScriptBundle:Projects:listall.html.twig',array(
    				'entities' => $entities,
    		));
    	}else {
    		$jsonResponse['html']= '<div style="padding: 20px;font-weight: bold;">No projects found</div>';
    	}
    	 
    	$jsonResponse['status'] = $status;
    
    	$response = new Response(json_encode($jsonResponse));
    	$response->headers->set('Content-Type', 'application/json');
    	return $response;
    }
    
    /**
     * Upload new ASF spreadsheet.
     *
     * @Route("/newasf/{id}", name="projects_newasf")
     * @Method("POST")
     * @Template()
     */
    public function newasfAction(Request $request, $id)
    {
    	$file = $_FILES['new_spreadsheet']['name'];

    	if ($file) {
    		 
    		$em = $this->getDoctrine()->getManager('sonyscript');
    		 
    		$entity = $em->getRepository('AWSonyScriptBundle:Projects')->find($id);
    		
    		if (!$entity) {
    			throw $this->createNotFoundException('Unable to find Projects entity.');
    		}
    		
    		//root dir for sonyscript
    		$dir = __DIR__.'/../../../../web/uploads/awsonyscript/';
    		
    		if ($error == UPLOAD_ERR_OK) {
    			$tmp_name = $_FILES["new_spreadsheet"]["tmp_name"];
    			$name = $_FILES["new_spreadsheet"]["name"];
    			move_uploaded_file($tmp_name, $dir.$entity->getFolder().'/OrgFiles/'.$name);
    			//set full permission to spreadsheet file for PHPExcel
    			chmod($dir.$entity->getFolder().'/OrgFiles/'.$_FILES["new_spreadsheet"]["name"], 0777);
    		}
    	
    		$entity -> setSpreadsheet($file);
    		$entity -> setSpreadsheetCopy('Copy_'.$file);
    		
    		$em->persist($entity);
    		$em->flush();
    	
    	}
    	
    	$jsonResponse['file'] = $_FILES["new_spreadsheet"]["name"];
    
    	$response = new Response(json_encode($jsonResponse));
    	$response->headers->set('Content-Type', 'application/json');
    	return $response;
    }
    
    /**
     * Creates a new Projects entity.
     *
     * @Route("/", name="projects_create")
     * @Method("POST")
     * @Template("AWSonyScriptBundle:Projects:new.html.twig")
     */
    public function createAction(Request $request)
    {
    	
    	$entity  = new Projects();
        $form = $this->createForm(new ProjectsType(), $entity);
        $form->bind($request);
        
        if ($form->isValid()) {
            
        	//root dir for sonyscript
        	$dir = __DIR__.'/../../../../web/uploads/awsonyscript/';
        	
        	//add datetime stamp to project folder name to make it unique
        	$projectFolder = $form['name']->getData().'_'.date("YmdHis").rand(0, 99);
        	
        	//create project folder
        	mkdir($dir.$projectFolder, 0755);
        	$entity->setFolder($projectFolder);
        	//create folder for original files
        	mkdir($dir.$projectFolder.'/OrgFiles', 0777);
        	//create output folder
        	mkdir($dir.$projectFolder.'/_html', 0777);
        	//create images folder
        	mkdir($dir.$projectFolder.'/_html/images', 0777);
        	
        	$file = $form['spreadsheet']->getData();
        	
        	if ($file) {
        		 
        		// get original spreadsheet file names
        		$orgFileName = $file->getClientOriginalName();
        		
        		//move spreadsheet files
        		$file->move($dir.$projectFolder.'/OrgFiles', $orgFileName);
        		//set full permission to spreadsheet file for PHPExcel
        		chmod($dir.$projectFolder.'/OrgFiles/'.$orgFileName, 0777);
        		
        		$entity -> setSpreadsheet($orgFileName);
        		$entity -> setSpreadsheetCopy('Copy_'.$orgFileName);
        		
        	}
        	
        	if ($form['defaultTemplate']->getData()) {
        		
        		// set original template file name to default
        		$orgFileName = 'template_default.html.twig';
        		$fileHandle = fopen($dir.$projectFolder.'/OrgFiles/'.$orgFileName, 'w') or die("can't open file");
        		fwrite($fileHandle, 'This is default template.');
        		fclose($fileHandle);
        		
        	} else {
        		
        		$file = $form['template']->getData();
        		 
        		if ($file) {
        			 
        			// get original template file names
        			$orgFileName = $file->getClientOriginalName();
        		
        			//move template and template files
        			$file->move($dir.$projectFolder.'/OrgFiles', $orgFileName);
        			//set full permission to template file
        			chmod($dir.$projectFolder.'/OrgFiles/'.$orgFileName, 0777);
        		
        		}
        	}
        	
        	$entity -> setTemplate($orgFileName);
        	$entity -> setTemplateCopy('copy_'.$orgFileName);
        	
        	
        	
        	if (count($_FILES['images']['name']) > 1) {
	    	
	    		foreach ($_FILES["images"]["error"] as $key => $error) {
				    if ($error == UPLOAD_ERR_OK) {
				        $tmp_name = $_FILES["images"]["tmp_name"][$key];
				        $name = $_FILES["images"]["name"][$key];
				        move_uploaded_file($tmp_name, $dir.$projectFolder.'/_html/images/'.$name);
				    }
				}
	    	
	    	}
	    	
        	$em = $this->getDoctrine()->getManager('sonyscript');
            $em->persist($entity);
            $em->flush();

            return $this->redirect($this->generateUrl('projects_template', array('id' => $entity->getId())));
        }
        
		return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }
    
    /* function fileType($fileMimeType)
    {
    	$mimeImageType = array(
    			'application/vnd.ms-excel',
				'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    	);
    	 
    	if(in_array($fileMimeType , $mimeImageType))
    	{
    		//is image
    		return true;
    	}
    	return false;
    } */

    /**
     * Displays a form to create a new Projects entity.
     *
     * @Route("/project/new", name="projects_new")
     * @Method("GET")
     * @Template("AWSonyScriptBundle:Projects:new.html.twig")
     */
    public function newAction()
    {
        $entity = new Projects();
        $form   = $this->createForm(new ProjectsType(), $entity);
		
        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    /**
     * Uploads images on template page.
     *
     * @Route("/upload/{id}", name="projects_uploadimages")
     * @Method("POST")
     * @Template()
     */
    function uploadAction(Request $request, $id)
    {
    	$em = $this->getDoctrine()->getManager('sonyscript');
    	
    	$entity = $em->getRepository('AWSonyScriptBundle:Projects')->find($id);
    	
    	if (!$entity) {
    		throw $this->createNotFoundException('Unable to find Projects entity.');
    	} 
    	
    	$imagesDir = __DIR__.'/../../../../web/uploads/awsonyscript/'.$entity->getFolder().'/_html/images/';
    	
    	foreach ($_FILES["images"]["error"] as $key => $error) {
    		if ($error == UPLOAD_ERR_OK) {
    			$tmp_name = $_FILES["images"]["tmp_name"][$key];
    			$name = $_FILES["images"]["name"][$key];
    			move_uploaded_file($tmp_name, $imagesDir.$name);
    		}
    	}
    	
    	/* $imagesDir = __DIR__.'/../../../../web/uploads/awsonyscript/'.$entity->getFolder().'/_html/images';
    	$images = scandir($imagesDir);
    	foreach($images as $file)
    	{
    		if (!is_dir("$imagesDir/$file"))
    		{
    			$imagesFiles[] = $file;
    		}
    	} */
    	
    	$jsonResponse['imagesCount'] = count(self::getImagesArray($entity->getFolder()));
    	
    	$response = new Response(json_encode($jsonResponse));
    	$response->headers->set('Content-Type', 'application/json');
    	return $response;
    }
    
    /**
     * Save new template content.
     *
     * @Route("/save/{id}", name="projects_savetemplate")
     * @Method("POST")
     * @Template()
     */
    public function saveAction(Request $request, $id)
    {
    	$em = $this->getDoctrine()->getManager('sonyscript');

        $entity = $em->getRepository('AWSonyScriptBundle:Projects')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Projects entity.');
        }
        
        //$mainDir = __DIR__.'/../../../../web/uploads/awsonyscript/'.$entity->getFolder().'/OrgFiles/';
        $filename = __DIR__.'/../../../../web/uploads/awsonyscript/'.$entity->getFolder().'/OrgFiles/'.$entity->getTemplate();
        $filenameCopy = __DIR__.'/../../../../web/uploads/awsonyscript/'.$entity->getFolder().'/OrgFiles/'.$entity->getTemplateCopy();
        
        //save new template content 
        $fp = fopen($filename, "w");
        ftruncate($fp, 0);
        fwrite($fp, trim($this->get('request')->request->get('newTemplate')));
        fclose($fp);
        
        if (file_exists($filenameCopy)) {
        	unlink($filenameCopy);
        }
        
        //create empty template copy file with no spaces
        $handleCopy = fopen($filenameCopy, "w");
        ftruncate($handleCopy, 0);
        fwrite($handleCopy, $entity->getLogic()."\n".trim($this->get('request')->request->get('newTemplate')));
        fclose($handleCopy);
        
        $jsonResponse['success'] = 1;
        
        $response = new Response(json_encode($jsonResponse));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    /**
     * Finds and displays a Projects entity.
     *
     * @Route("/show/{id}", name="projects_show")
     * @Method("GET")
     * @Template()
     */
    public function showAction($id)
    {
        $em = $this->getDoctrine()->getManager('sonyscript');

        $entity = $em->getRepository('AWSonyScriptBundle:Projects')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Projects entity.');
        }
        
        $templatesDir = __DIR__.'/../../../../web/uploads/awsonyscript/'.$entity->getFolder().'/_html';
        $templates = scandir($templatesDir);
        foreach($templates as $file)
        {
        	if (!is_dir("$templatesDir/$file"))
        	{
        		$templatesFiles[] = array('name' => $file, 'modified' =>  date ("Y-m-d H:i:s", filemtime($templatesDir.'/'.$file)));
        		
        	}
        }
        ;
        return array(
        	'entity' => $entity,
        	'projectName' => $entity->getName(),
        	'imagesFiles' => self::getImagesArray($entity->getFolder()),
        	'templatesDir' => $templatesDir,
        	'templatesFiles' => $templatesFiles,
        );
    }

    /**
     * Create & download ZIP file with images/templates.
     *
     * @Route("/zip/{id},{files}", name="projects_zip")
     * @Method("GET")
     */
    public function zipAction($id, $files)
    {
    	$em = $this->getDoctrine()->getManager('sonyscript');

        $entity = $em->getRepository('AWSonyScriptBundle:Projects')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Projects entity.');
        }
		
        $mainDir = __DIR__.'/../../../../web/uploads/awsonyscript/'.$entity->getFolder();
        
        switch ($files) {
            case 'templates':
            	$templatesDir = $mainDir.'/_html';
            	
            	$zip = new \ZipArchive();
            	$filename = $mainDir.'/'.$entity->getFolder().'_templates.zip';
            	
            	if ($zip->open($filename, \ZipArchive::CREATE | \ZipArchive::OVERWRITE) !== TRUE) {
            		exit("cannot open <$filename>\n");
            	}
            	
            	$templates = scandir($templatesDir);
            	
            	foreach($templates as $file)
            	{
            		if ($file != '.' && $file != '..')
            		{
            			if (is_dir($templatesDir.'/'.$file)) {
            				
            				$zip->addEmptyDir($file);
            				$images = scandir($mainDir.'/_html/'.$file);
            				foreach($images as $ifile)
            				{
            					if ($ifile != '.' && $ifile != '..')
            					{
            						$zip->addFile($mainDir.'/_html/'.$file.'/'.$ifile, $file.'/'.$ifile);
            					}
            				}
            				//$zip->addFile($templatesDir.'/'.$file, $file);
            			} else {
            				$zip->addFile($templatesDir.'/'.$file, $file);
            			}
            		}
            	}
            	$zip->close();
            	
            	$response = new Response();
				$response->setStatusCode(200);
	
	            $response->headers->set('Content-Type', 'application/zip'); 
	            $response->headers->set('Content-Disposition', 'attachment; filename="'.$entity->getFolder().'_templates.zip"');
	            /* $response->headers->set('Content-Transfer-Encoding', 'binary');
	            $response->headers->set('Content-Length', filesize($filename));     
	            $response->headers->set('Pragma', 'public');
	            $response->headers->set('Expires', '0');
	            $response->headers->set('Cache-Control', 'must-revalidate, post-check=0, pre-check=0');
	            $response->headers->set('Cache-Control', 'private'); */
	            $response->setContent(file_get_contents($filename));
	            return $response;
            	break;
            case 'test':
            	$templatesDir = $mainDir.'/_html';
            	 
            	$zip = new \ZipArchive();
            	$filename = $mainDir.'/'.$entity->getFolder().'_templates.zip';
            	 
            	if ($zip->open($filename, \ZipArchive::CREATE | \ZipArchive::OVERWRITE) !== TRUE) {
            		exit("cannot open <$filename>\n");
            	}
            	 
            	$templates = scandir($templatesDir);
            	 
            	foreach($templates as $file)
            	{
            		if ($file != '.' && $file != '..')
            		{
            			if (is_dir($templatesDir.'/'.$file)) {
            	
            				$zip->addEmptyDir($file);
            				$images = scandir($mainDir.'/_html/'.$file);
            				foreach($images as $ifile)
            				{
            					if ($ifile != '.' && $ifile != '..')
            					{
            						$zip->addFile($mainDir.'/_html/'.$file.'/'.$ifile, $file.'/'.$ifile);
            					}
            				}
            				//$zip->addFile($templatesDir.'/'.$file, $file);
            			} else {
            				$zip->addFile($templatesDir.'/'.$file, $file);
            			}
            		}
            	}
            	$zip->close();
            	
            	
            	
            	$response = new Response();
				$response->setStatusCode(200);
	
	            $response->headers->set('Content-Type', 'text/html'); 
	            $response->headers->set('Content-Disposition', 'attachment; filename="'.$entity->getFolder().'_templates.zip"');
	            /* $response->headers->set('Content-Transfer-Encoding', 'binary');
	            $response->headers->set('Content-Length', filesize($filename));     
	            $response->headers->set('Pragma', 'public');
	            $response->headers->set('Expires', '0');
	            $response->headers->set('Cache-Control', 'must-revalidate, post-check=0, pre-check=0');
	            $response->headers->set('Cache-Control', 'private'); */
	            $response->setContent(file_get_contents($filename));
	            return $response;
            	break;
        }
        
        return new Response('ok');
    }
	
    function copyFiles($mainDir) {
    	$src = $mainDir.'/';
    	//for dev server
    	//$dest = '/home/rstraburzynski/project/AWTOOLS/web/uploads/awsonyscript/';
    	$dest = $mainDir.'_copy/';
    	
    	//for komatite server
    	//$dest = '/mnt/alchemyworx/sony_playstation/';
    	 
    	shell_exec("cp -r ".$src." ".$dest);
    }
    
    /**
     * Finds and displays a image file.
     *
     * @Route("/image/{id},{file}", name="projects_imageshow")
     * @Method("GET")
     */
    public function imageShowAction($id,$file)
    {
        $em = $this->getDoctrine()->getManager('sonyscript');

        $entity = $em->getRepository('AWSonyScriptBundle:Projects')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Projects entity.');
        }

        $image = __DIR__.'/../../../../web/uploads/awsonyscript/'.$entity->getFolder().'/_html/images/'.$file;
        
		$fp = fopen($image, "rb");
        $str = stream_get_contents($fp);
        fclose($fp);
        
        $response = new Response($str, 200);
        $response->headers->set('Content-Type', 'image/png');
        
        return $response;
    }

    /**
     * Finds and displays a template file.
     *
     * @Route("/template/{id},{file}", name="projects_templateshow")
     * @Method("GET")
     */
    public function templateShowAction($id,$file)
    {
        $em = $this->getDoctrine()->getManager('sonyscript');

        $entity = $em->getRepository('AWSonyScriptBundle:Projects')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Projects entity.');
        }

        $template = __DIR__.'/../../../../web/uploads/awsonyscript/'.$entity->getFolder().'/_html/'.$file;
        
		$fp = fopen($template, "rb");
        $str = stream_get_contents($fp);
        fclose($fp);
        
        $response = new Response($str, 200);
        $response->headers->set('Content-Type', 'text/html');
        
        return $response;
    }

    /**
     * Prepare variables names.
     *
     * @Route("/variables/", name="projects_newvariables")
     * @Method("POST")
     */
    public function newvariablesAction(Request $request)
    {
    	$file = $_FILES['spreadsheet']['tmp_name'];
    	
    	switch (mime_content_type($file)) {
    		case 'application/zip':
    			//loads Excel2007 type xlsx
    			$objReader = \PHPExcel_IOFactory::createReader('Excel2007');
    			$fileType = 'Excel2007';
    			break;
    		case 'application/vnd.ms-excel':
    		case 'application/vnd.ms-office':
    			//loads Excel2003 type xls
    			$objReader = \PHPExcel_IOFactory::createReader('Excel5');
    			$fileType = 'Excel5';
    			break;
    	}
    	
    	$objReader->setReadDataOnly(true);
    	$objPHPExcel = $objReader->load($file);
    	$objWorksheet = $objPHPExcel->setActiveSheetIndex(0);
    	
    	$highestRow = $objWorksheet->getHighestRow();
    	
    	$vars = '';
    	
    	for ($row = 1; $row <= $highestRow; ++$row) {
    		 
    		$var = $objWorksheet->getCellByColumnAndRow(0,$row)->getValue();
    	
    		//removes all chars except A-Z, a-z, 0-9
    		$varName = preg_replace('/[^A-Za-z0-9]/', '', $var);
    	
    		//$varsArray[$varName] = $objWorksheet->getCellByColumnAndRow($column,$row)->getValue();
    		$vars .= '{{ varsArray.'.$varName.' | raw }}<br>';
    		 
    	}
        
        $jsonResponse['vars'] = $vars;
        
        $response = new Response(json_encode($jsonResponse));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    /**
     * Displays a form to edit an existing Projects entity.
     *
     * @Route("/template/{id}", name="projects_template")
     * @Method("GET")
     * @Template("AWSonyScriptBundle:Projects:template.html.twig")
     */
    public function templateAction($id)
    {
    	$em = $this->getDoctrine()->getManager('sonyscript');

        $entity = $em->getRepository('AWSonyScriptBundle:Projects')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Projects entity.');
        }
        
        //sets time limit for reading Excel file
        ini_set('max_execution_time', 300);//5 minutes
        //reads file to create variables array
        $inputFileName = __DIR__.'/../../../../web/uploads/awsonyscript/'.$entity->getFolder().'/OrgFiles/'.$entity->getSpreadsheet();
        
        switch (mime_content_type($inputFileName)) {
            case 'application/zip':
                //loads Excel2007 type xlsx
        		$objReader = \PHPExcel_IOFactory::createReader('Excel2007');
        		$fileType = 'Excel2007';
                break;
            case 'application/vnd.ms-excel':
            case 'application/vnd.ms-office':
        		//loads Excel2003 type xls
        		$objReader = \PHPExcel_IOFactory::createReader('Excel5');
        		$fileType = 'Excel5';
                break;
        }
        
        $objReader->setReadDataOnly(true);
        $objPHPExcel = $objReader->load($inputFileName);
        $objWorksheet = $objPHPExcel->setActiveSheetIndex(0);
		
		//save copy of ASF file with plain data
        $objWriter = \PHPExcel_IOFactory::createWriter($objPHPExcel, $fileType);
        $objWriter->save(__DIR__.'/../../../../web/uploads/awsonyscript/'.$entity->getFolder().'/OrgFiles/Copy_'.$entity->getSpreadsheet());
        
        //load copy of ASF
        $inputFileName = __DIR__.'/../../../../web/uploads/awsonyscript/'.$entity->getFolder().'/OrgFiles/'.$entity->getSpreadsheetCopy();
        
        $objReader = \PHPExcel_IOFactory::createReader($fileType);
        
        $objReader->setReadDataOnly(true);
        $objPHPExcel = $objReader->load($inputFileName);
        $objWorksheet = $objPHPExcel->setActiveSheetIndex(0);
        
        //variables not from excel file - to add just add it to array as where XXX is your variable name: '{{ varsArray.XXX | raw }}'
        //$varsArray = array('{{ varsArray.Alias | raw }}');
        
        //getting all own variables
        //$variables = $em->getRepository('AWSonyScriptBundle:Variables')->findBy(array('project_id' => $id ));
        
        //vars array
        $highestRow = $objWorksheet->getHighestRow();
    	for ($row = 1; $row <= $highestRow; ++$row) {
    			
    		$var = $objWorksheet->getCellByColumnAndRow(0,$row)->getValue();
    		
    		//removes all chars except A-Z, a-z, 0-9
    		$varName = preg_replace('/[^A-Za-z0-9]/', '', $var);
			    			
    		//vars form template
    		$varsArray[] = '{{ varsArray.'.$varName.' | raw }}';
    		//vars for logic 
    		$varsLogicArray[] = 'varsArray.'.$varName;
    			
    	}
    	
    	//get all languages from Excel file
    	//$highestColumn = $objWorksheet->getHighestColumn();
    	$highestColumn = $objWorksheet->getHighestColumn();
    	$highestColumn++;//add one column to get last column value
    	if ($highestColumn == 'A' || $highestColumn == 'B') {
    	    echo ("ASF file format error !!!<br>
    	    	   Please check your ASF file or upload new one.<br>
    	    	   <a href=\"/sonyscript/\">Back to list</a>");
    	    die;
    	}else {
    		for ($column = 'C'; $column != $highestColumn; $column++) {
    			 
    			$varLang = $objWorksheet->getCell($column.'1')->getValue();
    		
    			//removes all chars except A-Z, a-z, 0-9 and _
    			$varLangName = preg_replace('/[^A-Za-z0-9]_/', '', $varLang);
    		
    			//$varsArray[$varName] = $objWorksheet->getCellByColumnAndRow($column,$row)->getValue();
    			$langArray[] = $varLangName;
    			 
    		}
    		 
    		$mainDir = __DIR__.'/../../../../web/uploads/awsonyscript/'.$entity->getFolder().'/OrgFiles/';
    		$filename = __DIR__.'/../../../../web/uploads/awsonyscript/'.$entity->getFolder().'/OrgFiles/'.$entity->getTemplate();
    		$filenameCopy = __DIR__.'/../../../../web/uploads/awsonyscript/'.$entity->getFolder().'/OrgFiles/'.$entity->getTemplateCopy();
    		 
    		$handle = fopen($filename, "r");
    		$template = fread($handle, filesize($filename));
    		fclose($handle);
    		 
    		if (!file_exists($mainDir.$entity->getTemplateCopy())) {
    			$handleCopy = fopen($filenameCopy, "w");
    			ftruncate($handleCopy, 0);
    			$templateLogic = $entity->getLogic();
    			//fwrite($handleCopy, $templateLogic."\n".$template);
    			fwrite($handleCopy, $template);
    			fclose($handleCopy);
    		}else {
    			$templateLogic = $entity->getLogic();
    		}
    		 
    		/* $imagesDir = __DIR__.'/../../../../web/uploads/awsonyscript/'.$entity->getFolder().'/_html/images';
    		 $images = scandir($imagesDir);
    		$imagesFiles = array();
    		foreach($images as $file)
    		{
    		if (!is_dir("$imagesDir/$file"))
    		{
    		$imagesFiles[] = $file;
    		}
    		} */
    		 
    		$entitiesOwnVars = $em->getRepository('AWSonyScriptBundle:Variables')->findBy(array('project_id' => $id ));
    		$deleteForm = $this->createDeleteForm($entity->getId());
    		 
    		return array(
    				'entity' => $entity,
    				'languages' => unserialize($entity->getLanguages()),
    				'varsArray' => $varsArray,
    				'varsLogicArray' => $varsLogicArray,
    				'langArray' => $langArray,
    				'template' => $template,
    				'templateLogic' => $templateLogic,
    				'imagesCount' => count(self::getImagesArray($entity->getFolder())),
    				'ownVarables' => $entitiesOwnVars,
    				'delete_form' => $deleteForm->createView(),
    		);
    	}
    }
    
    /**
     * Get uploaded images array
     */
    public function getImagesArray($folder){
    	
    	$imagesDir = __DIR__.'/../../../../web/uploads/awsonyscript/'.$folder.'/_html/images';
    	$images = scandir($imagesDir);
    	$imagesFiles = array();
    	foreach($images as $file)
    	{
    		if (!is_dir("$imagesDir/$file"))
    		{
    			$imagesFiles[] = $file;
    		}
    	}
    	
    	return $imagesFiles;
    }
    
    /**
     * Displays a form to edit an existing Projects entity.
     *
     * @Route("/html/{id},{test}", name="projects_html")
     * @Method("POST")
     * @Template("AWSonyScriptBundle:Projects:html.html.twig")
     */
    public function htmlAction($id, $test)
    {
    	
    	$em = $this->getDoctrine()->getManager('sonyscript');

        $entity = $em->getRepository('AWSonyScriptBundle:Projects')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Projects entity.');
        }
        
        //sets time
        ini_set('max_execution_time', 300);//5 minutes
        //reads file
        $inputFileName = __DIR__.'/../../../../web/uploads/awsonyscript/'.$entity->getFolder().'/OrgFiles/'.$entity->getSpreadsheetCopy();
    	
        switch (mime_content_type($inputFileName)) {
            case 'application/zip':
                //loads Excel2007 type xlsx
        		$objReader = \PHPExcel_IOFactory::createReader('Excel2007'); 
                break;
            case 'application/vnd.ms-excel':
            case 'application/vnd.ms-office':
        		//loads Excel2003 type xls
        		$objReader = \PHPExcel_IOFactory::createReader('Excel5');
                break;
        }
        
        $objReader->setReadDataOnly(true);
        $objPHPExcel = $objReader->load($inputFileName);
        $objWorksheet = $objPHPExcel->setActiveSheetIndex(0);
         
        //array with rows and cols from spreadsheet
        $data = $objPHPExcel->getActiveSheet()->toArray(null,true,true,true);
        
        $entitiesOwnVars = $em->getRepository('AWSonyScriptBundle:Variables');
        
        $query = $entitiesOwnVars->createQueryBuilder('ownVars')
	        ->where('ownVars.project_id = :projectId')
	        ->setParameter('projectId', $id)
	        ->orderBy('ownVars.name', 'ASC')
	        ->getQuery();
        $ownVars = $query->getResult();
        
        if (!empty($ownVars)){
        	for ($i = 0; $i < count($ownVars); $i++) {
        		$varsArray[$ownVars[$i]->getName()] = $ownVars[$i]->getValue();
        	}
        }
        
        $htmlDir = __DIR__.'/../../../../web/uploads/awsonyscript/'.$entity->getFolder().'/_html/';
        
        if ($_POST["filesDel"]) {
	        foreach (glob($htmlDir."*.htm") as $filename) {
	        	unlink($filename);
	        }
        }
        
        //if ($test == '0') {
	        $highestColumn = $objWorksheet->getHighestColumn();
	        $highestColumn++;//add one column to get last column value
        	for ($column = 'C'; $column != $highestColumn; $column++) {
        		//for ($column = 0; $column <= $objWorksheet->getHighestColumn(); $column++) {
        		
        		if (in_array($data[1][$column], $_POST['langsArray'])) {
        			
        			//$filename = __DIR__.'/../../../../web/uploads/awsonyscript/'.$entity->getFolder().'/_html/'.$entity->getName().'_'.$data[1][$column].'.htm';
        			$filename = $htmlDir.$entity->getName().'_'.$data[1][$column].'.htm';
        			$fp = fopen($filename, 'w') or die("can't open file");
        			 
        			for ($row = 1; $row <= count($data); $row++) {
        			
        				//$varName = $objWorksheet->getCellByColumnAndRow(0,$row)->getValue();
        				$var = $data[$row]['A'];
        				//removes all chars except A-Z, a-z, 0-9
        				$varName = preg_replace('/[^A-Za-z0-9]/', '', $var);
        			
        				//$varsArray[$varName] = $objWorksheet->getCellByColumnAndRow($column,$row)->getValue();
        				$varsArray[$varName] = $data[$row][$column];
        			
        			}
        			 
        			//call external twig file
        			$loader = new \Twig_Loader_Filesystem( __DIR__.'/../../../../web/uploads/awsonyscript/'.$entity->getFolder().'/OrgFiles/' );
        			$twig = new \Twig_Environment($loader, array('cache' => false));
        			$template = $twig->render($entity->getTemplateCopy(), array('varsArray' => $varsArray));
        			 
        			fwrite($fp, $template);
        			fclose($fp);
        		}        	
        	}
        	
        	//store selected languages
        	//$entity->setLanguages(implode(",", $_POST['langsArray']));
        	$entity->setLanguages(serialize($_POST['langsArray']));
        	$em->persist($entity);
        	$em->flush();
        	
        	//copy all project files to share drive
        	//$mainDir = __DIR__.'/../../../../web/uploads/awsonyscript/'.$entity->getFolder();
        	//self::copyFiles($mainDir);
        	////
        	
        	//return $this->redirect($this->generateUrl('projects_show', array('id' => $entity->getId())));
        	$jsonResponse['id'] = $entity->getId();
        	
        	$response = new Response(json_encode($jsonResponse));
        	$response->headers->set('Content-Type', 'application/json');
        	return $response;
    }

    /**
     * Displays a form to edit an existing Projects entity.
     *
     * @Route("/{id}/edit", name="projects_edit")
     * @Method("GET")
     * @Template()
     */
    public function editAction($id)
    {
        $em = $this->getDoctrine()->getManager('sonyscript');

        $entity = $em->getRepository('AWSonyScriptBundle:Projects')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Projects entity.');
        }

        $editForm = $this->createForm(new ProjectsType(), $entity);
        $deleteForm = $this->createDeleteForm($id);

        return array(
            'entity'      => $entity,
            'edit_form'   => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Edits an existing Projects entity.
     *
     * @Route("/update/{id}", name="projects_update")
     * @Method("POST")
     * @Template("AWSonyScriptBundle:Projects:edit.html.twig")
     */
    public function updateAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager('sonyscript');

        $entity = $em->getRepository('AWSonyScriptBundle:Projects')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Projects entity.');
        }
		
        //root dir for sonyscript
        $dir = __DIR__.'/../../../../web/uploads/awsonyscript/';
        
        $dirExist = scandir($dir);
        
        $uniquePart = explode("_", $entity->getFolder());
        $newFolder = $_POST['newName'].'_'.end($uniquePart);
        
        //if (!array_search($newFolder, $dirExist)) {
        	
        	//rename project directory
	        rename($dir.$entity->getFolder(), $dir.$newFolder);
	        
	        $entity->setName($_POST['newName']);
	        $entity->setFolder($newFolder);
	        $entity->setNumber($_POST['newNumber']);
	        $entity->setAlias($_POST['newAlias']);
			
	        $em->persist($entity);
	        $em->flush();
	        
	        $jsonResponse['error'] = 0;
	        $jsonResponse['updated'] = $entity->getUpdated()->format('Y-m-d H:i:s');
	        $jsonResponse['folder'] = $entity->getFolder();
	        
        /* }else {
        	//project exists
        	$jsonResponse['error'] = 1;
        	
        } */
        
        $response = new Response(json_encode($jsonResponse));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    /**
     * Save logic for template
     *
     * @Route("/logic/{id}", name="projects_savelogic")
     * @Method("POST")
     * @Template()
     */
    public function logicAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager('sonyscript');

        $entity = $em->getRepository('AWSonyScriptBundle:Projects')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Projects entity.');
        }
		
        //root dir for sonyscript
        $dir = __DIR__.'/../../../../web/uploads/awsonyscript/';
        
        $dirExist = scandir($dir);
        
        $entity->setLogic(trim($this->get('request')->request->get('logicText')));
			
	    $em->persist($entity);
	    $em->flush();
	            
	    $jsonResponse['success'] = 1; 
	    
        $response = new Response(json_encode($jsonResponse));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    /**
     * Edits an existing Projects entity.
     *
     * @Route("/status/{id},{status}", name="projects_status")
     * @Method("POST")
     * @Template()
     */
    public function statusAction(Request $request, $id, $status)
    {
        $em = $this->getDoctrine()->getManager('sonyscript');

        $entity = $em->getRepository('AWSonyScriptBundle:Projects')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Projects entity.');
        }
		
        $entity->setStatus($status);
    	$em->persist($entity);
    	$em->flush();
        
        /* $response = new Response(json_encode($jsonResponse));
        $response->headers->set('Content-Type', 'application/json');
        return $response; */
    	exit();
    }
    
    /**
     * Lists searched Tests entities for Tests tab. Searches in all tests incl. archive
     *
     * @Route("/searchbox/{status},{text}", name="projects_search")
     * @Method("GET")
     * @Template()
     */
    public function searchAction($status, $text){
    	 
    	$em = $this->getDoctrine()->getManager('sonyscript');
    
    	$entities = $em->getRepository('AWSonyScriptBundle:Projects')->findAll();

    	$query = $em->createQuery('SELECT p FROM AWSonyScriptBundle:Projects p WHERE p.status=:status AND p.name LIKE :text')
    	->setParameters(array('text' => '%'.$text.'%', 'status' => $status));
    	$entities = $query->getResult();
    	
    	if (count($entities) != 0) {
    		$jsonResponse['html']=$this->renderView('AWSonyScriptBundle:Projects:listall.html.twig',array(
    				'entities' => $entities,
    		));
    	}else {
    		$jsonResponse['html']= '<div style="padding: 20px;font-weight: bold;">No projects found</div>';
    	}
    	 
    	$jsonResponse['status'] = $status;
    	
    	$response = new Response(json_encode($jsonResponse));
    	$response->headers->set('Content-Type', 'application/json');
    	return $response;
    }        

    /**
     * Deletes a Projects entity.
     *
     * @Route("/{id}", name="projects_delete")
     * @Method("DELETE")
     */
    public function deleteAction(Request $request, $id)
    {
        $form = $this->createDeleteForm($id);
        $form->bind($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager('sonyscript');
            $entity = $em->getRepository('AWSonyScriptBundle:Projects')->find($id);

            if (!$entity) {
                throw $this->createNotFoundException('Unable to find Projects entity.');
            }

            $em->remove($entity);
            $em->flush();
        }

        return $this->redirect($this->generateUrl('projects'));
    }

    /**
     * Creates a form to delete a Projects entity by id.
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
