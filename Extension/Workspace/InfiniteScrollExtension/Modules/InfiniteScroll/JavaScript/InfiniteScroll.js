/// <amd-module name="SuiteCommerce.InfiniteScroll.InfiniteScroll"/>
define("SuiteCommerce.InfiniteScroll.InfiniteScroll", ["require", "exports", "SuiteCommerce.InfiniteScroll.BottomControlView", "SuiteCommerce.InfiniteScroll.URLHelper", "jQuery", "underscore", "SuiteCommerce.InfiniteScroll.TopControlView", "SuiteCommerce.InfiniteScroll.GoToTop.View", "SuiteCommerce.InfiniteScroll.Pagination"], function (require, exports, BottomControlView_1, URLHelper_1, jQuery, _, TopControl_View_1, GoToTop_View_1, Pagination_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        bottomControl: null,
        isEnabled: true,
        replacePagination: function (PLP) {
            this.removePagination(PLP);
            this.manageControls(PLP);
            this.addGoToTopButton(PLP);
        },
        removePagination: function (PLP) {
            PLP.removeChildView(PLP.PLP_VIEW, 'GlobalViews.Pagination', 'GlobalViews.Pagination');
        },
        manageControls: function (PLP) {
            this.addBottomControl(PLP);
            this.addTopControl(PLP);
        },
        addBottomControl: function (PLP) {
            PLP.addChildViews(PLP.PLP_VIEW, {
                'GlobalViews.Pagination': {
                    'InfiniteScroll.BottomControl': {
                        childViewIndex: 1,
                        childViewConstructor: BottomControlView_1.default,
                    },
                },
            });
        },
        addTopControl: function (PLP) {
            PLP.addChildViews(PLP.PLP_VIEW, {
                'Facets.FacetsDisplay': {
                    'InfiniteScroll.TopControl': {
                        childViewIndex: 3,
                        childViewConstructor: TopControl_View_1.default,
                    },
                },
            });
        },
        updatePageURLOnScrollEvent: function () {
            jQuery(document).off('scroll.InfiniteScroll');
            jQuery(document).on('scroll.InfiniteScroll', _.throttle(this.updatePageURL, 500, { leading: false }));
        },
        updatePageURL: function () {
            var currentPage;
            var closestPosToTop;
            var scroll = jQuery(document).scrollTop();
            var firstItemPerPage = Pagination_1.default.getFirstItemPerPage();
            var itemsIds = Object.keys(firstItemPerPage);
            var firstItemsPos = itemsIds.map(function (id) {
                var element = jQuery("[data-view=\"Facets.Items\"] [data-item-id=\"" + id + "\"]");
                if (element.length === 1)
                    return element.offset().top - scroll;
                return Infinity;
            });
            var posiblePagesPositions = firstItemsPos.filter(function (itemPos) { return itemPos <= 0; });
            if (!posiblePagesPositions.length) {
                closestPosToTop = Math.min.apply(Math, firstItemsPos);
            }
            else {
                closestPosToTop = Math.max.apply(Math, posiblePagesPositions);
            }
            var closestItemToTop = itemsIds[firstItemsPos.indexOf(closestPosToTop)];
            currentPage = firstItemPerPage[closestItemToTop];
            if (Pagination_1.default.validPage(currentPage))
                URLHelper_1.default.updateURL(currentPage);
        },
        addGoToTopButton: function (PLP) {
            PLP.addChildViews(PLP.PLP_VIEW, {
                'GlobalViews.Pagination': {
                    'InfiniteScroll.GoToTop': {
                        childViewIndex: 6,
                        childViewConstructor: GoToTop_View_1.GoToTopView,
                    },
                },
            });
        },
        disable: function (PLP) {
            this.isEnabled = false;
            this.bottomControl.visible = true;
            this.bottomControl.render();
            jQuery(document).off('scroll.InfiniteScrollAutoScroll');
        },
        enable: function (PLP) {
            this.isEnabled = true;
            this.bottomControl.hideIfAutoScroll();
            this.bottomControl.render();
        },
    };
});
