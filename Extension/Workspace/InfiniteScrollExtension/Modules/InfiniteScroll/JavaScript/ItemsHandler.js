/// <amd-module name="SuiteCommerce.InfiniteScroll.ItemsHandler"/>
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
define("SuiteCommerce.InfiniteScroll.ItemsHandler", ["require", "exports", "SuiteCommerce.InfiniteScroll.Pagination", "SuiteCommerce.InfiniteScroll.InfiniteScroll"], function (require, exports, Pagination_1, InfiniteScroll_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var facetsItems;
    var collection;
    exports.default = {
        initialize: function (PLP) {
            var facetsItems;
            // @ts-ignore
            if (PLP.current_view) {
                // @ts-ignore
                facetsItems = PLP.current_view.getChildViewInstance('Facets.Items');
            }
            if (!facetsItems ||
                (!facetsItems.collection.fetch && !facetsItems.collection[0]) ||
                (!!facetsItems.collection.fetch && !facetsItems.collection.models[0]))
                return false;
            if (!facetsItems.collection.fetch) {
                facetsItems.collection = facetsItems.collection[0].collection;
            }
            this.collection = facetsItems.collection;
            this.facetsItems = facetsItems;
            Pagination_1.default.addFirstItemOfPage("" + this.collection.models[0].get('internalid'), Pagination_1.default.currentPage);
            return true;
        },
        loadPage: function (searchApiUrl, pageNumber, loadBelow) {
            var _this = this;
            if (!searchApiUrl) {
                return jQuery.Deferred().reject();
            }
            this.collection.url = function () { return searchApiUrl; };
            var oldItems = __spreadArrays(this.collection.models);
            return this.collection.fetch().then(function () {
                Pagination_1.default.addFirstItemOfPage("" + _this.collection.models[0].get('internalid'), pageNumber);
                if (loadBelow) {
                    _this.facetsItems.collection.add(oldItems, { at: 0 });
                }
                else {
                    _this.facetsItems.collection.add(oldItems);
                }
                _this.renderContent(pageNumber, loadBelow);
            });
        },
        renderContent: function (pageNumber, loadBelow) {
            var $itemsContainer = jQuery('.facets-facet-browse-items');
            $itemsContainer.css('min-height', $itemsContainer.height());
            if (!loadBelow) {
                var append = this.facetsItems.$el.append;
                this.facetsItems.$el.append = this.facetsItems.$el.prepend;
                this.facetsItems.render();
                InfiniteScroll_1.default.updatePageURL();
                this.facetsItems.$el.append = append;
            }
            else {
                this.facetsItems.render();
            }
            $itemsContainer.css('min-height', '');
            // Trigger the event after rendering content
            Backbone.Events.trigger('infiniteScroll:renderContentComplete');
        },
    };
});