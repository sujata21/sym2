<?php

namespace Application\HelpDeskBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;


class ArticleType extends AbstractType
{
   public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('category', 'text', array('required' => false))
        	->add('title', 'text', array('required' => true))
            ->add('body', 'textarea')
        ;
    }

    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
    	$resolver->setDefaults(array(
    			'data_class' => 'Application\HelpDeskBundle\Document\Article'
    	));
    }

    public function getName()
    {
    	return 'application_helpdeskbundle_articletype';
    }
}