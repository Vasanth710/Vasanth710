<div class="line-edit-modal">
    <h3>Add New Items</h3>
    <div data-view="QuickAddView"></div>
    <p data-validation-error="block" id="noitems-error">You can't proceed without any items. Please add at least one
        item.</p>
    <p data-validation-error="block" id="controlled-items-error">You can't add this item while editing an Order. This is a
        controlled Item</p>
    <hr>
    <h2>Edit Items</h2>
    {{#each filteredData}}
    <li line-id="{{internalid}} item-{{itemID}}" data-item="{{itemID}}"
        class="line-item-edit {{#if removeItem}}removeItem{{/if}}">
        <div class="line-item-name col-8">{{itemName}}
            {{#if controlled}}
            <br>
            <small>Controlled Item, cant be updated</small>
            {{/if}}
        </div>
        {{#if controlled}}
        <input class="line-item-qty line-{{internalid}}" disabled data-item="{{itemID}}" data-action="disabled" type="number" min="{{quantity}}"
            value="{{quantity}}">
            <a class="message-icon-close" disabled data-item="{{itemID}}" data-action="disabled"></a>
        {{else}}
        <input class="line-item-qty line-{{internalid}}" data-item="{{itemID}}" type="number" min="{{quantity}}"
            value="{{quantity}}">
        <a class="message-icon-close" data-item="{{itemID}}" data-action="remove"></a>
        {{/if}}

    </li>
    {{/each}}
    <a data-action="submit" class="order-history-summary-button-download-pdf button-small line-edit-button">Submit</a>
</div>