define("JJ.registrationForm.registrationForm.Router"
    , [
        "Backbone",
        "JJ.registrationForm.registrationForm.View"
    ], function (
        Backbone,
        registrationFormView
    ) {
    'use strict';
    return Backbone.Router.extend({
        routes: {
            'lead-form': 'LeadCreate'
        }
        ,
        initialize: function (Application) {
            this.application = Application;
        },
        LeadCreate: function () {
            var view = new registrationFormView({ application: this.application });
            view.showContent();
        }
    });
});
