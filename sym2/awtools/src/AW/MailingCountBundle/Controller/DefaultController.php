<?php

namespace AW\MailingCountBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\DomCrawler\Crawler;
use Symfony\Component\Config\FileLocator;
/**
 * Projects controller.
 *
 * @Route("/mailingcount")
 */
class DefaultController extends Controller
{
    /**
     * @Route("/")
     * @Template()
     */
    public function indexAction()
    {
        
         //die();
        // echo date('H:i:s') . " Write to Excel5 format\n";
        $fileLocator = new FileLocator ( __DIR__ . '/../../MailingCountBundle/Resources/public/css' );
        $xl_file = $fileLocator->locate ( 'avi_p14608_acq_ch_052014_rm1.xlsx' ); //avi_p14526_surprise_april2_CRF

        $objReader = \PHPExcel_IOFactory::createReader('Excel2007');
        $objReader->setReadDataOnly(true);
       
         //$worksheet = array();
         $worksheet = $objReader->listWorksheetNames($xl_file);
         // echo '<pre>';
       // var_dump($worksheet);
        //echo '</pre>';
         
        foreach ($worksheet as $sheetkey => $sheetname) {
            # code...
            if((strpos($sheetname, 'Car') !== false) || (strpos($sheetname, 'Home') !== false)){
               // echo $sheetname;
                $objReader->setLoadSheetsOnly($sheetname);
                $objPHPExcel = $objReader->load($xl_file);
                //echo '<pre>';
                $sheetstate = $objPHPExcel->getActiveSheet()->getsheetstate();
                //echo '</pre>';
                $sheetData = $objPHPExcel->getActiveSheet()->toArray(null,true,true,true);
                $info = array();
                $countkey = 0;
                if($sheetstate == 'visible'){
                    foreach ($sheetData as $key => $value) {
                        if($value['B'] == 'Expected count'){
                            $countkey =  $key+1;
                            //echo $sheetData[$countkey]['B'];
                            //echo "\n";
                        }
                   // echo $sheetData[$countkey];
            
                    foreach ($value as $key1 => $value1) {
                        if($value1 == 'Mailing name'){
                            $info['mailingname'] = $value['C'];
                        }
                        if($value1 == 'Data Source'){
                            $info['datasource'] = $value['C'];
                        }        
                        //echo $key1 .'=>'. $value1;
                        //echo "\n";
                    }
                }
                $info['mailingcount'] = $sheetData[$countkey]['B'];
               $sheetinfo[$sheetname] = $info; 
                }
                
            }
        }
                //echo '<pre>';
                //var_dump($sheetinfo);
                //echo '</pre>';
        //die();
                    
        
        return array('info' => $sheetinfo);
    }
    /**
     * @Route("/save")
     * @Template()
     */
    public function saveAction()
    {
        if(isset($_FILES['file'])){
             $xl_file = $_FILES['file']['tmp_name'];
        
        //$fileLocator = new FileLocator ( __DIR__ . '/../../MailingCountBundle/Resources/public/css' );
       // $xl_file = $fileLocator->locate ( 'avi_p14608_acq_ch_052014_rm1.xlsx' ); //avi_p14526_surprise_april2_CRF

        $objReader = \PHPExcel_IOFactory::createReader('Excel2007');
        $objReader->setReadDataOnly(true);
       
         //$worksheet = array();
         $worksheet = $objReader->listWorksheetNames($xl_file);
         // echo '<pre>';
       // var_dump($worksheet);
        //echo '</pre>';
         
        foreach ($worksheet as $sheetkey => $sheetname) {
            # code...
            if((strpos($sheetname, 'Car') !== false) || (strpos($sheetname, 'Home') !== false)){
               // echo $sheetname;
                $objReader->setLoadSheetsOnly($sheetname);
                $objPHPExcel = $objReader->load($xl_file);
                
                $sheetstate = $objPHPExcel->getActiveSheet()->getsheetstate();
               
                $sheetData = $objPHPExcel->getActiveSheet()->toArray(null,true,true,true);
                $info = array();
                $countkey = 0;
                if($sheetstate == 'visible'){
                    /*echo '<pre>';
                    var_dump($sheetData); 
                     echo '</pre>';*/
                    foreach ($sheetData as $key => $value) {
                        if($value['B'] == 'Expected count'){
                            $countkey =  $key+1;
                            //echo $sheetData[$countkey]['B'];
                            //echo "\n";
                        }
                   // echo $sheetData[$countkey];
            
                    foreach ($value as $key1 => $value1) {
                        if($value1 == 'Mailing name'){
                            $info['mailingname'] = $value['C'];
                        }
                        if($value1 == 'Data Source'){
                            $info['datasource'] = $value['C'];
                        }        
                        //echo $key1 .'=>'. $value1;
                        //echo "\n";
                    }
                }
                $info['mailingcount'] = $sheetData[$countkey]['C'];
               $sheetinfo[$sheetname] = $info; 
                }
                
            }
        }
        //die();
        $res_str="";
        foreach ($sheetinfo as $info) {
           
        $res_str = $res_str."<tr><td>".$info['mailingname']." </td><td>".$info['datasource']." </td><td>".$info['mailingcount']." </td></tr>";

        }
        echo $res_str;
       
        exit;
        }
    }
}
