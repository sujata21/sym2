<?php
namespace Application\TemplateBundle\Admin;

use Sonata\AdminBundle\Admin\Admin;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Validator\ErrorElement;
use Sonata\AdminBundle\Form\FormMapper;
use Gedmo\Translatable\Entity\MappedSuperclass\AbstractPersonalTranslation;

class BBCArchiveAdmin  extends Admin
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
            ->addIdentifier('body', 'text')
            ->addIdentifier('summary_body', 'text')
            ->addIdentifier('template', 'text')
        ;
    }

    protected function configureFormFields(FormMapper $formMapper)
    {
        $formMapper
            
            ->add('title', 'text')
           // ->add('created_at', 'date')
            ->add('body', 'text')
            ->add('status', 'text')
            ->add('summary_body', 'text')
            ->add('template', 'text')
            ->add('banner', 'text')
            ->add('signature', 'text')
            ->add('background', 'text')
            ->add('snippet', 'text')
            ->add('title1', 'text')
            ->add('summary_body1', 'text')
            ->add('image1', 'text')
            ->add('cta1', 'text')
            ->add('title2', 'text')
            ->add('summary_body2', 'text')
            ->add('image2', 'text')
            ->add('cta2', 'text')
            ->add('title3', 'text')
            ->add('summary_body3', 'text')
            ->add('image3', 'text')
            ->add('cta3', 'text')
            ->add('title4', 'text')
            ->add('summary_body4', 'text')
            ->add('image4', 'text')
            ->add('cta4', 'text')
            ->add('title5', 'text')
            ->add('summary_body5', 'text')
            ->add('image5', 'text')
            ->add('cta5', 'text')
            ->add('title6', 'text')
            ->add('summary_body6', 'text')
            ->add('image6', 'text')
            ->add('cta6', 'text')
            
        ->end();
    }

    public function prePersist($document)
    {
        $parent = $this->getModelManager()->find(null, '/cms/content/email');
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