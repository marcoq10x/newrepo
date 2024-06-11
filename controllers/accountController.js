/* *******************************
* Account Controller
* Unit 4, deliver login view activity
*  ***************************** */
const utilities = require('../utilities')

/* ****************************************
*  Deliver login view
 Unit 4, deliver login view activity
* *************************************** */
async function buildLogin(req, res, next) {
    let nav = await utilities.getNav()
    res.render("account/login", {
      title: "Login",
      nav,
    })
  }
  
/* ****************************************
*  Deliver registration view
Unit 4, deliver register view activity
* *************************************** */
async function buildRegister(req, res, next) {
    let nav = await utilities.getNav()
    res.render("account/register", {
      title: "Register",
      nav,
    })
}


module.exports = { buildLogin, buildRegister }


