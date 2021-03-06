# Relevanzz: Clickhouse migrate cli

##### CLI Install

```
npm install -g @imayolas/clickhouse-migrate
# -- or --
yarn global add @imayolas/clickhouse-migrate
```


##### Install
Requires a `clickhouse.js` file at the root of the directory where you run the migrations command.

```javascript
// clickhouse.js example
module.exports = {
  host: process.env.WAREHOUSE_HOST,
  port: process.env.WAREHOUSE_PORT,
  user: process.env.WAREHOUSE_USER,
  password: process.env.WAREHOUSE_PASSWORD,
  protocol: process.env.WAREHOUSE_PROTOCOL,
  pathname: "/",
  queryOptions: {
    database: process.env.WAREHOUSE_DATABASE
  },
  migrations: {
    directory: "./migrations/clickhouse"
  }
}
```

##### API
```bash
ch migrate:make // Creates a new migration
ch migrate:list // Lists migrations
ch migrate:latest // Migrates to the latest file
ch migrate:rollback <all> // Migrates one file down, or back to the root if command all is passed
```
