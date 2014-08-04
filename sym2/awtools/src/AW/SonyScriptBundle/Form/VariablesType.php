<?php

namespace AW\SonyScriptBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class VariablesType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('project_id')
            ->add('name')
            ->add('value')
        ;
    }

    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'AW\SonyScriptBundle\Entity\Variables'
        ));
    }

    public function getName()
    {
        return 'aw_sonyscriptbundle_variablestype';
    }
}
