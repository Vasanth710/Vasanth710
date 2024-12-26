{{#if SignatureControlled}}
<div class="order-wizard-paymentmethod-purchasenumber-module">
  <h3 class="order-wizard-paymentmethod-purchasenumber-module-title">
    {{translate 'Upload a prescription for any narcotic, controlled or benzodiazepines in your order'}}
  </h3>
  <div class="order-wizard-paymentmethod-purchasenumber-module-row">
    <section class="order-history-details-order-uploadCheck">
      <div class="file-select-popup" id="file-select-popup">
        <p class="file-upload-validation">The file formats that can be uploaded are: .pdf, .jpg, .jpeg, .png, .doc, and
          .docx.</p>
        <div class="file-upload">
          <div class="file-select">
            <div class="file-select-button" id="file-name">Choose File</div>
            <input type="file" data-action="input-action" name="Check-input-file" id="in-modal-Check-input-file"
              accept="image/png, image/jpeg,application/pdf">
          </div>
        </div>
        <br>
        <input data-action="check-submit-action" id="check-submit-btn" type="submit" value="Submit"
          class="order-history-summary-button-uploadCheck">
        <div>
          <small class="msgafteruploadprescriptionfield"></small>
          <small class="msguploadprescriptionfield"></small>
          <small class="fileprescriptionformaterrormessage"></small>
        </div>
      </div>
    </section>
  </div>
  <div id="prescription-error-message" class="order-wizard-paymentmethod-prescription-error-message"></div>
</div>
{{/if}}