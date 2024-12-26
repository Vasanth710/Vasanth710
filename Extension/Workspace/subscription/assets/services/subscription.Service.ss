function service(request, response)
{
	'use strict';
	try
	{
		require('JJ.subscription.subscription.ServiceController').handle(request, response);
	}
	catch(ex)
	{
		console.log('JJ.subscription.subscription.ServiceController ', ex);
		var controller = require('ServiceController');
		controller.response = response;
		controller.request = request;
		controller.sendError(ex);
	}
}