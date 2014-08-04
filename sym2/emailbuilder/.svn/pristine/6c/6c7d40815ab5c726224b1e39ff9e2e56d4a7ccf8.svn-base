<?php

namespace Application\TemplateBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;


class EmailType extends AbstractType
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
    			'data_class' => 'Application\TemplateBundle\Document\Email'
    	));
    }

    public function getName()
    {
    	return 'application_templatebundle_emailtype';
    }
}