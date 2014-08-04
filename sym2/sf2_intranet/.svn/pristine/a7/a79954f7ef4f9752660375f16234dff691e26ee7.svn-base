<?php
namespace Application\HelpDeskBundle\Form\DataTransformer;

use Symfony\Component\Form\DataTransformerInterface;
use Symfony\Component\Form\Exception\TransformationFailedException;
use Doctrine\Common\Persistence\ObjectManager;
use Application\Sonata\UserBundle\Entity\User;

class UserIdTransformer implements DataTransformerInterface
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
	 * Transforms an object (user) to a string (number).
	 *
	 * @param  user|null $user
	 * @return string
	 */
	public function transform($user)
	{
		if (null === $user) {
			return "";
		}

		return $user->getId();
	}

	/**
	 * Transforms a string (id) to an object (user).
	 *
	 * @param  string $id
	 * @return user|null
	 * @throws TransformationFailedException if object (user) is not found.
	 */
	public function reverseTransform($id)
	{
		if (!$id) {
			return null;
		}

		$user = $this->om
		->getRepository('ApplicationSonataUserBundle:User')
		->findOneBy(array('id' => $id))
		;

		if (null === $user) {
			throw new TransformationFailedException(sprintf(
					'An user with id "%s" does not exist!',
					$id
			));
		}

		return $user;
	}
}