var store = {
	"total": 0,
	"maxTipPercent":0,
	"tips": 0,
	"generosity": 0,
	"friendliness": 0,
	"responsiveness": 0,
	"averageRating": 0,
	"genMax": 12,
	"googleRating": 0,
	"googleRatingCount": 0,
	"googleTips": 0,
	"difference": 0
}

var init = function(){
	store.total = parseFloat($('#totalBeforeTips').attr('value'))
	store.maxTipPercent = parseFloat($('#maxTipPercent').attr('value'))
	store.generosity = parseFloat($('#generosity').attr('value'))
	store.friendliness = parseFloat($('#friendliness').attr('value'))
	store.responsiveness = parseFloat($('#responsiveness').attr('value'))
	store.averageRating = parseFloat(((store.generosity + store.friendliness + store.responsiveness) / 3 ).toFixed(1))

	$('#your_rating').text(parseFloat(store.averageRating).toFixed(1))
	$('#total').text(parseFloat(store.total).toFixed(2))
}

var viewRender = function(){
	calculateAverageRatings()
	calculateTips()
	maxTipPercent()
	calculateTotalAfterTips()
	calculateDifference()
}


var ratingViewBinder = function(dom){
	$(dom).on('change', function(e){
		var key = dom.substring(1);
		store[key] = parseInt(e.target.value)
		viewRender()
		console.log(store)
	})
}



var totalAmountBeforeTips = function(){
	$("#totalBeforeTips").on('keyup', function(e){
		store.total = parseFloat(e.target.value).toFixed(2)
		calculateTotalAfterTips()
		calculateTips()
		calculateDifference()
	})
}

var maxTipPercent = function(){
	$('#maxTipPercent').on('change', function(e){
		store.maxTipPercent = e.target.value
		calculateTips()
		calculateTotalAfterTips()
		calculateDifference()
		// store.totalAfterTips * (store.averageRating * 2) * totalBeforeTips
	})
}

var calculateAverageRatings = function(){
	store.averageRating = parseFloat(((store.generosity + store.friendliness + store.responsiveness) / 3 ).toFixed(1))
	$('#your_rating').html(store.averageRating)
}

var calculateTips = function(){
	store.tips = (store.total * (store.averageRating / 5 * store.maxTipPercent) / 100).toFixed(2)
	tipsPercent = store.tips/store.total*100
	$('#tips').html(`${store.tips} (${tipsPercent.toFixed(2)}%)`)
}

var calculateTotalAfterTips = function(){
	$('#total').html((parseFloat(store.tips) + parseFloat(store.total)).toFixed(2)) 
}

// var totalAmountAfterTips = function(){
// 	store.totalAmountAfterTips = store.totalAmountBeforeTips * store.genMax / 100
// 	$('#tips').html(store.totalAmountAfterTips)
// }

var calculateDifference = function(){
	store.googleTips = (store.total * (store.googleRating / 5 * store.maxTipPercent) / 100).toFixed(2)
	store.difference = (parseFloat(store.tips) - parseFloat(store.googleTips)).toFixed(2)
	if(store.difference > 0){
		$('#avgMessage').html("You're tipping $" + Math.abs(store.difference) + " more than average.")
		$('#avgMessage').css('color', 'green')

	}else{
		$('#avgMessage').html("You're tipping $" + Math.abs(store.difference) + " less than average.")
		$('#avgMessage').css('color', 'red')
	}
}

jQuery(document).ready(function($){
	init()
	calculateTips()
	totalAmountBeforeTips()
	// calculateDifference()
	ratingViewBinder('#generosity')
	ratingViewBinder('#friendliness')
	ratingViewBinder('#responsiveness')

	autocomplete = new google.maps.places.Autocomplete(document.getElementById('googlePlace'), {
	  types: ['establishment']
	});
    // autocomplete.setFields(['place_id', 'geometry', 'name']);
    autocomplete.addListener('place_changed', function() {
			var place = autocomplete.getPlace();
			console.log(place)
    	store.googleRating = place.rating
    	store.googleRatingCount = place.user_ratings_total
			$('#google_rating').html(store.googleRating)
			calculateDifference()
    })

})