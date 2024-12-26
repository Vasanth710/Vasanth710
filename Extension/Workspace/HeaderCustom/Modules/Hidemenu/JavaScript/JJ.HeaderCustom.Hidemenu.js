define(
	'JJ.HeaderCustom.Hidemenu'
	, [
		'Header.Menu.View'
		, 'Profile.Model'
		, 'underscore',
		'header_menu_update.tpl'

	]
	, function (
		HeaderMenuView
		, ProfileModel
		, _,
		header_menu_update,

	) {
		'use strict';

		return {
			mountToApp: function mountToApp(container) {

				_.extend(HeaderMenuView.prototype, {
					getContext: _.wrap(HeaderMenuView.prototype.getContext, function (fn) {
						try {
							var original = fn.apply(this, _.toArray(arguments).slice(1));
							var profile = ProfileModel.ProfileModel ? ProfileModel.ProfileModel.getInstance() : ProfileModel.getInstance();
							var isLoggedIn = profile.get('isLoggedIn');
							// To hide Register menu for logged in users
							if (isLoggedIn === "T") {
								original.categories = _.filter(original.categories, function (element) {
									return element.text !== "Register"
								})
							}
							return original;
						} catch (e) {
							console.log('An error occurred', e);
						}
					}),
				});
				_.extend(HeaderMenuView.prototype, {
					template: header_menu_update,
					getContext: _.wrap(HeaderMenuView.prototype.getContext, function (fn) {
						var context = fn.apply(this, _.toArray(arguments).slice(1));
						var showSitesearch = true;
						const isLoggedIn = ProfileModel.getInstance().get('isLoggedIn') === 'T';
						if (!isLoggedIn) {
							try {

								var showSitesearch = !!(SC.CONFIGURATION.get('gatekeeper.showSearch')) ? false : true;
								context.showSitesearch = showSitesearch;
							} catch (e) {
								console.log('An error occurred', e);
							}
						}
						context.showSitesearch = showSitesearch;
						return context;


					}),


				});

			}
		};
	});
