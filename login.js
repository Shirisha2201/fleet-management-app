document.getElementById("loginBtn").addEventListener("click",function(){
    let email = document.getElementById("email").value.trim();
    let pass = document.getElementById("password").value.trim();

    if(email==="admin@gmail.com" && pass==="admin1234"){
        alert("Login success");
        window.location.href="admin.html";
    } else{
        alert("Wrong email or password");
    }
});