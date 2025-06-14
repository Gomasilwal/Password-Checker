function checkStrength() {
    const pwd  = document.getElementById("password").value;
    const msg  = document.getElementById("strengthMsg");

    //check individual criteria
    const islength= pwd.length >= 8;
    const hasLower = /[a-z]/.test(pwd);
    const hasUpper = /[A-Z]/.test(pwd);
    const hasNumber = /[0-9]/.test(pwd);
    const hasSpecial = /[^A-Za-z0-9]/.test(pwd);

    //update Visual Checklist
    updateTip("lengthTip", islength);
    updateTip("lowerTip", hasLower);
    updateTip("upperTip", hasUpper);
    updateTip("numberTip", hasNumber);
    updateTip("specialTip", hasSpecial);

       //count strength
       let strength = 0;
       if (islength) strength++; 
       if (hasLower) strength++; 
       if (hasUpper) strength++; 
       if (hasNumber) strength++;
       if (hasSpecial) strength++;

        //RESET Class
        msg.classList.remove("weak","moderate","strong","very-strong");

//new Class based on strength
    if (pwd.length === 0){
        msg.textContent = "";
    } if (strength === 5){
        msg.textContent = " 💪 Very Strong Password";
        msg.classList.add("very-strong");
    } else if (strength >= 4){
         msg.textContent = "🟢Strong Password";
        msg.classList.add("strong");
    }else if (strength >= 3){
         msg.textContent = "🟡 Moderate Password";
        msg.classList.add("moderate");
    }else {
         msg.textContent = "🔴 Weak Password";
        msg.classList.add("weak");
    }
}

function updateTip(id, condition) {
    const element = document.getElementById(id);
    if(condition){
        element.textContent = "✅" + element.textContent.slice(2);
        element.classList.remove("invalid");
        element.classList.add("invalid");
    }else{
        element.textContent = "❌" + element.textContent.slice(2);
        element.classList.remove("invalid");
        element.classList.add("invalid");
    }
}

function toggleVisibility() {
    const pwdField = document.getElementById("password");
    pwdField.type = pwdField.type === "password" ? "text" : "password";
}

function toggleDarkMode() {
    document.body.classList.toggle("dark");
}

function generatePassword() {
    const charset ="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}[]";
    let pwd = "";
    for (let i = 0; i < 14; i++){
        pwd += charset.charAt(Math.floor(Math.random() * charset.length));        
    }

    const pwdField = document.getElementById("password");
    pwdField.value = pwd;
    checkStrength();

    document.addEventListener("DOMContentLoaded", () => {
        document.getElementById("password").addEventListener("input",checkStrength);
    });
}