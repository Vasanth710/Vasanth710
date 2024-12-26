
function service(request, response)
{
	'use strict';
	try 
	{
		require('JJ.LoginCustomization.LoginCustom.ServiceController').handle(request, response);
	} 
	catch(ex)
	{
		console.log('JJ.LoginCustomization.LoginCustom.ServiceController ', ex);
		var controller = require('ServiceController');
		controller.response = response;
		controller.request = request;
		controller.sendError(ex);
	}
}