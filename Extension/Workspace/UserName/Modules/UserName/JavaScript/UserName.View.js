// @module JJ.UserName.UserName
define('JJ.UserName.UserName.View'
	, [
		'jj_username_username.tpl',
		'Profile.Model',
		'Wizard.Module',
		'JJ.UserName.UserName.Model',
		'jQuery'
	]
	, function (
		jj_username_username_tpl,
		profileModel,
		WizardModule,
		Model,
		jQuery
	) {
		'use strict';

		return WizardModule.extend({
			initialize: function initialize(options) {
				WizardModule.prototype.initialize.apply(this, arguments);
				var model = new Model();
				var profile = profileModel.getInstance();
				var IsProfile = profile.get('isLoggedIn');
				var self = this;

				if (IsProfile === "T") {
					model.fetch().done(function (value) {

						self.contactDetails = value;
						self.render();
					});
				}
			},
			template: jj_username_username_tpl,
			getContext: function getContext() {
				var profile = profileModel.getInstance();
				var person = profile.get('isperson');
				var username = '';
				var companyname = '';

				if (this.contactDetails && Object.keys(this.contactDetails).length !== 0) {

					username = this.contactDetails.contactName;
					companyname = this.contactDetails.companyName;
				} else {
					companyname = profile.get('companyname');
					username = profile.get('firstname');
				}

				return {
					UserName: username,
					CompanyName: companyname,
				};
			}
		});
	});
