// Assignment Code

// Data Base:
let specialChar = [
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "?",
  "[",
  "]",
];
let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let alphabetUpper = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
let alphabetLower = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

// Pseudo Code
// 1. Select the length of the password
// 2. What characters to include
// 3. Randomly put the chracters
// 4. Validate password includes at least one (1) character of each, if not replace with character needed

var generateBtn = document.querySelector("#generate");

let selection = [
  "uppercase",
  "lowercase",
  "numbers",
  "symbols",
  "password length",
];
let select = document.querySelector(".card-header");
for (let i = 0; i < selection.length; i++) {
  let div = document.createElement("div");
  div.classList.add(`div-${i}`);
  select.append(div);

  let input = document.createElement("input");
  input.type = "checkbox";
  input.id = selection[i];
  input.style.display = "inline-block";

  let label = document.createElement("label");
  label.innerText =
    selection[i][0].toLocaleUpperCase() + selection[i].substr(1);
  label.id = `label-${selection[i]}`;
  label.style.display = "inline-block";
  label.htmlFor = input.id;

  div.append(input, label);
}

let charSelect = document.querySelector(".div-4 input");
charSelect.type = "number";
charSelect.min = 8;
charSelect.max = 128;

let labelSelect = document.querySelector(".div-4 label");
labelSelect.innerText =
  "Please select number of character in your password (8-128)";
labelSelect.setAttribute("style", "margin-left: 10px");
let hideButton = document.getElementById("hide");
hideButton.classList.add("btn");
hideButton.innerHTML = `<i class="fa-solid fa-eye"></i>`;

const generatePassword = () => {
  let allData = [];
  let password = [];

  if (document.querySelector("#uppercase").checked) {
    allData = allData.concat(alphabetUpper);
  }
  if (document.querySelector("#lowercase").checked) {
    allData = allData.concat(alphabetLower);
  }
  if (document.querySelector("#numbers").checked) {
    allData = allData.concat(numbers);
  }
  if (document.querySelector("#symbols").checked) {
    allData = allData.concat(specialChar);
  }

  let passwordLength = document.querySelector(".div-4 input").value;

  for (i = 0; i < passwordLength; i++) {
    password[i] = allData[Math.floor(Math.random() * allData.length)];
  }

  // Validation at least one character is included in the password
  const validation = (array1, array2) => {
    return array1.some((el) => array2.includes(el));
  };

  if (
    document.querySelector("#lowercase").checked &&
    validation(password, alphabetLower) == false
  ) {
    password[Math.floor(Math.random() * password.length)] =
      alphabetLower[Math.floor(Math.random() * alphabetLower.length)];
  }

  if (
    document.querySelector("#uppercase").checked &&
    validation(password, alphabetUpper) == false
  ) {
    password[Math.floor(Math.random() * password.length)] =
      alphabetUpper[Math.floor(Math.random() * alphabetUpper.length)];
  }

  if (
    document.querySelector("#symbols").checked &&
    validation(password, specialChar) == false
  ) {
    password[Math.floor(Math.random() * password.length)] =
      specialChar[Math.floor(Math.random() * specialChar.length)];
  }

  if (
    document.querySelector("#numbers").checked &&
    validation(password, numbers) == false
  ) {
    password[Math.floor(Math.random() * password.length)] =
      numbers[Math.floor(Math.random() * numbers.length)];
  }
  return password.join("");
};

// Write password to the #password input
function writePassword() {
  hideButton.innerHTML = `<i class="fa-solid fa-eye"></i>`;

  const hide = () => {
    if (hideButton.classList.contains("active")) {
      hideButton.innerHTML = `<i class="fa-solid fa-eye"></i>`;
      hideButton.classList.remove("active");

      passwordText.value = pass.password;
    } else {
      hideButton.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
      hideButton.classList.add("active");
      passwordText.value = pass.password
        .split("")
        .map((el) => (el = "*"))
        .join("");
    }
  };

  pass.password = generatePassword();
  var passwordText = document.querySelector("#password");
  passwordText.value = pass.password;

  if (!addedEventListener) {
    hideButton.addEventListener("click", hide);
    addedEventListener = true;
  }
}

var pass = {
  password: "",
};
var addedEventListener = false;
// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
