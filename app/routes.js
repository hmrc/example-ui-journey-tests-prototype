//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()
const path = require('path')
const express = require('express')

// Add your routes here

router.use((req, res, next) => {
    // we don't want to save journey or step between navigations
    if ((typeof req.query.journey == "undefined") || (typeof req.query.step == "undefined")) {
        delete req.session.data['journey']
        delete req.session.data['step']
    }
    // we want this updated without a reload
    res.locals.journeys = require('./data/journeys')
    res.locals.currentUrl = req.originalUrl
    next()
})

// Screenshots route
router.get('/screenshots', (req, res) => {
  res.render('screenshots/index');
});

// Serve screenshot images
router.use('/screenshots', express.static(path.join(__dirname, '../screenshots')));
