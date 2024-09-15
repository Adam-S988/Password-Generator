#!/usr/bin/env node

const process = require("node:process");

function printOpenMessage() {
  console.log(`Usage of Password Generator:
    For help, please type '--help'.`);
}

function printHelpMessage() {
  console.log(`Help of Password Generator:
      1. Password should be 8 characters.`);
}

const userArguments = process.argv.slice(2);

if (userArguments.length !== 1) {
  if (userArguments.length !== 1) {
    printOpenMessage();
    return;
  }
}

if (userArguments[0] === "--help" || userArguments[0] === "-h") {
  printHelpMessage();
  return;
}
