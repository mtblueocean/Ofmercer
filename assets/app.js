;(function ($, window, undefined) {
  'use strict';

  var $doc = $(document),
      $win = $(window),
      $body = $('body'),
		  Modernizr = window.Modernizr;
		  
	var tap = ("ontouchstart" in document.documentElement);
		  
	var isMobile = {
	  Android: function() {
	      return navigator.userAgent.match(/Android/i);
	  },
	  BlackBerry: function() {
	      return navigator.userAgent.match(/BlackBerry/i);
	  },
	  iOS: function() {
	      // return navigator.userAgent.match(/iPhone|iPad|iPod/i);
          return null;
	  },
	  Opera: function() {
	      return navigator.userAgent.match(/Opera Mini/i);
	  },
	  Windows: function() {
	      return navigator.userAgent.match(/IEMobile/i);
	  },
	  any: function() {
	      return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
	  }
	};		  
		  
  // subscribe popup
  function are_cookies_enabled(){
    var cookieEnabled = Boolean(navigator.cookieEnabled);

    if (typeof navigator.cookieEnabled == "undefined" && !cookieEnabled) {
      $.cookie("testcookie", true);
      cookieEnabled = Boolean($.cookie("testcookie"));
      $.removeCookie("testcookie");
    }
    return (cookieEnabled);
  }
  
  function showPage(){
	  
	  $win.load(function(){
		  $('#content, #home-content').addClass('show');
	  });
	  
  };
  
  function newsletter(){
	  $('.newsletter-trigger').click(function(){
		  
      $.fancybox.open([{
		    width: 700,
		    height: 700,
		    href: '#newsBox3'
	    }], {
		    padding: 30
	    });		  
		  
	  });
  };
  
  function matchHeight(){
	  $('.mosaic-item, .collection-item, .story-col, .post-instagram, .contact-col').matchHeight();
  };
  
  function subMenuImages(){
	  var $sub_img = $('.sub-img').find('img'),
			  src,
			  $desc = $('.sub-img').find('.sub-img-description'),
			  originalSrc = $sub_img.attr('src'),
			  originalDesc = $desc.text();
			  
	  $('.sub-menu .link').on({
		  mouseenter: function(){
		  	var thisDesc = $(this).data('description');
				src = $(this).find('img').attr('src');
				$sub_img.attr('src', src);
				$desc.text(thisDesc);
		  },
		  mouseleave: function(){
			  $sub_img.attr('src', originalSrc);
				$desc.text(originalDesc);
		  }
	  });
  };
  
  function miniCart(){
	  
	  var $mini_cart = $('#mini-cart'),
	      $icon = $('.mini-cart-trigger').find('i'),
	      target,timer;
	  
	  function closeMiniCart(){	   
		  timer = setTimeout(function(){
			  $mini_cart.hide().removeClass('open');
			  $icon.removeClass('active');
		  }, 400)
	  }
	  
	  $('.mini-cart-trigger').on({
		  mouseenter: function(){
		  	if($(window).width() > 831){
					$mini_cart.show().addClass('open');
					$icon.addClass('active');			  	
		  	}
		  },
		  mouseleave: function(){
			  //closeMiniCart();
		  }
	  });
	  
	  $mini_cart.on({
		  mouseleave: function(){
			  var $me = $(this);
			  if($me.hasClass('open')){
				  closeMiniCart();
			  }			  
		  },
		  mouseenter: function(){
			  clearTimeout(timer);
		  }
	  });
	  
  };
  
  function headerScroll(){
	  var $header = $('#site-header'),
	      $product_header = $('.product').find('#site-header'),
	      header_h = $header.outerHeight(),
	      $bt = $('#blog-tags'),
	      $index = $('body');
	  
	  $win.scroll(function(){
		  if($(this).scrollTop() > 0){
			  $index.removeClass('not-scrolled');
			  $product_header.addClass('trans');
		  } else {
			  $index.addClass('not-scrolled');
			  $product_header.removeClass('trans');
		  }
	  });
	  
  };
  
	function submitForm(form){
		
		var $form = form.find('form');
    
	  $form.find('input[type="submit"]').on('click', function(event) {
	    if(event) event.preventDefault();
	    register($form);
	  });
	  
		function register($form){
		  $.ajax({
		    type: $form.attr('method'),
		    url: $form.attr('action'),
		    data: $form.serialize(),
		    cache       : false,
		    dataType    : 'json',
		    contentType: "application/json; charset=utf-8",
	      error       : function(err) { alert("Could not connect to the registration server. Please try again later."); },
	      success     : function(data) {
	        if (data.result != "success") {
			      $form.fadeOut(function(){
	            form.find('.success').html('Sorry, please try again in a few minutes').fadeIn();
	            setTimeout(function(){
			          form.find('.success').fadeOut(function(){
				          $(this).html('');
				          $form.fadeIn();
			          });
	            }, 4000);
	          });
	        } else {
	          // It worked, carry on...
	          $form.fadeOut(function(){
	            form.find('.success').html('Thank You!').fadeIn();
	          });
	        }
	      }
		  });
		};	  
	  		
	};
	
	function accordion(){
		
    var $accTrigger = $('.acc-trigger'),
        $acc = $('.acc-content');
    
    // accordian content    
    $accTrigger.click(function(){
      var $me = $(this),
          $content = $me.next('.acc-content');
          
      $acc.slideUp();
      if($me.hasClass('open')){
        $me.removeClass('open');
        return false;
      }
      $accTrigger.removeClass('open');
      $me.addClass('open');
      $content.slideToggle();
    });
		
	};
		
	function imageSwap(){
	
		if(!tap){
		  $('.collection-image').on({
		    mouseenter: function(){
			    var me = $(this);
			    me.find('.img1').hide().next('.img2').show();
		    },
		    mouseleave: function(){
			    var me = $(this);
			    me.find('.img2').hide().prev('.img1').show();		    
		    }
		  });	
	  }
	  	
	}	
	
	function slickInit() {
		var $slick = $('.slick');

		if($slick.length > 0) {
			$('.slick').slick();
		}
	};
	
	function articleLayout(){
		var me,msg_height;
				
		$('#blog').find('article').each(function(i,el){
			me = $(el);
			if(me.hasClass('post-instagram')){
				if(me.next('article').hasClass('post-instagram')){
					me.addClass('float-me').next('article').addClass('float-me');
				}				
			} else if(me.hasClass('.post-quote') == false){
				msg_height = me.find('.msg-group').innerHeight();
				me.css({'min-height': msg_height + 103});
			}
		});
		
	};
	
	function sizeGuide(){

      
	  $('#size-guide-trigger').click(function(){
	  $('body').removeClass('mailing-open').removeClass('sizeguide-open').addClass('sizeguide-open');
      $.fancybox.open(
        [{
		    width: 700,
		    height: 700,
		    href: '#sizeguide'
	    }], {
		    padding: 30,
	    });
//         $.fancybox({
//           width: 700,
//           height: 700,
//           href: '#sizeguide',
//           padding: 30,
//           afterShow: function(){
//             var fancyboxHeight = $('.fancybox-wrap').outerHeight();
//             // $('#content').css('display', 'none');
// 		  },
// 		  afterClose: function(){
//             // $('#content').css('display', 'block');
// 		  },
//         });
		  
	  });		

	  $('#size-guide-trigger-2').click(function(){
	  $('body').removeClass('mailing-open').removeClass('sizeguide-open').addClass('sizeguide-open');
      $.fancybox.open(
        [{
		    width: 700,
		    height: 700,
		    href: '#sizeguide'
	    }], {
		    padding: 30
	    });		  
		  
	  });
      

	  $('#size-trigger').click(function(){
	  	var $me = $(this),
	  	$parent = $me.parents('.selector-wrapper');
	  	$parent.toggleClass('show');
	  });
	  
	  $('#swatch-trigger').click(function(){
	  	var $me = $(this);
	  	$me.toggleClass('show');
	  	$('.swatch').toggleClass('show');
	  });
	  
		if(isMobile.iOS() != null){
          
//           $('#productVariants option').each(function(){
//             if ($(this).data('available') == 'false'){
//             	$(this).remove();
//             }
//           });
          
		  var $originalSelect = $('body').find('#productVariants');
		  $originalSelect.addClass('show-ios');
			
			$originalSelect.focus(function(e){
			 var curScroll = $(window).scrollTop();
			 $('html, body').scrollTop(curScroll);
			});	

			var first = true;			
			$originalSelect.change(function(e){
				if(first){
					first = false;						
				} else {
					var newValue = $originalSelect.find('option:selected').html();
					$('#size-trigger').text(newValue);					
				}
			});
		  
		}
	  

	};
	
	function qtyUpdate(){
		
	  $(".num-incr").find('span').on("click", function() {

      var $qty = $(this).closest('.ci-qty').find('input[type="text"]');
		
		  var $button = $(this);
		  var oldValue = $qty.val();
      var productId = parseInt($qty.attr('data-id'));

		  if ($button.hasClass('inc')) {
			  var newVal = parseFloat(oldValue) + 1;
			} else {
		   // Don't allow decrementing below one
		    if (oldValue > 0) {
		      var newVal = parseFloat(oldValue) - 1;
		    } else {
		      newVal = 0;
		    }
		  }
		
		  $qty.val(newVal);
      
      $.post('/cart/change.js', {quantity: newVal, id: productId});
		
		});		
		
	};
		
	function mobileMenu(){
		
		var $mobile_menu = $('#mobile-menu'),
		    $shop_panel = $('#shop-panel'),
		    $utility_links = $('.utility-links'),
		    $newsletter_panel = $('#newsletter-panel'),
		    $mobile_utilities = $('.mobile-utilities');
		
        $('body').click(function(e){
          var target = $(e.target);
          // var menuLink = $('.mobile-menu-trigger');
          var menuTrigger = $('.mobile-menu-trigger');
          
          function onMenuOpen(){
            menuTrigger.addClass('open');
            $('#mobile-menu').addClass('open');
            $('.utility-links').fadeOut();
          }
          
          function onMenuClose(){
            menuTrigger.removeClass('open');
            $('#mobile-menu').removeClass('open');
            $('.utility-links').fadeIn();
          }
        

          if (menuTrigger.hasClass('open')){
            if(target.is(menuTrigger)){
                onMenuClose();
            }
            if (target.is('.mobile-inner') || target.is('a')){

            } else {
            	onMenuClose();
            }
          } else {
            if(target.is(menuTrigger)){
            	onMenuOpen(); 
            }
          }

        });
		
		$('.shop-trigger').click(function(e){
			e.preventDefault();
			$shop_panel.addClass('open');
		});
		
		$('.back-to-shop').click(function(){
			$shop_panel.removeClass('open');
		});
		
		$('.mobile-newsletter-trigger').click(function(){
			$newsletter_panel.addClass('open');
		});
		
		$('.back-to-main').click(function(){
			$newsletter_panel.removeClass('open');
		});
		
		$('.mobile-search-trigger').click(function(){
			$mobile_utilities.find('form').show();
		});
		
		$mobile_utilities.find('.fake-submit').click(function(){
			$mobile_utilities.find('form').submit();
		});
		
		
	};
		
	function loadMorePosts(trigger, maxpage, pageNumber, path){

	  var the_query;
	  
	  if (!path) {
	    path = location.pathname;
	    the_query = location.search;
	  }
	  
	  $.ajax({
	    type: 'GET',
	    dataType: 'html',
	    url: path + '?page=' + pageNumber,
	    data: the_query,
	    success: function(data) {
	      var $data;
	      $data = $(data);
	      if ($data.length) {
		      $('.article-feed').append($data.find('.article-feed').html());
		      setTimeout(function(){
			      articleLayout();
		      }, 500);		      
	        trigger.attr("disabled", false);
	        if (maxpage === pageNumber) {
	          return trigger.hide();
	        } else {
	          return trigger.attr("disabled", false);
	        }
	      }
	    },
	    error: function(data) {
	      console.log('sorry something went wrong');
	    }
	  });
	  
	};
	
	function initLoadMore(){
	  var maxpage, pageNumber, trigger;
	  trigger = $(".load-more-posts");
	  maxpage = trigger.data('maxpage');
	  pageNumber = 1;
	  trigger.click(function(e) {
	    e.preventDefault();
	    e.stopPropagation();
	    pageNumber++;
	    return loadMorePosts(trigger, maxpage, pageNumber);
	  });
		
	};		
		
  $(function(){

  	// var visited = $.cookie('visited'); // visited = 0
   //  visited++; // increase counter of visits
   //  $.cookie('visited', visited, { expires: 2, path:'/' });   

   //  if (visited == 3) {
   //      // DO THIS
   //      console.log('visited: ' + visited)
   //  }
    
    var open_mailing_list_popup = false;

    if (!are_cookies_enabled()) {
      open_mailing_list_popup = false;
    } else if ($.cookie('joined_mailing_list')) {
      open_mailing_list_popup = false;
    } else if ($.cookie('viewed_mailing_list')) {
      open_mailing_list_popup = false;
    } else if (localStorage.getItem('pageviews') == 2) {
    	open_mailing_list_popup = true;
    }else {
      $.cookie('viewed_mailing_list', true, {expires: 2, path: "/"});
      open_mailing_list_popup = true;
    }
    
    /*$('.mail-trigger a').click(function(e){
        $('body').removeClass('sizeguide-open');
      	e.preventDefault();

	    $.fancybox.open([{
  			width: 700,
  			height: 700,
  			href: '#newsBox3'
  		}], {
  			padding: 50
  		});
    });
    
    if(open_mailing_list_popup){
	    setTimeout(function(){		
		    $.fancybox.open([{
			    width: 700,
			    height: 700,
			    href: '#newsBox3'
		    }], {
			    padding: 50
		    });
		  }, 500);
	  }*/
    
    // init functions
    showPage();
    newsletter();
    matchHeight();
    subMenuImages();
    miniCart();
    headerScroll();
	  submitForm($('#footer-newsletter'));
	  submitForm($('#popup-newsletter'));
	  submitForm($('#panel-newsletter-mobile'));
	  accordion();
	  imageSwap();
	  slickInit();
	  articleLayout();
	  sizeGuide();
	  qtyUpdate();
	  mobileMenu();
	  initLoadMore();
	  
	  $(document).ready(function(){
			if(isMobile.any()){
				$('body').addClass('is-mobile');
			} else {
				$('body').addClass('not-mobile');
			}	  		  
	  });
     
  });
  
  $(document).ready(function(){
    $('form#create_customer').submit(function() {
		  fbq('track', 'CompleteRegistration');
    });
    
    $('#footer-newsletter-2 form').submit(function() {
		  fbq('track', 'Lead', {
      	source: 'footer'
      });
    });
    
    $('#popup-newsletter-2 form').submit(function() {
		  fbq('track', 'Lead', {
      	source: 'popup'
      });
    });
    
    var imageHeight = $('#home-featured #featured-collection-1 img').height();
  	$('#home-featured .triangle.right').css('border-top-width', imageHeight);
    
    var secondImage = $('#home-featured #featured-collection-2 img');
    var imageOffset = imageHeight + 120;
  	$('#home-featured .triangle.left').css('top', imageOffset + 'px').css('border-bottom-width', secondImage.height());
  
    var thirdImage = $('#page-store .hero .left img').height();
    $('#page-store .hero .triangle').css('border-bottom-width', thirdImage);

    var mosaicHeight = $('.mosaic-item').css('height');
    $('.mosaic-item .triangle.left').css('border-bottom-width', mosaicHeight);
    $('.mosaic-item .triangle.right').css('border-top-width', mosaicHeight);
    
    var sliderHeight = $('section#seen-in').outerHeight();
    $('#seen-in .triangle.left').css('border-bottom-width', sliderHeight);
    $('#seen-in .triangle.right').css('border-top-width', sliderHeight);
    
    var collectionImageHeight = $('#collection-header img').height();
    $('#collection-header .triangle.right').css('border-bottom-width', collectionImageHeight);
    
   	 //New Edits From Nicole
    $('form.search').find('input[type=text]').focus(function() { 
    	$(this).parent('form').addClass('expanded');
    });
    $('form.search').find('input[type=text]').blur(function() { 
    	$(this).parent('form').removeClass('expanded');
    });

    var isShowing = false;
    $('.sort-nav-wrap .filter .col').hover(
      function () {
        $(this).addClass('active').parents('.filter').siblings().find('.col').removeClass('active');
      }, 

      function () {
        $(this).removeClass('active');
      }
    );
    
    $('#footer-newsletter-2asdf form, #popup-newsletter-2asdf form').submit(function(e) {
        e.preventDefault();
        var email = $(this).find('input[type="email"]').val();

        if (email) {
            $.cookie('joined_mailing_list', true, {expires: 36500, path: "/"});
            // submit to analytics
            analytics.alias(email);
            analytics.identify(email, {
                email: email
            });

            analytics.track('Joined Mailing List', {
                referring_page: document.title.split(' | ')[0]
            });

            // send to google docs

            crossDomainPost('https://docs.google.com/forms/d/1soNyEXmVj6rtZIk07ycQyWQ43vg8BBwHd0Z95oBapt0/formResponse', {
                'entry.659530670': email,
                'entry.1989690552': document.title.split(' | ')[0]
            });

            $(this).html("<p>Thank you for joining us!</p>");
        }
    });
    
    $('form#nyc-mailing-list-kq').submit(function(e) {
        e.preventDefault();
        var email = $(this).find('input[type="email"]').val();

        if (email) {
            $.cookie('joined_mailing_list', true, {expires: 36500, path: "/"});
            // submit to analytics
            analytics.alias(email);
            analytics.identify(email, {
                email: email
            });

            analytics.track('Joined Mailing List', {
                referring_page: document.title.split(' | ')[0]
            });

            // send to google docs

            crossDomainPost('https://docs.google.com/forms/d/e/1FAIpQLSeGEEUj13op06w2ImHTqkZTrc5qjJG4IFJ9EhBaUDb1oZElvw/formResponse', {
                'emailAddress': email,
                // 'entry.1989690552': document.title.split(' | ')[0]
            });

            $(this).html("<p>Thank you for joining us!</p>");
        }
    });
  
    
    function crossDomainPost(url, params) {
        // Add the iframe with a unique name
        var iframe = document.createElement("iframe");
        var uniqueString = "cd-form-" + Math.round(Math.random() * 10000);
        document.body.appendChild(iframe);
        iframe.style.display = "none";
        iframe.contentWindow.name = uniqueString;

        // construct a form with hidden inputs, targeting the iframe
        var form = document.createElement("form");
        form.target = uniqueString;
        form.action = url;
        form.method = "POST";

        // repeat for each parameter
        for (var param_name in params) {
            var input = document.createElement("input");
            input.type = "hidden";
            input.name = param_name;
            input.value = params[param_name];
            form.appendChild(input);
        }

        document.body.appendChild(form);
        form.submit();
    }
  
  });
  
  $('.mobile-menu-close').click(function(){
    $(this).parents('.mobile-only').removeClass('open');
  });
})(jQuery, this);
