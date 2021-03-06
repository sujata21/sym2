<?php

namespace Application\LDAPBundle\Command;

use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Bundle\SwiftmailerBundle\Swiftmailer;
use Application\LDAPBundle\Service\LDAPServer;
use Application\LDAPBundle\Entity\LDAPUser;
use Application\LDAPBundle\Entity\LDAPUserGroup;
use Application\LDAPBundle\Entity\LDAPGroup;

class PasswordAlertCommand extends ContainerAwareCommand {

    protected function configure()
    {
        $this
            ->setName('ldap:password:alert')
            ->setDescription('Import LDAP Users');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $em = $this->getContainer()->get('doctrine')->getEntityManager();
        
        $group = $em->getRepository('ApplicationLDAPBundle:LDAPGroup')->findOneByName(array('name' => 'nobody'));
        //echo $group->getName();
        $Nobodygroup = $em->getRepository('ApplicationLDAPBundle:LDAPUserGroup')->findBy(array('ldapGroup' => $group));
        $ignore_user = array();
        foreach($Nobodygroup as $nobody){
          array_push($ignore_user, $nobody->getLdapUser()->getId());
          //$ignore_user[] = $nobody->getLdapUser()->getId();
        }
       //  var_dump($ignore_user);
       // die();
        $users = $em->getRepository('ApplicationLDAPBundle:LDAPUser')->findBy(array('enabled' => 1));
        foreach($users as $user){
              //if(!is_array($user) || (is_array($user) && !isset($user[0]) )){
               // var_dump($user->getShadowLastChange()); die();


                  $shadowlastchange = $user->getShadowLastChange();
                  $startTimeStamp = strtotime("1970/01/01");
                  $endTimeStamp = strtotime(date("Y/m/d"));
                  $timeDiff = $endTimeStamp - $startTimeStamp;
                  $numberDays = $timeDiff / 86400;
                  $numberDays = intval($numberDays);
                  $expired = $numberDays - $shadowlastchange  ;
                  if($expired > 38){
                   // echo $user->getUsername();
                    $days_left = 45 - $expired;
                     // if($user->getId() == 8){

                          //echo $user->getUsername().'--'.$expired; echo "\n";
                    if (!in_array($user->getId(), $ignore_user)) {
                      //echo $user->getUsername(); echo "\n";
                        $this->emailAlert($user->getId(),$user->getEmail(),$days_left);
                    }
                    //}
                  }
           // }
        }

    }
    public function emailAlert($id,$email,$days_left)
    {
        //$to = $email;
        //echo 'sdfsf';
       $mailer = $this->getContainer()->get('mailer');
       //$to = 'spandey@alchemyworx.com';
       $to = $email;
        $subject = "Your password will expire soon. Please change it!";
        $body = "Please note that your password will expire in ".$days_left." days

        To change it, please login to http://intranet.alchemyworx.local 

        Or click the on link below
        
        http://intranet.alchemyworx.local/user_profile/change_password/id/".$id."
        
        This is an automated alert. Do not reply to this message";
        //var_dump(class_exists('Swift_Message'));
        $message = \Swift_Message::newInstance()
            ->setSubject($subject)
            ->setFrom(array('no-reply@alchemyworx.com'))
            ->setTo($to)
            ->setBody($body)
        ;
         $mailer->send($message);

        $spool = $mailer->getTransport()->getSpool();
        $transport = $this->getContainer()->get('swiftmailer.transport.real');

        $spool->flushQueue($transport);


    }
}