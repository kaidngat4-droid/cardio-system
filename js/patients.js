/* ===== حماية الصفحة ===== */

if(localStorage.getItem("loggedIn") !== "true"){
    window.location.href = "../index.html";
}


/* ===== جلب المرضى ===== */

let patients = JSON.parse(localStorage.getItem("patients")) || [];

let editIndex = -1;


/* ===== إضافة أو تعديل مريض ===== */

function addPatient(){

let name = document.getElementById("name").value.trim();
let age = document.getElementById("age").value;
let gender = document.getElementById("gender").value;
let phone = document.getElementById("phone").value.trim();

if(!name || !age || !phone){

alert("يرجى تعبئة جميع الحقول");

return;

}

let patient = {

name:name,
age:age,
gender:gender,
phone:phone

};


/* ===== تعديل ===== */

if(editIndex > -1){

patients[editIndex] = patient;

editIndex = -1;

}

/* ===== إضافة ===== */

else{

patients.push(patient);

}

localStorage.setItem("patients", JSON.stringify(patients));

displayPatients();

clearForm();

}


/* ===== عرض المرضى ===== */

function displayPatients(){

patients = JSON.parse(localStorage.getItem("patients")) || [];

let table = document.querySelector("#patientsTable");

table.innerHTML="";

patients.forEach((p,i)=>{

table.innerHTML += `

<tr>

<td>${p.name}</td>
<td>${p.age}</td>
<td>${p.gender}</td>
<td>${p.phone}</td>

<td>

<button onclick="editPatient(${i})">

✏

</button>

<button onclick="deletePatient(${i})" class="deleteBtn">

🗑

</button>

</td>

</tr>

`;

});

}


/* ===== حذف مريض ===== */

function deletePatient(index){

if(confirm("هل تريد حذف المريض؟")){

patients.splice(index,1);

localStorage.setItem("patients", JSON.stringify(patients));

displayPatients();

}

}


/* ===== تعديل مريض ===== */

function editPatient(index){

let p = patients[index];

document.getElementById("name").value = p.name;
document.getElementById("age").value = p.age;
document.getElementById("gender").value = p.gender;
document.getElementById("phone").value = p.phone;

editIndex = index;

}


/* ===== البحث ===== */

function searchPatient(){

let search = document.getElementById("search").value.toLowerCase();

let rows = document.querySelectorAll("#patientsTable tr");

rows.forEach(row=>{

let name = row.children[0].innerText.toLowerCase();

if(name.includes(search)){

row.style.display="";

}

else{

row.style.display="none";

}

});

}


/* ===== تنظيف الحقول ===== */

function clearForm(){

document.getElementById("name").value="";
document.getElementById("age").value="";
document.getElementById("phone").value="";
document.getElementById("gender").value="ذكر";

}


/* ===== تسجيل خروج ===== */

function logout(){

localStorage.removeItem("loggedIn");

window.location.href="../index.html";

}


/* ===== تحميل المرضى ===== */

displayPatients();