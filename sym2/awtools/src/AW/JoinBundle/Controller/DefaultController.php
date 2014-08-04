<?php

namespace AW\JoinBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
/**
 * Projects controller.
 *
 * @Route("/join")
 */
class DefaultController extends Controller
{
    /**
     * @Route("/")
     * @Template()
     */
    public function indexAction()
    {
        return array();
    }
    /**
     * @Route("/save")
     * @Template()
     */
    public function saveAction()
    {
        //var_dump($_POST);
       // var_dump($_FILES['files']['name']);
  $countryname =    array(
  'cs_CZ' =>'czech republic',
  'da_DK' =>'denmark',
  'de_AT' =>'austria',
  'de_CH' =>'switzerland',
  'de_DE' =>'germany',
  'de_LU' =>'luxembourg',
  'el_GR' =>'greece',
  'en_AE' =>'united arab emirates',
  'en_AU' =>'australia',
  'en_GB' =>'united kingdom',
  'en_IE' =>'ireland',
  'en_IN' =>'india',
  'en_KW' =>'Kuwait',
  'en_NZ' =>'new zealand',
  'en_QA' =>'Qatar',
  'en_SA' =>'saudi arabia',
  'en_ZA' =>'south africa',
  'es_ES' =>'spain',
  'fi_FI' =>'finland',
  'fr_BE' =>'belgium',
  'fr_CH' =>'switzerland',
  'fr_FR' =>'france',
  'fr_LU' =>'luxembourg',
  'it_CH' =>'switzerland',
  'it_IT' =>'italy',
  'nl_BE' =>'belgium',
  'nl_NL' =>'the netherlands',
  'no_NO' =>'norway',
  'pl_PL' =>'poland',
  'pt_PT' =>'portugal',
  'ru_RU' =>'russia',
  'sv_SE' =>'sweden',
  'tr_TR' =>'turkey',
  );
  $countrylang =    array(
  'cs_CZ' =>'',
  'da_DK' =>'',
  'de_AT' =>'',
  'de_CH' =>'german',
  'de_DE' =>'',
  'de_LU' =>'german',
  'el_GR' =>'',
  'en_AE' =>'',
  'en_AU' =>'',
  'en_GB' =>'',
  'en_IE' =>'',
  'en_IN' =>'',
  'en_KW' =>'',
  'en_NZ' =>'',
  'en_QA' =>'',
  'en_SA' =>'',
  'en_ZA' =>'',
  'es_ES' =>'',
  'fi_FI' =>'',
  'fr_BE' =>'french',
  'fr_CH' =>'french',
  'fr_FR' =>'',
  'fr_LU' =>'french',
  'it_CH' =>'italian',
  'it_IT' =>'',
  'nl_BE' =>'dutch',
  'nl_NL' =>'',
  'no_NO' =>'',
  'pl_PL' =>'',
  'pt_PT' =>'',
  'ru_RU' =>'',
  'sv_SE' =>'',
  'tr_TR' =>'',
  );
    //echo $top = " %%[    ";
    $nl = "\n";
        $def_flag = 0;
        //echo count($countrylang);
        for($i = 0; $i< count($_FILES['files']['name']); $i++){

            $fileurl[$i] = $_FILES['files']['tmp_name'][$i];
            $file[$i] = $_FILES['files']['name'][$i];
            $cont_code = substr($file[$i], -14,5);
            $cntname = $countryname[$cont_code];
            echo " %%[    ";

            echo $nl.'/* '.$cntname.' ----------------------------------------------- '.$cont_code.' */';
            if($cont_code == 'en_GB'){
              $def_file = $fileurl[$i];
               $def_flag = 1;
              // echo 'GB does not exist';
               // die();
            }
            
            $country[substr($file[$i], -14,5)] = substr($file[$i], -14,5);
            if($i == 0 ){
                $if = "if";
            }else{
                $if = "elseif";
            }
           echo  $cont_text =$nl.$if." Lowercase(country) == \"".$countryname[$cont_code]."\" ";
            if($countrylang[$cont_code] != ''){
               echo $cont_text2 =  " AND Lowercase(language)== \"$countrylang[$cont_code]\" ";
            }
            echo $then = "
            THEN]%%
            ";
            
            echo $html_text = "\n" . file_get_contents($fileurl[$i])."\n";

        }
        if($def_flag == 0 ){
//            $def_file = ''
        }
        echo '%%['.$nl;
        echo '/* Default - United Kingdom --------------------------------- Default */'.$nl;
        echo $def = "
        Else
        ]%%
        ";
        if($def_flag == 1 ){
            echo $html_def = "\n" . file_get_contents($def_file)."\n";
        }else{
            echo $nl."Default GB Version - MISSING ".$nl;
        }
       echo  $bot = "
%%[EndIf]%%";
      exit();
    }
}
