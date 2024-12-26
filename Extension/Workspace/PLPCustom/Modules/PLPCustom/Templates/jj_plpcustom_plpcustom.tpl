<div class="product-additional-information">
    {{#each mappedDetailsToShow}}
    <div class="product-additional-fields">
        {{#if ../showLabel}}
        <div class="product-additional-label"><b>{{translate value}}</b> - </div>
        {{/if}}
        <div class="product-additional-value" title="{{data}}" itemprop="sku">{{data}}</div>
    </div>
    {{/each}}
</div>