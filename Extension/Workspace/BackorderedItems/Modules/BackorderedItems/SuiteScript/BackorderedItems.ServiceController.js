define("BackorderedItems.ServiceController", ["ServiceController", 'JJ.BackorderedItems.BackorderedItems'], function (
  ServiceController, BackorderedItems
) {
  "use strict";

  return ServiceController.extend({
    name: "BackorderedItems.ServiceController",
    options: {
      common: {}
    },

    get: function get() {
      try {
        var page = this.request.getParameter('page') || "";
        var data = { "page": page }
        this.sendContent(BackorderedItems.getItems(data), { 'status': 201 });
      } catch (error) {
        console.error('errorerror', error)
      }
    }
  });
});

