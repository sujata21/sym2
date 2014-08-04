<?php

namespace AW\HtmlCheckerBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class TestType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('file', 'file', array(
                'label' => 'Please upload HTML file:',
                'mapped' => false))
            //->add('createdAt')
        ;
    }

    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'AW\HtmlCheckerBundle\Entity\Test'
        ));
    }

    public function getName()
    {
        return 'aw_htmlcheckerbundle_testtype';
    }
}
