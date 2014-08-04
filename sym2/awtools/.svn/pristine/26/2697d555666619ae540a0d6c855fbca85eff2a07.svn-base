window.totaloption = 0;
$(document).ready( function() {

    $('#Upload').click(function (){
    var flag = 0;
    if($.trim($('#jobtitle').val()) == ''){
        $('#form-warning').html('Error! Please enter the Job Title.');
        $('#form-warning').show();
        $('#form-warning1').hide();
        $('#jobtitle').focus();
        flag = 1;
        return false;
    }
    if($('#test_type:checked').length == 0){
        //alert('Select at least one option!');
        $('#form-warning1').html('Error! Please select an option.');
        $('#form-warning1').show();
        $('#form-warning').hide();
        $('#test_type').focus();
        flag = 1;
        return false;
    }
    if(flag == 0){
        var datavar = $('#interview_admin').serialize();
        //alert(datavar);
        url = '/app_dev.php/interview/save';

        $.post( url, datavar).done(function( data ) {
            $('#url').html('Test URL : <a href="/user_info/'+data+'">click here</a>');
            $('#interview_admin').hide();
            $('#url').show();


            });
    }

});

    $('#user_submit').click(function (){
        var flag = 0;
        var uid =$('#uid').val();
        if($.trim($('#username').val()) == ''){
            $('#form-warning').html('Error! Please enter the your name.');
            $('#form-warning').show();
            $('#username').focus();
            flag = 1;
            return false;
        }
        if(flag == 0){
            var datavar = $('#user-form').serialize();
            datavar = 'username='+$('#username').val()+'&uid='+$('#uid').val();
            //alert(datavar);
            url = '/app_dev.php/user/save';

            $.post( url, datavar).done(function( data ) {
                window.location = data;
            });
        }

    });
    $('#user_answer').click(function (){

        var datavar = $('#question-list').serialize();
        //alert(datavar);
        //alert($('#question_cnt').val());
            var answer = 1;
            var datavar1 ='';

            for(i=1;i<=$('#question_cnt').val();i++){
                var opname = $('#question'+i).val()+'option';

                if($('#'+opname).attr('type') == 'radio'){
                    if($('input:radio[name='+opname+']:checked').length == 0){
                        answer = 0;

                        //alert(opname);
                        //alert($('input:radio[name='+opname+']:checked').val());
                    }
                }else{
                    if($.trim($('#'+opname).val()) == ''){
                        answer = 0;
                        //alert($('#'+opname).attr('type'));
                       // alert(opname);
                   }
                }
            }
            //alert(answer);
            if(answer == 0){
                alert('Please asnwer all question')
            }else{
                //datavar = datavar+datavar2;
                url = '/app_dev.php/interview/saveAnswer';
                $.post( url, datavar).done(function( data ) {
                   // alert(data)
                    result = data.split('~');

                    if(result[0]== 0){
                        alert(result[1])
                    }else{
                        window.location = result[1];
                    }
                    //window.location = data;
                });
            }

    });

});
function generateoptions(num){

    var str = '<div  class="span12" style="padding:20px 0px 20px 0px;font-style:italic ">Please click radio button to mark the correct answer</div>';
    for(var i=1; i<= num ; i++){
        str = str+'<div class="row-fluid"><div class="span3" style="float:left;" ><b>Option '+i+' :  </b></div><div class="span7"> <input placeholder="Type here…" type="text" name="option'+i+'" id="option'+i+'" style="width:250px;height: 30px;"></div><div class="span2" style="padding-left:15px;"><input type="radio" name="radio" id="radio_'+i+'" value="" onchange="get_correctans('+i+')" ></div></div>';
    }
    return str;
}

function get_optioncnt(){
    var val = $('#optioncnt').val();
    //alert(val);

    if(val > 0){
        totaloption = val;
        var str_option = generateoptions(val);
        $('#options').html(str_option);
        $('#options').show();
    }else{
        alert('Choose a valid number');
        $('#optioncnt').focus();
    }
}
function get_correctans(rval){

    var Correctans = $('#option'+rval).val();
    //alert(Correctans);
    if(Correctans == ''){
        alert('Please enter the option before choosing right answer!')
        $('#radio_'+rval).attr('checked' , false);
        $('#option'+rval).focus();
    }else{
        $('#correct_ans').val(Correctans);
    }

}
function save_answer(id){

    flag = 0;
    $('#ans_option_error').hide();
    //if(type != 'edit'){
        if($.trim($('#optioncnt').val()) == '' || $.trim($('#optioncnt').val()) == '0'){
            $('#ans_option_error').html('Select a number');
            $('#ans_option_error').show();
            //alert('Select a number ');
            $('#optioncnt').focus();
            flag = 1;
            return false;
        }
   // }
    //alert(totaloption);
    for(var i=1; i<=totaloption ; i++){
        if($.trim($('#option'+i).val()) == ''){
            alert('Enter option '+i);
            $('#option'+i).focus();
            flag = 1;
            return false;
        }
    }
    if($.trim($('#correct_ans').val()) == ''){
            alert('Please choose a correct answer ');
            //$('#question').focus();
            flag = 1;
            return false;
    }

    if(flag == 0){
        var datavar = $('#answer_form').serialize();
        // alert(datavar);
        url = '/app_dev.php/question/save';
        $.post( url, datavar, function(data) {
            $('#sucess').show();
            $('#answer_form').hide();
        });
    }



}