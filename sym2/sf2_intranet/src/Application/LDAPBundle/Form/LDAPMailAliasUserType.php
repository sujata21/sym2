<?php

namespace Application\LDAPBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use Doctrine\ORM\EntityRepository;

class LDAPMailAliasUserType extends AbstractType
{
        /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
          //  ->add('ldapUser')
           // ->add('ldapMailAlias')  ;
        ->add('ldapUser', 'entity', array(
                    'class' => 'ApplicationLDAPBundle:LDAPUser',
                    'empty_value' => '',
                    'attr'=>array('class'=>'form-control'),
                    'query_builder' => function(EntityRepository $er) {
                        return $er->createQueryBuilder('c')                     
                        ->where('c.enabled = :flag ') 
                        ->setParameter('flag', '1')                
                        ->orderBy('c.username', 'ASC');
                    },
            ))  
            ->add('ldapMailAlias', 'entity', array(
                    'class' => 'ApplicationLDAPBundle:LDAPMailAlias',
                    'attr'=>array('class'=>'form-control'),
                    'empty_value' => '',
                    'query_builder' => function(EntityRepository $er) {
                        return $er->createQueryBuilder('c')                     
                        ->orderBy('c.name', 'ASC');
                    },
            ))   ;         
    }
    
    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Application\LDAPBundle\Entity\LDAPMailAliasUser'
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'application_ldapbundle_ldapmailaliasuser';
    }
}
