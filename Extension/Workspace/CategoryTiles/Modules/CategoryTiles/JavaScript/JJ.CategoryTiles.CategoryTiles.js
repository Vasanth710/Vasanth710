
define(
	'JJ.CategoryTiles.CategoryTiles'
	, [
		'JJ.CategoryTiles.CategoryTiles.View',
		'Home.View', 'underscore', 'Utils'
	]
	, function (
		CategoryTilesView,
		HomeView, _, Utils
	) {
		'use strict';

		return {
			mountToApp: function mountToApp(container) {
				var layout = container.getComponent('Layout');
				_.extend(HomeView.prototype, {
					initialize: _.wrap(HomeView.prototype.initialize, function (fn) {
						this.isRendered = false;
						fn.apply(this, _.toArray(arguments).slice(1));
						var self = this;
						this.on('beforeCompositeViewRender', function beforeCompositeViewRender() {
							if (self.$el.find('[data-view="Category.Tiles"]').length == 0) {
								self.$el.find('.home-image-slider').after('<div data-view="Category.Tiles"></div>');
							}
						});
						this.on('afterViewRender', function afterViewRender() {
							_.defer(function (params) {
								self.initSlider();
							})
						})
					}),
					initSlider: function initSlider() {
						var self = this;
						_.defer(function () {
							Utils.initBxSlider(self.$('[data-slider]'), {
								nextText: '<a class="home-gallery-next-icon"></a>',
								prevText: '<a class="home-gallery-prev-icon"></a>',
								auto: true,
								pause: 3500
							});
						}, 2000)
					},

					getContext: _.wrap(HomeView.prototype.getContext, function getContext(fn) {
						var context = fn.apply(this, _.toArray(arguments).slice(1));
						try {
							var carousel = SC.CONFIGURATION.get('home.themeCarouselImages', []);
							var infoblock = SC.CONFIGURATION.get('home.infoblock', []);
							var infoblockTile = false;
							var showCarousel = false;
							var carouselObj = context.carousel;
							var isReady =
								_.has(context, 'isReady') && !_.isUndefined(context.isReady)
									? context.isReady
									: true;
							if (!_.isEmpty(carouselObj)) {
								_.each(carouselObj, function (carousel) {
									if (!_.isEmpty(carousel.image)) {
										_.extend(carousel, {
											isAbsoluteUrl: carousel.image.indexOf('core/media') !== -1
										});
									}
								});
							} else {
								carouselObj = carousel;
							}
							context.extraHomeViewContexts = {
								isReady: isReady,
								showCarousel: carouselObj && !!carouselObj.length,
								carousel: carouselObj,
								infoblock: infoblock,
								freeTextText: _(SC.CONFIGURATION.get('home.freeTextText', '')).translate(),
								freeTextTitle: _(SC.CONFIGURATION.get('home.freeTextTitle')).translate(),
								freeTextSubtitle: _(SC.CONFIGURATION.get('home.freeTextSubtitle')).translate(),
								freeTextBtnText: _(SC.CONFIGURATION.get('home.freeTextBtnText')).translate(),
								freeTextBtnHref: _(SC.CONFIGURATION.get('home.freeTextBtnHref')).translate()
							};
						} catch (e) {
						}
						return context;
					})
				});

				if (layout) {
					layout.addChildView('Category.Tiles', function () {
						return new CategoryTilesView({ container: container });
					});
				}

			}
		};
	});
