<?php

namespace Application\LDAPBundle\Form\Filter;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use Doctrine\ORM\EntityRepository;

class LDAPMailAliasUserType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder           
            //->add('firstname','text', array('attr'=>array('class'=>'form-control'),'required'=>false)) 
           // ->add('ldapUser',null, array('attr'=>array('class'=>'form-control'),'required'=>false))                        
           // ->add('ldapMailAlias',null, array('attr'=>array('class'=>'form-control'),'required'=>false));

            ->add('ldapUser', 'entity', array(
                    'class' => 'ApplicationLDAPBundle:LDAPUser',
                    'empty_value' => '',
                    'required'=>false,
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
                    'required'=>false,
                    'attr'=>array('class'=>'form-control'),
                    'empty_value' => '',
                    'query_builder' => function(EntityRepository $er) {
                        return $er->createQueryBuilder('c')                     
                        ->orderBy('c.name', 'ASC');
                    },
            ))   ;         
    }

    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Application\LDAPBundle\Entity\LDAPMailAliasUser'
        ));
    }

    public function getName()
    {
        return 'Application_ldapbundle_ldapmailaliasusertype';
    }
}
