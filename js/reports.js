// جلب البيانات من LocalStorage
let patients = JSON.parse(localStorage.getItem("patients")) || [];
let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
let tests = JSON.parse(localStorage.getItem("tests")) || [];

// دالة لعرض التقرير
function displayReports() {
    const tbody = document.querySelector("#reportsTable tbody");
    tbody.innerHTML = "";

    // إذا لم توجد بيانات
    if(patients.length === 0 && appointments.length === 0 && tests.length === 0){
        tbody.innerHTML = `<tr><td colspan="5">لا توجد بيانات لعرضها</td></tr>`;
        return;
    }

    // عرض كل المواعيد مع المرضى والفحوصات
    patients.forEach((p, index) => {
        // عد المواعيد للمريض
        const patientAppointments = appointments.filter(a => a.patient === p.name);
        const patientTests = tests.filter(t => t.patient === p.name);

        tbody.innerHTML += `
            <tr>
                <td>${p.name}</td>
                <td>${p.age}</td>
                <td>${p.gender}</td>
                <td>${patientAppointments.length}</td>
                <td>${patientTests.length}</td>
            </tr>
        `;
    });
}

// دالة تصدير التقرير كملف CSV
function exportCSV() {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "الاسم,العمر,الجنس,عدد المواعيد,عدد التحاليل\n";

    patients.forEach(p => {
        const patientAppointments = appointments.filter(a => a.patient === p.name);
        const patientTests = tests.filter(t => t.patient === p.name);
        csvContent += `${p.name},${p.age},${p.gender},${patientAppointments.length},${patientTests.length}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "patient_reports.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// استدعاء العرض عند التحميل
displayReports();

// ربط زر التصدير إذا كان موجود
const exportBtn = document.getElementById("exportBtn");
if(exportBtn){
    exportBtn.addEventListener("click", exportCSV);
}