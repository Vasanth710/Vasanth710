<div class="order-wizard-add-date-and-comments-module">
  <!-- Section for expected delivery date -->
  <div class="order-wizard-add-date-section">
    <h3 class="order-wizard-delivery-date-module-title">
      {{translate 'Expected Delivery Date'}}<span
				class="order-wizard-paymentmethod-purchasenumber-module-purchase-order-optional"> {{ translate
				'(Required)' }} </span>
    </h3>
    <br>
    <p class="order-wizard-address-module-message-show">{{translate deliveryDateDesc}}</p>
    <br>
    <input class="list-header-view-delivery-body-input" id="selected-date" name="selected-date" type="text" id="dateField"
      placeholder="Delivery Date" data-start-date="{{startDate}}" autocomplete="off" data-format="mm/dd/yyyy" value="{{date}}"
      data-action="save-date" data-todayhighlight="true" />
      <div id="date-error-message"></div>
  </div>

  <!-- Section for comments -->
  <div class="order-wizard-add-comments-section">
    <h3 class="order-wizard-add-comments-module-title">
      {{translate 'Add Comments Here'}}
    </h3>

    <div class="order-wizard-add-comments-module-row">
      <textarea class="order-wizard-add-comments-module-values {{text}}" id="comments-on-order" name="addcomments"
        placeholder="Write your comments here" data-action="save-comments"></textarea>
    </div>
  </div>

  <!-- Section for office hours text -->
  <div class="order-wizard-office-hours-section">
    <h3 class="order-wizard-office-hours-module-title">
      {{translate 'Office Hours'}}
    </h3>

    <div class="office-hours-section">
      {{#if officeHoursInfo}}
      {{{officeHoursInfo}}}
      {{else}}
      <p>
        Our office hours for inquiries and communications are:
        <br>
        Monday to Friday: 9:00 AM - 5:00 PM
        <br>
        Saturday: 10:00 AM - 2:00 PM
        <br>
        Sunday: Closed
      </p>
      {{/if}}
    </div>
  </div>
</div>