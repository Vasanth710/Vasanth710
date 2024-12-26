define(
	'JJ.subscription.subscription'
	, [
		'JJ.subscription.subscription.Router'
	]
	, function (
		subscriptionRouter
	) {
		'use strict';
		return {
			mountToApp: function mountToApp(container) {
				var myAccountMenu = container.getComponent("MyAccountMenu");
				var subscriptionGroup = {
					id: "Subscription",
					name: "Subscription",
					index: 7
				}
				myAccountMenu.addGroup(subscriptionGroup);
				var subscriptionPage = {
					id: "Subscription",
					groupid: "Subscription",
					name: "Subscription Page",
					index: 1,
					url: "subscription",
					permissionoperator: "OR",
					permission: []
				}
				myAccountMenu.addGroupEntry(subscriptionPage);
				return new subscriptionRouter(container);
			}
		};
	});
