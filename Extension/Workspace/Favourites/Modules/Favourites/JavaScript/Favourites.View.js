// @module JJ.Favourites.Favourites
define('JJ.Favourites.Favourites.View',
	[
		'jj_favourites_favourites.tpl',
		'Backbone',
		'backbone_collection_view_cell.tpl',
		'backbone_collection_view_row.tpl',
		'Backbone.CollectionView',
		'JJ.Favourites.List.View',
		'Utils',
		'JJ.Favourites.Favourites.SS2Model',
		'GlobalViews.Pagination.View'
	]
	, function favouritesView(
		jj_favourites_favourites_tpl,
		Backbone,
		backboneCollectionViewCellTemplate,
		backboneCollectionViewRowTemplate,
		BackboneCollectionView,
		ListView,
		Utils,
		FavouritesCollection,
		GlobalViewsPaginationView
	) {
		'use strict';

		// @class JJ.Favourites.Favourites.View @extends Backbone.View
		return Backbone.View.extend({

			template: jj_favourites_favourites_tpl,
			title: Utils.translate('Favourites'),
			attributes: {
				id: 'favourites',
				'class': 'favouritesView'
			}
			, getBreadcrumbPages: function () {
				return {
					text: this.title
					, href: '/favourites'
				};
			},
			getSelectedMenu: function getSelectedMenu() {
				return 'favourites';
			},
			initialize: function (options) {
				var self = this;
				this.model = new FavouritesCollection();
				this.layout = options.layout;
				var page = '0';
				if (options.routerArguments && options.routerArguments[0]) {
					var params = Utils.parseUrlOptions(options.routerArguments[0]);
					if (params.page) {
						page = params.page.toString();
					}
				}
				this.page = page;
				this.options.showCurrentPage = true;
				self.listenCollection();
				this.resultPerPage = SC.CONFIGURATION.get('FavouritesDetail.itemperpage') || 2;
				this.model.fetch({
					data: {
						pageIndex: parseInt(this.page) > 0 ? parseInt(this.page) - 1 : parseInt(this.page) || 0,
						resultPerPage: this.resultPerPage
					}

				}).done(function (result) {
					self.result = result.parsedFav;
					self.totalRecordsFound = result.searchResultCount;
					self.isLoading = false;
					self.render();
				});
			},
			listenCollection: function () {
				var self = this;
				self.setLoading(true);
				if (self.result && self.result.length > 0) {
					self.fav_collection = new Backbone.Collection(self.result.map(function (line) {
						return new Backbone.Model({
							item: line.itemid,
							recordId: line.recid
						});
					}));

					self.fav_collection.on({
						request: jQuery.proxy(self, 'setLoading', true),
						reset: jQuery.proxy(self, 'setLoading', false),
						sync: jQuery.proxy(self, 'setLoading', false)
					});
				}
			}

			, setLoading: function (value) {
				this.isLoading = value;
			},
			events: {
				'click .remove-fav-items': 'removeAllItems',
				'click .add-fav-items': 'addAllItems',
				"click .fav-display-clear-icon": "removeAllItems",
				'click [name="select-all-checkbox"]': 'selectAllBox'

			},
			selectAllBox: function selectAllBox(e) {
				var dataRecord = e.currentTarget.checked;
				if (dataRecord) {
					$('input[type="checkbox"].single-item:not(:checked)').click();
				} else {
					$('input[type="checkbox"].single-item:checked').click();
				}
			},
			getCheckedDataFavValues: function getCheckedDataFavValues() {
				return $('input[type="checkbox"].single-item:checked').map(function () {
					var dataFavValue = $(this).data('fav');
					var quantity = $(this).closest('.backbone-collection-view-row').find('#fav-qty').val();
					return { quantity: JSON.parse(quantity), item: { internalid: dataFavValue } };
				}).get();
			},
			getCheckedRecords: function getCheckedRecords() {
				return $('input[type="checkbox"].single-item:checked').map(function () {
					var dataRecord = $(this).data('record');
					return dataRecord;
				}).get();
			},
			removeAllItems: function removeAllItems(e) {
				var e = $(e.currentTarget);
				var dataRecord = e.data('record');
				var self = this;
				var items = [dataRecord];

				if (!dataRecord) {
					items = this.getCheckedRecords();

				}
				var currentUrl = window.location.href;
				var currentUrl = new URL(window.location.href);

				if (self.result.length <= items.length && (self.resultPerPage * parseInt(self.page) >= self.model.get('itemIds').length)) {
					currentUrl.hash = currentUrl.hash.split(`page=${self.page}`).join(`page=${parseInt(self.page) - 1}`);
					self.page = parseInt(self.page) - 1;
				}

				//var strippedUrl = currentUrl.split('?')[0];
				this.model.fetch({
					data: { recId: JSON.stringify(items) }
				}).done(function () {
					self.model.fetch({
						data: {
							pageIndex: self.page,
							resultPerPage: self.resultPerPage
						},

					}).done(function (result) {
						self.result = result.parsedFav;
						self.totalRecordsFound = result.searchResultCount;
						self.isLoading = false;
						if (self.page == 0) {
							self.render();
						} else {
							window.location.href = `${currentUrl.origin}/${currentUrl.pathname}${currentUrl.hash}`;
						}
					});
				});
			}
			, addAllItems: function removeAllItems(params) {
				var self = this;
				var lines = this.getCheckedDataFavValues();
				var layout = self.options.application.getComponent('Layout');
				var cart = this.options.application.getComponent("Cart");
				cart.addLines({
					lines
				}).done(function () {
					$('input[type="checkbox"].single-item:checked').click();
					$('input#fav-selectbox:checked').click();
					layout.showMessage({
						message: 'Your Item(s) are added to Cart!',
						type: 'success',
						selector: 'fav-notification',
						timeout: 7000
					});
				}).fail(function (params) {
					$('html, body').animate({
						scrollTop: $(".main").offset().top
					}, 1000);
					layout.showMessage({
						message: 'Please try again after sometime',
						type: 'error',
						selector: 'fav-notification',
						timeout: 7000
					});
				});
			}

			, childViews: {
				'Fav.Collection': function () {
					var self = this;
					if (self.result && self.result.length > 0) {
						self.fav_collection = new Backbone.Collection(self.result.map(function (line) {
							return new Backbone.Model({
								item: line.itemid,
								recordId: line.recid
							});
						}));
						return new BackboneCollectionView({
							childView: ListView,
							collection: self.fav_collection,
							viewsPerRow: 1,
							cellTemplate: backboneCollectionViewCellTemplate,
							rowTemplate: backboneCollectionViewRowTemplate,
							childViewOptions: self
						});
					}

				},
				'GlobalViews.Pagination': function () {
					var self = this;
					if (self.result && self.totalRecordsFound > 0) {
						return new GlobalViewsPaginationView(
							_.extend(
								{
									totalPages: Math.ceil(self.totalRecordsFound / self.resultPerPage)
								}
								, SC.CONFIGURATION.defaultPaginationSettings
							)
						);
					}
				}

			}
			//@method getContext @return JJ.Favourites.Favourites.View.Context
			, getContext: function getContext() {
				var showCollection = this.result && (this.result.length > 0);
				return {
					showCollection: showCollection,
					showPagination: !!(this.totalRecordsFound && this.resultPerPage),
					isLoading: this.isLoading
				};
			}
		});
	});
