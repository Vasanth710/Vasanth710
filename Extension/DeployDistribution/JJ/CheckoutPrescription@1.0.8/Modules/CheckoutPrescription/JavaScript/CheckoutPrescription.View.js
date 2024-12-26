// @module JJ.CheckoutPrescription.CheckoutPrescription
define('JJ.CheckoutPrescription.CheckoutPrescription.View'
	, [
		'jj_checkoutprescription_checkoutprescription.tpl',
		'Wizard.Module',
		'JJ.CheckoutPrescription.CheckoutPrescription.Model',
		'GlobalViews.Message.View',
		'Utils',
		'underscore',

	]
	, function (
		jj_checkoutprescription_checkoutprescription_tpl
		, WizardModule,
		CheckoutPrescriptionModel,
		GlobalViewsMessageView,
		Utils,
		_
	) {
		'use strict';
		var fileUploaded = false;
		var uploadedFileName = '';
		// @class JJ.CheckoutPrescription.CheckoutPrescription.View @extends Backbone.View
		return WizardModule.extend({

			template: jj_checkoutprescription_checkoutprescription_tpl,
			events: {
				'click [data-action="check-submit-action"]': 'uploadPrescription'
			},
			uploadPrescription: function uploadPrescription(e) {
				jQuery('#prescription-error-message').hide()
				var setImgid = this.model.attributes.options.custbody_jj_prescriptiondata
				e.preventDefault();
				this.prescriptionModel = new CheckoutPrescriptionModel()
				var self = this;
				var chosenFileName = jQuery("input#in-modal-Check-input-file").val();
				if (fileUploaded && chosenFileName === uploadedFileName) {
					// Prevent re-upload if the file is already uploaded
					return;
				}
				var x = jQuery("input#in-modal-Check-input-file").val()
				if (jQuery("input#in-modal-Check-input-file").val()) {
					try {

						var readerMTL = new FileReader();
						const oFile = document.getElementById("in-modal-Check-input-file").files[0];
						if (oFile.size > 26214400) // 25 MB for bytes.
						{
							//alert("File size exeeds 25 MB! Please upload file with size less than 25 MB!");
							var message = "File size exeeds 25 MB! Please upload file with size less than 25 MB"
							var global_view_message = new GlobalViewsMessageView({
								message: message,
								type: 'error',
								closable: true,
							});
							jQuery('.msgafteruploadprescriptionfield').hide();
							jQuery('.fileprescriptionformaterrormessage').hide()
							jQuery('.msguploadprescriptionfield').show()
							var msgContainerParent = jQuery('.msguploadprescriptionfield');
							msgContainerParent.html(global_view_message.render().$el.html());
							return false;
						}
						readerMTL.readAsDataURL($('input#in-modal-Check-input-file')[0].files[0]);
						//console.log()
						readerMTL.onload = function (reader) {
							var mtlFile = reader.currentTarget.result;
							mtlFile = mtlFile.replace('data:;base64,', '');
							var field = {
								allowTypes: {
									'pdf': 'PDF',
									'jpg': 'JPGIMAGE',
									'png': 'PNGIMAGE',
									'jpeg': 'JPGIMAGE',
									'doc': 'WORD',
									'docx': 'WORD'
								}
							}
							var logomtlFile = document.getElementById('in-modal-Check-input-file').files[0];
							var fileExt = logomtlFile.name.substr((logomtlFile.name.lastIndexOf('.') + 1));
							if (_.isArray(_.keys(field.allowTypes)) && _.keys(field.allowTypes).length > 0) {
								if (!_.contains(_.keys(field.allowTypes), fileExt)) {
									var message = "File type not allowed"
									var global_view_message = new GlobalViewsMessageView({
										message: message,
										type: 'error',
										closable: true,
									});
									jQuery('.msgafteruploadprescriptionfield').hide();
									jQuery('.fileprescriptionformaterrormessage').hide()
									jQuery('.msguploadprescriptionfield').show()
									var msgContainerParent = jQuery('.msguploadprescriptionfield');
									msgContainerParent.html(global_view_message.render().$el.html());
								} else {
									var imagefiletype = field.allowTypes[fileExt]
									var base644 = mtlFile.split("base64,")
									var b64resizimg = base644[1];
									var file = document.getElementById('in-modal-Check-input-file').files[0];
									var timestamp = new Date().getTime();
									var fileName = file.name.replace(/\.[^/.]+$/, "") + "_" + timestamp + "." + fileExt;

									if (file) {
										var objCheckUpload = {
											checkData: b64resizimg,
											imageName: fileName,
											imagefiletype: imagefiletype,
										}
										$('.modal-Upload-check-class-modal').addClass("showloadingUpload")
										self.prescriptionModel.save({ data: (objCheckUpload) }).done(function (result) {
											$('.modal-Upload-check-class-modal').removeClass("showloadingUpload")
											if (result) {
												jQuery('.fileprescriptionformaterrormessage').hide()
												jQuery('.msguploadprescriptionfield').hide();
												var message = result.message
												var checkImageId = result.checkImageId
												var options = self.model.get('options');

												if (options && options.custbody_jj_prescriptiondata !== undefined) {
													options.custbody_jj_prescriptiondata = JSON.stringify(checkImageId);
												} else {
													console.error("Field 'custbody_jj_prescriptiondata' not found in model's options.");
												}
												var global_view_message = new GlobalViewsMessageView({
													message: message,
													type: 'success',
													closable: true,
												});
												jQuery('.msguploadprescriptionfield').show();
												var msgContainerParent = jQuery('.msguploadprescriptionfield');
												msgContainerParent.html(global_view_message.render().$el.html());
												fileUploaded = true;
												uploadedFileName = chosenFileName;
											}
										});
									}

								}
							}
						}
					} catch (error) {
						console.log('Erroir in getting the file details', error);
					}

				} else {
					try {
						var message = "No file uploaded"
						var global_view_message = new GlobalViewsMessageView({
							message: message,
							type: 'error',
							closable: true,
						});
						jQuery('.msgafteruploadprescriptionfield').hide();
						jQuery('.fileprescriptionformaterrormessage').hide()
						jQuery('.msguploadprescriptionfield').show()
						var msgContainerParent = jQuery('.msguploadprescriptionfield');
						msgContainerParent.html(global_view_message.render().$el.html());
					} catch (error) {
						console.log('Error in Upload prescription error', error);
					}

				}
			},
			submit: function () {
				var SignatureControlledcheck = false
				var lines = this.model.attributes.lines.length
				var cartItems = this.model.attributes.lines.models
				var Controlled;
				cartItems.forEach(function (item) {
					var eachItem = item.get('item') ? item.get('item') : null;
					if (!!eachItem) {
						Controlled = item.attributes.item.attributes.class
						if (Controlled === 'Controlled : Signature Controlled') {
							SignatureControlledcheck = true;
							return; // Exit the loop early if prescription is true
						}
					}
				});
				var chooseFile = jQuery("#in-modal-Check-input-file").val()
				jQuery('#prescription-error-message').show()
				if (_.isEmpty(chooseFile)) {
					this.model.attributes.options.custbody_jj_prescriptiondata = "";
					jQuery('.msguploadprescriptionfield').hide()
				}
				var prescriptionFieldValuenew = this.model.attributes.options.custbody_jj_prescriptiondata;
				var poErrorMessage = document.getElementById('prescription-error-message');
				if (prescriptionFieldValuenew == '' && SignatureControlledcheck == true) {
					var errorMessage = Utils.translate('Prescrition is mandatory. Please Upload.');
					var global_view_message = new GlobalViewsMessageView({
						message: errorMessage,
						type: 'error',
						closable: true
					});
					if (poErrorMessage) {
						this.$('#prescription-error-message')
							.empty()
							.append(global_view_message.render().$el.html());
					}
					return jQuery.Deferred().reject();  // Prevent form submission
				}
				else {
					if (poErrorMessage) {
						poErrorMessage.innerHTML = ''; // Clear the error message
					}
					return jQuery.Deferred().resolve(); // Allow form submission
				}

			}
			//@method getContext @return JJ.CheckoutPrescription.CheckoutPrescription.View.Context
			, getContext: function getContext() {
				//@class JJ.CheckoutPrescription.CheckoutPrescription.View.Context
				var SignatureControlled = false;
				var Controlled;
				var lines = this.model.attributes.lines.length
				var cartItems = this.model.attributes.lines.models
				cartItems.forEach(function (item) {
					var eachItem = item.get('item') ? item.get('item') : null;
					if (!!eachItem) {
						Controlled = item.attributes.item.attributes.class
						if (Controlled === 'Controlled : Signature Controlled') {

							SignatureControlled = true;
							return; // Exit the loop early if prescription is true
						}
					}
				});
				return {
					SignatureControlled: SignatureControlled
				}
			}
		});
	});
