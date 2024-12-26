/// <amd-module name="SuiteCommerce.InfiniteScroll.URLHelper"/>
define("SuiteCommerce.InfiniteScroll.URLHelper", ["require", "exports", "underscore", "Backbone"], function (require, exports, _, Backbone) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        updateURL: function (pageNumber) {
            var oldFragment = Backbone.history.getFragment();
            var newFragment = this.generateNewFragment(oldFragment, 'page', pageNumber);
            this.setNewURL(newFragment);
        },
        generateNewFragment: function (oldFragment, parameter, newValue) {
            if (oldFragment.indexOf('?') > -1) {
                if (oldFragment.indexOf(parameter + "=") > -1) {
                    return this.parseFragment(oldFragment, parameter, newValue);
                }
                return oldFragment + ("&" + parameter + "=" + newValue);
            }
            return oldFragment + ("?" + parameter + "=" + newValue);
        },
        parseFragment: function (oldFragment, parameter, newValue) {
            var tempFragment = oldFragment.split('?');
            if (tempFragment && tempFragment[0] && tempFragment[1]) {
                if (tempFragment[1].indexOf(parameter + "=") > -1) {
                    var setParams = _.map(tempFragment[1].split('&'), function (curr) {
                        if (curr.indexOf(parameter) > -1) {
                            return parameter + "=" + newValue;
                        }
                        return curr;
                    });
                    return tempFragment[0] + '?' + setParams.join('&');
                }
            }
            return oldFragment;
        },
        setNewURL: function (newFragment) {
            if (newFragment.length !== 0) {
                Backbone.history.navigate(newFragment, {
                    trigger: false,
                    replace: true,
                });
            }
        },
    };
});
