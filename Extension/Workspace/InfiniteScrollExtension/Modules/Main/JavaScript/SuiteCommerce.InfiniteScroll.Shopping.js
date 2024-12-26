/// <amd-module name="SuiteCommerce.InfiniteScroll.Shopping"/>
define("SuiteCommerce.InfiniteScroll.Shopping", ["require", "exports", "SuiteCommerce.InfiniteScroll.InfiniteScroll", "SuiteCommerce.InfiniteScroll.Pagination", "SuiteCommerce.InfiniteScroll.ItemsHandler", "SuiteCommerce.InfiniteScroll.Configuration", "SuiteCommerce.InfiniteScroll.Common.InstrumentationHelper", "jQuery"], function (require, exports, InfiniteScroll_1, Pagination_1, ItemsHandler_1, Configuration_1, InstrumentationHelper_1, jQuery) {
    "use strict";
    return {
        mountToApp: function (container) {
            var environment = container.getComponent('Environment');
            var PLP = container.getComponent('PLP');
            var PDP = container.getComponent('PDP');
            PDP.on('afterShowContent', function () {
                jQuery(document).off('scroll.InfiniteScroll');
            });
            InstrumentationHelper_1.InstrumentationHelper.initializeInstrumentation(environment);
            Configuration_1.Configuration.environment = environment;
            this.initializeInfiniteScroll(PLP);
        },
        initializeInfiniteScroll: function (PLP) {
            PLP.on('beforeShowContent', function () {
                Pagination_1.default.initialize(PLP);
                InfiniteScroll_1.default.replacePagination(PLP);
            });
            PLP.on('afterShowContent', function () {
                InfiniteScroll_1.default.enable(PLP);
                if (ItemsHandler_1.default.initialize(PLP)) {
                    InfiniteScroll_1.default.updatePageURLOnScrollEvent();
                }
                else {
                    InfiniteScroll_1.default.disable(PLP);
                }
            });
        },
    };
});
