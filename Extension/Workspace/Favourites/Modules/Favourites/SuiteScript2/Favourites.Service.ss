/**
* @NApiVersion 2.x
* @NModuleScope Public
*/
define([
	'./JJ.Favourites.Favourites.Model.js'
], function FavService(
	FavModel
) {
	"use strict";
	var methodNotAllowedError = {
		status: 405,
		code: 'ERR_METHOD_NOT_ALLOWED',
		message: 'Sorry, you are not allowed to perform this action.'
	};
	return {
		service: function (ctx) {
             log.error("Favourites.Service.ss",1);
			var method = ctx.request.method;
			var favList;
			var response = {};
			var action;
			var condition = false;
			var PDPCondition = false;
			var create = false;
			var recordId;
			var itemID;
			var itemInternalId;
			var plpCondition;
			try {
                log.error('ctx.request.parameters ',ctx.request.parameters);
				if (ctx.request.parameters && ctx.request.parameters.recId) {
					condition = true;
					recordId = ctx.request.parameters.recId;
				}
				if (ctx.request.parameters && ctx.request.parameters.itemID) {
					PDPCondition = true;
					itemID = ctx.request.parameters.itemID;
				}
				if (ctx.request.parameters && ctx.request.parameters.addItem) {
					create = true;
					itemID = ctx.request.parameters.addItem;
				}
				if (ctx.request.parameters && ctx.request.parameters.itemInternalId) {
					plpCondition = true;
					itemInternalId = ctx.request.parameters.itemInternalId;
				}
				switch (method) {
					case 'GET':
						if (PDPCondition) {
							log.error('PDPCondition :>> ', "PDPCondition");
							favList = FavModel.searchItem(itemID);
							response = favList;
						}
						else if (condition) {
							log.error('recordId :>> ', recordId);
							response = FavModel.deleteRecord(recordId);
						}
						else if (plpCondition) {
							log.error('itemInternalId :>> ', itemInternalId);
							response = FavModel.deleteFavItem(itemInternalId);
						}
						else if (create) {
							log.error('itemID :>> ', itemID);
							response = FavModel.create(itemID);
						} else {
							log.error('Other :>> ', "Other");
							favList = FavModel.list(ctx.request.parameters);
                            log.error('favList :>> ',favList);
							response = favList;
						}
						break;

					default:
						response = methodNotAllowedError;
				}
			} catch (e) {
				log.error('There was an error in the Favs service', e.message);
			}

			ctx.response.write(JSON.stringify(response));
		}
	};
});
