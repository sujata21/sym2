<?php
/*
Usage of EmailParser:

$parser = new \MS\Email\Parser\Parser();
$message = $parser->parse($email);

// address object
$message->getFrom();

// email address
$message->getFrom()->getAddress();

// name if given
$message->getFrom()->getName();

// date sent
$message->getDate()

// date sent as DateTime object (PHP 5.3+)
$message->getDateAsDateTime()

// date sent in format: Tue, 19 Mar 2013 11:20:56
$message->getDate()

// string
$message->getSubject();

// decoded plain text part
$message->getTextBody();

// decoded html body part
$message->getHtmlBody();

// attachments
$attachments = $message->getAttachments();
// attachment object
$attachments[0]
// methods
$attachments[0]->getFilename();
$attachments[0]->getMimeType();
// decoded attachment content
$attachments[0]->getContent();

*/

namespace Application\HelpDeskBundle\Command;

//use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Console\Command\Command;
use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Application\HelpDeskBundle\Entity\Ticket;
use Application\HelpDeskBundle\Form\TicketType;
use Application\HelpDeskBundle\Entity\TicketIssue;
use Application\Sonata\UserBundle\Entity\User;
use Application\HelpDeskBundle\CustomClass\Email\Parser as EmailParser;


class MailPipeCommand extends ContainerAwareCommand
{
    /*protected function configure()
    {
        $this
        ->setName('import:mailpipe')
        ->setDescription('Import emails ')
        ->addArgument(
            'url',
            InputArgument::OPTIONAL,
            'Who do you want to greet?'
        )
        ->addOption(
            'yell',
            null,
            InputOption::VALUE_NONE,
            'If set, the task will yell in uppercase letters'
        );
    }*/

    protected function configure()
    {
        $this
            ->setName('import:mailpipe')
            ->setDescription('Import email messages');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $fd = fopen("php://stdin", "r");
        $email = "";
        while (!feof($fd)) {
            $email .= fread($fd, 1024);
        }
        fclose($fd);

        $parser = new EmailParser();
        $message = $parser->parse($email);

        $from = $message->getFrom()->getAddress();
        $to = $message->getTo();
        $subject = $message->getSubject();
        $content = $message->getTextBody();
        if (empty($content)) {
            $content = $message->getHtmlBody();
        }
        $attachments = $message->getAttachments();

        print_r($attachments);
        die;
        /*print_r($message->getFrom()->getAddress());
        die;*/

        /*if ( strpos($email, 'In-Reply-To:') > -1 ) {

            $inContent = false;
            $message = "";

            $file_handle = fopen("email2", "r");
            while (!feof($file_handle)) {
                $line = fgets($file_handle);
                if ( strpos($line, 'From:') > -1 ) {
                    $from = strstr($line, 'From:');
                }

                if ( strpos($line, 'Subject:') > -1 ) {
                    $subject = strstr($line, 'Re:');
                    $temp = explode('Re: ', $subject);
                    $subject = $temp[1];
                    unset($temp);
                }

                if ( strpos($line, 'Content-Type: text/html;') > -1 ) {
                    $inContent = false;
                }
                if ($inContent) {
                    $message.=$line;
                }
                if ( strpos($line, 'Content-Type: text/plain;') > -1 ) {
                    $inContent = true;
                }
            }
            fclose($file_handle);

        }else{

            $mail = mailparse_msg_create();
            mailparse_msg_parse($mail,$email);
            $struct = mailparse_msg_get_structure($mail);

            $info = array();
            foreach($struct as $st) {
                $section = mailparse_msg_get_part($mail, $st);
                $info[] = mailparse_msg_get_part_data($section);
            }

            $from 	  = $info[0]['headers']['from'];
            $subject  = $info[0]['headers']['subject'];

            if(!isset($info[0]['content-boundary'])){
                $startPos = $info[0]['starting-pos-body'];
                $endPos   = $info[0]['ending-pos-body'];
                $length = $endPos - $startPos;
                $message = substr($email, $startPos, $length);
            } elseif(isset($info[0]['content-boundary']) && isset($info[1])){
                $startPos = $info[1]['starting-pos-body'];
                $endPos   = $info[1]['ending-pos-body'];
                $length = $endPos - $startPos;
                $message = substr($email, $startPos, $length);
                $len = strlen($info[1]['content-boundary']) + 3;
                $pos = strpos($message, $info[1]['content-boundary'], $len);
                $pos = $pos - ($len + 3);
                $message = substr($message, $len, $pos);
            }

        }*/

        //echo $subject;

        $em = $this->getContainer()->get('doctrine')->getEntityManager();

        $temp = explode('@', $from);
        $username = explode('<', $temp[0]);

        $entityUser = $em->getRepository('ApplicationSonataUserBundle:User')->findOneBy(array('username' => $username[0]));

        if (!is_object($entityUser)) {
        	$entityUser = $em->getRepository('ApplicationSonataUserBundle:User')->findOneBy(array('username' => 'admin'));
        }

        switch ($subject) {
        	case strpos($subject, 'RE:') > -1:
        		$subject = substr($subject, strpos($subject, 'RE:') + 3);
        		break;
        	case strpos($subject, 'RE') > -1:
        		$subject = substr($subject, strpos($subject, 'RE') + 2);
        		break;
        	case strpos($subject, 'FW:') > -1:
        		$subject = substr($subject, strpos($subject, 'RE:') + 3);
        		break;
        	case strpos($subject, 'FW') > -1:
        		$subject = substr($subject, strpos($subject, 'RE') + 2);
        		break;
        }

        $entityTicket = $em->getRepository('ApplicationHelpDeskBundle:Ticket')->findOneBy(array('subject' => trim($subject), 'from_email' => $from));

        /*print_r($username[0]);
        die;*/

        if (is_object($entityTicket)) { //ticket exists
        	$newTicketIssue = new TicketIssue();

            $newTicketIssue->setTicket($entityTicket);
            $newTicketIssue->setSubmittedBy($entityUser);
            $newTicketIssue->setMessage($content);
            $newTicketIssue->setCreatedAt(new \DateTime());

            $em->persist($newTicketIssue);
            $em->flush();
        }else { //ticket doesn't exist
        	$newTicket = new Ticket();
            
            $entityStatus = $em->getRepository('ApplicationHelpDeskBundle:Status')->findOneBy(array('name' => 'Open'));

            $newTicket->setSubmittedBy($entityUser);
            $newTicket->setStatus($entityStatus);
            $newTicket->setSubject(trim($subject));
            $newTicket->setFromEmail($from);
            $newTicket->setCreatedAt(new \DateTime());
            $newTicket->setUpdatedAt(new \DateTime());

            $newTicketIssue = new TicketIssue();

            $newTicketIssue->setTicket($newTicket);
            $newTicketIssue->setSubmittedBy($entityUser);
            $newTicketIssue->setMessage($content);
            $newTicketIssue->setCreatedAt(new \DateTime());
            
            $newTicket->setTicketIssue($newTicketIssue);

            $em->persist($newTicket);
            $em->flush();
        }

    }

}