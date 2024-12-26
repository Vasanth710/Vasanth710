define(
    'JJ.Restrict404.Restrict404',
    [
        'ApplicationLayout'
    ],
    function (
        ApplicationLayout
    ) {
        'use strict';

        return {
            mountToApp: function mountToApp(container) {
                _.extend(ApplicationLayout.prototype, {
                    notFound: function () {
                        var home = SC.CONFIGURATION.Restrict404.url ? SC.CONFIGURATION.Restrict404.url : SC.getSessionInfo().touchpoints.home;
                        window.location.href = home;
                    }
                });
                // Return the extended ApplicationLayout class
                return ApplicationLayout;
            }
        };
    }
);
