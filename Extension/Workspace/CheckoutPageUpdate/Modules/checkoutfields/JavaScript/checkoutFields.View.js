define('JJ.CheckoutPageUpdate.checkoutfields.View'
	, [
		'jj_checkoutpageupdate_checkoutfields.tpl'
		, 'Wizard.Module'
		, 'Utils'
		, 'GlobalViews.Message.View'

	]
	, function (
		jj_checkoutpageupdate_checkoutfields_tpl
		, WizardModule
		, Utils
		, GlobalViewsMessageView
	) {
		'use strict';
		return WizardModule.extend({
			template: jj_checkoutpageupdate_checkoutfields_tpl,
			events: {
				'change [data-action="save-comments"]': "saveComments",
				'change [data-action="save-date"]': "currentDateCanadaFormatted",
			},

			// Function to format the current date based on Canada timezone
			currentDateCanadaFormatted: function currentDateCanadaFormatted() {
				function formatDate(date, timeZone) {
					return new Intl.DateTimeFormat('en-CA', {
						year: '2-digit',
						month: '2-digit',
						day: '2-digit',
						hour: '2-digit',
						minute: '2-digit',
						second: '2-digit',
						timeZone: timeZone,
						hour12: false
					}).format(date);
				}
				const timeZone = 'America/Toronto';  // Adjust this as needed
				const currentDateCanadaFormatted = formatDate(new Date(), timeZone);
				return currentDateCanadaFormatted;
			},

			// Helper function to format dates into "DD-MMM-YYYY" format
			formatDateToCustomString: function formatDateToCustomString(date) {
				const day = String(date.getDate()).padStart(2, '0');
				const year = date.getFullYear();
				const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
				const month = months[date.getMonth()];
				return `${day}-${month}-${year}`;
			},

			// Save comments function
			saveComments: function () {
				try {
					const dataInput = document.getElementById('comments-on-order');
					const commentsOnOrder = dataInput.value;
					this.wizard.commentsOnOrder = commentsOnOrder;
				} catch (error) {
					console.log("err@saveValue", error);
				}
			},

			// Submit function that handles promised date logic
			submit: function () {
				var ground9amChecked = document.getElementById('ground-9am')?document.getElementById('ground-9am').checked:null;
				var ground12pmChecked = document.getElementById('ground-12pm')?document.getElementById('ground-12pm').checked:null;
				var dateSelected = $('[name=selected-date]').val() || '';
				var dateError = document.getElementById('date-error-message');
				function getCurrentHourInTimezone(timeZone) {
					const date = new Date();
					const options = { hour: 'numeric', timeZone: timeZone, hour12: false };
					return new Intl.DateTimeFormat('en-CA', options).format(date);
				}
				const timeZone = 'America/Toronto'; // Adjust this as needed
				const currentHour = parseInt(getCurrentHourInTimezone(timeZone), 10);
				if (ground9amChecked || ground12pmChecked) {
					var promisedDate = new Date();
					// If the order is placed before 1 PM, set the promised date to tomorrow
					// If the order is placed after 1 PM, set the promised date to the day after tomorrow
					if (currentHour < 13) {
						promisedDate.setDate(promisedDate.getDate() + 1); // Tomorrow
					} else {
						promisedDate.setDate(promisedDate.getDate() + 2); // Day after tomorrow
					}
					const formattedPromisedDate = this.formatDateToCustomString(promisedDate);
					this.wizard.model.attributes.options.custbody_promisedate = formattedPromisedDate;
					// Skip the mandatory check for the date field
					dateError.innerHTML = '';
					return jQuery.Deferred().resolve();
				} else {
					// If no checkbox is selected, ensure the date field is filled
					if (dateSelected.trim() === '') {
						var errorMessage = Utils.translate('Expected Delivery Date is mandatory. Please fill it.');
						var global_view_message = new GlobalViewsMessageView({
							message: errorMessage,
							type: 'error',
							closable: true
						});
						$('#date-error-message')
							.empty()
							.append(global_view_message.render().$el.html());
						$('html, body').animate({
							scrollTop: $("#date-error-message").offset().top - 70
						}, 1000);
						return jQuery.Deferred().reject();
					} else {
						const formattedDateSelected = this.formatDateToCustomString(new Date(dateSelected));
						this.wizard.model.attributes.options.custbody_promisedate = formattedDateSelected;
						dateError.innerHTML = '';
						return jQuery.Deferred().resolve();
					}
				}
			},

			getContext: function getContext() {
				var deliveryDateDesc = SC.CONFIGURATION.get('checkoutfields.deliverydatedesc');
				var officeHoursInfo = SC.CONFIGURATION.get('checkoutfields.officehoursinfo');
				var date = this.wizard.selectedExpDate;
				var today = new Date();
				var yyyy = today.getFullYear();
				var mm = String(today.getMonth() + 1).padStart(2, '0');
				var dd = String(today.getDate() + 3).padStart(2, '0');
				var minDate = `${mm}/${dd}/${yyyy}`;
				setTimeout(() => {
					$('#selected-date').datepicker('destroy').datepicker({
						daysOfWeekDisabled: [0, 6],
						startDate: minDate,
						beforeShowDay: function (date) {
							var day = date.getDay();
							return [(day != 0 && day != 6), ''];
						},
						autoclose: true,
						format: 'mm/dd/yyyy'
					});
				}, 1000);
				return {
					startDate: minDate,
					date: date,
					deliveryDateDesc: deliveryDateDesc,
					officeHoursInfo: officeHoursInfo
				};
			}
		});
	});