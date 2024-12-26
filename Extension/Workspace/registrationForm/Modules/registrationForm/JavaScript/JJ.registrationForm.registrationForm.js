define(
	'JJ.registrationForm.registrationForm'
	, [
		'JJ.registrationForm.registrationForm.View',
		'JJ.registrationForm.registrationForm.Router'
	],
	function (
		registrationFormView,
		registrationFormRouter
	) {
		'use strict';
		return {
			mountToApp: function mountToApp(container) {
				var layout = container.getComponent('Layout');
				if (layout) {
					layout.addChildView('registrationForm', function () {
						return new registrationFormView({ application: container });
					});
				}
				return new registrationFormRouter(container);
			}
		};
	});
