<?php

namespace AW\WorxShareBundle\Form\Type;

use Symfony\Component\Form\FormBuilderInterface;
use FOS\UserBundle\Form\Type\RegistrationFormType as BaseType;

class RegistrationFormType extends BaseType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        parent::buildForm($builder, $options);

        // add your custom field
        $builder
        	->remove('email')
        	->remove('username')
        	->remove('plainPassword')
        	->add('name', null, array('label' => 'Name:'))
        	//->add('username', null, array('label' => 'form.username', 'translation_domain' => 'FOSUserBundle'))
        	->add('email', 'email', array('label' => 'form.email', 'translation_domain' => 'FOSUserBundle'))
        	->add('plainPassword', 'repeated', array(
        			'type' => 'password',
        			'options' => array('translation_domain' => 'FOSUserBundle'),
        			'first_options' => array('label' => 'form.password'),
        			'second_options' => array('label' => 'form.password_confirmation'),
        			'invalid_message' => 'fos_user.password.mismatch',
        	))
        	->add('role', 'choice', array(
					'choices' => array(
							'ROLE_CLIENT' => 'Client',
							'ROLE_CM' => 'CM',
							'ROLE_ADMIN' => 'Admin'),
					'label' => 'Role:',
            		'required' => true,
					'expanded' => false,
            		'multiple' => false,
        			'mapped' => false
            ))
        ;
    }

    public function getName()
    {
        return 'aw_worx_share_registration';
    }
}
