// JJ.CheckoutPrescription.CheckoutPrescription.js
// Load all your starter dependencies in backend for your extension here
// ----------------

define('JJ.CheckoutPrescription.CheckoutPrescription'
	, [
		'CheckoutPrescription.ServiceController',
		'SC.Model', 'underscore', 'Configuration'
	]
	, function (
		CheckoutPrescriptionServiceController,
		SCModel, _, Configuration
	) {
		'use strict';
		return SCModel.extend({
			name: 'JJ.CheckoutPrescription.CheckoutPrescription',
			uploadPrescription: function (data) {
				try {
					nlapiLogExecution("DEBUG", "inside uploadcheck function");
					var objects = data;
					var base64 = objects.checkData;
					var fileType = objects.imagefiletype;
					var fileName = objects.imageName;
					var folderId = Configuration.get('CheckoutPrescription.config')
					if (fileType && folderId) {

						nlapiLogExecution("DEBUG", "fileType", fileType);
						var checkImage = nlapiCreateFile(fileName, fileType, base64);

						checkImage.setFolder(folderId);
						try {
							var checkImageId = nlapiSubmitFile(checkImage);
							nlapiLogExecution("DEBUG", "checkImageId", checkImageId);
							var url = checkImage.getURL(); // Get the URL of the file
							nlapiLogExecution("DEBUG", "url", url);
							var name = checkImage.getName(); // Get the name of the file
							nlapiLogExecution("DEBUG", "name", name);
							var type = checkImage.getType();

							if (checkImageId) {
								return JSON.stringify({ success: true, checkImageId: checkImageId, message: "Uploaded the prescription copy successfully" })
							} else {
								return JSON.stringify({ success: false, message: "prescription copy not Uploaded" })
							}

						} catch (submitError) {
							console.error("Submit File Error:", submitError);
							return JSON.stringify({ success: false, message: "Error submitting the file" })
						}


					}
					else {
						return JSON.stringify({ success: false, message: "File type or folder ID is missing" });
					}
				} catch (error) {
					console.error(error);
					return JSON.stringify({ success: false, message: "Something Went wrong" })
				}
			}
		});
	});