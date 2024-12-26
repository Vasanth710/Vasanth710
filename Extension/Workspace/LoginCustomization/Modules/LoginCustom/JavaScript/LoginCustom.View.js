// @module JJ.LoginCustomization.LoginCustom
define('JJ.LoginCustomization.LoginCustom.View'
,	[
	'jj_logincustomization_logincustom.tpl'
	
	,	'JJ.LoginCustomization.LoginCustom.SS2Model'
	
	,	'Backbone'
    ]
, function (
	jj_logincustomization_logincustom_tpl
	
	,	LoginCustomSS2Model
	
	,	Backbone
)
{
    'use strict';

	// @class JJ.LoginCustomization.LoginCustom.View @extends Backbone.View
	return Backbone.View.extend({

		template: jj_logincustomization_logincustom_tpl

	,	initialize: function (options) {

			/*  Uncomment to test backend communication with an example service
				(you'll need to deploy and activate the extension first)
			*/

			// this.model = new LoginCustomModel();
			// var self = this;
         	// this.model.fetch().done(function(result) {
			// 	self.message = result.message;
			// 	self.render();
      		// });
		}

	,	events: {
		}

	,	bindings: {
		}

	, 	childViews: {

		}

		//@method getContext @return JJ.LoginCustomization.LoginCustom.View.Context
	,	getContext: function getContext()
		{
			//@class JJ.LoginCustomization.LoginCustom.View.Context
			this.message = this.message || 'Hello World!!'
			return {
				message: this.message
			};
		}
	});
});
