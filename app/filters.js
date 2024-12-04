//
// For guidance on how to create filters see:
// https://prototype-kit.service.gov.uk/docs/filters
//

const govukPrototypeKit = require('govuk-prototype-kit')
const addFilter = govukPrototypeKit.views.addFilter

// Add your filters here

addFilter('stepFor', function (steps, field) {
    const step = steps?.findIndex(step => step.field === field);
    if (step !== -1) return { step, ...steps[step] };
})

addFilter('slugify', function(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '_')           // Replace spaces with _
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '_')         // Replace multiple - with single _
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
});

addFilter('padStart', function(number, targetLength, padString) {
  return number.toString().padStart(targetLength, padString);
});
