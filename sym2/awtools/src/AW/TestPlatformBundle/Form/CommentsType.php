<?php

namespace AW\TestPlatformBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class CommentsType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('text', 'textarea', array(
            		'label' => 'Comment:',
            		'trim' => true,
            		'attr' => array('placeholder'=>'comment text', 'rows' => '5', 'style' => 'width: 99%;')
            ))
            ->add('attachment', 'file', array(
            		'label' => 'Attach file:',
            		'required' => false,
            		'attr' => array(
            				'size'=>'65'
            		)
            ))
            ->add('device', 'choice', array(
					'choices' => array(
							'Desktop' => 'Desktop',
							'iPhone 4' => 'iPhone 4',
							'iPhone 4S' => 'iPhone 4S',
							'iPhone 5' => 'iPhone 5',
							'iPhone 5S' => 'iPhone 5S',
							'Sams. GS2' => 'Sams. GS2',
							'Sams. GS3' => 'Sams. GS3',
							'Sams. GS4' => 'Sams. GS4'),
					'label' => 'Device',
            		'required' => true,
					'expanded' => false,
            		'multiple' => false
            ))
            ->add('priority', 'checkbox',
            		array('label' => ' ', 'required' => false,
            ))
            ->add('wsize', 'hidden',
            		array('data' => ' ',
            ))
            ->add('sres', 'hidden',
            		array('data' => ' ',
            ));
    }

    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'AW\TestPlatformBundle\Entity\Comments',
        	'csrf_protection' => false
        ));
    }

    public function getName()
    {
        return 'aw_testplatformbundle_commentstype';
    }
}
