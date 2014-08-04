
var tabCount = 1;
var previewCnt = 1;
var checkerCnt = 1;
var sourceCnt = 1;
var downloadCnt = 1;

$(document).ready(function(){
   
//add email 
	$('#email_create').click(function(event) {
        var path = $('#template').val()+'/'+$('#email').val();
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




    var tabs = $("div#tabs").tabs();

     tabs.delegate( ".closeTab", "click", function() {
        var panelId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
        //alert(panelId);
        $( "#" + panelId ).remove();
        $("div#tabs").tabs("refresh");
     });
});
            function checkpoint(email_title){
                //window.email_title = email_title;
            //alert(email_title);
            $.post("/email/version/"+email_title, function(data) {
                var res = $.parseJSON(data);
                var ver_str = "";
                //var title_var = email_title;
                $.each(res, function(index, val) {


                    verName = val.replace(".", "_");
                    //alert(verTitle);
                    
                    if(index != 0)
                      ver_str = ver_str+'<li class="list-group-item">Version : '+val+' <a style="padding-left:3px;cursor:pointer"onclick="getVersion(\''+email_title+'\',\''+verName+'\')" >view</a> | <a style="padding-left:3px;cursor:pointer" onclick="restore(\''+email_title+'\',\''+verName+'\')" >Restore</a></li>';

               

                });
                $('#versions').html(ver_str);

            });
           
            }
            function getVersion(var1,verName){
                                
                var tabId = "tab" + tabCount; //this is id on tab content div where the 
               // verName_cnt = verName.length; 
                
                verName = verName.replace("_", ".");
                verLink = verName.replace(".", "_");
                //alert(verName)
                $("div#tabs ul").append("<li ><a href='#" + tabId + "'><button style='font-size: 17px; padding-left: 10px; color: black;' class='close closeTab' type='button' >×</button>" + verName + "</a></li>");
                $("div#tabs").append('<div id="'+tabId+'"><div class="row" style="color:#588AA3;padding-left:31px;padding-bottom:12px;"></div><iframe src="/app_dev.php/email/viewVersion/'+var1+'/'+verLink+'" id="iframe'+verLink+'" width="100%" height="1820" name="alchemy" scrolling="yes" frameborder="0"></iframe></div>');
                $("div#tabs").tabs("refresh");
                $("div#tabs").tabs( { active: tabCount } );    
                tabCount = tabCount + 1;
                   

            }
            function restore(var1,verName){
                var par = var1+'/'+verName;
                $.post("/email/restore/"+par, function(data) {
                var Iframe = parent.document.getElementById("iframe");
                iframe.contentWindow.location.reload();
                $("div#tabs").tabs( { active: 0 } ); 
               // alert(data)
                

            });
            }
            function openTab(email , option){
                var class_name = '';
                if(option == 'preview'){
                    if(previewCnt > 1){
                        //alert(previewCnt);
                        $('.preview').remove();
                        $('.preview'+(previewCnt-1)).remove();
                        $("div#tabs").tabs("refresh");
                    }
                    
                    var url = "/email/download_email/"+email;
                    
                }else if(option == 'download'){
                    if(downloadCnt > 1){
                        //alert(previewCnt);
                        $('.download').remove();
                        $('.download'+(downloadCnt-1)).remove();
                        $("div#tabs").tabs("refresh");
                    }
                    var url = "/email/download/"+email;
                }else if(option == 'source'){
                   if(sourceCnt > 1){
                        //alert(previewCnt);
                        $('.source').remove();
                        $('.source'+(sourceCnt-1)).remove();
                        $("div#tabs").tabs("refresh");
                    }
                  var url = "/email/source/"+email;
                }else if(option == 'linkchecker'){
                  if(checkerCnt > 1){
                        //alert(previewCnt);
                        $('.linkchecker').remove();
                        $('.linkchecker'+(checkerCnt-1)).remove();
                        $("div#tabs").tabs("refresh");
                    }
                  var url = "/email/linkchecker/"+email;
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
            function snapshot(email_title){
                window.open('/email/snapshot/'+email_title);
            }
         