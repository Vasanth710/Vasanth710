<div class="welcome-Message">
  <div class="order-wizard-add-user-name new">
    <h3 class="order-wizard-add-user">
      {{#if UserName}}
        {{translate 'Hi, '}} {{UserName}}
      {{else}}
        {{translate 'Hi '}} {{CompanyName}}
      {{/if}}
    </h3>
  </div>
  {{#if CompanyName}}
    {{#if UserName}}
      <div class="order-wizard-add-user-name new">
        <h3 class="order-wizard-add-user">
          &nbsp;{{translate 'From '}} {{CompanyName}}
        </h3>
      </div>
    {{/if}}
  {{/if}}
</div>
