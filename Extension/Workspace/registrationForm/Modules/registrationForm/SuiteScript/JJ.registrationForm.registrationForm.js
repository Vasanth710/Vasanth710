define('JJ.registrationForm.registrationForm'
	, [
		'SC.Model',
		'Utils',
		'underscore',
		'Configuration'
	]
	, function (
		SCModel,
		Utils,
		_,
		Configuration
	) {
		'use strict';
		return SCModel.extend({
			name: 'JJ.registrationForm.registrationForm',
			CreateLead: function (data) {
				console.error('In@Model: Forms', JSON.stringify(data));
				try {
					var companyname, custentity_parent_company, addr1, addr2, city, state, zip, country, custentity_phone_web,
						custentity_fax_web, email, comments, custentity_sub_tier, contact_name, contact_title, contact_email,
						mrp_name, mrp_surname, mrp_title, custentity_nscs_licensenum, mrp_email, signature, custentity_referral_id;
					var content = '';
					var emailId = Configuration.get('registrationForm.emailId');
					var employeeId = Configuration.get('registrationForm.employeeId');
					var emailContent = Configuration.get('registrationForm.emailContent');
					var emailSubject = Configuration.get('registrationForm.emailSubject');

					companyname = Utils.sanitizeString(data.companyname);
					custentity_parent_company = Utils.sanitizeString(data.custentity_parent_company);
					addr1 = Utils.sanitizeString(data.addr1);
					addr2 = Utils.sanitizeString(data.addr2);
					city = Utils.sanitizeString(data.city);
					state = Utils.sanitizeString(data.state);
					zip = Utils.sanitizeString(data.zip);
					country = Utils.sanitizeString(data.country);
					custentity_phone_web = Utils.sanitizeString(data.custentity_phone_web);
					custentity_fax_web = Utils.sanitizeString(data.custentity_fax_web);
					email = Utils.sanitizeString(data.email);
					comments = Utils.sanitizeString(data.comments);
					custentity_sub_tier = Utils.sanitizeString(data.custentity_sub_tier);
					contact_name = Utils.sanitizeString(data.contact_name);
					contact_title = Utils.sanitizeString(data.contact_title);
					contact_email = Utils.sanitizeString(data.contact_email);
					mrp_name = Utils.sanitizeString(data.mrp_name);
					mrp_surname = Utils.sanitizeString(data.mrp_surname);
					mrp_title = Utils.sanitizeString(data.mrp_title);
					custentity_nscs_licensenum = Utils.sanitizeString(data.custentity_nscs_licensenum);
					mrp_email = Utils.sanitizeString(data.mrp_email);
					signature = (data.image).split('data:image/png;base64,')[1];
					custentity_referral_id = Utils.sanitizeString(data.custentity_referral_id);
					console.error('In@Model: Forms', JSON.stringify(data));

					try {
						// Perform the search to check if the customer already exists with different email ID.
						var customerSearch = nlapiSearchRecord("customer", null,
							[
								["companyname", "is", companyname]
							],
							[
								new nlobjSearchColumn("email")
							]
						);

						var emailExists = false;
						var companyExists = false;
						if (customerSearch && customerSearch.length > 0) {
							for (var i = 0; i < customerSearch.length; i++) {
								var existingEmail = customerSearch[i].getValue('email');
								if (existingEmail === email) {
									emailExists = true;
								} else {
									companyExists = true;
								}
							}
						}
						if (companyExists && !emailExists) {
							return {
								errorMessage: 'Customer with this company name exists.'
							}
						};

						// Perform the search to check if the customer already exists with same email ID.
						var customerSearchID = nlapiSearchRecord("customer", null,
							[
								["companyname", "is", companyname],
								"AND",
								["email", "is", email]
							],
							[
								new nlobjSearchColumn("internalid")
							]
						);

						var customerId;
						var flag = false;
						// If customer exists, get the internal ID
						if (customerSearchID && customerSearchID.length > 0) {
							customerId = customerSearchID[0].getValue('internalid');
							if (custentity_sub_tier == 2) {
								flag = true;
							}
						} else {
							// Create a new customer record
							var flag = false;
							const customerRecord = nlapiCreateRecord('lead');
							customerRecord.setFieldValue('isperson', 'F');
							customerRecord.setFieldValue('companyname', companyname);
							customerRecord.setFieldValue('custentity_parent_company', custentity_parent_company);
							customerRecord.setLineItemValue('addressbook', 'addr1', 1, addr1);
							customerRecord.setLineItemValue('addressbook', 'addr2', 1, addr2);
							customerRecord.setLineItemValue('addressbook', 'city', 1, city);
							customerRecord.setLineItemValue('addressbook', 'state', 1, state);
							customerRecord.setLineItemValue('addressbook', 'zip', 1, zip);
							customerRecord.setLineItemValue('addressbook', 'country', 1, country);
							customerRecord.setFieldValue('custentity_phone_web', custentity_phone_web);
							customerRecord.setFieldValue('custentity_fax_web', custentity_fax_web);
							customerRecord.setFieldValue('email', email);
							customerRecord.setFieldValue('comments', comments);
							customerRecord.setFieldValue('custentity_sub_tier', custentity_sub_tier);
							customerRecord.setFieldValue('custentity_referral_id', custentity_referral_id);

							if (custentity_sub_tier == 2) {
								console.error('Subscription Check', 'Customer is  in the "priority plus" tier.');
								flag = true;
							}
							customerId = nlapiSubmitRecord(customerRecord, false, true);
						}

						if (flag && customerId) {
							this.searchSubscription(customerId);
						}

						if (customerId) {
							// Create the first contact record
							const contactSearch = nlapiSearchRecord("contact", null,
								[
									[["email", "is", contact_email], "OR", ["firstname", "is", contact_name]],
									"AND", ["company", "is", customerId]
								],
								[
									new nlobjSearchColumn("internalid")
								]
							);

							if (contactSearch && contactSearch.length > 0) {
								return {
									errorMessage: 'Contact with this name or email ID already exists.'
								};
							}
							const contactRecord1 = nlapiCreateRecord('contact', { recordmode: 'dynamic' });
							contactRecord1.setFieldValue('firstname', contact_name);
							contactRecord1.setFieldValue('title', contact_title);
							contactRecord1.setFieldValue('email', contact_email);
							contactRecord1.setFieldValue('company', customerId);
							const contactId1 = nlapiSubmitRecord(contactRecord1);

							if (contactId1) {
								// Create the MRP record
								const customerSearchh = nlapiSearchRecord("customer", null,
									[
										[["email", "is", mrp_email], "OR", ["firstname", "is", mrp_name]],
										"AND", ["lastname", "is", mrp_surname],
										"AND", ["parent", "is", customerId]
									],
									[
										new nlobjSearchColumn("internalid")
									]
								);

								if (customerSearchh && customerSearchh.length > 0) {
									// Delete the contact if MRP creation fails
									nlapiDeleteRecord('contact', contactId1);
									return {
										errorMessage: 'MRP with this name or email ID already exists.'
									};
								}

								// Create the second lead record (MRP)
								const customerRecord2 = nlapiCreateRecord('lead', { recordmode: 'dynamic' });
								customerRecord2.setFieldValue('isperson', 'T');
								customerRecord2.setFieldValue('firstname', mrp_name);
								customerRecord2.setFieldValue('lastname', mrp_surname);
								customerRecord2.setFieldValue('title', mrp_title);
								customerRecord2.setFieldValue('custentity_nscs_licensenum', custentity_nscs_licensenum);
								customerRecord2.setFieldValue('email', mrp_email);
								var timestamp = new Date().toISOString().replace(/[:.]\d{3}Z$/, "").replace(/[-T:]/g, "_").slice(0, -3);
								var filename = mrp_name + "_" + custentity_nscs_licensenum + "_" + timestamp + ".png";
								var eSignature = nlapiCreateFile(filename, "PNGIMAGE", signature);
								eSignature.setFolder(Number(Configuration.get('registrationForm.folderId')));
								var eSignatureId = nlapiSubmitFile(eSignature);
								customerRecord2.setFieldValue('custentity_signature', eSignatureId);
								customerRecord2.setFieldValue('parent', customerId);
								const customerRecordId2 = nlapiSubmitRecord(customerRecord2);
								// Sends an email to the Admin regarding newly register Customer details.
								var admin = employeeId;
								var recipient = emailId;
								var subject = emailSubject;
								var content = "Hi,<br>";
								content += emailContent + "<br>";
								content += "Customer<br>";
								content += "Company Name : " + companyname + "<br>";
								content += "Email Address : " + email + "<br>";
								content += "Phone Number : " + custentity_phone_web + "<br>" + "<br>";
								content += "Contact<br>";
								content += "Name : " + contact_name + "<br>";
								content += "Email Address : " + contact_email + "<br>" + "<br>";
								content += "MRP<br>";
								content += "Name : " + mrp_name + ' ' + mrp_surname + "<br>";
								content += "Email Address : " + mrp_email + "<br>" + "<br>";
								content += "Thank You ";
								nlapiSendEmail(admin, recipient, subject, content);

								if (customerRecordId2) {
									return {
										successMessage: 'Your request has been submitted. We will get back to you within 24 hours.'
									};
								} else {
									return {
										errorMessage: 'Failed to create the second lead record. Contact creation has been rolled back.'
									};
								}
							} else {
								return {
									errorMessage: 'Failed to create the contact record.'
								};
							}
						} else {
							return {
								errorMessage: 'Failed to create the lead record.'
							};
						}
					} catch (e) {
						console.error('err@registerationFormS', e);
						return {
							status: 500,
							code: 'ERR_FORM',
							message: 'There was an error submitting the form, please try again later'
						};
					}
				} catch (e) {
					console.error('err@cregisterationFormF', e);
					return {
						status: 500,
						code: 'ERR_FORM',
						message: 'There was an error submitting the form, please try again later'
					};
				}
			},

			searchSubscription: function (data) {
				try {
					var currentUser = nlapiGetUser();
					var customerName = nlapiLookupField('customer', data, 'entityid');
					var customrecord_meditrack_subscriptionSearch = nlapiSearchRecord("customrecord_meditrack_subscription", null,
						[
							["custrecord_subscription_customer", "anyof", customerName]
						],
						[
							new nlobjSearchColumn("id"),
							new nlobjSearchColumn("isinactive")
						]
					);
					if (customrecord_meditrack_subscriptionSearch && customrecord_meditrack_subscriptionSearch.length > 0) {
						var isInactive = customrecord_meditrack_subscriptionSearch[0].getValue('isinactive');
						if (isInactive === 'T') {
							this.createSubscriptionRecord(data);
						}
					}
					else {
						// Customer is not found in the subscription record
						this.createSubscriptionRecord(data);
					}
				} catch (e) {
					nlapiLogExecution('ERROR', 'Error Searching Subscription', e.toString());
					return true; // If there's an error in the search, prevent creating a subscription record.
				}
			},

			createSubscriptionRecord: function (data) {
				try {
					var customerRecord = nlapiLoadRecord('customer', data);
					customerRecord.setFieldValue('custentity2', 'T');
					nlapiSubmitRecord(customerRecord, true);
					var newRecord = nlapiCreateRecord('customrecord_meditrack_subscription');
					newRecord.setFieldValue('custrecord_subscription_customer', data);
					newRecord.setFieldValue('custrecord_subscription_start_date', nlapiDateToString(new Date()));
					var currentDate = new Date();
					var nextBillingDate = new Date();
					nextBillingDate.setDate(currentDate.getDate() + 3);
					newRecord.setFieldValue('custrecord_next_billing_date', nlapiDateToString(nextBillingDate));
					newRecord.setFieldValue('custrecord_activation_date', nlapiDateToString(nextBillingDate));
					newRecord.setFieldValue('custrecord_status', '3');
					var recordId = nlapiSubmitRecord(newRecord, true);
					console.error('Yes record created', recordId)
					// // Send email notification when a customer Subscribe.
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
					nlapiLogExecution('ERROR', 'Record Created', 'Record ID: ' + recordId);
				} catch (e) {
					nlapiLogExecution('ERROR', 'Error Creating Record', e.toString());
				}
			}
		});
	});
