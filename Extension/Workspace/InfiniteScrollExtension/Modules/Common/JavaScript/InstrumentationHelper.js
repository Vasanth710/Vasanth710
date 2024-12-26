/// <amd-module name="SuiteCommerce.InfiniteScroll.Common.InstrumentationHelper"/>
define("SuiteCommerce.InfiniteScroll.Common.InstrumentationHelper", ["require", "exports", "SuiteCommerce.InfiniteScroll.Instrumentation"], function (require, exports, Instrumentation_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var QueueNameSuffix = '-InfiniteScroll';
    var ExtensionVersion = '1.1.4';
    var ComponentArea = 'SC Infinite Scroll';
    var InstrumentationHelper = /** @class */ (function () {
        function InstrumentationHelper() {
        }
        InstrumentationHelper.initializeInstrumentation = function (environment) {
            setInterval(InstrumentationHelper.logPageLoads, 60000);
            Instrumentation_1.default.initialize({
                environment: environment,
                queueNameSuffix: QueueNameSuffix,
                defaultParameters: {
                    componentArea: ComponentArea,
                    extensionVersion: ExtensionVersion,
                },
            });
        };
        InstrumentationHelper.addLoadTime = function (time) {
            InstrumentationHelper.pageLoadTimes.push(time);
        };
        InstrumentationHelper.logPageLoads = function () {
            var activity = 'Page loads per minute';
            var quantity = InstrumentationHelper.pageLoadTimes.length;
            if (quantity === 0)
                return;
            var totalTime = Math.ceil(InstrumentationHelper.pageLoadTimes.reduce(function (a, b) { return a + b; }) / quantity);
            InstrumentationHelper.pageLoadTimes = [];
            var log = Instrumentation_1.default.getLog('PageLoads');
            log.setParameters({
                activity: activity,
                quantity: quantity,
                totalTime: totalTime,
            });
            log.submit();
        };
        InstrumentationHelper.pageLoadTimes = [];
        return InstrumentationHelper;
    }());
    exports.InstrumentationHelper = InstrumentationHelper;
});
