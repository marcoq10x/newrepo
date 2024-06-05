const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
    const classification_id = req.params.classificationId
    const data = await invModel.getInventoryByClassificationId(classification_id)
    console.log("This is classification data", data)
    const grid = await utilities.buildClassificationGrid(data)
    let nav = await utilities.getNav()
    const className = data.classification_name
    res.render("./inventory/classification", {
      title: className + " vehicles",
      nav,
      grid,
    })
  }

/* ***************************
 *  Get inventory item detail view
 * ************************** */
invCont.getInventoryItemDetail = async function (req, res, next) {
  console.log("We are getting here")
  try {
      const vehicleId = req.params.id
      const vehicleData = await invModel.getVehicleById(vehicleId) 
      console.log("vehicle data", vehicleData)
      const grid = await utilities.vehicledetailGrid(vehicleData)// to build the vehicle detail grid
      console.log("grid", grid)
      let nav = await utilities.getNav()
      if (vehicleData) {
         res.render('inventory/detail', { 
          title:" vehicles",
          nav,
          grid
        }) 
      } else {
          res.status(404).send('Vehicle not found')
      }
  } catch (error) {
      next(error)
  }
}


  module.exports = invCont