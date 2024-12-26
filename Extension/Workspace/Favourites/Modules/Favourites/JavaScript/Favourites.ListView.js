// @module JJ.Favourites.Favourites
define('JJ.Favourites.List.View',
    [
        'jj_favourites_favourites_list.tpl',
        'Item.Model',
        'AjaxRequestsKiller',
        "ProductViews.Price.View",
        "Utils",
        "ProductLine.Stock.View",
        "SCModel",
    ]
    , function (
        template,
        ProductModel,
        AjaxRequestsKiller,
        ProductViews,
        Utils,
        ProductLineStockView
        , SCModel,
    ) {
        'use strict';

        // @class JJ.Favourites.Favourites.View @extends Backbone.View
        return Backbone.View.extend({

            template: template,
            initialize: function (options) {
                var self = this;
                this.itemModel = new ProductModel();
                self.searchItemModel = new SCModel.SCModel();
                self.qty = 0;
                self.qtyItem = this.itemModel;
                this.loadItem(JSON.parse(self.model.get("item")));
                this.itemModel.on('sync', this.render, this);
                this.events = this.extendEvents();
            },
            extendEvents: function () {
                var self = this;
                return _.extend(self.events, {
                    'click [data-action="increase"]': 'increaseQuantity',
                    'click [data-action="decrease"]': 'decreaseQuantity',
                    'keydown #fav-qty': 'debouncedValidation',
                    'change .single-item': "toggleActive",
                });
            },

            getCheckedDataFavValues: function getCheckedDataFavValues() {
                return $('input[type="checkbox"].single-item:checked').map(function () {
                    var dataFavValue = $(this).data('fav');
                    var quantity = $(this).closest('.backbone-collection-view-row').find('#fav-qty').val();
                    return { quantity: quantity, item: { internalid: dataFavValue } };
                }).get();
            },
            getCheckedRecords: function getCheckedRecords() {
                return $('input[type="checkbox"].single-item:checked').map(function () {
                    var dataRecord = $(this).data('record');
                    return dataRecord;
                }).get();
            },

            toggleActive: function toggleActive(e) {
                var e = $(e.currentTarget);
                e.closest(".backbone-collection-view-cell-span12").toggleClass("activeFav");
                var result = this.getCheckedDataFavValues();
                var records = this.getCheckedRecords();
                // this.parentView.parentView.model.set("remItems", records);
                if (_.isEmpty(result)) {
                    $('.remove-fav-items, .add-fav-items').prop('disabled', true);
                    $('.remove-fav-items, .add-fav-items').addClass("button-disabled");
                } else {
                    $('.remove-fav-items, .add-fav-items').prop('disabled', false);
                    $('.remove-fav-items, .add-fav-items').removeClass("button-disabled");
                }
            },
            debouncedValidation: _.debounce(function (e) {
                this.updateQty(e);
            }, 1000),

            updateQty: function updateQty(e) {
                var e = $(e.currentTarget);
                var self = this;
                var data = e.val();
                if (data < 1) {
                    self.qty = 1;
                    e.val(1);
                }
            },

            increaseQuantity: function increaseQuantity(e) {
                var self = this;
                var e = $(e.currentTarget);
                e.parent().find('#fav-qty').val(++self.qty);
            }
            ,
            decreaseQuantity: function decreaseQuantity(e) {
                var self = this;
                var e = $(e.currentTarget);
                if (self.qty <= 1) {
                    return false;
                }
                e.parent().find('#fav-qty').val(--self.qty);
            },

            loadItem: function (itemId) {
                var item = this.itemModel;
                var self = this
                    , promise = jQuery.Deferred();
                var promise = item.fetch({
                    data: {
                        id: itemId
                    }
                    , killerId: AjaxRequestsKiller.getKillerId()
                }).fail(function () {
                    console.error();
                }).done(function (result) {
                    self.qtyItem = self.itemModel;
                    self.qtyItem.set("item", self.itemModel);
                });
                return promise;
            },
            childViews: {
                'Item.Price': function () {
                    var self = this;
                    if (this.itemModel) {
                        return new ProductViews({
                            model: self.itemModel,
                            showComparePrice: true
                        });
                    }

                },

                'ItemViews.Stock': function () {
                    var self = this;
                    if (this.itemModel) {
                        return new ProductLineStockView({
                            model: self.itemModel,
                            page: "ProductList"
                        });
                    }
                },
            }
            //@method getContext @return JJ.Favourites.Favourites.View.Context
            , getContext: function getContext() {
                var self = this;
                var urlComponent = self.itemModel.attributes.urlcomponent;
                urlComponent = _.isEmpty(urlComponent) ? "/product/" + self.itemModel.attributes.internalid : "/" + urlComponent;
                var noImage = Utils.getThemeAbsoluteUrlOfNonManagedResources(
                    'img/no_image_available.jpeg',
                    SC.CONFIGURATION.get('imageNotAvailable'));
                // var imageUrl = this.itemModel.attributes.custitem_large_item_00;
                console.log('itemImage', this.itemModel)
                let itemImage = this.itemModel._keyMapping._thumbnail(this.itemModel) ? this.itemModel._keyMapping._thumbnail(this.itemModel).url : noImage;
                return {
                    item: this.itemModel.attributes,
                    recId: this.model.get("recordId"),
                    urlComponent: urlComponent,
                    imageUrl: itemImage
                };
            }
        });
    });
