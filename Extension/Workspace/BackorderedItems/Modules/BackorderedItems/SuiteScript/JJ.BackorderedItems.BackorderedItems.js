define('JJ.BackorderedItems.BackorderedItems'
	, [
		'BackorderedItems.ServiceController', 'SC.Model', 'Configuration', 'Application'
	]
	, function (
		BackOrderDetailServiceController, SCModel, Configuration, Application
	) {
		'use strict';

		return SCModel.extend({

			getItems: function (data) {
				try {
					var customerId = nlapiGetUser();
					var filter = [
						["formulanumeric: {quantity}-nvl({quantityshiprecv},0)-nvl({quantitycommitted},0)", "greaterthan", "0"],
						"AND",
						["type", "anyof", "SalesOrd"],
						"AND",
						["customer.internalidnumber", "equalto", customerId],
						"AND",
						["status", "anyof", "SalesOrd:D", "SalesOrd:A", "SalesOrd:F", "SalesOrd:E", "SalesOrd:B"],
						"AND",
						["mainline", "is", "F"],
						"AND",
						["item.quantitybackordered", "greaterthan", "0"],
						"AND",
						["item.isonline", "is", "T"],
					];
					var columns = [

						new nlobjSearchColumn("itemid", "item", "GROUP"),
						new nlobjSearchColumn("internalid", "item", "GROUP"),
						new nlobjSearchColumn("storedisplayname", "item", "GROUP"),
						new nlobjSearchColumn("baseprice", "item", "GROUP"),
						new nlobjSearchColumn("manufacturer", "item", "GROUP"),
						new nlobjSearchColumn("formulanumeric", null, "GROUP").setFormula("{quantity}-{quantitypicked}"),
						new nlobjSearchColumn("formulatext", null, "GROUP").setFormula("{item.itemid}"),
					]
					var salesorderSearch = Application.getPaginatedSearchResults({
						results_per_page: 10,
						columns: _.values(columns),
						filters: filter,
						record_type: 'salesorder',
						page: data.page || 1,
					});
					nlapiLogExecution("ERROR", 'data', JSON.stringify(salesorderSearch.records));

					if (salesorderSearch.records) {
						var self = this;
						var items = [];
						var itemImage;
						var resultArray = [];
						var Environment = Application.getEnvironment(request);
						_.map(salesorderSearch.records, function mapRecord(result) {
							var itemid = result.getValue("internalid", "item", "GROUP");
							var type = nlapiLookupField('item', itemid, 'recordType');
							items.push(itemid);
							if (salesorderSearch) {
								var resultObject = {};
								itemImage = self.getItemImage(itemid, type);
								resultObject.sku = result.getValue("formulatext", null, "GROUP")
								resultObject.itemid = result.getValue("itemid", "item", "GROUP");
								resultObject.manufacturer = result.getValue("manufacturer", "item", "GROUP");
								resultObject.displayname = result.getValue("storedisplayname", "item", "GROUP");
								resultObject.Configuration = Configuration.get()
								resultObject.Environment = Environment
								resultObject.itemImage = itemImage;
								resultObject.internalid = result.getValue("internalid", "item", "GROUP");
								resultObject.backordered = result.getValue("formulanumeric", null, "GROUP");
								resultArray.push(resultObject)
								return resultArray;
							}
							nlapiLogExecution("ERROR", 'resultArray', JSON.stringify(resultArray));
						})
						salesorderSearch.records = resultArray
						return salesorderSearch
					}
				} catch (error) {

					return {
						code: "500",
						message: "error"
					};
				}

			},

			getItemImage: function (itemId, recordType) {
				try {
					var itemImage = null;
					var itemRecord = nlapiLoadRecord(recordType, itemId);
					var lineItemCount = itemRecord.getLineItemCount('itemimages');
					for (var i = 0; i <= lineItemCount; i++) {
						itemImage = itemRecord.getLineItemValue('itemimages', 'name', i);
					}
					if (itemImage === null) {
						itemImage = 'img/no_image_available.jpeg';
					} else {
						itemImage = "/SSP Applications/NetSuite Inc. - SCS/SuiteCommerce Standard/img/Item Image/" + itemImage
					}
					nlapiLogExecution("ERROR", 'itemImage', itemImage);

					return itemImage;
				} catch (error) {

					return {
						code: "500",
						message: "item image Error"
					};
				}
			}
		});
	});
