// @module JJ.GateKeeper.GateKeeper
define('JJ.GateKeeper.GateKeeper.View', [
	'jj_gatekeeper_gatekeeper.tpl',
	'Backbone',
	'underscore',
	'Profile.Model'
], function (
	template,
	Backbone,
	_,
	ProfileModel
) {
	'use strict';

	// @class JJ.GateKeeper.GateKeeper.View @extends Backbone.View
	return Backbone.View.extend({

		template: template,

		initialize: function () {
			Backbone.history.on('route', this.beforeCompositeViewRender, this);
		},

		beforeCompositeViewRender: function () {
			const isLoggedIn = ProfileModel.getInstance().get('isLoggedIn') === 'T';
			if (!isLoggedIn) {
				$("html").addClass("private-window");
				var urlfragment = Backbone.history.fragment;
				var currentUrl = window.location.href;
				var excludedURL = []
				var urlList = _.isEmpty(SC.CONFIGURATION.gatekeeper.data)
				if (!urlList) {
					excludedURL = SC.CONFIGURATION.gatekeeper.data.map(function (item) {
						return item.link;
					});
				}
				var home = SC.getSessionInfo().touchpoints.home;

				// Check if currentUrl contains the required query parameters
				var isCheckout = currentUrl.includes("is=checkout");
				var passwdret = currentUrl.includes("passwdret=T");
				var passretget = currentUrl.includes("passretget=T");

				if (isCheckout && passwdret && passretget) {
					_.defer(function () {
						$("html").removeClass("private-window");
					});
					return true; // Do not redirect
				}

				if (home + "/" == currentUrl) {
					_.defer(function () {
						$("html").removeClass("private-window");
					});
					return true;
				}
				if (!excludedURL.includes(urlfragment) && !currentUrl.includes("scs/checkout.ssp")) {
					var checkoutUrl = SC.getSessionInfo().touchpoints.login;
					var redirectURL = home + checkoutUrl;
					window.location.replace(redirectURL);
				} else {
					_.defer(function () {
						$("html").removeClass("private-window");
					});
				}
				if (SC.CONFIGURATION.gatekeeper.showSearch) {
					_.defer(function () {
						$(".site-search-content-form").removeAttr("data-action");
						$(".site-search").addClass("remove-icon");
					})
				}
			}
		},

		getContext: function () {
			this.beforeCompositeViewRender();
			this.message = ""
			return {
				message: this.message
			};
		}
	});
});