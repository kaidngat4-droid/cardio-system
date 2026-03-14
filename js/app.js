function login(){

let user = document.getElementById("username").value;
let pass = document.getElementById("password").value;

if(user === "admin" && pass === "770075098"){

window.location = "dashboard.html";

}

else{

document.getElementById("error").innerText = "اسم المستخدم أو كلمة المرور غير صحيحة";

}

}

function logout(){

window.location = "index.html";

}