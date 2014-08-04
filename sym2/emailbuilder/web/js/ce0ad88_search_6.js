$(document).ready(function(){


$('#searchemail').on('keyup', function(event) {
	//event.preventDefault();
	//alert($('#searchemail').val())

	var keyword = $('#searchemail').val();
	if(keyword.length > 2){
		parameter = "data="+keyword;
		$.post('/app_dev.php/email/typeahead', parameter, function(data) {
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
						valuenid = vals[i].split("-");
						path = '/email/newemail/'+valuenid[1]+'/'+valuenid[0];
						preview_path = '/email/download_email/'+valuenid[0];
						var emailTemplate ="<td class='center-content'>"+valuenid[1]+"</td>";
						var emailName ="<td class='center-content'><a href='"+preview_path+"'>"+valuenid[2]+"</a></td>";
						var emailSubject ="<td class='center-content'><a href='"+preview_path+"'>"+valuenid[0]+"</a></td>";

						var emailDate ="<td class='center-content'>"+valuenid[3]+"</td>";
						//alert(emailName);						
						optionList = optionList+emailTemplate+emailSubject+emailName+emailDate;
						optionList = optionList+"<td class='center-content'><a style='text-decoration:underline;' href='"+preview_path+"'>preview</a> | <a style='text-decoration:underline;' href='"+path+"'>edit</a> | <a style='text-decoration:underline;'>delete</a></td>";
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
	/* Act on the event */
});

});