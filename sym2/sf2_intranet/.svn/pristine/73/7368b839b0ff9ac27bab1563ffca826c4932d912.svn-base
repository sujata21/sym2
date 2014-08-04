<?php

namespace Application\LDAPBundle\DependencyInjection;

use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\Config\FileLocator;
use Symfony\Component\HttpKernel\DependencyInjection\Extension;
use Symfony\Component\DependencyInjection\Loader;

/**
 * This is the class that loads and manages your bundle configuration
 *
 * To learn more see {@link http://symfony.com/doc/current/cookbook/bundles/extension.html}
 */
class ApplicationLDAPExtension extends Extension
{
    /**
     * {@inheritDoc}
     */
    public function load(array $configs, ContainerBuilder $container)
    {
        $configuration = new Configuration();
        $config = $this->processConfiguration($configuration, $configs);

        $loader = new Loader\XmlFileLoader($container, new FileLocator(__DIR__.'/../Resources/config'));
        $loader->load('services.xml');
        
        $container->setParameter('Application_ldap.user_class', $config['user_class']);
        $container->setParameter('Application_ldap.server', $config['server']);
        $container->setParameter('Application_ldap.port', $config['port']);
        $container->setParameter('Application_ldap.use_tls', $config['use_tls']);
        $container->setParameter('Application_ldap.parameter.base_dn', $config['parameters']['base_dn']);
        $container->setParameter('Application_ldap.parameter.bind_dn', $config['parameters']['bind_dn']);
        $container->setParameter('Application_ldap.parameter.bind_passwd', $config['parameters']['bind_passwd']);
        $container->setParameter('Application_ldap.parameter.user_prefix', $config['parameters']['user_prefix']);
        $container->setParameter('Application_ldap.parameter.group_prefix', $config['parameters']['group_prefix']);
        $container->setParameter('Application_ldap.parameter.user_attribute', $config['parameters']['user_attribute']);
        $container->setParameter('Application_ldap.parameter.mail_attribute', $config['parameters']['mail_attribute']);
                        
    }
}
