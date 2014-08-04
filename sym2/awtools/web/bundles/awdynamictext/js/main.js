$("input#btnSrcImgUpload").click(function(){
	uploadSourceImage();
});

function uploadSourceImage(){
	
	/* attach a submit handler to the form */
	$("#frmSrcImgUpload").submit(function(event) {
		/* stop form from submitting normally */
		event.preventDefault();
		/* get some values from elements on the page: */
		
		
		
		var $form = $( this );
		/* Send the data using post */
		$.post($form.attr('action'),$form.serialize(), function(data){
		//$.post('thankyou',$form.serialize(), function(data){
			alert(data.success);
			if(data.success == 0){
	            
				//$("#create-form").html(data.html);
				
	        }else{
	            alert(data.url);
	           // window.location = data.url;
	        }
		});
	});	
	
}

function point_it(){
    pos_x = event.offsetX?(event.offsetX):event.pageX-document.getElementById("pointer_div").offsetLeft;
    pos_y = event.offsetY?(event.offsetY):event.pageY-document.getElementById("pointer_div").offsetTop;
    alert(pos_x);
    /*
    document.getElementById("cross").style.left = (pos_x-1) ;
    document.getElementById("cross").style.top = (pos_y-15) ;
    document.getElementById("cross").style.visibility = "visible" ;
    document.pointform.form_x.value = pos_x;
    document.pointform.form_y.value = pos_y;
    */
}

