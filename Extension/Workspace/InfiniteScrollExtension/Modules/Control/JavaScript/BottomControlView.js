/// <amd-module name="SuiteCommerce.InfiniteScroll.BottomControlView"/>
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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
define("SuiteCommerce.InfiniteScroll.BottomControlView", ["require", "exports", "SuiteCommerce.InfiniteScroll.ControlView", "infinitescroll_button_bottom.tpl", "SuiteCommerce.InfiniteScroll.Pagination", "SuiteCommerce.InfiniteScroll.ControlConfiguration", "jQuery", "underscore", "SuiteCommerce.InfiniteScroll.InfiniteScroll"], function (require, exports, ControlView_1, template, Pagination_1, Control_Configuration_1, jQuery, _, InfiniteScroll_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BottomControlView = /** @class */ (function (_super) {
        __extends(BottomControlView, _super);
        function BottomControlView() {
            var _this = _super.call(this, {
                label: Control_Configuration_1.default.getBottomControlLabel(),
            }) || this;
            _this.template = template;
            _this.visible = true;
            _this.hideIfAutoScroll();
            InfiniteScroll_1.default.bottomControl = _this;
            return _this;
        }
        BottomControlView.prototype.hideIfAutoScroll = function () {
            if (Control_Configuration_1.default.isAutoScrollEnabled() && this.model.isActive) {
                this.visible = false;
                this.setAutoScroll();
            }
        };
        BottomControlView.prototype.getPageNumber = function () {
            return Pagination_1.default.getNextPageNumber();
        };
        BottomControlView.prototype.hasMorePages = function () {
            return Pagination_1.default.hasMorePagesBelow;
        };
        BottomControlView.prototype.setAutoScroll = function () {
            var _this = this;
            var autoScroll = function () {
                if (_this.isVisible()) {
                    jQuery(document).off('scroll.InfiniteScrollAutoScroll');
                    _this.loadPage()
                        .then(function () {
                        if (Pagination_1.default.hasMorePagesBelow) {
                            jQuery(document).on('scroll.InfiniteScrollAutoScroll', _.throttle(autoScroll, 500));
                        }
                    })
                        .fail(function () {
                        if (Pagination_1.default.hasMorePagesBelow) {
                            jQuery(document).on('scroll.InfiniteScrollAutoScroll', _.throttle(autoScroll, 500));
                        }
                    });
                }
            };
            jQuery(document).off('scroll.InfiniteScrollAutoScroll');
            jQuery(document).on('scroll.InfiniteScrollAutoScroll', _.throttle(autoScroll, 500));
        };
        BottomControlView.prototype.isVisible = function () {
            var viewportHeight = jQuery(window).height();
            var distanceScrolled = jQuery(window).scrollTop();
            var control = jQuery('.infinite-scroll-ctrl-bottom');
            if (control.length == 0) {
                return false;
            }
            var controlPosition = control.offset().top;
            return controlPosition < viewportHeight + distanceScrolled;
        };
        BottomControlView.prototype.undoPageChange = function () {
            Pagination_1.default.restoreNextPage();
        };
        BottomControlView.prototype.getContext = function () {
            return __assign(__assign({}, _super.prototype.getContext.call(this)), { visible: this.visible });
        };
        return BottomControlView;
    }(ControlView_1.default));
    exports.default = BottomControlView;
});
