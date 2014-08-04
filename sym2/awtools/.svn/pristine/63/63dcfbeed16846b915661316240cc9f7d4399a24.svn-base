<?php

namespace AW\WorxShareBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class ClientsProjectsType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('clientId')
            ->add('projectId')
            ->add('projectName')
            ->add('created')
            ->add('updated')
        ;
    }

    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'AW\WorxShareBundle\Entity\ClientsProjects'
        ));
    }

    public function getName()
    {
        return 'aw_worxsharebundle_clientsprojectstype';
    }
}
