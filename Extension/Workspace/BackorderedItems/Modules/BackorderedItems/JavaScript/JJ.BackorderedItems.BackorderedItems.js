
define(
	'JJ.BackorderedItems.BackorderedItems'
	, [
		'JJ.BackorderedItems.View',
		'jj_backordereditemslist.tpl',
		'Utils'
	]
	, function (
		BackOrderDetailView,
		template,
		Utils
	) {
		'use strict';

		return {
			mountToApp: function mountToApp(container) {

				var layout = container.getComponent('Layout');

				try {
					if (layout) {

						var myaccountmenu = container.getComponent("MyAccountMenu");
						myaccountmenu.addGroupEntry({
							groupid: 'orders',
							id: 'backorder',
							name: Utils.translate('Backorder Items'),
							url: 'backorders',
							index: 4
						});

						if (myaccountmenu) {

							var pageType = container.getComponent('PageType');
							pageType.registerPageType({
								name: 'BackorderItems',
								routes: ['backorders'],
								view: BackOrderDetailView,
								defaultTemplate: {
									name: 'jj_backordereditemslist.tpl',
									displayName: 'Backorder Items',
								},
								options: { application: container }
							});
						}
					}

				}
				catch (e) {
					console.log("In Entry Point Catch Block", e);
				}


			}
		};
	});
