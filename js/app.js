/* =========================================
   Cardio Center - Main App JS
========================================= */

/* =========================
   تسجيل الدخول
========================= */

function login(){

let user = document.getElementById("username").value.trim();
let pass = document.getElementById("password").value.trim();

if(user === "admin" && pass === "770075098"){

// حفظ الجلسة
localStorage.setItem("loggedIn", "true");
localStorage.setItem("user", user);

// إشعار
showNotification("✅ تم تسجيل الدخول بنجاح");

// تشغيل صوت (اختياري)
playAlertSound();

// انتقال للداشبورد
setTimeout(()=>{
window.location.href = "pages/dashboard.html";
},1000);

}else{

document.getElementById("error").innerText =
"❌ اسم المستخدم أو كلمة المرور غير صحيحة";

showNotification("⚠ محاولة دخول فاشلة");

}

}


/* =========================
   تسجيل الخروج
========================= */

function logout(){

localStorage.removeItem("loggedIn");
localStorage.removeItem("user");

showNotification("👋 تم تسجيل الخروج");

setTimeout(()=>{
window.location.href = "../index.html";
},1000);

}


/* =========================
   التحقق من تسجيل الدخول
========================= */

function checkAuth(){

let isLogged = localStorage.getItem("loggedIn");

if(isLogged !== "true"){

window.location.href = "../index.html";

}

}


/* =========================
   الوضع الليلي
========================= */

function toggleDarkMode(){

document.body.classList.toggle("dark-mode");

let mode = document.body.classList.contains("dark-mode");

localStorage.setItem("darkMode", mode);

}


/* تحميل الوضع */

function loadDarkMode(){

if(localStorage.getItem("darkMode") === "true"){

document.body.classList.add("dark-mode");

}

}


/* =========================
   نظام الإشعارات
========================= */

function showNotification(msg){

let div = document.createElement("div");

div.className = "notification";

div.innerText = msg;

document.body.appendChild(div);

setTimeout(()=>{
div.remove();
},3000);

}


/* =========================
   الصوت
========================= */

function playAlertSound(){

let audio = new Audio("../sounds/alert.mp3");

audio.play().catch(()=>{});

}


/* =========================
   معلومات المستخدم
========================= */

function loadUser(){

let user = localStorage.getItem("user");

let el = document.getElementById("currentUser");

if(el && user){

el.innerText = "👤 " + user;

}

}


/* =========================
   تشغيل النظام عند التحميل
========================= */

window.addEventListener("load", function(){

loadDarkMode();
loadUser();

// تحقق فقط داخل الصفحات الداخلية
if(window.location.pathname.includes("pages")){
checkAuth();
}

});
