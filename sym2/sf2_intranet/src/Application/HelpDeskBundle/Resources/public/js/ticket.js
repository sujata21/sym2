$(document).ready(function() {	 
  	
	$("select#application_helpdeskbundle_tickettype_category").change(function(){
		  $.getJSON("/app_dev.php/ticket/get_sub_category",{category_id: $(this).val(), ajax: 'true'}, function(j){
	      var options = '';
	      for (var i = 0; i < j.length; i++) {
	        options += '<option value="' + j[i].optionValue + '">' + j[i].optionDisplay + '</option>';
	      }
	      $("select#application_helpdeskbundle_tickettype_subCategory").html(options);
	    })
	  })	
});
