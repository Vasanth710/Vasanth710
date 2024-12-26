{{!-- Edited for Threads Theme --}}
<div class="facets-item-cell-list" itemprop="itemListElement" data-item-id="{{itemId}}" data-track-productlist-list="{{track_productlist_list}}" data-track-productlist-category="{{track_productlist_category}}" data-track-productlist-position="{{track_productlist_position}}" data-sku="{{sku}}">
	<div class="facets-item-cell-list-right">
		<h2 class="facets-item-cell-list-title">
			{{#if itemIsNavigable}}
				<a class="facets-item-cell-list-name" href='{{url}}'>
					<span itemprop="name">
						{{name}}
					</span>
				</a>
			{{else}}
				<span itemprop="name">
					{{name}}
				</span>
			{{/if}}
		</h2>

		<div class="facets-item-cell-list-price">
			<div data-view="ItemViews.Price"></div>
		</div>

		<div data-view="Cart.QuickAddToCart"></div>

		{{#if showRating}}
		<div class="facets-item-cell-list-rating" itemprop="aggregateRating" data-view="GlobalViews.StarRating">
		</div>
		{{/if}}

		<div data-view="ItemDetails.Options"></div>

		<div class="facets-item-cell-list-stock">
			<div data-view="ItemViews.Stock" class="facets-item-cell-list-stock-message"></div>
		</div>

		<div data-view="StockDescription"></div>
	</div>
</div>
</a>




{{!----
Use the following context variables when customizing this template: 
	
	itemId (Number)
	name (String)
	url (String)
	sku (String)
	isEnvironmentBrowser (Boolean)
	thumbnail (Object)
	thumbnail.url (String)
	thumbnail.altimagetext (String)
	itemIsNavigable (Boolean)
	showRating (Boolean)
	rating (Number)

----}}

