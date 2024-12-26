// @module JJ.AccountCustomization.AccCustomization
define('JJ.AccountCustomization.AccCustomization.View'
	, [
		'jj_accountcustomization_edit.tpl'
		, 'JJ.AccountCustomization.AccCustomization.Model'
		, 'Backbone'
		, 'QuickAdd.View'
	]
	, function (
		template
		, AccCustomizationModel
		, Backbone
		, QuickAddView
	) {
		'use strict';

		// @class JJ.AccountCustomization.AccCustomization.View @extends Backbone.View
		return Backbone.View.extend({

			template: template

			, initialize: function (options) {
				var self = this;
				this.editmodel = new AccCustomizationModel();
				this.newItems = []
				this.existingLines = this.model.get('lines').models

				this.filteredData = this.existingLines.map(obj => {
					const itemAttributes = obj.attributes.item.attributes;
					const storageClass = itemAttributes.class;
					const controlledClasses = [
						'Refrigerated',
						'Controlled',
						'Controlled : Compound Controlled',
						'Controlled : Signature Controlled'
					];
					const isControlled = controlledClasses.includes(storageClass);

					return {
						quantity: obj.attributes.quantity,
						itemID: itemAttributes.internalid,
						item: obj.attributes.item,
						lineID: obj.attributes.internalid,
						itemName: itemAttributes.storedisplayname2,
						controlled: isControlled
					};
				});

			}

			, events: {
				"click [data-action='submit']": "getData",
				"click [data-action='remove']": "removeData",
				"change .line-item-qty": "updateQty"
			},
			updateQty: function updateQty(e) {
				var self = this;
				const itemID = this.$(e.target).data('item');
				const Qty = parseInt(self.$(e.target).val())
				const existingItem = _.findWhere(self.filteredData, { itemID: itemID });
				if (existingItem) {
					existingItem.quantity = Qty;
					existingItem.updated = true;
					if (existingItem.lineID) {
						existingItem.lineIndex = parseInt(existingItem.lineID.split("_")[1]);
					}
				}
			},

			removeData: function removeData(e) {
				var self = this;
				const itemID = this.$(e.target).data('item');
				const existingItem = _.findWhere(self.filteredData, { itemID: itemID });
				if (existingItem) {
					existingItem.removeItem = true;
					existingItem.quantity = 0;
					if (existingItem.lineID) {
						existingItem.lineIndex = parseInt(existingItem.lineID.split("_")[1]);
					}
				}
				self.render()
			},
			getData: function getData() {
				var self = this;
				$("#in-modal-noitems-error").hide()
				$("#noitems-error").hide()
				function shouldRemoveItem(item) {
					return item.newLine === true && item.quantity === 0;
				}
				var filteredItems = _.reject(_.map(self.filteredData, function (item) {
					return _.omit(item, 'item', 'itemName');
				}), shouldRemoveItem);
				var salesOrder = this.model.get("internalid")
				var removeItemCount = _.size(_.filter(filteredItems, { 'removeItem': true }));
				if (removeItemCount === filteredItems.length) {
					$("#in-modal-noitems-error").show()
					$("#noitems-error").show()
					return true
				} else {
					this.editmodel.fetch({
						data: {
							salesOrder: salesOrder,
							update: JSON.stringify(filteredItems)
						}
					}).done(function (result) {
						self.render()
						$('.global-views-modal-content-header-close').click();
						location.reload();
					})
				}

			}
			, childViews: {
				QuickAddView: function () {
					this.quickAddViewComponent = new QuickAddView({
						getItemQuantitySet: _.bind(this.getItemQuantitySet, this),
						showBackorderable: true
					});
					this.quickAddViewComponent.on('selectedLine', this.addNewLine, this);
					return this.quickAddViewComponent;
				}
			},
			addNewLine: function (options) {
				var self = this;
				const { selectedLine } = options;
				var storageClass = selectedLine.attributes.item.attributes.class;
				const controlledItems = (storageClass === 'Refrigerated' ||
					storageClass === 'Controlled' ||
					storageClass === 'Controlled : Compound Controlled' ||
					storageClass === 'Controlled : Signature Controlled');

				if (controlledItems) {
					$("#in-modal-controlled-items-error").show()
					$("#controlled-items-error").show()
					setTimeout(() => {
						$("#in-modal-controlled-items-error").hide()
						$("#controlled-items-error").hide()
					}, 3000);
					return true
				}
				var selectedItemId = selectedLine.attributes.item.attributes.internalid;
				var quantity = selectedLine.attributes.quantity;
				const existingItem = _.findWhere(self.filteredData, { itemID: selectedItemId });
				if (existingItem) {
					existingItem.quantity += quantity;
					existingItem.updated = true;
					if (existingItem.lineID) {
						existingItem.lineIndex = parseInt(existingItem.lineID.split("_")[1]);
					}
				} else {
					this.filteredData.push({
						quantity: selectedLine.attributes.quantity,
						itemID: selectedLine.attributes.item.attributes.internalid,
						item: selectedLine.attributes.item,
						itemName: selectedLine.attributes.item.attributes.storedisplayname2,
						newLine: true
					})
				}

				this.render();
			},
			getItemQuantitySet: function (item_id) {
				const selected_line = this.model.get('lines').find(function (line) {
					return line.get('item').id === item_id;
				});

				return selected_line ? parseInt(selected_line.get('quantity'), 10) : 0;
			}
			, getContext: function getContext() {
				return {
					filteredData: this.filteredData,
					newItems: this.newItems
				};
			}
		});
	});
