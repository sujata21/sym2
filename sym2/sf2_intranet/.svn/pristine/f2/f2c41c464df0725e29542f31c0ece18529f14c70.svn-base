<?php

/*
 * This file is part of the FOSUserBundle package.
 *
 * (c) FriendsOfSymfony <http://friendsofsymfony.github.com/>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Application\UserBundle\Form\Handler;
use FOS\UserBundle\Form\Handler\ResettingFormHandler as BaseResetHandler;
use FOS\UserBundle\Model\UserInterface;
use FOS\UserBundle\Model\UserManagerInterface;
use FOS\UserBundle\Form\Model\ChangePassword;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\HttpFoundation\Request;

class ResettingFormHandler extends BaseResetHandler
{
    protected $request;
    protected $userManager;
    protected $form;

    public function __construct(FormInterface $form, Request $request, UserManagerInterface $userManager)
    {
        $this->form = $form;
        $this->request = $request;
        $this->userManager = $userManager;
    }

    /**
     * @return string
     */
    public function getNewPassword()
    {
        return $this->form->getData()->new;
    }

    public function process(UserInterface $user)
    {
        //die();
        $this->form->setData(new ChangePassword());

        if ('POST' === $this->request->getMethod()) {
            $this->form->bind($this->request);

            if ($this->form->isValid()) {
                if ((!preg_match('/[A-Z]+[a-z]+[0-9]+/', $this->form->getData()->new)) || (strlen($this->form->getData()->new) < 8))
                    {
                       $this->form->addError(new\Symfony\Component\Form\FormError("New password should contain min 1 Capital letter and 1 Integer and min length 8 ."));
                        return false;
                    }
                $this->onSuccess($user);

                return true;
            }
        }

        return false;
    }

    protected function onSuccess(UserInterface $user)
    {
        $user->setPlainPassword($this->getNewPassword());
        $user->setConfirmationToken(null);
        $user->setPasswordRequestedAt(null);
        $user->setEnabled(true);
        $this->userManager->updateUser($user);
    }
}
