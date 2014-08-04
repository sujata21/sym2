$(document).ready(function(){


$('#searchemail').on('keyup', function(event) {
	//event.preventDefault();
	alert($('#searchemail').val())
	var keyword = $('#searchemail').val();
	parameter = "data="+keyword;
	$.post('/app_dev.php/email/typeahead', parameter, function(data) {
		/*optional stuff to do after success */
		alert(data);
	});
	/* Act on the event */
});

});