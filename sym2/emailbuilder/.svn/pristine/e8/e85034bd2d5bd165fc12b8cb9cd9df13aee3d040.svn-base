<?php

namespace Application\TemplateBundle\Utils;
use Symfony\Component\DomCrawler\Crawler;
/**
 * Miscilaneous reuseable code
 *
 * @author Daniel Leech <daniel@dantleech.com>
 */
class EmailUtils
{
    /**
     * @todo: I wonder if this should be pushed back
     *        to some cmf/commons library.
     */
    public static function slugify($string)
    {
        // internationally safe slugs
        setlocale(LC_CTYPE, 'fr_FR.UTF8');
        $clean = iconv('UTF-8', 'ASCII//TRANSLIT', $string);
        $clean = str_replace('amp', 'and ', $clean);
        $clean = strip_tags($clean);
        $clean = preg_replace("/[^a-zA-Z0-9\/_|+ -]/", '', $clean);
        $clean = strtolower(trim($clean, '-'));
        $clean = preg_replace("/[\/_|+ -]+/", '-', $clean);

        if (substr($clean, -1) == '-') {
            $clean = substr($clean, 0, -1);
        }

        return $clean;
    }
    public static function formatDate($val , $type){
        $date_val = date("Y-m-d H:i:s", strtotime($val));
        if($type == 'to'){
            $date_val = date("Y-m-d H:i:s", strtotime($val.'+1 day'));
        }
        return $date_val;
    }
    public static function checkUrl($url){
        
        //$agent = "Mozilla/4.0 (compatible; MSIE 5.01; Windows NT 5.0)";
        //Mozilla/5.0 (iPhone; CPU iPhone OS 7_0_4 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11B554a Safari/9537.53
        //Mozilla/5.0 (Linux; U; Android 4.3; en-gb; GT-I9300 Build/JSS15J) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30
        //Mozilla/5.0 (iPad; CPU OS 7_0_4 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11B554a Safari/9537.53
        //Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; NOKIA; Lumia 925)
       // $agent = $_POST['userAgent'];
        $ch = curl_init($url);
        
        $options = array(
            CURLOPT_RETURNTRANSFER => true,     // return web page
            CURLOPT_HEADER         => true,    // don't return headers
            CURLOPT_FOLLOWLOCATION => true,     // follow redirects
            //CURLOPT_ENCODING       => "",       // handle all encodings
           // CURLOPT_USERAGENT      => $agent, // who am i
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
    public static function getAlt($var){

        $crawler = new Crawler($var);
        $count = $crawler->filter('img')->count();
        if($count > 0 ){
            $alt = $crawler->filter('img')->attr('alt');

        }else{
            $alt = 'TBC';
        }
        
        return $alt;
    }
    public static function getSrc($var){

        $crawler = new Crawler($var);
        $count = $crawler->filter('img')->count();
        if($count > 0 ){
            $src = $crawler->filter('img')->attr('src');
        }else{
            $src = 'TBC';
        }
        
        return $src;
    }
    public static function getLink($var){

        $crawler = new Crawler($var);
        $count = $crawler->filter('a')->count(); //die();
        if($count > 0 ){
            $href = $crawler->filter('a')->attr('href');
        }else{
            $href = '#';
        }
        return $href;
    }
    public static function getStyle($var){

        $crawler = new Crawler($var);
        $count = $crawler->filter('span')->count(); //die();
        if($count > 0 ){
             $style = $crawler->filter('span')->attr('style');
             $style_arr = explode(':', $style);
             $style = $style_arr[1];
        }else{
            $style = 'null';
        }
        //var_dump($style);
        return $style;
    }
    public static function getTitle($var){

        $crawler = new Crawler($var);
        $count = $crawler->filter('span')->count();
        $a_count = $crawler->filter('a')->count(); //die();
        if($count > 0 ){
            $title = $crawler->filter('span')->text();
        }elseif($a_count > 0){
            $title = $crawler->filter('a')->text();
        }else{
            $title = $var;
        }
        return $title;
    }
    public static function getEmaildata($event,$template){

        //echo 'test';//$event->banner1;
        $title = array();
        $image = array();
        $cta = array();
        $title = array();
        $background='';
        
        if($template == 'touchstone'){
            $title['title1']['value'] =EmailUtils::getTitle($event->title1);
            $title['title2']['value'] =EmailUtils::getTitle($event->title2);
            $title['title3']['value'] =EmailUtils::getTitle($event->title3);
            $title['title4']['value'] =EmailUtils::getTitle($event->title4);
            $title['title4']['link'] =EmailUtils::getLink($event->cta4);

        }elseif(($template == 'touchstone2') || ($template == 'touchstone3') || ($template == 'touchstone4') ){
            $title['menu1']['value'] =EmailUtils::getTitle($event->menu_text1);
            $title['menu2']['value'] =EmailUtils::getTitle($event->menu_text2);
            $title['menu3']['value'] =EmailUtils::getTitle($event->menu_text3);
            $title['menu1']['link'] =EmailUtils::getLink($event->menu_text1);
            $title['menu2']['link'] =EmailUtils::getLink($event->menu_text2);
            $title['menu3']['link'] =EmailUtils::getLink($event->menu_text3);
            $title['cta1']['link'] =EmailUtils::getLink($event->cta1_link);
            $title['cta2']['link'] =EmailUtils::getLink($event->cta2_link);
            $title['cta3']['link'] =EmailUtils::getLink($event->cta3_link);
            $title['cta1']['value'] =EmailUtils::getTitle($event->cta1);
            $title['cta2']['value'] =EmailUtils::getTitle($event->cta2);
            $title['cta3']['value'] =EmailUtils::getTitle($event->cta3);

            //$title['title1']['link'] =EmailUtils::getLink($event->cta1_link);
            //$title['title2']['link'] =EmailUtils::getLink($event->cta2_link);
           // $title['title3']['link'] =EmailUtils::getLink($event->cta3_link);
            $image['hero']['src'] = EmailUtils::getSrc($event->hero);

        }else{
             $image['image1']['src'] = EmailUtils::getSrc($event->image1); 
        $image['image1']['alt'] = EmailUtils::getAlt($event->image1);
        $image['image1']['link'] = EmailUtils::getLink($event->image1);

        $image['image2']['src'] = EmailUtils::getSrc($event->image2); 
        $image['image2']['alt'] = EmailUtils::getAlt($event->image2);
        $image['image2']['link'] = EmailUtils::getLink($event->image2);
        $cta['title2']['color'] = EmailUtils::getStyle($event->title2);
        //echo $event->title2;
        $title['title2']['value'] =EmailUtils::getTitle($event->title2);

        $image['image3']['src'] = EmailUtils::getSrc($event->image3); 
        $image['image3']['alt'] = EmailUtils::getAlt($event->image3);
        $image['image3']['link'] = EmailUtils::getLink($event->image3);
        $cta['title3']['color'] = EmailUtils::getStyle($event->title3);
        $title['title3']['value'] = EmailUtils::getTitle($event->title3);
        //die();

        $image['image4']['src'] = EmailUtils::getSrc($event->image4); 
        $image['image4']['alt'] = EmailUtils::getAlt($event->image4);
        $image['image4']['link'] = EmailUtils::getLink($event->image4);
        $cta['title4']['color'] = EmailUtils::getStyle($event->title4);
        $title['title4']['value'] = EmailUtils::getTitle($event->title4);

        $image['image5']['src'] = EmailUtils::getSrc($event->image5);
        $image['image5']['alt'] = EmailUtils::getAlt($event->image5); 
        $image['image5']['link'] = EmailUtils::getLink($event->image5);
        $cta['title5']['color'] = EmailUtils::getStyle($event->title5);
        $title['title5']['value'] = EmailUtils::getTitle($event->title5);

        $image['image6']['src'] = EmailUtils::getSrc($event->image6);
        $image['image6']['alt'] = EmailUtils::getAlt($event->image6);
        $image['image6']['link'] = EmailUtils::getLink($event->image6); 
        $cta['title6']['color'] = EmailUtils::getStyle($event->title6);
        $title['title6']['value'] = EmailUtils::getTitle($event->title6);

        if(stristr($template , 'zsl') == 'zsl'){
            $image['banner1']['src'] = EmailUtils::getSrc($event->banner1);
            $image['banner1']['alt'] = EmailUtils::getAlt($event->banner1);
            $image['banner1']['link'] = EmailUtils::getLink($event->banner1); 
            
            $image['banner2']['src'] = EmailUtils::getSrc($event->banner2);
            $image['banner2']['alt'] = EmailUtils::getAlt($event->banner2); 
            $image['banner2']['link'] = EmailUtils::getLink($event->banner2); 
            
            $image['image_block1']['src'] = EmailUtils::getSrc($event->image_block1);
            $image['image_block1']['alt'] = EmailUtils::getAlt($event->image_block1);
            $image['image_block1']['link'] = EmailUtils::getLink($event->image_block1); 
            
            $image['image_block2']['src'] = EmailUtils::getSrc($event->image_block2);
            $image['image_block2']['alt'] = EmailUtils::getAlt($event->image_block2);
            $image['image_block2']['link'] = EmailUtils::getLink($event->image_block2); 
            
            $image['image_block3']['src'] = EmailUtils::getSrc($event->image_block3);
            $image['image_block3']['alt'] = EmailUtils::getAlt($event->image_block3);
            $image['image_block3']['link'] = EmailUtils::getLink($event->image_block3);
            
            $image['image_block4']['src'] = EmailUtils::getSrc($event->image_block4);
            $image['image_block4']['alt'] = EmailUtils::getAlt($event->image_block4);
            $image['image_block4']['link'] = EmailUtils::getLink($event->image_block4);
            
            $image['image_block5']['src'] = EmailUtils::getSrc($event->image_block5);
            $image['image_block5']['alt'] = EmailUtils::getAlt($event->image_block5);
            $image['image_block5']['link'] = EmailUtils::getLink($event->image_block5);
            
            $image['image_block6']['src'] = EmailUtils::getSrc($event->image_block6);
            $image['image_block6']['alt'] = EmailUtils::getAlt($event->image_block6);
            $image['image_block6']['link'] = EmailUtils::getLink($event->image_block6);

            $image['image7']['src'] = EmailUtils::getSrc($event->image7);
            $image['image7']['alt'] = EmailUtils::getAlt($event->image7);
            $image['image7']['link'] = EmailUtils::getLink($event->image7); 
            $cta['title7']['color'] = EmailUtils::getStyle($event->title7);
            $title['title7']['value'] = EmailUtils::getTitle($event->title7);

            $image['image8']['src'] = EmailUtils::getSrc($event->image8);
            $image['image8']['alt'] = EmailUtils::getAlt($event->image8);
            $image['image8']['link'] = EmailUtils::getLink($event->image8); 
            $cta['title8']['color'] = EmailUtils::getStyle($event->title8);
            $title['title8']['value'] = EmailUtils::getTitle($event->title8);

            $image['image9']['src'] = EmailUtils::getSrc($event->image9);
            $image['image9']['alt'] = EmailUtils::getAlt($event->image9);
            $image['image9']['link'] = EmailUtils::getLink($event->image9); 
            $cta['title9']['color'] = EmailUtils::getStyle($event->title9);
            $title['title9']['value'] = EmailUtils::getTitle($event->title9);
            $background = '';

        }else{
            $image['signature']['src'] = EmailUtils::getSrc($event->signature); 
            $image['signature']['alt'] = EmailUtils::getAlt($event->signature); 
            $image['banner']['src'] = EmailUtils::getSrc($event->banner);
            $image['banner']['alt'] = EmailUtils::getAlt($event->banner);
            $background = $event->background; 
        }
       
        }
       

        
        

        $result = array(
                'event' => $event,
                'image' =>$image,
                'cta'   =>$cta,
                'title' =>$title,
                'background'=>$background,
                );
        return $result;
    }
    public static function createImage($path,$content,$type){
        // echo $type; 
         $dir_root = $_SERVER['DOCUMENT_ROOT'];
         // create a temp html file 
         $tmpfname = tempnam(sys_get_temp_dir(), 'test.html'); 
         $handle = fopen($tmpfname, "w");
         fwrite($handle, $content); 
         
         //move the file to html file
         $command =  "mv ".$tmpfname." /tmp/".$path.".html";
         exec($command);
         //give permission to file
         $file = '/tmp/'.$path.'.html';
         $per = "chmod(".$file.", 0777)";
         exec($per);
         //create snapshot in web/uploads
         $imagepath = $dir_root.'/uploads/'.$type.$path.'.jpg';
          $snap = "phantomjs  ".$dir_root."/bundles/applicationmain/js/rasterize.js ".$file." ".$imagepath;
         exec($snap);

         return $imagepath;
    }
    public static function createBBC($email_obj,$template_obj){
            $email_obj->signature = $template_obj->signature;
            $email_obj->banner = $template_obj->banner;
            $email_obj->summary_body = $template_obj->summary_body;
           // $email_obj->template = $template_obj->title;
            $email_obj->body = $template_obj->body;

            $email_obj->title1 = $template_obj->title1;
            $email_obj->image1 = $template_obj->image1;
            $email_obj->cta1 = $template_obj->cta1;
            $email_obj->summary_body1 = $template_obj->summary_body1;

            $email_obj->title2 = $template_obj->title2;
            $email_obj->image2 = $template_obj->image2;
            $email_obj->cta2 = $template_obj->cta2;
            $email_obj->summary_body2 = $template_obj->summary_body2;

            $email_obj->title3 = $template_obj->title3;
            $email_obj->image3 = $template_obj->image3;
            $email_obj->cta3 = $template_obj->cta3;
            $email_obj->summary_body3 = $template_obj->summary_body3;

            $email_obj->title4 = $template_obj->title4;
            $email_obj->image4 = $template_obj->image4;
            $email_obj->cta4 = $template_obj->cta4;
            $email_obj->summary_body4 = $template_obj->summary_body4;

            $email_obj->title5 = $template_obj->title5;
            $email_obj->image5 = $template_obj->image5;
            $email_obj->cta5 = $template_obj->cta5;
            $email_obj->summary_body5 = $template_obj->summary_body5;

            $email_obj->title6 = $template_obj->title6;
            $email_obj->image6 = $template_obj->image6;
            $email_obj->cta6 = $template_obj->cta6;
            $email_obj->summary_body6 = $template_obj->summary_body6;

            $email_obj->background = $template_obj->background; 
            return $email_obj;

     }
     public static function createZSL($email_obj,$template_obj){
            
            $email_obj->banner1 = $template_obj->banner1;
            $email_obj->banner2 = $template_obj->banner2;
           // $email_obj->templatepath = $template_obj->path;
            

            $email_obj->title1 = $template_obj->title1;
            $email_obj->image1 = $template_obj->image1;
            $email_obj->cta1 = $template_obj->cta1;
            $email_obj->summary1 = $template_obj->summary1;

            $email_obj->title2 = $template_obj->title2;
            $email_obj->image2 = $template_obj->image2;
            $email_obj->cta2 = $template_obj->cta2;
            $email_obj->summary2 = $template_obj->summary2;

            $email_obj->title3 = $template_obj->title3;
            $email_obj->image3 = $template_obj->image3;
            $email_obj->cta3 = $template_obj->cta3;
            $email_obj->summary3 = $template_obj->summary3;

            $email_obj->title4 = $template_obj->title4;
            $email_obj->image4 = $template_obj->image4;
            $email_obj->cta4 = $template_obj->cta4;
            $email_obj->summary4 = $template_obj->summary4;

            $email_obj->title5 = $template_obj->title5;
            $email_obj->image5 = $template_obj->image5;
            $email_obj->cta5 = $template_obj->cta5;
            $email_obj->summary5 = $template_obj->summary5;

            $email_obj->title6 = $template_obj->title6;
            $email_obj->image6 = $template_obj->image6;
            $email_obj->cta6 = $template_obj->cta6;
            $email_obj->summary6 = $template_obj->summary6;

            $email_obj->title7 = $template_obj->title7;
            $email_obj->image7 = $template_obj->image7;
            $email_obj->cta7 = $template_obj->cta7;
            $email_obj->summary7 = $template_obj->summary7;

            $email_obj->title8 = $template_obj->title8;
            $email_obj->image8 = $template_obj->image8;
            $email_obj->cta8 = $template_obj->cta8;
            $email_obj->summary8 = $template_obj->summary8;

            $email_obj->title9 = $template_obj->title9;
            $email_obj->image9 = $template_obj->image9;
            $email_obj->cta9 = $template_obj->cta9;
            $email_obj->summary9 = $template_obj->summary9;

            $email_obj->image_block1 = $template_obj->image_block1;
            $email_obj->image_block2 = $template_obj->image_block2;
            $email_obj->image_block3 = $template_obj->image_block3;
            $email_obj->image_block4 = $template_obj->image_block4;
            $email_obj->image_block5 = $template_obj->image_block5;
            $email_obj->image_block6 = $template_obj->image_block6;
            return $email_obj;
           

     }
     public static function createTouchstone($email_obj,$template_obj){
            
            $email_obj->title1 = $template_obj->title1;
            

            $email_obj->title2 = $template_obj->title2;
            
            $email_obj->title3 = $template_obj->title3;
            

            $email_obj->title4 = $template_obj->title4;
            
           //echo $template_obj->cta4; die();
            $email_obj->cta4 = $template_obj->cta4;

            return $email_obj;

     }
     public static function createTouchstone2($email_obj,$template_obj){
            
            //echo 'template'.$template_obj->title1; die();
            $email_obj->title1 = $template_obj->title1;
            $email_obj->summary1 = $template_obj->summary1;
            $email_obj->cta1 = $template_obj->cta1;
            $email_obj->cta1_link = $template_obj->cta1_link;
            

            $email_obj->title2 = $template_obj->title2;
            $email_obj->summary2 = $template_obj->summary2;
            $email_obj->cta2 = $template_obj->cta2;
            $email_obj->cta2_link = $template_obj->cta2_link;
            
            $email_obj->title3 = $template_obj->title3;
            $email_obj->summary3 = $template_obj->summary3;
            $email_obj->cta3 = $template_obj->cta3;
            $email_obj->cta3_link = $template_obj->cta3_link;
                     
            
            //$email_obj->hero = $template_obj->hero;
            $email_obj->header = $template_obj->header;
            $email_obj->menu_text1 = $template_obj->menu_text1;
            $email_obj->menu_text2 = $template_obj->menu_text2;
            $email_obj->menu_text3 = $template_obj->menu_text3;
            $email_obj->hero = $template_obj->hero;

           /* if($email_obj->template == 'touchstone3'){
                $email_obj->hero = '<img style="display:block" border="0" src="http://placehold.it/270x200" />';
            }elseif($email_obj->template == 'touchstone4'){
                $email_obj->hero = '<img style="display:block" border="0" src="http://placehold.it/570x200" class="w280" />';
            }else{
                $email_obj->hero = $template_obj->hero;
            }*/
          // echo $email_obj->hero;
            return $email_obj;

     }




}
