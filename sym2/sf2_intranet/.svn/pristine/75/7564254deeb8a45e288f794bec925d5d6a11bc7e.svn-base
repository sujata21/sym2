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
use FOS\UserBundle\Controller\ResettingController as BaseResetting;
use Symfony\Component\DependencyInjection\ContainerAware;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Security\Core\Exception\AccountStatusException;
use FOS\UserBundle\Model\UserInterface;
use Application\LDAPBundle\Service\LDAPServer as LDAPServer;
use Application\LDAPBundle\Entity\LDAPUser;

/**
 * Controller managing the resetting of the password
 *
 * @author Thibault Duplessis <thibault.duplessis@gmail.com>
 * @author Christophe Coevoet <stof@notk.org>
 */
class ResettingController extends BaseResetting
{
    /**
     * Request reset user password: show form
     */
    public function requestAction()
    {
       
       
        return $this->container->get('templating')->renderResponse('FOSUserBundle:Resetting:request.html.'.$this->getEngine());
    }

    /**
     * Reset user password
     */
    public function resetAction($token)
    {
        
        $user = $this->container->get('fos_user.user_manager')->findUserByConfirmationToken($token);

        if (null === $user) {
            throw new NotFoundHttpException(sprintf('The user with "confirmation token" does not exist for value "%s"', $token));
        }

        if (!$user->isPasswordRequestNonExpired($this->container->getParameter('fos_user.resetting.token_ttl'))) {
            return new RedirectResponse($this->container->get('router')->generate('fos_user_resetting_request'));
        }

        $form = $this->container->get('fos_user.resetting.form');
        $formHandler = $this->container->get('fos_user.resetting.form.handler');
        $process = $formHandler->process($user);

        if ($process) {
            $this->setFlash('fos_user_success', 'resetting.flash.success');
            $response = new RedirectResponse($this->getRedirectionUrl($user));
            $this->authenticateUser($user, $response);
            $ldapserver = $this->container->get('application_ldap_service_server');
                    if($ldapserver->connect()){
                        $change_password = $form->getData()->new;
                        //var_dump($change_password_form);
                        $this->passwordChange($ldapserver,$change_password);
                        
                     }
            return $response;
        }

        return $this->container->get('templating')->renderResponse('FOSUserBundle:Resetting:reset.html.'.$this->getEngine(), array(
            'token' => $token,
            'form' => $form->createView(),
        ));
    }

    
    /**
     * Generate the redirection url when the resetting is completed.
     *
     * @param \FOS\UserBundle\Model\UserInterface $user
     *
     * @return string
     */
    protected function getRedirectionUrl(UserInterface $user)
    {
        return $this->container->get('router')->generate('fos_user_security_login');
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
