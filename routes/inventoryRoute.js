// Needed Resources 
const express = require("express")
const router = new express.Router()
const invController = require("../controllers/invController")
const utilities = require("../utilities/")

// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));

// New route to get the details of a specific inventory item
router.get('/detail/:id', utilities.handleErrors(invController.getInventoryItemDetail));

// New route to trigger an intentional error
router.get('/cause-error', utilities.handleErrors(invController.causeError)); // MQ3 trigger error

module.exports = router;