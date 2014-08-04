<?php

namespace Application\UserBundle\Form\Handler;

use FOS\UserBundle\Form\Handler\ChangePasswordFormHandler as BaseHandler;

use FOS\UserBundle\Form\Model\ChangePassword;
use FOS\UserBundle\Model\UserInterface;
use FOS\UserBundle\Model\UserManagerInterface;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;


class ChangePasswordFormHandler extends BaseHandler
{
	 protected $request;
    protected $userManager;
    protected $form;

    public function __construct(FormInterface $form, Request $request, UserManagerInterface $userManager)
    {
        $this->form = $form;
        $this->request = $request;
        $this->userManager = $userManager;
    }
	public function process(UserInterface $user)
    {
    	//echo 'child'; die();

    	//parent::process($user);
  	

       $this->form->setData(new ChangePassword());

        if ('POST' === $this->request->getMethod()) {
            $this->form->bind($this->request);
         //    echo $this->form->getData()->new; die();
            
            if ($this->form->isValid()) {
            	
            	$change_password_form = $this->request->get('fos_user_change_password_form');
            	if($change_password_form['current_password'] != $this->form->getData()->new){
            		//echo 'valid'; 
                    if ((!preg_match('/[A-Z]+[a-z]+[0-9]+/', $this->form->getData()->new)) || (strlen($this->form->getData()->new) < 8))
                    {
                        //echo preg_match('/[A-Z]+[a-z]+[0-9]+/', $this->form->getData()->new);
                        $this->form->get('current_password')->addError(new\Symfony\Component\Form\FormError("New password should contain min 1 Capital letter and 1 Integer and min length 8 ."));
                        return false;
                     //echo strlen($this->form->getData()->new);
                    // die();
                    }
            		$this->onSuccess($user);
                    //die();
          		    return true;
            	}else{
            		//echo 'same'; 
            		$this->form->get('current_password')->addError(new\Symfony\Component\Form\FormError("This password is same as the current one."));
            		return false;

            	}
            	

                
            }
        }

        return false;
    }
    
}