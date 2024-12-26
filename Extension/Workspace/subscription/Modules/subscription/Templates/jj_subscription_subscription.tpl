<section class="subscription-info-card">
  <span class="subscription-info-card-content">
    {{#if IsInActive}}
    <h2><b>Meditrack Subscription Status</b></h2>
    <table class="subscription-table-desktop">
      <tr>
        <th>Start Date</th>
        <th>Activated On</th>
        <th>Last Billing</th>
        <th>Next Billing</th>
        <th>Status</th>
        <th>Hold Reason</th>
      </tr>
      <tr>
        <td>{{StartDate}}</td>
        <td>{{ActivateDate}}</td>
        <td>{{BillingDate}}</td>
        <td>{{NextBillingDate}}</td>
        <td>{{SubscriptionStatus}}</td>
        <td>{{HoldReason}}</td>
      </tr>
    </table>
    <table class="subscription-table-mobile">
      <tr>
        <td>Start Date</td>
        <td>{{StartDate}}</td>
      </tr>
      <tr>
        <td>Activated On</td>
        <td>{{ActivateDate}}</td>
      </tr>
      <tr>
        <td>Last Billing</td>
        <td>{{BillingDate}}</td>
      </tr>
      <tr>
        <td>Next Billing</td>
        <td>{{NextBillingDate}}</td>
      </tr>
      <tr>
        <td>Status</td>
        <td>{{SubscriptionStatus}}</td>
      </tr>
      <tr>
        <td>Hold Reason</td>
        <td>{{HoldReason}}</td>
      </tr>
    </table>
    {{#if SubscriptionCancelled}}
    <p class="subscription-unsubscribe-status">Your Meditrack subscription has been cancelled.</p>
    {{else}}
    <div class="subscription-unsubscribe-section">
      <p class="subscription-unsubscribe-heading">Please provide a reason and click the button below to unsubscribe from
        the Meditrack subscription.</p>
      <div class="subscription-controls-group" data-input="unsubscribe_reason" data-validation="control-group">
        <label class="subscription-label" for="unsubscribe_reason">
          {{translate 'Reason <small class="subscription-required">*</small>'}}
        </label>
        <div class="subscription-group-controls" data-validation="control">
          <textarea name="unsubscribe_reason" id="unsubscribe_reason" class="subscription-input"></textarea>
        </div>
        <div id="unsubscribe-validation-message" class="unsubscribe-validation-message">Please provide a
          reason.
        </div>
      </div>
      <button type="submit" class="subscription-unsubscribe-button" data-action="unsubscribe">
        Unsubscribe
      </button>
    </div>
    {{/if}}
    <div class="subscription-contact-us">Please <a href="/contact-us" data-hashtag="#/contact-us" data-touchpoint="home"
        class="subscription-contact-us-link">Contact Us</a> for your queries and to subscribe again if your subscription
      got cancelled.</div>
    {{else}}
    <h2><b>Subscribe to Meditrack Subscription.</b></h2>
    <div id="subscription-Subscribe">
      <div class="subscription-controls-group">
        <div class="subscription-controls">
          <label class="subscription-label">
            <input type="checkbox" id="subscription" data-type="subscription-checkbox" value="T"
              data-unchecked-value="F">
            Yes, I would like to Subscribe for Meditrack.
          </label>
        </div>
        <div class="subscription-controls-submit">
          <button type="submit" data-action="subscribe" class="subscription-submit" disabled>Subscribe</button>
        </div>
        <div class="failure-validation-message" id="failure-validation-message"></div>
      </div>
    </div>
    {{/if}}
  </span>
</section>