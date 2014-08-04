<?php

namespace Application\HelpDeskBundle\Repository;
use Doctrine\ODM\PHPCR\DocumentRepository;
use Application\HelpDeskBundle\Document\Article;

class ArticleRepository extends DocumentRepository
{ 
    public function searchQuery($options)
    {
        $options = array_merge(array(
            'event_uuid' => null,
        ), $options);
        $qb = $this->createQueryBuilder('e');

        if ($options['event_id']) {
            $qb->where()->descendant($options['event_id'], 'e');
        }

        $qb->orderBy()->desc()->field('e.date');
        return $qb->getQuery();
    }

    public function search($options)
    {
        $q = $this->searchQuery($options);
        return $q->execute();
    }
}
