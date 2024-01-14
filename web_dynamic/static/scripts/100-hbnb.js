const $ = window.$;
$(document).ready(function () {
	const amenityDict = {};
	$('input[type=checkbox]').change(function () {
		const amenityId = $(this).data('id');
		const amenityName = $(this).data('name');
		if ($(this).prop('checked')) {
			amenityDict[amenityId] = amenityName;
		} else {
			delete amenityDict[amenityId];
		}

		$('.amenities h4').text(object.value(amenityDict).join(', '));
	});
	$.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
		if (data.status === 'OK') {
			$('#api_status').addClass('available');
		} else {
			$('#api_status').removeClass('available');
		}
	});
	$.ajax({
		url: 'http://0.0.0.0:5001/api/v1/places_search/',
		type: 'POST',
		Content-Type: 'application/json',
		data: {}
		success: function(data) {
			for (const item of data) {
				$('section.places').append(
					'<article>' +
					'<div class="title_box">' +
					'<h2>' + item.name + '</h2>'+
					'<div class="price_by_night">$'+
					item.price_by_night + 
					'</div>' +
					'</div>' +
					'<div class="information">' +
					'<div class="max_guest">' +
					item.max_guest + 'Guest' + (item.max_guest !== 1 ? 's' : '') + '</div>' +
					'<div class="number_rooms">'+
					item.number_rooms + 'Bedroom' +
					(item.number_rooms !== 1 ? 's' : '') + '</div>' +
					'<div class="number_bathrooms">' + item.number_bathrooms + 'Bathrooms' +
					(item.number_bethroom !== 1 ? 's' : '') + '</div>' +
					'</div>' +
					'<div class="user">' +
					'</div>' +
					'<div class="description">' + item.description + '</div>' +
					'</article>'
				);
			}
		}
	});
	$('BUTTON').click(function () {
		$.ajax({
			url: api + ':5001/api/v1/places_search/',
			type: 'POST',
			data: JSON.stringify({ 'amenities': Object.keys(amenities) }),
			contentType: 'application/json',
			dataType: 'json',
			success: appendPlaces
		});
	});


});
