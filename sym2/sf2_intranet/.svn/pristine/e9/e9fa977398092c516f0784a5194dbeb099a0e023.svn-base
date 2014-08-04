<?php

/*
 * This file is part of the FOSUserBundle package.
 *
 * (c) FriendsOfSymfony <http://friendsofsymfony.github.com/>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Application\UserBundle\Controller;


use FOS\UserBundle\Controller\ChangePasswordController as BaseChangePassword;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use FOS\UserBundle\Model\UserInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Application\LDAPBundle\Service\LDAPServer as LDAPServer;
use Application\LDAPBundle\Entity\LDAPUser;


/**
 * Controller managing the password change
 *
 * @author Thibault Duplessis <thibault.duplessis@gmail.com>
 * @author Christophe Coevoet <stof@notk.org>
 */
class ChangePasswordController extends BaseChangePassword
{
    /**
     * Change user password
     */
    public function changePasswordAction()
    {
           
   
        $user = $this->container->get('security.context')->getToken()->getUser();
        if (!is_object($user) || !$user instanceof UserInterface) {
            throw new AccessDeniedException('This user does not have access to this section.');
        }

        $form = $this->container->get('fos_user.change_password.form');
        $formHandler = $this->container->get('fos_user.change_password.form.handler');

        $process = $formHandler->process($user);
        
        if ($process) {
          
                $this->setFlash('fos_user_success', 'change_password.flash.success');
                $ldapserver = $this->container->get('application_ldap_service_server');
                    if($ldapserver->connect()){
                        $change_password = $form->getData()->new;
                        //var_dump($change_password_form);
                        $this->passwordChange($ldapserver,$change_password);
                        
                     }
                     return new RedirectResponse($this->container->get('router')->generate('ldapuser'));
                     
                                    
       }

        return $this->container->get('templating')->renderResponse(
            'FOSUserBundle:ChangePassword:changePassword.html.'.$this->container->getParameter('fos_user.template.engine'),
            array('form' => $form->createView())
        );
    }
   
    public function getLdapserverUser($username)
    {
        $ldapserver = $this->container->get('application_ldap_service_server');
        if($ldapserver->connect()){
           // echo 'true';
    }
        $filter = "uid=$username";
        $attributes      = array('cn'
        , 'displayName'
        , 'ou'
        , 'physicalDeliveryOfficeName'
        , 'title'
        , 'telephoneNumber'
        , 'sn'
        , 'givenName'
        , 'homeDirectory'
        , 'mail'
        , 'mobile'
        , 'loginShell'
        , 'homePhone'
        , 'shadowlastchange'
        ,) ;
        $distinguishedName = $ldapserver->getUserdn();

        $results = $ldapserver->search($distinguishedName, $filter, $attributes);
        $data = array();
        foreach ($results as $key=>$val) {
            if(is_array($val)){
                foreach($val as $k=>$v){
                    if(!is_numeric($k)){
                        if(isset($v["count"]) && $v["count"] == 1){
                            $data[$key][$k] = $v[0];
                        }
                    }
                }
            }
        }
        return $data;
        //die();
    }
    public function passwordChange($ldapserver,$password){
         
        $user = $this->container->get('security.context')->getToken()->getUser(); 
        $username = $user->getUsername(); 
       
        $result = false;
        $user = $this->getLdapserverUser($username);
       // var_dump($user);
         
        if(!empty($user)){
            $encryptedPassword = '{SHA}'. base64_encode( sha1( $password, true ) );
            $hashed_password = strtoupper(bin2hex(mhash(MHASH_MD4, iconv("UTF-8","UTF-16LE", $password))));;
            $sambaPwdLastSet    = strtotime("now");
            $sambaPwdMustChange     = strtotime("now + 45 days");
            $today = time(); // or your date as well
            $your_date = strtotime("1970-01-01");
            $datediff = $today - $your_date;
            $dateshadow = floor($datediff/(60*60*24));
            $shadowLastChange = $dateshadow;

            $attributes = array( 'mail'         => $user[0]['mail']
            , 'userPassword'            => $encryptedPassword
            , 'sambaNTPassword'         => $hashed_password
            , 'sambaPwdLastSet'         => $sambaPwdLastSet
            , 'sambaPwdMustChange'      => $sambaPwdMustChange
            , 'shadowLastChange'        => $shadowLastChange
            );
            //var_dump($attributes);
            if(isset($user[0]['cn'])){
                $distinguishedName = "uid={$user[0]['cn']},{$ldapserver->getUserdn()}";
            }
           $ldapserver->bind("cn=admin,dc=alchemyworx,dc=local", "st0n3s2010", true);
            $result = ldap_modify($ldapserver->getConnection(), $distinguishedName, $attributes);

            $error  = ldap_error($ldapserver->getConnection());
            //echo $error;
        }
        //var_dump($result);
        //die();
        //$result = 'false';
        if($result == true){
             $em = $this->container->get('doctrine.orm.entity_manager');
            $entity = $em->getRepository('ApplicationLDAPBundle:LDAPUser')->findOneBy(array('username' => $username));
            //var_dump($entity->getFirstname());
            $entity->setShadowLastChange($shadowLastChange);
            $em->persist($entity);
            $em->flush();
            
        }
        return $result;
    }

   
}
