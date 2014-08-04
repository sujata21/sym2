<?php

namespace Application\LDAPBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class LDAPUserGroupEmbeddedType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder            
            ->add('ldapUser')                        
            ->add('users', 'entity', array(
            		'multiple' => true,
            		'class' => 'ApplicationLDAPBundle:LDAPUser',
            		'query_builder' => function($repository) {
            		return $repository->createQueryBuilder('u')->orderBy('u.id', 'ASC');
            },
            'property' => 'username',))
            ->add('ldapUserGroups', 'entity', array(
            		'multiple' => true,
            		'class' => 'ApplicationLDAPBundle:LDAPUserGroup',
            		'query_builder' => function($repository) {
            		return $repository->getGroupUsers();
            },
            'property' => 'username',))
        ;
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
