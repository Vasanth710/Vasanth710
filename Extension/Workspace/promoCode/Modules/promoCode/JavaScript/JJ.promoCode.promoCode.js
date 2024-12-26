
define(
	'JJ.promoCode.promoCode'
	, [
		'JJ.promoCode.promoCode.Router'
	]
	, function (
		promoCodeRouter
	) {
		'use strict';
		return {
			mountToApp: function mountToApp(container) {
				var myAccountMenu = container.getComponent("MyAccountMenu");
				var preordersMenuGroup = {
					id: "promoCode",
					name: "Promo Code",
					index: 6
				}
				myAccountMenu.addGroup(preordersMenuGroup);
				var myAccountMenu = container.getComponent("MyAccountMenu");
				var preOrdersViewAll = {
					id: "promoCode",
					groupid: "promoCode",
					name: "Referral Link",
					index: 1,
					url: "promocode"
				}
				myAccountMenu.addGroupEntry(preOrdersViewAll);
				return new promoCodeRouter(container);
			}
		};
	});
