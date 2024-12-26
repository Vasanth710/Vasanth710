define("JJ.registrationForm.registrationForm.Model"
    , [
        "Backbone.CachedModel",
        "Utils",
        "underscore"
    ], function (
        BackboneCachedModel,
        Utils,
        _
    ) {
    "use strict";
    return BackboneCachedModel.extend({
        urlRoot: Utils.getAbsoluteUrl(
            getExtensionAssetsPath(
                "services/registrationForm.Service.ss"
            )
        ),
        validation: {
            companyname: {
                required: true,
                msg: _('Please provide a Company Name.').translate()
            },
            custentity_parent_company: {
                required: true,
                msg: _('Please provide a Parent Company Name.').translate()
            },
            addr1: {
                required: true,
                msg: _('Please provide a valid Street address.').translate()
            },
            addr2: {
                required: true,
                msg: _('Please provide a valid Unit.').translate()
            },
            city: {
                required: true,
                msg: _('Please provide a City.').translate()
            },
            state: {
                required: true,
                msg: _('Please select a Province.').translate()
            },
            zip: {
                required: true,
                msg: _('Please provide a valid Postal Code.').translate()
            },
            country: {
                required: true,
                msg: _('Please select a Country.').translate()
            },
            custentity_phone_web: {
                required: true,
                pattern: /^\(\d{3}\) \d{3}-\d{4}$/,
                msg: _('Please enter a valid phone number of 10 digits.').translate()
            },
            custentity_fax_web: {
                required: true,
                pattern: /^\(\d{3}\) \d{3}-\d{4}$/,
                msg: _('Please enter a valid fax number of 10 digits.').translate()
            },
            email: {
                required: true,
                pattern: 'email',
                msg: _('Please provide a valid Email.').translate()
            },
            comments: {
                required: true,
                msg: _('Please provide delivery hours.').translate()
            },
            contact_name: {
                required: true,
                msg: _('Please provide a Contact Name.').translate()
            },
            contact_title: {
                required: true,
                msg: _('Please provide a Contact Title.').translate()
            },
            contact_email: {
                required: true,
                pattern: 'email',
                msg: _('Please provide a valid office Contact Email.').translate()
            },
            mrp_name: {
                required: true,
                msg: _('First name is required.').translate()
            },
            mrp_surname: {
                required: true,
                msg: _('Last name is required.').translate()
            },
            mrp_title: {
                required: true,
                msg: _('Title is required.').translate()
            },
            custentity_nscs_licensenum: {
                required: true,
                msg: _('Provincial license is required.').translate()
            },
            mrp_email: {
                required: true,
                pattern: 'email',
                msg: _('Please provide a valid email address.').translate()
            },
            image: {
                required: true,
                msg: _('Please provide a signature.').translate()
            }
        },

        parse: function (response) {
            return response;
        }
    });
});
