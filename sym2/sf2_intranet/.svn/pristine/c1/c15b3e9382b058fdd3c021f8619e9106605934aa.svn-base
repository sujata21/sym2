<?php
namespace Application\HelpDeskBundle\Admin;

use Sonata\AdminBundle\Admin\Admin;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Validator\ErrorElement;
use Sonata\AdminBundle\Form\FormMapper;
use Gedmo\Translatable\Entity\MappedSuperclass\AbstractPersonalTranslation;
use Doctrine\ORM\EntityRepository;

class ArticleCategoryAdmin  extends Admin
{
	// setup the defaut sort column and order
	protected $datagridValues = array(
			'_sort_order' => 'DESC',
			'_sort_by' => 'name',
			//'_sort_by' => 'path',
			'_sort_by' => 'parent',
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
		//->add('path')
        /*->add('parent', 'entity', array(
		    'class' => 'ApplicationHelpDeskBundle:ArticleCategory',
		    'property' => 'path',
		    'empty_value' => 'Select parent category',
		    'required' => false
		))*/
		->add('parent', 'entity', array(
            'class' => 'ApplicationHelpDeskBundle:ArticleCategory',
            'property' => 'path',
            'query_builder' => function(EntityRepository $repository) {
                return $repository->createQueryBuilder('c')
                ->orderBy('c.path', 'ASC');
            },
            'empty_value' => 'Select parent category',
		    'required' => false
        ))
		;

	}

	protected function configureDatagridFilters(DatagridMapper $datagridMapper)
	{
		$datagridMapper
		->add('name')
		->add('path')
		//->add('parent')
		;
	}

	protected function configureListFields(ListMapper $listMapper)
	{
		$listMapper
		->add('name')
		->add('path')
		//->add('parent')
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