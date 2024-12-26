
define(
	'JJ.PickupInStore.PickupInStore'
	, [
		'PickupInStore.View',
		'StoreLocator.Collection',
		'jj_pickupinstore_pickupinstore.tpl',
		'LiveOrder.Model',
		"Location.VenueDetails.View"
	]
	, function (
		PickupInStoreView,
		StoreLocatorCollection,
		jj_pickupinstore_pickupinstore_tpl,
		LiveOrderModel,
		LocationVenueDetailsView
	) {
		'use strict';

		return {
			mountToApp: function mountToApp(container) {
				_.extend(PickupInStoreView.prototype, {
					template: jj_pickupinstore_pickupinstore_tpl,
					getContext: _.wrap(PickupInStoreView.prototype.getContext, function (fn) {
						var context = fn.apply(this, _.toArray(arguments).slice(1));
						var self = this;
						context.viewOnlyData = self.viewOnlyData ? self.viewOnlyData.get("name") : ""
						context.nonAvailMsg = _.isEmpty(SC.CONFIGURATION.PickupInStore.config) ? "" : SC.CONFIGURATION.PickupInStore.config;
						context.Stocknew = self.Stocknew;
						return context
					}),
					initialize: _.wrap(PickupInStoreView.prototype.initialize, function (fn) {
						fn.apply(this, _.toArray(arguments).slice(1));
						var self = this;
						self.Stocknew = false;
						self.store_collection = new StoreLocatorCollection()
						self.store_collection.fetch({
							reset: true,
							success: function (collection) {
								// Find the default location by internalid or name
								self.defaultLocation = collection.findWhere({ name: 'Pharmacy' }) || collection.get(4);
								self.viewOnlyData = self.store_collection.findWhere({ name: 'Pharmacy' }) || self.store_collection.get(4);
								var pharmacyID = self.viewOnlyData.attributes.internalid
								self.render()
								if (self.getLocationStock(pharmacyID) == 0) {
									self.Stocknew = true;
								
									//change the url fullfillment set to ship
									self.model.set('fulfillmentChoice', 'ship');
								}
							},
							error: function (collection, response) {
								console.error('Failed to fetch collection', response);
							}
						});

						self.store_collection.on('reset', self.render, self);
					}),
					focusFirstInput: function () {
						return !this.store_collection.length;
					},

					selectPickup: function (e) {
						e.preventDefault();
						var self = this;
						// Set the default location to 'Pharmacy' if not already set
						if (self.defaultLocation) {
							this.model.set('location', self.defaultLocation);
							self.model.set('fulfillmentChoice', 'pickup');
							// Ensure the view is re-rendered to reflect the change
							if (this.source && this.source === 'cart') {
								LiveOrderModel.getInstance().updateLine(this.model);
							}
							this.render();
						}
						else {
							if (this.getLocationStock() > 0) {
								this.model.set('fulfillmentChoice', 'pickup');

								// If the source is the Cart, then the Live Order must be updated
								if (this.source && this.source === 'cart') {
									LiveOrderModel.getInstance().updateLine(this.model);
								}
							} else {
								this.changeStore(e);
							}
						}
					},
					// Override the method responsible for showing the popup and prevent it
					changeStore: function (e) {
						e.preventDefault();
					},
					getLocationStock: function getLocationStock(id) {
						const location = this.model.get('location');
						var locationID = location.get('internalid')
						locationID = id ? parseInt(id, 10) : parseInt(locationID, 10)
						const stock_information = this.model.getStockInfo();
						const location_stock = location
							? _.findWhere(stock_information.stockPerLocation, {
								internalid: locationID
							})
							: null;
						return location_stock ? location_stock.qtyavailableforstorepickup : 0;
					},
					childViews: {
						'PickupInStore.StoreLocationInfo': function () {
							const self = this;
							if (self.viewOnlyData) {
								return new LocationVenueDetailsView({
									model: self.viewOnlyData,
									application: self.application,
									showAddress: true
								});
							}
						}
					}
				});
			}
		};
	});
