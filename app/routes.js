//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here

router.use((req, res, next) => {
    // we don't want to save journey or step between navigations
    req.session.data['journey'] = req.query.journey ? parseInt(req.query.journey) : ""
    req.session.data['step'] = req.query.step ? parseInt(req.query.step) : ""
    res.locals.currentUrl = req.originalUrl
    next()
})