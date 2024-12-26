{{#unless showFormFieldsOnly}}
<p class="login-register-register-form-description">
	{{translate 'Create an account to gain access to drug supply info and shop RedBox Rx™'}}
</p>

<form class="login-register-register-form" method="POST" novalidate>
	<small class="login-register-register-required">{{translate 'Registration questions (all fields mandatory) <span
			class="login-register-register-form-required">*</span>'}}</small>
	{{/unless}}

	<div class="login-register-register-form-controls-group" data-validation="control-group">
		<label class="login-register-register-form-label" for="register-firstname">
			{{translate 'First Name <small class="login-register-register-form-required">*</small>'}}
		</label>
		<div class="login-register-register-form-controls" data-validation="control">
			<input {{#if hasAutoFocus}} autofocus {{/if}} type="text" name="firstname" id="register-firstname"
				class="login-register-register-form-input">
		</div>
	</div>

	<div class="login-register-register-form-controls-group" data-validation="control-group">
		<label class="login-register-register-form-label" for="register-lastname">
			{{translate 'Last Name <small class="login-register-register-form-required">*</small>'}}
		</label>
		<div class="login-register-register-form-controls" data-validation="control">
			<input type="text" name="lastname" id="register-lastname" class="login-register-register-form-input">
		</div>
	</div>

	{{#if showCompanyField}}
	<div class="login-register-register-form-controls-group" data-validation="control-group">
		<label class="login-register-register-form-label" for="register-company">
			{{#if isCompanyFieldRequire}}
			{{translate 'Company <small class="login-register-register-form-required">*</small>'}}
			{{else}}
			{{translate 'Company'}} <small class="login-register-register-form-optional">{{translate
				'(optional)'}}</small>
			{{/if}}
		</label>
		<div class="login-register-register-form-controls" data-validation="control">
			<input type="text" name="company" id="register-company" class="login-register-register-form-input" />
		</div>
	</div>
	{{/if}}

	{{!-- <div class="login-register-register-form-controls-group" data-validation="control-group">
		<label class="login-register-register-form-label" for="register-address">
			{{translate 'Address <small class="login-register-register-form-required">*</small>'}}
		</label>
		<div class="login-register-register-form-controls" data-validation="control">
			<input type="address" name="address" id="register-address" class="login-register-register-form-input">
		</div>
	</div> --}}

	<div class="login-register-register-form-controls-group" data-validation="control-group">
		<label class="login-register-register-form-label" for="register-email">
			{{translate 'Email <small class="login-register-register-form-required">*</small>'}}
		</label>
		<div class="login-register-register-form-controls" data-validation="control">
			<input type="email" name="email" id="register-email" class="login-register-register-form-input"
				placeholder="{{translate 'your@email.com'}}">
		</div>
	</div>

	<div class="login-register-register-form-controls-group" data-validation="control-group">
		<label class="login-register-register-form-label" for="register-phone">
			{{translate 'Phone <small class="login-register-register-form-required">*</small>'}}
		</label>
		<div class="login-register-register-form-controls" data-validation="control">
			<input type="phone" name="custentity_phone_web" id="register-phone" class="login-register-register-form-input">
		</div>
	</div>

	<div class="login-register-register-form-controls-group" data-validation="control-group">
		<label class="login-register-register-form-label" for="register-fax">
			{{translate 'Fax <small class="login-register-register-form-required">*</small>'}}
		</label>
		<div class="login-register-register-form-controls" data-validation="control">
			<input type="text" name="custentity_fax_web" id="register-fax" class="login-register-register-form-input">
		</div>
	</div>

	<div class="login-register-register-form-controls-group" data-validation="control-group">
		<label class="login-register-register-form-label" for="register-mrp">
			{{translate 'Name of Chief Prescriber (MRP) <small
				class="login-register-register-form-required">*</small>'}}
		</label>
		<div class="login-register-register-form-controls" data-validation="control">
			<input type="text" name="custentity_name_mrp" id="register-mrp" class="login-register-register-form-input">
		</div>
	</div>

	<div class="login-register-register-form-controls-group" data-validation="control-group">
		<label class="login-register-register-form-label" for="register-mrp-email">
			{{translate 'MRP Email <small class="login-register-register-form-required">*</small>'}}
		</label>
		<div class="login-register-register-form-controls" data-validation="control">
			<input type="email" name="custentity_mrp_email" id="register-mrp-email" class="login-register-register-form-input">
		</div>
	</div>

	<div class="login-register-register-form-controls-group" data-validation="control-group">
		<label class="login-register-register-form-label" for="register-license">
			{{translate 'Provincial License # <small class="login-register-register-form-required">*</small>'}}
		</label>
		<div class="login-register-register-form-controls" data-validation="control">
			<input type="text" name="custentity_nscs_licensenum" id="register-license"
				class="login-register-register-form-input">
		</div>
	</div>

	{{#if hidePassword}}
	<div class="login-register-register-form-controls-group" data-validation="control-group">
		<label class="login-register-register-form-label" for="register-password">
			{{translate 'Password <small class="login-register-register-form-required">*</small>'}}
		</label>
		<div class="login-register-register-form-controls" data-validation="control">
			<input type="password" name="password" id="register-password" class="login-register-register-form-input">
		</div>
	</div>

	<div class="login-register-register-form-controls-group" data-validation="control-group">
		<label class="login-register-register-form-label" for="register-password2">
			{{translate 'Re-Enter Password <small class="login-register-register-form-required">*</small>'}}
		</label>
		<div class="login-register-register-form-controls" data-validation="control">
			<input type="password" name="password2" id="register-password2" class="login-register-register-form-input">
		</div>
	</div>
	{{/if}}


	<div data-view="Register.CustomFields"></div>

	{{#if isRedirect}}
	<div class="login-register-register-form-controls-group" data-validation="control-group">
		<div class="login-register-register-form-controls" data-validation="control">
			<input value="true" type="hidden" name="redirect">
		</div>
	</div>
	{{/if}}

	<div class="login-register-register-form-controls-group" data-validation="control-group">
		<label class="login-register-register-form-label">{{translate 'What subscription tier are you registering
			for:'}}</label>
		<div class="login-register-register-form-controls" data-validation="control">
			<div class="login-radio-button-container">
				<input type="radio" id="subscription-tier1" name="custentity_sub_tier" value="1">
				<label for="subscription-tier1"><b>Options</b> : Enjoy professional service at no charge and no monthly
					crash cart monitoring. This program is suitable for non-surgical clinics. Regular shipping rates
					apply.</label>
			</div>
			<br>
			<div class="login-radio-button-container">
				<input type="radio" id="subscription-tier2" name="custentity_sub_tier" value="2">
				<label for="subscription-tier2"><b>Priority Plus</b> : Be Inspection Proof at $20 per month with
					MediTrack™ monitoring. You get Priority supply of emergency drugs + free shipping for all orders.
					This program
					is suitable for clinics providing light to moderate sedation.</label>
			</div>
			<br>
			<div class="login-radio-button-container">
				<input type="radio" id="subscription-tier3" name="custentity_sub_tier" value="3">
				<label for="subscription-tier3"><b>Enterprise</b> : Have Peace of Mind at $25 per month. You get all the
					benefits of our Priority Plus Program plus it includes our DrugAssure™ Service where you get
					Priority supply of
					Consumable Drugs (e.g., Anesthetics, Narcotics, Analgesics) + free shipping for all orders. This
					program is suitable for busy clinics, multi-clinic chains, and surgical facilities providing regular
					deep
					sedation.</label>
			</div>
			<p data-validation-error="block" id="register-radio-error">Choose an Subscription tier</p>
		</div>
	</div>

	<div class="login-register-register-form-controls-group">
		<label class="login-register-register-form-label">
			<input type="checkbox" name="emailsubscribe" id="register-emailsubscribe" value="T" {{#if
				isEmailSubscribeChecked}} checked {{/if}}>
			{{translate 'Yes. Please sign me up for RedBox Rx drug shortage notifications and promotional offers.'
			siteName}}
		</label>
	</div>
	<div class="login-register-register-form-messages" data-type="alert-placeholder"></div>

	{{#unless showFormFieldsOnly}}
	<div class="login-register-register-form-controls-group">
		<button type="submit" class="login-register-register-form-submit">
			{{translate 'Create Account'}}
		</button>
	</div>
</form>
{{/unless}}
<div data-cms-area="cms_login_register_register_area" data-cms-area-filters="path"></div>

{{!----
Use the following context variables when customizing this template:

showCompanyField (Boolean)
isCompanyFieldRequire (Boolean)
siteName (String)
showFormFieldsOnly (Boolean)
isRedirect (Boolean)
hasAutoFocus (Boolean)

----}}