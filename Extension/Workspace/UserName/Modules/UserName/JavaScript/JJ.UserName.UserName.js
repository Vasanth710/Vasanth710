define(
	'JJ.UserName.UserName'
,   [
		'JJ.UserName.UserName.View',
	]
,   function (
		UserNameView
	)
{
	'use strict';
    return {
		mountToApp: function mountToApp(container) {
			var checkout = container.getComponent('Checkout');              
			checkout.addModuleToStep({
				step_url: 'opc' ,
				module: {
					id: 'UserNameView',
					index: 1,
					classname: 'JJ.UserName.UserName.View'
				}
			});
		}
	};
});
