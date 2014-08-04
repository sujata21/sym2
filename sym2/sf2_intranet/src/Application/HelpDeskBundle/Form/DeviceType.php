<?php

namespace Application\HelpDeskBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class DeviceType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('name')
            ->add('deviceType')
            ->add('asset_tag')
            ->add('ip_address')
        ;
    }

    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Application\HelpDeskBundle\Entity\Device'
        ));
    }

    public function getName()
    {
        return 'application_helpdeskbundle_devicetype';
    }
}
