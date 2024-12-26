
define(
	'JJ.PDPCustom.PDPCustom',
	[
		'JJ.PDPCustom.DetailsTab.View',
		'JJ.PDPCustom.PDFTab.View',
		'ProductDetails.Information.View',
		'Backbone.CompositeView',
		'SC.Configuration'
	],
	function (
		PDPDetailsTabView,
		PDFTabView,
		ProductDetailsInformationView,
		BackboneCompositeView,
		Configuration
	) {
		'use strict';

		return {
			mountToApp: function mountToApp(container) {
				_.extend(ProductDetailsInformationView.prototype, {
					initialize: _.wrap(ProductDetailsInformationView.prototype.initialize, function initialize(fn) {
						fn.apply(this, _.toArray(arguments).slice(1));
						BackboneCompositeView.add(this);
						this.on('beforeCompositeViewRender', function beforeCompositeViewRender() {
							this.$el.find('.product-details-information-tab-content-panel.details')
								.append('<div class="product-details-info" data-view="Details.tab"></div>');
							this.$el.find('.product-details-information-tab-content-panel.pdfsection')
								.append('<div class="product-details-info" data-view="PDF.tab"></div>');
						});
					}),

					computeDetailsArea: function computeDetailsArea() {
						var self = this;
						var details = [];
						_.each(Configuration.get('productDetailsInformation', []), function (item_information) {
							var content = '';
							if (item_information.contentFromKey) {
								content = self.model.get('item').get(item_information.contentFromKey);
							}
							details.push({
								name: item_information.name,
								content: content,
								itemprop: item_information.itemprop
							});
						});
						return details;
					},

					childViews: _.extend({}, ProductDetailsInformationView.prototype.childViews, {
						'Details.tab': function () {
							return new PDPDetailsTabView({
								type: 'details',
								application: container
							});
						},
						'PDF.tab': function () {
							return new PDFTabView({
								type: 'details',
								application: container
							});
						}
					})
				});
			}
		};
	});