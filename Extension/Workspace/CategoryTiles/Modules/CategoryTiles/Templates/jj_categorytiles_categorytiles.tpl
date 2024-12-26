<div class="row category-tile-container">
  {{#each data}}
  <a href="{{link}}" class="category-tile">
      <div class="col-6 col-sm-6 col-lg-4 category-tile-section">
        <img class="category-tile-image" src="{{img}}" alt="{{altText}}">
        {{!-- <div class="category-label">
        <span class="category-tile-text">{{name}}</span>
        <i class="category-arrow-icon"></i>
        </div> --}}
        </div>
      </a>
  {{/each}}
</div>