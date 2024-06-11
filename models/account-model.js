// models/account-model.js (week 4)
const pool = require("../database")

/* *****************************
*   Register new account, week 4
* *************************** */
async function registerAccount(account_firstname, account_lastname, account_email, account_password){
  try {
    const sql = "INSERT INTO account (account_firstname, account_lastname, account_email, account_password, account_type) VALUES ($1, $2, $3, $4, 'Client') RETURNING *"
    const result = await pool.query(sql, [account_firstname, account_lastname, account_email, account_password])
    return result.rows[0]
  } catch (error) {
    console.error('Error registering account:', error) // MQ4 Log the error
    throw new Error('Error registering account') // MQ4 Throw a custom error
  }
}

/* **********************
 *   Check for existing email
 * ********************* */
async function checkExistingEmail(account_email){
    try {
      const sql = "SELECT * FROM account WHERE account_email = $1"
      const email = await pool.query(sql, [account_email])
      return email.rowCount
    } catch (error) {
      console.error('Error checking email:', error) // MQ4 Log the error
      throw new Error('Error checking email') // MQ4 Throw a custom error
    }
}

module.exports = { registerAccount, checkExistingEmail }
