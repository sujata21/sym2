<?php

namespace Application\LDAPBundle\Form\Filter;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class LDAPUserType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        
        $builder
            ->add('firstname','text', array(
                'attr'=>array('class'=>'form-control'),
                'required'=>false))
            ->add('lastname','text', array(
                'attr'=>array('class'=>'form-control'),
                'required'=>false))
            ->add('job_title','text', array(
                'attr'=>array('class'=>'form-control'),
                'required'=>false))
            ->add('department','entity',array('label'=>'Department',
                                              'class'=> 'Application\LDAPBundle\Entity\Department',
                                              'property'  => 'name',
                                              'empty_value' => 'Choose an option',
                                              'attr'=>array('class'=>'form-control'),
                                              'required'=>false))
            ->add('office','text', array(
                'attr'=>array('class'=>'form-control'),
                'required'=>false))
            ->add('telephone','text', array(
                'attr'=>array('class'=>'form-control'),
                'required'=>false))
            ->add('username','text', array(
                'attr'=>array('class'=>'form-control'),
                'required'=>false))
            ->add('email','text', array(
                'attr'=>array('class'=>'form-control'),
                'required'=>false))
            ->add('enabled','choice', array(
                'label' => 'Enabled/Disabled',
                'choices'=> array(''=>'Type','1' => 'Enabled', '0' => 'Disabled'),
                'attr'=>array('class'=>'form-control'),
                'required'=>false,)
                );
    }

    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Application\LDAPBundle\Entity\LDAPUser'
        ));
    }

    public function getName()
    {
        return 'Application_ldapbundle_ldapusertype';
    }
}
