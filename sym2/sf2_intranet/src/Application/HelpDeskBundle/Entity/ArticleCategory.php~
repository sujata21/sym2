<?php

namespace Application\HelpDeskBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Application\HelpDeskBundle\Utils\ArticleUtils;

/**
 * ArticleCategory
 *
 * @ORM\Table(name="hd_article_category")
 * @ORM\Entity(repositoryClass="Application\HelpDeskBundle\Entity\ArticleCategoryRepository")
 * @ORM\HasLifecycleCallbacks
 */
class ArticleCategory
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=255)
     */
    private $name;

    /**
     * 
     * @ORM\ManyToOne(targetEntity="ArticleCategory")
     */
    private $parent;

    /**
     * @var string
     *
     * @ORM\Column(name="path", type="string", length=255, nullable=true)
     */
    private $path;

    public function __toString()
    {
        return (string) $this->parent;
    }

    /**
     * @ORM\PrePersist()
     */
    public function setParentValue()
    {
        /*$em = $this->getDoctrine()->getManager();
        $parentEntity = $em->getRepository('ApplicationHelpDeskBundle:ArticleCategory')->findOneBy(array('id' => $parentId));

        return $parentEntity->getParent();*/
    }

    /*public function getParentOneId()
    {
        $request  = $this->getRequest();
        $parentId = $request->request->get('parent');

        $em = $this->getDoctrine()->getManager();
        $parentEntity = $em->getRepository('ApplicationHelpDeskBundle:ArticleCategory')->findOneBy(array('id' => $parentId));

        return $parentEntity->getParent();
    }*/

    

    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set name
     *
     * @param string $name
     * @return ArticleCategory
     */
    public function setName($name)
    {
        $this->name = $name;
        
        $this->path = '/'.ArticleUtils::slugify($this->name);
        
        return $this;
    }

    /**
     * Get name
     *
     * @return string 
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set path
     *
     * @param string $path
     * @return ArticleCategory
     */
    public function setPath($path)
    {
        $this->path = $path;

        return $this;
    }

    /**
     * Get path
     *
     * @return string 
     */
    public function getPath()
    {
        return $this->path;
    }

    /**
     * Set parent
     *
     * @param \Application\HelpDeskBundle\Entity\ArticleCategory $parentId
     * @return ArticleCategory
     */
    public function setParent(\Application\HelpDeskBundle\Entity\ArticleCategory $parent = null)
    {
        $this->parent = $parent;
        if (!isset($this->parent)) {
            $this->path = '/'.ArticleUtils::slugify($this->name);
        }else {
            //$this->path = ArticleUtils::slugify($this->name);
            global $kernel;
            if ( 'AppCache' == get_class($kernel) )
            {
               $kernel = $kernel->getKernel();
            }
            $em = $kernel->getContainer()->get( 'doctrine.orm.entity_manager' );
            $parentName = $em->getRepository('ApplicationHelpDeskBundle:ArticleCategory')->findOneBy(array('id' => $parent));
            $this->path = $parentName->getPath().'/'.ArticleUtils::slugify($this->name);
        }
        return $this;
    }

    /**
     * Get parent
     *
     * @return \Application\HelpDeskBundle\Entity\ArticleCategory 
     */
    public function getParent()
    {
        return $this->parent;
    }
}