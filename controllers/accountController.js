// controllers/accountController.js

/* *******************************
* Account Controller
* Unit 4, deliver login view activity
*  ***************************** */
const utilities = require('../utilities')
const accountModel = require('../models/account-model') // MQ4 Importing account model
const bcrypt = require("bcryptjs") // MQ4 Import bcryptjs

/* ****************************************
*  Deliver login view
 Unit 4, deliver login view activity
* *************************************** */
async function buildLogin(req, res, next) {
    let nav = await utilities.getNav()
    res.render("account/login", {
      title: "Login",
      nav,
      errors: null // MQ4 Prevent initial errors
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
      errors: null, //MQ4 Prevent initial errors
    })
}

/* ****************************************
*  Process Registration
* *************************************** */
async function registerAccount(req, res) {
    let nav = await utilities.getNav()
    const { account_firstname, account_lastname, account_email, account_password } = req.body

    console.log("Registering account:", account_firstname, account_lastname, account_email) // Log input data for debugging

    // Hash the password before storing
    let hashedPassword
    try {
        // regular password and cost (salt is generated automatically)
        hashedPassword = await bcrypt.hashSync(account_password, 10) // MQ4 Hash the password with a cost factor of 10
    } catch (error) {
        console.error("Error hashing password:", error) // Log the error
        req.flash("notice", 'Sorry, there was an error processing the registration.')
        return res.status(500).render("account/register", {
            title: "Registration",
            nav,
            errors: null,
        })
    }

    try {
        const regResult = await accountModel.registerAccount(
            account_firstname,
            account_lastname,
            account_email,
            hashedPassword // MQ4 Use the hashed password
        )

        console.log("Registration result:", regResult) // Log result for debugging

        if (regResult) {
            req.flash(
                "notice",
                `Congratulations, you\'re registered ${account_firstname}. Please log in.`
            )
            res.status(201).render("account/login", {
                title: "Login",
                nav,
                errors: null, // MQ4 Ensure errors is defined
            })
        } else {
            req.flash("notice", "Sorry, the registration failed.")
            res.status(501).render("account/register", {
                title: "Registration",
                nav,
                errors: null,
            })
        }
    } catch (error) {
        console.error("Error during registration:", error) // Log the error
        req.flash("notice", 'Sorry, there was an error processing the registration.')
        res.status(500).render("account/register", {
            title: "Registration",
            nav,
            errors: null,
        })
    }
}

module.exports = { buildLogin, buildRegister, registerAccount }
