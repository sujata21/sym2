<?php

namespace AW\TestPlatformBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class TestsType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('name', 'text', array(
            		'label' => 'Session name:'))
            ->add('email', 'text', array(
            		'label' => 'Your email (you will get copy of test session report):'))
            ->add('emailTo', 'text', array(
            		'required' => false,
            		'label' => 'Send email to others ( separated by ; ):'))
            ->add('link', 'text', array(
            		'label' => 'IFrame link (incl. http://):'))
            ->add('cpwManu', 'checkbox',
            		array('label' => 'Add CPW manu:', 'required' => false))
            ->add('info', 'textarea', array(
            		'label' => 'Info:'))
            ->add('iFrameName', 'text', array(
            		'label' => 'Name:'))
         	->add('iFrameWidth', 'integer', array(
            		'label' => 'Width:'))
            ->add('iFrameHeight', 'integer', array(
            		'label' => 'Height:'))
            ->add('iFrameScrolling', 'checkbox',
            		array('label' => 'Scrolling bars:', 'required' => false))
            ->add('iFrameFrameborder', 'checkbox',
            		array('label' => 'Border:', 'required' => false))
            /*->add('iFrameSeamless', 'checkbox',
            		array('label' => 'Seamless:', 'required' => false))*/
        ;
    }

    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'AW\TestPlatformBundle\Entity\Tests',
        	'csrf_protection' => false
        	));
    }

    public function getName()
    {
        return 'aw_testplatformbundle_teststype';
    }
}
