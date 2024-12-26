{{!---- Edited for Threads ----}}

<nav class="header-menu-secondary-nav">


    <div class="header-menu-search search-link">
        <button class="header-menu-search-link" data-action="show-sitesearch" title="{{translate 'Search'}}">

        </button>
    </div>


    <ul class="header-menu-level1">

        {{#each categories}}
        {{#if text}}
        <li {{#if categories}}data-toggle="categories-menu" {{/if}}>
            <a class="{{class}}" {{objectToAtrributes this}}>
                {{translate text}}
            </a>
            {{#if categories}}
            <ul class="header-menu-level-container">
                <li>
                    <ul class="header-menu-level2">
                        {{#each categories}}
                        <li {{#if categories}}class="categories-menu-arrow" {{/if}}>
                            <a class="{{class}}" {{objectToAtrributes this}}>{{translate text}}</a>

                            {{#if categories}}
                            <ul class="header-menu-level3">
                                {{#each categories}}
                                <li>
                                    <a class="{{class}}" {{objectToAtrributes this}}>{{translate text}}</a>
                                </li>
                                {{/each}}
                            </ul>
                            {{/if}}
                        </li>
                        {{/each}}
                    </ul>
                </li>
            </ul>
            {{/if}}

        </li>
        {{/if}}
        {{/each}}
        {{#if showSitesearch}}
        <div data-view="SiteSearch"></div>
        {{/if}}
    </ul>
</nav>