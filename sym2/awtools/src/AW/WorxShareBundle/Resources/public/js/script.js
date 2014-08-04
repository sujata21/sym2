$(document).ready(function() {
	var divContent = $("#divContent"),
		divSysInfo = $("#divSysInfo"),
		divNewEditForm = $("#divNewEditForm");
	
	//divSysInfo horizontal position - half of window
	divSysInfo.css("margin-left", ($(window).width()/2) - (divSysInfo.width()/2));
	
	//show system information window
	function showSysInfo(text) {
		divSysInfo.html(text).fadeIn();
		//divSysInfo.html("<i class=\"icon-spinner icon-spin icon-large\"></i>").fadeIn();
	}
	//hide system information window
	function hideSysInfo() {
		setTimeout(function(){
			divSysInfo.fadeOut();
        }, 500); 
	}
	
	//load users
	$(document).on("click", ".btnUsers", function() {
		showSysInfo("Loading users list...");
		$.get($(this).attr("data-href"), function(data) {
			hideSysInfo();
			divContent.html(data.html);
		});
	});
	
	//delete user
	$(document).on("click", ".btnUserDelete", function() {
		var confirmDlg = confirm("Are you sure you want to delete this user?");
		if (confirmDlg == true) {
			$.post($(this).attr("data-href"), function(data) {
				if (data.success) {
					divContent.html(data.html);
					showSysInfo("User deleted.");
				}else {
					switch(data.errorMsg) {
						case 'loggedin':
							alert("You can not delete logged in user.");
							break;
						case 'hasClients':
						  alert("You can not delete this user.\nUser is assigned to clients.");
						  break;
						case 'hasProjects':
							alert("You can not delete this user.\nUser has assigned projects.");
							break;
						default:
							showSysInfo("User can not be deleted.");
					}
					
					/*if (data.errorMsg == 'loggedin') {
						alert("You can not delete logged in user.");
					} else {
						showSysInfo("User can not be deleted.");
					}*/
				}
				hideSysInfo();
			});
		}
	});
	
	//lock user
	$(document).on("click", ".btnUserLock", function() {
		var confirmDlg = confirm("Are you sure you want to lock this user?"),
			thisButton = $(this);//reference to clicked button
		if (confirmDlg == true) {
			$.post($(this).attr("data-href-lock"), function(data) {
				if (data.success) {
					showSysInfo("User locked.");
					$.get(thisButton.attr("data-href-list"), function(data) {
						divContent.html(data.html);
						hideSysInfo();
					});
				}else {
					if (data.errorMsg == 'loggedin') {
						alert("You can not lock logged in user.");
					} else {
						showSysInfo("User can not be locked.");
					}
					hideSysInfo();
				}
			});
		}
	});
	
	//unlock user
	$(document).on("click", ".btnUserUnlock", function() {
		var confirmDlg = confirm("Are you sure you want to unlock this user?"),
			thisButton = $(this);//reference to clicked button
		if (confirmDlg == true) {
			$.post($(this).attr("data-href-unlock"), function(data) {
				if (data.success) {
					showSysInfo("User unlocked.");
					$.get(thisButton.attr("data-href-list"), function(data) {
						divContent.html(data.html);
						hideSysInfo();
					});
				}else {
					showSysInfo("User can not be unlocked.");
				}
				hideSysInfo();
			});
		}
	});
	
	//new user button - opens dialog
	$(document).on("click", "#btnNewUser", function() {
		showSysInfo("Generating new user form...");
		$.get($(this).attr("data-href"), function(data) {
			 $(function() {
				 divNewEditForm.dialog({
					 //height: 140,
					 width: 250,
					 modal: true,
					 autoOpen: false,
					 resizable: false,
					 //show: "fadeIn",
					 //hide: "fadeOut",
					 close: function() {
						 divNewEditForm.empty();
					}
				 });
			 });
			 divNewEditForm.html(data.html);
			 divNewEditForm.dialog("open");
			 hideSysInfo();
		});
	});

	//new user form submit
	$(document).on('click', '#btnNewUserSave', function(e) {
		//e.preventDefault();
		var options = { 
	        target:        '#divNewEditForm',   // target element(s) to be updated with server response 
	        //beforeSubmit:  showRequest,  // pre-submit callback 
	        success: function(data) {   
	        			if (data.success) {
	        				hideSysInfo();
	        				divNewEditForm.dialog("close");
		        			showSysInfo("Loading users list...");
							$.get($(".btnUsers").attr("data-href"), function(data) {
								divContent.html(data.html);
								hideSysInfo();
							});
						}else {
							$('#divNewEditForm').html(data.html);
						}	        			
			         }
	 
	        // other available options: 
	        //url:       url         // override for form's 'action' attribute 
	        //type:      type        // 'get' or 'post', override for form's 'method' attribute 
	        //dataType:  null        // 'xml', 'script', or 'json' (expected server response type) 
	        //clearForm: true        // clear all form fields after successful submit 
	        //resetForm: true        // reset the form after successful submit 
	 
	        // $.ajax options can be used here too, for example: 
	        //timeout:   3000 
	    }; 
	 
	    // bind to the form's submit event 
	    $('#formNewUser').submit(function() { 
	    	showSysInfo("Saving new user...");
	    	$(this).ajaxSubmit(options);
	    	hideSysInfo();
	        return false; 
	    });
	});	
	
	//edit user button - opens dialog
	$(document).on("click", ".btnUserEdit", function() {
		$.get($(this).attr("data-href"), function(data) {
			 $(function() {
				 divNewEditForm.dialog({
					 //height: 140,
					 width: 250,
					 modal: true,
					 autoOpen: false,
					 resizable: false,
					 //show: "fadeIn",
					 //hide: "fadeOut",
					 close: function() {
						 divNewEditForm.empty();
					}
				 });
			 });
			 divNewEditForm.html(data);
			 divNewEditForm.dialog("open");
		});
	});
	
	//edit user form submit
	$(document).on('click', '#btnEditUserSave', function(e) {
		//e.preventDefault();
		var name = $.trim($('#aw_worxsharebundle_usertype_name').val()).length,
			email = $.trim($('#aw_worxsharebundle_usertype_email').val()).length;
	
		if (name != 0 && email != 0) {
			var options = { 
		        target:        '#divNewEditForm',   // target element(s) to be updated with server response 
		        //beforeSubmit:  showRequest,  // pre-submit callback 
		        success: function(data) {   
		        			if (data.success) {
		        				divNewEditForm.dialog("close");
			        			showSysInfo("Loading users list...");
								$("#navbarUserName").html(data.userName);
								divContent.html(data.html);
								hideSysInfo();
							}else {
								$('#divNewEditForm').html(data.html);
							}	        			
				         }
		 
		        // other available options: 
		        //url:       url         // override for form's 'action' attribute 
		        //type:      type        // 'get' or 'post', override for form's 'method' attribute 
		        //dataType:  null        // 'xml', 'script', or 'json' (expected server response type) 
		        //clearForm: true        // clear all form fields after successful submit 
		        //resetForm: true        // reset the form after successful submit 
		 
		        // $.ajax options can be used here too, for example: 
		        //timeout:   3000 
		    }; 
		 
		    // bind to the form's submit event 
		    $('#formEditUser').submit(function() { 
		    	showSysInfo("Saving user...");
		    	$(this).ajaxSubmit(options);
		    	hideSysInfo();
		        return false; 
		    });
		}else {
			alert("Name and Email fields can not be empty");
			return false;
		}
	});	
	
	//new client button - opens dialog
	$(document).on("click", "#btnNewClient", function() {
		showSysInfo("Generating new client form...");
		$.get($(this).attr("data-href"), function(data) {
			 $(function() {
				 divNewEditForm.dialog({
					 //height: 140,
					 width: 250,
					 modal: true,
					 autoOpen: false,
					 resizable: false,
					 //show: "fadeIn",
					 //hide: "fadeOut",
					 close: function() {
						 divNewEditForm.empty();
					}
				 });
			 });
			 divNewEditForm.html(data);
			 divNewEditForm.dialog("open");
			 hideSysInfo();
		});
	});	

	//new client form submit
	$(document).on('click', '#btnNewClientSave', function(e) {
		//e.preventDefault();
		var options = { 
	        target:        '#divNewEditForm',   // target element(s) to be updated with server response 
	        //beforeSubmit:  showRequest,  // pre-submit callback 
	        success: function(data) {   
	        			if (data.success) {
	        				hideSysInfo();
	        				divNewEditForm.dialog("close");
		        			showSysInfo("Loading clients list...");
							//$.get($(".btnClients").attr("data-href"), function(data) {
								divContent.html(data.html);
								hideSysInfo();
							//});
						}else {
							$('#divNewEditForm').html(data.html);
						}	        			
			         }
	 
	        // other available options: 
	        //url:       url         // override for form's 'action' attribute 
	        //type:      type        // 'get' or 'post', override for form's 'method' attribute 
	        //dataType:  null        // 'xml', 'script', or 'json' (expected server response type) 
	        //clearForm: true        // clear all form fields after successful submit 
	        //resetForm: true        // reset the form after successful submit 
	 
	        // $.ajax options can be used here too, for example: 
	        //timeout:   3000 
	    }; 
	 
	    // bind to the form's submit event 
	    $('#formNewClient').submit(function() { 
	    	showSysInfo("Saving new client...");
	    	$(this).ajaxSubmit(options);
	    	hideSysInfo();
	        return false; 
	    });
	});		
	
	//edit client button - opens dialog
	$(document).on("click", ".btnClientEdit", function() {
		showSysInfo("Generating edit client form...");
		$.get($(this).attr("data-href"), function(data) {
			 $(function() {
				 divNewEditForm.dialog({
					 //height: 140,
					 width: 250,
					 modal: true,
					 autoOpen: false,
					 resizable: false,
					 //show: "fadeIn",
					 //hide: "fadeOut",
					 close: function() {
						 divNewEditForm.empty();
					}
				 });
			 });
			 divNewEditForm.html(data);
			 divNewEditForm.dialog("open");
			 hideSysInfo();
		});
	});

	//edit client form submit
	$(document).on('click', '#btnEditClientSave', function(e) {
		//e.preventDefault();
		var name = $.trim($('#aw_worxsharebundle_clientstype_name').val()).length;
		
		if (name != 0) {
			var options = { 
		        target:        '#divNewEditForm',   // target element(s) to be updated with server response 
		        //beforeSubmit:  showRequest,  // pre-submit callback 
		        success: function(data) {   
		        			if (data.success) {
		        				divNewEditForm.dialog("close");
			        			showSysInfo("Loading clients list...");
								divContent.html(data.html);
								hideSysInfo();
							}else {
								$('#divNewEditForm').html(data.html);
							}	        			
				         }
		 
		        // other available options: 
		        //url:       url         // override for form's 'action' attribute 
		        //type:      type        // 'get' or 'post', override for form's 'method' attribute 
		        //dataType:  null        // 'xml', 'script', or 'json' (expected server response type) 
		        //clearForm: true        // clear all form fields after successful submit 
		        //resetForm: true        // reset the form after successful submit 
		 
		        // $.ajax options can be used here too, for example: 
		        //timeout:   3000 
		    }; 
		 
		    // bind to the form's submit event 
		    $('#formEditClient').submit(function() { 
		    	showSysInfo("Saving client...");
		    	$(this).ajaxSubmit(options);
		    	hideSysInfo();
		        return false; 
		    });
		}else {
			alert("Name field can not be empty");
			return false; 
		}
	});		

	//delete client
	$(document).on("click", ".btnClientDelete", function() {
		var confirmDlg = confirm("Are you sure you want to delete this client?");
		if (confirmDlg == true) {
			$.post($(this).attr("data-href"), function(data) {
				if (data.success) {
					divContent.html(data.html);
					showSysInfo("Client deleted.");
				}else {
					switch(data.errorMsg) {
						case 'hasUsers':
						  alert("You can not delete this client.\nClient is assigned to Users.");
						  break;
						case 'hasProjects':
							alert("You can not delete this client.\nClient has assigned projects.");
							break;
						default:
							showSysInfo("Client can not be deleted.");
					}
					
					/*if (data.errorMsg == 'hasProjects') {
						alert("You can not delete this client.\nClient has assigned projects.");
					} else {
						showSysInfo("Client can not be deleted.");
					}*/
				}
				
			});
		}
	});	
	
	//new project button - opens dialog
	$(document).on("click", "#btnNewProject", function() {
		showSysInfo("Generating new project form...");
		$.get($(this).attr("data-href"), function(data) {
			 $(function() {
				 divNewEditForm.dialog({
					 //height: 140,
					 width: 250,
					 modal: true,
					 autoOpen: false,
					 resizable: false,
					 //show: "fadeIn",
					 //hide: "fadeOut",
					 close: function() {
						 divNewEditForm.empty();
					}
				 });
			 });
			 divNewEditForm.html(data);
			 divNewEditForm.dialog("open");
			 hideSysInfo();
		});
	});		
	
	//new project form submit
	$(document).on('click', '#btnNewProjectSave', function(e) {
		//e.preventDefault();
		var options = { 
	        target:        '#divNewEditForm',   // target element(s) to be updated with server response 
	        //beforeSubmit:  showRequest,  // pre-submit callback 
	        success: function(data) {   
	        			if (data.success) {
	        				hideSysInfo();
	        				divNewEditForm.dialog("close");
		        			showSysInfo("Loading projects list...");
							//$.get($(".btnClients").attr("data-href"), function(data) {
								divContent.html(data.html);
								hideSysInfo();
							//});
						}else {
							$('#divNewEditForm').html(data.html);
						}	        			
			         }
	 
	        // other available options: 
	        //url:       url         // override for form's 'action' attribute 
	        //type:      type        // 'get' or 'post', override for form's 'method' attribute 
	        //dataType:  null        // 'xml', 'script', or 'json' (expected server response type) 
	        //clearForm: true        // clear all form fields after successful submit 
	        //resetForm: true        // reset the form after successful submit 
	 
	        // $.ajax options can be used here too, for example: 
	        //timeout:   3000 
	    }; 
	 
	    // bind to the form's submit event 
	    $('#formNewProject').submit(function() { 
	    	showSysInfo("Saving new project...");
	    	$(this).ajaxSubmit(options);
	    	hideSysInfo();
	        return false; 
	    });
	});	
	
	//edit project button - opens dialog
	$(document).on("click", ".btnProjectEdit", function() {
		showSysInfo("Generating edit project form...");
		$.get($(this).attr("data-href"), function(data) {
			 $(function() {
				 divNewEditForm.dialog({
					 //height: 140,
					 width: 250,
					 modal: true,
					 autoOpen: false,
					 resizable: false,
					 //show: "fadeIn",
					 //hide: "fadeOut",
					 close: function() {
						 divNewEditForm.empty();
					}
				 });
			 });
			 divNewEditForm.html(data);
			 divNewEditForm.dialog("open");
			 hideSysInfo();
		});
	});	
	
	//edit project form submit
	$(document).on('click', '#btnEditProjectSave', function(e) {
		//e.preventDefault();
		var name = $.trim($('#aw_worxsharebundle_projectstype_name').val()).length;
		
		if (name != 0) {
			var options = { 
		        target:        '#divNewEditForm',   // target element(s) to be updated with server response 
		        //beforeSubmit:  showRequest,  // pre-submit callback 
		        success: function(data) {   
		        			if (data.success) {
		        				divNewEditForm.dialog("close");
			        			showSysInfo("Loading projects list...");
								divContent.html(data.html);
								hideSysInfo();
							}else {
								$('#divNewEditForm').html(data.html);
							}	        			
				         }
		 
		        // other available options: 
		        //url:       url         // override for form's 'action' attribute 
		        //type:      type        // 'get' or 'post', override for form's 'method' attribute 
		        //dataType:  null        // 'xml', 'script', or 'json' (expected server response type) 
		        //clearForm: true        // clear all form fields after successful submit 
		        //resetForm: true        // reset the form after successful submit 
		 
		        // $.ajax options can be used here too, for example: 
		        //timeout:   3000 
		    }; 
		 
		    // bind to the form's submit event 
		    $('#formEditProject').submit(function() { 
		    	showSysInfo("Saving project...");
		    	$(this).ajaxSubmit(options);
		    	hideSysInfo();
		        return false; 
		    });
		}else {
			alert("Name field can not be empty");
			return false; 
		}
	});		
	
	//delete project
	$(document).on("click", ".btnProjectDelete", function() {
		var confirmDlg = confirm("Are you sure you want to delete this project?");
		if (confirmDlg == true) {
			$.post($(this).attr("data-href"), function(data) {
				if (data.success) {
					divContent.html(data.html);
					showSysInfo("Project deleted.");
				}else {
					switch(data.errorMsg)
					{
					case 'hasClients':
						alert("You can not delete this project.\nProject is assigned to Clients.");
					  break;
					case 'hasUsers':
					  alert("You can not delete this project.\nProject is assigned to Users.");
					  break;
					case 'hasComments':
						alert("You can not delete this project.\nProject has assigned Comments.");
						break;
					default:
						showSysInfo("Project can not be deleted.");
					}
					
					/*if (data.errorMsg == 'hasProjects') {
						alert("You can not delete this project.\nProject has assigned comments.");
					} else {
						showSysInfo("Project can not be deleted.");
					}*/
				}
				
			});
		}
	});		

	//add images to project button - opens dialog
	$(document).on("click", ".btnProjectImages", function() {
		showSysInfo("Generating add images to project form...");
		$.get($(this).attr("data-href"), function(data) {
			 $(function() {
				 divNewEditForm.dialog({
					 //height: 320,
					 width: 500,
					 modal: true,
					 autoOpen: false,
					 resizable: false,
					 //show: "fadeIn",
					 //hide: "fadeOut",
					 close: function() {
						 divNewEditForm.empty();
					}
				 });
			 });
			 divNewEditForm.html(data);
			 divNewEditForm.dialog("open");
			 hideSysInfo();
		});
	});		
	
	//project's image upload
	$(document).on("click", "#btnAddImage", function() {
		$("#imageUpload").click();
	});
	$(document).on("change", "#imageUpload", function() {
		$("#imageOrgName").val($(this).val());
		$("#aw_worxsharebundle_projectsimagestype_name").val($(this).val());
		readURL(this);
	});
	//project's image preview
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            
            reader.onload = function (e) {
            	//$('#imagePreview').before("<br><br>");
                $('#imagePreview').attr('src', e.target.result);
                //$('#imagePreview').after("<br><br>");
            };
            
            reader.readAsDataURL(input.files[0]);
        }
    }
    
	//add image form submit
	$(document).on('click', '#imageSave', function(e) {
		//e.preventDefault();
		var options = { 
	        target:        '#divNewEditForm',   // target element(s) to be updated with server response 
	        //beforeSubmit:  showRequest,  // pre-submit callback 
	        success: function(data) {   
	        			if (data.success) {
	        				hideSysInfo();
	        				divNewEditForm.dialog("close");
		        			showSysInfo("Loading projects list...");
							$.get($(".btnProjects").attr("data-href"), function(data) {
								divContent.html(data);
								hideSysInfo();
							});
						}else {
							$('#divNewEditForm').html(data.html);
						}	        			
			         }
	 
	        // other available options: 
	        //url:       url         // override for form's 'action' attribute 
	        //type:      type        // 'get' or 'post', override for form's 'method' attribute 
	        //dataType:  null        // 'xml', 'script', or 'json' (expected server response type) 
	        //clearForm: true        // clear all form fields after successful submit 
	        //resetForm: true        // reset the form after successful submit 
	 
	        // $.ajax options can be used here too, for example: 
	        //timeout:   3000 
	    }; 
	 
	    // bind to the form's submit event 
	    $('#formAddImage').submit(function() { 
	    	showSysInfo("Adding image to project...");
	    	$(this).ajaxSubmit(options);
	    	hideSysInfo();
	    	return false; 
	    });
	});    
	
	//image delete
	$(document).on("click", ".btnImageDelete", function() {
		var confirmDlg = confirm("Are you sure you want to delete this image and all comments?");
		if (confirmDlg == true) {
			showSysInfo("Deleting image...");
			$.post($(this).attr("data-href"), function(data) {
				if (data.success) {
					hideSysInfo();
					divNewEditForm.dialog("close");
					showSysInfo("Loading projects...");
					$.get($(".btnProjects").attr("data-href"), function(data) {
						divContent.html(data);
					});
				}else {
					showSysInfo("Image can not be deleted.");
				}
				hideSysInfo();
			});
		}
	});
	
	//new/edit dialog cancel button
	$(document).on("click", "#btnNewEditCancel", function() {
		divNewEditForm.dialog("close");
	});

	//password change link
	$(document).on("click", "#passChange", function(e) {
		e.preventDefault();
		$.get($(this).attr("href"), function(data) {
			divContent.html(data);
		});
	});

	//clients assign dialog
	$(document).on("click", ".btnUserClients", function() {
		showSysInfo("Generating clients assigning form...");
		$.get($(this).attr("data-href"), function(data) {
			 $(function() {
				 divNewEditForm.dialog({
					 //height: 140,
					 width: 515,
					 modal: true,
					 autoOpen: false,
					 resizable: false,
					 //show: "fadeIn",
					 //hide: "fadeOut",
					 close: function() {
						 divNewEditForm.empty();
					}
				 });
			 });
			 divNewEditForm.html(data);
			 divNewEditForm.dialog("open");
			 hideSysInfo();
		});
	});
	
	//assign clients to user form submit
	$(document).on("click", "#btnClientAssignSave", function() {  
		var clientsArray = [];//array of added clients to assign
		$('#selClientsAssigned option').each(function() {
			$this = $(this);
			clientsArray.push(
				{
					"id":$(this).val(),
					"name":$(this).text()
				}
			);
		});
		
		$.post($(this).attr("data-href"), { clientsArray: clientsArray }, function(data) {
			if (data.success) {
				showSysInfo("Clients assigned.");
			}else {
				showSysInfo("Clients can not be assigned.");
			}
			divNewEditForm.dialog("close");
			hideSysInfo();
		});
	}); 

	//assign clients to user
	$(document).on("click", ".btnAssignClient", function() {  
	    $('#selClientsNotAssigned option:selected').remove().appendTo('#selClientsAssigned');  
    });
	$(document).on("dblclick", "#selClientsNotAssigned option:selected", function() {  
		$(this).remove().appendTo('#selClientsAssigned');  
	});  
	
	//unassign clients from user
	$(document).on("dblclick", "#selClientsAssigned option:selected", function() {  
		unassignCU();  
	}); 
	$(document).on("click", ".btnUnassignClient", function() {  
		unassignCU();
    });
	
	function unassignCU() {
		showSysInfo("Working...");
		$.get($('#selClientsAssigned option:selected').attr("data-href"), function(data) {
			if (data.success) {
				$('#selClientsAssigned option:selected').remove().appendTo('#selClientsNotAssigned');
			}else {
				switch(data.errorMsg)
				{
				case 'hasUsers':
					var str = data.projects + "",//add "" to convert to string for split
						assignedProjects = str.split(","),
						projects = "",
						i;
					for (i = 0; i < assignedProjects.length; ++i){
						projects += assignedProjects[i] + "\n";
					};
					alert("You can not unassign this Client.\nUser has assigned Projects from this Client:\n\n" + projects + "\n");
					break;
				default:
					showSysInfo("Client can not be unassigned from User.");
				}
			}
		});
		hideSysInfo();
	}
	//projects assign dialog
	$(document).on("click", ".btnUserProjects", function() {
		showSysInfo("Generating projects assigning form...");
		$.get($(this).attr("data-href"), function(data) {
			 $(function() {
				 divNewEditForm.dialog({
					 //height: 140,
					 width: 740,
					 modal: true,
					 autoOpen: false,
					 resizable: false,
					 //show: "fadeIn",
					 //hide: "fadeOut",
					 close: function() {
						 divNewEditForm.empty();
					}
				 });
			 });
			 divNewEditForm.html(data);
			 divNewEditForm.dialog("open");
			 hideSysInfo();
		});
	});    
	
	//selected client action - load clients projects - unassign projects to client
	$(document).on("change", "#selClients", function() {  
		var href = $("#btnProjectAssignSave").attr("data-href");
			newHref = href.slice(0,href.indexOf(",") + 1) + $("#selClients option:selected").val();
		$("#btnProjectAssignSave").attr("data-href", newHref);
		showSysInfo("Loading projects...");
		$("#selProjects").empty();
		$("#selProjectsAssigned").empty();
		$.get($("#selClients option:selected").attr("data-href"), function(data) {
			/*var out = '';
		    for (var i in data) {
		        out += i + ": " + data[i] + "\n";
		    }

		    alert(out);*/
			$('#selProjects').html(data.html);
			$('#selProjectsAssigned').html(data.htmlProjectsAssigned);
			hideSysInfo();
		});
    });
	
	//assign projects to user
	$(document).on("click", ".btnAssignProject", function() {  
	    $('#selProjects option:selected').remove().appendTo('#selProjectsAssigned');  
    });  
	$(document).on("dblclick", "#selProjects option:selected", function() {  
		$(this).remove().appendTo('#selProjectsAssigned');  
	});  
	
	//unassign projects from user
    $(document).on("click", ".btnUnassignProject", function() {  
    	$('#selProjectsAssigned option:selected').remove().appendTo('#selProjects');  
    });
    $(document).on("dblclick", "#selProjectsAssigned option:selected", function() {  
    	$(this).remove().appendTo('#selProjects');  
    });
    
	//assign projects to user form submit
	$(document).on("click", "#btnProjectAssignSave", function() {  
		var projectsArray = [];//array of added projects to assign
		$('#selProjectsAssigned option').each(function() {
			$this = $(this);
			projectsArray.push(
				{
					"id":$(this).val(),
					"name":$(this).text(),
					"client_id":$(this).attr("data-client-id")
				}
			);
		});
		$.post($(this).attr("data-href"), { projectsArray: projectsArray }, function(data) {
			if (data.success) {
				showSysInfo("Projects assigned.");
			}else {
				showSysInfo("Projects can not be assigned.");
			}
			divNewEditForm.dialog("close");
			hideSysInfo();
		});
	});     
    
	//assign projects to clients dialog
	$(document).on("click", ".btnClientProjects", function() {
		showSysInfo("Generating projects assigning form...");
		$.get($(this).attr("data-href"), function(data) {
			 $(function() {
				 divNewEditForm.dialog({
					 //height: 140,
					 width: 515,
					 modal: true,
					 autoOpen: false,
					 resizable: false,
					 //show: "fadeIn",
					 //hide: "fadeOut",
					 close: function() {
						 divNewEditForm.empty();
					}
				 });
			 });
			 divNewEditForm.html(data);
			 divNewEditForm.dialog("open");
			 hideSysInfo();
		});
	});	
	
	//assign projects to client form submit
	$(document).on("click", "#btnClientProjectsAssignSave", function() {  
		var projectsArray = [];//array of added clients to assign
		$('#selClientProjectsAssigned option').each(function() {
			$this = $(this);
			projectsArray.push(
				{
					"id":$(this).val(),
					"name":$(this).text()
				}
			);
		});
		showSysInfo("Working...");
		$.post($(this).attr("data-href"), { projectsArray: projectsArray }, function(data) {
			if (data.success) {
				hideSysInfo();
				showSysInfo("Projects assigned.");
				$.get($(".btnClients").attr("data-href"), function(data) {
					divContent.html(data);
					hideSysInfo();
				});
			}else {
				showSysInfo("Projects can not be assigned.");
			}
			divNewEditForm.dialog("close");
			hideSysInfo();
		});
	});
	
	//assign project to client
	$(document).on("click", ".btnAssignProjectClient", function() {  
	    $('#selClientProjects option:selected').remove().appendTo('#selClientProjectsAssigned');  
    });
	$(document).on("dblclick", "#selClientProjects option:selected", function() {  
		$(this).remove().appendTo('#selClientProjectsAssigned');  
	});  

	//unassign project from client
	$(document).on("dblclick", "#selClientProjectsAssigned option:selected", function() {  
		unassignPC();
	});
	$(document).on("click", ".btnUnassignProjectClient", function() {  
		unassignPC();
    });
	
	function unassignPC(){
		showSysInfo("Working...");
		$.get($('#selClientProjectsAssigned option:selected').attr("data-href"), function(data) {
			if (data.success) {
				$('#selClientProjectsAssigned option:selected').remove().appendTo('#selClientProjects');
			}else {
				switch(data.errorMsg)
				{
				case 'hasUsers':
					var str = data.users + "",//add "" to convert to string for split
						assignedUsers = str.split(","),
						users = "",
						i;
					for (i = 0; i < assignedUsers.length; ++i){
						users += assignedUsers[i] + "\n";
					};
					alert("You can not unassign this project.\nProject is assigned to Users:\n\n" + users + "\n");
					break;
				default:
					showSysInfo("Project can not be unassigned from Client.");
				}
			}
		});
		hideSysInfo();
	}
	
	//open project for adding comments
	$(document).on('click', '.aOpenProject', function(e) {
		e.preventDefault();
		showSysInfo("Opening project. Please wait...");
		$.get($(this).attr("href"), function(data) {
			divContent.html(data.html);
			hideSysInfo();
		});
	});
	
	//open project for adding comments
	$(document).on('click', '.btnOpenProject', function(e) {
		showSysInfo("Opening project. Please wait...");
		$.get($(this).attr("data-href"), function(data) {
			divContent.html(data.html);
			hideSysInfo();
		});
	});
	
	//open image in project workspace
	$(document).on('click', '.divImageBox img', function(e) {
		
		var $this = $(this);//for future reference to clicked image
		//var	cMaxWidth = $("#divProjectWorkspace").width() - 20;//workspace height - 20px for scrollbar
		var	cMaxWidth = $("#divProjectWorkspace").width();//workspace height
		
		//set link to open image in new window
		$("#btnImageOriginal").attr("href",$(this).attr("src"));
		
		//get original image size
		var tmpImage = document.getElementById($(this).attr("id"));;
		var imgOrgWidth = tmpImage.naturalWidth;
		var imgOrgHeight = tmpImage.naturalHeight;
		
		//set size of canvas and image with aspect ratio if needed
		if (imgOrgWidth > cMaxWidth) {
			cWidth = cMaxWidth;
			iWidth = cMaxWidth;
			iHeight = imgOrgHeight / imgOrgWidth * iWidth;//count aspect ratio image height
			cHeight = iHeight;
		}else {
			cWidth = imgOrgWidth;
			iWidth = imgOrgWidth;
			iHeight = imgOrgHeight;
			cHeight = iHeight;
		}
		
		var stage = new Kinetic.Stage({
		        container: 'divCanvas',
		        width: cWidth,
		        height: cHeight,
	            setListening: true
	      	});
	    
		var layer = new Kinetic.Layer({
			draggable: false
		});
		
		var commentsGroup = new Kinetic.Group();

	    var imageObj = new Image();
	    
	    imageObj.onload = function() {
	    	var projImage = new Kinetic.Image({
		    		x: 0,
		            y: 0,
		            image: imageObj,
		            width: iWidth,
		            height: iHeight,
		            draggable: false
		        });
	    	
	    	// add the image to the layer
	        layer.add(projImage);

	        // add the layer to the stage
	        stage.add(layer);
	        //stage.add(layer1);
	        
	        //canvas click action
	        var id = 0;
	        var commentsArray = new Array();
	        projImage.on('mousedown', function(evt) {
		        
	        	var canvas = document.getElementById('divCanvas');
	            
	        	var mousePos = getMousePos(canvas, evt);
	            var nY = Math.round(mousePos.y);
	            var nX = Math.round(mousePos.x);
	            
	            
	            
	            // anonymous function to induce scope
	            //(function() {
	            	//addComment(nX, nY);
		            /*var comment = new Kinetic.Text({
				    	x: nX - ((cMaxWidth - iWidth) / 2),
				        y: nY,
				        offsetX: 0,
				        offsetY: 0,
				        text: nX,
				        fontSize: 30,
				        fontFamily: 'Calibri',
				        fill: 'green'
			        });*/
	            	
	            	var star = new Kinetic.Star({
		                    id: id,
	            			x: nX - ((cMaxWidth - iWidth) / 2),
		                    y: nY,
		                    numPoints: 8,
		                    innerRadius: 5,
		                    outerRadius: 10,
		                    fill: 'yellow',
		                    stroke: 'red',
		                    strokeWidth: 1
		                });
	            	
	            	//add comment to group 
		            commentsGroup.add(star);
		            
		            var comment = new Array();
		            
		            comment.push(
		            		id = star.getAttr("id"),
		            		x = nX,
		            		y = nY,
		            		text = 'text_' + star.getAttr("id")
		            );
		            
		            commentsArray.push(comment);
		            
		            /*commentsArray.push(
		            		id = star.getAttr("id"),
		            		text = 'text_' + star.getAttr("id")
		            );*/
		            
		            star.on('mouseover', function() {
		            	alert(commentsArray[star.getAttr("id")].toSource());
		            });
	            //})();
	            
	            layer.add(commentsGroup);
	            stage.add(layer);
	            
	            
	            
	            /*document.getElementById('hideComments').addEventListener('click', function() {
		        	
	            	if ($("#hideComments").hasClass("btn-danger")) {
		        		layerComments.show();
		        	}else {
		        		layerComments.hide();
		        	}
	            	$("#hideComments").toggleClass("btn-danger");
	        		$("#hideComments i").toggle();
	            	
		        }, false);*/
	        
	        id++;
	        });
	        
	        
	        
	    };
	    
	    imageObj.src = $this.attr("src");
	    
	});
	
	function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
        	x: evt.clientX - rect.left,
          	y: evt.clientY - rect.top
        };
    }
	
	/*function addComment(posX, posY){
		
		var layer1 = new Kinetic.Layer();

	    var simpleText = new Kinetic.Text({
		    	x: 15,
		        y: 15,
		        text: 'Simple Text',
		        fontSize: 30,
		        fontFamily: 'Calibri',
		        fill: 'green'
	        });
	
	    layer1.add(simpleText);
	    layer1.moveToTop();
        layer1.draw();
	    
	}*/
	
	//hide / unhide comments on canvas
	/*$(document).on("click", "#hideComments", function() {
		$(this).toggleClass("btn-danger");
		$("#hideComments i").toggle();
	});*/
	
	//canvas click and get mouse position
	/*$(document).on('click', '#divCanvas', function(e) {
		
		var canvas = document.getElementById('divCanvas');
        function getMousePos(canvas, evt) {
            var rect = canvas.getBoundingClientRect();
            return {
                x: evt.clientX - rect.left,
                y: evt.clientY - rect.top
            };
        }
        
        canvas.addEventListener('mousedown', function (evt) {
            var mousePos = getMousePos(canvas, evt);
            var nY = Math.round(mousePos.y);
            var nX = Math.round(mousePos.x);
            //coordinate = "x=" + nX + ", y=" + nY;
            addComment(nX, nY);
        }, false);
		
	});*/
	
	//password change form submit
	$(document).on('click', '#btnPassChange', function(e) {
		//e.preventDefault();
		var options = { 
	        target:        '#divContent',   // target element(s) to be updated with server response 
	        //beforeSubmit:  showRequest,  // pre-submit callback 
	        success: function(data) {   
	        			if (data.success) {
	        				/*showSysInfo("Loading users list...");
							$.get($(".btnUsers").attr("data-href"), function(data) {
								divContent.html(data.html);
								hideSysInfo();
							});*/
	        				divContent.empty();
						}else {
							divContent.html(data.html);
						}	        			
			         }
	    }; 
	 
	    // bind to the form's submit event 
	    $('#formPassChange').submit(function() { 
	        
	    	$(this).ajaxSubmit(options);
	        return false; 
	    });
	});	
	
	//load clients
	$(document).on("click", ".btnClients", function() {
		showSysInfo("Loading clients list...");
		$.get($(this).attr("data-href"), function(data) {
			divContent.html(data);
			hideSysInfo();
		});
	});
	
	//load projects
	$(document).on("click", ".btnProjects", function() {
		showSysInfo("Loading projects list...");
		$.get($(this).attr("data-href"), function(data) {
			divContent.html(data);
			hideSysInfo();
		});
	});
});