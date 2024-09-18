#!/usr/bin/env node

const process = require("node:process");

let passwordLength = 8;

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
      - Type '--length' or '-l' followed by an integer to set the password length (5-10).
      - Type '--create' or '-c' to generate a password of the specified length.
      - Password length must be between 5 and 10 characters if length is specified.
      - Password must contain at least 1 letter (A-Z) and 1 number (0-9).
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

function generateBaseRandomPassword(length) {
  const charset = "abcdefghijklmnopqrstuvwxyz";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}

function generateRandomPassword(length) {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:',.<>?/";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}

function validateBasePassword(password) {
  const hasLetter = /[a-z]/.test(password);
  return hasLetter;
}

function validatePassword(password) {
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  return hasLetter && hasNumber;
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

if (createArgIndex !== -1) {
  const password = generateBaseRandomPassword(passwordLength);

  if (password.length !== passwordLength) {
    printPasswordErrorMessage(passwordLength);
    return;
  }

  if (!validateBasePassword(password)) {
    console.log(
      `ERROR: Generated password does not meet complexity requirements.`
    );
    return;
  }

  console.log(`
Generated password: ${password}
  `);
  return;
}

if (lengthArgIndex !== -1 && createArgIndex === -1) {
  printMissingCreateArgumentMessage();
  return;
}

if (userArguments.length === 0) {
  printOpenMessage();
  return;
}

console.log(`
Password accepted.
  `);
