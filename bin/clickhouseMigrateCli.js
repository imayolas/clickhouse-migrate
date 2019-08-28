#!/usr/bin/env node
const Promise = require("bluebird")
const minimist = require("minimist")
const { spawn } = require("child_process")
const argv = minimist(process.argv.slice(2))

const spawnAsync = (command, params = []) => {
  return new Promise((resolve, reject) => {
    const spawned = spawn(command, params, { stdio: [process.stdin, process.stdout, process.stderr] })
    spawned.on("close", () => {
      resolve()
    })
    spawned.on("error", (error) => {
      reject(error)
    })
  })
}

const run = (command, subCommand) => {

  if(command === "migrate:make") {
    return spawnAsync("npx", ["migrate", "create", subCommand])
  }

  if(command === "migrate:latest") {
    return spawnAsync("npx", ["migrate", "latest", '--store=./lib/stateStorage.js'])
  }

}

const command = argv._[0]
const subCommand = argv._[1]

run(command, subCommand)
