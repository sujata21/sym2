$(document).ready(function() {

	var sidebarPanels = [
		"#sidebar-search",
		"#sidebar-users",
		"#sidebar-mail",
		"#sidebar-helpdesk",
	];

	//assign users to group
	$(document).on("click", ".btn-add-user", function() {  
	    $('#Application_ldapbundle_ldapgrouptype_users option:selected').remove().appendTo('#Application_ldapbundle_ldapgrouptype_selected_users');  
    });
	$(document).on("dblclick", "#Application_ldapbundle_ldapgrouptype_users option:selected", function() {  
		$(this).remove().appendTo('#Application_ldapbundle_ldapgrouptype_selected_users');  
	});

	//unassign users to group
	$(document).on("click", ".btn-remove-user", function() {  
	    $('#Application_ldapbundle_ldapgrouptype_selected_users option:selected').remove().appendTo('#Application_ldapbundle_ldapgrouptype_users');  
    });
	$(document).on("dblclick", "#Application_ldapbundle_ldapgrouptype_selected_users option:selected", function() {  
		$(this).remove().appendTo('#Application_ldapbundle_ldapgrouptype_users');  
	});
    $('#Application_ldapbundle_ldapgrouptype_name').keyup(function () {
        $('#Application_ldapbundle_ldapgrouptype_mail_alias').val(this.value+'@alchemyworx.com');
    });
    
	//hide all sidebar panels
	sidebarPanels.forEach(function(entry) {
	    $(entry).hide();
	});

	$(document).on('click', '.sidebar-close', function(event) {
		closeSidebarPanel("");
	});	

	$(document).on('click', '#searchBtn', function(event) {
		event.preventDefault();
		closeSidebarPanel("#sidebar-search");
		$("#sidebar-search").toggle("slide");
	});

	$(document).on('click', '#usersBtn', function(event) {
		event.preventDefault();
		closeSidebarPanel("#sidebar-users");
		$("#sidebar-users").toggle("slide");
	});

	$(document).on('click', '#mailBtn', function(event) {
		event.preventDefault();
		closeSidebarPanel("#sidebar-mail");
		$("#sidebar-mail").toggle("slide");
	});

	$(document).on('click', '#helpdeskBtn', function(event) {
		event.preventDefault();
		closeSidebarPanel("#sidebar-helpdesk");
		$("#sidebar-helpdesk").toggle("slide");
	});
	
	$(document).on('click', '.btn-delete', function(event) {
		var confirmMessage = confirm("Are you sure you want to delete this?");
		if (confirmMessage == false) {
			return false;
		}
	});

	$(document).on('click', '#helpBtn', function(event) {
		//event.preventDefault();
		var moduleId = $(this).attr('data-module-id');
		var moduleTitle = $(this).attr('title');
		var moduleHelpContent = $('#' + moduleId + '-div-help-content').html();

		$('.modal').attr('id', moduleId);
		$('.modal-title').html(moduleTitle);
		$('.modal-body').html(moduleHelpContent);
		$('#' + moduleId).modal('show');
		$('#' + moduleId).on('hidden.bs.modal', function (e) {
			$('.modal').attr('id', '');
			$('.modal-title').html('');
			$('.modal-body').html('');
		})
	});

	$(document).on('change', '#page-count', function(event) {
		window.location.href = $(this).attr('data-href') + '?page-count=' + $(this).val();
	});

    $("#checkall").click(function(){
        $(this).closest("div.content").find(":checkbox").prop('checked',true);
    });
    $("#uncheckall").click(function(){
        $(this).closest("div.content").find(":checkbox").prop('checked',false);
    });
    $("#enable").click(function(){
        checkaction('1');

    });
    $("#disable").click(function(){
        checkaction('2');

    });
    $("#menable").click(function(){
        checkaction('3');

    });
    $("#mdisable").click(function(){
        checkaction('4');

    });
    $("#passwordUpdate").click(function(){
        checkaction('5');

    });
    $("#qgroup").click(function(){
        checkaction('6');

    });
    $("#qalias").click(function(){
        checkaction('7');

    });
    $("#remove_groupuser").click(function(){
        checkaction_groupuser(1);

    });
    $("#remove_aliasuser").click(function(){
        checkaction_groupuser(2);

    });

	//set selected page count value
	$("#page-count option").filter(function() {
	    return $(this).text() == getParams("page-count"); 
	}).prop('selected', true);

	//get param value from query string
	function getParams(paramName) {
	  return unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape(paramName).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
	}

	function closeSidebarPanel (panel) {
		sidebarPanels.forEach(function(entry) {
		    if (entry != panel) {
		    	$(entry).hide("slide");
		    };
		});
	}
	function checkaction_groupuser(flag){
        var r=confirm("Please confirm your action");
        if (r==true)
        {
            var selected = [];
            $("input:checkbox[name=chkBox]:checked").each(function() {
                selected.push($(this).val());
            });
            //alert(selected.length)
            if(selected.length > 0){
            	if(flag == 1){
            		url ='/admin/ldapusergroup/removegroupuser';
            	}else{
            		url ='/admin/ldapmailaliasuser/removealiasuser';
            	}
                // var para = selected+'&flag='+flag;
                $.post( url, { 'selected': selected } ).done(function(data){
                   // alert(data);
                    if(data == 'Successfully Updated!!'){
                        $('#message-success').html(data)
                        $('#success-alert').show('slide');
                    }else{
                        $('#message-fail').html(data);
                        $('#failure-alert').show('slide');
                    }
                });
            }else{
                alert('Please choose row for the action..');
            }
        }
        else
        {

        }
    }
    function checkaction(flag){
        var r=confirm("Please confirm your action");
        if (r==true)
        {
            var selected = [];
            $("input:checkbox[name=chkBox]:checked").each(function() {
                selected.push($(this).val());
            });
            //alert(selected.length)
            if(selected.length > 0){
                // var para = selected+'&flag='+flag;
                $.post( "/admin/ldapuser/enable", { 'selected': selected,'flag':flag } ).done(function(data){
                    //alert(data);
                    if(data == 'Successfully Updated!!'){
                        $('#message-success').html(data)
                        $('#success-alert').show('slide');
                    }else{
                        $('#message-fail').html(data);
                        $('#failure-alert').show('slide');
                    }
                });
            }else{
                alert('Please choose user for the action..');
            }
        }
        else
        {

        }
    }

    //ticket tabs click action
    $(document).on('click', '#btn-ticket-message', function(event) {
    	event.preventDefault();
    	$('#ticket-btn-comment').html($(this).attr('data-info'));
    	//$('#application_helpdeskbundle_ticketupdatetype_ticketIssue_message').focus();
    });

    $(document).on('click', '#btn-ticket-note', function(event) {
    	event.preventDefault();
    	$('#ticket-btn-comment').html($(this).attr('data-info'));
    	//$('#application_helpdeskbundle_ticketupdatetype_ticketIssue_note').focus();
    });

    // ticket popover
    $('.ticket-popover').on('mouseover', function () {
		var content = $('#' + $(this).attr('data-ticket-id' + '')).html();
		var selector = $('#' + $(this).attr('data-ticket-id') + '').selector;
    	$(this).attr('data-content', content);
	})


    $(function () {
	    $(".ticket-popover").popover({
	        placement : 'bottom'
	    });
	});

});