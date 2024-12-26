define("JJ.CheckoutPrescription.CheckoutPrescription.Model"
    , [
        "Backbone",
        "Utils"
    ],
    function (
        Backbone,
        Utils
    ) {
        "use strict";
        return Backbone.Model.extend({
            urlRoot: Utils.getAbsoluteUrl(
                getExtensionAssetsPath(
                    "services/CheckoutPrescription.Service.ss"
                )
            )
        });
    });