// JavaScript Document
	$(function(){	
		$('.language').hide();
		$('.breadIn .current ').hover(function(e) {
           	$('.language').show(); 
        },function(){	
           	$('.language').hide();
		});
		
		
            $('.big_wx').hide();	
		$('.yt_wx').hover(function(e) {
            $('.big_wx').stop().show();	
        },function(){	
            $('.big_wx').hide();	
		});
		
		$('.meau1').hide();
		;(function(){
				
			$('.navIn li').hover(function(e) {
					$(this).addClass('nav').siblings().removeClass('nav');
                	$(this).children('.meau1').show();
            },function(){
					$(this).removeClass('nav');	
                	$(this).children('.meau1').hide();
			});
		
		})();
		$('.smallpic img').hide();
		
		;(function(){	
		
			$( '#banner ul li').each(function(index, element) {
				var pic = index+1;
                $(element).css('background-image',' url(images/xbig'+ pic +'.jpg');
            });
		
			var num = 0;
			var timer = null;
			function autoPlay(){
                clearInterval(timer);
				timer = setInterval(function(){	
					num++;
					if( num>5){ num = 0}
					$('#banner ul').stop().animate({ left: num*-100+'%'},500);
				},1000);
			};
			autoPlay(); 
			 
			$('#banner ul').hover(function(e) {
                clearInterval(timer);
            },function(){	
                clearInterval(timer);
				autoPlay();
			});
		})();
		
		
		;(function(){	
			var num = 0;
			var timer = null;
			var len = $('.gushiIn ul li').length-3;
		function autoPlay(){
                	clearInterval(timer);
			timer = setInterval(function(){	
				num++;
				if (num>len){num = 0};
				$('.gushiIn ul').animate({left: num*-316},1000);
			
			},1500);
		};
		autoPlay();
			$('.gushiIn ul li').hover(function(e) {
                	clearInterval(timer);
            },function(){	
                	clearInterval(timer);
					autoPlay();
			});	
		
		})();
	
	
	
	});






















