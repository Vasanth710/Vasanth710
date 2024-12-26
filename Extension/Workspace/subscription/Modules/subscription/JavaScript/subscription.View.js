define('JJ.subscription.subscription.View'
	, [
		'jj_subscription_subscription.tpl',
		'Backbone',
		'SC.Configuration',
		'Profile.Model',
		'JJ.subscription.subscription.Model',
		'underscore',
		'JJ.subscription.unsubscribe.Model',
		'Backbone.FormView',
		'Backbone.CompositeView'
	]
	, function subscriptionView(
		jj_subscription_subscription_tpl,
		Backbone,
		Configuration,
		ProfileModel,
		subscriptionModel,
		_,
		unsubscribeModel,
		BackboneFormView,
		BackboneCompositeView
	) {
		'use strict';
		return Backbone.View.extend({
			template: jj_subscription_subscription_tpl,
			title: _(Configuration.get('subscription.pageTitle')).translate(),
			page_header: _(Configuration.get('subscription.pageHeader')).translate(),

			getBreadcrumbPages: function () {
				return {
					text: this.title,
					href: '/subscription'
				};
			},

			getSelectedMenu: function getSelectedMenu() {
				return 'subscription';
			},

			initialize: function (options) {
				this.message = '';
				BackboneCompositeView.add(this);
				this.application = options.application;
				this.UnsubscribeModel = new unsubscribeModel();
				this.model = new subscriptionModel();
				BackboneFormView.add(this);
			},

			events: {
				'click [data-action="subscribe"]': 'Subscribe',
				'click [data-action="unsubscribe"]': 'UnSubscribe'
			},

			bindings: {
				'[name="unsubscribe_reason"]': 'unsubscribe_reason'
			},

			UnSubscribe: function (e) {
				try {
					let unsubscribe_reason = this.$('[name="unsubscribe_reason"]').val().trim();
					let validationMessage = document.getElementById('unsubscribe-validation-message');
					if (!unsubscribe_reason) {
						validationMessage.style.display = 'block';
						return;
					} else {
						validationMessage.style.display = 'none';
					}
					this.UnsubscribeModel.set('unsubscribe_reason', unsubscribe_reason);
					this.UnsubscribeModel.save()
						.done(function () {
							location.reload();
						})
						.fail(function () {
							location.reload();
						});
				} catch (e) {
					console.error('Error in UnSubscribe function:', e);
				}
			},

			Subscribe: function (e) {
				try {
					let profileModel = ProfileModel.getInstance();
					let addresses = profileModel.attributes.addresses.models;
					let failureMessage = document.getElementById('failure-validation-message');
					let submitButton = document.querySelector('.subscription-submit');
					let hasDefaultBilling = false;
					let hasDefaultShipping = false;
					let hasDefaultPayment = false;

					// Iterate through all addresses to check for default billing and shipping
					for (let i = 0; i < addresses.length; i++) {
						let address = addresses[i];
						if (address.attributes.defaultbilling === "T") {
							hasDefaultBilling = true;
						}
						if (address.attributes.defaultshipping === "T") {
							hasDefaultShipping = true;
						}
					}

					// Check for default payment method
					if (profileModel.attributes.defaultCreditCard && profileModel.attributes.defaultCreditCard.attributes.savecard === "T") {
						hasDefaultPayment = true;
					}

					// Conditions to enable the submit button or display failure message
					if (hasDefaultBilling && hasDefaultShipping && hasDefaultPayment) {
						submitButton.disabled = false;
						submitButton.classList.remove('disabled');
						this.model.save()
						location.reload();
					} else {
						failureMessage.innerText = Configuration.get('subscription.failureMessage');
						failureMessage.style.display = "block";
						submitButton.disabled = true;
						submitButton.classList.add('disabled');
					}
				} catch (e) {
					console.error('Error in Subscribe function:', e);
					alert('An error occurred. Please try again.');
				}
			},

			getContext: function getContext() {
				try {
					let profile_data = ProfileModel.getInstance();
					let cust_id = profile_data.get("internalid");
					return this.model.fetch({ data: { function: "getContext", cust_id: cust_id } })
						.then(result => {
							if (!result) {
								console.error("Empty response received from the backend");
								return {};
							}
							let {
								IsInActive, SubscriptionStatus, StartDate, ActivateDate, BillingDate, NextBillingDate, HoldReason,
								SubscribedItem } = result;
							let SubscriptionCancelled = SubscriptionStatus === 'Cancelled';
							let isInactiveFlag = IsInActive === 'F';
							if (SubscriptionCancelled || isInactiveFlag) {
								return {
									SubscriptionCancelled,
									IsInActive: isInactiveFlag,
									StartDate,
									ActivateDate,
									BillingDate,
									NextBillingDate,
									SubscriptionStatus,
									HoldReason,
									SubscribedItem
								};
							}
							return {};
						})
						.catch(e => {
							console.error("Error fetching context:", e);
							return {};
						});
				} catch (e) {
					console.error("Error in the try block:", e);
					return {};
				}
			},

			updateContextAndRender: function () {
				this.getContext()
					.then(context => {
						this._render(context);
						this.initializeDocumentReadyFunctions();
					})
					.catch(e => {
						console.error("Error updating context and rendering:", e);
					});
			},

			render: function () {
				this.updateContextAndRender();
				return this;
			},

			_render: function (context) {
				this.$el.html(this.template(context));
				return this;
			},

			initializeDocumentReadyFunctions: function () {
				$(document).ready(function () {
					let checkBox = $('#subscription');
					let $submitButton = $('.subscription-submit');
					function toggleSubmitButton() {
						$submitButton.prop('disabled', !checkBox.is(':checked'));
					}
					toggleSubmitButton();
					checkBox.change(toggleSubmitButton);
				});
			}
		});
	});
