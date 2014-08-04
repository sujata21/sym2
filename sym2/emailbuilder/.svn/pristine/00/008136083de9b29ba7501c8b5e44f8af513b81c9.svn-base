<?php
namespace Application\TemplateBundle\Admin;

use Sonata\AdminBundle\Admin\Admin;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Validator\ErrorElement;
use Sonata\AdminBundle\Form\FormMapper;
use Gedmo\Translatable\Entity\MappedSuperclass\AbstractPersonalTranslation;

class ZslArchiveAdmin extends Admin
{
    // setup the defaut sort column and order
    protected $datagridValues = array(
            '_sort_order' => 'DESC',
            '_sort_by' => 'created_at'
    );

    protected function configureListFields(ListMapper $listMapper)
    {
        $listMapper
            ->addIdentifier('title', 'text')
            ->addIdentifier('title1', 'text')
            ->addIdentifier('template', 'text')                   
         
        ;
    }

    protected function configureFormFields(FormMapper $formMapper)
    {
        $formMapper
            
            ->add('title', 'text')
            ->add('status', 'text')
            
            ->add('banner1', 'text')
            ->add('banner2', 'text')
            
            ->add('title1', 'text')
            ->add('summary1', 'text')
            ->add('image1', 'text')
            ->add('cta1', 'text')

            ->add('title2', 'text')
            ->add('summary2', 'text')
            ->add('image2', 'text')
            ->add('cta2', 'text')

            ->add('title3', 'text')
            ->add('summary3', 'text')
            ->add('image3', 'text')
            ->add('cta3', 'text')

            ->add('title4', 'text')
            ->add('summary4', 'text')
            ->add('image4', 'text')
            ->add('cta4', 'text')

            ->add('title5', 'text')
            ->add('summary5', 'text')
            ->add('image5', 'text')
            ->add('cta5', 'text')

            ->add('title6', 'text')
            ->add('summary6', 'text')
            ->add('image6', 'text')
            ->add('cta6', 'text')
            
            ->add('title7', 'text')
            ->add('summary7', 'text')
            ->add('image7', 'text')
            ->add('cta7', 'text')
            
            ->add('title8', 'text')
            ->add('summary8', 'text')
            ->add('image8', 'text')
            ->add('cta8', 'text')
            
            ->add('title9', 'text')
            ->add('summary9', 'text')
            ->add('image9', 'text')
            ->add('cta9', 'text')

            ->add('image_block1', 'text')
            ->add('image_block2', 'text')
            ->add('image_block3', 'text')
            ->add('image_block4', 'text')
            ->add('image_block5', 'text')
            ->add('image_block6', 'text')
            
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