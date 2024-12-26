<div class="order-wizard-paymentmethod-purchasenumber-module">
	<h3 class="order-wizard-paymentmethod-purchasenumber-module-title">
		{{translate 'Purchase Order Number'}}
	</h3>
	<div class="order-wizard-paymentmethod-purchasenumber-module-row">
		<label for="purchase-order-number" id="order-wizard-paymentmethod-purchasenumber"
			class="order-wizard-paymentmethod-purchasenumber-module-purchase-order-label">
			{{translate 'Enter Purchase Order Number'}}
		</label>
		<input type="text" name="purchase-order-number" id="purchase-order-number"
			class="order-wizard-paymentmethod-purchasenumber-module-purchase-order-value" value="{{purchaseNumber}}">
	</div>
	<!-- Add the error message container -->
	<div id="purchase-history-error-message" class="order-wizard-paymentmethod-purchasenumber-error-message"></div>
</div>

{{!----
The context variables for this template are not currently documented. Use the {{log this}} helper to view the context
variables in the Console of your browser's developer tools.

----}}