<?php

namespace Application\HelpDeskBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use Application\HelpDeskBundle\Form\TicketIssueType;
use Application\HelpDeskBundle\Form\EventListener\UpdateEventFieldSubscriber;

class TicketUpdateType extends AbstractType
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
        	->add('subject', 'hidden')
        	->add('from_email', 'hidden')
            ->add('ticketIssue', new TicketIssueType(), array('required' => false))
            ->add('submitted_by', 'user_selector')
            ->add('assigned_to', 'user_selector')
            ->add('status', 'entity', array(
            		'required' => false,
            		'multiple' => false,
            		'expanded' => true,
                    'empty_value' => false,
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
        return 'application_helpdeskbundle_ticketupdatetype';
    }
}
