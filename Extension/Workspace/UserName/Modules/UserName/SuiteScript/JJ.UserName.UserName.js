define('JJ.UserName.UserName', [
    'SC.Model',
    'LiveOrder.Model',
    'Application',
    'Profile.Model',
    'underscore'
], function (
    SCModel,
    LiveOrderModel,
    Application,
    Profile,
    _
) {
    'use strict';

    _.extend(SCModel, {
        contact: function (email) {
            try {
                var searchFilters = [
                    ["email", "is", email]
                ];
                var searchColumns = [
                    new nlobjSearchColumn("entityid"),
                    new nlobjSearchColumn("company"),
                    new nlobjSearchColumn("firstname"),
                    new nlobjSearchColumn("lastname")
                ];
                var contactSearch = Application.getAllSearchResults('contact', searchFilters, searchColumns) || {};
                return {
                    response: contactSearch
                };
            } catch (error) {
                nlapiLogExecution('ERROR', 'ERROR@contact_search', JSON.stringify(error));
                return {
                    err: error
                };
            }
        },

        getContactDetails: function () {
            try {
                var user = Profile.get();
                var contactSearch = this.contact(user.email);
                var contactDetails = {};
                if (contactSearch.response && contactSearch.response[0]) {
                    var firstName = contactSearch.response[0].getValue('firstname');
                    var lastName = contactSearch.response[0].getValue('lastname');
                    var contactName = firstName + ' ' + lastName;
                    var companyName = contactSearch.response[0].getText('company');

                    contactDetails = {
                        firstName: firstName,
                        lastName: lastName,
                        contactName: contactName,
                        companyName: companyName
                    };
                }

                return contactDetails;
            } catch (e) {
                nlapiLogExecution('ERROR', 'error@LIVEORDER_MODEL', JSON.stringify(e));
                throw e;
            }
        }
    });

    return SCModel;
});
