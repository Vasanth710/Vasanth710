define("JJ.subscription.subscription.Model"
    , [
        "Backbone",
        "Utils"
    ]
    , function (
        Backbone,
        Utils
    ) {
        "use strict";
        return Backbone.Model.extend({
            urlRoot: Utils.getAbsoluteUrl(
                getExtensionAssetsPath(
                    "services/subscription.Service.ss"
                )
            )
        });
    });
