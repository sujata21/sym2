<?php

namespace AW\WorxShareBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class ProjectsType extends AbstractType
{
	/* public function __construct($em) {
		$this->em = $em;
	} */
	
	public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('name')
            ->add('info')
        ;
    }

    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'AW\WorxShareBundle\Entity\Projects',
            'client_id' => null,
        ));
    }

    public function getName()
    {
        return 'aw_worxsharebundle_projectstype';
    }
}
