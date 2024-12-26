// Model.js
// -----------------------
// @module Case
define("JJ.Favourites.Favourites.Collection", ["Backbone", "Utils", "JJ.Favourites.Favourites.SS2Model"], function (
    Backbone,
    Utils,
    favmodel
) {
    "use strict";

    return Backbone.Model.extend({
        model: favmodel,
        urlRoot: Utils.getAbsoluteUrl(
            getExtensionAssetsPath(
                "Modules/Favourites/SuiteScript2/Favourites.Service.ss"
            ),
            true
        ),
        parse: function (response) {
            return response;
        }
    });
});
