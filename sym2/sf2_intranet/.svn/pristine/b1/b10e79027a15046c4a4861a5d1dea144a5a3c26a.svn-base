<?php
namespace Application\HelpDeskBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class TicketIssueType extends AbstractType
{
	public function buildForm(FormBuilderInterface $builder, array $options)
	{
				
		$builder
			->add('message')
			->add('note')
			->add('ticket', 'ticket_selector');
	}

	public function setDefaultOptions(OptionsResolverInterface $resolver)
	{
		$resolver->setDefaults(array(
				'data_class' => 'Application\HelpDeskBundle\Entity\TicketIssue',
		));
		
	}

	public function getName()
	{
		return 'ticketIssue';
	}
}