// Model.js
// -----------------------
// @module Case
define("JJ.Favourites.Favourites.SS2Model", ["Backbone", "Utils"], function (
    Backbone,
    Utils
) {
    "use strict";

    // @class Case.Fields.Model @extends Backbone.Model
    return Backbone.Model.extend({
        //@property {String} urlRoot
        urlRoot: Utils.getAbsoluteUrl(
            getExtensionAssetsPath(
                "Modules/Favourites/SuiteScript2/Favourites.Service.ss"
            ),
            true
        )
        , parse: function (response) {
            return response;
        }
    });
});
