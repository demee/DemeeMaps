YUI.add('mqlite-navbar', function(Y){
    //navvar is typically jquery app, and it's all build with jquery (shame I know)'
    var _navbarHeight = 60, 
    
    
    _showLHP = function(){
    	$('div#lhp-content').removeClass('hidden');
    	$('div#lhp').animate({
    		height: $('div#lhp-content').outerHeight(true) + _navbarHeight 
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
    
    _hideCollabPanel = function(){  		
    	$('div#lhp').animate({
    		height: 40
    	}, {
    	 	complete: function(){
    			 $('div#lhp-collaborate').addClass('hidden');
    			 $('#collaborate-btn').removeClass('active');
    	}});
    	
    },
    
    _showCollabPanel = function(){
    	
    	if($('#collaborate-btn').hasClass('active') ){
    		return;
    	}
    	
    		$('div#lhp-collaborate').removeClass('hidden');
    		$('div#lhp').animate({
    			height: $('div#lhp-collaborate').outerHeight(true) + _navbarHeight 
    		}, {
    			complete: function(){
    				$('div#lhp-collaborate').removeClass('hidden');
    				$('#collaborate-btn').addClass('active');
    				$('#collaborate-btn').removeClass('inactive');
    			}});
    	
    	
    },
    
  	_addInput = function(){
    	$("form").append('<input name="destination" placeholder="Type in Destination" />&nbsp;<i class="icon-remove icon-white"></i>')
    	$("button#get-directions").show();
    	_reCalculateLHPSize();
   }, 
   _reCalculateLHPSize = function(){
   		$('div#lhp').animate({
    		height: $('div#lhp-content').outerHeight(true) + _navbarHeight
    	});	
   },
   _reCalculateCollabPanelSize = function(){
  		$('div#lhp').animate({
   		height: $('div#lhp-collaborate').outerHeight(true) + _navbarHeight
   	});	
   };
	
	$("span.add-destination").click(_addInput);
	$("form").submit(function(){return false});        
    $('input').click(function(){$(this).select()});    
    $('#search-btn').click(function(e){
    	console.log("search-btn clik!");
    	if($(this).hasClass('active')){
    		_showCollabPanel();
    		_hideLHP();	
    	} else {
    		_hideCollabPanel();
    		_showLHP(); 
       	}
    	

    });
    
    $('#collaborate-btn').click(function(){
    	if($(this).hasClass('active')){
    		_hideCollabPanel();
    		_showLHP();
    	} else {
    		_hideLHP();
    		_showCollabPanel(); 
       	}	 
    });
    
    //Event delegation 
    $(document).on('click', "form .icon-remove", function(){
		$(this).prev().remove();
		$(this).remove();
		_reCalculateLHPSize();
    	$("span.add-destination").show();
	});
    
    
    
    //Err... hacked in public methods?
    Y.navbar = {
    		  showCollabPanel: function () {
    	 			_hideLHP();		
    	 			_showCollabPanel();
    				
    	       }, 
    	       reCalculateCollabPanelSize: function (){
    	    	   _reCalculateCollabPanelSize();
    	       },
    	       reCalculateLHPSize: function (){
    	    	   _reCalculateLHPSize();
    	       }
    };
    
});
