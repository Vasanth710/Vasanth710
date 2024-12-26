// @module JJ.CategoryTiles.CategoryTiles
define('JJ.CategoryTiles.CategoryTiles.View'
	, [
		'jj_categorytiles_categorytiles.tpl'
		, 'Backbone'
	]
	, function (
		jj_categorytiles_categorytiles_tpl
		, Backbone
	) {
		'use strict';

		// @class JJ.CategoryTiles.CategoryTiles.View @extends Backbone.View
		return Backbone.View.extend({

			template: jj_categorytiles_categorytiles_tpl

			, initialize: function (options) {
				this.data = SC.CONFIGURATION.CategoryTiles.data || [];
			}
			, getContext: function getContext() {
				var self = this;
				this.showContent = SC.CONFIGURATION.CategoryTiles.showTiles || false
				return {
					showContent: this.showContent && _.isEmpty(self.data),
					data: this.data
				};
			}
		});
	});
