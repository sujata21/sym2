jQuery(document).ready(function() {
	
    jQuery('body').midgardCreate('configureEditor', 'title', 'editWidget', {
    });
    jQuery('body').midgardCreate('setEditorForProperty', 'dcterms:title', 'title');
    
    jQuery('body').midgardCreate('setEditorForProperty', 'sioc:content', null);
    
    jQuery(cmfCreatePlainTextTypes).each(function(index, value) {
    	alert(value);
        jQuery('body').midgardCreate('setEditorForProperty', value, 'title');
    });
});

