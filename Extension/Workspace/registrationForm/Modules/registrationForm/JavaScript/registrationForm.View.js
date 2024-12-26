define('JJ.registrationForm.registrationForm.View', [
	'jj_registrationform_registrationform.tpl',
	'JJ.registrationForm.registrationForm.Model',
	'Backbone',
	'sweetAlert',
	"Backbone.CompositeView",
	'Backbone.FormView',
	"jQuery",
	'underscore',
	'SC.Configuration',
	'Utils',
	"Backbone.Validation"
], function (
	jj_registrationform_registrationform_tpl,
	registrationFormModel,
	Backbone,
	swal,
	BackboneCompositeView,
	BackboneFormView,
	jQuery,
	_,
	Configuration,
	Utils,
	BackboneValidation
) {
	'use strict';
	return Backbone.View.extend({

		template: jj_registrationform_registrationform_tpl,
		initialize: function (options) {
			this.message = '';
			BackboneCompositeView.add(this);
			this.application = options.application;
			this.model = new registrationFormModel();
			BackboneFormView.add(this);
			Backbone.Validation.bind(this);
			this.priorityPlusValidationMsg = SC.CONFIGURATION.registrationForm.PriorityPlusInformation;
		},


		title: _(Configuration.get('registrationForm.pageTitle')).translate(),
		page_header: _(Configuration.get('registrationForm.pageHeader')).translate(),
		attributes: {
			'id': 'lead-form-container',
			'class': 'lead-form-container'
		},
		events: {
			"submit #registration-form": "SubmitForm",
			'change input[data-type="phone"]': 'formatNumber',
			'change .registration-form-radio': 'handleSubscriptionChange'
		},

		bindings: {
			'[name="companyname"]': 'companyname',
			'[name="custentity_parent_company"]': 'custentity_parent_company',
			'[name="addr1"]': 'addr1',
			'[name="addr2"]': 'addr2',
			'[name="city"]': 'city',
			'[name="state"]': 'state',
			'[name="zip"]': 'zip',
			'[name="country"]': 'country',
			'[name="custentity_fax_web"]': 'custentity_fax_web',
			'[name="custentity_phone_web"]': 'custentity_phone_web',
			'[name="email"]': 'email',
			'[name="comments"]': 'comments',
			'[name="custentity_sub_tier"]': 'custentity_sub_tier',
			'[name="contact_name"]': 'contact_name',
			'[name="contact_title"]': 'contact_title',
			'[name="contact_email"]': 'contact_email',
			'[name="mrp_name"]': 'mrp_name',
			'[name="mrp_surname"]': 'mrp_surname',
			'[name="mrp_title"]': 'mrp_title',
			'[name="custentity_nscs_licensenum"]': 'custentity_nscs_licensenum',
			'[name="mrp_email"]': 'mrp_email',
			'[name="image"]': 'image',
			'[name="custentity_referral_id"]': 'custentity_referral_id',
		},

		// Function to format phone number
		formatNumber: function (e) {
			const $target = jQuery(e.target);
			$target.val(Utils.formatPhone($target.val()));
		},
		handleSubscriptionChange: function (e) {
			var self = this;
			var priorityPlusValidationMsg = self.priorityPlusValidationMsg;
			// Get the value of the selected radio button
			const $target = jQuery(e.target);  // Get the target element (the clicked radio button)
			const selectedValue = $target.val();
			// Check if the selected value is '2' (Priority Plus)
			if (selectedValue === '2') {
				// Show the custom message for Priority Plus option
				jQuery('#registration-radio-errors').text(priorityPlusValidationMsg);
				jQuery('#registration-radio-errors').show();
			} else {
				// Hide the error message for other selections
				jQuery('#registration-radio-errors').hide();
			}
		},
		SubmitForm: function (e) {
			e.preventDefault();
			jQuery('form .global-views-message').parent().remove();
			var promise = BackboneFormView.saveForm.apply(this, arguments);

			return promise && promise.then(
				function (success) {
					if (success.successMessage) {
						swal('Submitted!', success.successMessage, 'success').then(function () {
							window.location.reload();
						});
					} else {
						swal('Sorry!', success.errorMessage || 'An error occurred, please try again.', 'error').then(function () {
						});
					}
				},
				function (fail) {
					fail.preventDefault = true;
					swal('Sorry!', fail.responseJSON.errorMessage || 'An error occurred, please try again.', 'error').then(function () {
					});
				}
			);
		},

		getContext: function getContext() {
			let url = new URL(window.location.href);
			let custId = url.searchParams.get('custId');
			var self = this;
			$(document).ready(function () {
				$("#register-referral-link").val(custId);
				(function () {
					window.requestAnimFrame = (function (callback) {
						return window.requestAnimationFrame ||
							window.webkitRequestAnimationFrame ||
							window.mozRequestAnimationFrame ||
							window.oRequestAnimationFrame ||
							window.msRequestAnimationFrame ||
							function (callback) {
								window.setTimeout(callback, 1000 / 60);
							};
					})();

					var $canvas = $("#sig-canvas");
					var canvas = $canvas[0];
					var ctx = canvas.getContext("2d");
					ctx.strokeStyle = "#222222";
					ctx.lineWidth = 4;

					var drawing = false;
					var mousePos = { x: 0, y: 0 };
					var lastPos = mousePos;

					function getMousePos(canvasDom, mouseEvent) {
						var rect = canvasDom.getBoundingClientRect();
						return {
							x: mouseEvent.clientX - rect.left,
							y: mouseEvent.clientY - rect.top
						};
					}

					$canvas.on("mousedown", function (e) {
						drawing = true;
						lastPos = getMousePos(canvas, e);
						mousePos = lastPos;
					});

					$canvas.on("mouseup", function () {
						drawing = false;
					});

					$canvas.on("mousemove", function (e) {
						if (drawing) {
							mousePos = getMousePos(canvas, e);
						}
					});

					$canvas.on("touchstart", function (e) {
						e.preventDefault();
						drawing = true;
						var touch = e.touches[0];
						var pos = getMousePos(canvas, touch);
						lastPos = pos;
						mousePos = pos;
					});

					$canvas.on("touchmove", function (e) {
						e.preventDefault();
						if (drawing) {
							var touch = e.touches[0];
							mousePos = getMousePos(canvas, touch);
						}
					});

					$canvas.on("touchend", function (e) {
						e.preventDefault();
						drawing = false;
					});

					function renderCanvas() {
						if (drawing) {
							ctx.beginPath();
							ctx.moveTo(lastPos.x, lastPos.y);
							ctx.lineTo(mousePos.x, mousePos.y);
							ctx.stroke();
							ctx.closePath();
							lastPos = mousePos;
						}
					}

					// Prevent scrolling when touching the canvas
					$(document.body).on("touchstart touchend touchmove", function (e) {
						if (e.target == canvas) {
							e.preventDefault();
						}
					});

					(function drawLoop() {
						requestAnimFrame(drawLoop);
						renderCanvas();
					})();

					function clearCanvas() {
						ctx.clearRect(0, 0, canvas.width, canvas.height);
						ctx.strokeStyle = "#222222";
						ctx.lineWidth = 4;
						lastPos = { x: 0, y: 0 };
						mousePos = lastPos;
					}

					// Set up the UI
					var $sigText = $("#sig-dataUrl");
					var $sigImage = $("#sig-image");
					var $clearBtn = $("#sig-clearBtn");
					var $submitBtn = $("#sig-submitBtn");

					function getBlankSignature() {
						clearCanvas();
						return canvas.toDataURL();
					}

					var blankSignature = getBlankSignature();
					$clearBtn.on("click", function (e) {
						e.preventDefault();
						clearCanvas();
						$sigText.val("Data URL for your signature will go here!");
						$sigImage.attr("src", "");
					});

					$submitBtn.on("click", function (e) {
						const selectedValue = $('input[name="custentity_sub_tier"]:checked').val();
						if (!selectedValue) {
							$("#registration-radio-error").show();
							e.preventDefault();
						} else {
							$("#registration-radio-error").hide();
						}
						var dataUrl = canvas.toDataURL();
						if (dataUrl === blankSignature) {
							$("#registration-signature-error").show();
							e.preventDefault();  // Prevent form submission
						} else {
							$("#registration-signature-error").hide();
							$sigText.val(dataUrl);
							$sigImage.attr("src", dataUrl);
						}
					});
				})();
			});

			return {
				pageHeader: this.page_header,
				title: this.title
			};
		}
	});
});


