define(
	'JJ.CheckoutPrescription.CheckoutPrescription'
	, [
		'JJ.CheckoutPrescription.CheckoutPrescription.View',
		'OrderWizard.Step',

	]
	, function (
		CheckoutPrescriptionView,
		OrderWizardStep,

	) {
		'use strict';
		return {
			mountToApp: function mountToApp(container) {
				var checkout = container.getComponent('Checkout');
				checkout.addModuleToStep(
					{
						step_url: 'opc' // if you're using a non-OPC checkout, then you will need to put the specific step URL in instead
						, module: {
							id: 'CheckoutPrescriptionView'
							, index: 99
							, classname: 'JJ.CheckoutPrescription.CheckoutPrescription.View'
						}
					}
				);
			}
		}
	})









