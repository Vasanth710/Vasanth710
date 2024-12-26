/// <amd-module name="SuiteCommerce.InfiniteScroll.ControlView"/>
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define("SuiteCommerce.InfiniteScroll.ControlView", ["require", "exports", "Backbone", "SuiteCommerce.InfiniteScroll.ControlModel", "SuiteCommerce.InfiniteScroll.Pagination", "SuiteCommerce.InfiniteScroll.ItemsHandler", "SuiteCommerce.InfiniteScroll.InfiniteScroll", "SuiteCommerce.InfiniteScroll.Common.InstrumentationHelper"], function (require, exports, Backbone_1, ControlModel_1, Pagination_1, ItemsHandler_1, InfiniteScroll_1, InstrumentationHelper_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ControlView = /** @class */ (function (_super) {
        __extends(ControlView, _super);
        function ControlView(options) {
            var _this = _super.call(this, options) || this;
            _this.loadBelow = true;
            _this.events = {
                'click [data-action="load-pages"]': 'loadPage',
            };
            Pagination_1.default.reset();
            _this.model = new ControlModel_1.default({
                label: options.label,
                isActive: _this.hasMorePages(),
            });
            return _this;
        }
        ControlView.prototype.loadPage = function () {
            var _this = this;
            var pageNumber = this.getPageNumber();
            if (InfiniteScroll_1.default.isEnabled) {
                var startTime_1 = new Date().getTime();
                this.showSpinner();
                var pageURL = Pagination_1.default.getSearchApiUrl();
                var loadingPage = ItemsHandler_1.default.loadPage(pageURL, pageNumber, this.loadBelow);
                loadingPage
                    .then(function () {
                    if (_this.hasMorePages()) {
                        _this.showSpinner(false);
                    }
                    else {
                        _this.hideControl();
                    }
                    InstrumentationHelper_1.InstrumentationHelper.addLoadTime(new Date().getTime() - startTime_1);
                })
                    .fail(function () {
                    _this.undoPageChange();
                    _this.showSpinner(false);
                });
                return loadingPage;
            }
            else {
                return Pagination_1.default.setCurrentPage(pageNumber);
            }
        };
        ControlView.prototype.showSpinner = function (show) {
            if (show === void 0) { show = true; }
            this.model.isLoading = show;
            this.render();
        };
        ControlView.prototype.hideControl = function () {
            this.model.isActive = false;
            this.render();
        };
        ControlView.prototype.getContext = function () {
            return {
                label: this.model.label,
                showSpinner: this.model.isLoading,
                isActive: this.model.isActive,
            };
        };
        return ControlView;
    }(Backbone_1.View));
    exports.default = ControlView;
});
