/*
* docs form ajaxSubmit plugin http://jquery.malsup.com/form/#ajaxSubmit
*/
$(document).ready(function() {
	
	//list all test on tests index page
	listAllTests();
	
	//open/close divTestInfoContainer
	$('#divOpener').click(function(){
	    if($("#divTestInfoContainer").css("top") == "-127px") {
	      $("#divTestInfoContainer").animate({top: "0px"}, 500);
	      $('#divOpener').html('Close');
	    } else {
	      $("#divTestInfoContainer").animate({top: "-127px"}, 500);
	      $('#divOpener').html('Open');
	    }
	    return false;
	});
	
	//open Comments form dialog
	$("#divFormComments").dialog({ autoOpen: false });
	$('#openCommDialog').click(function() {
		$("#divFormComments").dialog({
			width: 500,
			resizable: false,
			height:600,
			close: $('#formComments').trigger( "reset" ),
			modal: true,});
		$('#divFormComments').dialog('open');
	});
	
	$('#formComments').trigger( "reset" );
	$('#formComments').on('submit', function(e) {
        e.preventDefault();
        $(this).ajaxSubmit({
			dataType: 'json',
			clearForm: true,
			success: function(data) {   
	            $("#divSavedComments").html(data.html);
	        },
            target: '#divSavedComments'
        });
        document.getElementById('aw_testplatformbundle_commentstype_text').focus();
	});
	
	//binds this to all delete forms in DOM
	$(document).on("submit", ".formDelComment", function(e) {
		e.preventDefault();
        $(this).ajaxSubmit({
			dataType: 'json',
			success: function(data) {   
	            $("#divSavedComments").html(data.html);
	        },
            target: '#divSavedComments'
        });
	});	
	
	//open devEmail dialog when change parameters link clicked and no dev email
	$(document).on("click", ".adminChangeParameters", function(e) {
		if ($('#tabDevEmail').html().trim().length == 0){
			e.preventDefault();
			devEmailCheck($('#divDevEmail').html());
		}
	});
	
	//open devEmail dialog when finish link clicked and no dev email
	$(document).on("click", ".adminTestDevFinish", function(e) {
		if ($('#tabDevEmail').html().trim().length == 0){
			e.preventDefault();
			devEmailCheck($('#divDevEmail').html());
		}
	});
	
	//open CommentsAll dialog
	$("#divAdminSavedComments").dialog({ autoOpen: false });
	$(document).on("click", ".buttonCommentsAll", function(e) {
		e.preventDefault();
		if ($('#tabDevEmail').html().trim().length !== 0){
			var url = $(this).attr('href');
			$.get(url, function(data) {
				$('#divAdminSavedComments').html(data);
			});
			$("#divAdminSavedComments").dialog({
				width: 500,
				resizable: false,
				close: $('#divAdminSavedComments').html(''),
				height:600,
				modal: true,});
			$('#divAdminSavedComments').dialog('open');
		}else {
			devEmailCheck($('#divDevEmail').html());
		}
	});
	
	//open CommentsNew dialog
	$("#divAdminSavedComments").dialog({ autoOpen: false });
	$(document).on("click", ".buttonCommentsNew", function(e) {
		e.preventDefault();
		if ($('#tabDevEmail').html().trim().length !== 0){
			var url = $(this).attr('href');
			$.get(url, function(data) {
				$('#divAdminSavedComments').html(data);
			});
			$("#divAdminSavedComments").dialog({
				width: 500,
				resizable: false,
				close: $('#divAdminSavedComments').html(''),
				height:600,
				modal: true,});
			$('#divAdminSavedComments').dialog('open');
		}else {
			devEmailCheck($('#divDevEmail').html());
		}		
	});
	
	//open CommentsDone dialog
	$("#divAdminSavedComments").dialog({ autoOpen: false });
	$(document).on("click", ".buttonCommentsDone", function(e) {
		e.preventDefault();
		if ($('#tabDevEmail').html().trim().length !== 0){
			var url = $(this).attr('href');
			$.get(url, function(data) {
				$('#divAdminSavedComments').html(data);
			});
			$("#divAdminSavedComments").dialog({
				width: 500,
				resizable: false,
				close: $('#divAdminSavedComments').html(''),
				height:600,
				modal: true,});
			$('#divAdminSavedComments').dialog('open');
		}else {
			devEmailCheck($('#divDevEmail').html());
		}		
	});
	
	//dev finish click
	$("#divMessages").dialog({ autoOpen: false });
	$(document).on("click", ".adminTestDevFinish", function(e) {
		e.preventDefault();
		if ($('#tabDevEmail').html().trim().length !== 0){
			devEmail =  $("#divDevEmail").html();
			var path = $(this).attr('href').slice(0,-1) + devEmail;
			$("#divMessages").html('Please wait. Sending email...');
			$("#divMessages").dialog({
				width: 200,
				resizable: false,
				height:100,
				modal: true,});
			$('#divMessages').dialog('open');
			$.get(path, function(data) {
				if (data.success == 1) {
					$('#divMessages').dialog('close');
				}
			});
		}else {
			devEmailCheck($('#divDevEmail').html());
		}		
	});
	
	//status update
	$(document).on("change", ".chboxStatus", function(e){
		var devEmail =  $("#divDevEmail").html();
		var path = $(this).attr('data-path').slice(0,-1) + devEmail;
		//alert(path);
		$(this).ajaxSubmit({
			dataType: 'json',
			url: path,
			success: function(data) {   
	            $("#divAdminSavedComments").html(data.html);
				$('#btnAll_'+data.testId).html(data.countAll);
				$('#btnNew_'+data.testId).html(data.countNew);
				$('#btnDone_'+data.testId).html(data.countDone);
	        },
            target: '#divAdminSavedComments'
        });
	});
	
	//admin tabs
	$(function() {
		$( "#tabs" ).tabs();
	});
	
	//search all tests for admin page
	function searchAllTests (){
		$.get('search/', function(data) {
			$('#progressbar').fadeIn(100);
			$('#results').html(data.html);
		    $('#testsCount').html(data.testsCount);
		    $('#progressbar').fadeOut(100);
		});
	}
	
	//search all tests for index tests page
	function listAllTests (){
		$.get('list/', function(data) {
			$('#progressbar').fadeIn(100);
			$('#results').html(data.html);
		    $('#testsCount').html(data.testsCount);
		    $('#progressbar').fadeOut(100);
		});
	}
	
	//load dev email
	devEmailCheck($('#divDevEmail').html());
	$('#tabDevEmail').html($('#divDevEmail').html());
	
	function devEmailCheck(email){
		if (email.length == 0){
			$("#dialogDevEmail").dialog({
				width: 290,
				resizable: false,
				height:145,
				modal: true,
				buttons: {
					"OK": function() {
						$('#divDevEmail').html($('#inputDevEmail').val());
						$('#tabDevEmail').html($('#inputDevEmail').val());
						if ($('#inputDevEmail').val().trim().length !== 0){
							$( this ).dialog( "close" );
						}
						$('#inputDevEmail').focus();
					},
					Cancel: function() {
						$( this ).dialog( "close" );
					}
				}
			});
			$('#dialogDevEmail').dialog('open');
		}else {
			$('#tabDevEmail').html($('#divDevEmail').html());
		}
	}
	
	//load all tests on tab load
	$("#dialogDevEmail").dialog({ autoOpen: false });
	$(document).on("click", "#tabTests", function(e){
		$('#testSearch').val('');
		searchAllTests();
		devEmailCheck($("#divDevEmail").html());
	});
	
	//admin tests search box
	$(document).on("keyup", "#testSearch", function(e){
		if($(this).val() !== '') {
			$.get('search/'+$(this).val(), function(data) {
				$('#progressbar').fadeIn(100);
				$('#results').html(data.html);
				$('#testsCount').html(data.testsCount);
			    $('#progressbar').fadeOut(100);
			});
		} else {
			searchAllTests();
		}
	});
	
	//testers tests search box
	//$(document).on("keyup", "#testSearch", function(e){
	alert('sdfdf');
	$("#testListSearch").keyup(function(e){
		alert($(this).val());
		/*if($(this).val() !== '') {
			$.get('search/'+$(this).val(), function(data) {
				$('#progressbar').fadeIn(100);
				$('#results').html(data.html);
				$('#testsCount').html(data.testsCount);
			    $('#progressbar').fadeOut(100);
			});
		} else {
			searchAllTests();
		}*/
	});
	
});