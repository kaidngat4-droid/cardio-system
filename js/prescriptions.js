/* =========================
   Cardio Center
   Prescriptions System
========================= */


/* تحميل البيانات */

let patients = JSON.parse(localStorage.getItem("patients")) || [];
let drugs = JSON.parse(localStorage.getItem("drugs")) || [];
let prescriptions = JSON.parse(localStorage.getItem("prescriptions")) || [];


/* =========================
   تحميل المرضى
========================= */

function loadPatients(){

let select = document.getElementById("patientSelect");

if(!select) return;

select.innerHTML = "<option value=''>اختر المريض</option>";

patients.forEach((p,i)=>{

select.innerHTML += `
<option value="${i}">
${p.name} - ${p.id}
</option>
`;

});

}


/* =========================
   تحميل الأدوية
========================= */

function loadDrugs(){

let select = document.getElementById("drugSelect");

if(!select) return;

select.innerHTML = "<option value=''>اختر الدواء</option>";

drugs.forEach((d,i)=>{

select.innerHTML += `
<option value="${i}">
${d.name}
</option>
`;

});

}


/* =========================
   توليد رقم وصفة
========================= */

function generatePrescriptionId(){

return "RX-" + Date.now();

}


/* =========================
   إضافة وصفة
========================= */

function addPrescription(){

let patientIndex = document.getElementById("patientSelect").value;
let drugIndex = document.getElementById("drugSelect").value;

let dosage = document.getElementById("dosage").value;
let frequency = document.getElementById("frequency").value;
let duration = document.getElementById("duration").value;
let instructions = document.getElementById("instructions").value;
let doctor = document.getElementById("doctor").value;

if(patientIndex === "" || drugIndex === ""){

alert("اختر المريض والدواء");

return;

}

if(!dosage || !frequency){

alert("يرجى إدخال الجرعة وعدد المرات");

return;

}


/* إنشاء الوصفة */

let prescription = {

id: generatePrescriptionId(),

patient: patients[patientIndex].name,

patientId: patients[patientIndex].id,

drug: drugs[drugIndex].name,

dosage: dosage,

frequency: frequency,

duration: duration,

instructions: instructions,

doctor: doctor,

date: new Date().toLocaleDateString()

};


/* تقليل المخزون */

if(drugs[drugIndex].quantity > 0){

drugs[drugIndex].quantity--;

localStorage.setItem("drugs", JSON.stringify(drugs));

}


/* حفظ الوصفة */

prescriptions.push(prescription);

localStorage.setItem("prescriptions", JSON.stringify(prescriptions));


displayPrescriptions();

clearForm();

alert("تم حفظ الوصفة بنجاح ✅");

}


/* =========================
   عرض الوصفات
========================= */

function displayPrescriptions(){

let table = document.getElementById("prescriptionTable");

if(!table) return;

table.innerHTML = "";

prescriptions.forEach((p,i)=>{

table.innerHTML += `

<tr>

<td>${p.id}</td>

<td>${p.patient}</td>

<td>${p.drug}</td>

<td>${p.dosage}</td>

<td>${p.frequency}</td>

<td>${p.duration}</td>

<td>${p.doctor}</td>

<td>${p.date}</td>

<td>
<button onclick="printPrescription('${p.id}')">
🖨
</button>
</td>

<td>
<button onclick="deletePrescription(${i})">
🗑
</button>
</td>

</tr>

`;

});

}


/* =========================
   حذف وصفة
========================= */

function deletePrescription(index){

if(confirm("هل تريد حذف الوصفة؟")){

prescriptions.splice(index,1);

localStorage.setItem("prescriptions", JSON.stringify(prescriptions));

displayPrescriptions();

}

}


/* =========================
   طباعة وصفة
========================= */

function printPrescription(id){

let prescription = prescriptions.find(p => p.id === id);

if(!prescription) return;

let printWindow = window.open("","_blank");

printWindow.document.write(`

<h2>🧾 Prescription</h2>

<p><strong>ID:</strong> ${prescription.id}</p>

<p><strong>Patient:</strong> ${prescription.patient}</p>

<p><strong>Drug:</strong> ${prescription.drug}</p>

<p><strong>Dosage:</strong> ${prescription.dosage}</p>

<p><strong>Frequency:</strong> ${prescription.frequency}</p>

<p><strong>Duration:</strong> ${prescription.duration} days</p>

<p><strong>Doctor:</strong> ${prescription.doctor}</p>

<p><strong>Date:</strong> ${prescription.date}</p>

`);

printWindow.print();

}


/* =========================
   تنظيف النموذج
========================= */

function clearForm(){

document.getElementById("dosage").value="";
document.getElementById("frequency").value="";
document.getElementById("duration").value="";
document.getElementById("instructions").value="";
document.getElementById("doctor").value="";

}


/* =========================
   تشغيل النظام
========================= */

loadPatients();

loadDrugs();

displayPrescriptions();