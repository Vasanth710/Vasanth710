// @module JJ.PDPCustom.PDPCustom
define('JJ.PDPCustom.PDFTab.View'
    , [
        'jj_pdpcustom_pdpcustom.tpl',
        'Backbone'
    ]
    , function (
        jj_pdpcustom_pdpcustom_tpl,
        Backbone
    ) {
        'use strict';
        return Backbone.View.extend({

            template: jj_pdpcustom_pdpcustom_tpl,
            initialize: function (options) {
                var pdp = this.options.application.getComponent('PDP');
                this.item = _.isEmpty(pdp.getSelectedMatrixChilds())
                    ? pdp.getItemInfo().item
                    : pdp.getSelectedMatrixChilds()[0];
                this.detailsToShow = SC.CONFIGURATION.PDPDetailsTab.data

                var self = this;
                this.pdfUrl = self.item["custitem_pdf_monograph"];
                this.itemName = self.item["storedisplayname2"]
            },
            getContext: function getContext() {
                var self = this;
                var domain = SC.ENVIRONMENT.siteSettings.touchpoints.home;
                return {
                    pdfUrl: domain + this.pdfUrl,
                    pdfSection: true,
                    pdfLink: !_.isEmpty(self.pdfUrl),
                    itemName: this.itemName
                };
            }
        });
    });
