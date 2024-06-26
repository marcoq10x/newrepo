/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/
/* ***********************
 * Require Statements
 *************************/
const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const env = require("dotenv").config()       
const app = express()
const static = require("./routes/static")
const inventoryRoute  = require("./routes/inventoryRoute")
const session = require("express-session")//Week 4
const pool = require('./database/')//Week 4
const accountRoute = require("./routes/accountRoute")//Week 4

//Module 2
const baseController = require("./controllers/baseController")

// Add the utilities require statement here
const utilities = require("./utilities/")

/* ***********************
 * Middleware (week4)
 * ************************/
app.use(session({
  store: new (require('connect-pg-simple')(session))({
    createTableIfMissing: true,
    pool,
  }),
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  name: 'sessionId',
}))


// Express Messages Middleware (week 4)
app.use(require('connect-flash')())
app.use(function(req, res, next){
  res.locals.messages = require('express-messages')(req, res)
  next()
})

// Middleware for parsing application/json, week 4
app.use(express.json());
// Middleware for parsing application/x-www-form-urlencoded, week 4
app.use(express.urlencoded({ extended: true }));


/* ***********************
 * View Engine and Templates
 *************************/
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout") // not at views root

/* ***********************
 * Routes
 *************************/
app.use(static)
// Index route week 3, activity
app.get("/", utilities.handleErrors(baseController.buildHome))
//Inventory Routes - Unit 3, activity
app.use("/inv", inventoryRoute)
// Account routes - unit 4, activity
app.use("/account", require("./routes/accountRoute"))

// File Not Found Route - must be last route in list. Unit 3, Basic Error Handling activity
app.use(async (req, res, next) => {
  next({status: 404, message: 'Sorry, You broke it  and the pieces are lost!'})
})

/* ***********************
* Express Error Handler
* Place after all other middleware
*************************/
app.use(async (err, req, res, next) => {
  let nav = await utilities.getNav()
  console.error(`Error at: "${req.originalUrl}": ${err.message}`)
  if(err.status == 404){ message = err.message} else {message = 'Oh no! There was a crash. Maybe try a different route?'}
  res.render("errors/error", {
    title: err.status || 'Server Error',
    message,
    nav
  })
})

/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT
const host = process.env.HOST

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})
