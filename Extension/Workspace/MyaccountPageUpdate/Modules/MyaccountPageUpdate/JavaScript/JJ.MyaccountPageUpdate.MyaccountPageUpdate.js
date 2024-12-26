
define(
	'JJ.MyaccountPageUpdate.MyaccountPageUpdate'
,   [
		'Address.Edit.Fields.View',
		'jj_myaccount_address_edit.tpl',
		'GlobalViews.CountriesDropdown.View'
        , 'GlobalViews.States.View'
		, 'jj_global_views_countriesDropdown.tpl'
		, 'jj_global_views_states.tpl'
	]
,   function (
	AddressEditFieldsView,
	jj_myaccount_address_edit_tpl,
		CountriesDropdownView,
        GlobalViewsStatesView,
		jj_global_views_countriesDropdown_tpl,
		jj_global_views_states_tpl
		
	)
{
	'use strict';

	return  {
		mountToApp: function mountToApp(container) {
			_.extend(AddressEditFieldsView.prototype, {
				template: jj_myaccount_address_edit_tpl,
				childViews: _.extend(AddressEditFieldsView.prototype.childViews, {
					CountriesDropdown: function() {
						this.selected_country = 'CA';
						var filteredCountry =  {
							"CA": this.options.countries.CA
						};
						return new CountriesDropdownView({
							countries: filteredCountry,
							selectedCountry: this.selected_country,
							manage: this.options.manage
						});
					},
					StatesView: function() {
						var filteredCountry =  {
							"CA": this.options.countries.CA
						};
						return new GlobalViewsStatesView({
							countries: filteredCountry,
							selectedCountry: "CA",
							selectedState: this.model.get('state'),
							manage: this.manage
						});
					}
				})
			})
			_.extend(CountriesDropdownView.prototype, {
				template: jj_global_views_countriesDropdown_tpl,
			});
			_.extend(GlobalViewsStatesView.prototype, {
				template: jj_global_views_states_tpl,
			});
		}
	};
});
