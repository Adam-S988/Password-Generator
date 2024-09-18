#!/usr/bin/env node

const process = require("node:process");

let passwordLength = 8;
let allowNumbers = false;

function printOpenMessage() {
  console.log(`
    Welcome to the Password Generator.

    For help, please type '--help' or '-h'.
    `);
}

function printHelpMessage() {
  console.log(`
    Help for Password Generator:
      - The password length is set to 8 characters by default.
      - Type '--create' or '-c' to generate a password of the specified length.
      - Type '--length' or '-l' followed by a space and an integer to change the password length (5-10).
      - Type '--num' or '-n' to allow integers in the password.

      Example: "-c -l 9 -n" will create a password 9 characters in length, including integers.

      !!Do not share your password with anyone!!


    `);
}

function printLengthMessage() {
  console.log(`
    ERROR: Password length must be between 5 and 10 characters.
    `);
}

function printMissingCreateArgumentMessage() {
  console.log(`
    ERROR: You must include the '--create' or '-c' argument to specify the password.
    `);
}

function printPasswordLengthSetMessage(length) {
  console.log(`
    Password length set to ${length} characters.
    `);
}

function printPasswordErrorMessage(length) {
  console.log(`
    ERROR: Password must be exactly ${length} characters long.
    `);
}

function generatePassword(length) {
  const charset = allowNumbers
    ? "abcdefghijklmnopqrstuvwxyz0123456789"
    : "abcdefghijklmnopqrstuvwxyz";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}

function validatePassword(password) {
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  return hasLetter && (allowNumbers ? true : !hasNumber);
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

const createArgIndex =
  userArguments.indexOf("--create") !== -1
    ? userArguments.indexOf("--create")
    : userArguments.indexOf("-c");

//Allow Integers
const numArgIndex =
  userArguments.indexOf("--num") !== -1
    ? userArguments.indexOf("--num")
    : userArguments.indexOf("-n");

if (numArgIndex !== -1) {
  if (createArgIndex === -1) {
    printMissingCreateArgumentMessage();
    return;
  }
  allowNumbers = true;
  console.log("    Numbers are allowed in the password.");
}

if (createArgIndex !== -1) {
  const password = generatePassword(passwordLength);

  if (password.length !== passwordLength) {
    printPasswordErrorMessage(passwordLength);
    return;
  }

  if (!validatePassword(password)) {
    console.log(
      `ERROR: Generated password does not meet complexity requirements.`
    );
    return;
  }

  console.log(`
------------------------------

Generated password: ${password}
  `);
  return;
}

if (userArguments.length === 0) {
  printOpenMessage();
  return;
}

console.log(`
Password accepted.
  `);
