<?php
namespace Application\TemplateBundle\Admin;

use Sonata\AdminBundle\Admin\Admin;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Validator\ErrorElement;
use Sonata\AdminBundle\Form\FormMapper;
use Gedmo\Translatable\Entity\MappedSuperclass\AbstractPersonalTranslation;

class TouchstoneAdmin  extends Admin
{
    // setup the defaut sort column and order
    protected $datagridValues = array(
            '_sort_order' => 'DESC',
            '_sort_by' => 'title'
    );

    protected function configureListFields(ListMapper $listMapper)
    {
        $listMapper
            ->addIdentifier('title', 'text')
            ->addIdentifier('title1', 'text');
    }

    protected function configureFormFields(FormMapper $formMapper)
    {
        $formMapper
            
            ->add('title', 'text')
                       
            ->add('title1', 'text')
            
            ->add('title2', 'text')
            
            ->add('title3', 'text')
 
            ->add('title4', 'text')
            
            ->add('cta4', 'text')

            
            
        ->end();
    }

    public function prePersist($document)
    {
        $parent = $this->getModelManager()->find(null, '/cms/content/generic/template');
        $document->setParent($parent);
    }

    protected function configureDatagridFilters(DatagridMapper $datagridMapper)
    {
        $datagridMapper->add('title', 'doctrine_phpcr_string');
    }

    public function getExportFormats()
    {
        return array();
    }
}