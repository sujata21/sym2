<?php

namespace Application\TestCrudBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class Test3Type extends AbstractType
{
        /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('name')
            ->add('date')
            ->add('time')
            ->add('datetime')
            ->add('info')
            ->add('status')
            ->add('entity','choice', array('label' => 'Checkbox',
                'choices'=> array('' => 'Select Network',
                    'EE' => 'EE','O2'=>'O2',
                    'Orange'=>'Orange',
                    'T-Mobile'=>'T-Mobile',
                    'Vodafone'=>'Vodafone',
                    'Talk Mobile'=>'Talk Mobile',
                    'Other'=>'Other'),
                'required'=>true,))
            ->add('radio','choice', array('label' => 'Radio',
                'choices'=> array(
                    'Orange1'=>'Orange1',
                    'T-Mobile1'=>'T-Mobile1',
                    'Vodafone1'=>'Vodafone1',
                    'Talk Mobile1'=>'Talk Mobile1',
                    'EE' => 'EE','O2'=>'O2',
                    'Orange'=>'Orange',
                    'T-Mobile'=>'T-Mobile',
                    'Vodafone'=>'Vodafone',
                    'Talk Mobile'=>'Talk Mobile',
                    'Other'=>'Other'),
                'required'=>true,
                'mapped'=>false,
                'expanded'=>true,
                'multiple'=>false))
            ->add('checkboxes','choice', array('label' => 'Checkboxes',
                'choices'=> array('EE' => 'EE','O2'=>'O2',
                    'Orange1'=>'Orange1',
                    'T-Mobile1'=>'T-Mobile1',
                    'Vodafone1'=>'Vodafone1',
                    'Talk Mobile1'=>'Talk Mobile1',
                    'Orange'=>'Orange',
                    'T-Mobile'=>'T-Mobile',
                    'Vodafone'=>'Vodafone',
                    'Talk Mobile'=>'Talk Mobile',
                    'Other'=>'Other'),
                'required'=>true,
                'mapped'=>false,
                'expanded'=>true,
                'multiple'=>true))
            ->add('select','choice', array('label' => 'Select multiple',
                'choices'=> array('EE' => 'EE','O2'=>'O2',
                    'Orange1'=>'Orange1',
                    'T-Mobile1'=>'T-Mobile1',
                    'Vodafone1'=>'Vodafone1',
                    'Talk Mobile1'=>'Talk Mobile1',
                    'Orange'=>'Orange',
                    'T-Mobile'=>'T-Mobile',
                    'Vodafone'=>'Vodafone',
                    'Talk Mobile'=>'Talk Mobile',
                    'Other'=>'Other'),
                'required'=>true,
                'mapped'=>false,
                'expanded'=>false,
                'multiple'=>true))
        ;
    }
    
    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Application\TestCrudBundle\Entity\Test3'
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'application_testcrudbundle_test3';
    }
}
