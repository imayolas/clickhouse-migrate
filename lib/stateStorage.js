const clickhouse = require("./clickhouseClient")
const moment = require("moment")

const {chCreateMigrations,
chMigrationsTableExists,
chLogMigration,
chGetLastMigrationLog} = require("./utils")


class Store {
  async load (callback) {

    const migrationsData = await chGetLastMigrationLog()
    callback(null, migrationsData)
  }

  async save (set, callback) {

    const migrationsTableExists = await chMigrationsTableExists()
    if(!migrationsTableExists) {
      await chCreateMigrations()
    }

    const data = {lastRun: set.lastRun, migrations: set.migrations}

    await chLogMigration(data)


    callback()

  }
}

module.exports = Store
