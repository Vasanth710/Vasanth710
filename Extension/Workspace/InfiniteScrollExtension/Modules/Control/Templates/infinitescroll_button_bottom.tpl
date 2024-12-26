{{#if isActive}}
<div class="col-md-9 col-md-offset-3 infinite-scroll-ctrl-bottom">
  <div class="infinite-scroll-btn-holder arrow-down">
    {{#if showSpinner}}
    <i class="icon-spinner"></i>
    {{else}}
    {{#if visible}}
    <a data-action="load-pages" class="infinite-scroll-btn-load-page arrow-down">
      <p>{{ label }}</p>
      <i class="icon-chevron-down arrow-down"></i>
    </a>
    {{/if}}
    {{/if}}
  </div>
</div>
{{/if}}

