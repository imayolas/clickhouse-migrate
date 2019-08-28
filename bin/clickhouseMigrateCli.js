#!/usr/bin/env node
const Promise = require("bluebird")
const minimist = require("minimist")
const { spawn } = require("child_process")
const argv = minimist(process.argv.slice(2))
const _ = require("underscore")
const path = require("path")
const fs = require("fs")



const spawnAsync = (command, params = [], env = {}) => {
  return new Promise((resolve, reject) => {

    const opts = {
      env: {...process.env, ...env},
      stdio: [process.stdin, process.stdout, process.stderr]
    }

    const spawned = spawn(command, params, opts)
    spawned.on("close", () => {
      resolve()
    })
    spawned.on("error", (error) => {
      reject(error)
    })
  })
}

const run = async (command, subCommand) => {

  const customClickhouseFileExists = fs.existsSync(path.join(process.cwd(), "clickhousefile.js"))

  if(!customClickhouseFileExists) {
    throw new Error("clickhousefile.js is required at the project root")
  }

  const settings = require(path.join(process.cwd(), "clickhousefile"))

  let migrationsDir = "migrations"

  if(settings.migrations && settings.migrations.directory) {
    migrationsDir = settings.migrations.directory
  }

  const spawnEnv = {
    WAREHOUSE_HOST: settings.host,
    WAREHOUSE_PORT: settings.port,
    WAREHOUSE_USER: settings.user,
    WAREHOUSE_PASSWORD: settings.password,
    WAREHOUSE_DATABASE: settings.queryOptions.database,
    WAREHOUSE_PROTOCOL: settings.protocol,
  }

  const storeDirName = path.join(__dirname, "../lib/stateStorage.js")

  if(command === "migrate:make") {
    if(_.isUndefined(subCommand) || _.isNull(subCommand)) {
      return console.error("migrate:make command requires a migration name: ch migrate:make <filename>")
    }

    return spawnAsync("npx", ["migrate", "create", subCommand, "--migrations-dir", migrationsDir], spawnEnv)
  }

  if(command === "migrate:latest") {
    return spawnAsync("npx", ["migrate", "up", `--store=${storeDirName}`, "--migrations-dir", migrationsDir], spawnEnv)
  }

  if(command === "migrate:rollback") {
    return spawnAsync("npx", ["migrate", "down", `--store=${storeDirName}`, "--migrations-dir", migrationsDir], spawnEnv)
  }

  if(command === "migrate:list") {
    return spawnAsync("npx", ["migrate", "list", `--store=${storeDirName}`, "--migrations-dir", migrationsDir], spawnEnv)
  }

  console.error(`Invalid command. You must run: ch migrate: <make, latest, rollback, list>`)

}

const command = argv._[0]
const subCommand = argv._[1]

run(command, subCommand)
