<?php

namespace AW\InterviewBundle\Form;

use Symfony\Component\Form\AbstractType;
use Doctrine\ORM\EntityManager;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class JobTitleType extends AbstractType
{
    private $entityManager;
    public function __construct(EntityManager $entityManager)
    {
        $this->entityManager = $entityManager;
    }
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $dql = "SELECT c.id, c.name from AWInterviewBundle:TestCategory c WHERE c.name != '' ORDER BY c.name ASC";
        $results = $this->entityManager->createQuery($dql)->getArrayResult();
        $choices = array();
        foreach($results as $result) {
            $choices[$result['id']] = $result['name'];
        }

        $builder
            ->add('name','text',array('label' => 'Name', 'required' => true))
            ->add('category','choice',array(
            'choices' => $choices,
            'multiple' => true,
            'required' => true,
            'label' => 'Category'
             ))

        ;
    }

    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'AW\InterviewBundle\Entity\JobTitle',
            'csrf_protection' => false
        ));
    }

    public function getName()
    {
        return 'aw_interviewbundle_jobtitletype';
    }
}
