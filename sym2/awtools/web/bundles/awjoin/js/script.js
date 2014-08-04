$(document).ready( function() {


    $('#Upload').click(function () {

        if($("#uploadfile").val() == ''){
            alert('Please choose a XLSX file');
            $("#uploadfile").focus();
        }else{
            //alert($("#uploadfile").val());
            var formData = new FormData($('form')[0]);
            // alert(formData);
            $.ajax({
                url: '/app_dev.php/join/save',
                type: 'POST',
                // Form data
                data: formData,
                //Options to tell JQuery not to process data or worry about content-type
                cache: false,
                contentType: false,
                processData: false
            }).done(function ( data ) {
                    //alert(data)
                    $("#result").val(data);
                    $("#form").hide('slow');
                    $("#show").show('slow');

                    /* if( console && console.log ) {
                     console.log("Sample of data:", data.slice(0, 100));
                     }*/
                });
        }
    });
});