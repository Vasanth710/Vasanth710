
define(
	'JJ.PartnersSection.PartnersSection'
	, [
		'JJ.PartnersSection.PartnersSection.View', "Home.View", 'Backbone.CompositeView'
	]
	, function (
		PartnersSectionView, HeaderLogo, BackboneCompositeView
	) {
		'use strict';

		return {
			mountToApp: function mountToApp(container) {

				var layout = container.getComponent('Layout');
				_.extend(HeaderLogo.prototype, {
					initialize: _.wrap(HeaderLogo.prototype.initialize, function initialize(fn) {
						fn.apply(this, _.toArray(arguments).slice(1));
						BackboneCompositeView.add(this);
						var sliderview = new PartnersSectionView({ container: container })
						this.on('beforeCompositeViewRender', function beforeCompositeViewRender() {
							_.defer(function () {
								if ($("#container-partners").length == 0) {
									$('.home-merchandizing-zone').before(sliderview.render().$el.html());
								}
							})
						});
					}),

				});

			}
		};
	});
