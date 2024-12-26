
define(
	'JJ.PLPCustom.PLPCustom'
	, [
		'JJ.PLPCustom.PLPCustom.View',
		'Facets.ItemCell.View',
		'Backbone.CompositeView',
		'ProductLine.Stock.View',
		'ProductDetails.Base.View',
		'Facets.Browse.View',
		'JJ.PLPCustom.Category.View'

	]
	, function (
		PLPCustomView,
		FacetsItemCell,
		BackboneCompositeView,
		ProductLineStockView,
		ProductDetailsBaseView,
		FacetsBrowseView,
		PLPCategoryView
	) {
		'use strict';

		return {
			mountToApp: function mountToApp(container) {
				var layout = container.getComponent('Layout');

				layout.addChildView('Category.Data', function () {
					return new PLPCategoryView({ container: container });
				});

				_.extend(FacetsItemCell.prototype, {
					initialize: _.wrap(FacetsItemCell.prototype.initialize, function initialize(fn) {
						fn.apply(this, _.toArray(arguments).slice(1));

						BackboneCompositeView.add(this);

						this.on('beforeCompositeViewRender', function beforeCompositeViewRender() {
							this.$el.find('.facets-item-cell-list-title').after('<div data-view="Additional.Data"></div>');
						});
						this.on('beforeCompositeViewRender', function beforeCompositeViewRender() {
							this.$el.find('.facets-item-cell-grid-title').after('<div data-view="Additional.Data.Grid"></div>');
						});
					}),

					childViews: _.extend(FacetsItemCell.prototype.childViews, {
						'Additional.Data': function () {
							return new PLPCustomView({
								model: this.model,
								container: container,
								showLabel: true
							});
						},
						'Additional.Data.Grid': function () {
							return new PLPCustomView({
								model: this.model,
								container: container,
								showLabel: false
							});
						},
						'ItemViews.Stock': function () {
							return new ProductLineStockView({
								model: this.model,
								plp: true
							});
						},
					})
				});
				_.extend(FacetsBrowseView.prototype, {
					initialize: _.wrap(FacetsBrowseView.prototype.initialize, function initialize(fn) {
						fn.apply(this, _.toArray(arguments).slice(1));
						this.on('beforeCompositeViewRender', function beforeCompositeViewRender() {
							this.$el.find('[data-view="Facets.FacetedNavigation"]').before('<div data-view="Category.Data"></div>');
						});
					})
				});
				_.extend(ProductLineStockView.prototype, {
					getContext: _.wrap(ProductLineStockView.prototype.getContext, function initialize(fn) {
						var orignalRet = fn.apply(this, _.toArray(arguments).slice(1));
						if (this.options.plp) {
							var item = orignalRet.model.attributes;
							var isInStock = item.isinstock;
							var isOutofStock = !item.isinstock;
							var isBackorderable = item.isbackorderable;
							if (isInStock) {
								orignalRet.showInStockMessage = true
							}
							if (isBackorderable && isOutofStock) {
								orignalRet.stockInfo.outOfStockMessage = "You may place this item on backorder so that you can receive it as it becomes available";
							}
							if (!isBackorderable && isOutofStock) {
								orignalRet.stockInfo.outOfStockMessage = "Out of Stock";
							}
						}
						if (this.attributes["data-root-component-id"] == "ProductDetails.Full.View") {
							var item = orignalRet.model.attributes.item.attributes;
							var isInStock = item.isinstock;
							var isOutofStock = !item.isinstock;
							var isBackorderable = item.isbackorderable;
							if (isInStock) {
								orignalRet.showInStockMessage = true;
							}
							if (!isBackorderable && isOutofStock) {
								orignalRet.stockInfo.outOfStockMessage = "Out of Stock";
							}
						}
						return orignalRet
					})
				});
			}
		};
	});
