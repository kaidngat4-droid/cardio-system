
-- =====================================================
-- قاعدة بيانات: cardio
-- نظام إدارة مركز القلب (نسخة تجريبية)
-- =====================================================

CREATE DATABASE IF NOT EXISTS cardio;
USE cardio;

-- =================== جدول المرضى ===================
CREATE TABLE IF NOT EXISTS patients (
    patient_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    age INT NOT NULL,
    gender ENUM('ذكر','أنثى') NOT NULL,
    phone VARCHAR(20),
    address VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO patients (full_name, age, gender, phone, address) VALUES
('محمد علي', 45, 'ذكر', '770012345', 'صنعاء'),
('فاطمة احمد', 52, 'أنثى', '770045678', 'تعز'),
('سامي عبدالله', 60, 'ذكر', '770078901', 'عدن'),
('ليلى حسن', 35, 'أنثى', '770023456', 'حضرموت'),
('خالد سالم', 50, 'ذكر', '770067890', 'المكلا');

-- =================== جدول المواعيد ===================
CREATE TABLE IF NOT EXISTS appointments (
    appointment_id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT NOT NULL,
    doctor_name VARCHAR(100) NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    status ENUM('مؤكد','ملغى','انتظار') DEFAULT 'انتظار',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id) ON DELETE CASCADE
);

INSERT INTO appointments (patient_id, doctor_name, appointment_date, appointment_time, status) VALUES
(1,'د. أحمد علي','2026-03-15','09:00:00','مؤكد'),
(2,'د. سامي حسين','2026-03-16','10:30:00','انتظار'),
(3,'د. فاطمة جمال','2026-03-17','11:00:00','مؤكد'),
(4,'د. خالد سعيد','2026-03-18','08:45:00','ملغى'),
(5,'د. نادر محمود','2026-03-19','13:00:00','مؤكد');

-- =================== جدول العمليات ===================
CREATE TABLE IF NOT EXISTS surgeries (
    surgery_id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT NOT NULL,
    surgery_type VARCHAR(150) NOT NULL,
    surgery_date DATE NOT NULL,
    surgeon_name VARCHAR(100),
    status ENUM('مكتملة','مجدولة','ملغاة') DEFAULT 'مجدولة',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id) ON DELETE CASCADE
);

INSERT INTO surgeries (patient_id, surgery_type, surgery_date, surgeon_name, status) VALUES
(1,'عملية قلب مفتوح','2026-03-20','د. أحمد علي','مجدولة'),
(3,'قسطرة قلب','2026-03-21','د. سامي حسين','مكتملة'),
(5,'زرع صمام قلب','2026-03-22','د. خالد سعيد','مجدولة');

-- =================== جدول الصيدلية ===================
CREATE TABLE IF NOT EXISTS pharmacy (
    medicine_id INT AUTO_INCREMENT PRIMARY KEY,
    medicine_name VARCHAR(150) NOT NULL,
    quantity INT DEFAULT 0,
    unit_price DECIMAL(10,2),
    expiry_date DATE,
    notes TEXT
);

INSERT INTO pharmacy (medicine_name, quantity, unit_price, expiry_date) VALUES
('أسبيرين', 100, 0.50, '2027-12-31'),
('أتورفاستاتين', 50, 1.20, '2027-06-30'),
('إنالابريل', 70, 0.80, '2026-09-30'),
('ميتوبرولول', 60, 0.60, '2027-03-31'),
('لوسارتان', 80, 0.90, '2027-11-30');

-- =================== جدول الوصفات الطبية ===================
CREATE TABLE IF NOT EXISTS prescriptions (
    prescription_id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT NOT NULL,
    medicine_id INT NOT NULL,
    dosage VARCHAR(100),
    frequency VARCHAR(100),
    start_date DATE,
    end_date DATE,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id) ON DELETE CASCADE,
    FOREIGN KEY (medicine_id) REFERENCES pharmacy(medicine_id)
);

INSERT INTO prescriptions (patient_id, medicine_id, dosage, frequency, start_date, end_date) VALUES
(1,1,'قرص واحد','يومياً','2026-03-15','2026-04-15'),
(2,2,'قرص واحد','يومياً','2026-03-16','2026-05-16'),
(3,3,'قرص واحد','صباحاً ومساءً','2026-03-17','2026-04-17'),
(4,4,'قرص واحد','يومياً','2026-03-18','2026-04-18'),
(5,5,'قرص واحد','صباحاً','2026-03-19','2026-04-19');

-- =================== جدول التحاليل والفحوصات ===================
CREATE TABLE IF NOT EXISTS tests (
    test_id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT NOT NULL,
    test_name VARCHAR(150) NOT NULL,
    test_date DATE NOT NULL,
    result TEXT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id) ON DELETE CASCADE
);

INSERT INTO tests (patient_id, test_name, test_date, result) VALUES
(1,'تخطيط قلب','2026-03-10','طبيعي'),
(2,'أشعة صدر','2026-03-11','وجود تضخم بسيط'),
(3,'تحليل دم','2026-03-12','عادي'),
(4,'تخطيط قلب','2026-03-13','بطء نبض'),
(5,'أشعة صدر','2026-03-14','سليم');

-- =================== جدول التقارير ===================
CREATE TABLE IF NOT EXISTS reports (
    report_id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT NOT NULL,
    report_type VARCHAR(150) NOT NULL,
    report_date DATE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id) ON DELETE CASCADE
);

INSERT INTO reports (patient_id, report_type, report_date, description) VALUES
(1,'تقرير متابعة','2026-03-15','الحالة مستقرة'),
(2,'تقرير متابعة','2026-03-16','ارتفاع طفيف في ضغط الدم'),
(3,'تقرير متابعة','2026-03-17','تحسن بعد العملية'),
(4,'تقرير متابعة','2026-03-18','توصية بالفحص الدوري'),
(5,'تقرير متابعة','2026-03-19','الحالة مستقرة');

-- =================== جدول المستخدمين ===================
CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(150),
    role ENUM('admin','doctor','nurse','pharmacist') DEFAULT 'doctor',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- إدراج مستخدم افتراضي
INSERT INTO users (username, password, full_name, role)
VALUES ('admin', '770075098', 'مسؤول النظام', 'admin');