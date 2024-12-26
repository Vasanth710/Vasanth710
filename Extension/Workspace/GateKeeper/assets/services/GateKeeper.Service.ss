
function service(request, response)
{
	'use strict';
	try 
	{
		require('JJ.GateKeeper.GateKeeper.ServiceController').handle(request, response);
	} 
	catch(ex)
	{
		console.log('JJ.GateKeeper.GateKeeper.ServiceController ', ex);
		var controller = require('ServiceController');
		controller.response = response;
		controller.request = request;
		controller.sendError(ex);
	}
}