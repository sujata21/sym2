<?php

namespace AW\LinkNameCheckerBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class TestType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('files', 'file', array(
                'label' => 'Please upload HTML file:',
                'mapped' => false,
                'required' => false,
                'attr' => array('class' => 'hidden'))
            );
    }

    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            //'data_class' => 'AW\LinkNameCheckerBundle\Entity\Test'
        ));
    }

    public function getName()
    {
        return 'aw_linknamecheckerbundle_testtype';
    }
}
