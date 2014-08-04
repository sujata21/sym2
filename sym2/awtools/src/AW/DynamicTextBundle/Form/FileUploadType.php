<?php

namespace AW\DynamicTextBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class FileUploadType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('name', 'text')
            ->add('file', 'file',  array(
            		'label' => 'Source image:',
            		'required' => false))
        ;
    }

    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'AW\DynamicTextBundle\Entity\FileUpload',
        	'csrf_protection'   => false,
        ));
    }

    public function getName()
    {
        return 'aw_dynamictextbundle_fileuploadtype';
    }
}
