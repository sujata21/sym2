<?php

namespace AW\DynamicTextBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class NamesType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('fname')
            ->add('lname')
        ;
    }

    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'AW\DynamicTextBundle\Entity\Names'
        ));
    }

    public function getName()
    {
        return 'aw_dynamictextbundle_namestype';
    }
}
