define("JJ.subscription.unsubscribe.Model"
    , [
        "Backbone",
        "Utils"
    ], function (
        Backbone,
        Utils,
    ) {
    "use strict";
    return Backbone.Model.extend({
        urlRoot: Utils.getAbsoluteUrl(
            getExtensionAssetsPath(
                "services/unsubscribe.Service.ss"
            )
        )
    });
});

