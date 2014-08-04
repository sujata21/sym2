<?php

namespace AW\TescoBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

/**
 * JobTitle controller.
 *
 * @Route("/tesco")
 */
class DefaultController extends Controller
{
    /**
     * @Route("/")
     * @Template()
     */
    public function indexAction()
    {
        return array('name' => '');
    }
    /**
     * @Route("/show")
     * @Template()
     */
    public function showAction()
    {
        //var_dump($_FILES);
        $file = $_FILES['csv']['tmp_name'];
        $input = $this->csv_to_array($file);
        var_dump($input);
        echo $count1=count($input);
        exit;
    }

    public function csv_to_array($filename)
    {
        if(!file_exists($filename) || !is_readable($filename))
            return FALSE;

        $header = NULL;
        $data = array();
        if (($handle = fopen($filename, 'r')) !== FALSE)
        {
            while (($row = fgetcsv($handle, 1000, "\t")) !== FALSE)
            {
                if(!$header)
                    $header = $row;
                else
                    $data[] = array_combine($header, $row);
            }
            fclose($handle);
        }

        return $data;

    }
}
