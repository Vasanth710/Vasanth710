define("JJ.subscription.subscription.ServiceController"
  , [
    "ServiceController",
    'JJ.subscription.subscription'
  ], function (
    ServiceController,
    subscription
  ) {
  "use strict";
  return ServiceController.extend({
    name: "JJ.subscription.subscription.ServiceController",

    get: function get() {
      var subscriptionData = this.request.getParameter('data');
      return subscription.searchSubscription(subscriptionData);
    },

    post: function post() {
      try {
        this.sendContent(subscription.createSubscriptionRecord(this.data), { 'status': 201 });
      }
      catch (e) {
        console.error("error in subscription.ServiceController", e);
      }
    }
  });
});