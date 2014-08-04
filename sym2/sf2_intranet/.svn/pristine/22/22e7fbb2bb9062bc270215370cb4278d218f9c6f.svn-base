<?php
namespace Application\UserBundle\Component\Authentication\Handler;

use Symfony\Component\Security\Http\Authentication\AuthenticationSuccessHandlerInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\SecurityContext;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\Routing\RouterInterface;

class LoginSuccessHandler implements AuthenticationSuccessHandlerInterface
{	
	protected $router;
	protected $security;
	
	/**
	 *
	 * @access public
	 */
	public function __construct(RouterInterface $router, SecurityContext $security)
	{
		$this->router = $router;
		$this->security = $security;
	}

	/**
	 *
	 * @access public
	 * @param Request $request, TokenInterface $token
	 * @return RedirectResponse
	 */
	public function onAuthenticationSuccess(Request $request, TokenInterface $token)
	{
		$session = $request->getSession();
				
		if ($this->security->isGranted('ROLE_SUPER_ADMIN'))
		{
			$response = new RedirectResponse($this->router->generate('_homepage'));
		}
		elseif ($this->security->isGranted('ROLE_ADMIN'))
		{
			$response = new RedirectResponse($this->router->generate('_homepage'));
		}
		elseif ($this->security->isGranted('ROLE_USER'))
		{
			if ($session->get('referer') !== null && $session->get('referer') !== ''){
				$response = new RedirectResponse($session->get('referer'));
			} else {				
				$uri = $this->router->generate('_homepage');				
				$response = new RedirectResponse($uri);
			}
		}
		return $response;
	}


}