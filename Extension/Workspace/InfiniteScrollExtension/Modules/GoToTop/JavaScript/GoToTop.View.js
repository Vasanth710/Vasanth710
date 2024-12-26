/// <amd-module name="SuiteCommerce.InfiniteScroll.GoToTop.View"/>
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
define("SuiteCommerce.InfiniteScroll.GoToTop.View", ["require", "exports", "Backbone", "infinite_scroll_gototop.tpl", "jQuery", "underscore"], function (require, exports, Backbone_1, template, jQuery, _) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SCROLL_OFFSET = 1500;
    var GoToTopView = /** @class */ (function (_super) {
        __extends(GoToTopView, _super);
        function GoToTopView() {
            var _this = _super.call(this) || this;
            _this.template = template;
            _this.events = {
                'click [data-action="scroll-to-top"]': 'scrollToTop',
            };
            jQuery(document).on('scroll.infiniteScroll', _.debounce(_this.updateVisibility, 500));
            jQuery(function () {
                jQuery('.infinite-scroll-top').css('display', 'none');
            });
            return _this;
        }
        GoToTopView.prototype.scrollToTop = function () {
            jQuery('html, body').animate({
                scrollTop: 0,
            }, 700);
            this.updateVisibility();
        };
        GoToTopView.prototype.updateVisibility = function () {
            var currentScroll = jQuery(document).scrollTop();
            if (currentScroll > SCROLL_OFFSET) {
                jQuery('.infinite-scroll-top').fadeIn('slow');
            }
            else {
                jQuery('.infinite-scroll-top').fadeOut('slow');
            }
        };
        return GoToTopView;
    }(Backbone_1.View));
    exports.GoToTopView = GoToTopView;
});
