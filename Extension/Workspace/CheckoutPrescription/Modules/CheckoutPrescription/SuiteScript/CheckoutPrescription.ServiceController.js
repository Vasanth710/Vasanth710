define("CheckoutPrescription.ServiceController",
  [
    "ServiceController",
    "JJ.CheckoutPrescription.CheckoutPrescription"
  ],
  function (
    ServiceController,
    CheckoutPrescription
  ) {
    "use strict";

    return ServiceController.extend({
      name: "CheckoutPrescription.ServiceController",
      post: function () {
        try {
          var requestBody = this.request.getBody();
          if (!requestBody) {
            return JSON.stringify({
              success: false,
              message: "No data received for processing"
            });
          }
          var parsedData = JSON.parse(requestBody);
          if (!parsedData.files || !Array.isArray(parsedData.files) || parsedData.files.length === 0) {
            return JSON.stringify({
              success: false,
              message: "Invalid or missing files array"
            });
          }
          return CheckoutPrescription.uploadCheck(parsedData);
        } catch (error) {
          nlapiLogExecution("ERROR", "Error in Service Controller", error.toString());
          return JSON.stringify({
            success: false,
            message: "An error occurred while processing the request"
          });
        }
      }
    });
  });