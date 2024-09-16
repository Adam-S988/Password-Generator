#!/usr/bin/env node

const process = require("node:process");

// Default password length
let passwordLength = 8;

function printOpenMessage() {
  console.log(`
    Welcome to the Password Generator.

    Usage of Password Generator:
    For help, please type '--help' or '-h'.
    `);
}

function printHelpMessage() {
  console.log(`
    Help for Password Generator:
      (The password length is currently set to ${passwordLength} characters)
      - Type '--length' or '-l' followed by an integer to set the password length (5-10).
      - Type '--create' or '-c' followed by the password to set it.
      - Password length must be between 5 and 10 characters if length is specified.
      - Password must contain at least 1 letter (A-Z).
      - Password must contain at least 1 number (0-9).
      - Do not share your password with anyone.
    `);
}

function printLengthMessage() {
  console.log(`
    ERROR: Password length must be between 5 and 10 characters.
    `);
}

function printMissingCreateArgumentMessage() {
  console.log(`
    ERROR: You must include the '--create' or '-c' argument before specifying the password.
    `);
}

function printPasswordLengthSetMessage(length) {
  console.log(`Password length set to ${length} characters.`);
}

const userArguments = process.argv.slice(2);

const lengthArgIndex =
  userArguments.indexOf("--length") !== -1
    ? userArguments.indexOf("--length")
    : userArguments.indexOf("-l");

if (lengthArgIndex !== -1 && lengthArgIndex + 1 < userArguments.length) {
  const lengthValue = parseInt(userArguments[lengthArgIndex + 1], 10);
  if (lengthValue >= 5 && lengthValue <= 10) {
    passwordLength = lengthValue;
    printPasswordLengthSetMessage(passwordLength);
  } else {
    printLengthMessage();
    return;
  }
}

if (userArguments[0] === "--help" || userArguments[0] === "-h") {
  printHelpMessage();
  return;
}

const hasCreateArg =
  userArguments.includes("--create") || userArguments.includes("-c");

if (hasCreateArg) {
  const createArgIndex =
    userArguments.indexOf("--create") !== -1
      ? userArguments.indexOf("--create")
      : userArguments.indexOf("-c");

  if (createArgIndex === -1 || createArgIndex + 1 >= userArguments.length) {
    printMissingCreateArgumentMessage();
    return;
  }

  const password = userArguments[createArgIndex + 1];
  if (!password) {
    printMissingCreateArgumentMessage();
    return;
  }

  if (password.length !== passwordLength) {
    console.log(
      `ERROR: Password must be exactly ${passwordLength} characters long.`
    );
    return;
  }

  // Optional: Validate password complexity here if required
  // Example: Check for at least one letter and one number
}

if (userArguments.length === 0) {
  printOpenMessage();
  return;
}

console.log("Password accepted.");
