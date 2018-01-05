/*
	Theme Name: Lite Cardstock
	Theme URI: https://github.com/fjbo-net/fjbo-lite-cardstock
	Author: Francisco Javier Becerra-Ortiz
	Author URI: http://fjbo.net/
	Description: The Lite Cardstock Theme for Wordpress is an Open-Source project by Francisco Javier Becerra-Ortiz (FJBO) that features a slider-like user interface in Parent Pages. Lite Cardstock is very lightweight, minimalistic, refined, interactive, smart and responsive. Lite Cardstock sports vibrant, warm, and elegant colors. Bring your visitors an innovative way to engage with your content. Currently under development.
	Version: 0.1
	License: Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
	License URI: http://creativecommons.org/licenses/by-nc-sa/4.0/
	Tags: modern, minimalistic, one-column, tan, white, yellow, flexible-width, custom-logo, interactive, simple, minimalistic, light, lightweight
	Text Domain: fjbo-net

	Lite Cardstock Theme by Francisco Javier Becerra-Ortiz (FJBO) is licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
	Permissions beyond the scope of this license may be available at https://github.com/fjbo-net.

	lite Cardstock: cardstock-slider.js

	Javascript-based interactive slider-like user interface.
*/

(function(){
	if(!window.fjbo) window.fjbo = {};
	let vMode = window.fjbo.vMode;

	window.fjbo.CardstockTheme = {};
	if(window.fjbo.CardstockTheme) {
		let slider = window.fjbo.CardstockTheme.slider = {};

		if(slider) {
			slider.currentSlide = -99;
			slider.transitionInProgress = false;
			slider.duration = 600;
			const ENTRY_SELECTOR = 'article.entry';

			slider.on = function() {
				let entriesContainer = jQuery(ENTRY_SELECTOR).parent();


				if(jQuery(ENTRY_SELECTOR).length > 1 && vMode.get() > 1) {
					let pageNav = jQuery('<nav id="page-nav"><div id="entry-container-overlay"><div class="text">Title Here</div></div></nav>');

					if(jQuery('#page-nav').length == 0) {
						entriesContainer.after(pageNav);
					}

					jQuery(ENTRY_SELECTOR).css({opacity: 0});
					jQuery(ENTRY_SELECTOR).each(function(i) {
						let currentId = 'nav-item-' + i;

						jQuery('#page-nav').append('<div id="' + currentId + '" class="nav-item">&nbsp;</div>');
						jQuery('#' + currentId).on('click', function(){
								slider.hideNavOverlay();
								slider.goTo(i);
						});
						jQuery('#'+currentId).hover(function(){
							// Mouse in
							slider.displayNavOverlay(i);
						},function(){
							// Mouse out
							slider.hideNavOverlay();
						});
						jQuery(this).attr('id', 'entry-'+(i));
						jQuery(this).css({zIndex: (99+jQuery(ENTRY_SELECTOR).length)-i});
					});

					entriesContainer.prepend('<div id="entry-spaceholder">&nbsp;</div>');

					jQuery('#site-container').children(':not(#entry-container, #bg, script)').addClass('height-ref');
					jQuery(ENTRY_SELECTOR).css({opacity: 1});

					if(jQuery('div#entry-spaceholder').length>0) {
						if(jQuery(ENTRY_SELECTOR).length > 0 && slider.currentSlide < 0 && slider.transitionInProgress == false) {
							window.dispatchEvent(new Event('resize'));

							if(slider.transitionInProgress = true) {
								slider.currentSlide = 0;
								slider.updateClick(slider.currentSlide);

								jQuery('#entry-'+slider.currentSlide).css({left: jQuery('#entry-spaceholder').offset().left + 'px'});
								jQuery('#nav-item-'+slider.currentSlide).addClass('current');
								slider.transitionInProgress = false;
							}
						}
					}
				}
			}

			slider.off = function() {
				if(slider.transitionInProgress = true) {
					// Remove #close-modal
					jQuery('#close-modal').unbind('click');
					jQuery('#close-modal').remove();

					// If there is something popped, get rid of it
					if(jQuery('.popped').length > 0) {
						jQuery('.popped').removeClass('popped');
					}

					//Remove Popper Buttons
					jQuery('.overflowed').removeClass('overflowed');
					jQuery('.popper-container .pop-btn').unbind('click');
					jQuery('.popper-container').remove();

					//Remove Page Navigation
					jQuery('nav#page-nav').remove();
					jQuery('#entry-spaceholder').remove();

					//Reset entries to default values
					jQuery(ENTRY_SELECTOR).unbind('click');
					jQuery(ENTRY_SELECTOR).css({cursor: 'auto'});
					jQuery(ENTRY_SELECTOR).attr('style','');

					//Reset Default Values
					slider.currentSlide = -99;
					slider.transitionInProgress = false;
				}
			}

			slider.canRun = function() {
				var run = true;

				if(jQuery(ENTRY_SELECTOR).length <= 1) {
					run = false;
				}

				if(vMode.get() == 1) {
					run = false;
				}

				if(jQuery('#entry-spaceholder').length < 1) {
					run = false;
				}

				if(jQuery('nav#page-nav').length < 1) {
					run = false;
				}

				return run;
			}

			slider.goTo = function(target) {
				if(jQuery(ENTRY_SELECTOR).length > 0 && target >= 0 && target < (jQuery(ENTRY_SELECTOR).length) && target != slider.currentSlide && slider.transitionInProgress == false) {
					if(slider.transitionInProgress = true) {
						slider.updateClick(target);

						if(target < slider.currentSlide) {
							for(i0 = slider.currentSlide-1; i0 >= target; i0--) {
								jQuery('#nav-item-'+i0).addClass('nav-item-waiting');
								setTimeout(function(){
								}, (200 * ((slider.currentSlide-1) - i0)));
							}
						} else if (target > slider.currentSlide) {
							for(i0 = slider.currentSlide+1; i0 <= target; i0++) {
								jQuery('#nav-item-'+i0).addClass('nav-item-waiting');
								setTimeout(function(){
								}, (200 * (i0 - (slider.currentSlide-1))));
							}
						}

						// Move "Upper" Slides to right
						for(i1 = jQuery(ENTRY_SELECTOR).length-1; i1 > target;i1--) {
							jQuery('#entry-'+i1).css({zIndex: ((99+jQuery(ENTRY_SELECTOR).length)-i1)});
							jQuery('#entry-'+i1).animate({left: '90%'}, slider.duration)
						}

						// Move "Lower" slides to the left
						for(i2 = 0; i2 < target; i2++) {
							jQuery('#entry-'+i2).css({zIndex: (99+i2)});
							jQuery('#entry-'+i2).animate({left: (-(jQuery('#entry-'+i2).outerWidth() - (jQuery(window).innerWidth()*0.1))) + 'px'}, slider.duration);
						}

						// Move and set target slide as current slide
						jQuery('#entry-'+target).css({zIndex: 499+target});
						if(target < slider.currentSlide){
							jQuery('#entry-'+(target)).animate({left: jQuery('#entry-spaceholder').offset().left + 'px'}, slider.duration, function(){
								jQuery('#nav-item-'+slider.currentSlide).removeClass('current');
								jQuery('#nav-item-'+target).css({zIndex: 99+target});
								jQuery('#nav-item-'+target).addClass('current');
								jQuery('.nav-item-waiting').removeClass('nav-item-waiting');
								slider.currentSlide = target;
								slider.transitionInProgress = false;
							});
						} else if(target > slider.currentSlide) {
							jQuery('#entry-'+(target)).animate({left: jQuery('#entry-spaceholder').offset().left}, slider.duration, function(){
								jQuery('#nav-item-'+slider.currentSlide).removeClass('current');
								jQuery('#nav-item-'+target).addClass('current');
								jQuery('.nav-item-waiting').removeClass('nav-item-waiting');
								slider.currentSlide = target;
								slider.transitionInProgress = false;
							});
						}
					}
				}
			}

			slider.next = function() {
				if(jQuery(ENTRY_SELECTOR).length > 0 && slider.currentSlide >= 0 && slider.currentSlide < (jQuery(ENTRY_SELECTOR).length-1) && slider.transitionInProgress == false) {
					if(slider.transitionInProgress = true) {
						slider.updateClick(slider.currentSlide+1);

						jQuery('#entry-'+slider.currentSlide).css({zIndex: (99+slider.currentSlide)});
						jQuery('#entry-'+slider.currentSlide).animate({left: (-(jQuery('#entry-'+slider.currentSlide).outerWidth() - (jQuery(window).innerWidth()*0.1))) + 'px'},{duration: slider.duration});
						jQuery('#entry-'+(slider.currentSlide+1)).animate({left: jQuery('#entry-spaceholder').offset().left}, slider.duration, function(){
							jQuery('#nav-item-'+slider.currentSlide).removeClass('current');
							jQuery('#nav-item-'+(slider.currentSlide+1)).addClass('current');
							slider.currentSlide++;
							slider.transitionInProgress = false;
						});
					}
				}
			}

			slider.prev = function() {
				if(jQuery(ENTRY_SELECTOR).length > 0 && slider.currentSlide > 0 && slider.transitionInProgress == false) {
					if(slider.transitionInProgress = true) {
						slider.updateClick(slider.currentSlide-1);
						jQuery('#entry-'+slider.currentSlide).css({zIndex: (99+jQuery(ENTRY_SELECTOR).length)-slider.currentSlide});
						jQuery('#entry-'+slider.currentSlide).animate({left: '90%'},{duration: slider.duration});
						jQuery('#entry-'+(slider.currentSlide-1)).animate({left: jQuery('#entry-spaceholder').offset().left + 'px'}, slider.duration, function() {
							jQuery('#nav-item-'+slider.currentSlide).removeClass('current');
							jQuery('#nav-item-'+(slider.currentSlide-1)).addClass('current');
							slider.currentSlide--;
							slider.transitionInProgress = false;
						});
					}
				}
			}

			slider.adjustPosition = function() {
				let target = slider.currentSlide ;

				// Move "Upper" Slides to right
				for(i1 = jQuery(ENTRY_SELECTOR).length-1; i1 > target;i1--) {
					jQuery('#entry-'+i1).css({zIndex: ((99+jQuery(ENTRY_SELECTOR).length)-i1), left: '90%'});
				}

				// Move "Lower" slides to the left
				for(i2 = 0; i2 < target; i2++) {
					jQuery('#entry-'+i2).css({zIndex: (99+i2), left: (-(jQuery('#entry-'+i2).outerWidth() - (jQuery(window).innerWidth()*0.1))) + 'px'});
				}

				// Move current slide
				if(jQuery('#entry-'+target).hasClass('popped')) {
					jQuery('#entry-'+target).css({left: 0, top: 0, height: 'auto', width: '60%', zIndex: 999});
					if(jQuery('#entry-'+target).outerHeight(true) < jQuery(window).innerHeight()) {
						let extraSpace = jQuery('#entry-'+target).outerHeight(true) - jQuery('#entry-'+target).height();
						let entryHeight = jQuery('body').outerHeight(true) - extraSpace;

						jQuery('#entry-'+target).css({height: entryHeight +'px'});
					}
				} else {
					jQuery('#entry-'+target).css({left: jQuery('#entry-spaceholder').offset().left + 'px'});
				}
			}

			slider.updateClick = function(targetSlide) {
				// Remove Click Event Hanlers from all Slides
				jQuery(ENTRY_SELECTOR).unbind('click');
				jQuery(ENTRY_SELECTOR).css({cursor: 'auto'});

				// Assign New Click Handlers:
				if((targetSlide) < (jQuery(ENTRY_SELECTOR).length-1)){
					//Asign Next() trigger
					jQuery('#entry-'+(targetSlide+1)).click(function() {
						slider.next();
					});
					jQuery('#entry-'+(targetSlide+1)).css({cursor: 'pointer'});
				} else {
					// console.log('cannot next, current slide: ' + targetSlide);
				}

				if(targetSlide > 0) {
					jQuery('#entry-'+(targetSlide-1)).click(function() {
						slider.prev();
					});
					jQuery('#entry-'+(targetSlide-1)).css({cursor: 'pointer'});
				}
			}

			slider.displayNavOverlay = function(entry) {
				if(slider.currentSlide != entry && !slider.transitionInProgress) {
					jQuery('#entry-container-overlay .text').text(jQuery('#entry-'+entry+' h2.title').text());
					jQuery('#entry-container-overlay').css({top: jQuery('#entry-spaceholder').offset().top, left: jQuery('#entry-spaceholder').offset().left, width: jQuery('#entry-spaceholder').outerWidth(), height: jQuery('#entry-spaceholder').outerHeight()});
					jQuery('#entry-container-overlay').addClass('visible');
				}
			}

			slider.hideNavOverlay = function() {
				if(jQuery('#entry-container-overlay').hasClass('visible')) {
					jQuery('#entry-container-overlay').removeClass('visible');
				}
			}

			slider.pop = function(entry) {
				if(slider.canRun() == true) {
					// Remove #close-modal
					jQuery('#close-modal').unbind('click');
					jQuery('#close-modal').remove();

					//Remove any popped item:
					if(jQuery('.popped').length > 0) {
						jQuery('.popped').removeClass('popped');
					}

					// Set the specified entry as the "popped" entry
					if(jQuery('#entry-'+entry).length > 0) {
						jQuery('#entry-'+entry+' .overflowed').removeClass('overflowed');
						jQuery('#entry-'+entry+' .popper-container .pop-btn').unbind('click');
						jQuery('#entry-'+entry+' .popper-container').remove();

						jQuery('#entry-'+entry).append('<button id="close-modal">Close</button>');
						jQuery('#close-modal').click(function(){
							slider.popBack();
						});
						jQuery('#close-modal').css({cursor: 'pointer'});
						jQuery('#entry-'+entry).addClass('popped');

						if(jQuery('.popped').length > 0) {
							slider.adjustPosition();
						}
					}
				}
			}

			slider.popBack = function() {
				// Remove #close-modal
				jQuery('#close-modal').unbind('click');
				jQuery('#close-modal').remove();

				// If there is something popped, get rid of it
				if(jQuery('.popped').length > 0) {
					jQuery('.popped').css({zIndex: (99+slider.currentSlide)});
					jQuery('.popped').removeClass('popped');
				}

				slider.fit();
			}

			slider.fit = function() {
				if(slider.canRun() == true) {
					// Fit #entry-spaceholder to available space
					let x = 0,
						extraSpace = jQuery('#entry-spaceholder').outerHeight(true) - jQuery('#entry-spaceholder').height();

					jQuery('.height-ref').each(function(){
						x += jQuery(this).outerHeight(true);
					});

					let spaceHolderHeight = jQuery(window).innerHeight() - (x + extraSpace);

					jQuery('#entry-spaceholder').css({height: spaceHolderHeight + 'px' });
					jQuery(ENTRY_SELECTOR).css({position: 'absolute', width: jQuery('#entry-spaceholder').width() + 'px', height: spaceHolderHeight + 'px', top: jQuery('#entry-spaceholder').offset().top + 'px', left: '90%', margin: '0'});
					if(jQuery('#entry-container-overlay').length > 0) {
						jQuery('#entry-container-overlay').css({height: spaceHolderHeight + 'px'});
					}

					//Check for overflowed entries
					jQuery('article.entry .container').each(function(i) {
						if(jQuery(this).parent().height() < jQuery(this).outerHeight() && !(jQuery(this).parent().hasClass('popped'))) {
							if(jQuery('#pop-button-'+i).length == 0) jQuery(this).append('<div class="popper-container"><button class="pop-btn" id="pop-button-'+i+'">Read More</button></div>');
							jQuery('#pop-button-'+i).click(function(){
								slider.pop(i);
							});
							jQuery('#pop-button-'+i).css({cursor: 'pointer'});
							while(jQuery(this).parent().height() < jQuery(this).outerHeight() && jQuery(this).children(':not(.popper-container, .title, .overflowed)').length > 0) {
								jQuery(jQuery(this).children(':not(.popper-container, .title, .overflowed)')[jQuery(this).children(':not(.popper-container, .title, .overflowed)').length-1]).addClass('overflowed');
							}
						}
					});

					//Check that entries aren't too small
					let minimiumHeight = 0;
					jQuery('article.entry .container').each(function(i) {
						if(jQuery(this).parent().height() < jQuery(this).outerHeight(true) && !(jQuery(this).parent().hasClass('popped'))) {
							if(jQuery(this).parent().height() < jQuery(this).outerHeight(true) && jQuery(this).children(':not(.popper-container, .title, .overflowed)').length == 0 && jQuery(this).outerHeight(true) < minimiumHeight || i == 0) {
								minimiumHeight = jQuery(this).outerHeight(true);
							}
						}
					});
					if(minimiumHeight != 0) {
						spaceHolderHeight = minimiumHeight;
						jQuery('#entry-spaceholder').css({height: spaceHolderHeight + 'px' });
						jQuery(ENTRY_SELECTOR).css({position: 'absolute', width: jQuery('#entry-spaceholder').width() + 'px', height: spaceHolderHeight + 'px', top: jQuery('#entry-spaceholder').offset().top + 'px', left: '90%', margin: '0'});
						if(jQuery('#entry-container-overlay').length > 0) {
							jQuery('#entry-container-overlay').css({height: spaceHolderHeight + 'px'});
						}
					}

					slider.adjustPosition();
				} else {
					slider.off();
					slider.on();
				}
			}

			// Event Handlers
			jQuery(window).load(function(){
				if(slider.on) slider.on();
			});

			jQuery(window).resize(function(){
				jQuery('.overflowed').removeClass('overflowed');
				jQuery('.popper-container .pop-btn').unbind('click');
				jQuery('.popper-container').remove();
				if(slider.fit) slider.fit();
			});
		}
	}
})();
