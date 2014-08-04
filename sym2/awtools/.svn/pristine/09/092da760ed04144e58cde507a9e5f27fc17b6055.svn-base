$(document).ready(function() {
	
	var divSysInfo = $("#divSysInfo");
	
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
	
	var imageId;
	
	var commentsArray = new Array();
	
	//open image in project workspace
	$(document).on('click', '.divImageBox img', function(e) {
		
		var $this = $(this);//for future reference to clicked image
		//var	cMaxWidth = $("#divProjectWorkspace").width() - 20;//workspace height - 20px for scrollbar
		var	cMaxWidth = $("#divProjectWorkspace").width();//workspace height
		
		//set link to open image in new window
		$("#commSaveHref").attr("href",$(this).attr("src"));
		
		//clear divCommentsBox
		$("#divCommentsBox").empty();

		//enable btnImageOriginal
		$("#btnImageOriginal").removeAttr("disabled");
		
		//set image id
		image_id = $(this).attr("id");
		
		//clear comments array
		commentsArray.length = 0;
		
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
	    
	    var canvas = document.getElementById('divCanvas');
	    
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
	        
	        var can = $(".kineticjs-content").offset();
	        var cont = $("#divCanvas").offset();
	        
	        //canvas click action
	        var id = 0;
	        
		    //load comments
			$.post($("#commsLoadHref").attr("data-href"),{ imageId: image_id }, function(data) {
					
				//var rect = canvas.getBoundingClientRect();
				
				for (var i = 0; i < data.comments.length; i++) {
				    
					var star = new Kinetic.Star({
				  		id: id,
			    		x: data.comments[i][1] - (Math.round(can.left) - Math.round(cont.left)),
			            y: data.comments[i][2],
			            numPoints: 8,
			            innerRadius: 5,
			            outerRadius: 10,
			            fill: 'yellow',
			            stroke: 'red',
			            strokeWidth: 1,
			            draggable: false
				  	});
				    
					//add comment to group 
				    commentsGroup.add(star);
				    
				    var comment = new Array();
			        
				    comment.push(
				    		id = i,
				    		x = data.comments[i][1],
				            y = data.comments[i][2],
				        	text = data.comments[i][3],
				        	imageId = data.comments[i][4]
				    );
				        
				    //add comment to array
				    commentsArray.push(comment);
				    
				    //id++;
				    //alert(star.getAttr("id") + " \n " + commentsArray.toSource());
				    layer.add(commentsGroup);
		            stage.add(layer);
				    
				    
				    star.on('mouseover', function(e) {
		            	document.body.style.cursor = 'pointer';
		            	$('#divCanvas').append('<div id=\"commentTooltip\">' + commentsArray[this.getAttr("id")][3] + '<hr style="width: 295px;margin:5px 0 5px 0;">Double click to delete this comment.</div>');
		            	$("#commentTooltip")
		            		.css("top", e.pageY - ($("#commentTooltip").height() + 10))
		            		.css("left", e.pageX - $("#commentTooltip").width()/2);
		            		//.html("<p>" + commentsArray[star.getAttr("id")].toSource() + "</p>");
		            		//.html(commentsArray[star.getAttr("id")].toSource() + "<br>" + $("#commentTooltip").height());
		            	$("div[data-aid*=" + this.getAttr("id") + "]")
		            		.css("background-color", "#369CBA")
		            		.css("color", "#ffffff");
		            	
		            	//scroll div with comments
		            	/*$('#divCommentsBox').animate({
		                    scrollTop: $("div[data-aid*=" + star.getAttr("id") + "]").offset().top - $("div[data-aid*=" + star.getAttr("id") + "]").parent().offset().top
		            	});*/
		            	//alert($("div[id*=" + star.getAttr("id") + "]").offset().top);
		            });
		            star.on('mouseout', function() {
		            	document.body.style.cursor = 'default';
		            	$("#commentTooltip").remove();
		            	$("div[data-aid*=" + this.getAttr("id") + "]")
		            		.css("background-color", "#FFFFAA")
		            		.css("color", "#000000");
		            });
		            //remove star and comment
		            star.on('dblclick', function() {
		            	this.remove();
		            	
		            	layer.add(commentsGroup);
			            stage.add(layer);
			            
			            $("div[data-aid*=" + this.getAttr("id") + "]").remove();
			            
			            //console.log(commentsArray);
		            });
		            
		            $('#divCommentsBox')
	            		.prepend('<div data-aid="' + i + '" data-id="' + data.comments[i][0] + '" data-x="' + data.comments[i][1] + '" data-y="' + data.comments[i][2] + '" class="divCommBox" title="Double click to edit comment">' + data.comments[i][3] + '</div>');
				}
				id = i;//assign next index value for commentsArray
			});
			////end load comments 
		
	        projImage.on('mousedown', function(evt) {
		        
	        	$("#commentTextInput").remove();
	        	$(".btnCommBoxCancel").click();
	        	
	        	$("#divCanvas").prepend("<div id=\"commentTextInput\">" +
	            		"<textarea id=\"commText\" rows=\"4\" cols=\"5\"></textarea><br>" +
	            		"<button class=\"btn btn-mini btn-success btnCommAdd\"><i class=\"icon-plus-sign\"></i></button>" +
	            		"<button class=\"btn btn-mini btn-danger btnCommCancel\"><i class=\"icon-ban-circle\"></i>" +
	            		"</div>");
	            $("#commentTextInput")
	            	.css("top", evt.pageY - ($("#commentTextInput").height() + 10))
	            	.css("left", evt.pageX - $("#commentTextInput").width()/2);
	            $("#commText").focus();
	            	//.html("<p>" + commentsArray[star.getAttr("id")].toSource() + "</p>");
	            	//.html(commentsArray[star.getAttr("id")].toSource() + "<br>" + $("#commentTooltip").height());
	            
	            $(".btnCommAdd").click(function() {
	            	
	            	//var canvas = document.getElementById('divCanvas');
		            
		        	var mousePos = getMousePos(canvas, evt);
		            var nY = Math.round(mousePos.y);
		            var nX = Math.round(mousePos.x);
	            	
	            	// anonymous function to induce scope
		            //(function() {
		            	var star = new Kinetic.Star({
			                    id: id,
		            			x: nX - ((cMaxWidth - iWidth) / 2),
			                    y: nY,
			                    numPoints: 8,
			                    innerRadius: 5,
			                    outerRadius: 10,
			                    fill: 'yellow',
			                    stroke: 'red',
			                    strokeWidth: 1,
			                    draggable: false
			                });
		            	
		            	//add comment to group 
			            commentsGroup.add(star);
			            
			            var comment = new Array();
			            
			            comment.push(
			            		id = star.getAttr("id"),
			            		x = nX,
			            		y = nY,
			            		text = $("#commText").val().trim().replace(/\n/g, '<br>'),
			            		imageId = image_id
			            );
			            
			            //add comment to array
			            commentsArray.push(comment);
			            
			            //save comment
			            commSave(comment);
			            
			            star.on('mouseover', function(e) {
			            	document.body.style.cursor = 'pointer';
			            	$('#divCanvas').append('<div id=\"commentTooltip\">' + commentsArray[star.getAttr("id")][3] + '<hr style="width: 295px;margin:5px 0 5px 0;">Double click to delete this comment.</div>');
			            	$("#commentTooltip")
			            		.css("top", e.pageY - ($("#commentTooltip").height() + 10))
			            		.css("left", e.pageX - $("#commentTooltip").width()/2);
			            		//.html("<p>" + commentsArray[star.getAttr("id")].toSource() + "</p>");
			            		//.html(commentsArray[star.getAttr("id")].toSource() + "<br>" + $("#commentTooltip").height());
			            	$("div[data-aid*=" + this.getAttr("id") + "]")
			            		.css("background-color", "#369CBA")
			            		.css("color", "#ffffff");
			            	
			            	//scroll div with comments
			            	/*$('#divCommentsBox').animate({
			                    scrollTop: $("div[data-aid*=" + star.getAttr("id") + "]").offset().top - $("div[data-aid*=" + star.getAttr("id") + "]").parent().offset().top
			            	});*/
			            	//alert($("div[id*=" + star.getAttr("id") + "]").offset().top);
			            });
			            star.on('mouseout', function() {
			            	document.body.style.cursor = 'default';
			            	$("#commentTooltip").remove();
			            	$("div[data-aid*=" + star.getAttr("id") + "]")
			            		.css("background-color", "#FFFFAA")
			            		.css("color", "#000000");
			            });
			            //remove star and comment
			            star.on('dblclick', function() {
			            	star.remove();
			            	
			            	layer.add(commentsGroup);
				            stage.add(layer);
				            
				            $("div[data-aid*=" + star.getAttr("id") + "]").remove();
				            
				            //console.log(commentsArray);
			            });
		            //})();
		            
		            layer.add(commentsGroup);
		            stage.add(layer);
		            
		            id++;
		            
		            $("#commentTextInput").remove();
		            
				});

	            $(".btnCommCancel").click(function() {
	            	$("#commentTextInput").remove();
	            });	        
	        
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
	
	function commSave(comment) {
		$.post($("#commSaveHref").attr("data-href"),{ comment: comment }, function(data) {
			if (data.success) {
				showSysInfo("Comment saved.");
				//empty comments list
	            $('#divCommentsBox').empty();
	            $('#divCommentsBox').html(data.html);
	            //commsLoad(imageId);
			}else {
				showSysInfo("Comment can not be saved.");
			}
			hideSysInfo();
		});
	}
	
	/*function commsLoad(imageId){
		$.post($("#commsLoadHref").attr("data-href"),{ imageId: imageId }, function(data) {
			$('#divCommentsBox').html(data.html);
		});
	}*/
	
	//change comment text into textarea to update it
	$(document).on("dblclick", ".divCommBox", function() {
		$(".btnCommBoxCancel").click();
		$("#commentTextInput").remove();
		
		var text = $(this).html().replace(/<br>/g, "\n").trim();
		$(this)
			.append("<div id=\"divCommEdit\"><textarea id=\"commText\" rows=\"4\" cols=\"5\">" + text + "</textarea><br>" +
	              "<button class=\"btn btn-mini btn-success btnCommBoxUpdate\" data-commId=\"" + $(this).attr("data-id") + "\"><i class=\"icon-plus-sign\"></i></button>" +
	              "<button class=\"btn btn-mini btn-danger btnCommBoxCancel\"><i class=\"icon-ban-circle\"></i>" +
	              "</div>");
		$("#commText").focus();
	});

	$(document).on("click", ".btnCommBoxUpdate", function() {
		var text = $("#commText").val().trim().replace(/\n/g, "<br>");
		$("div[data-id=" + $(this).attr("data-commid") + "]").html(text);
		//update cemment's text in comments array
		commentsArray[$(this).attr("data-commid")][3] = text;
		$("#divCommEdit").remove();
	});

	$(document).on("click", ".btnCommBoxCancel", function() {
		$("#divCommEdit").remove();
	});
	
	/*$(document).on("click", "#btnCommentsSave", function() {
		
		showSysInfo("Saving comments...");
		
		//close comment's edit box
		$(".btnCommBoxCancel").click();
		
		var commsArray = new Array();
		
		$("#divCommentsBox>div").each(function() {
			var comm = new Array();
			comm.push(
            		x = $(this).attr("data-x"),
            		y = $(this).attr("data-y"),
            		text = $(this).html(),
            		imageId = imageId
            );
			
			commsArray.push(comm);
		});
		
		$.post($(this).attr("data-href"),{ commsArray: commsArray }, function(data) {
			hideSysInfo();
			if (data.success) {
				showSysInfo("Comments saved.");
			}else {
				showSysInfo("Comments can not be saved.");
			}
			hideSysInfo();
		});
	});*/
	
	
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

});