<?php
namespace Application\HelpDeskBundle\Admin;

use Sonata\AdminBundle\Admin\Admin;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Validator\ErrorElement;
use Sonata\AdminBundle\Form\FormMapper;
use Gedmo\Translatable\Entity\MappedSuperclass\AbstractPersonalTranslation;

class StatusAdmin  extends Admin
{
	// setup the defaut sort column and order
	protected $datagridValues = array(
			'_sort_order' => 'DESC',
			'_sort_by' => 'name'
	);

	/**
	 * Configure the form
	 *
	 * @param FormMapper $formMapper formMapper
	 */
	protected function configureFormFields(FormMapper $formMapper)
	{
		$formMapper
		->add('name')
		->add('statusType')
		;

	}

	protected function configureDatagridFilters(DatagridMapper $datagridMapper)
	{
		$datagridMapper
		->add('name')
		->add('statusType')
		;
	}

	protected function configureListFields(ListMapper $listMapper)
	{
		$listMapper
		->add('name')
		->add('statusType')
		->add('_action', 'actions', array(
				'actions' => array(
						'view' => array(),
						'edit' => array(),
						'delete' => array(),
				)
		))
		;
	}
	/*
	 protected function configureShowField(ShowMapper $showMapper)
	 {
	$showMapper
	->add('name')
	}*/
}