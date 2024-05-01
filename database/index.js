const { Pool } = require("pg")
require("dotenv").config()

/* ***************
 * Connection Pool
 * Objeto SSL necesario para probar localmente la aplicación
 * Pero causará problemas en un entorno de producción
 * If - else determinará cuál usar
 * *************** */
let pool
if (process.env.NODE_ENV == "development") {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  })

  // Agregado para depurar consultas
  // durante el desarrollo
  module.exports = {
    async query(text, params) {
      try {
        const res = await pool.query(text, params)
        console.log("consulta ejecutada", { text })
        return res
      } catch (error) {
        console.error("error en la consulta", { text })
        throw error
      }
    },
  }
} else {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  })
  module.exports = pool
}
