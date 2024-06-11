/*******************************
* Account routes
* Unit 4, deliver login view activity
*******************************/
// Needed Resources
const express = require("express")
const router = new express.Router()
const accountController = require("../controllers/accountController")
const utilities = require("../utilities")
const regValidate = require('../utilities/account-validation')//Week 4

/*******************************
* Deliver login view
* Unit 4, deliver login view activity
****************************** */
router.get("/login", utilities.handleErrors (accountController. buildLogin))

/*******************************
* Deliver registration view
* Unit 4, deliver registration view activity
****************************** */
router.get("/register", utilities.handleErrors(accountController.buildRegister))

/*******************************
* Process registration data
* Unit 4, process registration activity
****************************** */
// Process the registration data
router.post(
    "/register",
    regValidate.registrationRules(), //MQ4 Applying validation rules
    regValidate.checkRegData, //MQ4 Check data against the rules
    utilities.handleErrors(accountController.registerAccount)
  )

  // Process the login attempt
router.post(
    "/login",
    (req, res) => {
      res.status(200).send('login process')
    }
  )

module.exports = router;