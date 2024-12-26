define(
	'JJ.Favourites.Favourites'
	, [
		'JJ.Favourites.Favourites.View',
		'JJ.Favourites.Favourites.SS2Model',
		'Profile.Model',
		'ProductDetails.Full.View',
		'sweetAlert',
		'Facets.Browse.View',
		'Facets.ItemCell.View',
		'FacetsItemsCollectionView',
		'JJ_Facet_item_cell_grid_custom.tpl',
		'JJ_Facet_item_cell_tabel_custom.tpl',
		'JJ_Facet_item_cell_list_custom.tpl'
	]
	, function (
		FavouritesView,
		FavouritesCollection,
		ProfileModel,
		ProductDetailsFullView,
		swal,
		FacetsBrowseView,
		FacetsItemCellView,
		FacetsItemsCollectionView,
		JJ_Facet_item_cell_grid_customtpl,
		JJ_Facet_item_cell_tabel_customtpl,
		JJ_Facet_item_cell_list_customtpl
	) {
		'use strict';

		return {
			mountToApp: function mountToApp(container) {
				var pageType = container.getComponent('PageType');
				var layout = container.getComponent('Layout');
				var myAccountMenu = container.getComponent('MyAccountMenu');
				if (myAccountMenu) {
					myAccountMenu.addGroup({
						id: 'favouritesgrp',
						name: 'Favourites',
						index: 5
					});
					var favouritesPage = {
						id: "favourites"
						, name: "Favourite Items"
						, groupid: 'favouritesgrp'
						, index: 1
						, url: 'favourites'
						, permissionoperator: "OR"
						, permission: []
					};
					myAccountMenu.addGroupEntry(favouritesPage);
				}

				if (myAccountMenu) {
					pageType.registerPageType({
						name: 'Favourites',
						routes: ['favourites'],
						view: FavouritesView,
						options: {
							layout: layout
						},
					});
				}

				_.extend(FacetsItemCellView.prototype, {
					events: _.extend({}, FacetsItemCellView.prototype.events, {
						'click [alt="favourite-icon"]': 'plpaddToFav',
						'click [alt="remove-favourite-icon"]': 'removeFav'
					}),
					plpaddToFav: function plpaddToFav(e) {
						Backbone.Events.trigger("plpaddToFav", e);
					},
					removeFav: function removeFav(e) {
						Backbone.Events.trigger("removeFav", e);
					},
				});

				_.extend(FacetsBrowseView.prototype, {
					initialize: _.wrap(FacetsBrowseView.prototype.initialize, function (fn) {
						fn.apply(this, _.toArray(arguments).slice(1));
						var self = this;
						var PLP = self.options.application.getComponent('PLP');
						self.profilemodel = ProfileModel.getInstance();
						self.is_logged_in = self.profilemodel.get('isLoggedIn') === 'T' && self.profilemodel.get('isGuest') === 'F';

						// Define renderFavorites
						self.renderFavorites = function () {
							// Ensure we have the list of favorite item IDs
							var uniqueItemIds = self.FavitemIds ? self.FavitemIds : _.uniq(_.pluck(self.FavModelresult, 'itemid')).map(String);
							// Iterate through each favorite button on the page
							$('svg.fav-out, svg.fav-in').each(function () {
								var itemId = $(this).data('item-id').toString();
								var isItemInFavorites = _.contains(uniqueItemIds, itemId);
								if ($(this).hasClass('fav-out')) {
									// Show button if item is in favorites
									$(this).toggleClass('show-button', isItemInFavorites);
								} else if ($(this).hasClass('fav-in')) {
									// Hide button if item is not in favorites
									$(this).toggleClass('show-button', !isItemInFavorites);
								}
							});
						};

						// To Get the Fav List
						PLP.on("afterShowContent", function () {
							if (self.is_logged_in) {
								self.FavModel = new FavouritesCollection();
								self.FavModel.fetch().done(function (result) {
									self.FavModelresult = result.parsedFav;
									self.FavitemIds = result.itemIds;
									self.renderFavorites();
								});
							}
						});

						// Creating Events to trigger from the ChildView
						Backbone.Events.off("plpaddToFav");
						Backbone.Events.on("plpaddToFav", this.plpaddToFav, this);
						Backbone.Events.off("removeFav");
						Backbone.Events.on("removeFav", this.removeFav, this);

						// Ensure to call renderFavorites when new content is loaded via infinite scroll
						Backbone.Events.on('infiniteScroll:renderContentComplete', function () {
							_.defer(function () {
								self.renderFavorites();
							});
						});
					}),

					plpaddToFav: function plpaddToFav(e) {
						var id = JSON.stringify($(e.currentTarget).data("itemId"));
						var self = this;
						if (self.is_logged_in) {
							// If Logged In add the item to Fav Record
							self.FavModel.fetch({ data: { addItem: id } }).done(function (result) {
								self.FavModelresult = result;
								if (result.code && result.code == "INVALID_ID") {
									swal("Please try again Later!", {
										icon: "warning",
									});
								} else {
									self.FavModel.fetch().done(function (result) {
										self.FavModelresult = result;
										var element = $('svg[data-item-id="' + id + '"]');
										element.each(function () {
											if ($(this).hasClass('fav-out')) {
												$(this).toggleClass('show-button', true);
											} else if ($(this).hasClass('fav-in')) {
												$(this).toggleClass('show-button', false);
											}
										});
									});
								}
							}).fail(function (data) {
								swal("Please try again Later!", {
									icon: "warning",
								});
							});
						} else {
							// If Logged out showing warning message
							swal("Please Login to continue", {
								icon: "warning",
							});
						}
					},

					removeFav: function removeFav(e) {
						var self = this;
						var itemIdToFind = JSON.stringify($(e.currentTarget).data("itemId"));
						if (self.is_logged_in) {
							// If Logged In remove the item to Fav Record
							self.FavModel.fetch({ data: { itemInternalId: itemIdToFind } }).done(function (result) {
								if (result > 0) {
									var element = $('svg[data-item-id="' + itemIdToFind + '"]');
									element.each(function () {
										if ($(this).hasClass('fav-out')) {
											$(this).toggleClass('show-button', false);
										} else if ($(this).hasClass('fav-in')) {
											$(this).toggleClass('show-button', true);
										}
									});
								}
							});
						} else {
							// If Logged out showing warning message
							swal("Please Login to continue", {
								icon: "warning",
							});
						}
					},
				});

				_.extend(FacetsBrowseView.prototype.childViews, {
					// Childview extended to extend the facet templates
					'Facets.Items': function () {
						var self = this;
						var display_option = _.find(this.itemsDisplayOptions, function (option) {
							return option.id === (self.translator.getOptionValue('display') ? self.translator.getOptionValue('display') : self.translator.options.display);
						});
						display_option = changeFacetTemplate(display_option);
						FacetsItemsCollectionView = FacetsItemsCollectionView.FacetsItemsCollectionView ? FacetsItemsCollectionView.FacetsItemsCollectionView : FacetsItemsCollectionView;
						return new FacetsItemsCollectionView({
							application: this.application,
							keywords: this.translator.getOptionValue('keywords'),
							collection: this.model.get('items').models,
							viewsPerRow: parseInt(display_option.columns, 10),
							cellViewTemplate: display_option.template
						});

						function changeFacetTemplate(display_option) {
							if (display_option.id == "grid") {
								display_option.template = 'JJ_Facet_item_cell_grid_custom.tpl';
							} else if (display_option.id == "table") {
								display_option.template = 'JJ_Facet_item_cell_tabel_custom.tpl';
							} else if (display_option.id == "list") {
								display_option.template = 'JJ_Facet_item_cell_list_custom.tpl';
							}
							return display_option;
						}
					}
				});

				_.extend(ProductDetailsFullView.prototype, {
					initialize: _.wrap(ProductDetailsFullView.prototype.initialize, function initialize(fn) {
						fn.apply(this, _.toArray(arguments).slice(1));
						var self = this;
						this.profile = ProfileModel.getInstance();
						this.is_logged_in = this.profile.get('isLoggedIn') === 'T' && this.profile.get('isGuest') === 'F';
						// Adding button to the PDP page
						this.on("afterViewRender", function (e) {
							_.defer(function () {
								if ($(".add-to-favourites-button-container").length < 1) {
									var newDiv = $('<div class="add-to-favourites-button-container"><button class="add-to-favourites-button disabled"  data-action="add-to-fav">Add To Favourites</button></div>');
									$('.product-details-full-actions-addtowishlist').after(newDiv);
								}
							});
							self;
						});
						var pdp = this.options.application.getComponent('PDP');
						pdp.on("afterShowContent", function () {
							var item = _.isEmpty(pdp.getSelectedMatrixChilds())
								? pdp.getItemInfo().item
								: pdp.getSelectedMatrixChilds()[0];
							self.itemID = item.internalid;
							if (self.is_logged_in) {
								self.FavModel = new FavouritesCollection();
								// fetching the fav list on the PDP page
								self.FavModel.fetch({ data: { itemID: self.itemID } }).done(function (result) {
									self.FavModelresult = result;
									$(".add-to-favourites-button").removeClass("disabled");
								});
							} else {
								$(".add-to-favourites-button").removeClass("disabled");
							}
						});
					}),

					events: _.extend({}, ProductDetailsFullView.prototype.events, {
						'click [data-action="add-to-fav"]': 'addToFav'
					}),

					addToFav: function addToFav(e) {
						e.preventDefault();
						var self = this;
						if (self.is_logged_in)
						// If Logged In add the item to Fav Record
						{
							if (this.FavModelresult > 0) {
								// If already in fav showing warning message
								swal("This item is already in your favorites!", {
									icon: "warning",
								});
							} else {
								self.FavModel.fetch({ data: { addItem: self.itemID } }).done(function (result) {
									self.FavModelresult = result;
									if (result.code && result.code == "INVALID_ID") {
										swal("Please try again Later!", {
											icon: "warning",
										});
									} else {
										swal("This item is added in your favorites!", {
											icon: "success",
										});
									}
								}).fail(function (data) {
									swal("Please try again Later!", {
										icon: "warning",
									});
								});
							}
						} else {
							// If Logged out showing warning message
							swal("Please Login to continue", {
								icon: "warning",
							});
						}
					}
				});

			}
		};
	});
