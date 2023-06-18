function generatePassword() {
  var length = document.getElementById("password-length").value;
  var includeUppercase = document.getElementById("uppercase-letters").checked;
  var includeLowercase = document.getElementById("lowercase-letters").checked;
  var includeNumbers = document.getElementById("numbers").checked;
  var includeSymbols = document.getElementById("symbols").checked;
  
  // Verificar se pelo menos uma opção está selecionada
  if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols) {
    alert("Selecione pelo menos uma opção para gerar a senha.");
    return; // Interromper a execução da função se nenhuma opção estiver selecionada
  }
  
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
  evaluatePasswordStrength();
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

function storePassword() {
  var password = document.getElementById("generated-password").textContent;
  if (password !== "") {
    var storedPasswordsList = document.getElementById("stored-passwords-list");
    var listItem = document.createElement("li");
    var passwordText = document.createElement("span");
    passwordText.textContent = password;
    listItem.appendChild(passwordText);
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Apagar";
    deleteButton.addEventListener("click", function () {
      listItem.remove();
    });
    listItem.appendChild(deleteButton);
    storedPasswordsList.appendChild(listItem);
    clearGeneratedPassword();
  }
}

function deleteStoredPasswords() {
  var storedPasswordsList = document.getElementById("stored-passwords-list");
  storedPasswordsList.innerHTML = "";
}

function clearGeneratedPassword() {
  document.getElementById("generated-password").textContent = "";
  document.getElementById("copy-to-clipboard").disabled = true;
  evaluatePasswordStrength();
}

function evaluatePasswordStrength() {
  var password = document.getElementById("generated-password").textContent;
  var strengthText = document.getElementById("password-strength");
  
  if (password === "") {
    strengthText.textContent = "";
    return;
  }
  
  var strength = calculatePasswordStrength(password);
  
  if (strength < 0.3) {
    strengthText.textContent = "Senha Fraca";
    strengthText.style.color = "#ff0000";
  } else if (strength < 0.7) {
    strengthText.textContent = "Senha Boa";
    strengthText.style.color = "#ffa500";
  } else {
    strengthText.textContent = "Senha Forte";
    strengthText.style.color = "#008000";
  }
}

function calculatePasswordStrength(password) {
  var score = 0;
  
  if (password.length < 8) {
    return score;
  }  
 
  if (/[a-z]/.test(password)) {
    score += 0.2;
  }
  if (/[A-Z]/.test(password)) {
    score += 0.2;
  }
  if (/[0-9]/.test(password)) {
    score += 0.2;
  }
  if (/[^a-zA-Z0-9]/.test(password)) {
    score += 0.2;
  }
  if (password.length >= 12) {
    score += 0.2;
  }
  
  return score;
}
