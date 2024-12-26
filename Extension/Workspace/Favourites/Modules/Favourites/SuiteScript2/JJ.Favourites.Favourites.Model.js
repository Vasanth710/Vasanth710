/**
* @NApiVersion 2.x
* JJ.Favourites.Favourites.Model.js
*/
define([
    'N/search',
    'N/runtime',
    'N/record'
], function FavouritesModel(
    search,
    Runtime,
    record
) {
    var methodNotAllowedError = {
        status: 405,
        code: 'INVALID_ID',
        message: 'Sorry, you are not allowed to perform this action.'
    };
    var config = {
        record: 'customrecord_favourites',
        fields: {
            internalid: 'internalid',
            customers: 'custrecord_fav_customer',
            item: 'custrecord_fav_item'
        }
    };
    try {
        log.error("Inside list 1", 1);
        var list = function list(options) {
            log.error("Inside list", 1);
            var parsedFav = [];
            var itemIds = [];
            var pageIndex = options.pageIndex ? options.pageIndex : 0;
            var currentUser = Runtime.getCurrentUser();
            var favSearchObj = search.create({
                type: config.record,
                filters:
                    [{
                        name: 'isinactive',
                        operator: 'is',
                        values: 'F'
                    }, {
                        name: config.fields.customers,
                        operator: 'is',
                        values: currentUser.id
                    }],
                columns:
                    [
                        config.fields.internalid,
                        config.fields.customers,
                        config.fields.item
                    ],
            });
            var searchResultCount = favSearchObj.runPaged().count;
            favSearchObj.run().each(function (result) {
                var itemid = result.getValue({ name: config.fields.item });
                itemIds.push(itemid)
                return true;
            });

            var resultPerPage = options.resultPerPage || 2

            var searchObj = favSearchObj.run();
            var favResultSet = searchObj.getRange({
                start: parseInt(pageIndex) * resultPerPage,
                end: (parseInt(pageIndex) + 1) * resultPerPage
            });
            favResultSet.map(function (result) {
                var itemid = result.getValue({ name: config.fields.item });
                parsedFav.push({
                    recid: result.getValue({ name: config.fields.internalid }),
                    customers: result.getValue({ name: config.fields.customers }),
                    itemid: itemid,
                });
                return true;
            });
            return {
                parsedFav: parsedFav,
                searchResultCount: searchResultCount,
                itemIds: itemIds
            };
        };
    } catch (error) {
        log.debugg(error);
    }
    var create = function create(itemID) {
        log.error("Inside create", 1);
        var currentUser;
        var newFav;
        var newFavId = 0;
        var newCount;

        try {
            newCount = searchItem(itemID);
            if (newCount == 0) {
                currentUser = Runtime.getCurrentUser();
                var newFav;
                newFav = record.create({
                    type: config.record,
                    isDynamic: true
                });

                newFav.setValue({ fieldId: config.fields.customers, value: currentUser.id });
                newFav.setValue({ fieldId: config.fields.item, value: itemID });

                newFavId = newFav.save({
                    ignoreMandatoryFields: true
                });
                newCount = searchItem(itemID);
            }
            return newCount;
        } catch (e) {
            return methodNotAllowedError;
        }

        return newCount;
    };

    function deleteRecord(searchArr) {
        log.error("Inside deleteRecord", 1);
        try {
            searchArr = JSON.parse(searchArr);
            log.error("searchArr123", searchArr);
            if (searchArr.length > 0) {
                for (var index = 0; index < searchArr.length; index++) {
                    log.error("searchArr", searchArr[index]);
                    record.delete({
                        type: "customrecord_favourites",
                        id: searchArr[index],
                    });
                }
            }
            return true;
        } catch (error) {
            log.error("@fn deleteRemove", error);
        }

    }
    function searchItem(itemID) {
        try {
            log.error("Inside searchItem Record", 1);
            var currentUser = Runtime.getCurrentUser();
            var FavSearch = search.create({
                type: "customrecord_favourites",
                filters:
                    [
                        ["custrecord_fav_item", "anyof", [itemID]],
                        "AND",
                        ["isinactive", "is", "F"],
                        "AND",
                        ["custrecord_fav_customer", "anyof", currentUser.id]
                    ],
                columns:
                    [
                        search.createColumn({ name: "custrecord_fav_customer", label: "Customer " }),
                        search.createColumn({ name: "custrecord_fav_item", label: "Favourite item" })
                    ]
            });
            var searchResultCount = FavSearch.runPaged().count;
            log.error("FavSearch result count", searchResultCount);

            return searchResultCount;
        } catch (error) {
            log.error("@fn deleteRemove", error);
        }

    }
    function deleteFavItem(itemID) {
        try {
            log.error("Inside deleteFavItem", 1);
            var currentUser = Runtime.getCurrentUser();
            var FavSearch = search.create({
                type: "customrecord_favourites",
                filters:
                    [
                        ["custrecord_fav_item", "anyof", [itemID]],
                        "AND",
                        ["isinactive", "is", "F"],
                        "AND",
                        ["custrecord_fav_customer", "anyof", currentUser.id]
                    ],
                columns:
                    [
                        search.createColumn({ name: "custrecord_fav_customer", label: "Customer " }),
                        search.createColumn({ name: "custrecord_fav_item", label: "Favourite Item" }),
                        search.createColumn({ name: "internalid", label: "Internal ID" })
                    ]
            });
            var searchResultCount = FavSearch.runPaged().count;
            log.error("FavDelete result count", searchResultCount);
            if (searchResultCount > 0) {
                FavSearch.run().each(function (result) {
                    var recid = result.getValue({ name: "internalid" });
                    record.delete({
                        type: "customrecord_favourites",
                        id: recid,
                    });
                    return true;
                });
            }
            return true;
        } catch (error) {
            log.error("@fn deleteRemove", error);
        }

    }

    return {
        list: list,
        deleteRecord: deleteRecord,
        searchItem: searchItem,
        create: create,
        deleteFavItem: deleteFavItem
    };
});
