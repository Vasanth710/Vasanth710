
define(
	'JJ.AccountCustomization.AccCustomization'
	, [
		'JJ.AccountCustomization.AccCustomization.View',
		'OrderHistory.Summary.View',
		'jj_accountcustomization_acccustomization.tpl',
		'SC.Configuration'
	]
	, function (
		AccountCustomizationEditView,
		OrderHistorySummaryView,
		template,
		Configuration
	) {
		'use strict';

		return {
			mountToApp: function mountToApp(container) {
				_.extend(OrderHistorySummaryView.prototype, {
					template: template,
					initialize: _.wrap(OrderHistorySummaryView.prototype.initialize, function (fn) {
						fn.apply(this, _.toArray(arguments).slice(1));
						var self = this;
					}),
					events: _.extend(OrderHistorySummaryView.prototype.events, {
						'click [data-action="edit"]': 'editOrder'
					}),
					editOrder: function () {
						new AccountCustomizationEditView({
							application: this.application,
							model: this.model
						}).showInModal('order');
					},
					currentDateGMTFormatted: function currentDateGMTFormatted() {
						function formatDate(date) {
							const year = date.getUTCFullYear();
							const month = String(date.getUTCMonth() + 1).padStart(2, '0');
							const day = String(date.getUTCDate()).padStart(2, '0');
							const hours = String(date.getUTCHours()).padStart(2, '0');
							const minutes = String(date.getUTCMinutes()).padStart(2, '0');
							const seconds = String(date.getUTCSeconds()).padStart(2, '0');

							return `${month}/${day}/${year % 100} ${hours}:${minutes}:${seconds}`;
						}
						const currentDateGMTFormatted = formatDate(new Date());
						return currentDateGMTFormatted;
					},
					isWithinOneHour: function isWithinOneHour(createdTime, getCurrentTime) {
						if (_.isEmpty(createdTime)) {
							return false;
						}
						function parseDate(dateString) {
							const [datePart, timePart] = dateString.split(' ');
							const [month, day, year] = datePart.split('/');
							const [hours, minutes, seconds] = timePart.split(':');
							return new Date(Date.UTC(2000 + parseInt(year), month - 1, day, hours, minutes, seconds));
						}
						const createdDate = parseDate(createdTime);
						const getCurrentDate = parseDate(getCurrentTime);
						const timeDiff = Math.abs(getCurrentDate - createdDate);
						const oneHourInMillis = 60 * 60 * 1000;
						return timeDiff <= oneHourInMillis;
					},
					getContext: _.wrap(OrderHistorySummaryView.prototype.getContext, function getContext(fn) {
						var context = fn.apply(this, _.toArray(arguments).slice(1));
						var status = this.model.get("status").internalid;
						var createdTime = this.model.get("options").custbody_order_time;
						var currentTime = this.currentDateGMTFormatted();
						var isWithinOneHour = this.isWithinOneHour(createdTime, currentTime);
						jQuery(document).ready(function () {
							var HstNumber = Configuration.get('HstNumber.config');
							jQuery('.order-history-details-content-col').append("<p class='hst-number'><b>HST# </b>" + HstNumber + "</p>");
						});
						if (status === "pendingApproval" && isWithinOneHour) {
							context.showEditButton = true;
						}
						return context;
					})
				});
			}
		};
	});
