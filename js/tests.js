// جلب بيانات المرضى والفحوصات من LocalStorage
let patients = JSON.parse(localStorage.getItem("patients")) || [];
let tests = JSON.parse(localStorage.getItem("tests")) || [];

// عناصر DOM
const patientSelect = document.getElementById("patientSelect");
const testTypeInput = document.getElementById("testType");
const testDateInput = document.getElementById("testDate");
const testResultsInput = document.getElementById("testResults");
const testsTableBody = document.querySelector("#testsTable tbody");

// تعبئة قائمة المرضى في اختيار الفحوصات
function populatePatients() {
    if (!patientSelect) return;
    patientSelect.innerHTML = `<option value="">اختر المريض</option>`;
    patients.forEach(p => {
        const option = document.createElement("option");
        option.value = p.name;
        option.textContent = p.name;
        patientSelect.appendChild(option);
    });
}

// دالة إضافة فحص جديد
function addTest() {
    const patient = patientSelect.value;
    const type = testTypeInput.value.trim();
    const date = testDateInput.value;
    const result = testResultsInput.value.trim();

    if (!patient || !type || !date || !result) {
        alert("الرجاء تعبئة جميع الحقول");
        return;
    }

    const test = {
        patient,
        type,
        date,
        result
    };

    tests.push(test);
    localStorage.setItem("tests", JSON.stringify(tests));

    displayTests();
    clearForm();
}

// عرض جميع الفحوصات في الجدول
function displayTests() {
    if (!testsTableBody) return;
    testsTableBody.innerHTML = "";

    if(tests.length === 0){
        testsTableBody.innerHTML = `<tr><td colspan="5">لا توجد فحوصات لعرضها</td></tr>`;
        return;
    }

    tests.forEach((t, index) => {
        testsTableBody.innerHTML += `
            <tr>
                <td>${t.patient}</td>
                <td>${t.type}</td>
                <td>${t.date}</td>
                <td>${t.result}</td>
                <td>
                    <button onclick="deleteTest(${index})" class="delete-btn">حذف</button>
                </td>
            </tr>
        `;
    });
}

// حذف فحص
function deleteTest(index) {
    if (!confirm("هل أنت متأكد من حذف هذا الفحص؟")) return;
    tests.splice(index,1);
    localStorage.setItem("tests", JSON.stringify(tests));
    displayTests();
}

// تنظيف النموذج بعد الإضافة
function clearForm() {
    patientSelect.value = "";
    testTypeInput.value = "";
    testDateInput.value = "";
    testResultsInput.value = "";
}

// تهيئة الصفحة
populatePatients();
displayTests();