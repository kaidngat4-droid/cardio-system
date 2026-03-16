let operations = JSON.parse(localStorage.getItem("operations")) || [];

let patients = JSON.parse(localStorage.getItem("patients")) || [];


/* تحميل المرضى */

let select = document.getElementById("patientSelect");

patients.forEach((p,i)=>{

let option=document.createElement("option");

option.value=i;

option.textContent=p.name;

select.appendChild(option);

});


function addOperation(){

let operation = {

patient: patients[select.value].name,

type: document.getElementById("operationType").value,

date: document.getElementById("operationDate").value,

surgeon: document.getElementById("surgeon").value,

anesthesia: document.getElementById("anesthesia").value,

assistant: document.getElementById("assistant").value,

nurse: document.getElementById("nurse").value,

status:"نجاح"

};

operations.push(operation);

localStorage.setItem("operations", JSON.stringify(operations));

loadOperations();

}


function loadOperations(){

let table=document.getElementById("operationsTable");

table.innerHTML="";

operations.forEach(o=>{

table.innerHTML+=`

<tr>

<td>${o.patient}</td>

<td>${o.type}</td>

<td>${o.date}</td>

<td>${o.surgeon}</td>

<td class="success">${o.status}</td>

</tr>

`;

});

drawChart();

}


function saveFollowUp(){

alert("تم حفظ متابعة المريض بعد العملية");

}


/* رسم الإحصائيات */

function drawChart(){

let angioplasty=operations.filter(o=>o.type==="Angioplasty").length;

let cabg=operations.filter(o=>o.type==="CABG Surgery").length;

let pacemaker=operations.filter(o=>o.type==="Pacemaker Implant").length;

new Chart(document.getElementById("operationsChart"),{

type:"bar",

data:{

labels:["Angioplasty","CABG","Pacemaker"],

datasets:[{

label:"عدد العمليات",

data:[angioplasty,cabg,pacemaker]

}]

}

});

}

loadOperations();
let operations = JSON.parse(localStorage.getItem("operations")) || [];

function addOperation(patientIndex, operationType, surgeon, status){
    if(patientIndex === "") return alert("اختر المريض");
    let patient = patients[patientIndex];

    let op = { patient: patient.name, operationType, surgeon, status };
    operations.push(op);
    localStorage.setItem("operations", JSON.stringify(operations));

    alertOperation(patient.name, operationType, status);
}
