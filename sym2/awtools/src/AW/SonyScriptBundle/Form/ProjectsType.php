<?php

namespace AW\SonyScriptBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class ProjectsType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            /* ->add('type', 'choice',
						array('choices' => array('html' => 'HTML'),
								'label' => 'Project type',
								'required' => true, 'expanded' => false,
								'multiple' => false)) */
            /* ->add('template', 'choice',
						array('choices' => array('basic' => 'BASIC TEMPLATE'),
								'label' => 'Project template',
								'required' => true, 'expanded' => false,
								'multiple' => false)) */
			
			/* ->add('images', 'file',  array(
					'label' => 'Select images files:',
					'attr' => array('multiple' => 'multiple'),
					'mapped' => false,
					'required' => false)) */
            ->add('name','text',array('required' => true))
            ->add('number','text',array('required' => true))
            ->add('alias','text',array('required' => true))
            /* ->add('countries', 'choice',
						array('choices' => array('B'=>'1',
												 'C'=>'2',
 												 'D'=>'3',
												 'E'=>'4',
												 'F'=>'5',
												 'G'=>'6',
												 'H'=>'7',
												 'I'=>'8',
												 'J'=>'9',
												 'K'=>'10',
												 'L'=>'11',
												 'M'=>'12',
												 'N'=>'13',
												 'O'=>'14',
												 'P'=>'15',
												 'Q'=>'16',
												 'R'=>'17',
												 'S'=>'18',
												 'T'=>'19',
												 'U'=>'20',
												 'V'=>'21',
												 'W'=>'22',
												 'X'=>'23',
												 'Y'=>'24',
												 'Z'=>'25',
												 'AA'=>'26',
												 'AB'=>'27',
												 'AC'=>'28',
												 'AD'=>'29',
												 'AE'=>'30',
												 'AF'=>'31'),
								'label' => 'No of countries',
								'required' => true, 'expanded' => false,
								'multiple' => false)) */
            //->add('pegi','text',array('required' => false))
            ->add('spreadsheet', 'file',  array(
            		'label' => 'Upload full ASF (*.xls or *.xlsx) file:',
            		'attr' => array('accept' => 'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'style' => 'padding-bottom: 20px;'),
            		'required' => true))
            /* ->add('images', 'file', array(
            		'label' => ' ',
            		'attr' => array(
            				'accept' => 'image/*',
            				'multiple' => 'multiple',
            				'style' => 'vertical-align: top;'),
            		'mapped' => false,
            		'required' => false)) */
            ->add('template', 'file',  array(
            		'label' => 'Select the template file:',
            		'attr' => array('accept' => '.twig'),
            		'required' => false))
            ->add('defaultTemplate', 'checkbox', array(
            		'label' => ' ',
            		'attr' => array('style' => 'vertical-align: top;'),
            		'mapped' => false,
            		'required' => false))
            //->add('output','text',array('required' => false))
        ;
    }

    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'AW\SonyScriptBundle\Entity\Projects',
        	'csrf_protection'   => false,
        ));
    }

    public function getName()
    {
        return 'aw_sonyscriptbundle_projectstype';
    }
}
