jQuery(document).ready(function() {   

$('a#login').click(function(event){
        event.preventDefault();        
        $('input#username').val($('input#_username').val());
        $('input#password').val($('input#_password').val());
        alert($('input#username').val() + $('input#password').val());        
        $('#payment_login_form').submit();
        
        $('#_login_form').submit();
       // $.post($('#_login_form').attr('action'),$('#payment_login_form').serialize(), function(data) {                 
       //      if(data.status == 'success'){   
       //          alert('done');                        
       //     } else {
       //          alert(data.html);   
       //          
       //     }
       //  });
    });   
});   