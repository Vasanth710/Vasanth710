define("JJ.subscription.unsubscribe.ServiceController"
    , [
        "ServiceController",
        'JJ.subscription.subscription'
    ], function (
        ServiceController,
        subscription
    ) {
    "use strict";
    return ServiceController.extend({
        name: "JJ.subscription.unsubscribe.ServiceController",
        post: function post() {
            try {
                this.sendContent(subscription.unSubscribeSubscription(this.data), { 'status': 201 });
            }
            catch (e) {
                console.error("error in unsubscription.ServiceController", e);
            }
        }
    });
});