define("JJ.AccountCustomization.AccCustomization.ServiceController", ["ServiceController", "JJ.AccountCustomization.AccCustomization"], function (
  ServiceController, AccountCustomization
) {
  "use strict";

  return ServiceController.extend({
    name: "JJ.AccountCustomization.AccCustomization.ServiceController",
    options: {
      common: {}
    },

    get: function get() {
      try {
        var salesOrderId = this.request.getParameter('salesOrder');
        var updates = this.request.getParameter('update');
        result = AccountCustomization.updateRecord({ salesOrderId: salesOrderId, updates: updates })
        return result
      } catch (e) {
        console.warn('Service.ss::' + e.name, e);
        this.sendError(e);
      }
    },

  });
});
