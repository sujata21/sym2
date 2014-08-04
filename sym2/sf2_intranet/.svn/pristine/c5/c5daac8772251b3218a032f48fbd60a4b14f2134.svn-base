<?php
namespace Application\UserBundle\Component\Authentication\Handler;

use Symfony\Component\Security\Http\Logout\LogoutSuccessHandlerInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Bundle\FrameworkBundle\Routing\Router;

class LogoutSuccessHandler implements LogoutSuccessHandlerInterface
{	
	/**
	 *
	 * @access public
	 */
	public function __construct()
	{

	}

	/**
	 *
	 * @access public
	 * @param Request $request
	 */
	public function onLogoutSuccess(Request $request)
	{
		$session = $request->getSession();

        if ($session->has('referer')) {
            if ($session->get('referer') !== null
            && $session->get('referer') !== '')
            {
                $response = new RedirectResponse($session->get('referer'));
            } else {
                $response = new RedirectResponse($request->getBasePath() . '/');
            }
        } else {
            // if no referer then go to homepage
            $response = new RedirectResponse($request->getBasePath() . '/');
        }

        return $response;
	}
}