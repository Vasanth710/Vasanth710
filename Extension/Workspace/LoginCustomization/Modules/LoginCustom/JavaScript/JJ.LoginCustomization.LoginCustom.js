
define(
	'JJ.LoginCustomization.LoginCustom'
	, [
		'LoginRegister.Register.View',
		'LoginRegister.Login.View',
		'jj_login_register_login.tpl',
		'LoginRegister.View',
		'jj_login_register.tpl',
		'jj_login_register_register.tpl',
		'Header.Profile.View',
		'Account.Register.Model',
		'Backbone.FormView',
		'Utils',
		'Loggers',
		'underscore',
		'Configuration',
		'sweetAlert'

	]
	, function (
		LoginRegisterRegisterView,
		LoginRegisterLoginView,
		jj_login_register_login_tpl,
		LoginRegistrationView,
		jj_login_register_tpl,
		jj_login_register_register_tpl,
		HeaderProfileView,
		AccountRegisterModel,
		BackboneFormView,
		Utils,
		Loggers,
		_,
		Configuration,
		swal
	) {
		'use strict';

		return {
			mountToApp: function mountToApp(container) {

				_.extend(AccountRegisterModel.prototype, {
					validation: {
						firstname: {
							required: true,
							msg: Utils.translate('First Name is required')
						},
						lastname: {
							required: true,
							msg: Utils.translate('Last Name is required')
						},
						email: {
							required: true,
							pattern: 'email',
							msg: Utils.translate('Valid Email is required')
						},
						company: {
							required: SC.ENVIRONMENT.siteSettings.registration.companyfieldmandatory === 'T',
							msg: Utils.translate('Company Name is required')
						},
						// address: {
						// 	required: true,
						// 	msg: Utils.translate('Address is required')
						// },
						custentity_phone_web: {
							required: true,
							fn: _.validatePhone,
							msg: Utils.translate('Phone is required')
						},
						custentity_fax_web: [
							{
								required: true,
								msg: Utils.translate('Fax is required')
							},
							{
								minLength: 7,
								msg: Utils.translate('Fax must be at least 7 characters long')
							}
						],
						custentity_name_mrp: {
							required: true,
							msg: Utils.translate('Name of Chief Prescriber (MRP) is required')
						},
						custentity_mrp_email: {
							required: true,
							pattern: 'email',
							msg: Utils.translate('MRP Email is required and must be valid')
						},
						custentity_nscs_licensenum: {
							required: true,
							msg: Utils.translate('Provincial License # is required')
						},
						password: {
							required: true,
							msg: Utils.translate('Password is required')
						},
						password2: {
							required: true,
							equalTo: 'password',
							msg: Utils.translate('Passwords must match')
						},
						custentity_sub_tier: {
							required: true,
							msg: Utils.translate('Please select a subscription tier')
						}
					}
				});

				_.extend(LoginRegisterRegisterView.prototype, {
					template: jj_login_register_register_tpl,
					bindings: {
						'[name="firstname"]': 'firstname',
						'[name="lastname"]': 'lastname',
						'[name="company"]': 'company',
						'[name="email"]': 'email',
						'[name="address"]': 'address',
						'[name="custentity_phone_web"]': 'custentity_phone_web',
						'[name="custentity_fax_web"]': 'custentity_fax_web',
						'[name="custentity_name_mrp"]': 'custentity_name_mrp',
						'[name="custentity_mrp_email"]': 'custentity_mrp_email',
						'[name="custentity_nscs_licensenum"]': 'custentity_nscs_licensenum',
						'[name="custentity_sub_tier"]': "custentity_sub_tier",
						'[name="password"]': 'password',
						'[name="password2"]': 'password2',
					},
					submitForm: function (e, model, props) {
						e.preventDefault();
						console.log('Loggers', Loggers)
						const loggers = Loggers.Loggers.getLogger();
						const actionId = loggers.start('Customer Registration');
						const self = this;
						const selectedValue = $('input[name="custentity_sub_tier"]:checked').val();

						var data = (jQuery(e.target).closest('form')).serializeObject();
						// customPassword
						this.model.set("password", "Rm3YztCUHmOYahp")
						this.model.set("password2", "Rm3YztCUHmOYahp")
						data.redirect = "false";
						this.model.set("redirect", "false")
						const hasNullOrUndefined = _.some(_.values(data), value => value === '' || value === undefined);
						return this.cancelableTrigger('before:LoginRegister.register', data).then(function () {
							if (_.isEmpty(selectedValue) && !hasNullOrUndefined) {
								$("#register-radio-error").show()
								throw console.error("Choose an option");
							} else (
								$("#register-radio-error").hide()
							)
							console.log('data', data)
							const promise = self.saveForm(e, model, props);

							if (promise) {
								promise.done(() => {
									loggers.end(actionId, {
										operationIds: self.model.getOperationIds(),
										status: 'success'
									});

									var divElement = document.createElement("div");
									var p2 = document.createElement("p");
									p2.textContent = "All account registration requests are vetted to ensure the clinics and providers possess the necessary qualifications.";
									var p3 = document.createElement("p");
									p3.textContent = "Once your application is approved, we will notify you that your account is set up.";
									divElement.appendChild(p2);
									divElement.appendChild(p3);

									swal({
										title: "Thank you for submitting your account registration.",
										content: divElement,
									});
								});
							}
						});
					},

					redirect: function (_context, response) {
						const self = this;
						return this.cancelableTrigger('after:LoginRegister.register').then(function () {
							const url_options = Utils.parseUrlOptions(window.location.search);
							const { touchpoints } = response;
							const { application } = self;

							if (url_options.is && url_options.is === 'checkout') {
								const profile_model = ProfileModel.getInstance();

								response.user && profile_model.set(response.user);
								response.cart && LiveOrderModel.getInstance().set(response.cart);
								response.address && profile_model.get('addresses').reset(response.address);
								response.paymentmethod &&
									profile_model.get('paymentmethods').reset(response.paymentmethod);

								// Track Guest Checkout Event
								self.trackEvent(function () {
									application.setConfig('currentTouchpoint', 'checkout');
									Backbone.history.navigate('', { trigger: true });
								});
							} else {
								// Track Login Event
								self.trackEvent(function () {
									// if we know from which touchpoint the user is coming from
									if (url_options.origin && touchpoints[url_options.origin]) {
										// we save the url to that touchpoint
										let url = touchpoints[url_options.origin];
										// if there is an specific hash
										if (url_options.origin_hash) {
											// we add it to the url as a fragment
											url = Utils.addParamsToUrl(url, { fragment: url_options.origin_hash });
										}
										//window.location.href = url;
									} else {
										// We've got to disable passwordProtectedSite feature if customer registration is disabled.
										if (
											Configuration.getRegistrationType() !== 'disabled' &&
											SC.ENVIRONMENT.siteSettings.siteloginrequired === 'T'
										) {
											//window.location.href = touchpoints.home;
										} else {
											// otherwise we need to take it to the customer center
											//window.location.href = touchpoints.customercenter;
										}
									}
								});
							}
						});
					},
				});

				_.extend(LoginRegisterLoginView.prototype, {
					template: jj_login_register_login_tpl,
					// redirect: function (context, response) {
					// 	const url_options = Utils.parseUrlOptions(window.location.search);
					// 	const { touchpoints } = response;
					// 	const isPasswordReset = url_options.passwdret;
					// 	const self = this;
					// 	// Track Login Event
					// 	this.trackEvent(function () {
					// 		if (
					// 			!isPasswordReset &&
					// 			(url_options.is === 'checkout' || url_options.origin === 'checkout')
					// 		) {
					// 			self.refreshApplication(response);
					// 		} else {
					// 			// if we know from which touchpoint the user is coming from
					// 			if (url_options.origin && touchpoints[url_options.origin]) {
					// 				// we save the URL to that touchpoint
					// 				let url = touchpoints[url_options.origin];
					// 				// if there is an specific hash
					// 				if (url_options.origin_hash) {
					// 					// we add it to the URL as a fragment
					// 					url = Utils.addParamsToUrl(url, { fragment: url_options.origin_hash });
					// 				}
					// 				window.location.href = url;
					// 			} else {
					// 				// We've got to disable passwordProtectedSite feature if customer registration is disabled.
					// 				if (
					// 					Configuration.getRegistrationType() !== 'disabled' &&
					// 					SC.ENVIRONMENT.siteSettings.siteloginrequired === 'T'
					// 				) {
					// 					window.location.href = touchpoints.home;
					// 				} else {
					// 					// otherwise we need to take it to the customer center
					// 					var i = 0;
					// 					var mainCategory = SC.CATEGORIES[i].fullurl;
					// 					const categoryUrl = touchpoints.home + mainCategory; // Ensure this URL is correct
					// 					window.location.href = categoryUrl;

					// 				}
					// 			}
					// 		}
					// 	});
					// },

				});

				_.extend(LoginRegistrationView.prototype, {
					template: jj_login_register_tpl,
					getContext: _.wrap(LoginRegistrationView.prototype.getContext, function (fn) {
						let context = fn.apply(this, _.toArray(arguments).slice(1));
						var config = Configuration.get('LoginCustom');
						context.config = config;

						$(document).ready(function () {
							function adjustLoginDivHeight() {
								var registerDiv = document.getElementsByClassName('login-register-wrapper-register')[0];
								var loginDiv = document.getElementsByClassName('login-register-wrapper-login')[0];
								var registerDivHeight = registerDiv.offsetHeight;
								loginDiv.style.height = registerDivHeight + 'px';
							}

							if (window.innerWidth > 992) {
								// Adjust the login div height initially after DOM is ready
								_.defer(adjustLoginDivHeight);
								// Adjust the login div height on window resize
								window.addEventListener("resize", adjustLoginDivHeight);
							}
						});

						return context;
					})
				})
			}
		};
	});
