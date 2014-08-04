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

           var formData = new FormData($('form')[0]);
            $.ajax({
                url: '/app_dev.php/tesco/show',
                type: 'POST',
                data: formData,
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