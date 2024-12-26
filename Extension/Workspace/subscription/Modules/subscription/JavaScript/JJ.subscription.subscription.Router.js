define(
    'JJ.subscription.subscription.Router'
    , [
        'JJ.subscription.subscription.View',
        'Backbone'
    ],
    function (
        subscriptionView,
        Backbone
    ) {
        'use strict';
        return Backbone.Router.extend({
            routes: {
                'subscription': 'Subscription',
            },
            initialize: function (application) {
                this.application = application;
            },
            Subscription: function () {
                var view = new subscriptionView({ application: this.application })
                view.showContent();
            }
        });
    }
);