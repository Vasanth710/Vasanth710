define('JJ.CheckoutPrescription.CheckoutPrescription.View'
	, [
		'jj_checkoutprescription_checkoutprescription.tpl',
		'Wizard.Module',
		'JJ.CheckoutPrescription.CheckoutPrescription.Model',
		'GlobalViews.Message.View',
		'Utils',
		'underscore',
		'jQuery'
	],
	function (
		jj_checkoutprescription_checkoutprescription_tpl,
		WizardModule,
		CheckoutPrescriptionModel,
		GlobalViewsMessageView,
		Utils,
		_,
		jQuery
	) {
		'use strict';
		return WizardModule.extend({
			template: jj_checkoutprescription_checkoutprescription_tpl,

			events: {
				'click [data-action="check-submit-action"]': 'uploadPrescription'
			},

			uploadPrescription: function (e) {
				e.preventDefault();
				jQuery('#prescription-error-message').hide();
				// Fetch selected files
				var files = jQuery('#in-modal-Check-input-file')[0].files;
				if (!files.length) {
					this.displayError("No files uploaded");
					return;
				}
				var allowedFileTypes = ['pdf', 'jpg', 'png', 'jpeg', 'doc', 'docx'];
				var self = this;
				var fileDataArray = [];
				// Loop through files and validate
				Array.from(files).forEach(function (file) {
					var fileExt = file.name.split('.').pop().toLowerCase();
					// File type validation
					if (!allowedFileTypes.includes(fileExt)) {
						self.displayError(`File type "${fileExt}" not allowed.`);
						return;
					}
					// File size validation
					if (file.size > 26214400) { // 25 MB limit
						self.displayError(`File "${file.name}" exceeds 25 MB size limit`);
						return;
					}
					// Process valid file
					var reader = new FileReader();
					reader.onload = function (event) {
						var base64 = event.target.result.split(',')[1];
						var timestamp = new Date().getTime();
						var fileName = file.name.replace(/\.[^/.]+$/, "") + "_" + timestamp + "." + fileExt;
						fileDataArray.push({
							checkData: base64,
							imageName: fileName,
							imagefiletype: self.getFileType(file)
						});
						// Save files if all are processed
						if (fileDataArray.length === files.length) {
							self.saveFiles(fileDataArray);
						}
					};
					reader.readAsDataURL(file);
				});
			},

			saveFiles: function (fileDataArray) {
				var model = new CheckoutPrescriptionModel();
				$('.modal-Upload-check-class-modal').addClass("showloadingUpload");
				model.save({ files: fileDataArray }).done(function (response) {
					$('.modal-Upload-check-class-modal').removeClass("showloadingUpload");
					if (response.success) {
						var uploadedFileIds = response.uploadedFileIds.join(',');
						// Save the IDs in the model's attributes
						var options = this.model.get('options');
						if (options) {
							options.custbody_uploaded_file_ids = uploadedFileIds;
						}
						this.displaySuccess("File(s) uploaded successfully");
					} else {
						this.displayError(response.message || "Failed to upload files");
					}
				}.bind(this)).fail(function () {
					$('.modal-Upload-check-class-modal').removeClass("showloadingUpload");
					this.displayError("An error occurred during the file upload");
				}.bind(this));
			},

			getFileType: function (file) {
				var types = {
					'pdf': 'PDF',
					'jpg': 'JPGIMAGE',
					'png': 'PNGIMAGE',
					'jpeg': 'JPGIMAGE',
					'doc': 'WORD',
					'docx': 'WORD'
				};
				var ext = file.name.split('.').pop().toLowerCase();
				return types[ext];
			},

			displayError: function (message) {
				var global_view_message = new GlobalViewsMessageView({
					message: message,
					type: 'error',
					closable: true
				});
				jQuery('.msguploadprescriptionfield').html(global_view_message.render().$el.html()).show();
			},

			displaySuccess: function (message) {
				var global_view_message = new GlobalViewsMessageView({
					message: message,
					type: 'success',
					closable: true
				});
				jQuery('.msguploadprescriptionfield').html(global_view_message.render().$el.html()).show();
			},

			submit: function () {
				var SignatureControlledcheck = false;
				var cartItems = this.model.attributes.lines.models;
				// Check if any item is "Controlled : Signature Controlled"
				cartItems.forEach(function (item) {
					var Controlled = item.attributes.item.attributes.class;
					if (Controlled === 'Controlled : Signature Controlled') {
						SignatureControlledcheck = true;
					}
				});
				// Get the uploaded file IDs
				var uploadedFileIds = this.model.attributes.options.custbody_uploaded_file_ids;
				// Check for error message container
				var poErrorMessage = document.getElementById('prescription-error-message');
				// If no files uploaded and the flag is true, display error
				if (!uploadedFileIds && SignatureControlledcheck) {
					var errorMessage = Utils.translate('Prescription is mandatory. Please Upload.');
					var global_view_message = new GlobalViewsMessageView({
						message: errorMessage,
						type: 'error',
						closable: true
					});
					// Append error message to the container
					if (poErrorMessage) {
						this.$('#prescription-error-message')
							.empty()
							.append(global_view_message.render().$el.html())
							.show(); // Ensure the container is visible
					}
					return jQuery.Deferred().reject(); // Prevent navigation
				}
				// Clear the error message if validation passes
				if (poErrorMessage) {
					poErrorMessage.innerHTML = ''; // Clear the error message
				}
				return jQuery.Deferred().resolve(); // Allow navigation
			},

			getContext: function () {
				var SignatureControlled = false;
				var cartItems = this.model.attributes.lines.models;
				cartItems.forEach(function (item) {
					var Controlled = item.attributes.item.attributes.class;
					if (Controlled === 'Controlled : Signature Controlled') {
						SignatureControlled = true;
					}
				});
				return { SignatureControlled: SignatureControlled };
			}
		});
	});