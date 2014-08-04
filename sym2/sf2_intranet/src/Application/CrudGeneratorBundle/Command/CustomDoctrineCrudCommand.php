<?php
namespace Application\CrudGeneratorBundle\Command;

use Sensio\Bundle\GeneratorBundle\Generator\DoctrineCrudGenerator;

class CustomDoctrineCrudCommand extends \Sensio\Bundle\GeneratorBundle\Command\GenerateDoctrineCrudCommand
{
	protected function configure()
	{
		parent::configure();
		$this->setName('custom:generate:crud');
	}

	/*protected function getGenerator(BundleInterface $bundle = null)
	{
		$generator = new DoctrineCrudGenerator($this->getContainer()->get('filesystem'), realpath(__DIR__.'/../Resources/skeleton/crud'));
		$this->setGenerator($generator);
		return parent::getGenerator();
	}*/
	protected function getGenerator(BundleInterface $bundle = null)
    {
        if (null === $this->generator) {
            $this->generator = $this->createGenerator();
            $this->generator->setSkeletonDirs($this->getSkeletonDirs($bundle));
        }

        return $this->generator;
    }
}