<?php

namespace Application\UserBundle\Form\Type;

use Symfony\Component\Form\FormBuilderInterface;
use FOS\UserBundle\Form\Type\RegistrationFormType as BaseType;
use Application\ClientBundle\Form\Type\ProfileType as UserProfileType;

class RegistrationFormType extends BaseType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        parent::buildForm($builder, $options);

        // add your custom field
        $builder->add('profile', new UserProfileType());
    }

    public function getName()
    {
        return 'application_user_registration';
    }
}