//http://simianstudios.com/blog/post/simple-text-replacement-in-jquery
$.fn.textReplace = function(target, replacement) {
    this.html(this.html().replace(target, replacement));
    return this;
}
$.fn.attrReplace = function(attr, target, replacement) {
    this.attr(attr, (this.attr(attr).replace(target, replacement)));
    return this;
}
////

$(document).ready(function() {
	
	var ustHref = $('#ust-href').val();

	$( "#testForm" ).submit(function( event ) {
		$('#loader').toggleClass('hidden', 'show')
	});

	$('.btn-pt').click(function(event) {
		btnsDisable();
		$('.pt-results').empty();
		if ($('.pt-table').hasClass('show')) {
			$('.pt-table')
				.removeClass('show')
				.addClass('hidden');
		}
		$('.loader-pt').toggleClass('hidden', 'show');
		$.post($(this).attr('data-url'), function(data) {
			$.each(data.results, function(){
				$('.pt-results').append('<tr><td class="center-content">' + this.valueOf()['line'] + '</td><td class="center-content">' + this.valueOf()['col'] + '</td><td class="center-content">' + this.valueOf()['pword'] + '</td><td><pre>' + this.valueOf()['lineContent'] + '</pre></td></tr>');
			});

			/*var i=0;
			$.each(data.pwords, function(index, value){
				//alert(value);
				$('.pt-progress')
					.html(i)
					.attr('aria-valuenow', i)
					.css('width', i+'%');
				$('#fileContent').textReplace(value, '<span class="pword">'+value+'</span>');
				i++;

				//$("body").appe( "HTML", "index" );
				$('#fileContent').find(':not(textarea)')
					.replaceText( /\b(\$\$\$)\b/gi, '<span class="red">$1<\/span>' );

			});*/

			$('.loader-pt').toggleClass('hidden', 'show');
			if ($('.pt-table').hasClass('hidden')) {
				$('.pt-table')
					.removeClass('hidden')
					.addClass('show');
			}
			$('#pt-rp').html(data.results.length);
			btnsEnable();
		});
	});

	/*$('.btn-st').click(function(event) {
		btnsDisable();
		$('.st-results').empty();
		if ($('.st-table').hasClass('show')) {
			$('.st-table')
				.removeClass('show')
				.addClass('hidden');
		}
		$('.loader-st').toggleClass('hidden', 'show');
		$.post($(this).attr('data-url'), function(data) {
			$.each(data.results, function(){
				$('.st-results').append('<tr><td class="center-content">' + this.valueOf()['line'] + '</td><td class="center-content">' + this.valueOf()['col'] + '</td><td class="center-content">' + this.valueOf()['sword'] + '</td><td><pre>' + this.valueOf()['lineContent'] + '</pre></td></tr>');
			});
			$('.loader-st').toggleClass('hidden', 'show');
			if ($('.st-table').hasClass('hidden')) {
				$('.st-table')
					.removeClass('hidden')
					.addClass('show');
			}
			$('#st-rp').html(data.results.length);
			btnsEnable();
		});
	});*/

	$('.btn-lt').click(function(event) {
		btnsDisable();
		$('.ht-results').empty();
		if ($('.ht-table').hasClass('show')) {
			$('.ht-table')
				.removeClass('show')
				.addClass('hidden');
		}
		$('.loader-ht').toggleClass('hidden', 'show');
		$.post($(this).attr('data-url'), function(data) {
			$.each(data.results, function(){
				if (this.valueOf()['status'] == 'valid') {
					var statusCode = '<span class="glyphicon glyphicon-ok-sign status-code-icon-green" title="Status Code: ' + this.valueOf()['statusCode'] + '"></span>';
				} else{
					var statusCode = this.valueOf()['status'];
				};
				$('.ht-results').append('<tr><td class="center-content">' + this.valueOf()['line'] + '</td><td class="center-content">' + this.valueOf()['col'] + '</td><td class="center-content">' + statusCode + '</td><td><pre>' + this.valueOf()['lineContent'] + '</pre></td></tr>');
			});
			$('.loader-ht').toggleClass('hidden', 'show');
			if ($('.ht-table').hasClass('hidden')) {
				$('.ht-table')
					.removeClass('hidden')
					.addClass('show');
			}
			$('#ht-rp').html(data.results.length);
			btnsEnable();
		});
	});

	$('.btn-ut').click(function(event) {
		btnsDisable();
		$('.ut-info').hide();
		$('.ut-results').empty();
		if ($('.ut-table').hasClass('show')) {
			$('.ut-table')
				.removeClass('show')
				.addClass('hidden');
		}
		$('.loader-ut').toggleClass('hidden', 'show');
		$.post($(this).attr('data-url'), { userAgent: $( "#user-agent option:selected" ).val() }, function(data) {
			/*var posRes = 0;
			var negRes = 0;
			$.each(data.results, function(index){
				if (this.valueOf()['status'] == 'valid') {
					if (this.valueOf()['statusCode'] >= 200 && this.valueOf()['statusCode'] < 400) {
						statusCode = '<span class="glyphicon glyphicon-ok-sign status-code-icon-green" title="Status Code: ' + this.valueOf()['statusCode'] + '"></span>';
						thumbnail = '<td class="center-content"><a id="th-a-' + index + '" href="#" target="_blank"><img height="" id="th-img-' + index + '" src=""></a></td>';
						posRes ++;
					}else {
						statusCode = '<span class="glyphicon glyphicon-ok-sign status-code-icon-red" title="Status Code: ' + this.valueOf()['statusCode'] + '"></span>';
						thumbnail = '<td class="center-content"></td>';
					};
				}else {
					statusCode = '<span class="glyphicon glyphicon-remove-sign status-code-icon-red"></span>';
					thumbnail = '<td class="center-content"></td>';
					negRes ++;
				};
				$('.ut-results').append('<tr><td class="center-content">' + this.valueOf()['line'] + '</td><td class="center-content">' + this.valueOf()['col'] + '</td><td class="center-content">' + this.valueOf()['status'] + '</td><td class="center-content status-code-icon">' + statusCode + '</td>' + thumbnail + '<td><pre>' + this.valueOf()['lineContent'] + '</pre></td></tr>');
				$('#ut-rp-pos').html(posRes);
				$('#ut-rp-neg').html(negRes);
			});*/

			$.each(data.results, function(index){
				if (this.valueOf()['status'] == 'valid') {
					if (this.valueOf()['statusCode'] >= 200 && this.valueOf()['statusCode'] < 400) {
						statusCode = '<span class="glyphicon glyphicon-ok-sign status-code-icon-green" title="Status Code: ' + this.valueOf()['statusCode'] + '"></span>';
						thumbnail = '<td class="center-content"><a id="th-a-' + index + '" href="#" target="_blank"><img height="" id="th-img-' + index + '" src=""></a></td>';
						//posRes ++;
					}else {
						thumbnail = '<td class="center-content"></td>';
					};
				}else {
					thumbnail = '<td class="center-content"></td>';
				};
				$('.ut-results').append('<tr><td class="center-content">' + this.valueOf()['line'] + '</td><td class="center-content">' + this.valueOf()['col'] + '</td>' + thumbnail + '<td><pre>' + this.valueOf()['lineContent'] + '</pre></td></tr>');
			});

			//load thumbnails
			$.each(data.results, function(index){
				if (this.valueOf()['status'] == 'valid') {
					$('#th-img-' + index).attr('src', $('.loader-ut-32').attr('src'));
					var url = this.valueOf()['url'];
					var id = this.valueOf()['id'];
					$.post(ustHref, { id: id, url: url, userAgent: $( "#user-agent option:selected" ).val() }, function(data) {
						$('#th-img-' + index)
							.attr('src', '')
							.attr('src', data.img)
							.attr('width', '200');
						$('#th-a-' + index)
							.attr('href', data.img);
					});
				}
			});
			$('.loader-ut').toggleClass('hidden', 'show');
			if ($('.ut-table').hasClass('hidden')) {
				$('.ut-table')
					.removeClass('hidden')
					.addClass('show');
			}
			btnsEnable();
		});
	});

	$('#test-info-btn').click(function(event) {
		$('.test-info-body').toggleClass('hidden');
		$(this).toggleClass('glyphicon-minus-sign', 'glyphicon-plus-sign');
	});

	$('.pt-rp').click(function(){
		$('a.pt-tab').trigger('click');
		var ptrp = $('#pt-rp').html();
		if (ptrp == 'run test') {
			$('.btn-pt').trigger('click');
		};
	});
	$('.st-rp').click(function(){
		$('a.st-tab').trigger('click');
		var strp = $('#st-rp').html();
		if (strp == 'run test') {
			$('.btn-st').trigger('click');
		};
	});
	$('.ht-rp').click(function(){
		$('a.ht-tab').trigger('click');
		var htrp = $('#ht-rp').html();
		if (htrp == 'run test') {
			$('.btn-lt').trigger('click');
		};
	});
	/*$('.ut-rp').click(function(){
		$('a.ut-tab').trigger('click');
		var utrpneg = $('#ut-rp-neg').html();
		var utrppos = $('#ut-rp-pos').html();
		if (utrpneg == 'run test' || utrppos == 'run test') {
			$('.ut-info').show();
		};
	});*/

	$('.btn-rp-pdf').click(function(event) {
		var ptrp = $('#pt-rp').html();
		var strp = $('#st-rp').html();
		var htrp = $('#ht-rp').html();
		//var utrpneg = $('#ut-rp-neg').html();
		//var utrppos = $('#ut-rp-pos').html();
		//if (ptrp == 'run test' || strp == 'run test' || htrp == 'run test' || utrpneg == 'run test' || utrppos == 'run test') {
		if (ptrp == 'run test' || strp == 'run test' || htrp == 'run test') {
			alert('Before generate final report please run all tests.');
			return false;
		};
	});
	
	$('.rp-tab').click(function(){
		$('#if-spellcheck').attr('src', $('#if-spellcheck').attr('src'));
	});

	$('.rp-tab').click(function(){
		$('#if-preview').attr('src', $('#if-preview').attr('src'));
	});

	//enable all test buttons
	$('.btn-pt').removeAttr('disabled');
	$('.btn-st').removeAttr('disabled');
	$('.btn-sl').removeAttr('disabled');
	$('.btn-lt').removeAttr('disabled');
	$('.btn-ut').removeAttr('disabled');

	function btnsDisable() {
		$('.btn-pt').attr('disabled','disabled');
		$('.btn-st').attr('disabled','disabled');
		$('.btn-sl').attr('disabled','disabled');
		$('.btn-lt').attr('disabled','disabled');
		$('.btn-ut').attr('disabled','disabled');
	}

	function btnsEnable() {
		$('.btn-pt').removeAttr('disabled');
		$('.btn-st').removeAttr('disabled');
		$('.btn-sl').removeAttr('disabled');
		$('.btn-ut').removeAttr('disabled');
		$('.btn-lt').removeAttr('disabled');
	}
});