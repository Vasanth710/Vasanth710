define(
	'JJ.ShippingItems.ShippingItems',
	[
		'Profile.Model',
		'OrderWizard.Module.Shipmethod',
		'jj_shippingitems_shippingitems.tpl',
		'SC.Configuration',
		'OrderWizard.Module.CartSummary',
		'CreditCard.Edit.Form.View',
		'jj_creditcard_creditcard.tpl',
		'Utils'
	],
	function (
		ProfileModel,
		OrderWizardModuleShipmethod,
		jj_shippingitems_shippingitems_tpl,
		Configuration,
		OrderWizardModuleCartSummary,
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

				_.extend(OrderWizardModuleCartSummary.prototype, {
					getContext: _.wrap(OrderWizardModuleCartSummary.prototype.getContext, function (fn) {
						var context = fn.apply(this, _.toArray(arguments).slice(1));
						if (context.showHandlingCost === true) {
							var self = this;
							var checkoutFields = SC.CONFIGURATION.get('checkoutfields');
							this.controlledPrice = parseInt(checkoutFields.handlingCharge).toString();
							self.model.attributes.options.custbody_add_charges = this.controlledPrice;
						}
						return context;
					})
				});

				_.extend(OrderWizardModuleShipmethod.prototype, {
					template: jj_shippingitems_shippingitems_tpl,
					events: _.extend(OrderWizardModuleShipmethod.prototype.events, {
						'click .ground-delivery': 'toggleGroundDelivery',
					}),

					initialize: _.wrap(OrderWizardModuleShipmethod.prototype.initialize, function (fn) {
						fn.apply(this, _.toArray(arguments).slice(1));
						this.isGroundDelivery = false;
						this.selectedDeliveryTime = '';
						let profile = ProfileModel.getInstance();
						let isLoggedIn = profile.attributes.isLoggedIn;
						if (isLoggedIn === 'T') {
							this.setInitialShippingMethod();
						}
					}),

					setInitialShippingMethod: function () {
						try {
							let context = this.getContext();
							this.updateShipMethod(this.selectedDeliveryTime, context);
						} catch (error) {
							console.error('Error in setInitialShippingMethod:', error);
						}
					},

					toggleGroundDelivery: function toggleGroundDelivery(event) {
						try {
							event.preventDefault();
							event.stopPropagation();
							let clickedCheckbox = event.target;
							let ground9amCheckbox = document.getElementById('ground-9am');
							let ground12pmCheckbox = document.getElementById('ground-12pm');
							// If the clicked checkbox is checked
							if (clickedCheckbox.checked) {
								if (clickedCheckbox.id === 'ground-9am') {
									// Uncheck the 12pm option if 9am is selected
									ground12pmCheckbox.checked = false;
									this.wizard.model.attributes.options.custbody_jj_grounded_by_time = '1';
								} else if (clickedCheckbox.id === 'ground-12pm') {
									// Uncheck the 9am option if 12pm is selected
									ground9amCheckbox.checked = false;
									this.wizard.model.attributes.options.custbody_jj_grounded_by_time = '2';
								}
							}
							// If the clicked checkbox is unchecked, reset the field
							else {
								if (clickedCheckbox.id === 'ground-9am' || clickedCheckbox.id === 'ground-12pm') {
									this.wizard.model.attributes.options.custbody_jj_grounded_by_time = '';
								}
							}
							// Update the selectedDeliveryTime for further processing
							this.selectedDeliveryTime = clickedCheckbox.checked ? clickedCheckbox.id : '';
							let context = this.getContext();
							this.updateShipMethod(this.selectedDeliveryTime, context);
						} catch (error) {
							console.error('Error in toggleGroundDelivery:', error);
						}
					},

					updateShipMethod: function (selectedDeliveryTime, context) {
						try {
							let scConfiguration = Configuration.ShippingItems.config;
							let profile = ProfileModel.getInstance();
							let mediTrackSubscription = profile.attributes.customfields;
							let custentity2 = mediTrackSubscription.find(function (field) {
								return field.name === 'custentity2';
							});
							let isMediTrackSubscriber = custentity2 ? custentity2.value : null;
							let isResidential = false;
							if (this.model.attributes && this.model.attributes.addresses && this.model.attributes.addresses.models && this.model.attributes.addresses.models.length > 0) {
								let firstAddress = this.model.attributes.addresses.models[0];
								if (firstAddress.attributes && firstAddress.attributes.isresidential !== undefined) {
									isResidential = firstAddress.attributes.isresidential;
								}
							}
							let codeToFind;
							if (isMediTrackSubscriber === 'T') {
								if (context.isControlledPresent && context.isRefrigeratedPresent) {
									codeToFind = selectedDeliveryTime === 'ground-9am' ? 'MG9CS' : selectedDeliveryTime === 'ground-12pm' ? 'MG12CS' : 'MCS';
								}
								else if (context.isControlledPresent) {
									codeToFind = selectedDeliveryTime == 'ground-9am' ? 'MG9S' : selectedDeliveryTime == 'ground-12pm' ? 'MG12S' : 'MS';
								}
								else if (context.isRefrigeratedPresent) {
									codeToFind = selectedDeliveryTime == 'ground-9am' ? 'MG9C' : selectedDeliveryTime == 'ground-12pm' ? 'MG12C' : 'MC';
								} else {
									codeToFind = selectedDeliveryTime === 'ground-9am' ? 'MG9' : selectedDeliveryTime === 'ground-12pm' ? 'MG12' : isResidential === 'T' ? 'MR' : 'M';
								}
							} else {
								if (context.isControlledPresent && context.isRefrigeratedPresent) {
									codeToFind = selectedDeliveryTime === 'ground-9am' ? 'G9CS' : selectedDeliveryTime === 'ground-12pm' ? 'G12CS' : 'GCS';
								} else if (context.isControlledPresent) {
									codeToFind = selectedDeliveryTime === 'ground-9am' ? 'G9S' : selectedDeliveryTime === 'ground-12pm' ? 'G12S' : 'GS';
								} else if (context.isRefrigeratedPresent) {
									codeToFind = selectedDeliveryTime === 'ground-9am' ? 'G9C' : selectedDeliveryTime === 'ground-12pm' ? 'G12C' : 'GC';
								} else if (isResidential === 'T') {
									codeToFind = selectedDeliveryTime === 'ground-9am' ? 'G9' : selectedDeliveryTime === 'ground-12pm' ? 'G12' : 'GR';
								} else {
									codeToFind = selectedDeliveryTime === 'ground-9am' ? 'G9' : selectedDeliveryTime === 'ground-12pm' ? 'G12' : 'G';
								}
							}
							let matchingConfig = scConfiguration.find(function (config) {
								return config.code === codeToFind;
							});
							if (matchingConfig) {
								this.model.setShipMethod(matchingConfig.internalId)
							} else {
								console.error('No matching shipping method found for code:', codeToFind);
							}
						} catch (error) {
							console.error('Error in updateShipMethod:', error);
						}
					},

					getContext: _.wrap(OrderWizardModuleShipmethod.prototype.getContext, function (fn) {
						let context = fn.apply(this, _.toArray(arguments).slice(1));  // Get the original context
						try {
							context.isGround9amChecked = this.selectedDeliveryTime === 'ground-9am';
							context.isGround12pmChecked = this.selectedDeliveryTime === 'ground-12pm';
							let lineItem = context.model.attributes.lines;
							let isControlledPresent = false;
							let isRefrigeratedPresent = false;
							let deliveryMessage = Configuration.get("ShippingItems.deliveryMessage");
							lineItem.models.forEach(function (model) {
								let itemClass = model.attributes.item.attributes.class;
								if (itemClass === 'Controlled' || itemClass === 'Controlled : Compound Controlled' || itemClass === 'Controlled : Signature Controlled') {
									isControlledPresent = true;
								}
								if (itemClass === 'Refrigerated') {
									isRefrigeratedPresent = true;
								}
							});
							context.selectedDeliveryTime = this.selectedDeliveryTime;
							context.deliveryMessage = deliveryMessage;
							context.isControlledPresent = isControlledPresent;
							context.isRefrigeratedPresent = isRefrigeratedPresent;
						} catch (error) {
							console.error('Error in getContext:', error);
						}
						return context;
					})
				});
			}
		};
	});