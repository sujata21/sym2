$(document).ready( function() {

    $('#Upload').click(function () {
        alert('dxcjfvns');
        flag = 0;
        if($.trim($('#csv').val()) == ''){
            alert('Choose a file');
            $('#csv').focus();
            flag = 1;
            return false;
        }
        if(flag == 0){

            var datavar = $('#tescoform').serialize();
            //datavar = 'csv='+$('#csv').val();
            var formData = new FormData($('form')[0]);
            alert(formData);
           // datavar = 'csv='+file;
          //  url = '/app_dev.php/tesco/show';

            $.ajax({
                url: '/app_dev.php/tesco/show',
                type: 'POST',
                // Form data
                data: formData,
                //Options to tell JQuery not to process data or worry about content-type
                cache: false,
                contentType: false,
                processData: false
            }).done(function ( data ) {
                    alert(data)
                    //$("#result").val(data);
                    //$("#form").hide('slow');
                   // $("#show").show('slow');


                });
        }
    });
});