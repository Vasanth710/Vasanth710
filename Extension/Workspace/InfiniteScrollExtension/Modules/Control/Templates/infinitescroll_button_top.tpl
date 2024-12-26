{{#if isActive}}
<div class="infinite-scroll-btn-holder arrow-up">
  {{#if showSpinner}}
  <i class="icon-spinner"></i>
  {{else}}
  <a data-action="load-pages" class="infinite-scroll-btn-load-page arrow-up">
    <i class="icon-chevron-up arrow-up"></i>
    <p>{{ label }}</p>
  </a>
  {{/if}}
</div>
{{/if}}

