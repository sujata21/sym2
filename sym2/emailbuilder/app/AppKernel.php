<?php

use Symfony\Component\HttpKernel\Kernel;
use Symfony\Component\Config\Loader\LoaderInterface;

class AppKernel extends Kernel
{
    public function registerBundles()
    {
        $bundles = array(
            new Symfony\Bundle\FrameworkBundle\FrameworkBundle(),
            new Symfony\Bundle\SecurityBundle\SecurityBundle(),
            new Symfony\Bundle\TwigBundle\TwigBundle(),
            new Symfony\Bundle\MonologBundle\MonologBundle(),
            new Symfony\Bundle\SwiftmailerBundle\SwiftmailerBundle(),
            new Symfony\Bundle\AsseticBundle\AsseticBundle(),
            new Doctrine\Bundle\DoctrineBundle\DoctrineBundle(),
            new Sensio\Bundle\FrameworkExtraBundle\SensioFrameworkExtraBundle(),

        		// enable cmf bundles
        		new Doctrine\Bundle\PHPCRBundle\DoctrinePHPCRBundle(),
        		new Symfony\Cmf\Bundle\RoutingBundle\CmfRoutingBundle(),
        		new Symfony\Cmf\Bundle\RoutingAutoBundle\CmfRoutingAutoBundle(),
        		new Symfony\Cmf\Bundle\CoreBundle\CmfCoreBundle(),
        		new Knp\Bundle\MenuBundle\KnpMenuBundle(),
        		new Symfony\Cmf\Bundle\MenuBundle\CmfMenuBundle(),
        		new Symfony\Cmf\Bundle\ContentBundle\CmfContentBundle(),
        		new Symfony\Cmf\Bundle\TreeBrowserBundle\CmfTreeBrowserBundle(),
        		new Symfony\Cmf\Bundle\BlockBundle\CmfBlockBundle(),
        		new Symfony\Cmf\Bundle\SimpleCmsBundle\CmfSimpleCmsBundle(),
        		new Symfony\Cmf\Bundle\BlogBundle\CmfBlogBundle(),
        		new Liip\SearchBundle\LiipSearchBundle(),
        		new Symfony\Cmf\Bundle\SearchBundle\CmfSearchBundle(),
        		new Symfony\Cmf\Bundle\MediaBundle\CmfMediaBundle(),
        		new FM\ElfinderBundle\FMElfinderBundle(),
        		
        		// language switcher
        		new Lunetics\LocaleBundle\LuneticsLocaleBundle(),
        		
        		// create.js editing related
        		new Symfony\Cmf\Bundle\CreateBundle\CmfCreateBundle(),
        		new FOS\RestBundle\FOSRestBundle(),
        		new JMS\SerializerBundle\JMSSerializerBundle($this),
        		
        		  		
        		
        		// admin bundle
        		new Sonata\jQueryBundle\SonatajQueryBundle(),
        		new Sonata\BlockBundle\SonataBlockBundle(),
                new Sonata\UserBundle\SonataUserBundle(),
        		new Sonata\CoreBundle\SonataCoreBundle(),
        		new Sonata\AdminBundle\SonataAdminBundle(),
        		new Sonata\DoctrinePHPCRAdminBundle\SonataDoctrinePHPCRAdminBundle(),
                new Sonata\DoctrineORMAdminBundle\SonataDoctrineORMAdminBundle(),
                new FOS\UserBundle\FOSUserBundle(),
        		new FOS\JsRoutingBundle\FOSJsRoutingBundle(),
        		
        		// Media support
        		new Liip\ImagineBundle\LiipImagineBundle(),
        		
        		// jackalope doctrine caching
        		// new Liip\DoctrineCacheBundle\LiipDoctrineCacheBundle(),
        		
        		// block caching and feeds
        		new Sonata\CacheBundle\SonataCacheBundle(),

                // and the application main bundle
                new Application\MainBundle\ApplicationMainBundle(),
                new Application\Sonata\UserBundle\ApplicationSonataUserBundle('FOSUserBundle'),
                new Application\TemplateBundle\ApplicationTemplateBundle(),
            new Application\UserBundle\ApplicationUserBundle(),
        );

        if (in_array($this->getEnvironment(), array('dev', 'test'))) {
            $bundles[] = new Acme\DemoBundle\AcmeDemoBundle();
            $bundles[] = new Symfony\Bundle\WebProfilerBundle\WebProfilerBundle();
            $bundles[] = new Sensio\Bundle\DistributionBundle\SensioDistributionBundle();
            $bundles[] = new Sensio\Bundle\GeneratorBundle\SensioGeneratorBundle();
        }

        return $bundles;
    }

    public function registerContainerConfiguration(LoaderInterface $loader)
    {
        $loader->load(__DIR__.'/config/config_'.$this->getEnvironment().'.yml');
    }
}
