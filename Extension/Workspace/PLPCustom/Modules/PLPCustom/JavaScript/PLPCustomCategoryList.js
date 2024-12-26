// @module JJ.PLPCustom.PLPCustom
define('JJ.PLPCustom.Category.View'
    , [
        'jj_custom_category.tpl',
        'Backbone'
    ]
    , function (
        template,
        Backbone
    ) {
        'use strict';
        return Backbone.View.extend({
            events: {
                'click .parent-category-label': 'handleParentCategoryClick'
            },
            handleParentCategoryClick: function (event) {
                var target = $(event.currentTarget);
                var dataId = target.attr('data-id');
                var parentElement = $('[data-parent="' + dataId + '"]');
                $('.parent-category-label').removeClass('active')
                $('.child-categories').hide();
                if (parentElement) {
                    if (parentElement.is(':visible')) {
                        parentElement.hide();
                    } else {
                        parentElement.show();
                    }
                }
                target.toggleClass('active');

            },

            template: template,
            initialize: function (options) {
                this.category = SC.CATEGORIES[0].categories
                this.plp = options.container.getComponent('PLP');
                this.categoryinfo = this.plp.getCategoryInfo();
                this.hasItems = this.plp.getItemsInfo().length > 0;
            },
            getImmediateParentId: function getImmediateParentId(selectOption) {
                const parentIdPath = selectOption;
                const parentIds = parentIdPath.split('|').filter(id => id);
                const immediateParentId = parentIds.length > 1 ? parentIds[parentIds.length - 2] : null;
                return immediateParentId;
            },
            getContext: function getContext() {
                var self = this;
                this.selectOption = this.categoryinfo ? this.categoryinfo.idpath : '';
                this.selectedParent = this.getImmediateParentId(this.selectOption);
                this.selectedChild = this.categoryinfo ? this.categoryinfo.internalid : '';
                _.defer(function () {
                    if (self.selectedParent) {
                        $('.category-container-custom [data-id="' + self.selectedParent + '"]').addClass('active');
                        $('.category-container-custom [data-parent="' + self.selectedParent + '"]').show();
                    }

                    if (self.selectedChild) {
                        $('.category-container-custom [data-childid="' + self.selectedChild + '"]').addClass('active');
                    }
                });
                return {
                    category: this.category,
                    hasItems: this.hasItems
                };
            }
        });
    });
