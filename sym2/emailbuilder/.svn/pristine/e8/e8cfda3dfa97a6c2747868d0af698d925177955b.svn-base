<?php

namespace Application\TemplateBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;


class TemplateType extends AbstractType
{
   public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
        	->add('title', 'text', array('required' => true))
            ->add('body', 'textarea')
        ;
    }

    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
    	$resolver->setDefaults(array(
    			'data_class' => 'Application\TemplateBundle\Document\Template'
    	));
    }

    public function getName()
    {
    	return 'application_templatebundle_templatetype';
    }
}