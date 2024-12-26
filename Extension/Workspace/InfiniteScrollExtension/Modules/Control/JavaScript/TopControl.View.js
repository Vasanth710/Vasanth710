/// <amd-module name="SuiteCommerce.InfiniteScroll.TopControlView"/>
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
define("SuiteCommerce.InfiniteScroll.TopControlView", ["require", "exports", "SuiteCommerce.InfiniteScroll.ControlView", "infinitescroll_button_top.tpl", "SuiteCommerce.InfiniteScroll.Pagination", "SuiteCommerce.InfiniteScroll.ControlConfiguration"], function (require, exports, ControlView_1, template, Pagination_1, Control_Configuration_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TopControlView = /** @class */ (function (_super) {
        __extends(TopControlView, _super);
        function TopControlView() {
            var _this = _super.call(this, {
                label: Control_Configuration_1.default.getTopControlLabel(),
            }) || this;
            _this.loadBelow = false;
            _this.template = template;
            return _this;
        }
        TopControlView.prototype.getPageNumber = function () {
            return Pagination_1.default.getPreviousPageNumber();
        };
        TopControlView.prototype.hasMorePages = function () {
            return Pagination_1.default.hasMorePagesAbove;
        };
        TopControlView.prototype.undoPageChange = function () {
            Pagination_1.default.restorePreviousPage();
        };
        return TopControlView;
    }(ControlView_1.default));
    exports.default = TopControlView;
});
