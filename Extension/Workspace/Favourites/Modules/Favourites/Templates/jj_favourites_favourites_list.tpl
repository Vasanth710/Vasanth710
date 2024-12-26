<div class="col-md-1 fav-align-center custom-checkbox mobile-view-checkbox">
    <label for="fav-{{item.internalid}}">
        <input type="checkbox" class="fav-checkboxs single-item" name="fav-{{item.internalid}}"
            id="fav-{{item.internalid}}" data-fav="{{item.internalid}}" data-record="{{recId}}">
        <span class="checkbox-label" for="fav-{{item.internalid}}"></span>
    </label>
    <i class="fav-display-clear-icon mobile-view-icon" data-record="{{recId}}"></i>
</div>

{{!-- <div class="col-md-2 fav-align-center nav-pdp"> --}}
    <!-- <a href={{urlComponent}} class="hidden-tag" data-touchpoint="home" data-hashtag={{urlComponent}}>-->





    <div class="col-md-1 fav-align-center nav-pdp mobile-view-icon">
        <a href={{urlComponent}} class="hidden-tag" data-touchpoint="home"
            data-hashtag={{urlComponent}}>{{item.storedisplayname2}}</a>
    </div>
    <div class="col-md-3 fav-align-center nav-pdp">
        <!-- <a href={{urlComponent}} class="hidden-tag" data-touchpoint="home" data-hashtag={{urlComponent}}>
        <h6>{{item.displayname}}</h6>
    </a>-->
        <span class="fav-display-product-name">
            {{item.storedisplayname2}}
        </span>
        <div data-view="ItemViews.Stock"></div>
        {{!-- <div data-view="Quantity.Pricing"></div> --}}
    </div>
    <div class="col-md-2 fav-align-center price-section" data-id="{{item.internalid}}">
        <div data-view="Item.Price"></div>
    </div>
    <div class="col-md-2 fav-align-center ">
        <div class="number">
            <span type="button" class="minus" data-action="decrease">-</span>
            <input type="number" id="fav-qty" min="1" value="1" />
            <span class="plus" data-action="increase">+</span>
        </div>
    </div>
    <div class="col-md-1 fav-align-center desktop-view-icon">
        <i class="fav-display-clear-icon" data-record="{{recId}}"></i>
    </div>