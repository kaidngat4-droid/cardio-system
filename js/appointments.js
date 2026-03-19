/* ===================================
   نظام إدارة المواعيد - مركز القلب
   =================================== */

/* ===== حماية الصفحة ===== */
if(localStorage.getItem("loggedIn") !== "true"){
    alert("يرجى تسجيل الدخول أولاً");
    window.location.href="../index.html";
}

/* ===== جلب البيانات ===== */
let patients = JSON.parse(localStorage.getItem("patients")) || [];
let appointments = JSON.parse(localStorage.getItem("appointments")) || [];

/* ===== ملء قائمة المرضى ===== */
function fillPatientSelect(){
    let select = document.getElementById("patientSelect");
    if(!select) return;
    select.innerHTML = '<option value="">👤 اختر المريض</option>';
    patients.forEach((p,i)=>{
        select.innerHTML += `<option value="${i}">🧑 ${p.name}</option>`;
    });
}
fillPatientSelect();

/* ===== عرض بيانات المريض ===== */
function showPatientInfo(){
    let index = document.getElementById("patientSelect").value;
    if(index === "") return;
    let p = patients[index];
    let info = document.getElementById("patientInfo");
    if(info){
        info.innerHTML = `
        <b>الاسم:</b> ${p.name} <br>
        <b>العمر:</b> ${p.age} <br>
        <b>الجنس:</b> ${p.gender} <br>
        <b>رقم المريض:</b> ${p.id}`;
    }
}

/* ===== إضافة موعد ===== */
function addAppointment(){
    let patientIndex = document.getElementById("patientSelect").value;
    let doctor = document.getElementById("doctor").value.trim();
    let date = document.getElementById("date").value;
    let time = document.getElementById("time").value;
    let service = document.getElementById("service").value;
    let location = document.getElementById("location").value;

    if(patientIndex === "" || !doctor || !date || !time || !service){
        return alert("⚠ يرجى تعبئة جميع الحقول");
    }

    let patient = patients[patientIndex];
    let appointment = { patient: patient.name, doctor, date, time, service, location };
    appointments.push(appointment);
    localStorage.setItem("appointments", JSON.stringify(appointments));

    alert(`✅ تم إضافة الموعد للمريض ${patient.name} بتاريخ ${date} الساعة ${time}`);
    displayAppointments();
    clearForm();
    loadCalendar();
    updateStats();
}

/* ===== عرض المواعيد في الجدول ===== */
function displayAppointments(){
    let tbody = document.getElementById("appointmentsTable");
    if(!tbody) return;
    tbody.innerHTML = "";
    appointments.forEach((a,i)=>{
        tbody.innerHTML += `
        <tr>
            <td><i class="fa-solid fa-user-injured"></i> ${a.patient}</td>
            <td><i class="fa-solid fa-user-doctor"></i> ${a.doctor}</td>
            <td><i class="fa-solid fa-calendar"></i> ${a.date}</td>
            <td><i class="fa-solid fa-clock"></i> ${a.time}</td>
            <td>
                <button class="deleteBtn" onclick="deleteAppointment(${i})">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        </tr>`;
    });
}
displayAppointments();

/* ===== حذف موعد ===== */
function deleteAppointment(index){
    if(confirm("هل تريد حذف هذا الموعد؟")){
        appointments.splice(index,1);
        localStorage.setItem("appointments", JSON.stringify(appointments));
        displayAppointments();
        loadCalendar();
        updateStats();
    }
}

/* ===== تنظيف الحقول ===== */
function clearForm(){
    document.getElementById("doctor").value = "";
    document.getElementById("date").value = "";
    document.getElementById("time").value = "";
    document.getElementById("patientSelect").value = "";
    document.getElementById("location").value = "";
}

/* ===== تحديث الإحصائيات ===== */
function updateStats(){
    let today = new Date().toISOString().split("T")[0];
    let todayCount = appointments.filter(a=>a.date===today).length;
    document.getElementById("todayCount").innerText = todayCount;
    document.getElementById("totalAppointments").innerText = appointments.length;
    document.getElementById("totalPatients").innerText = patients.length;
}
updateStats();

/* ===== تشغيل FullCalendar ===== */
function loadCalendar(){
    let calendarEl = document.getElementById("calendar");
    if(!calendarEl) return;
    calendarEl.innerHTML = "";
    let events = appointments.map(a=>({
        title: `${a.patient} - ${a.service}`,
        start: a.date + "T" + a.time
    }));
    let calendar = new FullCalendar.Calendar(calendarEl,{
        initialView: 'dayGridMonth',
        height: 500,
        events: events
    });
    calendar.render();
}
loadCalendar();

/* ===== QR Code لتأكيد الموعد ===== */
function generateQR(id){
    let qr = document.getElementById("qr");
    if(!qr) return;
    QRCode.toCanvas(qr, id);
}

/* ===== إرسال تذكير SMS ===== */
function sendSMS(){
    let patientIndex = document.getElementById("patientSelect").value;
    if(patientIndex === "") return alert("اختر المريض لإرسال التذكير");
    let patient = patients[patientIndex];
    alert(`📱 تم إرسال تذكير للمريض ${patient.name} بالموعد`);
}

/* ===== تسجيل خروج ===== */
function logout(){
    localStorage.removeItem("loggedIn");
    window.location.href="../index.html";
}
