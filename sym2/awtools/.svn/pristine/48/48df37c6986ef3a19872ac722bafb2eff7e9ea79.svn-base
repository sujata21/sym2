<?php
namespace  AW\ProfanityBundle\Service;

use Symfony\Bundle\FrameworkBundle\Console\Application;
class MailChecker
{

    public function receive($username, $password, $hostname,$subject)
    {

        $inbox = imap_open($hostname,$username,$password) or die('Cannot connect to Gmail: ' .     imap_last_error());
        /* grab emails */
      //$subject = 'Test HTML - [C2K-UCID1663A-IT] Il nuovo MCU ridefinisce le prestazioni nelle applicazioni industriali di fascia alta';
        //$subject = str_replace(' ', '_', $subject);
       $subject =     preg_replace('/[^A-Za-z0-9]£/', ' ', trim($subject));
      //die();

       $emails = imap_search($inbox,'SUBJECT "'.$subject.'"');

        //var_dump($emails);//die();
        if($emails) {
            /* begin output var */
            $output = '';
            /* put the newest emails on top */
            rsort($emails);
            /* for every email... */
            foreach($emails as $email_number) {
                /* get information specific to this email */
                $overview = imap_fetch_overview($inbox,$email_number,0);
                $message = imap_body($inbox,$email_number);
                //echo '<pre>';
               // var_dump($message); echo '</pre>'; die();
                /* output the email header information */
               // $output.= '<div class="toggler '.($overview[0]->seen ? 'read' : 'unread').'">';
               // $output.= '<span class="subject">subject'.$overview[0]->subject.'</span> ';
               // $output.= '<span class="from">'.$overview[0]->from.'</span>';
               // $output.= '<span class="date">on '.$overview[0]->date.'</span>';
               // $output.= '</div>';
                /* output the email body */
                $output.= '<div class="body">'.$message.'</div>';
                
            }

           echo $message;
            //$array = array('try','W3 6RS','Registered');
            $res = $this->BadWordFilter($message);

           
         
            imap_close($inbox);
            return $res;
        }

        /* close the connection */


    }
    public function BadWordFilter($text)
{
    //profanity check
    //echo $text;
    $dir = __DIR__.'/../../../../web/bundles/awprofanity/images/filterWords.csv';
            $file = fopen($dir,"r");
            $filter = fgetcsv($file);
            fclose($file);
    $count = 0;
    $res_str = '';
    //we are just checking
    for($i=0;$i<sizeof($filter);$i++) {  
       $word = $filter[$i];
        if(eregi($word,$text)) {
            $res_str .= 'This word exist in the email ... => '.$word;
            $res_str .= "<br />";
            $count = $count + 1;
        }
         //if we find any, return 1
    }
    
    // spam check function call
    $spam_str = $this->spamCheck($text);

    // spam check function call
    $spell_str = $this->spellCheck($text);
   // echo $text;
    if($count >0 ){
        $prof_str =  $res_str;
    }else{
        $prof_str =  'The Email Successfully passed the test!!';
    }

    return $prof_str.'~'.$spam_str.'~'.$spell_str;
    

}
public function spamCheck($text){
    //echo $text;
    $dir = __DIR__.'/../../../../web/bundles/awprofanity/images/spamWords.csv';
            $file = fopen($dir,"r");
            $filter = fgetcsv($file);
            fclose($file);
    $scount = 0;
    $res_str = '';
    //we are just checking
    //echo eregi('save',$text);
    for($i=0;$i<sizeof($filter);$i++) {  
       $word = $filter[$i];

        if(eregi($word,$text)) {
            $res_str .= 'This spam word exist in the email ... => '.$word;
            $res_str .= "<br />";
            $scount = $scount + 1;
        }
         //if we find any, return 1
    }
    if($scount >0 ){
        return $res_str;
    }else{
        return 'The Email Successfully passed the spam check!!';
    }
}

    public function spellCheck($text){
        
        return $text;


    }

}