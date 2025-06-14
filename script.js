function checkStrength() {
    const pw  = document.getElementById("password").value;
    const msg  = document.getElementById("strengthMsg");

    let strength = 0;
    if(pwd.length >= 8) strength++;
    if(/[a-z]/.test(pwd)) strength++;
    if(/[A-Z]/.test(pwd)) strength++;
    if(/[0-9]/.test(pwd)) strength++;
    if(/[^A-Za-z0-9]/.test(pwd)) strength++;


    
}