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

use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\SecurityContextInterface;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;
use Symfony\Component\Validator\Exception\ConstraintDefinitionException;

use Application\LDAPBundle\Service\Service;

class UserPasswordValidator extends ConstraintValidator
{
    private $securityContext;
    private $ldapService;

    public function __construct(SecurityContextInterface $securityContext, Service $ldapService)
    {
        $this->securityContext = $securityContext;
        $this->ldapService = $ldapService;
    }

    public function validate($password, Constraint $constraint)
    {
        $user = $this->securityContext->getToken()->getUser();
		
        if (!$user instanceof UserInterface) {
            throw new ConstraintDefinitionException('The User must extend UserInterface');
        }

        if (!$this->ldapService->authenticate($user->getUsername(), $password)) {
            $this->context->addViolation($constraint->message);
        }
    }
}
