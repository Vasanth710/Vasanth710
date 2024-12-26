/// <amd-module name="SuiteCommerce.InfiniteScroll.ControlConfiguration"/>
define("SuiteCommerce.InfiniteScroll.ControlConfiguration", ["require", "exports", "SuiteCommerce.InfiniteScroll.Configuration"], function (require, exports, Configuration_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        getBottomControlLabel: function () {
            return Configuration_1.Configuration.get('infiniteScroll.nextBtnText');
        },
        getTopControlLabel: function () {
            return Configuration_1.Configuration.get('infiniteScroll.prevBtnText');
        },
        isAutoScrollEnabled: function () {
            return Configuration_1.Configuration.get('infiniteScroll.enableAutoScroll');
        },
    };
});
