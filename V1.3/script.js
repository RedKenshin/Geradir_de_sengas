function generatePassword() {
  var length = document.getElementById("password-length").value;
  var includeUppercase = document.getElementById("uppercase-letters").checked;
  var includeLowercase = document.getElementById("lowercase-letters").checked;
  var includeNumbers = document.getElementById("numbers").checked;
  var includeSymbols = document.getElementById("symbols").checked;
  var charset = "";
  if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
  if (includeNumbers) charset += "0123456789";
  if (includeSymbols) charset += "!@#$%^&*()_-+={}[]\\|/?.<>,";
  var password = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    password += charset.charAt(Math.floor(Math.random() * n));
  }
  document.getElementById("generated-password").textContent = password;
  document.getElementById("copy-to-clipboard").disabled = false;
}

function copyToClipboard() {
  var password = document.getElementById("generated-password").textContent;
  var temp = document.createElement("textarea");
  temp.value = password;
  document.body.appendChild(temp);
  temp.select();
  document.execCommand("copy");
  document.body.removeChild(temp);
  alert("Senha copiada para a área de transferência");
}

function savePassword() {
  var password = document.getElementById("generated-password").textContent;
  if (password === "") {
    alert("Nenhuma senha gerada. Por favor, gere uma senha antes de salvá-la.");
    return;
  }
  var savedPasswords = localStorage.getItem("passwords");
  if (savedPasswords) {
    savedPasswords = JSON.parse(savedPasswords);
  } else {
    savedPasswords = [];
  }
  savedPasswords.push(password);
  localStorage.setItem("passwords", JSON.stringify(savedPasswords));
  alert("Senha salva com sucesso!");
}

function viewPasswords() {
  var savedPasswords = localStorage.getItem("passwords");
  if (savedPasswords) {
    savedPasswords = JSON.parse(savedPasswords);
    var passwordList = document.getElementById("password-list");
    passwordList.innerHTML = ""; // Clear the existing list
    savedPasswords.forEach(function (password) {
      var listItem = document.createElement("li");
      listItem.textContent = password;
      passwordList.appendChild(listItem);
    });
  } else {
    alert("Nenhuma senha salva encontrada.");
  }
}