jQuery(document).ready(function() {	
	Admin.add_filters(document);
});

var Admin = {

		add_filters: function(subject) {			
	        jQuery('div.filter_form_container.inactive', subject).hide();
	        jQuery('span.filter_form_legend', subject).click(function(event) {
	           jQuery('div.filter_form_container').toggle();	        	
	        });
	    }
}