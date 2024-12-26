<div class="order-wizard-shipmethod-module">
  {{#if showTitle}}
  <h3 class="order-wizard-shipmethod-module-title">
    {{title}}
  </h3>
  {{/if}}
  {{#if showEnterShippingAddressFirst}}
  <div class="order-wizard-shipmethod-module-message">
    {{translate 'Warning: Please enter a valid shipping address first'}}
  </div>
  {{else}}
  {{#if showLoadingMethods}}
  <div class="order-wizard-shipmethod-module-message">
    {{translate 'Loading...'}}
  </div>
  {{else}}
  {{#if hasShippingMethods}}
  <div class="selected-shipping-method-box">
    {{#each shippingMethods}}
    {{#if isActive}}
    <a data-action="select-delivery-option-radio"
      class="order-wizard-shipmethod-module-option {{#if isActive}}order-wizard-shipmethod-module-option-active{{/if}}"
      data-value="{{internalid}}">
      <input type="radio" {{#if isActive}}checked{{/if}} class="order-wizard-shipmethod-module-checkbox" />
      <span class="order-wizard-shipmethod-module-option-name">{{name}}
        <span class="order-wizard-shipmethod-module-option-price">{{rate_formatted}}</span>
      </span>
    </a>
    {{/if}}
    {{/each}}
  </div>
  <h3 class="Shipping-item-ground-delivery-heading">Optional add-ons</h3>
  <div class="Shipping-item-container">
    <input type="checkbox" id="ground-9am" class="ground-9am ground-delivery" name="ground-delivery" {{#if
      isGround9amChecked}}checked{{/if}}>
    <span class="ground-9am-label">Ground by 9am</span>
    <small>(Additional charges will be added)</small><br>
    <input type="checkbox" id="ground-12pm" class="ground-12am ground-delivery" name="ground-delivery" {{#if
      isGround12pmChecked}}checked{{/if}}>
    <span class="ground-12am-label">Ground by 12pm (noon)</span>
    <small>(Additional charges will be added)</small>
  </div>
  {{#if selectedDeliveryTime}}
  <div class="order-wizard-shipmethod-delivery-message">
    {{deliveryMessage}}
  </div>
  {{/if}}
  {{else}}
  <div class="order-wizard-shipmethod-module-message">
    {{translate 'Warning: No Delivery Methods are available for this address'}}
  </div>
  {{/if}}
  {{/if}}
  {{/if}}
  <div data-view="OrderWizard.AfterShippingMethods"></div>
</div>