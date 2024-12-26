{{!-- Edited for Threads Theme --}}
<div class="header-container-image">
    <section class="login-register">

        <div data-view="Messages"></div>

        <div {{#if showRegister}} class="login-register-body" {{else}} class="login-register-body-colored" {{/if}}>

            {{#if showLogin}}
            <div class="login-register-wrapper-column-login">
                <div class="login-register-wrapper-login" data-view="Login"></div>
            </div>
            {{/if}}

            <div class="login-register-wrapper-column-register">
                <div class="login-register-wrapper-register">
                    <h2>{{config.registerHeading}}</h2>
                    <div class="register-page-content">{{{config.registerContent}}}</div>
                    <button class="registration-page-url"><a class="registration-page-link"
                            href="/lead-form">Register</a>
                    </button>
                </div>
            </div>

            {{#if showRegisterOrGuest}}
            <div class="login-register-wrapper-column-register">
                <div class="login-register-wrapper-register">
                    <h2 class="login-register-title-register">{{translate 'New customer'}}</h2>

                    {{#if showCheckoutAsGuest}}
                    <div class="login-register-wrapper-guest" data-view="CheckoutAsGuest"></div>
                    {{/if}}

                    {{#if showRegister}}
                    <div class="{{#if showCheckoutAsGuest}}collapse{{/if}} " data-view="Register" id="register-view">
                    </div>
                    {{/if}}
                </div>
            </div>
            {{/if}}

        </div>
    </section>
</div>



{{!----
Use the following context variables when customizing this template:

showRegister (Boolean)
showCheckoutAsGuest (Boolean)
showLogin (Boolean)
showRegisterOrGuest (Boolean)

----}}