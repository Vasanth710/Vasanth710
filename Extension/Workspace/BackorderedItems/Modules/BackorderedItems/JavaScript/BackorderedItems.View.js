// @module JJ.BackOrderDetail.BackOrderDetail
define('JJ.BackorderedItems.View'
	, [
		'jj_backordereditemslist.tpl',
		'Backbone',
		'JJ.BackorderedItems.Model',
		'GlobalViews.Pagination.View',
		'Utils',
		'Configuration',
		'Profile.Model'
	]
	, function (
		template,
		Backbone,
		BackorderedItemsModel,
		GlobalViewsPaginationView,
		Utils,
		Configuration,
		ProfileModel
	) {
		'use strict';

		return Backbone.View.extend({

			template: template,
			title: Utils.translate('Backordered Items'),
			className: 'BackorderView',
			page_header: Utils.translate('Backordered Items'),
			attributes: {
				id: 'Backordered Items',
				class: 'Backordered Items'
			},

			initialize: function (options) {
				var self = this;
				this.foundItems = true;
				this.noItem = false;
				this.model = new BackorderedItemsModel();
				this.profileModel = ProfileModel.getInstance();
				if (options.routerArguments && options.routerArguments[0]) {
					var params = Utils.parseUrlOptions(options.routerArguments[0]);
					if (params.page) {
						self.page = params.page;
					}
				}
				this.layout = options.layout;
				this.model.fetch({
					data: {
						page: self.page || 1
					}
				}).done(function (result) {
					self.result = result;
					self.render();
				})

			},
			getBreadcrumbPages: function () {
				return {
					text: this.title,
					href: '/Backorder Items'
				};
			},
			getSelectedMenu: function () {
				return 'backorder';
			},
			childViews: {
				'GlobalViews.Pagination': function () {
					var totalItems = this.model.get("totalRecordsFound");
					var perPage = this.model.get("recordsPerPage");
					if (totalItems > 0) {
						return new GlobalViewsPaginationView(_.extend({
							totalPages: (totalItems / perPage)
						}, Configuration.defaultPaginationSettings));
					}
				},

			},
			getContext: function getContext() {
				if (this.model.get('records')) {
					this.noItem = false;
					this.foundItems = true;
					if (this.model.get('records').length > 0) {
						this.noItem = true;
						this.foundItems = false;
					} else {
						this.noItem = false;
						this.foundItems = false;
					}
				}
				else {
					self.foundItems = false;
					this.noItem = false;
				}
				return {
					items: this.model.get('records'),
					foundItems: this.foundItems,
					noItem: this.noItem,
					title: this.title,
				};
			}
		});
	});
