var currentTab;
var tabCount = 0;
$(document).ready(function(){
/*$('#bk-color').click(function(event) {
    alert('bk-color');
    $('#bk-color').color.showPicker();

});*/

	$('#email_create').click(function(event) {
		//alert('create');
		$('#email-form').hide('slow');
		
		var path = $('#path').val()+$('#email').val();

	var Iframe = parent.document.getElementById("iframe");
    url = Iframe.getAttribute('src');
    var newUrl=url+path;
    Iframe.contentWindow.location.replace(newUrl);
    var previewlink = '/email/download_email/'+$('#email').val();
    var downloadlink = '/email/download/'+$('#email').val();
    var sourcelink = '/email/source/'+$('#email').val();
    $('#preview-link').attr('href',previewlink);
    $('#download-link').attr('href',downloadlink);
    $('#source-link').attr('href',sourcelink);

    $('#iframe-div').show('slow');
	});

    $("div#tabs").tabs();
     
 //when ever any tab is clicked this method will be call
    $("#myTab").on("click", "a", function (e) {
        e.preventDefault();

        $(this).tab('show');
        $currentTab = $(this);
    });


    registerComposeButtonEvent();
    registerCloseEvent();

   
});
function checkpoint(email_title){
                //window.email_title = email_title;
            //alert(email_title);
            $.post("/app_dev.php/email/version/"+email_title, function(data) {
                var res = $.parseJSON(data);
                var ver_str = "";
                //var title_var = email_title;
                $.each(res, function(index, val) {
                    
                    if(index != 0)
                      ver_str = ver_str+'<div onclick="getVersion(\''+email_title+'\','+val+')">Email: '+email_title+'<br>Version : '+val+'</div>';

                });

                $('#versions').html(ver_str);
                //alert(ver_str);
                //var result = res.split(',');
                
            });
           
            }
            function getVersion(var1,verName){
                
                 e.preventDefault();
                 var tabId = "tab" + tabCount; //this is id on tab content div where the 
                tabCount = tabCount + 1;
                $("div#tabs ul").append("<li ><a href='#" + tabId + "'><button class='close closeTab' type='button' >×</button>" + verName + "</a></li>");
                $("div#tabs").append('<div id="'+tabId+'"><div class="row" style="color:#588AA3;padding-left:31px;padding-bottom:12px;"><a onclick="restore(\''+var1+'\','+verName+')" id="restore-link"><button type="button" class="btn btn-default">Restore</button></a></div><iframe src="/app_dev.php/email/viewVersion/'+var1+'/'+verName+'" id="iframe'+verName+'" width="1230" height="1820" name="alchemy" scrolling="no" frameborder="0"></iframe></div>');
                //$("div#tabs").tabs("refresh");
                $(this).tab('show');
                showTab(tabId);
                 registerCloseEvent();
         

            }
            function showTab(tabId) {
                $('#myTab a[href="#' + tabId + '"]').tab('show');
            }
            function registerCloseEvent() {

                $(".closeTab").click(function () {

        //there are multiple elements which has .closeTab icon so close the tab whose close icon is clicked
                var tabContentId = $(this).parent().attr("href");
                $(this).parent().parent().remove(); //remove li of tab
                $('#myTab a:last').tab('show'); // Select first tab
                $(tabContentId).remove(); //remove respective tab content

                });
            }
            function restore(var1,verName){
                alert('var1');
            }