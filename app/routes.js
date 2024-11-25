//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here

router.use((req, res, next) => {
    // we don't want to save journey or step between navigations
    if ((typeof req.query.journey == "undefined") || (typeof req.query.step == "undefined")) {
        delete req.session.data['journey']
        delete req.session.data['step']
    }
    // we want this updated without a reload
    res.locals.journeys = require('./assets/journeys')
    res.locals.currentUrl = req.originalUrl
    next()
})