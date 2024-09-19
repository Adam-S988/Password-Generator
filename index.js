#!/usr/bin/env node

// Adam Stevenson

const process = require("node:process");

let passwordLength = 8;
let allowNumbers = false;
let allowUppercase = false;
let allowSymbols = false;

//Opening text
function printOpenMessage() {
  console.log(`
    Welcome to the Password Generator.

    For help, please type '--help' or '-h'.
  `);
}

//Help screen
function printHelpMessage() {
  console.log(`
    Help for Password Generator:
      - The password length is set to 8 characters by default.
      - Type '--create' or '-c' to generate a password of the specified length.
      - Type '--length' or '-l' followed by an integer to change the password length (5-10).
      - Type '--num' or '-n' to allow integers in the password.
      - Type '--maj' or '-m' to allow uppercase letters in the password.
      - Type '--symbol' or '-s' to allow for symbols in the password.
      !!Do not share your password with anyone!!
  `);
}

// Error if the password character length falls outside of the valid range
function printLengthMessage() {
  console.log(`
    ERROR: Password length must be between 5 and 10 characters.
  `);
}

// Error if the argument for the actual password creation is missing
function printMissingCreateArgumentMessage() {
  console.log(`
    ERROR: You must include the '--create' or '-c' argument to specify the password.
  `);
}

// Message if password length is modified
function printPasswordLengthSetMessage(length) {
  console.log(`Password length set to ${length} characters.`);
}

//Defining the charsets
function generatePassword(length) {
  const lowercaseCharset = "abcdefghijklmnopqrstuvwxyz";
  const uppercaseCharset = allowUppercase ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ" : "";
  const numberCharset = allowNumbers ? "0123456789" : "";
  const symbolCharset = allowSymbols ? "!@#$%^&*()+_=-{}[]|;:,.<>?/~`" : "";

  let password = "";

  // Ensure at least one character from each required set
  if (allowUppercase)
    password +=
      uppercaseCharset[Math.floor(Math.random() * uppercaseCharset.length)];
  if (allowNumbers)
    password += numberCharset[Math.floor(Math.random() * numberCharset.length)];
  if (allowSymbols)
    password += symbolCharset[Math.floor(Math.random() * symbolCharset.length)];

  // Fill the rest of the password length with random characters from the full charset
  const charset =
    lowercaseCharset + uppercaseCharset + numberCharset + symbolCharset;
  while (password.length < length) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }

  // Shuffle the password to randomize character positions
  password = password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");

  return password;
}

//Valid charsets
function validatePassword(password) {
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasSymbols = /[!@#$%^&*()+_=\-{}\[\]|;:,.<>?/~`]/.test(password);

  return (
    hasLetter &&
    (allowNumbers ? hasNumber : true) &&
    (allowUppercase ? hasUppercase : true) &&
    (allowSymbols ? hasSymbols : true)
  );
}

const userArguments = process.argv.slice(2);

//Change password character length
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

//Show Help screen
if (userArguments[0] === "--help" || userArguments[0] === "-h") {
  printHelpMessage();
  return;
}

//Create a password
const createArgIndex =
  userArguments.indexOf("--create") !== -1
    ? userArguments.indexOf("--create")
    : userArguments.indexOf("-c");

if (createArgIndex === -1) {
  printMissingCreateArgumentMessage();
  return;
}

// Numeral arguments
const numArgIndex =
  userArguments.indexOf("--num") !== -1
    ? userArguments.indexOf("--num")
    : userArguments.indexOf("-n");

// Majuscule arguments
const majArgIndex =
  userArguments.indexOf("--maj") !== -1
    ? userArguments.indexOf("--maj")
    : userArguments.indexOf("-m");

// Symbol arguments
const symArgIndex =
  userArguments.indexOf("--symbol") !== -1
    ? userArguments.indexOf("--symbol")
    : userArguments.indexOf("-s");

if (numArgIndex !== -1) {
  allowNumbers = true; // Set the flag to allow numbers
  console.log("Numbers are allowed in the password.");
}

if (majArgIndex !== -1) {
  allowUppercase = true; // Set the flag to allow uppercase letters
  console.log("Uppercase letters are allowed in the password.");
}

if (symArgIndex !== -1) {
  allowSymbols = true; // Set the flag to allow symbols
  console.log("Symbols are allowed in the password.");
}

const password = generatePassword(passwordLength);

if (password.length !== passwordLength) {
  printPasswordErrorMessage(passwordLength);
  return;
}

// Error if something occurs with generating a password
if (!validatePassword(password)) {
  console.log(
    `ERROR: Generated password does not meet complexity requirements.`
  );
  return;
}

// Shows the randomly generated password
console.log(`
Generated password: ${password}
`);

if (userArguments.length === 0) {
  printOpenMessage();
  return;
}

console.log(`
Password accepted.
`);
