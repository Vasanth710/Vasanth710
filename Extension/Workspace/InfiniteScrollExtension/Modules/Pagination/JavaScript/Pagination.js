/// <amd-module name="SuiteCommerce.InfiniteScroll.Pagination"/>
define("SuiteCommerce.InfiniteScroll.Pagination", ["require", "exports", "SuiteCommerce.InfiniteScroll.URLHelper"], function (require, exports, URLHelper_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var PLP;
    var pagination;
    var lowestLoadedPage;
    var highestLoadedPage;
    var lastPage;
    var firstItemPerPage;
    exports.default = {
        initialize: function (PLP) {
            this.PLP = PLP;
            this.pagination = this.PLP.getPagination();
            this.lowestLoadedPage = this.highestLoadedPage = this.currentPage;
            this.firstItemPerPage = {};
        },
        getPreviousPageNumber: function () {
            if (this.hasMorePagesAbove)
                this.lowestLoadedPage--;
            this.lastPage = this.currentPage;
            this.currentPage = this.lowestLoadedPage;
            return this.currentPage;
        },
        getNextPageNumber: function () {
            if (this.hasMorePagesBelow)
                this.highestLoadedPage++;
            this.lastPage = this.currentPage;
            this.currentPage = this.highestLoadedPage;
            return this.currentPage;
        },
        getSearchApiUrl: function () {
            var url = this.PLP.getUrl(this.pagination);
            if (url.lastIndexOf('commercecategoryid') == -1 && url.lastIndexOf('commercecategoryurl') == -1)
                url = this.appendCategoryToURL(url);
            return url;
        },
        appendCategoryToURL: function (url) {
            var categoryInfo = this.PLP.getCategoryInfo();
            if (categoryInfo && categoryInfo.internalid) {
                url = URLHelper_1.default.generateNewFragment(url, 'commercecategoryid', categoryInfo.internalid);
                url = url.replace('sort=relevance', 'sort=commercecategory');
            }
            return url;
        },
        reset: function () {
            this.pagination = this.PLP.getPagination();
            this.lowestLoadedPage = this.highestLoadedPage = this.currentPage;
        },
        restoreNextPage: function () {
            this.highestLoadedPage--;
            this.currentPage = this.lastPage;
        },
        restorePreviousPage: function () {
            this.lowestLoadedPage++;
            this.currentPage = this.lastPage;
        },
        setCurrentPage: function (currentPage) {
            return this.PLP.setCurrentPage({
                currentPage: currentPage,
            });
        },
        get currentPage() {
            if (this.pagination) {
                return this.pagination.currentPage;
            }
            return null;
        },
        set currentPage(pageNumber) {
            this.pagination.currentPage = pageNumber;
        },
        get hasMorePagesBelow() {
            return this.highestLoadedPage < this.pagination.pageCount;
        },
        get hasMorePagesAbove() {
            return this.lowestLoadedPage > 1 && this.validPage(this.currentPage);
        },
        getFirstItemPerPage: function () {
            return this.firstItemPerPage;
        },
        addFirstItemOfPage: function (itemId, page) {
            this.firstItemPerPage[itemId] = page;
        },
        validPage: function (page) {
            return page > 0 && page <= this.pagination.pageCount;
        }
    };
});
