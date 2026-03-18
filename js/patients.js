/* =========================
   Advanced Patients System
========================= */

let patients = JSON.parse(localStorage.getItem("patients")) || [];
let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
let tests = JSON.parse(localStorage.getItem("tests")) || [];
let operations = JSON.parse(localStorage.getItem("operations")) || [];

/* توليد ID */

function generateId(){
    return "P-" + Date.now();
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
        bloodPressure: document.getElementById("bloodPressure").value,

        /* AI */
        ldl: "",
        troponin: "",
        ecg: "",

        createdAt: new Date().toLocaleString()

    };

    if(!patient.name || !patient.age){
        alert("⚠ أدخل الاسم والعمر");
        return;
    }

    patients.push(patient);

    localStorage.setItem("patients", JSON.stringify(patients));

    alert("✅ تم حفظ المريض");

    clearForm();
    displayPatients();
}

/* عرض المرضى */

function displayPatients(){

    let table = document.getElementById("patientsTable");
    table.innerHTML="";

    patients.forEach((p,index)=>{

        table.innerHTML += `
        <tr>
        <td>${p.id}</td>
        <td>${p.name}</td>
        <td>${p.age}</td>
        <td>${p.gender}</td>
        <td>${p.bloodType}</td>
        <td>${p.diagnosis}</td>

        <td><button onclick="viewPatient(${index})">👁</button></td>

        <td><button onclick="goAppointments('${p.id}')">📅</button></td>
        <td><button onclick="goTests('${p.id}')">🧪</button></td>
        <td><button onclick="goOperations('${p.id}')">🫀</button></td>

        <td>
        <button class="deleteBtn" onclick="deletePatient(${index})">🗑</button>
        </td>

        </tr>
        `;
    });
}

/* حذف */

function deletePatient(index){

    if(confirm("هل تريد حذف المريض؟")){

        patients.splice(index,1);

        localStorage.setItem("patients", JSON.stringify(patients));

        displayPatients();
    }
}

/* البحث */

function searchPatient(){

    let val = document.getElementById("search").value.toLowerCase();

    document.querySelectorAll("#patientsTable tr").forEach(row=>{
        row.style.display =
        row.innerText.toLowerCase().includes(val) ? "" : "none";
    });
}

/* عرض الملف */

function viewPatient(index){

    let p = patients[index];

    document.getElementById("patientProfile").style.display="block";

    document.getElementById("profileContent").innerHTML = `
    <p>👤 ${p.name}</p>
    <p>🆔 ${p.id}</p>
    <p>📱 ${p.phone}</p>
    <p>🩸 ${p.bloodType}</p>
    <p>💔 ${p.diagnosis}</p>
    <p>🕒 ${p.createdAt}</p>
    `;

    /* المواعيد */
    let appList = document.getElementById("patientAppointments");
    if(appList){
        appList.innerHTML="";
        appointments
        .filter(a=>a.patientId===p.id)
        .forEach(a=>{
            appList.innerHTML += `<li>${a.date} - ${a.service}</li>`;
        });
    }

    /* التحاليل */
    let testList = document.getElementById("patientTests");
    if(testList){
        testList.innerHTML="";
        tests
        .filter(t=>t.patientId===p.id)
        .forEach(t=>{
            testList.innerHTML += `<li>${t.type} : ${t.result}</li>`;
        });
    }

    /* العمليات */
    let opList = document.getElementById("patientOperations");
    if(opList){
        opList.innerHTML="";
        operations
        .filter(o=>o.patientId===p.id)
        .forEach(o=>{
            opList.innerHTML += `<li>${o.procedure}</li>`;
        });
    }

    /* الرسم */
    new Chart(document.getElementById("patientChart"),{
        type:"line",
        data:{
            labels:["زيارة 1","زيارة 2","زيارة 3"],
            datasets:[{
                label:"ضغط الدم",
                data:[
                    parseInt(p.bloodPressure)||120,
                    140,
                    160
                ]
            }]
        }
    });
}

/* ربط الصفحات */

function goAppointments(id){
    localStorage.setItem("selectedPatient", id);
    window.location="appointments.html";
}

function goTests(id){
    localStorage.setItem("selectedPatient", id);
    window.location="tests.html";
}

function goOperations(id){
    localStorage.setItem("selectedPatient", id);
    window.location="operations.html";
}

/* تنظيف */

function clearForm(){
    document.querySelectorAll("input").forEach(i=>i.value="");
}

/* تشغيل */

displayPatients();
