// JJ.LoginCustomization.LoginCustom.js
// Load all your starter dependencies in backend for your extension here
// ----------------
define('JJ.LoginCustomization.LoginCustom'
	, [
		"Account.Model",
		'SC.Models.Init',
		'Profile.Model',
		'LiveOrder.Model',
		'Address.Model',
		'CreditCard.Model',
		'underscore'
	]
	, function (
		AccountModel,
		ModelsInit,
		Profile,
		LiveOrder,
		Address,
		CreditCard,
		_
	) {
		'use strict';
		_.extend(AccountModel, {
			register: function (user_data) {
				// var customer = ModelsInit.getCustomer();
				var customfields = {};
				for (var property in user_data) {
					if (property.substring(0, 10) == 'custentity') {
						customfields[property] = user_data[property];
					}
				}

				if (ModelsInit.customer.isGuest()) {
					var guest_data = ModelsInit.customer.getFieldValues();

					ModelsInit.customer.setLoginCredentials({
						internalid: guest_data.internalid,
						email: user_data.email,
						password: user_data.password
					});

					ModelsInit.session.login({
						email: user_data.email,
						password: user_data.password
					});

					if (Object.keys(customfields).length) {
						ModelsInit.customer.updateProfile({
							internalid: guest_data.internalid,
							firstname: user_data.firstname,
							lastname: user_data.lastname,
							companyname: user_data.company,
							emailsubscribe:
								user_data.emailsubscribe && user_data.emailsubscribe !== 'F'
									? 'T'
									: 'F',
							customfields: customfields
						});
					} else {
						ModelsInit.customer.updateProfile({
							internalid: guest_data.internalid,
							firstname: user_data.firstname,
							lastname: user_data.lastname,
							companyname: user_data.company,
							emailsubscribe:
								user_data.emailsubscribe && user_data.emailsubscribe !== 'F' ? 'T' : 'F'
						});
					}
				} else {
					user_data.emailsubscribe =
						user_data.emailsubscribe && user_data.emailsubscribe !== 'F' ? 'T' : 'F';
					var result = ModelsInit.session.registerCustomer({
						firstname: user_data.firstname,
						lastname: user_data.lastname,
						companyname: user_data.company,
						email: user_data.email,
						password: user_data.password,
						password2: user_data.password2,
						emailsubscribe:
							user_data.emailsubscribe && user_data.emailsubscribe !== 'F' ? 'T' : 'F'
					});

					if (Object.keys(customfields).length && result.customerid) {
						ModelsInit.customer.updateProfile({
							internalid: result.customerid,
							customfields: customfields
						});
					}
				}

				ModelsInit.session.logout();

				return {
					touchpoints: ModelsInit.session.getSiteSettings(['touchpoints']).touchpoints,
				};
			}
		})
	});