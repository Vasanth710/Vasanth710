<div class="product-details-information-content">
	{{#if showInformation}}
	<div class="product-details-information-content-container">

		<div id="banner-content-top" class="content-banner banner-content-top"></div>

		<div role="tabpanel">
			{{!-- When more than one detail is shown, these are the tab headers --}}
			<ul class="product-details-information-content-tabs" role="tablist">
				{{#each details}}
				<li class="product-details-information-tab-title {{#if @first}} active {{/if}}" role="presentation">
					<a href="#" data-action="selected-tab" data-id="{{@index}}"
						data-target="#product-details-information-tab-{{@index}}" data-toggle="tab">{{name}}</a>
				</li>
				{{/each}}
			</ul>
			{{!-- Tab Contents --}}
			<div class="product-details-information-tab-content" data-type="information-content"
				data-action="tab-content">
				{{#each details}}
				<div role="tabpanel" class="product-details-information-tab-content-panel {{#if @first}}active{{/if}} {{itemprop}}"
					id="product-details-information-tab-{{@index}}" {{#if @first}}itemprop="description" {{/if}}
					data-id="product-details-information-{{ @index }}">
					{{#if ../showHeader}}<h2 class="product-details-information-tab-content-panel-title">{{name}}</h2>{{/if}}
					<h2 class="product-details-information-tab-content-panel-title mobile-view-site-search product-detail-information-heading">{{name}}</h2>
					<div id="product-details-information-tab-content-container-{{@index}}"
						class="product-details-information-tab-content-container" data-type="information-content-text">
						{{{content}}}</div>
				</div>
				{{/each}}
			</div>
		</div>
		<div id="banner-content-bottom" class="content-banner banner-content-bottom"></div>
	</div>
	{{/if}}
</div>



{{!----
Use the following context variables when customizing this template:

showInformation (Boolean)
showHeader (Boolean)
details (Array)

----}}