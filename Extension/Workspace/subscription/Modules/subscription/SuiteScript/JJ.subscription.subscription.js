define('JJ.subscription.subscription'
	, [
		'SC.Model',
		'Configuration',
		'Utils'
	], function (
		SCModel,
		Configuration,
		Utils
	) {
	'use strict';
	return SCModel.extend({
		name: 'JJ.subscription.subscription',

		unSubscribeSubscription: function (data) {
			try {
				var currentUser = nlapiGetUser();
				var customerRecord = nlapiLoadRecord('customer', currentUser);
				customerRecord.setFieldValue('custentity2', 'F');
				nlapiSubmitRecord(customerRecord, true);
				var customerName = customerRecord.getFieldValue('entityid');
				var customerEmail = customerRecord.getFieldValue('email');
				var unsubscribe_reason = Utils.sanitizeString(data.unsubscribe_reason);
				// Search for active subscriptions
				var customrecord_meditrack_subscriptionSearchh = nlapiSearchRecord("customrecord_meditrack_subscription", null,
					[
						["custrecord_subscription_customer", "anyof", currentUser], "AND",
						["isinactive", "is", "F"]
					],
					[
						new nlobjSearchColumn("internalid")
					]
				);
				var action = 'not_found';
				var recordId = null;
				if (customrecord_meditrack_subscriptionSearchh && customrecord_meditrack_subscriptionSearchh.length > 0) {
					var searchResult = customrecord_meditrack_subscriptionSearchh[0];
					var subscriptionId = searchResult.getValue("internalid");
					var record = nlapiLoadRecord('customrecord_meditrack_subscription', subscriptionId);
					record.setFieldValue('custrecord_status', '4');
					record.setFieldValue('custrecord_hold_reason', unsubscribe_reason);
					recordId = nlapiSubmitRecord(record, true);
					nlapiLogExecution('DEBUG', 'Subscription Unsubscribed', 'Record ID: ' + recordId);
					action = 'unsubscribed';
				}
				// Send email notification when a customer Unsubscribe.
				var emailId = Configuration.get('subscription.emailId');
				var employeeId = Configuration.get('subscription.employeeId');
				var unSubscribeEmailSubject = Configuration.get('subscription.unSubscribeEmailSubject');
				var unSubscribeEmailContent = Configuration.get('subscription.unSubscribeEmailContent');
				var admin = employeeId;
				var recipient = emailId;
				var subject = unSubscribeEmailSubject;
				var content = "Hi,<br>";
				content += unSubscribeEmailContent + "<br>";
				content += "Customer Details.<br>";
				content += "Name : " + customerName + "<br>";
				content += "Email : " + customerEmail + "<br>";
				content += "Reason for cancellation : " + unsubscribe_reason;
				content += "<br>";
				content += "Thank You ";
				nlapiSendEmail(admin, recipient, subject, content);
				return { success: true, action: action, recordId: recordId };
			} catch (e) {
				nlapiLogExecution('ERROR', 'Error in unSubscribeSubscription function', e.toString());
				return { success: false, error: e.toString() };
			}
		},

		searchSubscription: function (data) {
			try {
				var currentUser = nlapiGetUser();
				var customrecord_meditrack_subscriptionSearch = nlapiSearchRecord("customrecord_meditrack_subscription", null,
					[
						["custrecord_subscription_customer", "anyof", currentUser]
					],
					[
						new nlobjSearchColumn("custrecord_subscription_start_date"),
						new nlobjSearchColumn("custrecord_activation_date"),
						new nlobjSearchColumn("custrecord_last_billing_date"),
						new nlobjSearchColumn("custrecord_next_billing_date"),
						new nlobjSearchColumn("custrecord_status"),
						new nlobjSearchColumn("custrecord_hold_reason"),
						new nlobjSearchColumn("custrecord_subscription_item"),
						new nlobjSearchColumn("isinactive")
					]
				);
				if (customrecord_meditrack_subscriptionSearch) {
					for (var j = 0; j < customrecord_meditrack_subscriptionSearch.length; j++) {
						var searchResult = customrecord_meditrack_subscriptionSearch[j];
						var startDate = searchResult.getValue("custrecord_subscription_start_date");
						var activateDate = searchResult.getValue("custrecord_activation_date");
						var billingDate = searchResult.getValue("custrecord_last_billing_date");
						var nextBillingDate = searchResult.getValue("custrecord_next_billing_date");
						var subscriptionStatus = searchResult.getText("custrecord_status");
						var holdReason = searchResult.getValue("custrecord_hold_reason");
						var subscribedItem = searchResult.getText("custrecord_subscription_item");
						var isInActive = searchResult.getValue("isinactive");
					}
				}
			} catch (e) {
				nlapiLogExecution('ERROR', 'Error in search', e.toString());
			}
			return {
				IsInActive: isInActive,
				StartDate: startDate,
				ActivateDate: activateDate,
				BillingDate: billingDate,
				NextBillingDate: nextBillingDate,
				SubscriptionStatus: subscriptionStatus,
				HoldReason: holdReason,
				SubscribedItem: subscribedItem
			};
		},

		createSubscriptionRecord: function (data) {
			try {
				var currentUser = nlapiGetUser();
				var customerRecord = nlapiLoadRecord('customer', currentUser);
				nlapiSubmitRecord(customerRecord, true);
				var newRecord = nlapiCreateRecord('customrecord_meditrack_subscription');
				newRecord.setFieldValue('custrecord_subscription_customer', currentUser);
				newRecord.setFieldValue('custrecord_subscription_start_date', nlapiDateToString(new Date()));
				newRecord.setFieldValue('custrecord_status', '3');
				var recordId = nlapiSubmitRecord(newRecord, true);
				// Send email notification when a customer Subscribe.
				var emailId = Configuration.get('subscription.emailId');
				var employeeId = Configuration.get('subscription.employeeId');
				var subscribeEmailSubject = Configuration.get('subscription.subscribeEmailSubject');
				var subscribeEmailContent = Configuration.get('subscription.subscribeEmailContent');
				var customerName = customerRecord.getFieldValue('entityid');
				var customerEmail = customerRecord.getFieldValue('email');
				var admin = employeeId;
				var recipient = emailId;
				var subject = subscribeEmailSubject;
				var content = "Hi,<br>";
				content += subscribeEmailContent + "<br>";
				content += "Customer Details.<br>";
				content += "Name : " + customerName + "<br>";
				content += "Email : " + customerEmail + "<br>";
				content += "Thank You ";
				nlapiSendEmail(admin, recipient, subject, content);
				nlapiLogExecution('DEBUG', 'Record Created', 'Record ID: ' + recordId);
			} catch (e) {
				nlapiLogExecution('ERROR', 'Error Creating Record', e.toString());
			}
		}
	});
});