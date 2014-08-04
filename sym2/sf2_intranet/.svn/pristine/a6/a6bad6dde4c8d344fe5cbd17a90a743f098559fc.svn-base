<?php

namespace Application\LDAPBundle\DependencyInjection;

use Symfony\Component\Config\Definition\Builder\TreeBuilder;
use Symfony\Component\Config\Definition\ConfigurationInterface;

/**
 * This is the class that validates and merges configuration from your app/config files
 *
 * To learn more see {@link http://symfony.com/doc/current/cookbook/bundles/extension.html#cookbook-bundles-extension-config-class}
 */
class Configuration implements ConfigurationInterface
{
    /**
     * {@inheritDoc}
     */
    public function getConfigTreeBuilder()
    {
        $treeBuilder = new TreeBuilder();
        $rootNode = $treeBuilder->root('application_ldap');        
        $rootNode
            ->children()
                ->scalarNode('user_class')->isRequired()->cannotBeEmpty()->end()
                ->scalarNode('server')->defaultValue('localhost')->end()
                ->scalarNode('port')->defaultValue('389')->end()
                ->scalarNode('use_tls')->defaultFalse()->end()
                ->arrayNode('parameters')
                    ->children()
                        ->scalarNode('base_dn')->isRequired()->cannotBeEmpty()->end()
                        ->scalarNode('bind_dn')->isRequired()->cannotBeEmpty()->end()
                        ->scalarNode('bind_passwd')->isRequired()->cannotBeEmpty()->end()
                        ->scalarNode('user_prefix')->defaultValue('ou=people')->end()
                        ->scalarNode('group_prefix')->defaultValue('ou=group')->end()
                        ->scalarNode('mailalias_prefix')->defaultValue('ou=mailalias')->end()
                        ->scalarNode('user_attribute')->defaultValue('cn')->end()
                        ->scalarNode('mail_attribute')->defaultValue('mail')->end()                        
                        ->scalarNode('version')->defaultValue("3")->end()
                ->end()      
            ->end();        

        return $treeBuilder;
    }
}
