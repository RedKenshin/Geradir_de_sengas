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