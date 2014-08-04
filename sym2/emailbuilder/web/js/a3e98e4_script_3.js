
var tabCount = 1;
$(document).ready(function(){
  
    var dataSource = ['above','alpha','alter','beta','bravo','charlie','delta','epsilon','gamma','zulu'];

$('.typeahead').typeahead({
  items:4,
  minLength:2,
  updater: function (item) {
     /* do whatever you want with the selected item */
        alert("selected "+item);
    },
  sorter: function(items) {
    if (items.length == 0) {
        var noResult = new Object();
        items.push(noResult);
    }
    return items;    
    },
  highlighter: function(item) {
    
    if (dataSource.indexOf(item) == -1) {
        return "<span>No Match Found.</span>";
    }
    else {
        return "<span>"+item+"</span>";
    }
  },
  source: function (typeahead, query) {
     /* put your ajax call here..
     return $.get('/typeahead', { query: query }, function (data) {
        return typeahead.process(data);
     });
     */
    return dataSource;
    }
});

	$('#email_create').click(function(event) {
        var path = $('#template').val()+'/'+$('#email').val();
        var url = '/email/newemail/'+path;
        //alert(url)
        window.open(url,"_self");
		

});

    var tabs = $("div#tabs").tabs();

     tabs.delegate( ".closeTab", "click", function() {
        var panelId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
        $( "#" + panelId ).remove();
        $("div#tabs").tabs("refresh");
     });
     
     /*$('div.image').mouseup(function(event) {
         image_str = $(this).html();
         //$('#image2').html();
        var firstimg = image_str.indexOf('<img');

        if(firstimg > -1){
            
        }else{
            $(this).html('');
        }
     });*/
/*$('div.image').mouseup(function(event) {
        var div = $('#cke_editor_image2_dialog');
        $(div).find('input:text')
                .each(function() {
            $(this).val('');
        });
    }*/
     
});
            function checkpoint(email_title){
                //window.email_title = email_title;
            //alert(email_title);
            $.post("/app_dev.php/email/version/"+email_title, function(data) {
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
                $.post("/app_dev.php/email/restore/"+par, function(data) {
                var Iframe = parent.document.getElementById("iframe");
                iframe.contentWindow.location.reload();
                $("div#tabs").tabs( { active: 0 } ); 
               // alert(data)
                

            });
            }
            function openTab(email , option){
                if(option == 'preview'){
                    var url = "/email/download_email/"+email;
                }else if(option == 'download'){
                    var url = "/email/download/"+email;
                }else if(option == 'source'){
                  var url = "/email/source/"+email;
                }else if(option == 'linkchecker'){
                  var url = "/email/linkchecker/"+email;
                }else{
                    
                }
                var tabId = "tab" + tabCount;
                $("div#tabs ul").append("<li ><a href='#" + tabId + "'><button style='font-size: 17px; padding-left: 10px; color: black;' class='close closeTab' type='button' >×</button>" + option + "</a></li>");
                $("div#tabs").append('<div id="'+tabId+'"><iframe src="'+url+'" id="iframe'+option+'" width="100%" height="1820" name="alchemy" scrolling="yes" frameborder="0"></iframe></div>');
                $("div#tabs").tabs("refresh");
                $("div#tabs").tabs( { active: tabCount } );    
                tabCount = tabCount + 1;
                //alert(url);
            }
            function snapshot(email_title){
                window.open('/email/snapshot/'+email_title);
            }