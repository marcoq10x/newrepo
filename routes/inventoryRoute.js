// Needed Resources 
const express = require("express")
const router = new express.Router()
const invController = require("../controllers/invController")

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

// New route to get the details of a specific inventory item
router.get('/detail/:id', invController.getInventoryItemDetail);

module.exports = router;