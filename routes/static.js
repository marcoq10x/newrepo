const express = require('express');
const router = express.Router();
const utilities = require("../utilities/")

// Static Routes
// Set up "public" folder / subfolders for static files
router.use(express.static("public"));
router.use("/css", express.static(__dirname + "public/css"));
router.use("/js", express.static(__dirname + "public/js"));
router.use("/images", express.static(__dirname + "public/images"));

// Wrap routes with error handling middleware
router.use(utilities.handleErrors(async (req, res, next) => {
    next();
  }));


// Module 2

module.exports = router;



