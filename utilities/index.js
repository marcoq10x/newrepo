const invModel = require("../models/inventory-model");
const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  try{
  let data = await invModel.getClassifications()
  let list = "<ul>"
  list += '<li><a href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"
    list += "</li>"
  })
  list += "</ul>"
  return list
}catch(error){
  console.error(error);
  throw error;
}
};

/* **************************************
* Build the classification view HTML
 * ************************************ */
Util.buildClassificationGrid = async function(data){
  let grid
  if(data.length > 0){
    grid = '<ul id="inv-display">'
    data.forEach(vehicle => { 
      grid += '<li>'
      grid +=  '<a href="../../inv/detail/'+ vehicle.inv_id 
      + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
      + 'details"><img src="' + vehicle.inv_thumbnail 
      +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
      +' on CSE Motors" /></a>'
      grid += '<div class="namePrice">'
      grid += '<hr />'
      grid += '<h2>'
      grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
      grid += '</h2>'
      grid += '<span>$' 
      + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
      grid += '</div>'
      grid += '</li>'
    })
    grid += '</ul>'
  } else { 
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
}

/* **************************************
 * Build the single view HTML
 * ************************************ */
Util.vehicledetailGrid = async function(data) {
  let grid = ''
  if (data) {
    const vehicle = data

    // Format price and mileage with commas
    const formattedPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(vehicle.inv_price)
    const formattedMiles = new Intl.NumberFormat('en-US').format(vehicle.inv_miles)

    grid = '<div class="vehicle-detail">'
    // grid += '<h1>' + vehicle.inv_make + ' ' + vehicle.inv_model + '</h1>'
    grid += '<div class="vehicle-detail-content">'
    grid += '<div class="vehicle-image">'
    grid += '<img src="' + vehicle.inv_image + '" alt="Image of ' + vehicle.inv_make + ' ' + vehicle.inv_model + '">'
    grid += '</div>'
    grid += '<div class="vehicle-info">'
    grid += '<p><strong>Make:</strong> ' + vehicle.inv_make + '</p>'
    grid += '<p><strong>Model:</strong> ' + vehicle.inv_model + '</p>'
    grid += '<p><strong>Year:</strong> ' + vehicle.inv_year + '</p>'
    grid += '<p><strong>Price:</strong> ' + formattedPrice + '</p>'
    grid += '<p><strong>Miles:</strong> ' + formattedMiles + '</p>'
    grid += '<p><strong>Color:</strong> ' + vehicle.inv_color + '</p>'
    grid += '<p><strong>Description:</strong> ' + vehicle.inv_description + '</p>'
    grid += '</div>'
    grid += '</div>'
    grid += '</div>'
  } else {
    grid += '<p class="notice">Sorry, no vehicle details found.</p>'
  }
  return grid
}


/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)


module.exports = Util


