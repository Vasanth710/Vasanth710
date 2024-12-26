// Model.js
// -----------------------
// @module Case
define("JJ.CheckoutPageUpdate.checkoutfields.SS2Model", ["Backbone", "Utils"], function(
    Backbone,
    Utils
) {
    "use strict";

    // @class Case.Fields.Model @extends Backbone.Model
    return Backbone.Model.extend({
        //@property {String} urlRoot
        idAttribute: 'id',
        urlRoot: Utils.getAbsoluteUrl(
            getExtensionAssetsPath(
                "Modules/checkoutfields/SuiteScript2/checkoutfields.Service.ss"
            ),
            true
        )
});
});
