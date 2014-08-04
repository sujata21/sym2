<?php

namespace Application\LDAPBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use Doctrine\ORM\EntityRepository;

class LDAPUserGroupType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder            
             ->add('ldapUser', 'entity', array(
                    'class' => 'ApplicationLDAPBundle:LDAPUser',
                    'required'=>false,
                    'empty_value' => '',
                    'query_builder' => function(EntityRepository $er) {
                        return $er->createQueryBuilder('c')                     
                        ->where('c.enabled = :flag ') 
                        ->setParameter('flag', '1')                
                        ->orderBy('c.username', 'ASC');
                    },
            ))  
            ->add('ldapGroup', 'entity', array(
                    'class' => 'ApplicationLDAPBundle:LDAPGroup',
                    'required'=>false,
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
            'data_class' => 'Application\LDAPBundle\Entity\LDAPUserGroup'
        ));
    }

    public function getName()
    {
        return 'Application_ldapbundle_ldapusergrouptype';
    }
}
