<?php
namespace Application\LDAPBundle\Form\EventListener;

use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;
use Symfony\Component\Form\FormFactoryInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class CleanUserSelectorFieldSubscriber implements EventSubscriberInterface
{
	private $factory;

	public function __construct(FormFactoryInterface $factory)
	{
		$this->factory = $factory;
	}

	public static function getSubscribedEvents()
	{		
		return array(FormEvents::PRE_BIND => 'preBind');
	}

	public function preBind(FormEvent $event)
	{
		$data = $event->getData();
		$form = $event->getForm();		
		unset($data['selected_users']);
		$event->setData($data);

	}
}