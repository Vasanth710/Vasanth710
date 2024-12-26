define("UserName.ServiceController", ["ServiceController", "JJ.UserName.UserName"], function (
  ServiceController, UserName
) {
  "use strict";

  return ServiceController.extend({
    name: "UserName.ServiceController",

    get: function get() {
      try {
        var result = UserName.getContactDetails(); 
        var value = JSON.stringify(result);
        return value;
      } catch (e) {
        nlapiLogExecution('ERROR', 'error in getUser ServiceController', JSON.stringify(e));
        throw e;
      }
    }
  });
});
