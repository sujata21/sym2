
var tabCount = 1;
var previewCnt = 1;
var checkerCnt = 1;
var sourceCnt = 1;
var downloadCnt = 1;
var mouse_is_inside=false; 

$(document).ready(function(){
   
//add email 
	$('#email_create').click(function(event) {
    //alert('test');
        var emailname = $('#email').val();
        emailname = emailname.replace(' ','_');
       // var path = $('#template').val()+'/'+emailname+'/'+$('#templatename').val();
       var path = $('#template').val()+'/'+emailname;
        var url = '/email/newemail/'+path;
        //alert(url)
        window.open(url,"_self");
  });

// char count
 $('div.title').keyup(function(event) {
    var ckvalue = $(this).text();
  
  if(ckvalue.length > 45){
    $(this).css("border","red solid 1px");
    var excess = ckvalue.length - 45;
   // alert('You have exceeded the max limit by '+excess)
   $('#alert').remove();
   $(this).after("<div id='alert'>You have exceeded the max limit by "+excess+"</div>");
   $('#alert').css('font-size',"11px");
   $('#alert').css('color',"red");
  }else{
    $('#alert').remove();
    $(this).css("border","#90EE90 solid 1px");
  }

  });
  $('div.summary').keyup(function(event) {
    var ckvalue = $(this).text();
  //alert();
  if($(this).attr('id') == 'summary_body4'){
    maxlength = 133
  }else if($(this).attr('id') == 'summary_body1'){
    maxlength = 500
  }else{
    maxlength = 257
  }
  
  if(ckvalue.length > maxlength){
    $(this).css("border","red solid 1px");
    var excess = ckvalue.length - maxlength;
    $('#alert').remove();
   $(this).after("<div id='alert'>You have exceeded the max limit by "+excess+"</div>");
   $('#alert').css('font-size',"11px");
   $('#alert').css('color',"red");
  }else{
    $('#alert').remove();
    $(this).css("border","#90EE90 solid 1px");
  }

  });
  $('div.cta').keyup(function(event) {
    var ckvalue = $(this).text();
  
  if(ckvalue.length > 32){
    var excess = ckvalue.length - 32;
    $(this).css("border","red solid 1px");
   $('#alert').remove();
   $('#cta_tab').after("<div id='alert'>You have exceeded the max limit by "+excess+"</div>");
   $('#alert').css('font-size',"11px");
   $('#alert').css('color',"red");
  }else{
    $('#alert').remove();
    $(this).css("border","#90EE90 solid 1px");
  }

  });	

    $("#close-modal-btn").click(function(event) {
      //alert('close');
       $('#image-backdrop').remove();
        mouse_is_inside=false;
    });
    
    document.onkeydown = function(evt) {
    evt = evt || window.event;
    if (evt.keyCode == 27 || evt.keyCode == 13) {
        //alert("Escape");
        $('#image-backdrop').remove();
        mouse_is_inside=false;
    }
};

/*  $('.title').mouseover(function(event) {
  //  var image = '/uploads/archive/'+$(this).text()+'.jpg';
    //$('#image-pop').html('<img style="padding-top: 312px; padding-left: 735px;" src=\''+image+'\'>');
  //  $('<div class="modal-backdrop in" id="image-pop"><img style="padding-top: 312px; padding-left: 735px;" src=\''+image+'\'></div>').appendTo(document.body);
  });*/
  
    var tabs = $("div#tabs").tabs();

     tabs.delegate( ".closeTab", "click", function() {
        var panelId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
        //alert(panelId);
        $( "#" + panelId ).remove();
        $("div#tabs").tabs("refresh");
     });
});
            function checkpoint(email_title,template){
                //window.email_title = email_title;
            //alert(template);
            var type = 'email';
            $.post("/email/version/"+email_title+"/"+template, function(data) {

             // alert(data);
                var res = $.parseJSON(data);
                var ver_str = "";
                //var title_var = email_title;
                $.each(res, function(index, val) {
                    verName = val.replace(".", "_");
                    //alert(verTitle);
                    if(index != 0)
                      ver_str = ver_str+'<li class="list-group-item">Version : '+val+' <a class="version-link" onclick="getVersion(\''+email_title+'\',\''+verName+'\',\''+type+'\',\''+template+'\')" >view</a> | <a class="version-link" onclick="restore(\''+email_title+'\',\''+verName+'\',\''+template+'\')" >Restore</a></li>';
         

                });
                $('#versions').html(ver_str);

            });
           
            }
            function getVersion(var1,verName,type,template){
                                
                var tabId = "tab" + tabCount; //this is id on tab content div where the 
               // verName_cnt = verName.length; 
                verName = verName.replace("_", ".");
                verLink = verName.replace(".", "_");
                if(type == 'email'){
                  iframeurl = '/email/viewVersion/'+var1+'/'+verLink+'/'+template;
                }else{
                  iframeurl = '/archive/viewVersion/'+var1+'/'+verLink+'/'+template;
                }
                
                //alert(verName)
                $("div#tabs ul").append("<li ><a href='#" + tabId + "'><button style='font-size: 17px; padding-left: 10px; color: black;' class='close closeTab' type='button' >×</button>" + verName + "</a></li>");
                $("div#tabs").append('<div id="'+tabId+'"><div class="row" style="color:#588AA3;padding-left:31px;padding-bottom:12px;"></div><iframe src="'+iframeurl+'" id="iframe'+verLink+'" width="100%" height="1820" name="alchemy" scrolling="yes" frameborder="0"></iframe></div>');
                $("div#tabs").tabs("refresh");
                $("div#tabs").tabs( { active: tabCount } );    
                tabCount = tabCount + 1;
                   

            }
            function restore(var1,verName,template){
                var par = var1+'/'+verName+'/'+template;
                $.post("/email/restore/"+par, function(data) {
                var Iframe = parent.document.getElementById("iframe");
                iframe.contentWindow.location.reload();
                $("div#tabs").tabs( { active: 0 } ); 
               // alert(data)
                

            });
            }
            function openTab(email , option,template){
                var class_name = '';
                if(option == 'preview'){
                    if(previewCnt > 1){
                        //alert(previewCnt);
                        $('.preview').remove();
                        $('.preview'+(previewCnt-1)).remove();
                        $("div#tabs").tabs("refresh");
                    }
                    
                    var url = "/email/download_email/"+email+"/"+template;
                    
                }else if(option == 'download'){
                    if(downloadCnt > 1){
                        //alert(previewCnt);
                        $('.download').remove();
                        $('.download'+(downloadCnt-1)).remove();
                        $("div#tabs").tabs("refresh");
                    }
                    var url = "/email/download/"+email+"/"+template;
                }else if(option == 'source'){
                   if(sourceCnt > 1){
                        //alert(previewCnt);
                        $('.source').remove();
                        $('.source'+(sourceCnt-1)).remove();
                        $("div#tabs").tabs("refresh");
                    }
                  var url = "/email/source/"+email+"/"+template;
                }else if(option == 'linkchecker'){
                  if(checkerCnt > 1){
                        //alert(previewCnt);
                        $('.linkchecker').remove();
                        $('.linkchecker'+(checkerCnt-1)).remove();
                        $("div#tabs").tabs("refresh");
                    }
                  var url = "/email/linkchecker/"+email+"/"+template;
                }else{
                    
                }
                
                var tabId = "tab" + tabCount;
                
                $("div#tabs ul").append("<li class='"+option+previewCnt+"'><a href='#" + tabId + "'><button style='font-size: 17px; padding-left: 10px; color: black;' class='close closeTab' type='button' >×</button>" +option+ "</a></li>");
                $("div#tabs").append('<div id="'+tabId+'"><iframe src="'+url+'" id="iframe'+option+'" width="100%" height="1820" name="alchemy" scrolling="yes" frameborder="0"></iframe></div>');
                $("div#tabs").tabs("refresh");
                $("div#tabs").tabs( { active: tabCount } );    
                tabCount = tabCount + 1;
                $('#'+tabId).addClass(option);
                previewCnt = previewCnt +1;
                checkerCnt = checkerCnt +1;
                sourceCnt = sourceCnt +1;
                downloadCnt = downloadCnt +1;

            }
            function snapshot(email_title,template){
                window.open('/email/snapshot/'+email_title+"/"+template);
            }
            function archieve(email,template){
              var r=confirm("Please confirm you have saved the last update!");
              if (r==true)
              {
                  $('<div class="modal-backdrop in" id="backdrop"><img style="padding-top: 312px; padding-left: 735px;" src="/bundles/applicationmain/images/loader.gif"></div>').appendTo(document.body);
                  $.post('/archive/final/'+email+'/'+template, function(data) {
                    /*optional stuff to do after success */
                    $('#backdrop').html('<div style="padding-top: 312px; padding-left: 735px;font-size:30px;"><font color="white"><b>SAVED!!!</b></font></div>')
                         
                    setInterval(function() {
                        $('#backdrop').remove();
                    }, 1000);
                   
                     //alert(data);
                  });
              }
            }
            function tooltip(img){
              //alert(img);
               mouse_is_inside=true; 
               var image = '/uploads/archive/'+img+'.jpg';
               $('<div style="overflow:auto;opacity: 0.90;left: 390px;right: 951px;" class="modal-backdrop in" id="image-backdrop"><div class="row"><img width="600px" height="730px;" style="padding-top: 56px; padding-left: 41px;" src=\''+image+'\'></div><div class="row" style="padding-right: 280px;padding-top:40px;" ><button id="close-modal-btn" class="btn btn-default" type="button">Close</button></div></div>').appendTo(document.body);
              //$('#modal-body').html('<img style="padding-top: 312px; padding-left: 735px;" src=\''+image+'\'>');
             // $('.modal-body').html();
            }
         