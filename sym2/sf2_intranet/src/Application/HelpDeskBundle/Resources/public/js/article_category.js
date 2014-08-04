jQuery(document).ready(function($) {
	
	$(document).on('click', '#articleCategory', function(event) {
		$('#articleCategory').hide('fast', function() {
			$('select.articleCategory').show('fast');
		});
	});

	$(document).on('click', '#articleAccess', function(event) {
		$('#articleAccess').hide('fast', function() {
			$('select.articleAccess').show('fast');
		});
	});

	/*$(document).on('keydown', 'h3.articleCategory', function(event) {
		$('h3.articleCategory').sendkeys(' ');
	});*/

	$(document).on('change', 'select.articleCategory', function(event) {
		$(this).hide('fast', function() {
			$('#articleCategory')
				.html($(this).val())
				.show('fast', function() {
					$('#articleCategory')
						.focus();
						//.trigger('keydown');
				});
		});
	});

	$(document).on('change', 'select.articleAccess', function(event) {
		$(this).hide('fast', function() {
			$('#articleAccess')
				.html($(this).val())
				.show('fast', function() {
					$('#articleAccess')
						.focus();
						//.trigger('keydown');
				});
		});
	});	
	
	$('#add-new-article').click(function(){
		var href = $('#add-new-article').attr('data-href');
    
	    $("#add-article-dialog").dialog({
	        autoOpen: false, 
	        modal: true,
	        buttons : {
	            "Add" : function() {
	                window.location.href = href + $('#article-title').val()
	                								.trim()
	                                                .replace(/\ /g, '-')
	                                                .toLowerCase();
	            },
	            "Cancel" : function() {
	                $(this).dialog("close");
	            }
	        }
	    });
        $("#add-article-dialog").dialog('open');
    });
});