const clickhouse = require("./clickhouseClient")
const moment = require("moment")

const chCreateMigrations = async () => {

  return clickhouse.querying(`
    CREATE TABLE migrations (
      id Int32,
      created_at DateTime,
      data String
    )
    ENGINE = TinyLog
  `)
}



const chMigrationsTableExists = async () => {
  try {
    await clickhouse.querying("DESCRIBE migrations")
    return true
  } catch (error) {
    if(error.code === 60) {
      return false
    }
  }

}

const chLogMigration = async (data) => {
  data = JSON.stringify(data)
  const createdAt = moment().format("YYYY-MM-DD hh:mm:ss")
  const lastIdRecord = await clickhouse.querying("SELECT max(id) as last_id FROM migrations")
  const lastId = lastIdRecord.data[0][0]


  return clickhouse.querying(`
    INSERT INTO migrations(id, created_at, data) VALUES (${lastId+1}, '${createdAt}', '${data}')
  `)
}

const chGetLastMigrationLog = async (data) => {

  const migrationsTableExists = await chMigrationsTableExists()
  if(!migrationsTableExists) {
    return {}
  }

  const lastRecord = await clickhouse.querying("SELECT max(id) as max_id FROM migrations")

  const maxId = lastRecord.data[0][0]

  const targetRecord = await clickhouse.querying(`SELECT data FROM migrations WHERE id = ${maxId}`)

  return JSON.parse(targetRecord.data[0][0])

}


exports.chCreateMigrations = chCreateMigrations
exports.chMigrationsTableExists = chMigrationsTableExists
exports.chLogMigration = chLogMigration
exports.chGetLastMigrationLog = chGetLastMigrationLog
