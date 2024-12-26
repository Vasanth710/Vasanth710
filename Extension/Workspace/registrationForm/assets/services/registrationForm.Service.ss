
function service(request, response)
{
	'use strict';
	try 
	{
		require('JJ.registrationForm.registrationForm.ServiceController').handle(request, response);
	} 
	catch(ex)
	{
		console.log('JJ.registrationForm.registrationForm.ServiceController ', ex);
		var controller = require('ServiceController');
		controller.response = response;
		controller.request = request;
		controller.sendError(ex);
	}
}