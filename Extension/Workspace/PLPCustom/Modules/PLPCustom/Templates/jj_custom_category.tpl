{{#if hasItems}}
<div class="category-container-custom">
<div class="facets-faceted-navigation-item-facet-group-expander">
    <h4 class="facets-faceted-navigation-item-facet-group-title">Category</h4>
</div>
{{#each category}}
<div class="category">
    <span class="parent-category-label" data-id="{{internalid}}">{{name}}</span>
    {{#if categories.length}}
    <div class="child-categories" data-parent="{{internalid}}">
        <ul>
            {{#each categories}}
            <li>
                <a href="{{fullurl}}" data-childid="{{internalid}}">{{name}}</a>
            </li>
            {{/each}}
        </ul>
    </div>
    {{/if}}
</div>
{{/each}}
</div>
{{/if}}

