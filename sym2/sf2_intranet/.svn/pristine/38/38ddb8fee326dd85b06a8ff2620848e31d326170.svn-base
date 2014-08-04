<?php
namespace Application\HelpDeskBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use Application\HelpDeskBundle\Form\DataTransformer\UserIdTransformer;

class UserSelectorType extends AbstractType
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

	public function buildForm(FormBuilderInterface $builder, array $options)
	{
		$transformer = new UserIdTransformer($this->om);
		$builder->addModelTransformer($transformer);
	}

	public function setDefaultOptions(OptionsResolverInterface $resolver)
	{
		$resolver->setDefaults(array(
				'invalid_message' => 'The selected user does not exist',
		));
	}

	public function getParent()
	{
		return 'hidden';
	}

	public function getName()
	{
		return 'user_selector';
	}
}