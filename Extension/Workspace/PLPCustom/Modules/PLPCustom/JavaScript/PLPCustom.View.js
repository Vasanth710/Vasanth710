// @module JJ.PLPCustom.PLPCustom
define('JJ.PLPCustom.PLPCustom.View'
	, [
		'jj_plpcustom_plpcustom.tpl',
		'Backbone'
	]
	, function (
		jj_plpcustom_plpcustom_tpl,
		Backbone
	) {
		'use strict';
		return Backbone.View.extend({

			template: jj_plpcustom_plpcustom_tpl,
			initialize: function (options) {
				this.showLabel = options.showLabel
				this.item = options.model.attributes
				this.detailsToShow = SC.CONFIGURATION.PLPListDetails.data || []
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
				return {
					mappedDetailsToShow: this.mappedDetailsToShow,
					showLabel: this.showLabel
				};
			}
		});
	});
