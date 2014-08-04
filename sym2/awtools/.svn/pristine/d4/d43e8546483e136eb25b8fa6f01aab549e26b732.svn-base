<?php

namespace AW\WorxShareBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class ProjectsImagesType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            /* ->add('image', 'file', array(
            		'label' => ' ',
            		'attr' => array('style' => 'font-size: 0.7em;'),
            		'mapped' => false,
            		'required' => true)) */
            ->add('name')
            //->add('info')
        ;
    }

    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'AW\WorxShareBundle\Entity\ProjectsImages'
        ));
    }

    public function getName()
    {
        return 'aw_worxsharebundle_projectsimagestype';
    }
}
