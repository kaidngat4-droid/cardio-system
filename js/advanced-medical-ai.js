/* ======================================
   Advanced Cardiac AI Assistant
   Clinical Decision Support System
====================================== */

let patients = JSON.parse(localStorage.getItem("patients")) || [];
let tests = JSON.parse(localStorage.getItem("tests")) || [];

/* ==============================
   تحليل مخاطر النوبة القلبية
============================== */

function predictHeartAttack(patient){

let riskScore = 0;
let warnings = [];

/* العمر */

if(patient.age > 60){
riskScore += 2;
warnings.push("العمر فوق 60 يزيد خطر القلب");
}

/* ضغط الدم */

if(patient.bloodPressure){

let bp = parseInt(patient.bloodPressure);

if(bp > 160){

riskScore += 3;
warnings.push("ضغط الدم مرتفع جداً");

}

else if(bp > 140){

riskScore += 2;
warnings.push("ضغط الدم مرتفع");

}

}

/* الكوليسترول */

if(patient.ldl){

let ldl = parseInt(patient.ldl);

if(ldl > 160){

riskScore += 3;
warnings.push("LDL مرتفع جداً");

}

else if(ldl > 130){

riskScore += 2;
warnings.push("LDL مرتفع");

}

}

/* السكر */

if(patient.hba1c){

let sugar = parseFloat(patient.hba1c);

if(sugar > 7){

riskScore += 2;
warnings.push("سكري غير مسيطر عليه");

}

}

/* التدخين */

if(patient.smoking === "نعم"){

riskScore += 2;
warnings.push("المريض مدخن");

}

/* تحديد مستوى الخطر */

let riskLevel = "منخفض";

if(riskScore >= 7) riskLevel = "مرتفع";
else if(riskScore >=4) riskLevel = "متوسط";

return {
score:riskScore,
level:riskLevel,
warnings:warnings
};

}


/* ==============================
   تحليل ECG
============================== */

function analyzeECG(ecg){

let result = "طبيعي";

if(!ecg) return "لا يوجد ECG";

if(ecg.includes("ST Elevation"))
result = "احتمال جلطة قلبية STEMI";

if(ecg.includes("Arrhythmia"))
result = "عدم انتظام ضربات القلب";

if(ecg.includes("Tachycardia"))
result = "تسارع ضربات القلب";

return result;

}


/* ==============================
   تحليل نتائج المختبر
============================== */

function analyzeLab(patient){

let alerts = [];

if(patient.troponin){

let troponin = parseFloat(patient.troponin);

if(troponin > 0.04){

alerts.push("ارتفاع Troponin (اشتباه احتشاء عضلة القلب)");

}

}

if(patient.triglycerides){

let tri = parseInt(patient.triglycerides);

if(tri > 200){

alerts.push("ارتفاع الدهون الثلاثية");

}

}

if(patient.creatinine){

let cr = parseFloat(patient.creatinine);

if(cr > 1.3){

alerts.push("احتمال ضعف وظائف الكلى");

}

}

return alerts;

}


/* ==============================
   اقتراح خطة علاج
============================== */

function suggestTreatment(patient){

let plan = [];

/* الكوليسترول */

if(patient.ldl > 130){

plan.push("Statins لخفض الكوليسترول");

}

/* ضغط الدم */

if(patient.bloodPressure > 140){

plan.push("ACE Inhibitors أو Beta Blockers");

}

/* الجلطة */

if(patient.troponin > 0.04){

plan.push("Aspirin + Heparin");

}

/* الوقاية */

plan.push("تعديل نمط الحياة");
plan.push("تقليل الدهون");
plan.push("ممارسة الرياضة");

return plan;

}


/* ==============================
   تشغيل الذكاء الطبي
============================== */

function runAdvancedAI(){

let table = document.getElementById("aiAdvancedTable");

if(!table) return;

table.innerHTML="";

patients.forEach(p=>{

let risk = predictHeartAttack(p);
let ecg = analyzeECG(p.ecg);
let labs = analyzeLab(p);
let treatment = suggestTreatment(p);

let color = "green";

if(risk.level==="متوسط") color="orange";
if(risk.level==="مرتفع") color="red";

table.innerHTML += `

<tr>

<td>${p.name}</td>

<td>${p.id}</td>

<td style="color:${color};font-weight:bold">${risk.level}</td>

<td>${ecg}</td>

<td>${labs.join("<br>")}</td>

<td>${treatment.join("<br>")}</td>

</tr>

`;

});

}

runAdvancedAI();