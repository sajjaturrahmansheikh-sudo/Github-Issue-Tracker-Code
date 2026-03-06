
const signInBtn = document.getElementById("signInBtn");


signInBtn.addEventListener("click", () => {

    const inputUserName = document.getElementById("inputUsername").value;

    const inputPassword = document.getElementById("inputPassword").value;
    
    if(inputUserName !== "admin"){
        alert("wrong username");
        return
    }
    if(inputPassword !== "admin123"){
        alert("worng password");
        return;
    }
    if(inputUserName === "admin" && inputPassword === "admin123"){
        alert("SignIn Success");
        window.location.assign("/home.html");
    }
})
