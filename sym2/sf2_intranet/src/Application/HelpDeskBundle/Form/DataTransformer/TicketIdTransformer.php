<?php
namespace Application\HelpDeskBundle\Form\DataTransformer;

use Symfony\Component\Form\DataTransformerInterface;
use Symfony\Component\Form\Exception\TransformationFailedException;
use Doctrine\Common\Persistence\ObjectManager;
use  Application\HelpDeskBundle\Entity\Ticket;

class TicketIdTransformer implements DataTransformerInterface
{
	/**
	 * @var ObjectManager
	 */
	private $om;

	/**
	 * @param ObjectManager $om
	 */
	public function __construct(ObjectManager $om)
	{
		$this->om = $om;
	}

	/**
	 * Transforms an object (ticket) to a string (number).
	 *
	 * @param  ticket|null $ticket
	 * @return string
	 */
	public function transform($ticket)
	{
		if (null === $ticket) {
			return "";
		}

		return $ticket->getId();
	}

	/**
	 * Transforms a string (id) to an object (ticket).
	 *
	 * @param  string $id
	 * @return ticket|null
	 * @throws TransformationFailedException if object (ticket) is not found.
	 */
	public function reverseTransform($id)
	{
		if (!$id) {
			return null;
		}

		$ticket = $this->om
		->getRepository('ApplicationHelpDeskBundle:ticket')
		->findOneBy(array('id' => $id))
		;

		if (null === $ticket) {
			throw new TransformationFailedException(sprintf(
					'An ticket with id "%s" does not exist!',
					$id
			));
		}

		return $ticket;
	}
}