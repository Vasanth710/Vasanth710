
function service(request, response) {
	'use strict';
	try {
		require('BackorderedItems.ServiceController').handle(request, response);
	}
	catch (ex) {
		console.log('BackorderedItems.ServiceController ', ex);
		var controller = require('ServiceController');
		controller.response = response;
		controller.request = request;
		controller.sendError(ex);
	}
}