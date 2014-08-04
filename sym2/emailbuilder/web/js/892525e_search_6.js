$(document).ready(function(){


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
$('#search').click(function(event) {
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
			var url = '/email/typeahead';
			//action = "<a style='text-decoration:underline;' href='"+preview_path+"'>preview</a> | <a style='text-decoration:underline;' href='"+path+"'>edit</a> | <a style='text-decoration:underline;'>delete</a>"
		}else{
			var url = '/archive/typeahead';
		}	
		//alert(url);
		parameter = "data="+keyword+"&date="+date;
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
						optionList = optionList+"<tr>";
						valuenid = vals[i].split("~");
						path = '/email/newemail/'+valuenid[1]+'/'+valuenid[0];
						preview_path = '/email/download_email/'+valuenid[0];
						delete_path = '/email/delete/'+valuenid[0];
						view_path = '/archive/show/'+valuenid[0];
						

						if(type == 'email'){
							var action = "<a style='text-decoration:underline;' href='"+preview_path+"'>preview</a> | <a style='text-decoration:underline;' href='"+path+"'>edit</a> | <a href='"+delete_path+"' style='text-decoration:underline;'>delete</a>"
						}else{
							var action = "<a style='text-decoration:underline;' href='"+view_path+"'>View</a>";
							preview_path = view_path;
						}
						var emailTemplate ="<td class='center-content'>"+valuenid[1]+"</td>";
						var emailName ="<td class='center-content'><a href='"+preview_path+"'>"+valuenid[2]+"</a></td>";
						var emailSubject ="<td class='center-content'><a href='"+preview_path+"'>"+valuenid[0]+"</a></td>";
						var emailDate ="<td class='center-content'>"+valuenid[3]+"</td>";	
						//alert(emailName);						
						optionList = optionList+emailTemplate+emailSubject+emailName+emailDate;
						optionList = optionList+"<td class='center-content'>"+action+"</td>";
						optionList = optionList+"</tr>";
						//alert(optionList);
					}
					
			}else{
				optionList = "<tr><td>No records found</td></tr>";
				
			}
			
			$('.ut-results').html(optionList);
			//$('#searchemail').focus();
	});
}