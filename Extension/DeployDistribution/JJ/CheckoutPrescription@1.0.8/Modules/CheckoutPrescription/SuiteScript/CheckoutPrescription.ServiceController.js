define("CheckoutPrescription.ServiceController", ["ServiceController", "JJ.CheckoutPrescription.CheckoutPrescription"], function (
  ServiceController, CheckoutPrescription
) {
  "use strict";

  return ServiceController.extend({
    name: "CheckoutPrescription.ServiceController",

    // The values in this object are the validation needed for the current service.
    options: {
      common: {}
    },

    post: function post() {
      nlapiLogExecution("ERROR", "inside service controller post");
      try {
        nlapiLogExecution("ERROR", "inside service controller post");
        this.data = this.request.getBody() ? JSON.parse(this.request.getBody()).data : JSON.parse('{}');
        nlapiLogExecution("DEBUG", "Response", this.data)
        return CheckoutPrescription.uploadPrescription(this.data);

      }
      catch (e) {
        return JSON.stringify({
          success: false, message: "Error"
        })
      }

    },
  });
});