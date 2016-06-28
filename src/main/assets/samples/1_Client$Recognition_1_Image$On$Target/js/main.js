$(document).ready(function($){
	//open popup
//	$('.cd-popup-trigger').bind('tap', function(event){
//		event.preventDefault();
//		$('.cd-popup').addClass('is-visible');
//	});
	
	//close popup
	$('.cd-popup').bind('tap', function(event){
		if( $(event.target).is('.cd-popup-close') ) {
			event.preventDefault();
			$(this).removeClass('is-visible');
		}
	});

	setTimeout(function(){
		$('.cd-popup').addClass('is-visible');
	}, 500);
//	//close popup when clicking the esc keyboard button
//	$(document).keyup(function(event){
//    	if(event.which=='27'){
//    		$('.cd-popup').removeClass('is-visible');
//	    }
//    });
});