define(
	'JJ.CreditCard.CreditCard',
	[
		'CreditCard.Edit.Form.View',
		'jj_creditcard_creditcard.tpl',
		'Utils'
	],
	function (
		CreditCardEditFormView,
		jj_creditcard_creditcard_tpl,
		Utils
	) {
		'use strict';

		return {
			mountToApp: function mountToApp(container) {

				_.extend(CreditCardEditFormView.prototype, {
					template: jj_creditcard_creditcard_tpl,
					getContext: _.wrap(CreditCardEditFormView.prototype.getContext, function (fn) {
						var context = fn.apply(this, _.toArray(arguments).slice(1));
						function initializeCardValidation() {
							let cardTypeDisplay = $('#in-modal-display-card-type').length ? $('#in-modal-display-card-type') : $('#display-card-type');
							let paymentMethodInput = $('#in-modal-paymentmethod').length ? $('#in-modal-paymentmethod') : $('#paymentmethod');
							let validationMessage = $('#custom-validation-message');
							let submitButtons = $('.paymentinstrument-creditcard-edit-form-button-submit, .order-wizard-step-button-continue');
							let customValidationMessage = $('#custom-credit-card-validation-message');
							if (customValidationMessage.length === 0) {
								$('.creditcard-edit-form-controls-cc-select-container').append(
									'<p id="custom-credit-card-validation-message" style="display:none;"></p>'
								);
								customValidationMessage = $('#custom-credit-card-validation-message');
							}
							function detectCardType(ccnumber) {
								let isValid = false;
								if (/^4[0-9]{12}(?:[0-9]{3})?$/.test(ccnumber)) {
									context.cardType = 'VISA';
									context.paymentMethodValue = '5,1,1555641112';
									isValid = true;
								} else if (/^(5[1-5][0-9]{14}|2(2(2[1-9]|[3-9][0-9])|[3-6][0-9][0-9]|7([0-1][0-9]|20))[0-9]{12})$/.test(ccnumber)) {
									context.cardType = 'MasterCard';
									context.paymentMethodValue = '4,1,1555641112';
									isValid = true;
								} else if (/^3[47][0-9]{13}$/.test(ccnumber)) {
									context.cardType = 'American Express';
									context.paymentMethodValue = '6,5,1555641112';
								} else if (/^6(?:011|5[0-9]{2})[0-9]{12}$/.test(ccnumber)) {
									context.cardType = 'Discover';
									context.paymentMethodValue = '3,5,1555641112';
								} else if (/^(50|5[6-9]|6[0-4]|6[6-9])\d{12,19}$/.test(ccnumber)) {
									context.cardType = 'Maestro';
									context.paymentMethodValue = '16,5,1555641112';
								} else {
									context.cardType = Utils.translate('Unrecognized Card Type');
									context.paymentMethodValue = '0';
								}
								return isValid;
							}
							$(document).on('blur', '#ccnumber, #in-modal-ccnumber', function () {
								let ccnumber = $(this).val();
								let isValid = detectCardType(ccnumber);
								cardTypeDisplay.text(context.cardType);
								paymentMethodInput.val(context.paymentMethodValue);
								validationMessage.text(isValid ? '' : Utils.translate('Please enter a valid card number.')).toggle(!isValid);
							});
							submitButtons.on('click', function (e) {
								if (context.cardType !== 'VISA' && context.cardType !== 'MasterCard') {
									e.preventDefault();
									customValidationMessage.text(Utils.translate('Credit card type should be "Visa" or "MasterCard".')).show();
								} else {
									customValidationMessage.hide();
								}
							});
						}
						$(document).ready(function () {
							initializeCardValidation();
						});
						return context;
					})
				});
			}
		};
	});