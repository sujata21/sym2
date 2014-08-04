<?php 

namespace Application\HelpDeskBundle\Form\EventListener;

use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;
use Symfony\Component\Form\FormFactoryInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Application\HelpDeskBundle\Entity\TicketIssue;

class UpdateEventFieldSubscriber implements EventSubscriberInterface
{
	private $factory;

	public function __construct(FormFactoryInterface $factory)
	{
		$this->factory = $factory;
	}

	public static function getSubscribedEvents()
	{
		return array(FormEvents::PRE_SET_DATA => 'preSetData', FormEvents::PRE_BIND => 'preBindData');
	}

	public function preSetData(FormEvent $event)
	{
		$data = $event->getData();
		$form = $event->getForm();

		if (null === $data) {
			return;
		}

		if (!is_null($data->getId())) {
			$ticketIssue = new TicketIssue();
			$currentTicketIssue= $data->getTicketIssue();
			if(is_object($currentTicketIssue)){
				$ticketIssue->setTicket($currentTicketIssue->getTicket());
			}
			$data->setTicketIssue($ticketIssue);
		}
	}

	public function preBindData(FormEvent $event)
	{
		$data = $event->getData();
		$form = $event->getForm();
		 
		$ticket = $form->getData();
		if($ticket->getTicketIssue()->getMessage() == ""){
			$ticket->setTicketIssue(null);
		}
		$form->setData($ticket);

		if(isset($data['ticketIssue'])){
			$message = $data['ticketIssue']['message'];
			if(empty($message)){
				unset($data['ticketIssue']);
			}
			$event->setData($data);
		}
	}
}