<?php

namespace AW\ProfanityBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class EmailType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('name','text',array('label' => 'Subject', 'required' => true))
           // ->add('source','email',array('label' => 'Email', 'required' => true))
            
          //  ->add('createdAt')
        ;
    }

    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'AW\ProfanityBundle\Entity\Email',
            'csrf_protection' => false
        ));
    }

    public function getName()
    {
        return 'aw_profanitybundle_emailtype';
    }
}
