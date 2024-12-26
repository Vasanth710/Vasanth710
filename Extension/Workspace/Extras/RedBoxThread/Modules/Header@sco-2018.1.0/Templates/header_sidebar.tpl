{{!-- Edited for Threads Theme --}}

<div class="header-sidebar-wrapper">
	<div class="header-logo-wrapper">
		<div data-view="Header.SideBarLogo.View"></div>
	</div>

	<div class="header-sidebar-menu-wrapper" data-type="header-sidebar-menu">
		<ul class="header-sidebar-menu">
			<li><a href="/" id="" data-touchpoint="home" data-hashtag="#/" name="Home">Home</a></li>
			<li class=""><a href="/" id="2" data-touchpoint="home" data-action="push-menu" name="About "
					aria-disabled="true">
					About<i class="header-sidebar-menu-push-icon"></i></a>
				<ul>
					<li><a href="#" class="header-sidebar-menu-back" data-action="pop-menu" name="back-sidebar"
							aria-disabled="true"><i class="header-sidebar-menu-pop-icon"></i>Back
						</a></li>
					<li><a href="/about-us" data-hashtag="#/about-us" id="" data-touchpoint="home" aria-disabled="true">
							About Us </a></li>
					<li><a href="/our-story" data-hashtag="#/our-story" id="" data-touchpoint="home"
							aria-disabled="true">
							Our Story
						</a></li>
					<li><a href="/meet-team" data-hashtag="#/meet-team" id="" data-touchpoint="home"
							aria-disabled="true">
							Meet Our Team
						</a></li>
				</ul>
			</li>
			<div class="header-sidebar-profile-menu" data-view="Header.Profile"></div>
			{{#if showExtendedMenu}}
			<li class="header-sidebar-menu-myaccount" data-view="Header.Menu.MyAccount"></li>
			{{/if}}
			<li><a href="/categories" data-hashtag="#/categories" id="3" data-touchpoint="home"
					name="Place An Order">Place An Order</a></li>
			<li><a href="/faq" id="" data-hashtag="#/faq" data-touchpoint="home" name=" FAQs">FAQs</a></li>
			<li><a href="/contact-us" data-hashtag="#/contact-us" id="" data-touchpoint="home" name="Contact Us">Contact
					Us</a></li>
			<li><a href="/search" data-hashtag="#/search" id="" data-touchpoint="home" name="All Products">All 
						Products</a></li>

			<li class="header-menu-quickorder-mobile" data-view="QuickOrderHeaderLink">
			<li class="header-menu-requestquote-mobile" data-view="RequestQuoteWizardHeaderLink">
			<li class="header-menu-locator-mobile" data-view="StoreLocatorHeaderLink">
		</ul>
	</div>

	{{#if showExtendedMenu}}
	<a class="header-sidebar-user-logout" href="#" data-touchpoint="logout" name="logout">
		<i class="header-sidebar-user-logout-icon"></i>
		{{translate 'Sign Out'}}
	</a>
	{{/if}}

	{{#if showLanguages}}
	<div data-view="Global.HostSelector"></div>
	{{/if}}
	{{#if showCurrencies}}
	<div data-view="Global.CurrencySelector"></div>
	{{/if}}

</div>



{{!----
Use the following context variables when customizing this template:

categories (Array)
showExtendedMenu (Boolean)
showLanguages (Boolean)
showCurrencies (Boolean)

----}}