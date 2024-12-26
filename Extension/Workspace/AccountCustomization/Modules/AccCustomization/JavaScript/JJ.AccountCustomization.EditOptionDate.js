
define('JJ.AccountCustomization.EditOptionDate'
    , [
        'OrderWizard.Step'
    ]
    , function (
        WizardStep
    ) {
        'use strict';
        return {
            mountToApp: function mountToApp(container) {
                _.extend(WizardStep.prototype, {
                    submit: _.wrap(WizardStep.prototype.submit, function submit(fn) {
                        var originalPromise = fn.apply(this, _.toArray(arguments).slice(1));
                        function formatDate(date) {
                            const year = date.getUTCFullYear();
                            const month = String(date.getUTCMonth() + 1).padStart(2, '0');
                            const day = String(date.getUTCDate()).padStart(2, '0');
                            const hours = String(date.getUTCHours()).padStart(2, '0');
                            const minutes = String(date.getUTCMinutes()).padStart(2, '0');
                            const seconds = String(date.getUTCSeconds()).padStart(2, '0');

                            return `${month}/${day}/${year % 100} ${hours}:${minutes}:${seconds}`;
                        }

                        const currentDateGMTFormatted = formatDate(new Date());
                        this.wizard.model.attributes.options.custbody_order_time = currentDateGMTFormatted;
                        return originalPromise;
                    })
                });
            }
        };
    });
