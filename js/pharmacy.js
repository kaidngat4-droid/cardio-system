JavaScript
/* ================================
   Cardio Center Pharmacy System
   Advanced Pharmacy Management
================================ */

/* تحميل البيانات */

let medicines = JSON.parse(localStorage.getItem("medicines")) || [];
let prescriptions = JSON.parse(localStorage.getItem("prescriptions")) || [];
let patients = JSON.parse(localStorage.getItem("patients")) || [];


/* عناصر الصفحة */

const patientSelect = document.getElementById("patientSelect");
const medSelect = document.getElementById("medSelect");

const medTable = document.getElementById("medTable");
const prescriptionsTable = document.getElementById("prescriptionsTable");

const totalMedicines = document.getElementById("totalMedicines");
const totalPrescriptions = document.getElementById("totalPrescriptions");
const totalRevenue = document.getElementById("totalRevenue");
const alertsBox = document.getElementById("alertsBox");


/* =================================
   تحميل المرضى
================================= */

function loadPatients(){

if(!patientSelect) return;

patientSelect.innerHTML = '<option value="">اختر المريض</option>';

patients.forEach((p,i)=>{

let option = document.createElement("option");

option.value = i;

option.textContent = `${p.name} (${p.id})`;

patientSelect.appendChild(option);

});

}


/* =================================
   تحميل الأدوية في القائمة
================================= */

function loadMedicineSelect(){

if(!medSelect) return;

medSelect.innerHTML = '<option value="">اختر الدواء</option>';

medicines.forEach((m,i)=>{

let option = document.createElement("option");

option.value = i;

option.textContent = `${m.name} - ${m.dose}`;

medSelect.appendChild(option);

});

}


/* =================================
   إضافة دواء للمخزون
================================= */

function addMedicine(){

let name = document.getElementById("medName").value;
let dose = document.getElementById("dose").value;
let quantity = parseInt(document.getElementById("quantity").value);
let price = parseFloat(document.getElementById("price").value);
let unit = document.getElementById("unit").value;
let expiry = document.getElementById("expiry").value;

if(!name){
alert("ادخل اسم الدواء");
return;
}

let medicine = {

id: "MED-"+Date.now(),

name:name,

dose:dose,

quantity:quantity,

price:price,

unit:unit,

expiry:expiry

};

medicines.push(medicine);

localStorage.setItem("medicines",JSON.stringify(medicines));

loadMedicines();
loadMedicineSelect();
updateStats();

alert("تم إضافة الدواء بنجاح 💊");

}


/* =================================
   صرف دواء لمريض
================================= */

function addPrescription(){

let pIndex = patientSelect.value;
let mIndex = medSelect.value;
let qty = parseInt(document.getElementById("medQty").value);
let instructions = document.getElementById("instructions").value;

if(pIndex==="" || mIndex===""){

alert("اختر المريض والدواء");

return;

}

let patient = patients[pIndex];
let medicine = medicines[mIndex];

if(medicine.quantity < qty){

alert("الكمية غير متوفرة في المخزون");

return;

}

medicine.quantity -= qty;

let prescription = {

id:"RX-"+Date.now(),

patient:patient.name,
patientId:patient.id,

medicine:medicine.name,

dose:medicine.dose,

quantity:qty,

price:medicine.price,

total: medicine.price * qty,

instructions:instructions,

date:new Date().toLocaleDateString()

};

prescriptions.push(prescription);

localStorage.setItem("prescriptions",JSON.stringify(prescriptions));
localStorage.setItem("medicines",JSON.stringify(medicines));

loadMedicines();
loadPrescriptions();
updateStats();
checkAlerts();

alert("تم صرف الدواء للمريض 💊");

}


/* =================================
   عرض المخزون
================================= */

function loadMedicines(){

if(!medTable) return;

medTable.innerHTML="";

medicines.forEach((m,i)=>{

let today = new Date();
let expiry = new Date(m.expiry);

let status = "متوفر";
let color = "green";

if(expiry < today){

status = "منتهي";
color = "red";

}

else if(m.quantity < 10){

status = "قليل";
color = "orange";

}

medTable.innerHTML += `

<tr>

<td>${m.name}</td>

<td>${m.dose}</td>

<td>${m.quantity}</td>

<td>${m.unit}</td>

<td>${m.price}</td>

<td>${m.expiry}</td>

<td style="color:${color};font-weight:bold">${status}</td>

<td>

<button onclick="deleteMedicine(${i})" class="deleteBtn">
❌
</button>

</td>

</tr>

`;

});

}


/* =================================
   حذف دواء
================================= */

function deleteMedicine(index){

if(confirm("هل تريد حذف الدواء؟")){

medicines.splice(index,1);

localStorage.setItem("medicines",JSON.stringify(medicines));

loadMedicines();
updateStats();

}

}


/* =================================
   عرض الوصفات
================================= */

function loadPrescriptions(){

if(!prescriptionsTable) return;

prescriptionsTable.innerHTML="";

prescriptions.forEach(p=>{

prescriptionsTable.innerHTML += `

<tr>

<td>${p.patient}</td>

<td>${p.patientId}</td>

<td>${p.medicine}</td>

<td>${p.dose}</td>

<td>${p.quantity}</td>

<td>${p.total}</td>

<td>${p.instructions}</td>

<td>${p.date}</td>

</tr>

`;

});

}


/* =================================
   تنبيهات المخزون
================================= */

function checkAlerts(){

if(!alertsBox) return;

alertsBox.innerHTML="";

let today = new Date();

medicines.forEach(m=>{

let expiry = new Date(m.expiry);

if(m.quantity < 10){

alertsBox.innerHTML += `<li>⚠ مخزون منخفض للدواء ${m.name}</li>`;

}

if(expiry < today){

alertsBox.innerHTML += `<li>⛔ الدواء ${m.name} منتهي الصلاحية</li>`;

}

});

}


/* =================================
   البحث
================================= */

function searchMedicine(){

let val = document.getElementById("searchInput").value.toLowerCase();

document.querySelectorAll("#medTable tr").forEach(row=>{

row.style.display =
row.innerText.toLowerCase().includes(val) ? "" : "none";

});

}


/* =================================
   إحصائيات الصيدلية
================================= */

function updateStats(){

if(totalMedicines)
totalMedicines.innerText = medicines.length;

if(totalPrescriptions)
totalPrescriptions.innerText = prescriptions.length;

if(totalRevenue){

let revenue = prescriptions.reduce((sum,p)=>sum+p.total,0);

totalRevenue.innerText = revenue.toLocaleString();

}

}


/* =================================
   رسم المخطط
================================= */

function drawChart(){

if(!document.getElementById("medChart")) return;

let names = medicines.map(m=>m.name);
let qty = medicines.map(m=>m.quantity);

new Chart(document.getElementById("medChart"),{

type:"bar",

data:{
labels:names,
datasets:[{
label:"المخزون",
data:qty,
backgroundColor:"#0d6efd"
}]
},

options:{
responsive:true
}

});

}


/* =================================
   طباعة الوصفة
================================= */

function printPrescription(){

window.print();

}


/* =================================
   تشغيل النظام
================================= */

loadPatients();
loadMedicineSelect();
loadMedicines();
loadPrescriptions();
updateStats();
checkAlerts();
drawChart();