<?php

/*
 * This file is part of the Symfony package.
 *
 * (c) Fabien Potencier <fabien@symfony.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Application\LDAPBundle\Security\Core\Validator\Constraint;

use Symfony\Component\Validator\Constraint;

/**
 * @Annotation
 */
class UserPassword extends Constraint
{
    public $message = 'This password you entered is incorrect';

    public function validatedBy()
    {
        return 'ldap.user.password.validator';    	
    }
}
