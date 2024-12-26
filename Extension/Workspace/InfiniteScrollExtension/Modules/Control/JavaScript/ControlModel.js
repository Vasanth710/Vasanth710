/// <amd-module name="SuiteCommerce.InfiniteScroll.ControlModel"/>
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
define("SuiteCommerce.InfiniteScroll.ControlModel", ["require", "exports", "Backbone"], function (require, exports, Backbone_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ControlModel = /** @class */ (function (_super) {
        __extends(ControlModel, _super);
        function ControlModel(options) {
            var _this = _super.call(this, options) || this;
            _this.isLoading = false;
            _this.label = options.label;
            _this.isActive = options.isActive;
            return _this;
        }
        return ControlModel;
    }(Backbone_1.Model));
    exports.default = ControlModel;
});
