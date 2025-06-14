function checkStrength() {
    const pw  = document.getElementById("password").value;
    const msg  = document.getElementById("strengthMsg");

    let strength = 0;
    if(pwd.length >= 8) strength++;
    if(/[a-z]/.test(pwd)) strength++;
    if(/[A-Z]/.test(pwd)) strength++;
    if(/[0-9]/.test(pwd)) strength++;
    if(/[^A-Za-z0-9]/.test(pwd)) strength++;

//Reset Class
    msg.className = "strength";

    if (strength === 5){
        msg.testContent = "Very Strong Password";
        msg.classList.add("very-strong");
    } else if (strength >= 4){
         msg.testContent = "Strong Password";
        msg.classList.add("strong");
    }else if (strength >= 3){
         msg.testContent = "Moderate Password";
        msg.classList.add("moderate");
    }else {
         msg.testContent = "Weak Password";
        msg.classList.add("weak");
    }
    
}