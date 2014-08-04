<?php

namespace Application\LDAPBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use Doctrine\ORM\EntityManager;
use Application\LDAPBundle\Form\EventListener\CleanUserSelectorFieldSubscriber;

class LDAPGroupType extends AbstractType
{
	
	public function buildForm(FormBuilderInterface $builder, array $options)
	{	

		$subscriber = new CleanUserSelectorFieldSubscriber($builder->getFormFactory());
		$builder->addEventSubscriber($subscriber);
		
		$ldapGroup = $options['data'];
		$_SESSION['group_id']  = $ldapGroup->getId();
		
		$builder
		->add('id', 'hidden')
		->add('name')
		->add('description')
        ->add('mail_alias')

		/*->add('users', 'entity', array(
				'required' => false,				
				'multiple' => true,
				'expanded' => false,				
				'class' => 'ApplicationLDAPBundle:LDAPUser',
				'attr' => array('class' => 'doublelist_unselected'),
				'query_builder' => function($repository) {
				return $repository->createQueryBuilder('u')
									->select('u')									
									->leftjoin('ApplicationLDAPBundle:LDAPUserGroup', 'ug', 'WITH', 'ug.ldapUser = u.id')									
									->where('ug.ldapGroup IS NULL')									
									->orderBy('u.id', 'ASC');
		},
		'property' => 'username',
		'mapped' => false,
		))
		
		->add('selected_users', 'entity', array(
				'attr' => array('class' => 'doublelist_selected'),
				'required' => false,				
				'multiple' => true,	
				'expanded' => false,				
				'class' => 'ApplicationLDAPBundle:LDAPUser',
				'query_builder' => function($repository) {
				return $repository->createQueryBuilder('u')
									->select('u')									
									->leftjoin('ApplicationLDAPBundle:LDAPUserGroup', 'ug', 'WITH', 'ug.ldapUser = u.id')									
									->where('ug.ldapGroup = :group_id')
									->setParameter('group_id', $_SESSION['group_id'])
									->orderBy('u.id', 'ASC');
		},
		
		'mapped' => false,))*/
		;
	}

	public function setDefaultOptions(OptionsResolverInterface $resolver)
	{
		$resolver->setDefaults(array(
				'data_class' => 'Application\LDAPBundle\Entity\LDAPGroup'
		));
	}

	public function getName()
	{
		return 'Application_ldapbundle_ldapgrouptype';
	}
}
