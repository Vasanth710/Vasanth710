define("JJ.registrationForm.registrationForm.ServiceController"
  , ["ServiceController",
    'JJ.registrationForm.registrationForm'
  ], function (
    ServiceController,
    registrationFormModel

  ) {
  "use strict";
  return ServiceController.extend({
    name: "JJ.registrationForm.registrationForm.ServiceController",

    post: function post() {
      try {
        console.error('In@registrationFormServices: Forms', JSON.stringify(this.data));
        this.sendContent(registrationFormModel.CreateLead(this.data), { 'status': 201 });
      } catch (e) {
        console.error('error in registrationForm servicecontroller', e);
      }
    },
  });
});
