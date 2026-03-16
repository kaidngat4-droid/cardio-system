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


/* ===================================
   تحميل المرضى في القائمة
   =================================== */

function fillPatientSelect(){

let select = document.getElementById("patientSelect");

if(!select) return;

select.innerHTML = '<option value="">👤 اختر المريض</option>';

patients.forEach((p,i)=>{

select.innerHTML +=

`<option value="${i}">
🧑 ${p.name}
</option>`;

});

}

fillPatientSelect();


/* ===================================
   إضافة موعد جديد
   =================================== */

function addAppointment(){

let patientIndex = document.getElementById("patientSelect").value;

let doctor = document.getElementById("doctor").value.trim();

let date = document.getElementById("date").value;

let time = document.getElementById("time").value;


if(patientIndex === "" || !doctor || !date || !time){

alert("⚠ يرجى تعبئة جميع الحقول");

return;

}


let appointment = {

patientIndex: patientIndex,

doctor: doctor,

date: date,

time: time

};


appointments.push(appointment);

localStorage.setItem("appointments", JSON.stringify(appointments));

displayAppointments();

clearForm();

showSuccess();


}


/* ===================================
   عرض المواعيد
   =================================== */

function displayAppointments(){

let tbody = document.getElementById("appointmentsTable");

if(!tbody) return;

tbody.innerHTML="";


appointments.forEach((a,i)=>{

let patientName = patients[a.patientIndex] ?

patients[a.patientIndex].name :

"غير معروف";


tbody.innerHTML +=

`
<tr>

<td>
<i class="fa-solid fa-user-injured"></i>
${patientName}
</td>

<td>
<i class="fa-solid fa-user-doctor"></i>
${a.doctor}
</td>

<td>
<i class="fa-solid fa-calendar"></i>
${a.date}
</td>

<td>
<i class="fa-solid fa-clock"></i>
${a.time}
</td>

<td>

<button class="deleteBtn"
onclick="deleteAppointment(${i})">

<i class="fa-solid fa-trash"></i>

</button>

</td>

</tr>
`;

});

}

displayAppointments();


/* ===================================
   حذف موعد
   =================================== */

function deleteAppointment(index){

if(confirm("هل تريد حذف هذا الموعد؟")){

appointments.splice(index,1);

localStorage.setItem("appointments", JSON.stringify(appointments));

displayAppointments();

}

}


/* ===================================
   تنظيف الحقول
   =================================== */

function clearForm(){

document.getElementById("doctor").value="";

document.getElementById("date").value="";

document.getElementById("time").value="";

document.getElementById("patientSelect").value="";

}


/* ===================================
   رسالة نجاح
   =================================== */

function showSuccess(){

alert("✅ تم إضافة الموعد بنجاح");

}


/* ===================================
   تسجيل خروج
   =================================== */

function logout(){

localStorage.removeItem("loggedIn");

window.location.href="../index.html";

}
let patients = JSON.parse(localStorage.getItem("patients")) || [];
let appointments = JSON.parse(localStorage.getItem("appointments")) || [];

function addAppointment(patientIndex, date, time, service, doctor, location){
    if(patientIndex === "") return alert("اختر المريض");
    let patient = patients[patientIndex];

    let appointment = { patient: patient.name, date, time, service, doctor, location };
    appointments.push(appointment);
    localStorage.setItem("appointments", JSON.stringify(appointments));

    alertNewAppointment(patient.name, date, time);
    loadCalendar();
    updateStats();
}
