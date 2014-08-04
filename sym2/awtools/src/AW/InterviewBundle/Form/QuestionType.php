<?php

namespace AW\InterviewBundle\Form;

use Symfony\Component\Form\AbstractType;
use Doctrine\ORM\EntityManager;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class QuestionType extends AbstractType
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
        ->add('category','choice',array(
        'choices' => $choices,
        'required' => true,
        'label' => 'Category'
        ))
            ->add('question','textarea',array('label' => 'Question', 'required' => true,'attr' => array('cols' => '5', 'rows' => '5')))
            ->add('type','choice', array('choices'=> array('' => 'Select Type', 'multiple' => 'Multiple Choice','text'=>'Text'), 'required'=>true,))


        ;
    }

    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'AW\InterviewBundle\Entity\Question',
            'csrf_protection' => false
        ));
    }

    public function getName()
    {
        return 'aw_interviewbundle_questiontype';
    }
}
