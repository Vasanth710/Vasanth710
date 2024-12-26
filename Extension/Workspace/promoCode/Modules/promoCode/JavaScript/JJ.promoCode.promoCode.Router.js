define(
    'JJ.promoCode.promoCode.Router', [
    'JJ.promoCode.promoCode.View', 'Backbone'
],
    function (
        promoCodeView, Backbone
    ) {
        'use strict';
        return Backbone.Router.extend({
            routes: {
                'promocode': 'PromoCode',
            },
            initialize: function (application) {
                this.application = application;
            },
            //PromoCodeRouter is used for creating new page for Referral Link.
            PromoCode: function () {
                var view = new promoCodeView({
                    application: this.application
                })
                view.showContent();
            }
        });
    }
);
