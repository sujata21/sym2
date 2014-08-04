<?php

namespace Application\LDAPBundle;

use Symfony\Component\HttpKernel\Bundle\Bundle;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Application\LDAPBundle\DependencyInjection\Factory\SecurityFactory;

class ApplicationLDAPBundle extends Bundle
{
	
	/**
	* Builds the bundle.
	*
	* It is only ever called once when the cache is empty.
	*
	* This method can be overridden to register compilation passes,
	* other extensions, ...
	*
	* @param ContainerBuilder $container A ContainerBuilder instance
	*/
	public function build(ContainerBuilder $container)
	{
		$extension = $container->getExtension('security');
		$extension->addSecurityListenerFactory(new SecurityFactory());
		
	}
	
}