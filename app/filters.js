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