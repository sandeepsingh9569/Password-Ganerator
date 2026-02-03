const passwordDisplay = document.querySelector("[data-PasswordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const lengthNumber = document.querySelector("[data-lengthNumber]");
const lengthSlider = document.querySelector("[data-lengthslider]");
const indicator = document.querySelector("[data-indicator]");

const uppercase = document.querySelector("#uppercase");
const lowercase = document.querySelector("#lowercase");
const numbers = document.querySelector("#numbers");
const symbols = document.querySelector("#symbols");

const generateBtn = document.querySelector(".generateButton");

let passwordLength = 10;
lengthNumber.textContent = passwordLength;

// slider
lengthSlider.addEventListener("input", (e) => {
  passwordLength = e.target.value;
  lengthNumber.textContent = passwordLength;
});

// random functions
function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomNumber() {
  return Math.floor(Math.random() * 10);
}

function getRandomSymbol() {
  const symbols = "!@#$%^&*()_+{}[]<>?";
  return symbols[Math.floor(Math.random() * symbols.length)];
}

// strength
function setStrength() {
  let hasUpper = uppercase.checked;
  let hasLower = lowercase.checked;
  let hasNum = numbers.checked;
  let hasSym = symbols.checked;

  if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
    indicator.style.backgroundColor = "#22c55e"; // strong
  } else if ((hasUpper || hasLower) && (hasNum || hasSym)) {
    indicator.style.backgroundColor = "#facc15"; // medium
  } else {
    indicator.style.backgroundColor = "#ef4444"; // weak
  }
}

// generate password
generateBtn.addEventListener("click", () => {
  let password = "";
  let funcArr = [];

  if (uppercase.checked) funcArr.push(getRandomUpper);
  if (lowercase.checked) funcArr.push(getRandomLower);
  if (numbers.checked) funcArr.push(getRandomNumber);
  if (symbols.checked) funcArr.push(getRandomSymbol);

  if (funcArr.length === 0) return;

  // compulsory
  for (let i = 0; i < funcArr.length; i++) {
    password += funcArr[i]();
  }

  // remaining
  for (let i = password.length; i < passwordLength; i++) {
    let randIndex = Math.floor(Math.random() * funcArr.length);
    password += funcArr[randIndex]();
  }

  // shuffle
  password = password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");

  passwordDisplay.value = password;
  setStrength();
});

// copy
copyBtn.addEventListener("click", async () => {
  if (passwordDisplay.value === "") return;

  await navigator.clipboard.writeText(passwordDisplay.value);
  copyMsg.textContent = "Copied!";
  copyMsg.style.opacity = "1";

  setTimeout(() => {
    copyMsg.style.opacity = "0";
  }, 1500);
});
