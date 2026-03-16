let tests = JSON.parse(localStorage.getItem("tests")) || [];

let patients = JSON.parse(localStorage.getItem("patients")) || [];


/* عرض المريض */

let patientId = localStorage.getItem("selectedPatient");

let patient = patients.find(p => p.id === patientId);

if(patient){

document.getElementById("patientInfo").innerHTML = `

<div class="card">

<p><b>الاسم:</b> ${patient.name}</p>

<p><b>العمر:</b> ${patient.age}</p>

<p><b>التشخيص:</b> ${patient.diagnosis}</p>

</div>

`;

}


/* حفظ التحليل */

function saveTest(){

let troponin = parseFloat(document.getElementById("troponin").value) || 0;

let test = {

patientId: patientId,

troponin: troponin,

ckmb: document.getElementById("ckmb").value,

bnp: document.getElementById("bnp").value,

cholesterol: document.getElementById("cholesterol").value

};

tests.push(test);

localStorage.setItem("tests", JSON.stringify(tests));

checkAlerts(troponin);

drawChart();

}


/* تنبيهات */

function checkAlerts(troponin){

let alertBox = document.getElementById("medicalAlert");

if(troponin > 0.4){

alertBox.innerHTML =

`<div class="alert">

⚠ احتمال نوبة قلبية — Troponin مرتفع

</div>`;

}

else{

alertBox.innerHTML =

`<div class="normal">

✔ النتائج طبيعية

</div>`;

}

}


/* رسم بياني */

function drawChart(){

new Chart(document.getElementById("testChart"),{

type:"line",

data:{

labels:["1","2","3","4"],

datasets:[{

label:"Troponin",

data:[0.1,0.2,0.5,0.3]

}]

}

});

}

drawChart();
let tests = JSON.parse(localStorage.getItem("tests")) || [];

function addTest(patientIndex, testName, value, threshold){
    if(patientIndex === "") return alert("اختر المريض");
    let patient = patients[patientIndex];

    let test = { patient: patient.name, testName, value };
    tests.push(test);
    localStorage.setItem("tests", JSON.stringify(tests));

    if(value > threshold){
        alertCriticalTest(patient.name, testName, value);
    }
}
