<?php
namespace Application\TemplateBundle\Admin;

use Sonata\AdminBundle\Admin\Admin;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Validator\ErrorElement;
use Sonata\AdminBundle\Form\FormMapper;
use Gedmo\Translatable\Entity\MappedSuperclass\AbstractPersonalTranslation;

class Touchstone2Admin  extends Admin
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
            ->add('template', 'text')

            ->add('title', 'text')
            ->add('header', 'text')
            ->add('hero', 'text')
                       
            ->add('title1', 'text')
            ->add('summary1', 'text')
            ->add('cta1', 'text')
            ->add('cta1_link', 'text')
            
            ->add('title2', 'text')
            ->add('summary2', 'text')
            ->add('cta2', 'text')
            ->add('cta2_link', 'text')
            
            ->add('title3', 'text')
            ->add('summary3', 'text')
            ->add('cta3', 'text')
            ->add('cta3_link', 'text')
 
            ->add('title4', 'text')  
            ->add('summary4', 'text')
            ->add('cta4', 'text')
            ->add('cta4_link', 'text') 

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