<?php

namespace AW\WorxShareBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class UserType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        //$role = $entity->getId();
    	
    	$builder
            //->add('username')
            //->add('usernameCanonical')
            ->add('name', null, array('label' => 'Name:'))
            ->add('email', 'email', array(
	          		'label' => 'Email:',
            		'required' => true,  
	        ))
	        /* ->add('role', 'choice', array(
	        		'choices' => array(
	        				'ROLE_CLIENT' => 'Client',
	        				'ROLE_CM' => 'CM',
	        				'ROLE_ADMIN' => 'Admin'),
	        		'label' => 'Role:',
	        		'required' => true,
	        		'expanded' => false,
	        		'multiple' => false,
	        		'mapped' => false
	        )) */
            //->add('emailCanonical')
            //->add('enabled')
            //->add('salt')
            //->add('password')
            //->add('lastLogin')
            //->add('locked')
            //->add('expired')
            //->add('expiresAt')
            //->add('confirmationToken')
            //->add('passwordRequestedAt')
            //->add('credentialsExpired')
            //->add('credentialsExpireAt')
	        /* ->add('role', 'choice', array(
	        		'choices' => array(
	        				'ROLE_CLIENT' => 'Client',
	        				'ROLE_CM' => 'CM',
	        				'ROLE_ADMIN' => 'Admin'),
	        		'label' => 'Role',
	        		'required' => true,
	        		'expanded' => false,
	        		'multiple' => false,
	        		'mapped' => false
	        )) */
        ;
    }

    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'AW\WorxShareBundle\Entity\User',
        	'csrf_protection' => false,
        ));
    }

    public function getName()
    {
        return 'aw_worxsharebundle_usertype';
    }
}
