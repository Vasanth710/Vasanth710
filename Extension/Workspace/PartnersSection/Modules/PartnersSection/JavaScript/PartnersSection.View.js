// @module JJ.PartnersSection.PartnersSection
define('JJ.PartnersSection.PartnersSection.View'
	, [
		'jj_partnerssection_partnerssection.tpl'
		, 'Backbone'
	]
	, function (
		jj_partnerssection_partnerssection_tpl
		, Backbone
	) {
		'use strict';

		// @class JJ.PartnersSection.PartnersSection.View @extends Backbone.View
		return Backbone.View.extend({

			template: jj_partnerssection_partnerssection_tpl

			, initialize: function (options) {
				this.loadOwlCarousel();

				// Initial load based on window width
				this.previousWidth = window.innerWidth;

				// Debounce the resize event
				let resizeTimeout;
				window.addEventListener('resize', () => {
					clearTimeout(resizeTimeout);
					resizeTimeout = setTimeout(() => {
						const currentWidth = window.innerWidth;

						// Check if the window crosses the 991px breakpoint
						if ((this.previousWidth > 991 && currentWidth <= 991) || (this.previousWidth <= 991 && currentWidth > 991)) {
							this.loadOwlCarousel();
						}

						// Update previous width
						this.previousWidth = currentWidth;
					}, 100);
				});
			},

			loadOwlCarousel: function () {
				this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js', () => {
					setTimeout(() => {
						this.initializeCarousels();
					}, 2000);
				});
			},

			loadScript: function (url, callback) {
				var script = document.createElement("script");
				script.type = "text/javascript";
				if (script.readyState) { // only required for IE <9
					script.onreadystatechange = function () {
						if (script.readyState === "loaded" || script.readyState === "complete") {
							script.onreadystatechange = null;
							callback();
						}
					};
				} else {
					script.onload = function () {
						callback();
					};
				}
				script.src = url;
				document.getElementsByTagName("head")[0].appendChild(script);
			},

			initializeCarousels: function () {
				var sync1 = $("#slider-industry");
				var sync2 = $("#slider-business");
				var sync3 = $("#slider-academic");
				var slidesPerPage = 5; // globally define number of elements per page

				sync1.owlCarousel({
					startPosition: this.index,
					items: 1,
					slideSpeed: 1000,
					center: false,
					loop: true,
					nav: false,
					autoplay: true,
					dots: false,
					autoplaySpeed: 2500,
					autoplayTimeout: 2500,
					fluidSpeed: true,
					smartSpeed: 2500,
					animateOut: 'slideOutLeft',
					animateIn: 'slideInRight',
					responsiveRefreshRate: 10,
					responsive: {
						0: {
							items: 3
						},
						600: {
							items: 3
						},
						1000: {
							items: 5
						}
					}
				});

				sync2.owlCarousel({
					startPosition: this.index,
					items: 1,
					slideSpeed: 1000,
					loop: false,
					nav: false,
					autoplay: true,
					dots: false,
					responsiveRefreshRate: 100,
					autoplaySpeed: 2500,
					autoplayTimeout: 2500,
					fluidSpeed: true,
					smartSpeed: 2500,
					animateOut: 'slideOutLeft',
					animateIn: 'slideInRight',
					responsive: {
						0: {
							items: 3
						},
						600: {
							items: 3
						},
						1000: {
							items: 5
						}
					}
				});

				sync3.owlCarousel({
					startPosition: this.index,
					items: 1,
					slideSpeed: 1000,
					loop: false,
					nav: false,
					autoplay: true,
					dots: false,
					responsiveRefreshRate: 100,
					autoplaySpeed: 2500,
					autoplayTimeout: 2500,
					fluidSpeed: true,
					smartSpeed: 2500,
					animateOut: 'slideOutLeft',
					animateIn: 'slideInRight',
					responsive: {
						0: {
							items: 3
						},
						600: {
							items: 3
						},
						1000: {
							items: 5
						}
					}
				});
			}
			//@method getContext @return JJ.PartnersSection.PartnersSection.View.Context
			, getContext: function getContext() {

				return {
					message: this.message
				};
			}
		});
	});
