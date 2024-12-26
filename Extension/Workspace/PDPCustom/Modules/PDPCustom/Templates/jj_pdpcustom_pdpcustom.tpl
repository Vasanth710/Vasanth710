{{#if detailsSection}}
<div class="details-table-container">
  {{#if showdetails}}
  <table class="details-table">
    <tbody>
      {{#each details}}
      <tr>
        <td class="details-label">{{value}}</td>
        <td>{{data}}</td>
      </tr>
      {{/each}}
    </tbody>
  </table>
  {{else}}
  <span class="details-label">No Data Available</span>
  {{/if}}
</div>
{{/if}}
{{#if pdfSection}}
<div class="pdf-section-container">
  {{#if pdfLink}}
  <div class="pdp-pdf-text">For indication, precautions and dosing & administration, please refer to the Official drug monograph for<a class="pdp-pdf-link" href="{{pdfUrl}}" target="_blank" download="Item Details">{{itemName}}</div>
  </a>
  {{else}}
  <span>No Data Available</span>
  {{/if}}
</div>
{{/if}}