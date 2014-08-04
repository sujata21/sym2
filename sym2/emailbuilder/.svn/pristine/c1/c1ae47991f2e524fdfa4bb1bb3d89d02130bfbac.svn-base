<?php
namespace Application\TemplateBundle\Admin;

use Sonata\AdminBundle\Admin\Admin;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Validator\ErrorElement;
use Sonata\AdminBundle\Form\FormMapper;
use Gedmo\Translatable\Entity\MappedSuperclass\AbstractPersonalTranslation;

class BBCAdmin  extends Admin
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
         /*   ->addIdentifier('title1', 'text')
            ->addIdentifier('summary_body1', 'text')
            ->addIdentifier('image1', 'text')
            ->addIdentifier('cta1', 'text')
            ->addIdentifier('title2', 'text')
            ->addIdentifier('summary_body2', 'text')
            ->addIdentifier('image2', 'text')
            ->addIdentifier('cta2', 'text')
            ->addIdentifier('title3', 'text')
            ->addIdentifier('summary_body3', 'text')
            ->addIdentifier('image3', 'text')
            ->addIdentifier('cta3', 'text')
            ->addIdentifier('title4', 'text')
            ->addIdentifier('summary_body4', 'text')
            ->addIdentifier('image4', 'text')
            ->addIdentifier('cta4', 'text')
            ->addIdentifier('title5', 'text')
            ->addIdentifier('summary_body5', 'text')
            ->addIdentifier('image5', 'text')
            ->addIdentifier('cta5', 'text')
            ->addIdentifier('title6', 'text')
            ->addIdentifier('summary_body6', 'text')
            ->addIdentifier('image6', 'text')
            ->addIdentifier('cta6', 'text')*/
        ;
    }

    protected function configureFormFields(FormMapper $formMapper)
    {
        $formMapper
            
            ->add('title', 'text')
            ->add('body', 'text')
            ->add('summary_body', 'text')
            ->add('banner', 'text')
            ->add('signature', 'text')
            ->add('background', 'text')
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