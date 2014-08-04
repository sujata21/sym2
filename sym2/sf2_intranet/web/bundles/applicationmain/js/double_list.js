jQuery(document).ready(function() {	
	DoubleList.addHandlers();
});

var DoubleList = {
		addHandlers: function() {	        
	        $('button.btn_double_list_select').live('click', function(event) {
	        	event.preventDefault();	           
	        	$("select.doublelist_unselected option:selected").each(function () {
	        		var $text = $(this).text();
	        		var $val = $(this).val();	        	  
	        		$("select.doublelist_selected").append($("<option/>", {  value: $val,  text: $text } ) );
	        		$(this).remove();
	        	});
	        });
	        $('button.btn_double_list_unselect').live('click', function(event) {
	        	event.preventDefault();	        	
	        	$("select.doublelist_selected option:selected").each(function () {
	        		var $text = $(this).text();
		        	var $val = $(this).val();	        	  
		        	$("select.doublelist_unselected").append($("<option/>", {  value: $val,  text: $text } ) );
		        	$(this).remove();
		        });
		    });
	        $('button.btn_double_list_submit').live('click', function(event) {	        		     
	        	$("select.doublelist_selected option").each(function () {
	        		$(this).attr('selected', true);
	        	});	        	
	        });
	    }
}