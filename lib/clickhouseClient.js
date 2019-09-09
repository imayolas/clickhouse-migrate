const ClickHouse = require("@apla/clickhouse")

module.exports = new ClickHouse({
  host: process.env.WAREHOUSE_HOST || "localhost",
  port: process.env.WAREHOUSE_PORT || 8123,
  auth: process.env.WAREHOUSE_AUTH || "default:",
  protocol: process.env.WAREHOUSE_PROTOCOL || "http:",
  pathname: "/",
  queryOptions: {
    database: process.env.WAREHOUSE_DATABASE || "warehouse"
  }
})
