YUI.add('mqlite-navbar', function(Y){
    //navvar is typically jquery app, and it's all build with jquery (shame I know)'
    var _showLHP = function(){
    	$('div#lhp-content').removeClass('hidden');
    	$('div#lhp').animate({
    		height: $('div#lhp-content').outerHeight(true) + 60
    	}, {
    	 	complete: function(){
    			$('div#lhp-content').removeClass('hidden');
    			$('#search-btn').addClass('active');
    	}});
  	},
  	
  	_hideLHP = function(){  		
    	$('div#lhp').animate({
    		height: 40
    	}, {
    	 	complete: function(){
    			$('div#lhp-content').addClass('hidden');
    			 $('#search-btn').removeClass('active'); 
    	}});
    	
    },
  	
  	_addInput = function(){
    	$("form").append('<input name="destination" placeholder="Type in Destination" />&nbsp;<i class="icon-remove icon-white"></i>')
    	_reCalculateLHPSize();
    	$(this).hide();
   }, 
   _reCalculateLHPSize = function(){
   		$('div#lhp').animate({
    		height: $('div#lhp-content').outerHeight(true) + 60
    	});	
   };
	
	$("span.add-destination").click(_addInput);
	$("form").submit(function(){return false});        
    $('input').click(function(){$(this).select()});    
    $('#search-btn').click(function(){
    	if($(this).hasClass('active')){
    		_hideLHP();	
    	} else {
    		_showLHP(); 
       	}	
    });
    
    //Event delegation 
    $(document).on('click', "form .icon-remove", function(){
		$(this).prev().remove();
		$(this).remove();
		_reCalculateLHPSize();
    	$("span.add-destination").show();
	});
    
});
