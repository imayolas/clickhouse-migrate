#!/usr/bin/env node
const { spawn } = require("child_process")
const Promise = require("bluebird")
// const spawnAsync =
//     spawn(
//       "knex",
//       ["migrate:make", "--cwd", "migrations", "--migrations-directory", "warehouse", migrationName],
//       { stdio: [process.stdin, process.stdout, process.stderr] },
//       cb
//     )

