define('JJ.CheckoutPrescription.CheckoutPrescription', ['SC.Model', 'underscore', 'Configuration'], function (
	SCModel, _, Configuration
) {
	'use strict';

	return SCModel.extend({
		name: 'JJ.CheckoutPrescription.CheckoutPrescription',

		uploadCheck: function (data) {
			try {
				var folderId = Configuration.get('CheckoutPrescription.config');
				var files = data.files;
				var uploadedFileIds = [];
				if (!files || files.length === 0 || !folderId) {
					return JSON.stringify({
						success: false,
						message: "Missing files or folder ID"
					});
				}
				files.forEach(function (file) {
					var base64 = file.checkData;
					var fileType = file.imagefiletype;
					var fileName = file.imageName;
					if (fileType && base64 && fileName) {
						var uploadedFile = nlapiCreateFile(fileName, fileType, base64);
						uploadedFile.setFolder(folderId);
						var fileId = nlapiSubmitFile(uploadedFile);
						uploadedFileIds.push(fileId);
					}
				});
				return JSON.stringify({
					success: true,
					uploadedFileIds: uploadedFileIds
				});
			} catch (error) {
				nlapiLogExecution("ERROR", "Unexpected Error in uploadCheck", error.toString());
				return JSON.stringify({
					success: false,
					message: "An error occurred while uploading files"
				});
			}
		}
	});
});