define(
	'JJ.CheckoutPageUpdate.checkoutfields'
	, [
		'JJ.CheckoutPageUpdate.checkoutfields.View'
		, 'Wizard.View'
		, 'OrderWizard.Module.Confirmation'
		, 'JJ.CheckoutPageUpdate.checkoutfields.SS2Model'
		, 'OrderWizard.Module.ShowShipments'
		, 'jj_order_wizard_showshipments_module.tpl'
		, 'Address.Edit.Fields.View'
		, 'jj_address_edit_fields.tpl'
		, 'GlobalViews.CountriesDropdown.View'
		, 'GlobalViews.States.View'
		, 'jj_global_views_countriesDropdown.tpl'
		, 'jj_global_views_states.tpl'
		, 'Profile.Model'
		, 'OrderWizard.Module.PaymentMethod.Selector'
	]
	, function (
		checkoutFieldsView,
		WizardView,
		OrderWizardModuleConfirmation,
		CheckoutPageUpdateSS2Model,
		OrderWizardModuleShowShipments,
		jj_order_wizard_showshipments_module_tpl,
		AddressEditFieldsView,
		jj_address_edit_fields_tpl,
		CountriesDropdownView,
		GlobalViewsStatesView,
		jj_global_views_countriesDropdown_tpl,
		jj_global_views_states_tpl,
		ProfileModel,
		OrderWizardModulePaymentMethodSelector
	) {
		'use strict';

		return {
			mountToApp: function mountToApp(container) {

				var checkout = container.getComponent('Checkout');
				this.opcrendered = false;
				var self = this;
				if (checkout) {
					checkout.on("afterShowContent", function () {
						checkout.getCurrentStep().then(function (step) {
							if ((step.url == "opc" && !self.opcrendered)) {
								checkout.addModuleToStep({
									step_url: 'opc',
									module: {
										id: 'checkoutFieldsView',
										index: 6,
										classname: 'JJ.CheckoutPageUpdate.checkoutfields.View'
									}
								});
								self.opcrendered = true
							}
						})
					})
				}

				_.extend(OrderWizardModuleShowShipments.prototype, {
					template: jj_order_wizard_showshipments_module_tpl,
				})

				_.extend(WizardView.prototype, {
					getContext: _.wrap(WizardView.prototype.getContext, function (fn) {
						var context = fn.apply(this, _.toArray(arguments).slice(1));
						try {
							var cart = container.getComponent('Cart');
							var commentsOnOrder = this.wizard.commentsOnOrder;
							if (!!commentsOnOrder) {
								var data = {
									fieldId: "custbody_comments",
									type: "string",
									value: commentsOnOrder
								}
								cart.setTransactionBodyField(data).then(function () {
									console.log(data.fieldId + ' was set to ' + data.value);
								}).fail(function (error) {
									console.log("error@commentsOnOrder", error);
								});
							}
						} catch (e) {
							console.log("error@WizardViewcontext", e);
						}
						return context;
					})
				});

				_.extend(OrderWizardModuleConfirmation.prototype, {
					getContext: _.wrap(OrderWizardModuleConfirmation.prototype.getContext, function getContext(fn) {
						var context = fn.apply(this, _.toArray(arguments).slice(1));
						try {
							var orderId = this.model.get('confirmation').get('internalid');
							this.memoModel = new CheckoutPageUpdateSS2Model({ id: orderId });
							this.memoModel.fetch({
							}).done(function (result) {
								console.log("return confirm memofield", result);
							});
						} catch (e) {
							console.log("err@OrderWizardModuleConfirmation", e);
						}
						return context;
					})
				});

				_.extend(AddressEditFieldsView.prototype, {
					template: jj_address_edit_fields_tpl,
					childViews: _.extend(AddressEditFieldsView.prototype.childViews, {
						CountriesDropdown: function () {
							this.selected_country = 'CA';
							var filteredCountry = {
								"CA": this.options.countries.CA
							};
							return new CountriesDropdownView({
								countries: filteredCountry,
								selectedCountry: this.selected_country,
								manage: this.options.manage
							});
						},
						StatesView: function () {
							var filteredCountry = {
								"CA": this.options.countries.CA
							};
							return new GlobalViewsStatesView({
								countries: filteredCountry,
								selectedCountry: "CA",
								selectedState: this.model.get('state'),
								manage: this.manage
							});
						}
					})
				});

				_.extend(CountriesDropdownView.prototype, {
					template: jj_global_views_countriesDropdown_tpl,
				});

				_.extend(GlobalViewsStatesView.prototype, {
					template: jj_global_views_states_tpl,
				});

				_.extend(OrderWizardModulePaymentMethodSelector.prototype, {
					_hasSetCreditCard: false,
					_hasSetInvoice: false,
					getContext: _.wrap(OrderWizardModulePaymentMethodSelector.prototype.getContext, function (fn) {
						let context = fn.apply(this, _.toArray(arguments).slice(1));
						let profile = ProfileModel.getInstance();
						let terms = profile.get('paymentterms') ? profile.get('paymentterms').name : null;
						let self = this;
						try {
							if (terms === 'Due on Sale' && !this._hasSetCreditCard) {
								this._hasSetCreditCard = true;
								self.setModuleByType("creditcard");
								return context;
							} else if (terms === 'Net 30' && !this._hasSetInvoice) {
								this._hasSetInvoice = true;
								self.setModuleByType("invoice");
								return context;
							} else {
								if (!terms && !this._hasSetCreditCard) {
									this._hasSetCreditCard = true;
									self.setModuleByType("creditcard");
								}
							}
						} catch (e) {
							console.error("An error occurred while setting the payment method:", e);
						}
						return context;
					})
				});
			}
		};
	});