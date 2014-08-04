<?php

namespace AW\InterviewBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use AW\InterviewBundle\Entity\JobTitle;
use AW\InterviewBundle\Entity\TestCategory;
use AW\InterviewBundle\Entity\Options;
use AW\InterviewBundle\Entity\Interview;
use AW\InterviewBundle\Entity\Answer;
use AW\InterviewBundle\Entity\Result;

class DefaultController extends Controller
{

    /**
     * @Route("/interview/admin")
     * @Template()
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager('interview');

        $jobs = $em->getRepository('AWInterviewBundle:JobTitle')->findAll();
      // echo '<pre>';
      //var_dump($jobs[0]);

        $cat_name = array();
        for($i=0;$i<count($jobs);$i++){

            $cat[$jobs[$i]->getId()] = explode(',',$jobs[$i]->getCategory());
            $catid = $jobs[$i]->getId() ;
            for($j=0;$j<count($cat[$jobs[$i]->getId()]);$j++){
                $entity = $em->getRepository('AWInterviewBundle:TestCategory')->find($cat[$jobs[$i]->getId()][$j]);
                $cat_name[$catid][$j] = $entity->getName();
            }
        }
       // echo '</pre>';
        return array(
            'entities' => $jobs,
            'catname' => $cat_name,
        );
    }
    /**
     * @Route("/admin/review/{uid}/{c}")
     * @Template()
     */
    public function userresultAction($uid,$c)
    {
        $em = $this->getDoctrine()->getManager('interview');

        $grandtotal = 0;
        $grandscore = 0;
        $result = $em->getRepository('AWInterviewBundle:Interview')->findBy(array('url'=>$uid));
        $jobId = $result[0]->getJobId();

        //for dropdown
        $cat_drp = $em->getRepository('AWInterviewBundle:JobTitle')->findBy(array('id'=>$jobId));
        $category_drp = explode(',',$cat_drp[0]->getCategory());
        for($i=0;$i<count($category_drp);$i++){
            $categoryname_drp = $em->getRepository('AWInterviewBundle:TestCategory')->findBy(array('id'=>$category_drp[$i]));
            $catname_drp[$category_drp[$i]] = $categoryname_drp[0]->getName();

        }



        if($c == 'all'){


            $categoryStr = $em->getRepository('AWInterviewBundle:JobTitle')->findBy(array('id'=>$jobId));
            $category = explode(',',$categoryStr[0]->getCategory());
            //echo '<pre>'; var_dump($category); echo '</pre>';
            for($i=0;$i<count($category);$i++){
                $res = $em->getRepository('AWInterviewBundle:Result')->findBy(array('uid'=>$uid,'catid'=>$category[$i]));
                //var_dump($res);

                //$res[0]->getStime();
                $stime = $res[0]->getStime();
                $etime = $res[0]->getEtime();
                $interval = $stime->diff($etime);
                //var_dump($interval);
               // echo $interval->format('%i');

                $timetaken[$category[$i]] = $interval->format('%i');

                $answer =  $em->getRepository('AWInterviewBundle:Answer')->findBy(array('uid'=>$uid,'catid'=>$category[$i]));


                $categoryname = $em->getRepository('AWInterviewBundle:TestCategory')->findBy(array('id'=>$category[$i]));
                $catname[$category[$i]] = $categoryname[0]->getName();
                $catres[$category[$i]] = $this->result($uid,$category[$i]);
                $grandscore = $grandscore + $catres[$category[$i]][1];
                $grandtotal = $grandtotal + $catres[$category[$i]][0];

                for($j=0;$j<count($answer);$j++){
                    $q[$category[$i]][$j] = $answer[$j]->getQuestion();
                    $ans[$category[$i]][$j] = $answer[$j]->getAnswer();
                    $correct[$category[$i]][$j] = $answer[$j]->getCorrect();
                }


            }

            //echo '<pre>'; var_dump($answer); echo '</pre>';
        }else{

           // $category = $c;

            $res = $em->getRepository('AWInterviewBundle:Result')->findBy(array('uid'=>$uid,'catid'=>$c));
            //$res[0]->getStime();
            $stime = $res[0]->getStime();
            $etime = $res[0]->getEtime();
            $interval = $stime->diff($etime);
            //var_dump($interval);
            // echo $interval->format('%i');

            $timetaken[$c] = $interval->format('%i');

            $answer =  $em->getRepository('AWInterviewBundle:Answer')->findBy(array('uid'=>$uid,'catid'=>$c));
            for($j=0;$j<count($answer);$j++){

                $q[$c][$j] = $answer[$j]->getQuestion();
                $ans[$c][$j] = $answer[$j]->getAnswer();
                $correct[$c][$j] = $answer[$j]->getCorrect();


            }

            $categoryname = $em->getRepository('AWInterviewBundle:TestCategory')->findBy(array('id'=>$c));
            $catname[$c] = $categoryname[0]->getName();
            $catres[$c] = $this->result($uid,$c);
            $grandscore = $grandscore + $catres[$c][1];
            $grandtotal = $grandtotal + $catres[$c][0];

        }
        $totalscore = ($grandscore / $grandtotal) * 100;


        return array(
            'user' => $result[0],
            'category'=>$catname,
            'result' => $catres,
            'percent' =>$totalscore,
            'ans'  => $ans,
            'q'=> $q,
            'correct' => $correct,
            'time' => $timetaken,
            'cat_drp'=>$catname_drp,
        );
    }

    /**
     * @Route("/interview/save")
     * @Template()
     *
     */
    public function saveAction()    {
        //$data = $request->request->all();
        //var_dump($_POST);

        $em = $this->getDoctrine()->getManager('interview');
        $interview = new Interview();
        $interview->setJobtitle($_POST['jobtitle']);
        $interview->setJobId($_POST['test_type']);
        //$interview->setUrl('');
        $em->persist($interview);
        $em->flush();

        $id = $interview->getId();

        $encrypted = uniqid('AW_');
        $interview->setUrl($encrypted);

        $em->persist($interview);
        $em->flush();
        echo $encrypted;
        exit;




    }
    /**
     * @Route("/user_info/{uid}")
     * @Template()
     */
    public function userAction($uid)
    {
        $em = $this->getDoctrine()->getManager('interview');

        $entity = $em->getRepository('AWInterviewBundle:Interview')->findBy(array('url' => $uid ));
       //var_dump($entity);
        $jobtitle = $entity[0]->getJobtitle();
        //echo uniqid('AW_');

        return array(
            'jobtitle'=>$jobtitle,
            'uid' => $uid
        );
    }

    /**
     * @Route("/user/save")
     * @Template()
     */
    public function usersaveAction()
    {
       // var_dump($_POST);
         $uid = $_POST['uid'] ;
        $em = $this->getDoctrine()->getManager('interview');

        $entity = $em->getRepository('AWInterviewBundle:Interview')->findBy(array('url' => $uid ));
        //var_dump($entity);
        $entity[0]->setUsername($_POST['username']);
        $em->persist($entity[0]);
        $em->flush();

        $jobId = $entity[0]->getJobId();
        $job = $em->getRepository('AWInterviewBundle:JobTitle')->findBy(array('id' => $jobId ));
        //var_dump($job);
        $catstr = explode(',',$job[0]->getCategory());


        echo $url = '/interview/question/'.$uid.'/'.$catstr[0];

        //echo '';
        //$jobtitle = $entity[0]->getJobtitle();

        exit();
    }

    /**
     * @Route("/interview/question/{uid}/{cat_id}")
     * @Template()
     */
    public function questionAction($uid,$cat_id){



        $em = $this->getDoctrine()->getManager('interview');
        $category = $em->getRepository('AWInterviewBundle:TestCategory')->findBy(array('id'=>$cat_id));
        //var_dump($category);
        $questions = $em->getRepository('AWInterviewBundle:Question')->findBy(array('category'=>$cat_id));
        //echo count($questions);
        for($i=0;$i<count($questions);$i++){
            $options = $em->getRepository('AWInterviewBundle:Options')->findBy(array('questionId'=>$questions[$i]->getId()));
            //echo '<pre>'; var_dump($options); echo '</pre>';
            for($j=0;$j<count($options);$j++){
                $opvalue[$questions[$i]->getId()][$j]=$options[$j]->getOpAnswer();
            }

        }
        $user_result = $em->getRepository('AWInterviewBundle:Result')->findBy(array('uid' => $uid,'catid'=>$cat_id ));
        //var_dump($user_result);
        if(count($user_result) == 0){
            $result = new Result();
            $result->setCatid($cat_id);
            $result->setUid($uid);
            $result->setIp($_SERVER['REMOTE_ADDR']);
            $result->setStime(new \DateTime());
            $em->persist($result);
            $em->flush($result);
        }
       //echo '<pre>'; var_dump($opvalue); echo '</pre>';
        return array(
            'uid'=>$uid,
            'category' =>$category[0],
            'questions'=> $questions,
            'options' => $opvalue,
        );
    }

    /**
 * @Route("/interview/saveAnswer")
 * @Template()
 */
    public function saveAnswerAction(){
        //var_dump($_POST);
        $em = $this->getDoctrine()->getManager('interview');
        $check = $em->getRepository('AWInterviewBundle:Answer')->findBy(array('uid'=>$_POST['user_id'],'catid'=>$_POST['catid']));

        //var_dump($check);
        if(count($check) > 0){
            echo '0~This session is already answered';
        }else{
            for($i=1;$i<=$_POST['question_cnt'];$i++){
                $answer =  new Answer();
                $answer->setUid($_POST['user_id']);
                $answer->setQuestionId($_POST['question'.$i]);
                $correct_answer = $em->getRepository('AWInterviewBundle:Question')->findBy(array('id'=>$_POST['question'.$i]));
                $answer->setQuestion($correct_answer[0]->getQuestion());
                $answer->setCorrect($correct_answer[0]->getAnswer());
                $answer->setAnswer($_POST[$_POST['question'.$i].'option']);
                $answer->setIpAddress($_SERVER['REMOTE_ADDR']);
                $answer->setCatid($_POST['catid']);
                $em->persist($answer);
                $em->flush($answer);
                //var_dump($correct_answer);

            }
            $result = $this->result($_POST['user_id'],$_POST['catid']);
            //var_dump($result);
            $totalscore = ($result[1] / $result[0]) * 100;
            $user_result = $em->getRepository('AWInterviewBundle:Result')->findBy(array('uid' => $_POST['user_id'] ,'catid'=>$_POST['catid']));
            $user_result[0]->setEtime(new \DateTime());
            $user_result[0]->setScore($result[1]);
            $user_result[0]->setPercentage($totalscore);
            $em->persist($user_result[0]);
            $em->flush($user_result[0]);


            //echo 'Saved';
            $job = $em->getRepository('AWInterviewBundle:Interview')->findBy(array('url' => $_POST['user_id'] ));
            //var_dump($job);
            $cat = $em->getRepository('AWInterviewBundle:JobTitle')->findBy(array('id' => $job[0]->getJobId() ));

            $catstr = explode(',',$cat[0]->getCategory());
            //var_dump($catstr);
            $flag = 0;
            for($i=0;$i<count($catstr);$i++){
                    if($catstr[$i] == $_POST['catid'] &&  $i<(count($catstr)-1) ){
                        $flag = 1;
                        $catvalue = $catstr[$i+1];
                        echo '1~/interview/question/'.$_POST['user_id'].'/'.$catvalue;

                    }

            }
            if($flag == 0){
                echo '1~/interview/review/'.$_POST['user_id'];
            }


        }
        exit();
    }
    /**
     * @Route("/interview/review/{uid}")
     * @Template()
     */
    public function reviewAction($uid){
        //var_dump($_POST);
        $em = $this->getDoctrine()->getManager('interview');

        $grandtotal = 0;
        $grandscore = 0;
        $result = $em->getRepository('AWInterviewBundle:Interview')->findBy(array('url'=>$uid));
        //echo '<pre>';     var_dump($result);      echo '</pre>';
        $jobId = $result[0]->getJobId();
        $categoryStr = $em->getRepository('AWInterviewBundle:JobTitle')->findBy(array('id'=>$jobId));
        //echo '<pre>'; var_dump($categoryStr); echo '</pre>';
         $category = explode(',',$categoryStr[0]->getCategory());
       //echo '<pre>'; var_dump($category); echo '</pre>';
        for($i=0;$i<count($category);$i++){
           $categoryname = $em->getRepository('AWInterviewBundle:TestCategory')->findBy(array('id'=>$category[$i]));
           $catname[$category[$i]] = $categoryname[0]->getName();
           $catres[$category[$i]] = $this->result($uid,$category[$i]);
           $grandscore = $grandscore + $catres[$category[$i]][1];
            $grandtotal = $grandtotal + $catres[$category[$i]][0];

        }
        //var_dump($catres);
       // echo $grandtotal;
       // echo $grandscore;
         $totalscore = ($grandscore / $grandtotal) * 100;


        return array(
            'category'=>$catname,
            'result' => $catres,
            'percent' =>$totalscore
        );
    }
    public function result($uid,$catid){
       // echo $uid.$catid;
        $em = $this->getDoctrine()->getManager('interview');

        $result = $em->getRepository('AWInterviewBundle:Answer')->findBy(array('uid'=>$uid,'catid'=>$catid));
       // echo '<pre>';     var_dump(count($result));      echo '</pre>';
        $total = count($result);
        $score = 0;
        for($i=0;$i<count($result);$i++){
            if($result[$i]->getAnswer() == $result[$i]->getCorrect()){
                $score = $score+1;
            }
        }
        $catres[0] = $total;
        $catres[1] = $score;
        return $catres;

    }
    public function timeDifference($timeEnd, $timeStart){
        $tResult = round(abs(strtotime($timeEnd) - strtotime($timeStart)));
        return date("G:i", $tResult);
    }

    /**
     * @Route("/interview/list")
     * @Template()
     */
    public function listAction(){
        //var_dump($_POST);
        $em = $this->getDoctrine()->getManager('interview');

        $int = $em->getRepository('AWInterviewBundle:Interview')->findAll();
        $interview = $int;
        $i = 0;
        foreach($int as $int){
            $i++;
            $uid = $int->getUrl();
            $result = $em->getRepository('AWInterviewBundle:Result')->findBy(array('uid'=>$uid));
           // var_dump($result);
            if($result[0]){

               if($result[0]->getScore() == 'NULL' && $result[0]->getScore() != 0 ){
             //      echo $result[0]->getScore(); echo '<br>';
                   $linkflag[$uid] = 'false';
               }else{
                   $linkflag[$uid] = 'true';
               }
            }else{
                $linkflag[$uid] = 'false';
            }

        }
      /*  echo '<pre>';
        var_dump($linkflag);
        echo '</pre>';*/


        return array(
            'int'=>$interview,
            'flag'=>$linkflag,

        );
    }


}
