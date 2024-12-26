define(
	'JJ.GateKeeper.GateKeeper',
	[
		'JJ.GateKeeper.GateKeeper.View'
	],
	function (
		GateKeeperView,
	) {
		'use strict';

		return {
			mountToApp: function mountToApp(container) {
				var layout = container.getComponent('Layout');
				layout.addChildView('Header.Logo', function () {
					return new GateKeeperView(container);
				});
			},
		};
	}
);
