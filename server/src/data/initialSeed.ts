// Pre-populated seed data for NestJS API server
export const SEED_USERS = [
  { id: 'u-1', name: 'Sami A. (Super Admin)', email: 'admin@demo.meal.et', password_hash: 'MealDemo@2026', role: 'super_admin', roleLabel: 'Super Admin', organization: 'Programme Management Directorate' },
  { id: 'u-2', name: 'Almaz Tadesse', email: 'programme_manager@demo.meal.et', password_hash: 'MealDemo@2026', role: 'programme_manager', roleLabel: 'Programme Manager', organization: 'Programme Management Directorate' },
  { id: 'u-3', name: 'Dawit Bekele', email: 'monitoring_officer@demo.meal.et', password_hash: 'MealDemo@2026', role: 'monitoring_officer', roleLabel: 'Monitoring Officer', organization: 'MEAL Directorate Addis Ababa' },
  { id: 'u-4', name: 'Helen Haile', email: 'partner_officer@demo.meal.et', password_hash: 'MealDemo@2026', role: 'partner_officer', roleLabel: 'Partner Officer', organization: 'Implementing Partner Liaison' },
  { id: 'u-5', name: 'Yared Getachew', email: 'field_officer@demo.meal.et', password_hash: 'MealDemo@2026', role: 'field_officer', roleLabel: 'Field Officer', organization: 'Regional Field Operations Unit', region: 'Oromia' },
  { id: 'u-6', name: 'Bethlehem Alemu', email: 'finance_officer@demo.meal.et', password_hash: 'MealDemo@2026', role: 'finance_officer', roleLabel: 'Finance Officer', organization: 'Finance & Grants Operations' },
  { id: 'u-7', name: 'Donor Representative', email: 'donor_viewer@demo.meal.et', password_hash: 'MealDemo@2026', role: 'donor_viewer', roleLabel: 'Donor Viewer', organization: 'International Donor Delegation' },
];

export const SEED_PARTICIPANTS = [
  { id: 'p-1', fullName: 'Almaz Tadesse', fayidaId: 'ET-FAY-98214301', phone: '+251 91 123 4567', sex: 'Female', age: 23, education: 'TVET Graduate', region: 'Oromia', woreda: 'Bishoftu', kebele: 'Kebele 02', disability: false, status: 'Employed', cohort: 'Cohort 1 - Agro-processing', registrationDate: '2025-11-12', assignedFieldOfficer: 'Yared Getachew' },
  { id: 'p-2', fullName: 'Dawit Bekele', fayidaId: 'ET-FAY-65239102', phone: '+251 92 345 6789', sex: 'Male', age: 26, education: 'Secondary', region: 'Amhara', woreda: 'Bahir Dar Zuria', kebele: 'Kebele 08', disability: false, status: 'Self-Employed', cohort: 'Cohort 2 - Metal & Woodworking', registrationDate: '2025-11-18', assignedFieldOfficer: 'Tigist Alemu' },
  { id: 'p-3', fullName: 'Hiwot Assefa', fayidaId: 'ET-FAY-77319084', phone: '+251 93 456 7890', sex: 'Female', age: 21, education: 'Primary', region: 'Sidama', woreda: 'Hawassa Zuria', kebele: 'Tula 01', disability: true, disabilityType: 'Hearing Impairment', status: 'In Training', cohort: 'Cohort 3 - Garment & Apparel', registrationDate: '2025-12-05' },
  { id: 'p-4', fullName: 'Chala Demisse', fayidaId: 'ET-FAY-88412093', phone: '+251 94 567 8901', sex: 'Male', age: 24, education: 'TVET Graduate', region: 'Oromia', woreda: 'Adama', kebele: 'Bole Kebele', disability: false, status: 'Employed', cohort: 'Cohort 1 - Agro-processing', registrationDate: '2025-10-20' },
  { id: 'p-5', fullName: 'Selamawit Desta', fayidaId: 'ET-FAY-11293847', phone: '+251 91 678 9012', sex: 'Female', age: 22, education: 'University Degree', region: 'Addis Ababa', woreda: 'Bole', kebele: 'Woreda 03', disability: false, status: 'Employed', cohort: 'Cohort 4 - Digital Freelancing', registrationDate: '2025-11-01' },
  { id: 'p-6', fullName: 'Ahmed Mohammed', fayidaId: 'ET-FAY-55483920', phone: '+251 92 789 0123', sex: 'Male', age: 28, education: 'Secondary', region: 'Somali', woreda: 'Jijiga', kebele: 'Kebele 04', disability: false, status: 'Self-Employed', cohort: 'Cohort 2 - Livestock Value Chain', registrationDate: '2025-12-14' },
  { id: 'p-7', fullName: 'Genet Worku', fayidaId: 'ET-FAY-33291823', phone: '+251 93 890 1234', sex: 'Female', age: 25, education: 'TVET Graduate', region: 'Central Ethiopia', woreda: 'Hosanna', kebele: 'Kebele 01', disability: true, disabilityType: 'Mobility Impairment', status: 'In Training', cohort: 'Cohort 3 - Leather Works', registrationDate: '2026-01-10' },
  { id: 'p-8', fullName: 'Biruk Kebede', fayidaId: 'ET-FAY-99018274', phone: '+251 94 901 2345', sex: 'Male', age: 20, education: 'Primary', region: 'Amhara', woreda: 'Dessie', kebele: 'Kebele 05', disability: false, status: 'Enrolled', cohort: 'Cohort 5 - Renewable Energy Assembly', registrationDate: '2026-01-15' },
  { id: 'p-9', fullName: 'Meron Hailu', fayidaId: 'ET-FAY-44582910', phone: '+251 91 012 3456', sex: 'Female', age: 27, education: 'TVET Graduate', region: 'Tigray', woreda: 'Mekelle', kebele: 'Kedamay Weyane', disability: false, status: 'Employed', cohort: 'Cohort 1 - Food Processing', registrationDate: '2025-10-05' },
  { id: 'p-10', fullName: 'Kidus Solomon', fayidaId: 'ET-FAY-22910482', phone: '+251 92 123 7890', sex: 'Male', age: 23, education: 'Secondary', region: 'Dire Dawa', woreda: 'Sabian', kebele: 'Kebele 02', disability: false, status: 'Employed', cohort: 'Cohort 4 - Logistics & Warehousing', registrationDate: '2025-11-25' },
  ...Array.from({ length: 40 }, (_, i) => {
    const idx = i + 11;
    const isFemale = idx % 2 === 0;
    const regions = ['Oromia', 'Amhara', 'Sidama', 'Somali', 'Central Ethiopia', 'Addis Ababa', 'Tigray', 'Dire Dawa'];
    const statuses = ['Employed', 'Self-Employed', 'In Training', 'Enrolled', 'Graduated'];
    const firstNames = isFemale ? ['Bethlehem', 'Meseret', 'Frehiwot', 'Rahel', 'Aster', 'Hanan'] : ['Solomon', 'Henok', 'Robel', 'Kassahun', 'Tewodros', 'Ephrem'];
    const lastNames = ['Alemu', 'Gebre', 'Mengistu', 'Girma', 'Kassa', 'Woldemariam'];
    const fn = firstNames[idx % firstNames.length];
    const ln = lastNames[idx % lastNames.length];
    return {
      id: `p-${idx}`,
      fullName: `${fn} ${ln}`,
      fayidaId: `ET-FAY-${90000000 + idx * 211}`,
      phone: `+251 9${(idx % 4) + 1} 555 ${1000 + idx}`,
      sex: isFemale ? 'Female' : 'Male',
      age: 20 + (idx % 10),
      education: (['Secondary', 'TVET Graduate', 'Primary', 'University Degree'])[idx % 4],
      region: regions[idx % regions.length],
      woreda: `Woreda ${((idx % 4) + 1)}`,
      kebele: `Kebele 0${((idx % 6) + 1)}`,
      disability: idx % 8 === 0,
      disabilityType: idx % 8 === 0 ? 'Assistance Support' : undefined,
      status: statuses[idx % statuses.length],
      cohort: `Cohort ${(idx % 4) + 1} - Enterprise Skills`,
      registrationDate: `2025-11-${10 + (idx % 18)}`,
    };
  })
];

export const SEED_EMPLOYMENT = [
  { id: 'emp-1', participantId: 'p-1', participantName: 'Almaz Tadesse', sex: 'Female', region: 'Oromia', type: 'Wage Employment', jobTitle: 'Quality Control Technician', employerOrBusiness: 'Abyssinia Agro Processing PLC', sector: 'Agribusiness', monthlyIncomeEtb: 7800, contractType: 'Permanent', verified: true, verificationDate: '2026-01-10', startDate: '2025-12-01' },
  { id: 'emp-2', participantId: 'p-2', participantName: 'Dawit Bekele', sex: 'Male', region: 'Amhara', type: 'Self-Employment', jobTitle: 'Lead Artisan & Workshop Owner', employerOrBusiness: 'Bahir Wood & Metal Works', sector: 'Construction', monthlyIncomeEtb: 9500, contractType: 'Permanent', verified: true, verificationDate: '2026-01-15', startDate: '2025-12-10' },
  { id: 'emp-3', participantId: 'p-4', participantName: 'Chala Demisse', sex: 'Male', region: 'Oromia', type: 'Wage Employment', jobTitle: 'Machine Operator', employerOrBusiness: 'Adama Food Products SC', sector: 'Agribusiness', monthlyIncomeEtb: 6500, contractType: 'Contractual (6M+)', verified: true, verificationDate: '2026-01-20', startDate: '2025-11-15' },
  { id: 'emp-4', participantId: 'p-5', participantName: 'Selamawit Desta', sex: 'Female', region: 'Addis Ababa', type: 'Wage Employment', jobTitle: 'Junior Data Analyst', employerOrBusiness: 'AfroTech Solutions', sector: 'Digital & ICT', monthlyIncomeEtb: 14500, contractType: 'Permanent', verified: true, verificationDate: '2026-02-01', startDate: '2025-12-01' },
  { id: 'emp-5', participantId: 'p-6', participantName: 'Ahmed Mohammed', sex: 'Male', region: 'Somali', type: 'Micro-Enterprise', jobTitle: 'Livestock Fodder Trader', employerOrBusiness: 'Jijiga Green Fodder Hub', sector: 'Agribusiness', monthlyIncomeEtb: 8200, contractType: 'Permanent', verified: false, startDate: '2026-01-05' },
];

export const SEED_ENTERPRISES = [
  { id: 'ent-1', name: 'Abyssinia Agro Processing PLC', registrationNumber: 'OR-BSH-2024-0012', ownerName: 'Kebede Haile', ownerSex: 'Male', ownerAge: 32, fayidaId: 'ET-FAY-91028345', phone: '+251 91 222 3344', sector: 'Agribusiness', tier: 'Small (6-15)', region: 'Oromia', woreda: 'Bishoftu', employeesCount: 14, youthEmployeesCount: 11, femaleEmployeesCount: 8, monthlyRevenueEtb: 380000, loanReceivedEtb: 250000, supportReceived: ['Technical Mentorship', 'Equipment Grant', 'BDS Training'], status: 'Active', establishedDate: '2023-04-15' },
  { id: 'ent-2', name: 'Bahir Wood & Metal Works Cooperative', registrationNumber: 'AM-BDR-2024-0891', ownerName: 'Dawit Bekele', ownerSex: 'Male', ownerAge: 26, fayidaId: 'ET-FAY-65239102', phone: '+251 92 345 6789', sector: 'Construction', tier: 'Micro (3-5)', region: 'Amhara', woreda: 'Bahir Dar Zuria', employeesCount: 5, youthEmployeesCount: 5, femaleEmployeesCount: 2, monthlyRevenueEtb: 120000, loanReceivedEtb: 100000, supportReceived: ['Toolkits Grant', 'Financial Literacy'], status: 'Scaling', establishedDate: '2024-01-10' },
  { id: 'ent-3', name: 'Hawassa Eco-Garments Hub', registrationNumber: 'SD-HAW-2023-1120', ownerName: 'Hirut Kassaye', ownerSex: 'Female', ownerAge: 29, fayidaId: 'ET-FAY-48192043', phone: '+251 93 444 5566', sector: 'Textile & Garments', tier: 'Medium (16+)', region: 'Sidama', woreda: 'Hawassa City', employeesCount: 24, youthEmployeesCount: 20, femaleEmployeesCount: 18, monthlyRevenueEtb: 540000, loanReceivedEtb: 450000, supportReceived: ['Market Linkage', 'Quality Certification BDS'], status: 'Active', establishedDate: '2022-09-18' },
  { id: 'ent-4', name: 'AfroTech Innovations Lab', registrationNumber: 'AA-BOL-2024-3341', ownerName: 'Binyam Assefa', ownerSex: 'Male', ownerAge: 27, fayidaId: 'ET-FAY-77192039', phone: '+251 91 555 6677', sector: 'Digital & ICT', tier: 'Micro (3-5)', region: 'Addis Ababa', woreda: 'Bole', employeesCount: 4, youthEmployeesCount: 4, femaleEmployeesCount: 2, monthlyRevenueEtb: 190000, loanReceivedEtb: 150000, supportReceived: ['Cloud Voucher', 'Incubation Support'], status: 'Scaling', establishedDate: '2024-03-01' },
  { id: 'ent-5', name: 'Rift Valley Organic Honey & Bee Products', registrationNumber: 'OR-ZWY-2023-0492', ownerName: 'Fatuma Hassen', ownerSex: 'Female', ownerAge: 28, fayidaId: 'ET-FAY-33910283', phone: '+251 94 666 7788', sector: 'Agribusiness', tier: 'Small (6-15)', region: 'Oromia', woreda: 'Ziway', employeesCount: 9, youthEmployeesCount: 8, femaleEmployeesCount: 6, monthlyRevenueEtb: 280000, loanReceivedEtb: 200000, supportReceived: ['Modern Beehives', 'Export Testing BDS'], status: 'Active', establishedDate: '2023-06-22' },
  ...Array.from({ length: 20 }, (_, i) => {
    const idx = i + 6;
    const sectors = ['Agribusiness', 'Textile & Garments', 'Leather & Footwear', 'Digital & ICT', 'Construction'];
    const regions = ['Oromia', 'Amhara', 'Sidama', 'Somali', 'Addis Ababa'];
    return {
      id: `ent-${idx}`,
      name: `Ethio Enterprise Hub ${idx}`,
      registrationNumber: `REG-2024-${1000 + idx}`,
      ownerName: idx % 2 === 0 ? `Aster Worku ${idx}` : `Daniel Kassa ${idx}`,
      ownerSex: idx % 2 === 0 ? 'Female' : 'Male',
      ownerAge: 25 + (idx % 10),
      fayidaId: `ET-FAY-${80000000 + idx * 317}`,
      phone: `+251 91 444 ${2000 + idx}`,
      sector: sectors[idx % sectors.length],
      tier: 'Micro (3-5)',
      region: regions[idx % regions.length],
      woreda: 'Woreda 01',
      employeesCount: 4 + (idx % 8),
      youthEmployeesCount: 3 + (idx % 6),
      femaleEmployeesCount: 2 + (idx % 4),
      monthlyRevenueEtb: 95000 + idx * 15000,
      loanReceivedEtb: 100000,
      supportReceived: ['BDS Mentorship', 'Seed Grant'],
      status: 'Active',
      establishedDate: '2024-02-15',
    };
  })
];

export const SEED_TRAINING = [
  { id: 'tr-1', code: 'TRN-2025-AGRO-01', title: 'Modern Horticulture & Agro-Processing Value Addition', provider: 'Tegbare-Id Polytechnic College', sector: 'Agribusiness', region: 'Addis Ababa', woreda: 'Yeka', startDate: '2025-09-01', endDate: '2025-11-30', enrolledTotal: 45, enrolledFemale: 26, graduatedTotal: 42, graduatedFemale: 25, status: 'Completed', attendanceRatePercent: 94.2, curriculumHours: 240 },
  { id: 'tr-2', code: 'TRN-2025-GAR-02', title: 'Industrial Sewing Machine Operation & Quality Inspection', provider: 'Hawassa TVET Institute', sector: 'Textile & Garments', region: 'Sidama', woreda: 'Hawassa', startDate: '2025-10-15', endDate: '2026-01-15', enrolledTotal: 60, enrolledFemale: 48, graduatedTotal: 57, graduatedFemale: 46, status: 'Completed', attendanceRatePercent: 96.0, curriculumHours: 320 },
  { id: 'tr-3', code: 'TRN-2026-DIG-03', title: 'Digital Micro-work, E-commerce, & Remote Data Management', provider: 'Adama Science & Tech TVET Center', sector: 'Digital & ICT', region: 'Oromia', woreda: 'Adama', startDate: '2026-01-05', endDate: '2026-04-05', enrolledTotal: 50, enrolledFemale: 27, graduatedTotal: 0, graduatedFemale: 0, status: 'In Progress', attendanceRatePercent: 91.5, curriculumHours: 200 },
];

export const SEED_LOANS = [
  { id: 'loan-1', loanReference: 'LN-2025-OC-0192', beneficiaryName: 'Almaz Tadesse', beneficiaryType: 'Individual Youth', sex: 'Female', fayidaId: 'ET-FAY-98214301', mfiPartner: 'Siinqee Bank (OCSSCO)', region: 'Oromia', woreda: 'Bishoftu', amountRequestedEtb: 65000, amountDisbursedEtb: 60000, interestRatePercent: 8.5, disbursementDate: '2025-11-25', dueDate: '2026-11-24', amountRepaidEtb: 15000, repaymentStatus: 'Current', purpose: 'Procurement of stainless fruit pulping unit' },
  { id: 'loan-2', loanReference: 'LN-2025-AC-0842', beneficiaryName: 'Bahir Wood & Metal Works Cooperative', beneficiaryType: 'Enterprise / Cooperative', sex: 'Male', fayidaId: 'ET-FAY-65239102', mfiPartner: 'Tsedey Bank (ACSI)', region: 'Amhara', woreda: 'Bahir Dar', amountRequestedEtb: 120000, amountDisbursedEtb: 100000, interestRatePercent: 9.0, disbursementDate: '2025-12-05', dueDate: '2027-06-04', amountRepaidEtb: 22500, repaymentStatus: 'Current', purpose: 'Electric arc welding generators' },
  { id: 'loan-3', loanReference: 'LN-2026-OM-0041', beneficiaryName: 'Hiwot Assefa', beneficiaryType: 'Individual Youth', sex: 'Female', fayidaId: 'ET-FAY-77319084', mfiPartner: 'Omo Microfinance', region: 'Sidama', woreda: 'Hawassa', amountRequestedEtb: 40000, amountDisbursedEtb: 40000, interestRatePercent: 7.5, disbursementDate: '2026-01-12', dueDate: '2027-01-11', amountRepaidEtb: 0, repaymentStatus: 'Grace Period', purpose: 'Heavy-duty industrial sewing machine purchase' },
];

export const SEED_SAVINGS = [
  { id: 'svg-1', groupName: 'Biftu Gudina Youth VSLA', code: 'VSLA-OR-BSH-01', region: 'Oromia', woreda: 'Bishoftu', totalMembers: 25, femaleMembers: 18, youthMembers: 25, establishedDate: '2025-08-01', totalSavingsMobilizedEtb: 185000, loansIssuedInternalEtb: 142000, bankLinkageEstablished: true, linkedBankOrMfi: 'Siinqee Bank Bishoftu Branch', status: 'Active' },
  { id: 'svg-2', groupName: 'Selam Youth Savings Union', code: 'VSLA-AM-BDR-04', region: 'Amhara', woreda: 'Bahir Dar', totalMembers: 30, femaleMembers: 20, youthMembers: 30, establishedDate: '2025-09-15', totalSavingsMobilizedEtb: 220000, loansIssuedInternalEtb: 190000, bankLinkageEstablished: true, linkedBankOrMfi: 'Tsedey Bank Bahir Dar Branch', status: 'Graduating to SACCO' },
];

export const SEED_BUDGET = {
  totalBudgetEtb: 5300000,
  totalDisbursedEtb: 2120000,
  totalCommittedEtb: 1450000,
  remainingEtb: 1730000,
  burnRatePercent: 40.0,
  components: [
    { name: 'Component 1: Youth Skills & TVET Partnerships', allocatedEtb: 1800000, spentEtb: 820000, variancePercent: 45.5 },
    { name: 'Component 2: Enterprise Grants & BDS Mentorship', allocatedEtb: 1600000, spentEtb: 680000, variancePercent: 42.5 },
    { name: 'Component 3: MFI Concessionary Loan Guarantees', allocatedEtb: 1100000, spentEtb: 410000, variancePercent: 37.2 },
    { name: 'Component 4: Digital MEAL MIS & Safeguarding Operations', allocatedEtb: 800000, spentEtb: 210000, variancePercent: 26.2 },
  ],
};

export const SEED_SAFEGUARDING = [
  { id: 'sg-1', incidentCode: 'SG-2026-001', title: 'Workplace safety equipment deficiency at processing partner site', category: 'Unsafe Working Conditions', severity: 'Medium', status: 'Action Plan Underway', reportedDate: '2026-01-18', region: 'Oromia', woreda: 'Bishoftu', isConfidential: false, assignedInvestigator: 'Almaz Tadesse', targetResolutionDate: '2026-02-28', summary: 'Youth trainees reported lack of certified protective heat gloves during boiler operation.', actionsTaken: ['Site inspection conducted', 'Refresher safety training delivered'] },
  { id: 'sg-2', incidentCode: 'SG-2026-002', title: 'Confidential: Alleged intimidation by subcontractor supervisor', category: 'Workplace Harassment / Bullying', severity: 'High', status: 'Investigation Active', reportedDate: '2026-01-25', region: 'Sidama', woreda: 'Hawassa', isConfidential: true, assignedInvestigator: 'Lead Safeguarding Specialist (PMU)', targetResolutionDate: '2026-02-15', summary: 'Female intern reported repeated verbal intimidation regarding shift scheduling.', actionsTaken: ['Interim reassignment to alternative department', 'Hearing scheduled'] },
];

export const SEED_FEEDBACK = [
  { id: 'fb-1', ticketNumber: 'FB-HOT-2026-042', channel: 'Toll-Free Hotline (8080)', category: 'Payment Delay', senderName: 'Robel Kebede', isAnonymous: false, phoneOrContact: '+251 91 190 2834', region: 'Amhara', dateReceived: '2026-02-02', message: 'Training transport stipend for Cohort 2 January attendance has not reached telebirr wallet yet.', status: 'Under Review', slaBreach: false },
  { id: 'fb-2', ticketNumber: 'FB-SMS-2026-098', channel: 'SMS Gateway', category: 'Selection Transparency', senderName: 'Anonymous Community Youth', isAnonymous: true, region: 'Oromia', dateReceived: '2026-02-04', message: 'Can you clarify criteria used for agribusiness toolkits distribution in Woreda 03?', status: 'Response Dispatched', resolutionSummary: 'Automated and officer SMS reply sent detailing eligibility criteria.', slaBreach: false },
];

export const SEED_INDICATORS = [
  { id: 'ind-1', code: 'IND-1.1', title: 'Number of youth transitioned into dignified and fulfilling work (wage or self-employment)', pillar: 'Pillar 1: Youth Employment', level: 'Impact', baseline: 0, targetYear1: 15000, targetLifeOfProgramme: 100000, actualAchieved: 11450, achievementRatePercent: 76.3, unit: 'Youth individuals', ragStatus: 'On Track', lastUpdated: '2026-02-01', frequency: 'Monthly', dataCollectorRole: 'Field Officer / Monitoring Officer' },
  { id: 'ind-2', code: 'IND-1.2', title: 'Percentage of supported youth retaining employment for at least 6 consecutive months', pillar: 'Pillar 1: Youth Employment', level: 'Outcome', baseline: 42, targetYear1: 75, targetLifeOfProgramme: 85, actualAchieved: 71, achievementRatePercent: 94.6, unit: 'Percentage (%)', ragStatus: 'On Track', lastUpdated: '2026-01-30', frequency: 'Quarterly', dataCollectorRole: 'Monitoring Officer' },
  { id: 'ind-3', code: 'IND-2.1', title: 'Number of MSMEs receiving structured business development and market linkage services', pillar: 'Pillar 2: Enterprise Ecosystem', level: 'Output', baseline: 0, targetYear1: 1200, targetLifeOfProgramme: 8000, actualAchieved: 780, achievementRatePercent: 65.0, unit: 'Enterprises', ragStatus: 'At Risk', lastUpdated: '2026-02-03', frequency: 'Monthly', dataCollectorRole: 'Partner Officer' },
  { id: 'ind-4', code: 'IND-2.2', title: 'Average percentage increase in monthly enterprise revenue among supported MSMEs', pillar: 'Pillar 2: Enterprise Ecosystem', level: 'Outcome', baseline: 0, targetYear1: 30, targetLifeOfProgramme: 50, actualAchieved: 26.5, achievementRatePercent: 88.3, unit: 'Percentage (%)', ragStatus: 'On Track', lastUpdated: '2026-01-25', frequency: 'Bi-annually', dataCollectorRole: 'Monitoring Officer' },
  { id: 'ind-5', code: 'IND-3.1', title: 'Total volume of concessionary credit disbursed to youth enterprises by partner MFIs (ETB)', pillar: 'Pillar 3: Financial Inclusion', level: 'Output', baseline: 0, targetYear1: 50000000, targetLifeOfProgramme: 350000000, actualAchieved: 31000000, achievementRatePercent: 62.0, unit: 'ETB', ragStatus: 'At Risk', lastUpdated: '2026-02-01', frequency: 'Monthly', dataCollectorRole: 'Finance Officer' },
  { id: 'ind-6', code: 'IND-4.1', title: 'Percentage of safeguarding complaints acknowledged within 48h and resolved within SLA', pillar: 'Cross-Cutting: Safeguarding & Gender', level: 'Output', baseline: 50, targetYear1: 95, targetLifeOfProgramme: 100, actualAchieved: 91, achievementRatePercent: 95.7, unit: 'Percentage (%)', ragStatus: 'On Track', lastUpdated: '2026-02-04', frequency: 'Monthly', dataCollectorRole: 'Super Admin' },
];

export const SEED_SURVEYS = [
  { id: 'srv-1', code: 'SRV-BL-2025', title: 'Baseline Socio-Economic & Market Assessment', type: 'Baseline Survey', targetSample: 1200, completedSample: 1200, startDate: '2025-07-01', endDate: '2025-09-30', status: 'Closed', regionsIncluded: ['Oromia', 'Amhara', 'Sidama', 'Somali', 'Addis Ababa'] },
  { id: 'srv-2', code: 'SRV-ML-2026', title: 'Year 1 Midline Youth Employment & Enterprise Resilience Survey', type: 'Midline Survey', targetSample: 800, completedSample: 340, startDate: '2026-01-15', endDate: '2026-04-15', status: 'Active', regionsIncluded: ['Oromia', 'Amhara', 'Sidama', 'Addis Ababa'] },
];

export const SEED_AUDIT_LOGS = [
  { id: 'aud-1', timestamp: '2026-02-04 17:30:15', userEmail: 'admin@demo.meal.et', userName: 'Sami A. (Super Admin)', userRole: 'super_admin', action: 'LOGIN', module: 'Auth', description: 'Successful administrative authentication with 2FA token', ipAddress: '197.156.104.22' },
  { id: 'aud-2', timestamp: '2026-02-04 16:15:40', userEmail: 'programme_manager@demo.meal.et', userName: 'Almaz Tadesse', userRole: 'programme_manager', action: 'UPDATE', module: 'Safeguarding', description: 'Updated case SG-2026-001 status to Action Plan Underway', ipAddress: '197.156.104.30' },
];

export const SEED_PARTNERSHIPS = [
  { id: 'par-1', partnerName: 'Siinqee Bank (OCSSCO)', type: 'Financial Institution', focusArea: 'Concessionary youth business loans, VSLA financial linkage, mobile banking integration', region: 'Oromia', status: 'Active', mouSignedDate: '2025-06-01', expiryDate: '2027-05-31', contactPerson: 'Tigist Lemma', email: 'siinqee@ocssco.et', phone: '+251 115 574 422', activeProjectsCount: 4 },
  { id: 'par-2', partnerName: 'Hawassa TVET Institute', type: 'TVET Institution', focusArea: 'Demand-driven vocational training, CBT-aligned curricula, workplace attachment programmes', region: 'Sidama', status: 'Active', mouSignedDate: '2025-07-15', expiryDate: '2027-07-14', contactPerson: 'Mulugeta Kassa', email: 'info@hawassatvet.edu.et', phone: '+251 462 203 812', activeProjectsCount: 3 },
  { id: 'par-3', partnerName: 'Ethiopian Federal MSME Agency', type: 'Government', focusArea: 'Enterprise registration, BDS provision, market linkage facilitation, regulatory compliance', region: 'Addis Ababa', status: 'Active', mouSignedDate: '2025-08-01', expiryDate: '2027-07-31', contactPerson: 'Ato Lemma Haile', email: 'msme@gov.et', phone: '+251 115 510 010', activeProjectsCount: 5 },
  { id: 'par-4', partnerName: 'International Development Consortium', type: 'Donor / International NGO', focusArea: 'Programme funding, adaptive management, MEAL system oversight, donor reporting', region: 'Addis Ababa', status: 'Active', mouSignedDate: '2025-05-01', expiryDate: '2028-04-30', contactPerson: 'Regional Programme Director', email: 'contact@consortium.org', phone: '+251 115 578 111', activeProjectsCount: 7 },
  { id: 'par-5', partnerName: 'Tsedey Bank (ACSI)', type: 'Financial Institution', focusArea: 'Rural youth credit, agricultural value chain finance, group lending schemes', region: 'Amhara', status: 'Active', mouSignedDate: '2025-09-10', expiryDate: '2027-09-09', contactPerson: 'Abebe Tilahun', email: 'acsi@tsedeybank.et', phone: '+251 582 205 111', activeProjectsCount: 2 },
  { id: 'par-6', partnerName: 'Adama Chamber of Commerce', type: 'Private Sector', focusArea: 'Market linkage, job placement events, private sector employer engagement', region: 'Oromia', status: 'Under Review', mouSignedDate: '2025-10-01', expiryDate: '2026-09-30', contactPerson: 'W/ro Mekdes Dereje', email: 'chamber@adama.et', phone: '+251 222 113 456', activeProjectsCount: 1 },
];

export const SEED_BUDGET_LINES = [
  { id: 'bgt-1', component: 'Youth Employment & Workforce Development', description: 'TVET enrolment subsidies, skills training grants, enterprise starter kits', allocatedEtb: 45000000, disbursedEtb: 32100000, balanceEtb: 12900000, utilizationPercent: 71.33, fiscalYear: 'FY2025-2026', quarter: 'Q3', status: 'Active' },
  { id: 'bgt-2', component: 'Enterprise Development & Business Growth', description: 'MSME registration support, BDS, market linkage facilitation, incubation grants', allocatedEtb: 28500000, disbursedEtb: 18900000, balanceEtb: 9600000, utilizationPercent: 66.32, fiscalYear: 'FY2025-2026', quarter: 'Q3', status: 'Active' },
  { id: 'bgt-3', component: 'Financial Inclusion & MFI Guarantee Fund', description: 'Credit guarantee mechanisms, VSLA start-up kits, MFI partnership facilitation costs', allocatedEtb: 35000000, disbursedEtb: 22400000, balanceEtb: 12600000, utilizationPercent: 64.00, fiscalYear: 'FY2025-2026', quarter: 'Q3', status: 'Active' },
  { id: 'bgt-4', component: 'Safeguarding, Accountability & GBV Response', description: 'Safeguarding training, PSEA mechanisms, survivor-centred support services', allocatedEtb: 8500000, disbursedEtb: 5100000, balanceEtb: 3400000, utilizationPercent: 60.00, fiscalYear: 'FY2025-2026', quarter: 'Q3', status: 'Active' },
  { id: 'bgt-5', component: 'MEAL System & Digital Platform', description: 'MIS development, deployment, capacity building, ongoing technical support', allocatedEtb: 12000000, disbursedEtb: 9600000, balanceEtb: 2400000, utilizationPercent: 80.00, fiscalYear: 'FY2025-2026', quarter: 'Q3', status: 'Active' },
  { id: 'bgt-6', component: 'Programme Management & Operating Costs', description: 'PMU operations, staff costs, coordination, logistics, communications', allocatedEtb: 6000000, disbursedEtb: 4200000, balanceEtb: 1800000, utilizationPercent: 70.00, fiscalYear: 'FY2025-2026', quarter: 'Q3', status: 'Active' },
];

export const SEED_ACTION_ITEMS = [
  { id: 'act-1', title: 'Upload Q3 2026 Indicator Progress Report', description: 'Compile and upload Q3 progress report covering all 6 core PIRS indicators', source: 'Monthly Review Meeting', sourceReference: 'MRM-FEB-2026', assignedTo: 'Dawit Bekele', priority: 'High', status: 'In Progress', dueDate: '2026-03-15', module: 'Evidence' },
  { id: 'act-2', title: 'Verify employment outcomes for Cohort 2 graduates', description: 'Conduct field verification visits for all 42 Cohort 2 graduates in Amhara and Oromia', source: 'Training Closure Report', sourceReference: 'TRN-2025-AGRO-01', assignedTo: 'Yared Getachew', priority: 'High', status: 'Pending', dueDate: '2026-03-20', module: 'Participants' },
  { id: 'act-3', title: 'Update SBCC campaign reach data for Oromia', description: 'Enter January-February reach data from Oromia field team enumerators', source: 'SBCC Coordinator', sourceReference: 'SBCC-ORM-Q1', assignedTo: 'Helen Haile', priority: 'Medium', status: 'Pending', dueDate: '2026-03-10', module: 'SBCC' },
  { id: 'act-4', title: 'Conduct VSLA mid-cycle financial health review', description: 'Review savings mobilization figures and loan repayment rates for all VSLA groups', source: 'Finance Review', sourceReference: 'FIN-Q3-2026', assignedTo: 'Bethlehem Alemu', priority: 'High', status: 'In Progress', dueDate: '2026-03-25', module: 'Finance' },
  { id: 'act-5', title: 'Escalate unresolved safeguarding case SG-2026-0045', description: 'Case has exceeded 30-day SLA; escalate to programme director', source: 'Safeguarding Register', sourceReference: 'SG-2026-0045', assignedTo: 'Sami A.', priority: 'Critical', status: 'Overdue', dueDate: '2026-02-28', module: 'Safeguarding' },
];

export const SEED_LESSONS = [
  { id: 'll-1', title: 'Fayida ID integration accelerated enrolment processing', context: 'Fayida API integration reduced registration from 3 days to 4 hours per batch in Oromia Q1 2026', lesson: 'Digital identity verification enables rapid and accurate programme onboarding', recommendation: 'Prioritize Fayida integration in all regions; provide field officers with tablet-based tools', pillar: 'Pillar 1: Youth Employment', region: 'Oromia', quarter: 'Q1 2026', rating: 'Highly Valuable', submittedBy: 'Dawit Bekele', submittedAt: '2026-02-10', tags: ['digital','fayida','enrolment','efficiency'] },
  { id: 'll-2', title: 'Loan uptake higher among female TVET graduates', context: 'Q2 2025 data: female TVET graduates had 78% loan approval rate vs 54% overall', lesson: 'Gender-responsive financial products aligned with vocational certification improve women financial inclusion', recommendation: 'Develop dedicated female graduate loan window with simplified collateral requirements', pillar: 'Pillar 3: Financial Inclusion', region: 'Sidama', quarter: 'Q2 2025', rating: 'Highly Valuable', submittedBy: 'Bethlehem Alemu', submittedAt: '2026-01-15', tags: ['gender','finance','loans','women'] },
  { id: 'll-3', title: 'Offline mobile collection revealed geographic data gaps', context: 'Offline tools collected data from 14 previously unreported kebeles in Somali region', lesson: 'Offline-first tools are critical for reaching remote beneficiaries', recommendation: 'Expand PWA deployment to all field officers; integrate GPS tagging of all submissions', pillar: 'Cross-Cutting: MEAL & Data Governance', region: 'Somali', quarter: 'Q3 2025', rating: 'Valuable', submittedBy: 'Dawit Bekele', submittedAt: '2025-10-05', tags: ['offline','mobile','gis','data-collection'] },
];

export const SEED_DOCUMENTS = [
  { id: 'doc-1', title: 'Enterprise PIRS Indicator Reference Sheet v2.0', description: 'Complete Performance Indicator Reference Sheet for all 47 programme indicators', category: 'PIRS & M&E Framework', fileFormat: 'PDF', fileSizeMb: 3.4, downloadCount: 128, uploadedBy: 'Dawit Bekele', uploadDate: '2026-01-10', version: '2.0', tags: ['PIRS','indicators','M&E'] },
  { id: 'doc-2', title: 'Safeguarding & PSEA Policy Manual', description: 'Comprehensive safeguarding policy covering prevention, reporting, case management, and PSEA protocols', category: 'Policy & Compliance', fileFormat: 'PDF', fileSizeMb: 5.2, downloadCount: 75, uploadedBy: 'Sami A.', uploadDate: '2025-11-15', version: '1.1', tags: ['safeguarding','PSEA','policy'] },
  { id: 'doc-3', title: 'Youth Enterprise Starter Toolkit', description: 'Practical toolkit for field officers to support youth entrepreneurs', category: 'Programme Tools', fileFormat: 'ZIP', fileSizeMb: 8.7, downloadCount: 210, uploadedBy: 'Helen Haile', uploadDate: '2026-01-20', version: '1.0', tags: ['enterprise','youth','BDS'] },
  { id: 'doc-4', title: 'Q3 2025 Programme Progress Report', description: 'Quarterly progress report covering implementation status, output tracking, and financial utilization', category: 'Reports', fileFormat: 'PDF', fileSizeMb: 2.8, downloadCount: 92, uploadedBy: 'Almaz Tadesse', uploadDate: '2026-01-31', version: '1.0', tags: ['quarterly-report','Q3-2025'] },
];

export const SEED_AGENDA = [
  { id: 'la-1', question: 'To what extent does TVET certification combined with direct employer linkage improve formal wage employment probability among young women?', pillar: 'Pillar 1: Youth Employment', priority: 'High', status: 'In Progress', lead: 'Dawit Bekele', methodology: 'Cohort analysis of employment outcomes; comparison of TVET-certified vs non-certified female graduates at 6-month intervals', targetDate: '2026-06-30', findings: null },
  { id: 'la-2', question: 'What factors determine MSME loan repayment success among youth borrowers in the first 12 months post-disbursement?', pillar: 'Pillar 3: Financial Inclusion', priority: 'High', status: 'In Progress', lead: 'Bethlehem Alemu', methodology: 'Quantitative analysis of loan performance database; qualitative case studies with MFI loan officers', targetDate: '2026-09-30', findings: null },
  { id: 'la-3', question: 'How effective are SBCC campaigns via community radio in shifting attitudes towards young women economic participation?', pillar: 'Cross-Cutting: Gender & Inclusion', priority: 'Medium', status: 'Planned', lead: 'Helen Haile', methodology: 'Pre/post attitudinal survey in selected woredas; focus group discussions with target community members', targetDate: '2026-12-31', findings: null },
];

export const SEED_MEETINGS = [
  { id: 'rm-1', title: 'Q1 2026 Programme Monthly Review Meeting', type: 'Monthly Review', date: '2026-02-10', facilitator: 'Almaz Tadesse', participantsCount: 18, keyFindings: 'IND-1.1 on track at 76.3%. Financial inclusion disbursement behind at 62%. Safeguarding case backlog needs attention.', actionPoints: ['Accelerate MFI co-financing approvals', 'Escalate overdue safeguarding cases', 'Deploy offline tools to Somali region'], region: 'Addis Ababa', status: 'Completed' },
  { id: 'rm-2', title: 'Oromia Regional Field Team Reflection — Q4 2025', type: 'Regional Reflection', date: '2025-12-18', facilitator: 'Yared Getachew', participantsCount: 12, keyFindings: 'Fayida integration improved registration accuracy. Travel constraints reduced field visits by 20%. Market linkage events oversubscribed.', actionPoints: ['Increase field transport budget', 'Schedule Q1 market linkage event for Bishoftu', 'Request additional tablets'], region: 'Oromia', status: 'Completed' },
  { id: 'rm-3', title: 'Mid-Programme Strategy Review — MEAL Directorate', type: 'Strategic Review', date: '2026-03-15', facilitator: 'Dawit Bekele', participantsCount: 25, keyFindings: null, actionPoints: [], region: 'Addis Ababa', status: 'Planned' },
];

export const SEED_GOVERNANCE = [
  { id: 'gov-1', body: 'Programme Steering Committee', title: 'National Programme Steering Committee (PSC)', chairPerson: 'Consortium Steering Chair', lastMeetingDate: '2026-01-20', nextMeetingDate: '2026-04-20', activeResolutionsCount: 5, status: 'Active', membersCount: 12, mandate: 'Strategic oversight, major budget decisions, policy direction, donor reporting approval' },
  { id: 'gov-2', body: 'MEAL Technical Working Group', title: 'MEAL Technical Working Group (TWG)', chairPerson: 'Dawit Bekele', lastMeetingDate: '2026-02-10', nextMeetingDate: '2026-03-10', activeResolutionsCount: 8, status: 'Active', membersCount: 9, mandate: 'Review M&E data quality, approve indicator updates, validate survey methodologies' },
  { id: 'gov-3', body: 'Safeguarding Committee', title: 'Programme Safeguarding & PSEA Committee', chairPerson: 'Sami A. (Super Admin)', lastMeetingDate: '2026-02-05', nextMeetingDate: '2026-03-05', activeResolutionsCount: 3, status: 'Active', membersCount: 7, mandate: 'Oversight of all safeguarding cases, PSEA policy compliance, survivor-centred response' },
  { id: 'gov-4', body: 'Financial Management Committee', title: 'Grants & Financial Management Sub-Committee', chairPerson: 'Bethlehem Alemu', lastMeetingDate: '2026-01-28', nextMeetingDate: '2026-03-28', activeResolutionsCount: 4, status: 'Active', membersCount: 6, mandate: 'Budget utilization oversight, grant compliance, audits, MFI co-financing arrangements' },
];

export const SEED_SBCC_ACTIVITIES = [
  { id: 'sbcc-1', code: 'SBCC-ORM-2026-001', title: 'Young Women as Economic Leaders � Community Radio Series', type: 'Mass Media Campaign', theme: 'Women Economic Empowerment', region: 'Oromia', woreda: 'Bishoftu', targetAudience: 'Rural community members aged 15-45, parents, community leaders', targetReach: 50000, actualReach: 47200, femaleReach: 28100, maleReach: 19100, channel: 'Community Radio (FM)', date: '2026-01-15', status: 'Completed', facilitator: 'Regional SBCC Coordinator', behaviourChangeIndicators: ['Increased support for daughters pursuing TVET', 'Reduced early marriage intentions'] },
  { id: 'sbcc-2', code: 'SBCC-SDM-2026-002', title: 'Financial Literacy for Youth Entrepreneurs � Workshop Series', type: 'Community Workshop', theme: 'Financial Literacy & Savings Culture', region: 'Sidama', woreda: 'Hawassa City', targetAudience: 'TVET graduates, programme participants, youth groups', targetReach: 600, actualReach: 582, femaleReach: 320, maleReach: 262, channel: 'In-Person Workshop', date: '2026-01-20', status: 'Completed', facilitator: 'Bethlehem Alemu', behaviourChangeIndicators: ['Increased savings group enrolment', 'Improved understanding of loan obligations'] },
  { id: 'sbcc-3', code: 'SBCC-AMH-2026-003', title: 'Breaking Barriers: Disability Inclusion Awareness Campaign', type: 'Community Dialogue', theme: 'Social Inclusion & Disability Rights', region: 'Amhara', woreda: 'Bahir Dar Zuria', targetAudience: 'Community leaders, employers, schools, families', targetReach: 1200, actualReach: 0, femaleReach: 0, maleReach: 0, channel: 'Community Dialogue & Theatre', date: '2026-03-10', status: 'Planned', facilitator: 'Helen Haile', behaviourChangeIndicators: ['Employer willingness to hire persons with disability', 'Community attitude towards inclusion'] },
];

export const SEED_MATERIAL_SUPPORT = [
  { id: 'ms-1', referenceCode: 'MAT-ORM-2025-0041', recipientName: 'Abyssinia Agro Processing PLC', recipientType: 'Enterprise (Small)', region: 'Oromia', woreda: 'Bishoftu', supportType: 'Productive Equipment', itemDescription: 'Stainless steel fruit sorting belt conveyor (2-ton capacity)', quantity: 1, unitCostEtb: 185000, totalValueEtb: 185000, supplier: 'Ethio Industrial Supplies Ltd', distributionDate: '2025-11-30', status: 'Distributed', verified: true, purpose: 'Increase daily processing throughput from 800kg to 2.5 tonnes' },
  { id: 'ms-2', referenceCode: 'MAT-AMH-2025-0089', recipientName: 'Bahir Wood & Metal Works Cooperative', recipientType: 'Cooperative', region: 'Amhara', woreda: 'Bahir Dar Zuria', supportType: 'Tools & Equipment', itemDescription: 'Professional angle grinder set (5-piece) with grinding discs', quantity: 4, unitCostEtb: 18500, totalValueEtb: 74000, supplier: 'Nile Hardware Distributors', distributionDate: '2025-12-10', status: 'Distributed', verified: true, purpose: 'Equip all cooperative members with professional-grade finishing tools' },
  { id: 'ms-3', referenceCode: 'MAT-SDM-2026-0012', recipientName: 'Hawassa Eco-Garments Hub', recipientType: 'Enterprise (Medium)', region: 'Sidama', woreda: 'Hawassa City', supportType: 'Productive Equipment', itemDescription: 'Industrial lockstitch sewing machine with servo motor', quantity: 6, unitCostEtb: 45000, totalValueEtb: 270000, supplier: 'SewEthiopia Machinery PLC', distributionDate: '2026-01-15', status: 'Distributed', verified: false, purpose: 'Expand daily production capacity' },
  { id: 'ms-4', referenceCode: 'MAT-ORM-2026-0021', recipientName: 'Oromia Region Youth VSLA Groups', recipientType: 'Savings Group Cluster', region: 'Oromia', woreda: 'Adama', supportType: 'Group Start-Up Kit', itemDescription: 'VSLA metal cashbox with padlock and key set (per group)', quantity: 12, unitCostEtb: 3200, totalValueEtb: 38400, supplier: 'Local Metalwork Suppliers', distributionDate: '2026-02-01', status: 'Distributed', verified: true, purpose: 'Provide secure savings management for newly registered VSLA groups' },
];
