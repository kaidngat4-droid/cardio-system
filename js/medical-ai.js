/* ===============================
   Cardio AI Medical Assistant
================================ */

let patients = JSON.parse(localStorage.getItem("patients")) || [];

/* تحليل المريض */

function analyzePatient(patient){

let alerts = [];
let suggestions = [];
let risk = "منخفض";

/* ضغط الدم */

if(patient.bloodPressure){

let bp = parseInt(patient.bloodPressure);

if(bp > 160){

alerts.push("⚠ ضغط الدم مرتفع جداً");

suggestions.push("Beta Blockers");

risk = "مرتفع";

}

else if(bp > 140){

alerts.push("⚠ ضغط الدم مرتفع");

risk = "متوسط";

}

}

/* LDL */

if(patient.ldl){

let ldl = parseInt(patient.ldl);

if(ldl > 130){

alerts.push("⚠ ارتفاع الكوليسترول الضار LDL");

suggestions.push("Statins");

risk = "متوسط";

}

}

/* السكر */

if(patient.hba1c){

let sugar = parseFloat(patient.hba1c);

if(sugar > 6.5){

alerts.push("⚠ احتمال سكري");

risk = "متوسط";

}

}

/* ضربات القلب */

if(patient.heartRate){

let hr = parseInt(patient.heartRate);

if(hr > 110){

alerts.push("⚠ تسارع ضربات القلب");

risk = "مرتفع";

}

}

return {

alerts:alerts,
suggestions:suggestions,
risk:risk

};

}


/* تحليل جميع المرضى */

function runMedicalAI(){

let results = [];

patients.forEach(p=>{

let analysis = analyzePatient(p);

results.push({

name:p.name,
id:p.id,
risk:analysis.risk,
alerts:analysis.alerts,
suggestions:analysis.suggestions

});

});

displayAIResults(results);

}


/* عرض النتائج */

function displayAIResults(data){

let table = document.getElementById("aiTable");

if(!table) return;

table.innerHTML="";

data.forEach(r=>{

let riskColor = "green";

if(r.risk==="متوسط") riskColor="orange";
if(r.risk==="مرتفع") riskColor="red";

table.innerHTML+=`

<tr>

<td>${r.name}</td>

<td>${r.id}</td>

<td style="color:${riskColor};font-weight:bold">${r.risk}</td>

<td>${r.alerts.join("<br>")}</td>

<td>${r.suggestions.join(", ")}</td>

</tr>

`;

});

}


/* تشغيل الذكاء */

runMedicalAI();