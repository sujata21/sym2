var tempSearch = 'bbc'; 
$(document).ready(function(){

$('#touchstone2-temp').mouseover(function(event) {
	/* Act on the event */
	//alert('test');
	$('#touchstone2-temp').addClass('search-template active-template')
	//$('#bbc-temp').removeClass('search-template active-template')
});
$('#touchstone2-temp').mouseout(function(event) {
	/* Act on the event */
	//alert($('#search-template').val());
	if( ($('#search-template').val() == 'bbc') ||($('#search-template').val() == 'zsl')||($('#search-template').val() == 'touchstone')||($('#search-template').val() == 'touchstone3')||($('#search-template').val() == 'touchstone4')){
		$('#touchstone2-temp').removeClass('search-template active-template')
		//$('#bbc-temp').addClass('search-template active-template')
	}
	
	//
});
$('#touchstone3-temp').mouseover(function(event) {
	/* Act on the event */
	//alert('test');
	$('#touchstone3-temp').addClass('search-template active-template')
	//$('#bbc-temp').removeClass('search-template active-template')
});
$('#touchstone3-temp').mouseout(function(event) {
	/* Act on the event */
	//alert($('#search-template').val());
	if( ($('#search-template').val() == 'bbc') ||($('#search-template').val() == 'zsl')||($('#search-template').val() == 'touchstone')||($('#search-template').val() == 'touchstone2')||($('#search-template').val() == 'touchstone4')){
		$('#touchstone3-temp').removeClass('search-template active-template')
		//$('#bbc-temp').addClass('search-template active-template')
	}
	
	//
});
$('#touchstone4-temp').mouseover(function(event) {
	/* Act on the event */
	//alert('test');
	$('#touchstone4-temp').addClass('search-template active-template')
	//$('#bbc-temp').removeClass('search-template active-template')
});
$('#touchstone4-temp').mouseout(function(event) {
	/* Act on the event */
	//alert($('#search-template').val());
	if( ($('#search-template').val() == 'bbc') ||($('#search-template').val() == 'zsl')||($('#search-template').val() == 'touchstone')||($('#search-template').val() == 'touchstone2')||($('#search-template').val() == 'touchstone3')){
		$('#touchstone4-temp').removeClass('search-template active-template')
		//$('#bbc-temp').addClass('search-template active-template')
	}
	
	//
});
$('#touchstone-temp').mouseover(function(event) {
	/* Act on the event */
	//alert('test');
	$('#touchstone-temp').addClass('search-template active-template')
	//$('#bbc-temp').removeClass('search-template active-template')
});
$('#touchstone-temp').mouseout(function(event) {
	/* Act on the event */
	if( ($('#search-template').val() == 'bbc') ||($('#search-template').val() == 'zsl')||($('#search-template').val() == 'touchstone3')||($('#search-template').val() == 'touchstone2')||($('#search-template').val() == 'touchstone4')){
		$('#touchstone-temp').removeClass('search-template active-template')
		//$('#bbc-temp').addClass('search-template active-template')
	}
	
	//
});
$('#zsl-temp').mouseover(function(event) {
	/* Act on the event */
	$('#zsl-temp').addClass('search-template active-template')
	//$('#bbc-temp').removeClass('search-template active-template')
});
$('#zsl-temp').mouseout(function(event) {
	/* Act on the event */
	if(($('#search-template').val() == 'bbc')||($('#search-template').val() == 'touchstone')||($('#search-template').val() == 'touchstone2')||($('#search-template').val() == 'touchstone3')||($('#search-template').val() == 'touchstone4')){
		$('#zsl-temp').removeClass('search-template active-template')
		//$('#bbc-temp').addClass('search-template active-template')
	}
	
	//
});
$('#bbc-temp').mouseover(function(event) {
	/* Act on the event */
	$('#bbc-temp').addClass('search-template active-template')
	//$('#bbc-temp').removeClass('search-template active-template')
});
$('#bbc-temp').mouseout(function(event) {
	/* Act on the event */
	if(($('#search-template').val() == 'zsl')||($('#search-template').val() == 'touchstone')||($('#search-template').val() == 'touchstone2')||($('#search-template').val() == 'touchstone3')||($('#search-template').val() == 'touchstone4')){
		$('#bbc-temp').removeClass('search-template active-template')
		//$('#bbc-temp').addClass('search-template active-template')
	}
	
	//
});
$('#touchstone2-temp').click(function(event) {
	/* Act on the event */
	var type = $('#type').val();
	if(type == 'email'){
		var keyword = $('#searchemail').val();
	}else{
		var keyword = $('#search-archieve').val();
	}
	var date = '';
	
	if($('#fromdate').val() != '' && $('#todate').val() != ''){
		date = $('#fromdate').val()+'~'+$('#todate').val()
	}
	$('#search-template').val('touchstone2')

	$('#touchstone2-temp').addClass('search-template active-template')
	$('#touchstone-temp').removeClass('search-template active-template')
	$('#touchstone3-temp').removeClass('search-template active-template')
	$('#touchstone4-temp').removeClass('search-template active-template')
	$('#bbc-temp').removeClass('search-template active-template')
	$('#zsl-temp').removeClass('search-template active-template')
	searchEmail(keyword,date,type)
	//tempSearch = 'zsl';
});
$('#touchstone3-temp').click(function(event) {
	/* Act on the event */
	var type = $('#type').val();
	if(type == 'email'){
		var keyword = $('#searchemail').val();
	}else{
		var keyword = $('#search-archieve').val();
	}
	var date = '';
	
	if($('#fromdate').val() != '' && $('#todate').val() != ''){
		date = $('#fromdate').val()+'~'+$('#todate').val()
	}
	$('#search-template').val('touchstone3')

	$('#touchstone3-temp').addClass('search-template active-template')
	$('#touchstone-temp').removeClass('search-template active-template')
	$('#touchstone2-temp').removeClass('search-template active-template')
	$('#touchstone4-temp').removeClass('search-template active-template')
	$('#bbc-temp').removeClass('search-template active-template')
	$('#zsl-temp').removeClass('search-template active-template')
	searchEmail(keyword,date,type)
	//tempSearch = 'zsl';
});
$('#touchstone4-temp').click(function(event) {
	/* Act on the event */
	var type = $('#type').val();
	if(type == 'email'){
		var keyword = $('#searchemail').val();
	}else{
		var keyword = $('#search-archieve').val();
	}
	var date = '';
	
	if($('#fromdate').val() != '' && $('#todate').val() != ''){
		date = $('#fromdate').val()+'~'+$('#todate').val()
	}
	$('#search-template').val('touchstone4')

	$('#touchstone4-temp').addClass('search-template active-template')
	$('#touchstone-temp').removeClass('search-template active-template')
	$('#touchstone2-temp').removeClass('search-template active-template')
	$('#touchstone3-temp').removeClass('search-template active-template')
	$('#bbc-temp').removeClass('search-template active-template')
	$('#zsl-temp').removeClass('search-template active-template')
	searchEmail(keyword,date,type)
	//tempSearch = 'zsl';
});
$('#touchstone-temp').click(function(event) {
	/* Act on the event */
	var type = $('#type').val();
	if(type == 'email'){
		var keyword = $('#searchemail').val();
	}else{
		var keyword = $('#search-archieve').val();
	}
	var date = '';
	
	if($('#fromdate').val() != '' && $('#todate').val() != ''){
		date = $('#fromdate').val()+'~'+$('#todate').val()
	}
	$('#search-template').val('touchstone')

	$('#touchstone-temp').addClass('search-template active-template')
	$('#touchstone2-temp').removeClass('search-template active-template')
	$('#touchstone3-temp').removeClass('search-template active-template')
	$('#touchstone4-temp').removeClass('search-template active-template')
	$('#bbc-temp').removeClass('search-template active-template')
	$('#zsl-temp').removeClass('search-template active-template')
	searchEmail(keyword,date,type)
	//tempSearch = 'zsl';
});
$('#zsl-temp').click(function(event) {
	/* Act on the event */
	var type = $('#type').val();
	if(type == 'email'){
		var keyword = $('#searchemail').val();
	}else{
		var keyword = $('#search-archieve').val();
	}
	var date = '';
	
	if($('#fromdate').val() != '' && $('#todate').val() != ''){
		date = $('#fromdate').val()+'~'+$('#todate').val()
	}
	$('#search-template').val('zsl')
	$('#zsl-temp').addClass('search-template active-template')
	$('#bbc-temp').removeClass('search-template active-template')
	$('#touchstone-temp').removeClass('search-template active-template')
	$('#touchstone2-temp').removeClass('search-template active-template')
	$('#touchstone3-temp').removeClass('search-template active-template')
	$('#touchstone4-temp').removeClass('search-template active-template')
	searchEmail(keyword,date,type)
	//tempSearch = 'zsl';
});

$('#bbc-temp').click(function(event) {
	/* Act on the event */
	var date = '';
	
	var type = $('#type').val();
	if(type == 'email'){
		var keyword = $('#searchemail').val();
	}else{
		var keyword = $('#search-archieve').val();
	}

	if($('#fromdate').val() != '' && $('#todate').val() != ''){
		date = $('#fromdate').val()+'~'+$('#todate').val()
	}
	$('#search-template').val('bbc')
	$('#bbc-temp').addClass('search-template active-template')
	$('#zsl-temp').removeClass('search-template active-template')
	$('#touchstone-temp').removeClass('search-template active-template')
	$('#touchstone2-temp').removeClass('search-template active-template')
	$('#touchstone3-temp').removeClass('search-template active-template')
	$('#touchstone4-temp').removeClass('search-template active-template')
	searchEmail(keyword,date,type)
	//tempSearch = 'bbc';
});

$('#searchemail').on('keyup', function(event) {
	//event.preventDefault();
	//alert($('#todate').val())
	var date = '';
	if($('#fromdate').val() != '' && $('#todate').val() != ''){
		date = $('#fromdate').val()+'~'+$('#todate').val()
	}
	var keyword = $('#searchemail').val();

	if(keyword.length > 2){
		searchEmail(keyword,date,'email')
	}
	/* Act on the event */
});
$('#search-btn').click(function(event) {
	/* Act on the event */
	var date = '';
	if($('#fromdate').val() != '' && $('#todate').val() != ''){
		date = $('#fromdate').val()+'~'+$('#todate').val()
	}
	var keyword = $('#searchemail').val();
	//alert(date);
	if(keyword.length > 2 || (date != '') ){
		searchEmail(keyword,date,'email')
	}
	
});

//for archieve page
$('#search-archieve').on('keyup', function(event) {
	//event.preventDefault();
	//alert($('#todate').val())
	var date = '';
	if($('#fromdate').val() != '' && $('#todate').val() != ''){
		date = $('#fromdate').val()+'~'+$('#todate').val()
	}
	var keyword = $('#search-archieve').val();

	if(keyword.length > 2){
		searchEmail(keyword,date,'archieve')
	}
	/* Act on the event */
});

$('#search-archieve-btn').click(function(event) {
	/* Act on the event */
	var date = '';
	if($('#fromdate').val() != '' && $('#todate').val() != ''){
		date = $('#fromdate').val()+'~'+$('#todate').val()
	}
	var keyword = $('#search-archieve').val();
	//alert(date);
	if(keyword.length > 2 || (date != '') ){
		searchEmail(keyword,date,'archieve')
	}
	
});

});
function searchEmail(keyword,date,type){
		//alert(type)

		if(type == 'email'){
			var url = '/app_dev.php/email/typeahead';
			//action = "<a style='text-decoration:underline;' href='"+preview_path+"'>preview</a> | <a style='text-decoration:underline;' href='"+path+"'>edit</a> | <a style='text-decoration:underline;'>delete</a>"
		}else{
			var url = '/app_dev.php/archive/typeahead';
		}
		template = $('#search-template').val();	
		//alert(template);
		parameter = "data="+keyword+"&date="+date+'&template='+template;
		$.post(url, parameter, function(data) {
		/*optional stuff to do after success */
		//alert(data);
		optionList="";
		data = data.trim();
		if(data != 0)
			{
				var vals = data.split("|"); 
					for(i=0;i<vals.length-1;i++)
					{
						//alert(vals[i]);
						
						valuenid = vals[i].split("~");
						path = '/email/newemail/'+valuenid[1]+'/'+valuenid[0];
						preview_path = '/email/download_email/'+valuenid[0]+'/'+valuenid[1];
						delete_path = '/email/delete/'+valuenid[0]+'/'+valuenid[1];
						view_path = '/archive/show/'+valuenid[0]+'/'+valuenid[1];
						

						if(type == 'email'){
							optionList = optionList+"<tr>";
							var action = "<a style='text-decoration:underline;' href='"+preview_path+"'>Preview</a> | <a style='text-decoration:underline;' href='"+path+"'>Edit</a> | <a href='"+delete_path+"' style='text-decoration:underline;'>Delete</a>"
							var emailTemplate ="<td class='center-content'>"+valuenid[1]+"</td>";
							var emailName ="<td class='center-content'><a href='"+preview_path+"'>"+valuenid[0]+"</a></td>";
							var emailSubject ="<td class='center-content'><a href='"+preview_path+"'>"+valuenid[1]+"</a></td>";
							var emailDate ="<td class='center-content'>"+valuenid[3]+"</td>";	
						//alert(emailName);						
							//optionList = optionList+emailTemplate+emailSubject+emailName+emailDate;
							optionList = optionList+emailTemplate+emailName+emailDate;
							optionList = optionList+"<td class='center-content'>"+action+"</td>";
							optionList = optionList+"</tr>";
						}else{
							var thumbnail = '/uploads/archive/'+valuenid[0]+'.jpg'
							var action = "<a style='text-decoration:underline;' href='"+view_path+"'>View</a>";
							preview_path = view_path;
							optionList = optionList+'<div class="grid ">';
							optionList = optionList+"<div class='imgholder'><a href='"+view_path+"'><img  src='"+thumbnail+"'></a></div>";
							optionList = optionList+"<div id='headline' style='word-wrap: break-word;'><a href='"+view_path+"' style='color:#588AA3;'>"+valuenid[0]+"</a></div>";
							optionList = optionList+"<div id='headline'>"+valuenid[3]+"</a></div>";
							optionList = optionList+"</div>";


						}
						
						//alert(optionList);
					}
					
			}else{
				optionList = "<tr><td>No records found</td></tr>";
				
			}
			
			$('.ut-results').html(optionList);
			if(type != 'email'){
				 $('#container2').BlocksIt({
                numOfCol: 4,
                offsetX: 8,
                offsetY: 8
            });
			}
			//$('#searchemail').focus();
	});
}