/**
 * Created with JetBrains PhpStorm.
 * User: spandey
 * Date: 12/06/13
 * Time: 13:05
 * To change this template use File | Settings | File Templates.
 */


    $('#Upload').click(function () {
        alert('dxcjfvns');
        var formData = new FormData($('form')[0]);
        alert(formData);
        $.ajax({
            url: '/app_dev.php/save',
            type: 'POST',
            // Form data
            data: formData,
            //Options to tell JQuery not to process data or worry about content-type
            cache: false,
            contentType: false,
            processData: false
        });
    });
