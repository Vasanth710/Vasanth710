<div class="registration-container">
  <header class="registration-header">
    <h1 class="registration-title">{{pageHeader}}</h1>
    <div id="registration-header-cms" class="registration-header-cms" data-cms-area="registration-header-cms"
      data-cms-area-filters="path"></div>
  </header>

  <div id="registration-form-cms" class="registration-form-cms" data-cms-area="registration-form-cms"
    data-cms-area-filters="path"></div>
  <div class="registration-alert-placeholder" data-type="alert-placeholder"></div>

  <form id="registration-form" action="POST" class="registration-form">
    <div class="registration-content-basic">

      <small class="registration-required">
        {{translate 'Required'}}<span class="registration-form-required">*</span>
      </small>

      <div class="registration-form-controls-group" data-validation="control-group">
        <label class="registration-form-label">
          {{translate 'Company Name <small class="registration-form-required">*</small>'}}
        </label>
        <div class="registration-form-controls" data-validation="control">
          <input type="text" name="companyname" id="companyname" onblur="this.value=this.value.trim()"
            class="registration-form-input">
        </div>
      </div>

      <div class="registration-form-controls-group" data-validation="control-group">
        <label class="registration-form-label">
          {{translate 'Corporate Chain Affiliation (DSO) <small class="registration-form-required">*</small>'}}
        </label>
        <div class="registration-form-controls" data-validation="control">
          <input type="text" name="custentity_parent_company" id="custentity_parent_company"
            class="registration-form-input">
        </div>
      </div>

      <div class="registration-form-controls-group" data-validation="control-group">
        <label class="registration-form-label">
          {{translate 'Ship to street<small class="registration-form-required">*</small>'}}
        </label>
        <div class="registration-form-controls" data-validation="control">
          <input type="text" name="addr1" id="addr1" class="registration-form-input">
        </div>
      </div>

      <div class="registration-form-controls-group" data-validation="control-group">
        <label class="registration-form-label">
          {{translate 'Unit # <small class="registration-form-required">*</small>'}}
        </label>
        <div class="registration-form-controls" data-validation="control">
          <input type="text" name="addr2" id="addr2" class="registration-form-input">
        </div>
      </div>

      <div class="registration-form-controls-group" data-validation="control-group">
        <label class="registration-form-label">
          {{translate 'City <small class="registration-form-required">*</small>'}}
        </label>
        <div class="registration-form-controls" data-validation="control">
          <input type="text" name="city" id="city" class="registration-form-input">
        </div>
      </div>

      <div class="registration-form-controls-group" data-validation="control-group">
        <label class="registration-form-label">
          {{translate 'Province <small class="registration-form-required">*</small>'}}
        </label>
        <div class="registration-form-controls" data-validation="control">
          <select name="state" id="state" class="registration-form-input">
            <option value="">Please select your Province*</option>
            <option value="AB">Alberta</option>
            <option value="BC">British Columbia</option>
            <option value="MB">Manitoba</option>
            <option value="NB">New Brunswick</option>
            <option value="NL">Newfoundland</option>
            <option value="NT">Northwest Territories</option>
            <option value="NS">Nova Scotia</option>
            <option value="NU">Nunavut</option>
            <option value="ON">Ontario</option>
            <option value="PE">Prince Edward Island</option>
            <option value="QC">Quebec</option>
            <option value="SK">Saskatchewan</option>
            <option value="YT">Yukon</option>
          </select>
        </div>
      </div>

      <div class="registration-form-controls-group" data-validation="control-group">
        <label class="registration-form-label">
          {{translate 'Postal Code <small class="registration-form-required">*</small>'}}
        </label>
        <div class="registration-form-controls" data-validation="control">
          <input type="text" name="zip" id="zip" class="registration-form-input">
        </div>
      </div>

      <div class="registration-form-controls-group" data-validation="control-group" data-input="country">
        <label class="registration-form-label">
          {{translate 'Country <small class="registration-form-required">*</small>'}}
        </label>
        <div class="registration-form-controls" data-validation="control">
          <select name="country" id="country" class="registration-form-input">
            <option value="CA">CANADA</option>
          </select>
        </div>
      </div>

      <div class="registration-form-controls-group" data-validation="control-group">
        <label class="registration-form-label">
          {{translate 'Office Phone number <small class="registration-form-required">*</small>'}}
        </label>
        <div class="registration-form-controls" data-validation="control">
          <input type="text" data-type="phone" name="custentity_phone_web" id="custentity_phone_web"
            class="registration-form-input">
        </div>
      </div>

      <div class="registration-form-controls-group" data-validation="control-group">
        <label class="registration-form-label">
          {{translate 'Fax number <small class="registration-form-required">*</small>'}}
        </label>
        <div class="registration-form-controls" data-validation="control">
          <input type="text" data-type="phone" name="custentity_fax_web" id="custentity_fax_web"
            class="registration-form-input">
        </div>
      </div>

      <div class="registration-form-controls-group" data-validation="control-group">
        <label class="registration-form-label">
          {{translate 'General office email <small class="registration-form-required">*</small>'}}
        </label>
        <div class="registration-form-controls" data-validation="control">
          <input type="email" name="email" id="email" onblur="this.value=this.value.trim()"
            class="registration-form-input">
        </div>
      </div>

      <div class="registration-form-controls-group" data-validation="control-group">
        <label class="registration-form-label">
          {{translate 'Delivery Hours <small class="registration-form-required">*</small>'}}
        </label>
        <div class="registration-form-controls" data-validation="control">
          <input type="text" name="comments" id="comments" class="registration-form-input">
        </div>
      </div>

      <div class="registration-form-controls-group" data-validation="control-group" hidden>
        <label class="registration-form-label">
          {{translate 'Referral Link <small class="registration-form-required">*</small>'}}
        </label>
        <div class="registration-form-controls" data-validation="control">
          <input type="text" name="custentity_referral_id" id="register-referral-link" class="registration-form-input"
            value="{{custId}}">
        </div>
      </div>

      <div class="registration-form-controls-group" data-validation="control-group">
        <label class="registration-form-label">{{translate 'Subscription Tier'}} <small
            class="registration-form-required">*</small></label>
        <div class="registration-form-radio-section">
          <input type="radio" name="custentity_sub_tier" id="tier-basic" value="1" class="registration-form-radio">
          <label value="1" for="tier-basic"><b>Options&nbsp;:&nbsp;</b>Enjoy professional service at no charge. Does not
            include monthly monitoring. This program is suitable for non-surgical clinics. Regular shipping rates
            apply.</label>
        </div>
        <div class="registration-form-radio-section">
          <input type="radio" name="custentity_sub_tier" id="tier-standard" value="2" class="registration-form-radio">
          <label value="2" for="tier-standard"><b>Priority Plus&nbsp;:&nbsp;</b>Be inspection proof at $30 per month
            with
            MediTrack™ monitoring. You get Priority supply emergency drugs + free shipping for all orders. This
            program is suitable for clinics providing light to moderate sedation.</label>
        </div>
        <p data-validation-error="block" id="registration-radio-errors">
        </p>
        <p data-validation-error="block" id="registration-radio-error">Choose a Subscription tier</p>
      </div>

    </div>

    <div class="registration-content-office-contact">

      <h2 class="registration-content-office-contact-heading">Office Contact (main contact person)</h2>

      <div class="registration-form-controls-group" data-validation="control-group">
        <label class="registration-form-label">
          {{translate 'Name <small class="registration-form-required">*</small>'}}
        </label>
        <div class="registration-form-controls" data-validation="control">
          <input type="text" name="contact_name" id="contact_name" onblur="this.value=this.value.trim()"
            class="registration-form-input">
        </div>
      </div>

      <div class="registration-form-controls-group" data-validation="control-group">
        <label class="registration-form-label">
          {{translate 'Title <small class="registration-form-required">*</small>'}}
        </label>
        <div class="registration-form-controls" data-validation="control">
          <input type="text" name="contact_title" id="contact_title" class="registration-form-input">
        </div>
      </div>

      <div class="registration-form-controls-group" data-validation="control-group">
        <label class="registration-form-label">
          {{translate 'Email <small class="registration-form-required">*</small>'}}
        </label>
        <div class="registration-form-controls" data-validation="control">
          <input type="email" name="contact_email" id="contact_email" onblur="this.value=this.value.trim()"
            class="registration-form-input">
        </div>
      </div>

    </div>

    <div class="registration-content-mrp">

      <h2 class="registration-content-mrp-heading">MRP (Most responsible prescriber)/ Chief prescriber
      </h2>

      <div class="registration-form-controls-group" data-validation="control-group">
        <label class="registration-form-label">
          {{translate 'First Name <small class="registration-form-required">*</small>'}}
        </label>
        <div class="registration-form-controls" data-validation="control">
          <input type="text" name="mrp_name" id="mrp_name" onblur="this.value=this.value.trim()"
            class="registration-form-input">
        </div>
      </div>

      <div class="registration-form-controls-group" data-validation="control-group">
        <label class="registration-form-label">
          {{translate 'Last Name <small class="registration-form-required">*</small>'}}
        </label>
        <div class="registration-form-controls" data-validation="control">
          <input type="text" name="mrp_surname" id="mrp_surname" onblur="this.value=this.value.trim()"
            class="registration-form-input">
        </div>
      </div>

      <div class="registration-form-controls-group" data-validation="control-group">
        <label class="registration-form-label">
          {{translate 'Title <small class="registration-form-required">*</small>'}}
        </label>
        <div class="registration-form-controls" data-validation="control">
          <input type="text" name="mrp_title" id="mrp_title" class="registration-form-input">
        </div>
      </div>

      <div class="registration-form-controls-group" data-validation="control-group">
        <label class="registration-form-label">
          {{translate 'Provincial License # <small class="registration-form-required">*</small>'}}
        </label>
        <div class="registration-form-controls" data-validation="control">
          <input type="text" name="custentity_nscs_licensenum" id="custentity_nscs_licensenum"
            class="registration-form-input">
        </div>
      </div>

      <div class="registration-form-controls-group" data-validation="control-group">
        <label class="registration-form-label">
          {{translate 'Private Email <small class="registration-form-required">*</small>'}}
        </label>
        <div class="registration-form-controls" data-validation="control">
          <input type="text" name="mrp_email" id="mrp_email" onblur="this.value=this.value.trim()"
            class="registration-form-input">
        </div>
      </div>

      <!-- Content -->
      <div class="e-signature-container">
        <div class="row">
          <div class="col-md-12">
            <h5>E-Signature*</h5>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <canvas id="sig-canvas" width="300" height="150">
            </canvas>
          </div>
        </div>
        <p data-validation-error="block" id="registration-signature-error">Please provide your signature.</p>
        <div class="row">
          <div class="col-md-12" id="signature-button">
            <button class="btn-clear" id="sig-clearBtn">Clear Signature</button>
            <button class="btn-submit" id="sig-submitBtn">Submit</button>
          </div>
        </div>
        <br />
        <div class="row" id="textarea-image">
          <div class="col-md-12">
            <textarea name="image" id="sig-dataUrl" class="form-control"
              rows="5">Data URL for your signature will go here!</textarea>
          </div>
        </div>
        <br />
        <div class="row" id="img-sig-image">
          <div class="col-md-12">
            <img id="sig-image" src="" alt="Your signature will go here!" />
          </div>
        </div>
      </div>
    </div>

    <div id="registration-extras-cms" class="registration-extras-cms" data-cms-area="registration-extras-cms"
      data-cms-area-filters="path"></div>

  </form>
</div>
</div>