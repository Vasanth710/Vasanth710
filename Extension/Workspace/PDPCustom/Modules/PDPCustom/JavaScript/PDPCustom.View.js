// @module JJ.PDPCustom.PDPCustom
define('JJ.PDPCustom.DetailsTab.View'
	, [
		'jj_pdpcustom_pdpcustom.tpl',
		'Backbone'
	]
	, function (
		jj_pdpcustom_pdpcustom_tpl,
		Backbone
	) {
		'use strict';
		return Backbone.View.extend({

			template: jj_pdpcustom_pdpcustom_tpl,
			initialize: function (options) {
				var pdp = this.options.application.getComponent('PDP');
				this.item = _.isEmpty(pdp.getSelectedMatrixChilds())
					? pdp.getItemInfo().item
					: pdp.getSelectedMatrixChilds()[0];
				this.detailsToShow = SC.CONFIGURATION.PDPDetailsTab.data

				var self = this;
				this.mappedDetailsToShow = self.detailsToShow.map(detail => {
					var matchingItem = _.isNumber(self.item[detail.id]) ? JSON.stringify(self.item[detail.id]) : self.item[detail.id]
					var cleanedData = !_.isEmpty(matchingItem) ? matchingItem.replace("&nbsp;", ' ') : ''; // Replace '&amp;nbsp;' with space
					return {
						...detail,
						data: cleanedData
					};
				}).filter(detail => detail.data.trim() !== ''); // Filter out items where data is empty

			},
			getContext: function getContext() {
				var self = this;
				return {
					details: this.mappedDetailsToShow,
					detailsSection: true,
					showdetails: !_.isEmpty(self.mappedDetailsToShow)
				};
			}
		});
	});
