<?php
namespace Application\LDAPBundle\DependencyInjection\Factory;

use Symfony\Component\Config\Definition\Builder\NodeDefinition;
use Symfony\Component\DependencyInjection\DefinitionDecorator;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Reference;
use Symfony\Bundle\SecurityBundle\DependencyInjection\Security\Factory\FormLoginFactory;
use Application\LDAPBundle\Security\Core\Authentication\Provider\LDAPAuthenticationProvider;

class SecurityFactory extends FormLoginFactory
{
	public function getKey()
	{
		return 'ldap-login';
	}

	protected function getListenerId()
	{
		return 'security.authentication.listener.form';
	}

	protected function createAuthProvider(ContainerBuilder $container, $id, $config, $userProviderId)
	{
		$provider = 'security.authentication_provider.application_ldap_service.'.$id;
		$container
		->setDefinition($provider, new DefinitionDecorator('security.authentication_provider.application_ldap_service'))
		->replaceArgument(1, new Reference($userProviderId))
		->replaceArgument(3, $id)
		;

		return $provider;
	}
}