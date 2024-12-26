
function service(request, response)
{
	'use strict';
	try 
	{
		require('UserName.ServiceController').handle(request, response);
	} 
	catch(ex)
	{
		console.log('UserName.ServiceController ', ex);
		var controller = require('ServiceController');
		controller.response = response;
		controller.request = request;
		controller.sendError(ex);
	}
}