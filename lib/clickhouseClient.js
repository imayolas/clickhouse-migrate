const ClickHouse = require("@apla/clickhouse")

module.exports = new ClickHouse({
  host: "127.0.0.1",
  port: 8123,
  user: "default",
  password: "",
  protocol: "http:",
  pathname: "/",
  queryOptions: {
    database: "warehouse"
  }
})
