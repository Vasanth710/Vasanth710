// Model.js
// -----------------------
// @module Case
define("JJ.LoginCustomization.LoginCustom.SS2Model", ["Backbone", "Utils"], function(
    Backbone,
    Utils
) {
    "use strict";

    // @class Case.Fields.Model @extends Backbone.Model
    return Backbone.Model.extend({
        //@property {String} urlRoot
        urlRoot: Utils.getAbsoluteUrl(
            getExtensionAssetsPath(
                "Modules/LoginCustom/SuiteScript2/LoginCustom.Service.ss"
            ),
            true
        )
});
});
