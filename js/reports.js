/* =========================
   Cardio Center Reports
   Advanced Analytics
========================= */

// تحميل البيانات

let patients = JSON.parse(localStorage.getItem("patients")) || [];
let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
let tests = JSON.parse(localStorage.getItem("tests")) || [];
let operations = JSON.parse(localStorage.getItem("operations")) || [];
let prescriptions = JSON.parse(localStorage.getItem("prescriptions")) || [];


/* =========================
   الإحصائيات العامة
========================= */

function loadStatistics(){

document.getElementById("patientsCount").innerText = patients.length;

document.getElementById("appointmentsCount").innerText = appointments.length;

document.getElementById("testsCount").innerText = tests.length;

document.getElementById("operationsCount").innerText = operations.length;

document.getElementById("pharmacyCount").innerText = prescriptions.length;

}


/* =========================
   تحليل الأمراض
========================= */

function analyzeDiseases(){

let cad = 0;
let heartAttack = 0;
let arrhythmia = 0;
let hypertension = 0;

patients.forEach(p=>{

let d = (p.diagnosis || "").toLowerCase();

if(d.includes("cad")) cad++;
if(d.includes("attack")) heartAttack++;
if(d.includes("arrhythmia")) arrhythmia++;
if(d.includes("pressure")) hypertension++;

});

return [cad,heartAttack,arrhythmia,hypertension];

}


/* =========================
   تحليل العمليات
========================= */

function analyzeOperations(){

let angioplasty = 0;
let cabg = 0;
let pacemaker = 0;

operations.forEach(o=>{

let type = (o.type || "").toLowerCase();

if(type.includes("angioplasty")) angioplasty++;
if(type.includes("cabg")) cabg++;
if(type.includes("pacemaker")) pacemaker++;

});

return [angioplasty,cabg,pacemaker];

}


/* =========================
   تحليل المختبر
========================= */

function analyzeLabs(){

let troponin = 0;
let ldl = 0;
let hdl = 0;
let triglycerides = 0;

tests.forEach(t=>{

if(t.troponin) troponin++;
if(t.ldl) ldl++;
if(t.hdl) hdl++;
if(t.triglycerides) triglycerides++;

});

return [troponin,ldl,hdl,triglycerides];

}


/* =========================
   التنبيهات الطبية
========================= */

function generateAlerts(){

let container = document.getElementById("aiAlerts");

if(!container) return;

container.innerHTML="";

patients.forEach(p=>{

if(p.bloodPressure && p.bloodPressure > 160){

container.innerHTML +=
`<div class="alert">⚠ ضغط دم مرتفع للمريض ${p.name}</div>`;

}

if(p.ldl && p.ldl > 160){

container.innerHTML +=
`<div class="alert">⚠ ارتفاع LDL للمريض ${p.name}</div>`;

}

if(p.heartRate && p.heartRate > 110){

container.innerHTML +=
`<div class="alert">⚠ تسارع نبض القلب للمريض ${p.name}</div>`;

}

});

}


/* =========================
   الرسم البياني للمرضى
========================= */

function drawPatientsChart(){

new Chart(document.getElementById("patientsChart"),{

type:"line",

data:{

labels:["Jan","Feb","Mar","Apr","May","Jun"],

datasets:[{

label:"Patients",

data:[10,14,20,18,22,25]

}]

}

});

}


/* =========================
   رسم أمراض القلب
========================= */

function drawDiseaseChart(){

let data = analyzeDiseases();

new Chart(document.getElementById("diseaseChart"),{

type:"pie",

data:{

labels:["CAD","Heart Attack","Arrhythmia","Hypertension"],

datasets:[{

data:data

}]

}

});

}


/* =========================
   رسم العمليات
========================= */

function drawOperationsChart(){

let data = analyzeOperations();

new Chart(document.getElementById("operationsChart"),{

type:"bar",

data:{

labels:["Angioplasty","CABG","Pacemaker"],

datasets:[{

label:"Operations",

data:data

}]

}

});

}


/* =========================
   رسم المختبر
========================= */

function drawLabChart(){

let data = analyzeLabs();

new Chart(document.getElementById("labChart"),{

type:"bar",

data:{

labels:["Troponin","LDL","HDL","Triglycerides"],

datasets:[{

label:"Lab Tests",

data:data

}]

}

});

}


/* =========================
   تشغيل التقارير
========================= */

function initReports(){

loadStatistics();

generateAlerts();

drawPatientsChart();

drawDiseaseChart();

drawOperationsChart();

drawLabChart();

}


/* تشغيل النظام */

initReports();
