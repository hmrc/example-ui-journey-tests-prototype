//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require("govuk-prototype-kit");
const router = govukPrototypeKit.requests.setupRouter();
const path = require("path");
const express = require("express");

// Add your routes here

router.use((req, res, next) => {
  // we don't want to save journey or step between navigations
  if (
    typeof req.query.journey == "undefined" ||
    typeof req.query.step == "undefined"
  ) {
    delete req.session.data["journey"];
    delete req.session.data["step"];
  }
  if (process.env.NODE_ENV !== "production") {
    // so that we don't have to restart node to pick up changes
    delete require.cache[require.resolve("./assets/journeys")];
  }
  res.locals.journeys = require("./assets/journeys");
  res.locals.currentUrl = req.originalUrl;
  next();
});

// Serve screenshot images
router.use(
  "/screenshots",
  express.static(path.join(__dirname, "../screenshots")),
);
