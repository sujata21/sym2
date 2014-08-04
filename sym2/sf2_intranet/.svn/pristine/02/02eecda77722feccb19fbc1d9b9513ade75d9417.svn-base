<?php
namespace Application\LDAPBundle\Command;

use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Application\LDAPBundle\Service\LDAPServer;
use Application\LDAPBundle\Entity\LDAPUser;


class LDAPUserProfileImportCommand extends ContainerAwareCommand
{
    protected function configure()
    {
        $this
        ->setName('ldap:userprofile:import')
        ->setDescription('Import User profile data from CSV file ')
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
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
         $url = $input->getArgument('url');
        if ($url) {
            $dir = $url;
        } else {
            $dir = '/home/spandey/m21/user_profile.csv';
        }
        
        $arrResult = array();
        $handle = fopen($dir, "r");
        if( $handle ) {
            while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
                $arrResult[] = $data;
                //echo $arrResult[6];
            }
            fclose($handle);
        }
        //var_dump($arrResult);
        foreach ($arrResult as $value) {
            $em = $this->getContainer()->get('doctrine')->getEntityManager();
            //echo $value[6];
            $usr = $em->getRepository('ApplicationLDAPBundle:LDAPUser')->findOneByEmail(trim($value[6]));
            if($usr){
               /*echo $value[2]."\n";
                echo $value[3]."\n";
                echo $value[7]."\n";
                echo $value[8]."\n";
                echo $value[5]."\n";
                echo $value[12]."\n";
                echo $value[10]."\n";*/
                $usr->setFirstname($value[2]);
                $usr->setLastname($value[3]);
                $usr->setTelephone($value[7]);
              
                if($value[8] == 0){
                    $usr->setMobile(NULL);
                }else{
                    $usr->setMobile($value[8]);
                }
                
                $usr->setJobTitle($value[5]);
                $usr->setOffice($value[12]);
                $usr->setDepartment($value[10]);
                if(($value[10]) && ($value[10] != NULL)){
                    $dept = $em->getRepository('ApplicationLDAPBundle:Department')->findOneByName(trim($value[10]));
                    if($dept){
                        $usr->setDepartmentId($dept);
                       // echo $dept->getId();
                    }
                }        
            }
            $em->persist($usr);
            $em->flush();
            //echo $usr->getUsername();
        }

        //var_dump($arrResult);

    }

}