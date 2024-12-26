// JJ.AccountCustomization.AccCustomization.js
// Load all your starter dependencies in backend for your extension here
// ----------------

define('JJ.AccountCustomization.AccCustomization'
	, [
		'JJ.AccountCustomization.AccCustomization.ServiceController',
		'SC.Model'
	]
	, function (
		AccCustomizationServiceController,
		SCModel
	) {
		'use strict';
		return SCModel.extend({
			updateRecord: function (data) {
				try {
					var salesOrderId = data.salesOrderId;
					var changes = JSON.parse(data.updates);
					var salesOrder = nlapiLoadRecord('salesorder', salesOrderId);

					for (var i = 0; i < changes.length; i++) {
						var change = changes[i];
						if (change.newLine) {
							salesOrder.selectNewLineItem('item');
							salesOrder.setCurrentLineItemValue('item', 'item', change.itemID);
							salesOrder.setCurrentLineItemValue('item', 'quantity', change.quantity);
							salesOrder.commitLineItem('item');
						}

						if (change.removeItem) {
							var lineIndexToUpdate = salesOrder.findLineItemValue('item', 'line', JSON.stringify(change.lineIndex));
							if (lineIndexToUpdate != -1) {
								salesOrder.removeLineItem('item', lineIndexToUpdate);
								nlapiLogExecution("ERROR", "change - removeItem", JSON.stringify(salesOrder));
							}
						}

						if (change.updated) {
							var lineIndexToUpdate = salesOrder.findLineItemValue('item', 'line', JSON.stringify(change.lineIndex));
							if (lineIndexToUpdate != -1) {
								salesOrder.setLineItemValue('item', 'quantity', lineIndexToUpdate, change.quantity);
								var currentDate = new Date();
								var formattedDate = nlapiDateToString(currentDate);
								salesOrder.setLineItemValue('item', 'requesteddate', lineIndexToUpdate, formattedDate);
							}
						}
					}

					var updatedSalesOrderId = nlapiSubmitRecord(salesOrder, false, true);
					return updatedSalesOrderId
				} catch (error) {
					return error
				}
			}
		})
	});