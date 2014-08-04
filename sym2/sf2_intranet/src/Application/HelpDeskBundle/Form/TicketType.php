<?php

namespace Application\HelpDeskBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use Application\HelpDeskBundle\Form\TicketIssueType;
use Application\HelpDeskBundle\Form\EventListener\UpdateEventFieldSubscriber;

class TicketType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
    	$subscriber = new UpdateEventFieldSubscriber($builder->getFormFactory());
    	$builder->addEventSubscriber($subscriber);
    	
    	$data = $options['data'];
    	
    	$parentId = $data->getId();
    	if(is_null($parentId)){
    		$_SESSION['parent_id'] = -1;
    	}
        $builder
            ->add('subject')
            ->add('from_email')
            ->add('ticketIssue', new TicketIssueType(), array('required' => false))
            ->add('submitted_by', 'hidden')
            ->add('assigned_to')
            ->add('status', 'entity', array(
            		'required' => false,
            		'multiple' => false,
            		'expanded' => false,
            		'class' => 'ApplicationHelpDeskBundle:Status',            		
            		'query_builder' => function($repository) {
	            		return $repository->createQueryBuilder('s')
	            		->select('s')
	            		->leftjoin('ApplicationHelpDeskBundle:StatusType', 'st', 'WITH', 'st.id = s.statusType')
	            		->where('st.name = :name')
	            		->setParameter('name','Ticket')
	            		->orderBy('s.id', 'ASC');
            		},
			'property' => 'name',
			'mapped' => true,
			))
            ->add('category', 'entity', array(
            		'required' => false,
            		'multiple' => false,
            		'expanded' => false,
            		'class' => 'ApplicationHelpDeskBundle:Category',            		
            		'query_builder' => function($repository) {
	            		return $repository->createQueryBuilder('c')
	            		->select('c')	            		
	            		->where('c.parent IS NULL')	            		
	            		->orderBy('c.name', 'ASC');
            		},
			'property' => 'name',
			'mapped' => true,
			))
			->add('subCategory', 'entity', array(
					'required' => false,
					'multiple' => false,
					'expanded' => false,
					'class' => 'ApplicationHelpDeskBundle:Category',
					'query_builder' => function($repository) {
					return $repository->createQueryBuilder('c')
					->select('c')
					->where('c.parent IS NOT NULL')
					//->setParameter('parent', $_SESSION['parent_id']) 
					->orderBy('c.name', 'ASC');
			},
			'property' => 'name',
			'mapped' => true,
			))
            ;        
    }

    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Application\HelpDeskBundle\Entity\Ticket'
          , 'cascade_validation' => true
        ));       
        
    }

    public function getName()
    {
        return 'application_helpdeskbundle_tickettype';
    }
}
