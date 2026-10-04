-- =========================================================================
-- NexusMEAL Enterprise MIS Database Schema & Mock Data Seed (PostgreSQL)
-- Digital Monitoring, Evaluation, Accountability & Learning Platform
-- =========================================================================

CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL DEFAULT 'MealDemo@2026',
    role VARCHAR(50) NOT NULL,
    role_label VARCHAR(100) NOT NULL,
    organization VARCHAR(150) NOT NULL,
    region VARCHAR(100)
);

INSERT INTO users (id, name, email, password_hash, role, role_label, organization, region) VALUES
('u-1', 'Sami A. (Super Admin)', 'admin@demo.meal.et', 'MealDemo@2026', 'super_admin', 'Super Admin', 'Programme Management Directorate', 'Addis Ababa'),
('u-2', 'Almaz Tadesse', 'programme_manager@demo.meal.et', 'MealDemo@2026', 'programme_manager', 'Programme Manager', 'Programme Management Directorate', 'Addis Ababa'),
('u-3', 'Dawit Bekele', 'monitoring_officer@demo.meal.et', 'MealDemo@2026', 'monitoring_officer', 'Monitoring Officer', 'MEAL Directorate Addis Ababa', 'Addis Ababa'),
('u-4', 'Helen Haile', 'partner_officer@demo.meal.et', 'MealDemo@2026', 'partner_officer', 'Partner Officer', 'Implementing Partner Liaison', 'Addis Ababa'),
('u-5', 'Yared Getachew', 'field_officer@demo.meal.et', 'MealDemo@2026', 'field_officer', 'Field Officer', 'Regional Field Operations Unit', 'Oromia'),
('u-6', 'Bethlehem Alemu', 'finance_officer@demo.meal.et', 'MealDemo@2026', 'finance_officer', 'Finance Officer', 'Finance & Grants Operations', 'Addis Ababa'),
('u-7', 'Donor Representative', 'donor_viewer@demo.meal.et', 'MealDemo@2026', 'donor_viewer', 'Donor Viewer', 'International Donor Delegation', 'Addis Ababa')
ON CONFLICT (email) DO NOTHING;

CREATE TABLE IF NOT EXISTS participants (
    id VARCHAR(50) PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    fayida_id VARCHAR(50) UNIQUE NOT NULL,
    phone VARCHAR(30) NOT NULL,
    sex VARCHAR(20) NOT NULL,
    age INT NOT NULL,
    education VARCHAR(100) NOT NULL,
    region VARCHAR(100) NOT NULL,
    woreda VARCHAR(100) NOT NULL,
    kebele VARCHAR(100) NOT NULL,
    disability BOOLEAN DEFAULT FALSE,
    disability_type VARCHAR(100),
    status VARCHAR(50) NOT NULL,
    cohort VARCHAR(150),
    registration_date DATE NOT NULL,
    assigned_field_officer VARCHAR(150)
);

CREATE TABLE IF NOT EXISTS employment_outcomes (
    id VARCHAR(50) PRIMARY KEY,
    participant_id VARCHAR(50) REFERENCES participants(id) ON DELETE CASCADE,
    participant_name VARCHAR(150) NOT NULL,
    sex VARCHAR(20) NOT NULL,
    region VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL,
    job_title VARCHAR(150) NOT NULL,
    employer_or_business VARCHAR(150) NOT NULL,
    sector VARCHAR(100) NOT NULL,
    monthly_income_etb NUMERIC(12, 2) NOT NULL,
    contract_type VARCHAR(100) NOT NULL,
    verified BOOLEAN DEFAULT FALSE,
    verification_date DATE,
    start_date DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS enterprises (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    registration_number VARCHAR(100) UNIQUE NOT NULL,
    owner_name VARCHAR(150) NOT NULL,
    owner_sex VARCHAR(20) NOT NULL,
    owner_age INT NOT NULL,
    fayida_id VARCHAR(50),
    phone VARCHAR(30) NOT NULL,
    sector VARCHAR(100) NOT NULL,
    tier VARCHAR(50) NOT NULL,
    region VARCHAR(100) NOT NULL,
    woreda VARCHAR(100) NOT NULL,
    employees_count INT NOT NULL,
    youth_employees_count INT NOT NULL,
    female_employees_count INT NOT NULL,
    monthly_revenue_etb NUMERIC(12, 2) NOT NULL,
    loan_received_etb NUMERIC(12, 2) DEFAULT 0,
    status VARCHAR(50) NOT NULL,
    established_date DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS training_cohorts (
    id VARCHAR(50) PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    title VARCHAR(200) NOT NULL,
    provider VARCHAR(150) NOT NULL,
    sector VARCHAR(100) NOT NULL,
    region VARCHAR(100) NOT NULL,
    woreda VARCHAR(100) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    enrolled_total INT NOT NULL,
    enrolled_female INT NOT NULL,
    graduated_total INT NOT NULL,
    graduated_female INT NOT NULL,
    status VARCHAR(50) NOT NULL,
    attendance_rate_percent NUMERIC(5, 2) NOT NULL,
    curriculum_hours INT NOT NULL
);

CREATE TABLE IF NOT EXISTS loans (
    id VARCHAR(50) PRIMARY KEY,
    loan_reference VARCHAR(50) UNIQUE NOT NULL,
    beneficiary_name VARCHAR(150) NOT NULL,
    beneficiary_type VARCHAR(50) NOT NULL,
    sex VARCHAR(20) NOT NULL,
    fayida_id VARCHAR(50),
    mfi_partner VARCHAR(100) NOT NULL,
    region VARCHAR(100) NOT NULL,
    woreda VARCHAR(100) NOT NULL,
    amount_requested_etb NUMERIC(12, 2) NOT NULL,
    amount_disbursed_etb NUMERIC(12, 2) NOT NULL,
    interest_rate_percent NUMERIC(5, 2) NOT NULL,
    disbursement_date DATE NOT NULL,
    due_date DATE NOT NULL,
    amount_repaid_etb NUMERIC(12, 2) DEFAULT 0,
    repayment_status VARCHAR(50) NOT NULL,
    purpose TEXT
);

CREATE TABLE IF NOT EXISTS savings_groups (
    id VARCHAR(50) PRIMARY KEY,
    group_name VARCHAR(150) NOT NULL,
    code VARCHAR(50) UNIQUE NOT NULL,
    region VARCHAR(100) NOT NULL,
    woreda VARCHAR(100) NOT NULL,
    total_members INT NOT NULL,
    female_members INT NOT NULL,
    youth_members INT NOT NULL,
    established_date DATE NOT NULL,
    total_savings_mobilized_etb NUMERIC(12, 2) NOT NULL,
    loans_issued_internal_etb NUMERIC(12, 2) NOT NULL,
    bank_linkage_established BOOLEAN DEFAULT FALSE,
    linked_bank_or_mfi VARCHAR(150),
    status VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS safeguarding_incidents (
    id VARCHAR(50) PRIMARY KEY,
    incident_code VARCHAR(50) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    severity VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL,
    reported_date DATE NOT NULL,
    region VARCHAR(100) NOT NULL,
    woreda VARCHAR(100) NOT NULL,
    is_confidential BOOLEAN DEFAULT TRUE,
    assigned_investigator VARCHAR(150),
    target_resolution_date DATE,
    summary TEXT,
    actions_taken TEXT[]
);

CREATE TABLE IF NOT EXISTS feedback_tickets (
    id VARCHAR(50) PRIMARY KEY,
    ticket_number VARCHAR(50) UNIQUE NOT NULL,
    channel VARCHAR(100) NOT NULL,
    category VARCHAR(100) NOT NULL,
    sender_name VARCHAR(150) NOT NULL,
    is_anonymous BOOLEAN DEFAULT FALSE,
    phone_or_contact VARCHAR(100),
    region VARCHAR(100) NOT NULL,
    date_received DATE NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(50) NOT NULL,
    sla_breach BOOLEAN DEFAULT FALSE,
    resolution_summary TEXT
);

CREATE TABLE IF NOT EXISTS indicators (
    id VARCHAR(50) PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    pillar VARCHAR(100) NOT NULL,
    level VARCHAR(50) NOT NULL,
    baseline NUMERIC(12, 2) NOT NULL,
    target_year1 NUMERIC(12, 2) NOT NULL,
    target_life_of_programme NUMERIC(12, 2) NOT NULL,
    actual_achieved NUMERIC(12, 2) NOT NULL,
    achievement_rate_percent NUMERIC(5, 2) NOT NULL,
    unit VARCHAR(50) NOT NULL,
    rag_status VARCHAR(50) NOT NULL,
    last_updated DATE NOT NULL,
    frequency VARCHAR(50) NOT NULL,
    data_collector_role VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS survey_rounds (
    id VARCHAR(50) PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    target_sample INT NOT NULL,
    completed_sample INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status VARCHAR(50) NOT NULL,
    regions_included TEXT[]
);

CREATE TABLE IF NOT EXISTS audit_logs (
    id VARCHAR(50) PRIMARY KEY,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_email VARCHAR(150) NOT NULL,
    user_name VARCHAR(150) NOT NULL,
    user_role VARCHAR(50) NOT NULL,
    action VARCHAR(50) NOT NULL,
    module VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    ip_address VARCHAR(50) NOT NULL
);

-- =========================================================================
-- ADDITIONAL TABLES (Partnerships, Budget, Actions, Learning, Governance, SBCC, Materials)
-- =========================================================================

CREATE TABLE IF NOT EXISTS partnerships (
    id VARCHAR(50) PRIMARY KEY,
    partner_name VARCHAR(200) NOT NULL,
    type VARCHAR(100) NOT NULL,
    focus_area TEXT NOT NULL,
    region VARCHAR(100) NOT NULL,
    status VARCHAR(50) NOT NULL,
    mou_signed_date DATE NOT NULL,
    expiry_date DATE NOT NULL,
    contact_person VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(50),
    active_projects_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS budget_lines (
    id VARCHAR(50) PRIMARY KEY,
    component VARCHAR(150) NOT NULL,
    description TEXT,
    allocated_etb NUMERIC(15, 2) NOT NULL,
    disbursed_etb NUMERIC(15, 2) NOT NULL DEFAULT 0,
    balance_etb NUMERIC(15, 2) GENERATED ALWAYS AS (allocated_etb - disbursed_etb) STORED,
    utilization_percent NUMERIC(5, 2) NOT NULL DEFAULT 0,
    fiscal_year VARCHAR(20) NOT NULL,
    quarter VARCHAR(10),
    status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS action_items (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    source VARCHAR(100) NOT NULL,
    source_reference VARCHAR(100),
    assigned_to VARCHAR(150) NOT NULL,
    priority VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL,
    due_date DATE NOT NULL,
    completed_date DATE,
    module VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS lessons_learned (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    context TEXT NOT NULL,
    lesson TEXT NOT NULL,
    recommendation TEXT NOT NULL,
    pillar VARCHAR(150) NOT NULL,
    region VARCHAR(100),
    quarter VARCHAR(20) NOT NULL,
    rating VARCHAR(50) NOT NULL,
    submitted_by VARCHAR(150) NOT NULL,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    tags TEXT[]
);

CREATE TABLE IF NOT EXISTS knowledge_documents (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100) NOT NULL,
    file_format VARCHAR(20) NOT NULL,
    file_size_mb NUMERIC(5, 2) NOT NULL,
    download_count INT DEFAULT 0,
    uploaded_by VARCHAR(150) NOT NULL,
    upload_date DATE NOT NULL,
    version VARCHAR(20) DEFAULT '1.0',
    tags TEXT[]
);

CREATE TABLE IF NOT EXISTS learning_agenda (
    id VARCHAR(50) PRIMARY KEY,
    question TEXT NOT NULL,
    pillar VARCHAR(150) NOT NULL,
    priority VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL,
    lead VARCHAR(150) NOT NULL,
    methodology TEXT,
    target_date DATE,
    findings TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS reflection_meetings (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL,
    date DATE NOT NULL,
    facilitator VARCHAR(150) NOT NULL,
    participants_count INT NOT NULL,
    key_findings TEXT,
    action_points TEXT[],
    region VARCHAR(100),
    status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS governance_bodies (
    id VARCHAR(50) PRIMARY KEY,
    body VARCHAR(100) NOT NULL,
    title VARCHAR(255) NOT NULL,
    chair_person VARCHAR(150) NOT NULL,
    last_meeting_date DATE NOT NULL,
    next_meeting_date DATE,
    active_resolutions_count INT DEFAULT 0,
    status VARCHAR(50) NOT NULL,
    members_count INT DEFAULT 0,
    mandate TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS sbcc_activities (
    id VARCHAR(50) PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL,
    theme VARCHAR(150) NOT NULL,
    region VARCHAR(100) NOT NULL,
    woreda VARCHAR(100),
    target_audience VARCHAR(150) NOT NULL,
    target_reach INT NOT NULL,
    actual_reach INT NOT NULL DEFAULT 0,
    female_reach INT NOT NULL DEFAULT 0,
    male_reach INT NOT NULL DEFAULT 0,
    channel VARCHAR(100) NOT NULL,
    date DATE NOT NULL,
    status VARCHAR(50) NOT NULL,
    facilitator VARCHAR(150),
    behaviour_change_indicators TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS material_support (
    id VARCHAR(50) PRIMARY KEY,
    reference_code VARCHAR(50) UNIQUE NOT NULL,
    recipient_name VARCHAR(150) NOT NULL,
    recipient_type VARCHAR(100) NOT NULL,
    region VARCHAR(100) NOT NULL,
    woreda VARCHAR(100) NOT NULL,
    support_type VARCHAR(100) NOT NULL,
    item_description TEXT NOT NULL,
    quantity INT NOT NULL,
    unit_cost_etb NUMERIC(12, 2) NOT NULL,
    total_value_etb NUMERIC(12, 2) GENERATED ALWAYS AS (quantity * unit_cost_etb) STORED,
    supplier VARCHAR(150),
    distribution_date DATE NOT NULL,
    status VARCHAR(50) NOT NULL,
    verified BOOLEAN DEFAULT FALSE,
    purpose TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================================================
-- SEED MOCK DATA INJECTION
-- =========================================================================

INSERT INTO users (id, name, email, password_hash, role, role_label, organization, region) VALUES
('u-1', 'Sami A. (Super Admin)', 'admin@demo.meal.et', 'MealDemo@2026', 'super_admin', 'Super Admin', 'Programme Management Directorate', 'Addis Ababa'),
('u-2', 'Almaz Tadesse', 'programme_manager@demo.meal.et', 'MealDemo@2026', 'programme_manager', 'Programme Manager', 'Programme Management Directorate', 'Addis Ababa'),
('u-3', 'Dawit Bekele', 'monitoring_officer@demo.meal.et', 'MealDemo@2026', 'monitoring_officer', 'Monitoring Officer', 'MEAL Directorate Addis Ababa', 'Addis Ababa'),
('u-4', 'Helen Haile', 'partner_officer@demo.meal.et', 'MealDemo@2026', 'partner_officer', 'Partner Officer', 'Implementing Partner Liaison', 'Addis Ababa'),
('u-5', 'Yared Getachew', 'field_officer@demo.meal.et', 'MealDemo@2026', 'field_officer', 'Field Officer', 'Regional Field Operations Unit', 'Oromia'),
('u-6', 'Bethlehem Alemu', 'finance_officer@demo.meal.et', 'MealDemo@2026', 'finance_officer', 'Finance Officer', 'Finance & Grants Operations', 'Addis Ababa'),
('u-7', 'Donor Representative', 'donor_viewer@demo.meal.et', 'MealDemo@2026', 'donor_viewer', 'Donor Viewer', 'International Donor Delegation', 'International')
ON CONFLICT (id) DO NOTHING;

INSERT INTO participants (id, full_name, fayida_id, phone, sex, age, education, region, woreda, kebele, disability, disability_type, status, cohort, registration_date, assigned_field_officer) VALUES
('p-1', 'Almaz Tadesse', 'ET-FAY-98214301', '+251 91 123 4567', 'Female', 23, 'TVET Graduate', 'Oromia', 'Bishoftu', 'Kebele 02', FALSE, NULL, 'Employed', 'Cohort 1 - Agro-processing', '2025-11-12', 'Yared Getachew'),
('p-2', 'Dawit Bekele', 'ET-FAY-65239102', '+251 92 345 6789', 'Male', 26, 'Secondary', 'Amhara', 'Bahir Dar Zuria', 'Kebele 08', FALSE, NULL, 'Self-Employed', 'Cohort 2 - Metal & Woodworking', '2025-11-18', 'Tigist Alemu'),
('p-3', 'Hiwot Assefa', 'ET-FAY-77319084', '+251 93 456 7890', 'Female', 21, 'Primary', 'Sidama', 'Hawassa Zuria', 'Tula 01', TRUE, 'Hearing Impairment', 'In Training', 'Cohort 3 - Garment & Apparel', '2025-12-05', 'Mulugeta Desta'),
('p-4', 'Chala Demisse', 'ET-FAY-88412093', '+251 94 567 8901', 'Male', 24, 'TVET Graduate', 'Oromia', 'Adama', 'Bole Kebele', FALSE, NULL, 'Employed', 'Cohort 1 - Agro-processing', '2025-10-20', 'Yared Getachew'),
('p-5', 'Selamawit Desta', 'ET-FAY-11293847', '+251 91 678 9012', 'Female', 22, 'University Degree', 'Addis Ababa', 'Bole', 'Woreda 03', FALSE, NULL, 'Employed', 'Cohort 4 - Digital Freelancing', '2025-11-01', 'Helen Haile'),
('p-6', 'Ahmed Mohammed', 'ET-FAY-55483920', '+251 92 789 0123', 'Male', 28, 'Secondary', 'Somali', 'Jijiga', 'Kebele 04', FALSE, NULL, 'Self-Employed', 'Cohort 2 - Livestock Value Chain', '2025-12-14', 'Ali Farah'),
('p-7', 'Genet Worku', 'ET-FAY-33291823', '+251 93 890 1234', 'Female', 25, 'TVET Graduate', 'Central Ethiopia', 'Hosanna', 'Kebele 01', TRUE, 'Mobility Impairment', 'In Training', 'Cohort 3 - Leather Works', '2026-01-10', 'Tamirat Kassa'),
('p-8', 'Biruk Kebede', 'ET-FAY-99018274', '+251 94 901 2345', 'Male', 20, 'Primary', 'Amhara', 'Dessie', 'Kebele 05', FALSE, NULL, 'Enrolled', 'Cohort 5 - Renewable Energy Assembly', '2026-01-15', 'Tigist Alemu'),
('p-9', 'Meron Hailu', 'ET-FAY-44582910', '+251 91 012 3456', 'Female', 27, 'TVET Graduate', 'Tigray', 'Mekelle', 'Kedamay Weyane', FALSE, NULL, 'Employed', 'Cohort 1 - Food Processing', '2025-10-05', 'Gidey Abraha'),
('p-10', 'Kidus Solomon', 'ET-FAY-22910482', '+251 92 123 7890', 'Male', 23, 'Secondary', 'Dire Dawa', 'Sabian', 'Kebele 02', FALSE, NULL, 'Employed', 'Cohort 4 - Logistics & Warehousing', '2025-11-25', 'Abdusalam Nur')
ON CONFLICT (id) DO NOTHING;

INSERT INTO employment_outcomes (id, participant_id, participant_name, sex, region, type, job_title, employer_or_business, sector, monthly_income_etb, contract_type, verified, verification_date, start_date) VALUES
('emp-1', 'p-1', 'Almaz Tadesse', 'Female', 'Oromia', 'Wage Employment', 'Quality Control Technician', 'Abyssinia Agro Processing PLC', 'Agribusiness', 7800.00, 'Permanent', TRUE, '2026-01-10', '2025-12-01'),
('emp-2', 'p-2', 'Dawit Bekele', 'Male', 'Amhara', 'Self-Employment', 'Lead Artisan & Workshop Owner', 'Bahir Wood & Metal Works', 'Construction', 9500.00, 'Permanent', TRUE, '2026-01-15', '2025-12-10'),
('emp-3', 'p-4', 'Chala Demisse', 'Male', 'Oromia', 'Wage Employment', 'Machine Operator', 'Adama Food Products SC', 'Agribusiness', 6500.00, 'Contractual (6M+)', TRUE, '2026-01-20', '2025-11-15'),
('emp-4', 'p-5', 'Selamawit Desta', 'Female', 'Addis Ababa', 'Wage Employment', 'Junior Data Analyst', 'AfroTech Solutions', 'Digital & ICT', 14500.00, 'Permanent', TRUE, '2026-02-01', '2025-12-01')
ON CONFLICT (id) DO NOTHING;

INSERT INTO enterprises (id, name, registration_number, owner_name, owner_sex, owner_age, fayida_id, phone, sector, tier, region, woreda, employees_count, youth_employees_count, female_employees_count, monthly_revenue_etb, loan_received_etb, status, established_date) VALUES
('ent-1', 'Abyssinia Agro Processing PLC', 'OR-BSH-2024-0012', 'Kebede Haile', 'Male', 32, 'ET-FAY-91028345', '+251 91 222 3344', 'Agribusiness', 'Small (6-15)', 'Oromia', 'Bishoftu', 14, 11, 8, 380000.00, 250000.00, 'Active', '2023-04-15'),
('ent-2', 'Bahir Wood & Metal Works Cooperative', 'AM-BDR-2024-0891', 'Dawit Bekele', 'Male', 26, 'ET-FAY-65239102', '+251 92 345 6789', 'Construction', 'Micro (3-5)', 'Amhara', 'Bahir Dar Zuria', 5, 5, 2, 120000.00, 100000.00, 'Scaling', '2024-01-10'),
('ent-3', 'Hawassa Eco-Garments Hub', 'SD-HAW-2023-1120', 'Hirut Kassaye', 'Female', 29, 'ET-FAY-48192043', '+251 93 444 5566', 'Textile & Garments', 'Medium (16+)', 'Sidama', 'Hawassa City', 24, 20, 18, 540000.00, 450000.00, 'Active', '2022-09-18'),
('ent-4', 'AfroTech Innovations Lab', 'AA-BOL-2024-3341', 'Binyam Assefa', 'Male', 27, 'ET-FAY-77192039', '+251 91 555 6677', 'Digital & ICT', 'Micro (3-5)', 'Addis Ababa', 'Bole', 4, 4, 2, 190000.00, 150000.00, 'Scaling', '2024-03-01')
ON CONFLICT (id) DO NOTHING;

INSERT INTO training_cohorts (id, code, title, provider, sector, region, woreda, start_date, end_date, enrolled_total, enrolled_female, graduated_total, graduated_female, status, attendance_rate_percent, curriculum_hours) VALUES
('tr-1', 'TRN-2025-AGRO-01', 'Modern Horticulture & Agro-Processing Value Addition', 'Tegbare-Id Polytechnic College', 'Agribusiness', 'Addis Ababa', 'Yeka', '2025-09-01', '2025-11-30', 45, 26, 42, 25, 'Completed', 94.20, 240),
('tr-2', 'TRN-2025-GAR-02', 'Industrial Sewing Machine Operation & Quality Inspection', 'Hawassa TVET Institute', 'Textile & Garments', 'Sidama', 'Hawassa', '2025-10-15', '2026-01-15', 60, 48, 57, 46, 'Completed', 96.00, 320),
('tr-3', 'TRN-2026-DIG-03', 'Digital Micro-work, E-commerce, & Remote Data Management', 'Adama Science & Tech TVET Center', 'Digital & ICT', 'Oromia', 'Adama', '2026-01-05', '2026-04-05', 50, 27, 0, 0, 'In Progress', 91.50, 200)
ON CONFLICT (id) DO NOTHING;

INSERT INTO loans (id, loan_reference, beneficiary_name, beneficiary_type, sex, fayida_id, mfi_partner, region, woreda, amount_requested_etb, amount_disbursed_etb, interest_rate_percent, disbursement_date, due_date, amount_repaid_etb, repayment_status, purpose) VALUES
('loan-1', 'LN-2025-OC-0192', 'Almaz Tadesse', 'Individual Youth', 'Female', 'ET-FAY-98214301', 'Siinqee Bank (OCSSCO)', 'Oromia', 'Bishoftu', 65000.00, 60000.00, 8.50, '2025-11-25', '2026-11-24', 15000.00, 'Current', 'Procurement of stainless fruit pulping unit'),
('loan-2', 'LN-2025-AC-0842', 'Bahir Wood & Metal Works Cooperative', 'Enterprise / Cooperative', 'Male', 'ET-FAY-65239102', 'Tsedey Bank (ACSI)', 'Amhara', 'Bahir Dar', 120000.00, 100000.00, 9.00, '2025-12-05', '2027-06-04', 22500.00, 'Current', 'Electric arc welding generators')
ON CONFLICT (id) DO NOTHING;

INSERT INTO indicators (id, code, title, pillar, level, baseline, target_year1, target_life_of_programme, actual_achieved, achievement_rate_percent, unit, rag_status, last_updated, frequency, data_collector_role) VALUES
('ind-1', 'IND-1.1', 'Number of youth transitioned into dignified and fulfilling work', 'Pillar 1: Youth Employment', 'Impact', 0, 15000, 100000, 11450, 76.30, 'Youth individuals', 'On Track', '2026-02-01', 'Monthly', 'Field Officer / Monitoring Officer'),
('ind-2', 'IND-1.2', 'Percentage of supported youth retaining employment for at least 6 consecutive months', 'Pillar 1: Youth Employment', 'Outcome', 42, 75, 85, 71, 94.60, 'Percentage (%)', 'On Track', '2026-01-30', 'Quarterly', 'Monitoring Officer'),
('ind-3', 'IND-2.1', 'Number of MSMEs receiving structured business development and market linkage services', 'Pillar 2: Enterprise Ecosystem', 'Output', 0, 1200, 8000, 780, 65.00, 'Enterprises', 'At Risk', '2026-02-03', 'Monthly', 'Partner Officer'),
('ind-4', 'IND-2.2', 'Average percentage increase in monthly enterprise revenue among supported MSMEs', 'Pillar 2: Enterprise Ecosystem', 'Outcome', 0, 30, 50, 26.5, 88.30, 'Percentage (%)', 'On Track', '2026-01-25', 'Bi-annually', 'Monitoring Officer'),
('ind-5', 'IND-3.1', 'Total volume of concessionary credit disbursed to youth enterprises by partner MFIs (ETB)', 'Pillar 3: Financial Inclusion', 'Output', 0, 50000000, 350000000, 31000000, 62.00, 'ETB', 'At Risk', '2026-02-01', 'Monthly', 'Finance Officer'),
('ind-6', 'IND-4.1', 'Percentage of safeguarding complaints acknowledged within 48h and resolved within SLA', 'Cross-Cutting: Safeguarding & Gender', 'Output', 50, 95, 100, 91, 95.70, 'Percentage (%)', 'On Track', '2026-02-04', 'Monthly', 'Super Admin')
ON CONFLICT (id) DO NOTHING;

INSERT INTO audit_logs (id, timestamp, user_email, user_name, user_role, action, module, description, ip_address) VALUES
('aud-1', CURRENT_TIMESTAMP - INTERVAL '2 hours', 'admin@demo.meal.et', 'Sami A. (Super Admin)', 'super_admin', 'LOGIN', 'Auth', 'Authenticated via NexusMEAL Security Gateway', '197.156.104.22'),
('aud-2', CURRENT_TIMESTAMP - INTERVAL '1 hour', 'field_officer@demo.meal.et', 'Yared Getachew', 'field_officer', 'CREATE', 'Participants', 'Enrolled participant Almaz Tadesse with verified Fayida ID', '197.156.104.34')
ON CONFLICT (id) DO NOTHING;

INSERT INTO partnerships (id, partner_name, type, focus_area, region, status, mou_signed_date, expiry_date, contact_person, email, phone, active_projects_count) VALUES
('par-1', 'Siinqee Bank (OCSSCO)', 'Financial Institution', 'Concessionary youth business loans, VSLA financial linkage, mobile banking integration', 'Oromia', 'Active', '2025-06-01', '2027-05-31', 'Tigist Lemma', 'siinqee@ocssco.et', '+251 115 574 422', 4),
('par-2', 'Hawassa TVET Institute', 'TVET Institution', 'Demand-driven vocational training, CBT-aligned curricula, workplace attachment programmes', 'Sidama', 'Active', '2025-07-15', '2027-07-14', 'Mulugeta Kassa', 'info@hawassatvet.edu.et', '+251 462 203 812', 3),
('par-3', 'Ethiopian Federal MSME Agency', 'Government', 'Enterprise registration, BDS provision, market linkage facilitation, regulatory compliance', 'Addis Ababa', 'Active', '2025-08-01', '2027-07-31', 'Ato Lemma Haile', 'msme@gov.et', '+251 115 510 010', 5),
('par-4', 'International Development Consortium', 'Donor / International NGO', 'Programme funding, adaptive management, MEAL system oversight, donor reporting', 'Addis Ababa', 'Active', '2025-05-01', '2028-04-30', 'Regional Programme Director', 'contact@consortium.org', '+251 115 578 111', 7),
('par-5', 'Tsedey Bank (ACSI)', 'Financial Institution', 'Rural youth credit, agricultural value chain finance, group lending schemes', 'Amhara', 'Active', '2025-09-10', '2027-09-09', 'Abebe Tilahun', 'acsi@tsedeybank.et', '+251 582 205 111', 2),
('par-6', 'Adama Chamber of Commerce', 'Private Sector', 'Market linkage, job placement events, private sector employer engagement', 'Oromia', 'Under Review', '2025-10-01', '2026-09-30', 'W/ro Mekdes Dereje', 'chamber@adama.et', '+251 222 113 456', 1)
ON CONFLICT (id) DO NOTHING;

INSERT INTO budget_lines (id, component, description, allocated_etb, disbursed_etb, utilization_percent, fiscal_year, quarter, status) VALUES
('bgt-1', 'Youth Employment & Workforce Development', 'TVET enrolment subsidies, skills training grants, enterprise starter kits', 45000000.00, 32100000.00, 71.33, 'FY2025-2026', 'Q3', 'Active'),
('bgt-2', 'Enterprise Development & Business Growth', 'MSME registration support, BDS, market linkage facilitation, incubation grants', 28500000.00, 18900000.00, 66.32, 'FY2025-2026', 'Q3', 'Active'),
('bgt-3', 'Financial Inclusion & MFI Guarantee Fund', 'Credit guarantee mechanisms, VSLA start-up kits, MFI partnership facilitation costs', 35000000.00, 22400000.00, 64.00, 'FY2025-2026', 'Q3', 'Active'),
('bgt-4', 'Safeguarding, Accountability & GBV Response', 'Safeguarding training, PSEA mechanisms, survivor-centred support services', 8500000.00, 5100000.00, 60.00, 'FY2025-2026', 'Q3', 'Active'),
('bgt-5', 'MEAL System & Digital Platform', 'MIS development, deployment, capacity building, ongoing technical support', 12000000.00, 9600000.00, 80.00, 'FY2025-2026', 'Q3', 'Active'),
('bgt-6', 'Programme Management & Operating Costs', 'PMU operations, staff costs, coordination, logistics, communications', 6000000.00, 4200000.00, 70.00, 'FY2025-2026', 'Q3', 'Active')
ON CONFLICT (id) DO NOTHING;

INSERT INTO action_items (id, title, description, source, source_reference, assigned_to, priority, status, due_date, module) VALUES
('act-1', 'Upload Q3 2026 Indicator Progress Report to Knowledge Library', 'Compile and upload Q3 progress report covering all 6 core PIRS indicators', 'Monthly Review Meeting', 'MRM-FEB-2026', 'Dawit Bekele', 'High', 'In Progress', '2026-03-15', 'Evidence'),
('act-2', 'Verify employment outcomes for Cohort 2 graduates', 'Conduct field verification visits for all 42 Cohort 2 graduates in Amhara and Oromia', 'Training Closure Report', 'TRN-2025-AGRO-01', 'Yared Getachew', 'High', 'Pending', '2026-03-20', 'Participants'),
('act-3', 'Update SBCC campaign reach data for Oromia', 'Enter January-February reach data from Oromia field team enumerators into MIS', 'SBCC Coordinator', 'SBCC-ORM-Q1', 'Helen Haile', 'Medium', 'Pending', '2026-03-10', 'SBCC'),
('act-4', 'Conduct VSLA mid-cycle financial health review', 'Review savings mobilization figures, internal loan repayment rates for all VSLA groups', 'Finance Review', 'FIN-Q3-2026', 'Bethlehem Alemu', 'High', 'In Progress', '2026-03-25', 'Finance'),
('act-5', 'Escalate unresolved safeguarding case SG-2026-0045', 'Case has exceeded 30-day SLA; escalate to programme director', 'Safeguarding Register', 'SG-2026-0045', 'Sami A.', 'Critical', 'Overdue', '2026-02-28', 'Safeguarding')
ON CONFLICT (id) DO NOTHING;

INSERT INTO lessons_learned (id, title, context, lesson, recommendation, pillar, region, quarter, rating, submitted_by, tags) VALUES
('ll-1', 'Fayida ID integration accelerated enrolment processing', 'Fayida API integration reduced registration from 3 days to 4 hours per batch in Oromia Q1 2026', 'Digital identity verification enables rapid and accurate programme onboarding', 'Prioritize Fayida integration in all regions; provide field officers with tablet-based tools', 'Pillar 1: Youth Employment', 'Oromia', 'Q1 2026', 'Highly Valuable', 'Dawit Bekele', ARRAY['digital','fayida','enrolment','efficiency']),
('ll-2', 'Loan uptake higher among female TVET graduates with enterprise plans', 'Q2 2025 analysis: female graduates with TVET certificates had 78% approval rate vs 54% overall average', 'Gender-responsive financial products aligned with vocational certification improve women financial inclusion', 'Develop dedicated female graduate loan window with simplified collateral requirements', 'Pillar 3: Financial Inclusion', 'Sidama', 'Q2 2025', 'Highly Valuable', 'Bethlehem Alemu', ARRAY['gender','finance','loans','women']),
('ll-3', 'Offline mobile collection revealed significant geographic data gaps', 'Offline tools collected data from 14 previously unreported kebeles in Somali region', 'Offline-first tools are critical for reaching remote beneficiaries', 'Expand PWA deployment to all field officers; integrate GPS tagging of all submissions', 'Cross-Cutting: MEAL & Data Governance', 'Somali', 'Q3 2025', 'Valuable', 'Dawit Bekele', ARRAY['offline','mobile','gis','data-collection'])
ON CONFLICT (id) DO NOTHING;

INSERT INTO knowledge_documents (id, title, description, category, file_format, file_size_mb, download_count, uploaded_by, upload_date, version, tags) VALUES
('doc-1', 'Enterprise PIRS Indicator Reference Sheet v2.0', 'Complete Performance Indicator Reference Sheet for all 47 programme indicators with definitions and data sources', 'PIRS & M&E Framework', 'PDF', 3.40, 128, 'Dawit Bekele', '2026-01-10', '2.0', ARRAY['PIRS','indicators','M&E','MEAL']),
('doc-2', 'Safeguarding & PSEA Policy Manual', 'Comprehensive safeguarding policy covering prevention, reporting, case management, and PSEA protocols', 'Policy & Compliance', 'PDF', 5.20, 75, 'Sami A.', '2025-11-15', '1.1', ARRAY['safeguarding','PSEA','policy','accountability']),
('doc-3', 'Youth Enterprise Starter Toolkit', 'Practical toolkit for field officers to support youth entrepreneurs through business planning and registration', 'Programme Tools', 'ZIP', 8.70, 210, 'Helen Haile', '2026-01-20', '1.0', ARRAY['enterprise','youth','BDS','toolkit']),
('doc-4', 'Q3 2025 Programme Progress Report', 'Quarterly progress report covering implementation status, output tracking, and financial utilization', 'Reports', 'PDF', 2.80, 92, 'Almaz Tadesse', '2026-01-31', '1.0', ARRAY['quarterly-report','Q3-2025','programme-review'])
ON CONFLICT (id) DO NOTHING;

INSERT INTO learning_agenda (id, question, pillar, priority, status, lead, methodology, target_date) VALUES
('la-1', 'To what extent does TVET certification combined with direct employer linkage improve formal wage employment probability among young women?', 'Pillar 1: Youth Employment', 'High', 'In Progress', 'Dawit Bekele', 'Cohort analysis of employment outcomes; comparison of TVET-certified vs non-certified female graduates at 6-month intervals', '2026-06-30'),
('la-2', 'What factors determine MSME loan repayment success among youth borrowers in the first 12 months post-disbursement?', 'Pillar 3: Financial Inclusion', 'High', 'In Progress', 'Bethlehem Alemu', 'Quantitative analysis of loan performance database; qualitative case studies with MFI loan officers', '2026-09-30'),
('la-3', 'How effective are SBCC campaigns via community radio in shifting attitudes towards young women economic participation?', 'Cross-Cutting: Gender & Inclusion', 'Medium', 'Planned', 'Helen Haile', 'Pre/post attitudinal survey in selected woredas; focus group discussions with target community members', '2026-12-31')
ON CONFLICT (id) DO NOTHING;

INSERT INTO reflection_meetings (id, title, type, date, facilitator, participants_count, key_findings, action_points, region, status) VALUES
('rm-1', 'Q1 2026 Programme Monthly Review Meeting', 'Monthly Review', '2026-02-10', 'Almaz Tadesse', 18, 'IND-1.1 on track at 76.3%. Financial inclusion disbursement behind at 62%. Safeguarding case backlog needs attention.', ARRAY['Accelerate MFI co-financing approvals','Escalate overdue safeguarding cases','Deploy offline tools to Somali region'], 'Addis Ababa', 'Completed'),
('rm-2', 'Oromia Regional Field Team Reflection Q4 2025', 'Regional Reflection', '2025-12-18', 'Yared Getachew', 12, 'Fayida integration improved registration accuracy. Travel constraints reduced field visits by 20%. Market linkage events oversubscribed.', ARRAY['Increase field transport budget','Schedule Q1 market linkage event for Bishoftu','Request additional tablets'], 'Oromia', 'Completed'),
('rm-3', 'Mid-Programme Strategy Review MEAL Directorate', 'Strategic Review', '2026-03-15', 'Dawit Bekele', 25, NULL, NULL, 'Addis Ababa', 'Planned')
ON CONFLICT (id) DO NOTHING;

INSERT INTO governance_bodies (id, body, title, chair_person, last_meeting_date, next_meeting_date, active_resolutions_count, status, members_count, mandate) VALUES
('gov-1', 'Programme Steering Committee', 'National Programme Steering Committee (PSC)', 'Consortium Steering Chair', '2026-01-20', '2026-04-20', 5, 'Active', 12, 'Strategic oversight, major budget decisions, policy direction, donor reporting approval, and programme pivot authorizations'),
('gov-2', 'MEAL Technical Working Group', 'MEAL Technical Working Group (TWG)', 'Dawit Bekele', '2026-02-10', '2026-03-10', 8, 'Active', 9, 'Review M&E data quality, approve indicator updates, validate survey methodologies, and oversee data governance protocols'),
('gov-3', 'Safeguarding Committee', 'Programme Safeguarding & PSEA Committee', 'Sami A.', '2026-02-05', '2026-03-05', 3, 'Active', 7, 'Oversight of all safeguarding cases, PSEA policy compliance, survivor-centred response, and confidential case management'),
('gov-4', 'Financial Management Committee', 'Grants & Financial Management Sub-Committee', 'Bethlehem Alemu', '2026-01-28', '2026-03-28', 4, 'Active', 6, 'Budget utilization oversight, grant compliance, audits, MFI co-financing arrangements, and financial risk management')
ON CONFLICT (id) DO NOTHING;

INSERT INTO sbcc_activities (id, code, title, type, theme, region, woreda, target_audience, target_reach, actual_reach, female_reach, male_reach, channel, date, status, facilitator, behaviour_change_indicators) VALUES
('sbcc-1', 'SBCC-ORM-2026-001', 'Young Women as Economic Leaders Community Radio Series', 'Mass Media Campaign', 'Women Economic Empowerment', 'Oromia', 'Bishoftu', 'Rural community members aged 15-45, parents, community leaders', 50000, 47200, 28100, 19100, 'Community Radio (FM)', '2026-01-15', 'Completed', 'Regional SBCC Coordinator', ARRAY['Increased support for daughters pursuing TVET','Reduced early marriage intentions']),
('sbcc-2', 'SBCC-SDM-2026-002', 'Financial Literacy for Youth Entrepreneurs Workshop Series', 'Community Workshop', 'Financial Literacy & Savings Culture', 'Sidama', 'Hawassa City', 'TVET graduates, programme participants, youth groups', 600, 582, 320, 262, 'In-Person Workshop', '2026-01-20', 'Completed', 'Bethlehem Alemu', ARRAY['Increased savings group enrolment','Improved understanding of loan obligations']),
('sbcc-3', 'SBCC-AMH-2026-003', 'Breaking Barriers Disability Inclusion Awareness Campaign', 'Community Dialogue', 'Social Inclusion & Disability Rights', 'Amhara', 'Bahir Dar Zuria', 'Community leaders, employers, schools, families of persons with disability', 1200, 0, 0, 0, 'Community Dialogue & Theatre', '2026-03-10', 'Planned', 'Helen Haile', ARRAY['Employer willingness to hire persons with disability','Community attitude towards inclusion'])
ON CONFLICT (id) DO NOTHING;

INSERT INTO material_support (id, reference_code, recipient_name, recipient_type, region, woreda, support_type, item_description, quantity, unit_cost_etb, supplier, distribution_date, status, verified, purpose) VALUES
('ms-1', 'MAT-ORM-2025-0041', 'Abyssinia Agro Processing PLC', 'Enterprise (Small)', 'Oromia', 'Bishoftu', 'Productive Equipment', 'Stainless steel fruit sorting belt conveyor (2-ton capacity)', 1, 185000.00, 'Ethio Industrial Supplies Ltd', '2025-11-30', 'Distributed', TRUE, 'Increase daily processing throughput from 800kg to 2.5 tonnes'),
('ms-2', 'MAT-AMH-2025-0089', 'Bahir Wood & Metal Works Cooperative', 'Cooperative', 'Amhara', 'Bahir Dar Zuria', 'Tools & Equipment', 'Professional angle grinder set (5-piece) with grinding discs (100-pack)', 4, 18500.00, 'Nile Hardware Distributors', '2025-12-10', 'Distributed', TRUE, 'Equip all cooperative members with professional-grade finishing tools'),
('ms-3', 'MAT-SDM-2026-0012', 'Hawassa Eco-Garments Hub', 'Enterprise (Medium)', 'Sidama', 'Hawassa City', 'Productive Equipment', 'Industrial lockstitch sewing machine with servo motor', 6, 45000.00, 'SewEthiopia Machinery PLC', '2026-01-15', 'Distributed', FALSE, 'Expand daily production capacity and reduce machine downtime'),
('ms-4', 'MAT-ORM-2026-0021', 'Oromia Region Youth VSLA Groups', 'Savings Group Cluster', 'Oromia', 'Adama', 'Group Start-Up Kit', 'VSLA metal cashbox with padlock and key set (per group)', 12, 3200.00, 'Local Metalwork Suppliers', '2026-02-01', 'Distributed', TRUE, 'Provide secure savings management for newly registered VSLA groups')
ON CONFLICT (id) DO NOTHING;
