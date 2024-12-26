<div data-view="fav-notification"></div>
<h2 class="fav-heading">Favourites</h2>
<hr>
<div class="custom-checkbox">
  <label for="fav-selectbox">
    <input type="checkbox" name="select-all-checkbox" id="fav-selectbox" {{#unless showCollection}} disabled
      {{/unless}}>
    Select All Items
    <span class="checkbox-label" for="fav-selectbox"></span>
  </label>
</div>
<hr>


{{#if showCollection}}
<div data-view="Fav.Collection"></div>

{{#if showPagination}}
<div class="order-history-list-case-list-paginator">
  <div data-view="GlobalViews.Pagination"></div>
</div>
{{/if}}

<div class="fav-button-container">
  <button class="remove-fav-items" disabled>Remove From List</button>
  <button class="add-fav-items" disabled>Add Items To Cart</button>
</div>
{{else}}

{{#if isLoading}}
<div class="loading">
  <h2>Loading</h2>
  <span><i></i><i></i><i></i><i></i></span>
</div>
{{else}}
<div class="no-fav-found"> <span>You don't have any favorite items.</span></div>
{{/if}}

{{/if}}