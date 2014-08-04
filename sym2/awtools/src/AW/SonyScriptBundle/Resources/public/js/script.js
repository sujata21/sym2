$(document).ready(function() {
	
	/* copy to clipboard
	 * https://github.com/zeroclipboard/ZeroClipboard/blob/master/docs/instructions.md
	 * http://zeroclipboard.github.io/ZeroClipboard/#demo 
	*/
	$(document).on("change", ".listVars", function(e) {
		listVarsChange();
	});
	
	var clip = new ZeroClipboard($("#btnCopyToClipboard"), {
    	moviePath: "http://" + window.location.host + "/bundles/awsonyscript/js/ZeroClipboard/ZeroClipboard.swf",
    	//trustedDomains:    undefined,                  // Domains that we should trust (single string or array of strings)
    	//hoverClass:        "zeroclipboard-is-hover",   // The class used to hover over the object
    	//activeClass:       "zeroclipboard-is-active",  // The class used to set object active
    	//allowScriptAccess: "sameDomain",               // SWF outbound scripting policy
    	//useNoCache:        true,                       // Include a nocache query parameter on requests for the SWF
    	forceHandCursor:   false                       // Forcibly set the hand cursor ("pointer") for all glued elements
    });

    clip.on('load', function (client) {
    	//debugstr("Flash movie loaded and ready.");
    	$("#btnCopyToClipboard").attr('data-clipboard-text', $(".listVars").val());
    });
    
    clip.on( 'complete', function ( client, args ) {
    	//alert("Copied variable to clipboard: " + args.text );
    	$("#imgSystemInfoLoading").css("display", "none");
    	openSystemInfoDialog('<br><span style="color: green;">Variable</span><br><br>' + args.text + '<br><br><span style="color: green;">copied to clipboard.</span>');
    	setTimeout(function() {
    		closeSystemInfoDialog();
    		$("#imgSystemInfoLoading").css("display", "inline");
    		editor.focus();
    	}, 1000);
	});

    /*
    clip.on( 'mouseover', function ( client, args ) {
		alert( "mouse is over movie" );
	});   
    
    clip.on( 'mouseout', function ( client, args ) {
		alert( "mouse has left movie" );
	});
    
    clip.on( 'mousedown', function ( client, args ) {
		alert( "mouse button is down" );
	});
    
    clip.on( 'mouseup', function ( client, args ) {
		alert( "mouse button is up" );
	});
    
    clip.on('noFlash', function (client) {
    	$(".demo-area").hide();
    	debugstr("Your browser has no Flash.");
    });

    clip.on('wrongFlash', function (client, args) {
    	$(".demo-area").hide();
    	debugstr("Flash 10.0.0+ is required but you are running Flash " + args.flashVersion.replace(/,/g, "."));
    });

    clip.on('complete', function (client, args) {
    	debugstr("Copied text to clipboard: " + args.text);
    });
	
	clip.on( 'dataRequested', function ( client, args ) {
		clip.setText( 'Copied to clipboard.' );
	});
	
    // jquery stuff (optional)
    function debugstr(text) {
      $("#d_debug").append($("<p>").text(text));
    }

    $("#clear-test").on("click", function(){
      $("#fe_text").val("Copy me!");
      $("#testarea").val("");
    });*/
    
    /* var _gauges = _gauges || [];
    (function() {
      var t   = document.createElement('script');
      t.type  = 'text/javascript';
      t.async = true;
      t.id    = 'gauges-tracker';
      t.setAttribute('data-site-id', '501d5697f5a1f502f2000057');
      t.src = '//secure.gaug.es/track.js';
      var s = document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(t, s);
    })(); */
    /* //copy to clipboard */
    
    
	//list all projects index page - status = 2 only for default value in ProjectController.php line 52
	if (window.location.pathname == '/sonyscript/' || window.location.pathname == '/app_dev.php/sonyscript/') {
		listAllProjects(2);
	}
	
	//logic help dialog - not modal
	$( "#divLogicHelp" ).dialog({ autoOpen: false });
	$( "#btnLogicHelp" ).click(function(e) {
		$("#divLogicHelp").dialog({
			width: 450,
			resizable: true,
			maxHeight:600,
			modal: false,});
		$("#divLogicHelp").dialog('option', 'position', ['middle',100]);
		$( "#divLogicHelp" ).dialog( "open" );
	});
	
	//open Add Logic Editor dialog
	$("#divAddLogicDialog").dialog({ autoOpen: false });
	$('#btnAddLogic').click(function(e) {
		var url = $("#btnAddLogic").attr('data-url');
		$("#divAddLogicDialog").dialog({
			width: 800,
			resizable: false,
			maxHeight:500,
			modal: true,
			buttons: {
				"Save": {
			         text: "Save logic",
			         id: "btnSaveLogic",
			         class: "btn btn-success",
			         click: function(){
			        	 openSystemInfoDialog('Saving logic. Please wait...');
			        	 var $this = $(this);//to keep reference to original "this" because it is lost in $.post
			        	 $.post(url, { logicText: logicEditor.getValue() }, function(data) {
			        		 closeSystemInfoDialog();
			        		 $this.dialog( "close" );
			        		 $("#divTemplateChangeCheck").html('saved');
			        		 //saving template
			        		 saveTemplate(editor.getValue());
			     		 });
			         }
				},
				"Cancel": {
					text: "Cancel",
					class: "btn btn-primary",
					click: function(){
						var isLogicSaved = $("#divTemplateChangeCheck").html();
						var $this = $(this);//to keep reference to original "this" because it is lost in $.post
						if (isLogicSaved == 'unsaved') {
							var confInfo = confirm("Logic has changed. Do you want to save it?.");
							if (confInfo == true) {
		        				openSystemInfoDialog('Saving logic. Please wait...');
		        				$.post(url, { logicText: logicEditor.getValue() }, function(data) {
		        					closeSystemInfoDialog();
		        					$this.dialog( "close" );
		        					$("#divTemplateChangeCheck").html('saved');
		        					//saving template
					        		 saveTemplate(editor.getValue());
					     		});
							} else {
								$(this).dialog( "close" );
								$("#divTemplateChangeCheck").html('saved');
							}
		        		}else {
		        			$(this).dialog( "close" );
		        		}						
					}
				}
			}
		});
		$("#divAddLogicDialog").dialog('option', 'position', ['middle',100]);
		$('#divAddLogicDialog').dialog('open');
		logicEditor.refresh();
	});

	//open Add your variable dialog
	$("#divAddOwnVariable").dialog({ autoOpen: false });
	$('#btnAddOwnVar').click(function(e) {
		$("#divAddOwnVariable").dialog({
			width: 500,
			resizable: false,
			maxHeight:600,
			modal: true,
			buttons: {
				Close: function() {
					listVarsChange();
					$("#inputAddOwnVarsName").val('');
					$("#inputAddOwnVarsValue").val('');
					$(this).dialog( "close" );
				}
			}
		});
		$("#divAddOwnVariable").dialog('option', 'position', ['middle',100]);
		$('#divAddOwnVariable').dialog('open');
	});

	//project link
	$(document).on("click", ".projectLink", function(e) {
		openSystemInfoDialog('Loading project data. Please wait...');
	});

	//back to project details link
	$(document).on("click", "#projectsDetails", function(e) {
		openSystemInfoDialog('Loading project data. Please wait...');
	});

	//button archive
	$(document).on("click", "#btnListArchive", function(e) {
		$("#projectsSearch").val('');
		if ($(this).hasClass('active')){
			$(this).removeClass('btn-success').addClass('btn-warning').html('Archive ON');
			status = 1;
		}else {
			$(this).removeClass('btn-warning').addClass('btn-success').html('Archive OFF');
			status = 0;
		}
		openSystemInfoDialog('Loading projects. Please wait...');
		searchAllTests(status);
	});

	//button status change
	$(document).on("click", ".statusChange", function(e) {
		e.preventDefault();
		openSystemInfoDialog('Changing project status. Please wait...');
		if ($("#btnListArchive").hasClass('active')){
			status = 1;
		}else {
			status = 0;
		}
		var url = $(this).attr("href");
		$.post(url, function(data) {
			searchAllTests(status);
			closeSystemInfoDialog();
		});
	});
	

	//saves new template button click event
	$(document).on("click", "#btnSaveTpl", function(e) {
		saveTemplate(editor.getValue());
	});	
	
	//save template function
	function saveTemplate(newTemplate) {
		var url = $("#btnSaveTpl").attr("data-url");
		openSystemInfoDialog('Saving template. Please wait...');
		$.post(url, { newTemplate: newTemplate }, function(data) {
			$("#divTemplateChangeCheck").html('saved');
			$("#imgSaveTpl").css("display","none");	
			closeSystemInfoDialog();
		});
	}
	
	//list all projects
	function searchAllTests(status){
		$.get('/sonyscript/' + status, function(data) {
			$('#divProjectsList').html(data.html);
			closeSystemInfoDialog();
		});
	}
	
	//list all projects for index page
	function listAllProjects (status){
		openSystemInfoDialog('Loading projects. Please wait...');
		$.get('/sonyscript/' + status, function(data) {
			$('#divProjectsList').html(data.html);
			closeSystemInfoDialog();
		});
	}
	
	function openSystemInfoDialog(infoText) {
		$("#divSystemInfo").dialog({
			width: 400,
			resizable: false,
			maxHeight:600,
			modal: true,
		});
		$("#divSystemInfo").dialog('option', 'position', ['middle',100]);
		$('#divSystemInfoText').html(infoText);
		$('#divSystemInfo').dialog('open');
	}

	function closeSystemInfoDialog() {
		$('#divSystemInfo').dialog('close');
	}
	
	//search box
	$(document).on("keyup", "#projectsSearch", function(e){
		if($(this).val() !== '') {
			searchProjects($(this).val());
		} else {
			if ($('#btnListArchive').hasClass('active')){
				status = 1;//loads only archive projects
			}else {
				status = 0;//loads only active projects
			}
			listAllProjects(status);
		}
	});
	
	//search box function
	function searchProjects (text){
		if ($('#btnListArchive').hasClass('active')){
			status = 1;//loads only archive projects
		}else {
			status = 0;//loads only active projects
		}
		$.get('/sonyscript/searchbox/' + status + ',' + text, function(data) {
			//$('#progressbar').fadeIn(100);
			$('#divProjectsList').html(data.html);
			//$('#testsCount').html(data.testsCount);
		    //$('#progressbar').fadeOut(100);
		});
	}
	
	function listVarsChange(){
		$("#btnCopyToClipboard").attr('data-clipboard-text', $(".listVars").val());
	}
	
	//add own variable name and value
	$(document).on("submit", "#formAddOwnVars", function(e) {
		e.preventDefault();
		openSystemInfoDialog('Savig variable. Please wait...');
		var url = $(this).attr("action");
		var name = $("#inputAddOwnVarsName").val();
		var value = $("#inputAddOwnVarsValue").val();
		$.post(url, { name: name, value: value }, function(data) {
			$("#divOwnVarsList").html(data.html);
			$(".listVars").prepend("<option value='{{ varsArray." + name + " | raw }}'>{{ varsArray." + name + " | raw }}</option>").val($(".listVars option:first").val());
			$(".listLogicVars").prepend("<option value='varsArray." + name + "'>varsArray." + name + "</option>").val($(".listLogicVars option:first").val());
			$("#inputAddOwnVarsName").val('');
			$("#inputAddOwnVarsValue").val('');
			closeSystemInfoDialog();
			$("#inputAddOwnVarsName").focus();
		});
	});
	
	//delete own variable
	$(document).on("submit", "#formDelOwnVar", function(e) {
		e.preventDefault();
		var confInfo = confirm("Delete variable?");
		var value = $(this).attr("data-optionValue");
		var valueLogic = $(this).attr("data-optionLogicValue");
		if (confInfo==true){
			openSystemInfoDialog('Deleting variable. Please wait...');
			$(this).ajaxSubmit({
				dataType: 'json',
				success: function(data) {   
					$("#divOwnVarsList").html(data.html);
					$(".listVars option[value='" + value + "']").remove().val($(".listVars option:first").val());
					$(".listLogicVars option[value='" + valueLogic + "']").remove().val($(".listLogicVars option:first").val());
					closeSystemInfoDialog();
		        },
	            target: '#divOwnVarsList'
			});
		} else {
		  return false;
		}
	});
	
	//open Edit Project Info dialog
	$("#divEditProjectInfo").dialog({ autoOpen: false });
	$('#btnEditProjectInfo').click(function(e) {
		$("#divEditProjectInfo").dialog({
			width: 320,
			resizable: false,
			maxHeight:600,
			modal: true,
			buttons: {
				"Update": function() {
					//alert($( this ).attr("data-url"));
					if ($("#newProjectName").val().trim() == '') {
						alert('Please input project name.');
						$("#newProjectName").focus();
					} else if ($("#newProjectNumber").val().trim() == ''){
						alert('Please input project number.');
						$("#newProjectNumber").focus();
					} else if ($("#newProjectAlias").val().trim() == ''){
						alert('Please input project alias.');
						$("#newProjectAlias").focus();
					}
					var url = $(this).attr("data-url"),
						newName = $("#newProjectName").val(),
						newNumber = $("#newProjectNumber").val(),
						newAlias = $("#newProjectAlias").val();
					
					$.post(url, { newName: newName, newNumber: newNumber, newAlias: newAlias }, function(data) {
						if (data.error == 1) {
							alert('Project ' + newName + ' already exists.\nPlease input different project name.');
						} else {
							$('#divProjectName').html(newName + '<br><i>(Project folder name: <b>' + data.folder + '</b>)</i>');
							$('#divProjectNumber').html(newNumber);
							$('#divProjectAlias').html(newAlias);
							$('#divProjectUpdated').html(data.updated);
							$("#divEditProjectInfo").dialog("close");
						}
					});
				},
				Cancel: function() {
					$(this).dialog( "close" );
				}
			}
		});
		$("#divEditProjectInfo").dialog('option', 'position', ['middle',100]);
		$('#divEditProjectInfo').dialog('open');
	});
	
	//open Prepare variables names dialog
	$("#divNewVariables").dialog({ autoOpen: false });
	$('#varNamesPrepare').click(function(e) {
		$("#divNewVariables").dialog({
			width: 600,
			resizable: false,
			maxHeight:650,
			modal: true,
			buttons: {
				Close: function() {
					$("#formGetVarsNames input").val('');
					$("#divVarsList").html('');
					$(this).dialog( "close" );
				}
			}
		});
		$("#divNewVariables").dialog('option', 'position', ['middle',100]);
		$('#divNewVariables').dialog('open');
	});
	
	//prepare variables form submit
	$(document).on("submit", "#formGetVarsNames", function(e) {
		e.preventDefault();
		openSystemInfoDialog('Preparing variables. Please wait.');
		$(this).ajaxSubmit({
			dataType: 'json',
			success: function(data) {   
				$("#imgLoading").css("display","none");
				$("#divVarsList").css("text-align","left");
				$("#divVarsList").html(data.vars);
				closeSystemInfoDialog();
	        },
            target: '#divVarsList'
		});
	});
	
	//upload images on template page
	$(document).on("submit", "#formUpldImgs", function(e) {
		e.preventDefault();
		var confInfo=confirm("This will override old images. Cannot be undone !!!");
		if (confInfo==true){
			openSystemInfoDialog('Uploading images. Please wait...');
			$(this).ajaxSubmit({
				dataType: 'json',
				success: function(data) {   
					$("#imgLoading").css("display","none");	
					$("#divUploadedImagesCount").html('<small>' + data.imagesCount + '</small>');
					closeSystemInfoDialog();
				},
	        });
		} else {
		  return false;
		}
	});
	
	//open Upload new ASF file dialog
	$("#divUploadASF").dialog({ autoOpen: false });
	$(document).on("click", ".aUploadASF", function(e) {
		e.preventDefault();
		//change form action link
		$("#formUploadASF").attr('action', $(this).attr('href'));
		$("#divUploadASF").dialog({
			width: 600,
			resizable: false,
			modal: true,
			buttons: {
				Close: function() {
					$("#formUploadASF input").val('');
					$("#divTechInfo").html('');
					$(this).dialog( "close" );
				}
			}
		});
		$("#divUploadASF").dialog('option', 'position', ['middle',100]);
		$('#divUploadASF').dialog('open');
	});
	
	//upload new ASF file form submit
	$(document).on("submit", "#formUploadASF", function(e) {
		e.preventDefault();
		openSystemInfoDialog('Uploading new ASF file. Please wait.');
		$(this).ajaxSubmit({
			dataType: 'json',
			success: function(data) {   
				$("#divTechInfo").html('New ASF file: ' + data.file);
				closeSystemInfoDialog();
	        },
            target: '#divTechInfo'
		});
	});
	
	//generate HTML templates
	$(document).on("click", "#aGenHtml", function(e) {
		
		//ask if delete all previous generated htm files
		var confirmDel = confirm("Do you want to delete all previous generated files?\n" +
				"If NO (Cancel) all old files will be overwritten.");
		
		if (confirmDel) {
			filesDel = true;
		} else {
			filesDel = false;
		}
		
		/*$("#divFilesDelConfirm" ).dialog({
			 resizable: false,
			 height:140,
			 modal: true,
			 buttons: {
				 "Yes": function() {
					 filesDel = true;
					 $( this ).dialog( "close" );
				 },
				 "No": function() {
					 filesDel = false;
					 $( this ).dialog( "close" );
				 }
			 }
		});
		$("#divFilesDelConfirm").dialog('option', 'position', ['middle',100]);
		$("#divFilesDelConfirm").dialog("open");*/
		
		//get all checked checkboxes
		var checkedLang = $("input[name='language']:checked").map(function(){
		      return $(this).val();
		    }).get();
		
		var url = $(this).attr('href');
		
		if (checkedLang.length != 0) {
			var isTemplateSaved = $("#divTemplateChangeCheck").html();
			if (isTemplateSaved == 'unsaved') {
				alert('Template has changed. Please save it first.');
				return false;
			} else if (isTemplateSaved == 'saved') {
				if ($("#divUploadedImagesCount").html() != '<small>0</small>') {
					e.preventDefault();
					openSystemInfoDialog('Generating HTML files. Please wait...');
					$.post(url, { 'langsArray': checkedLang, 'filesDel': filesDel }, function(data) {
						window.location.href = '/sonyscript/show/' + data.id;
					});
				} else {
					var btnClicked = confirm("You have not uploaded images. Generate HTML templates anyway?");
					if (btnClicked == true){
						e.preventDefault();
						openSystemInfoDialog('Generating HTML files. Please wait...');
						$.post(url, { 'langsArray': checkedLang, 'filesDel': filesDel }, function(data) {
							window.location.href = '/sonyscript/show/' + data.id;
						});
					}else {
						e.preventDefault();
					} 
				}
			}
		} else {
			e.preventDefault();
			alert('Please choose languages to generate HTML files.');
		}
	});
	
	//generate test html file checkbox
	$(document).on("change", "#chboxTestHTMLFile", function() {
		var href = $("#aGenHtml").attr("href").slice(0,-1);
		if ($(this).is(':checked') == true) {
			$("#aGenHtml").css("display", "none");
			$("#aTestHtml").css("display", "inline-block");
		} else {
			$("#aGenHtml").css("display", "inline-block");
			$("#aTestHtml").css("display", "none");
		}
	});

	$(document).on("click", "#aCreateNew", function(e) {
		openSystemInfoDialog('Creating new project. Please wait...');
		
	});	

	$(document).on("click", "#btnPojectCreate", function(e) {
		
		var alias = $("#aw_sonyscriptbundle_projectstype_alias").val(),
			number = $("#aw_sonyscriptbundle_projectstype_number").val(),
			name = $("#aw_sonyscriptbundle_projectstype_name").val(),
			spreadsheet = $("#aw_sonyscriptbundle_projectstype_spreadsheet").val(),
			template = $("#aw_sonyscriptbundle_projectstype_template").val(),
			templateDefault = $("#aw_sonyscriptbundle_projectstype_defaultTemplate"),
			images = $("#images").val()
			
		if (template == '' && templateDefault.is(':checked') != true) {
			e.preventDefault();
			alert('Please choose project template or use default empty one and add your code later.');
		}else if (alias != '' && number != '' && name != '' && spreadsheet != '') {
			openSystemInfoDialog('Saving new project. Please wait...');
		}
	});	
	
	$(document).on("click", "#btnShowTemplate", function(e) {
		if ($("#btnShowTemplate").html() == 'Show template') {
			$("#btnShowTemplate").html('Hide template');
			$("#divTemplate").css("display", "block");
			editor.refresh();
		} else {
			$("#btnShowTemplate").html('Show template');
			$("#divTemplate").css("display", "none");
		}
	});	
	
	
    $('#checkAllLang').click(function(){
        //initial button setting is done in template.html.twig script section
    	var checkedLang = $("input[name='language']:checked").map(function(){
				            	return $(this).val();
				        	}).get(),
        	checLanguages = $('input[name="language"]');
        if (checkedLang.length != 0){
        	checLanguages.removeAttr("checked");
        	$(this).html('Check all').toggleClass('btn-success btn-danger');
        }else {
        	checLanguages.prop('checked', !checLanguages.prop("checked"));
        	$(this).html('Uncheck all').toggleClass('btn-success btn-danger');
        }
    });
	
    /***********************************/
	/*   !!! Place any code above editor !!!   */
	/***********************************/
	
    var str = window.location.pathname;
    if (str.indexOf("template") >= 0) {
    	
	    //template editor init - keep below lines at the end of this file
		var editor = CodeMirror.fromTextArea(document.getElementById("template"), {
		    lineNumbers: true,
		    matchBrackets: true,
		    mode: "application/x-httpd-php",
		    indentUnit: 4,
		    indentWithTabs: true,
		    enterMode: "keep",
			tabMode: "shift",
			onKeyEvent: function(e , s){
	            if (s.type == "keyup")
	            {
	                $("#divTemplateChangeCheck").html('unsaved');
	            }
	        }
		});
		editor.setSize("100%", 700);
	
		//logic editor init
		var logicEditor = CodeMirror.fromTextArea(document.getElementById("logic"), {
			lineNumbers: true,
			matchBrackets: true,
			mode: "text/x-smarty",
			indentUnit: 4,
			indentWithTabs: true,
			enterMode: "keep",
			tabMode: "shift",
			onKeyEvent: function(e , s){
				if (s.type == "keyup")
				{
					$("#divTemplateChangeCheck").html('unsaved');
				}
			}
		});
		logicEditor.setSize("100%", 300);
		//logicEditor.setValue("");
	
		//editor add variable name
		$(document).on("click", "#btnAddVar", function(e) {
			editor.replaceSelection($(".listVars").val());
		});
		
		//editor delete variable name
		$(document).on("click", "#btnDelVar", function(e) {
			editor.replaceSelection("");
		});
	
		//logicEditor add variable name
		$(document).on("click", "#btnAddVarToLogic", function(e) {
			logicEditor.replaceSelection($(".listLogicVars").val());
		});
		
		//logicEditor delete variable name
		$(document).on("click", "#btnDelVarToLogic", function(e) {
			logicEditor.replaceSelection("");
		});
    }
});