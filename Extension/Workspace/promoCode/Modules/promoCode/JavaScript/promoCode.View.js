// @module JJ.promoCode.promoCode
define('JJ.promoCode.promoCode.View'
	, [
		'jj_promocode_promocode.tpl'
		, 'Backbone',
		'Utils',
		'Profile.Model'
	]
	, function promoCodeView(
		jj_promocode_promocode_tpl
		, Backbone,
		Utils,
		ProfileModel
	) {
		'use strict';
		return Backbone.View.extend({
			template: jj_promocode_promocode_tpl,
			title: Utils.translate('Referral Link'),
			page_header: Utils.translate('Referral Link'),

			attributes: {
				id: 'promocode',
				'class': 'promoCodeView'
			}
			, getBreadcrumbPages: function () {
				return {
					text: this.title
					, href: '/promocode'
				};
			},
			getSelectedMenu: function getSelectedMenu() {
				return 'promocode';
			}

			, getContext: function getContext() {
				// To copy the URL to clipboard
				$(document).ready(function () {
					$('.referral-link-share-button').on('click', function () {
						var inputField = $('.referral-link-url').get(0);
						inputField.select();
						document.execCommand('copy');
						inputField.setSelectionRange(0, 0);
						alert('The URL has been copied to clipboard. You can now share with your friends.');
					});
				});

				// To pass the unique URL to the template.
				var profileModel = ProfileModel.getInstance();
				var customerId = profileModel.id;
				var scEnvironment = SC.ENVIRONMENT;
				var baseUrl = scEnvironment.checkoutUrl;
				var touchpoint = scEnvironment.siteSettings.touchpoints.login;
				return {
					customerId: customerId,
					baseUrl: baseUrl,
					touchpoint: touchpoint
				};
			}
		});
	});
