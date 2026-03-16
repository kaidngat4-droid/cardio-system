let patients = JSON.parse(localStorage.getItem("patients")) || [];

/* توليد رقم مريض */

function generateId(){

return "PT-" + Math.floor(Math.random()*100000);

}


/* إضافة مريض */

function addPatient(){

let patient = {

id: generateId(),

name: document.getElementById("name").value,

nationalId: document.getElementById("nationalId").value,

age: document.getElementById("age").value,

gender: document.getElementById("gender").value,

bloodType: document.getElementById("bloodType").value,

phone: document.getElementById("phone").value,

diagnosis: document.getElementById("diagnosis").value,

bloodPressure: document.getElementById("bloodPressure").value

};

patients.push(patient);

localStorage.setItem("patients", JSON.stringify(patients));

loadPatients();

}


/* عرض المرضى */

function loadPatients(){

let table = document.getElementById("patientsTable");

table.innerHTML = "";

patients.forEach((p,index)=>{

table.innerHTML += `

<tr>

<td>${p.id}</td>

<td>${p.name}</td>

<td>${p.age}</td>

<td>${p.gender}</td>

<td>${p.bloodType}</td>

<td>${p.diagnosis}</td>

<td>

<button onclick="viewPatient(${index})">

📄 عرض

</button>

</td>

<td>

<button class="deleteBtn"

onclick="deletePatient(${index})">

❌

</button>

</td>

</tr>

`;

});

}


/* حذف مريض */

function deletePatient(index){

if(confirm("هل تريد حذف المريض؟")){

patients.splice(index,1);

localStorage.setItem("patients", JSON.stringify(patients));

loadPatients();

}

}


/* البحث عن مريض */

function searchPatient(){

let value = document.getElementById("search").value.toLowerCase();

let rows = document.querySelectorAll("#patientsTable tr");

rows.forEach(row=>{

row.style.display = row.innerText.toLowerCase().includes(value) ? "" : "none";

});

}


/* عرض الملف الطبي */

function viewPatient(index){

let p = patients[index];

document.getElementById("patientProfile").style.display = "block";

document.getElementById("profileContent").innerHTML = `

<p><b>الاسم:</b> ${p.name}</p>

<p><b>العمر:</b> ${p.age}</p>

<p><b>فصيلة الدم:</b> ${p.bloodType}</p>

<p><b>التشخيص:</b> ${p.diagnosis}</p>

<p><b>ضغط الدم:</b> ${p.bloodPressure}</p>

`;


/* رسم بياني لحالة المريض */

let ctx = document.getElementById("patientChart");

new Chart(ctx, {

type: "line",

data: {

labels: ["يناير","فبراير","مارس","أبريل"],

datasets: [{

label: "ضغط الدم",

data: [120,130,140,135],

borderWidth: 2,

tension: 0.4

}]

},

options: {

responsive: true,

plugins: {

legend: {

display: true

}

}

}

});

}


/* تحميل المرضى عند فتح الصفحة */

loadPatients();
