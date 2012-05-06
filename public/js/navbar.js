YUI.add('mqlite-navbar', function(Y){
	
	//termprorarly wrapper for bunch of jQuery functions
!function($){
	
	
	
	$("form").submit(function(){return false});
	
	$('a.link-directions').click(function(){
        $(this).addClass('active').siblings().removeClass('active'); 
        $('input.search-to').fadeIn('slow');        
    });
    
    $('a.link-search').click(function(){
         $(this).addClass('active').siblings().removeClass('active'); 
         $('input.search-to').fadeOut('slow');         
    });
    
    $('a#btn-search,a.link-directions,a.link-search').click(function(){
    	$('div#lhp').animate({    		
    		width: 400
    	}, {   		
    		step: function(){    			
    			Y_Main.namespace('mqlite').$map.invalidateSize();
    		}    	    		
  		});
    })
    
    $('button.close').click(function(){
    	$('div#lhp').animate({
    		width:0,
    	}, {
    		step: function(){
    			Y_Main.namespace('mqlite').$map.invalidateSize();
    		}    		
  		});
    })
    
    $('input').click(function(){$(this).select()});
    
    
    
    setTimeout(function(){
    	$('.brand').popover({
	    	title: "Welcome to Demee's Maps'", 
	    	content: "Type 's'' to start searchning, type 'd' for directions.", 
	    	placement: "bottom", 
	    	trigger: "hover"
	    }).popover("show");
    	setTimeout(function(){
    		$('.brand').popover("hide");
    	}, 3000);
    }, 1000);
}(window.jQuery)
});
