<?php

namespace Application\LDAPBundle\Form;


use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Security\Core\SecurityContext;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;


class LDAPUserType extends AbstractType
{
    private $securityContext;

    public function __construct(SecurityContext $securityContext)
    {
        $this->securityContext = $securityContext;
    }

    public function buildForm(FormBuilderInterface $builder, array $options)
    {   
        // grab the user, do a quick sanity check that one exists
        $user = $this->securityContext->getToken()->getUser();
       
        $builder
            ->add('firstname')
            ->add('lastname')
            ->add('job_title')
            ->add('department_id','entity',array('label'=>'Department','class'=> 'Application\LDAPBundle\Entity\Department','property'  => 'name'))
            ->add('office')
            ->add('telephone')
            ->add('mobile')
            ->add('username')
            ->add('email');
          
                if($user->hasRole('ROLE_ADMIN')){
                    $builder
                    ->add('enabled', 'checkbox', array( 'label'     => 'Account is enabled?',   'required'  => false,))
                    ->add('mail_account', 'checkbox', array( 'label'     => 'Account has mail account?',   'required'  => false,))    ;    
               }
        
    }

    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Application\LDAPBundle\Entity\LDAPUser'
        ));
    }

    public function getName()
    {
        return 'Application_ldapbundle_ldapusertype';
    }
}
