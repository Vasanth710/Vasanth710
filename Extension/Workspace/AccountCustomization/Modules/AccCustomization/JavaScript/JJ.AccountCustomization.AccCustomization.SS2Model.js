// Model.js
// -----------------------
// @module Case
define("JJ.AccountCustomization.AccCustomization.SS2Model", ["Backbone", "Utils"], function (
    Backbone,
    Utils
) {
    "use strict";

    // @class Case.Fields.Model @extends Backbone.Model
    return Backbone.Model.extend({
        //@property {String} urlRoot
        urlRoot: Utils.getAbsoluteUrl(
            getExtensionAssetsPath(
                "Modules/AccCustomization/SuiteScript2/AccCustomization.Service.ss"
            ),
            true
        )
    });
});
