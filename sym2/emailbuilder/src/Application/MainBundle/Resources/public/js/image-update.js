$(document).ready(function(){

	$('#myModal').click(function(event) {
		//alert('dsf');
            $('#myModal').modal('show');
    });
    $('#close-modal').click(function(event) {
    	//alert('dsfsdf')
    	$("#myModal").hide();
 		$(".modal-backdrop").hide();
    });
    $('#close-modal-btn').click(function(event) {
    	$("#myModal").hide();
 		$(".modal-backdrop").hide();
    });
$('#image-update').click(function(event) {
	//alert('image update');
	var datastr = "signature="+$('#signature-image').val()+"&hero="+$('#hero-image').val()+"&pod1="+$('#pod1-image').val()+"&pod2="+$('#pod2-image').val()+"&pod3="+$('#pod3-image').val()+"&pod4="+$('#pod4-image').val()+"&pod5="+$('#pod5-image').val()+"&banner="+$('#banner-image').val();
	//alert(datastr);
	var emailname = $('#email-name').val();
	$.post('/app_dev.php/email/imageUpdate/'+emailname, datastr, function(data) {
		//alert(data);
		$("#myModal").hide();
 		$(".modal-backdrop").hide();
		var Iframe = parent.document.getElementById("iframe");
        iframe.contentWindow.location.reload();
        $("div#tabs").tabs( { active: 0 } ); 
	});
	
});

});