var store = {
	"totalBeforeTips": 0,
	"generosity": 0,
	"friendliness": 0,
	"responsiveness": 0,
	"averageRating": 0
}

var ratingViewBinder = function(dom){
	$(dom).on('change', function(e){
		var key = dom.substring(1);
		store[key] = parseInt(e.target.value)
		calculateAverageRatings()
		console.log(store)
	})
}

var totalAmountBeforeTips = function(){
	$("#totalBeforeTips").on('keyup', function(e){
		store.totalBeforeTips = parseFloat(e.target.value)
		console.log(store)
	})
}

var calculateAverageRatings = function(){
	store.averageRating = parseFloat(((store.generosity + store.friendliness + store.responsiveness) / 3 ).toFixed(1))
	console.log(store)
}

jQuery(document).ready(function($){
	totalAmountBeforeTips()
	ratingViewBinder('#generosity')
	ratingViewBinder('#friendliness')
	ratingViewBinder('#responsiveness')
})