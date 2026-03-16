let alerts = JSON.parse(localStorage.getItem("alerts")) || [];

function showNotification(title, message) {
    if (Notification.permission === "granted") {
        new Notification(title, { body: message, icon: "../assets/icons/heart.png" });
    }
    let audio = new Audio("../sounds/alert.mp3");
    audio.volume = 0.5;
    audio.play().catch(e=>console.log(e));

    alerts.push({title, message, time:new Date().toLocaleString()});
    localStorage.setItem("alerts", JSON.stringify(alerts));
}

if (Notification.permission !== "granted") {
    Notification.requestPermission();
}

function alertNewAppointment(patient, date, time){
    showNotification("موعد جديد", `المريض: ${patient}\nالتاريخ: ${date}\nالوقت: ${time}`);
}

function alertCriticalTest(patient, test, value){
    showNotification("⚠️ تحليل حرج", `المريض: ${patient}\n${test} = ${value}`);
}

function alertOperation(patient, operation, status){
    showNotification("🫀 عملية جديدة", `المريض: ${patient}\n${operation}\nالحالة: ${status}`);
}

function alertMedicine(patient, medicine, quantity){
    showNotification("💊 دواء جديد", `المريض: ${patient}\n${medicine}\nالكمية: ${quantity}`);
}