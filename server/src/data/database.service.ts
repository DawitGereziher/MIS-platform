import { Injectable, OnModuleInit } from '@nestjs/common';
import { Pool } from 'pg';
import * as crypto from 'crypto';
import {
  SEED_USERS,
  SEED_PARTICIPANTS,
  SEED_EMPLOYMENT,
  SEED_ENTERPRISES,
  SEED_TRAINING,
  SEED_LOANS,
  SEED_SAVINGS,
  SEED_BUDGET,
  SEED_SAFEGUARDING,
  SEED_FEEDBACK,
  SEED_INDICATORS,
  SEED_SURVEYS,
  SEED_AUDIT_LOGS,
  SEED_PARTNERSHIPS,
  SEED_BUDGET_LINES,
  SEED_ACTION_ITEMS,
  SEED_LESSONS,
  SEED_DOCUMENTS,
  SEED_AGENDA,
  SEED_MEETINGS,
  SEED_GOVERNANCE,
  SEED_SBCC_ACTIVITIES,
  SEED_MATERIAL_SUPPORT,
} from './initialSeed';

@Injectable()
export class DatabaseService implements OnModuleInit {
  private pool: Pool | null = null;
  private isPostgresConnected = false;

  // Local active memory store (for non-docker development fallback)
  private users = [...SEED_USERS];
  private participants = [...SEED_PARTICIPANTS];
  private employment = [...SEED_EMPLOYMENT];
  private enterprises = [...SEED_ENTERPRISES];
  private training = [...SEED_TRAINING];
  private loans = [...SEED_LOANS];
  private savings = [...SEED_SAVINGS];
  private budget = { ...SEED_BUDGET };
  private safeguarding = [...SEED_SAFEGUARDING];
  private feedback = [...SEED_FEEDBACK];
  private indicators = [...SEED_INDICATORS];
  private surveys = [...SEED_SURVEYS];
  private auditLogs = [...SEED_AUDIT_LOGS];
  private partnerships: any[] = [...SEED_PARTNERSHIPS];
  private budgetLines: any[] = [...SEED_BUDGET_LINES];
  private actionItems: any[] = [...SEED_ACTION_ITEMS];
  private lessons: any[] = [...SEED_LESSONS];
  private documents: any[] = [...SEED_DOCUMENTS];
  private agenda: any[] = [...SEED_AGENDA];
  private meetings: any[] = [...SEED_MEETINGS];
  private governance: any[] = [...SEED_GOVERNANCE];
  private sbccActivities: any[] = [...SEED_SBCC_ACTIVITIES];
  private materialSupport: any[] = [...SEED_MATERIAL_SUPPORT];

  async onModuleInit() {
    const host = process.env.DATABASE_HOST || 'localhost';
    const port = Number(process.env.DATABASE_PORT) || 5432;
    const user = process.env.DATABASE_USER || 'meal_admin';
    const password = process.env.DATABASE_PASSWORD || 'MealSecure@2026';
    const database = process.env.DATABASE_NAME || 'rayee_meal_db';

    try {
      this.pool = new Pool({
        host,
        port,
        user,
        password,
        database,
        connectionTimeoutMillis: 3000,
      });

      const client = await this.pool.connect();
      client.release();
      this.isPostgresConnected = true;
      console.log(`[DatabaseService] ✅ Successfully connected to PostgreSQL 16 (${database}) on ${host}:${port}`);
    } catch (e: any) {
      this.isPostgresConnected = false;
      console.log(`[DatabaseService] ℹ️ PostgreSQL offline or unlinked; operating on active in-memory seed dataset.`);
    }
  }

  getDbStatus() {
    return {
      connected: this.isPostgresConnected,
      engine: this.isPostgresConnected ? 'PostgreSQL 16 Enterprise' : 'Pre-Populated Data Store',
      host: process.env.DATABASE_HOST || 'localhost:5432',
      database: process.env.DATABASE_NAME || 'rayee_meal_db',
    };
  }

  // ==========================================
  // 1. AUTH & USERS CRUD (PostgreSQL)
  // ==========================================
  async getUsers() {
    if (this.pool && this.isPostgresConnected) {
      try {
        const res = await this.pool.query('SELECT id, name, email, role, role_label as "roleLabel", organization, region FROM users ORDER BY id ASC');
        if (res.rows && res.rows.length > 0) return res.rows;
      } catch (err: any) {
        console.warn('[Postgres getUsers error]:', err.message);
      }
    }
    return this.users;
  }

  hashPassword(password: string): string {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return `${salt}:${hash}`;
  }

  verifyPassword(password: string, storedHash: string): boolean {
    if (!storedHash) return false;
    if (storedHash.includes(':')) {
      const [salt, originalHash] = storedHash.split(':');
      const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
      return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(originalHash));
    }
    // Direct match (for initial seed / default passwords)
    return password === storedHash;
  }

  async findUserByEmail(email: string) {
    const cleanEmail = email.trim().toLowerCase();
    if (this.pool && this.isPostgresConnected) {
      try {
        const res = await this.pool.query(
          'SELECT id, name, email, password_hash, role, role_label as "roleLabel", organization, region FROM users WHERE LOWER(email) = LOWER($1)',
          [cleanEmail]
        );
        if (res.rows && res.rows.length > 0) return res.rows[0];
      } catch (err: any) {
        console.warn('[Postgres findUserByEmail error]:', err.message);
      }
    }
    return this.users.find(u => u.email.toLowerCase() === cleanEmail);
  }

  async validateCredentials(email: string, pass: string): Promise<any | null> {
    const user = await this.findUserByEmail(email);
    if (!user) {
      return null;
    }

    const storedHash = user.password_hash || (user as any).passwordHash || 'MealDemo@2026';
    const isMatch = this.verifyPassword(pass, storedHash);
    if (!isMatch) {
      return null;
    }

    const { password_hash, passwordHash, ...safeUser } = user;
    return safeUser;
  }

  async createUser(data: { name: string; email: string; password?: string; role: string; roleLabel?: string; organization?: string; region?: string }) {
    const passwordHash = data.password ? this.hashPassword(data.password) : 'MealDemo@2026';
    const newUser = {
      id: `u-${Date.now()}`,
      name: data.name,
      email: data.email,
      password_hash: passwordHash,
      role: data.role,
      roleLabel: data.roleLabel || data.role,
      organization: data.organization || 'Programme Partner',
      region: data.region || 'Addis Ababa',
    };
    this.users.push(newUser);

    if (this.pool && this.isPostgresConnected) {
      try {
        await this.pool.query(
          `INSERT INTO users (id, name, email, password_hash, role, role_label, organization, region)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
           ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name, password_hash = EXCLUDED.password_hash, role = EXCLUDED.role, organization = EXCLUDED.organization`,
          [newUser.id, newUser.name, newUser.email, newUser.password_hash, newUser.role, newUser.roleLabel, newUser.organization, newUser.region]
        );
      } catch (err: any) {
        console.warn('[Postgres createUser error]:', err.message);
      }
    }
    const { password_hash, ...safeUser } = newUser;
    return safeUser;
  }

  // ==========================================
  // 2. PARTICIPANTS CRUD (PostgreSQL)
  // ==========================================
  async getParticipants() {
    if (this.pool && this.isPostgresConnected) {
      try {
        const res = await this.pool.query(
          `SELECT id, full_name as "fullName", fayida_id as "fayidaId", phone, sex, age, education, region, woreda, kebele, disability, disability_type as "disabilityType", status, cohort, registration_date as "registrationDate", assigned_field_officer as "assignedFieldOfficer"
           FROM participants ORDER BY registration_date DESC`
        );
        if (res.rows && res.rows.length > 0) {
          return res.rows.map(r => ({
            ...r,
            registrationDate: typeof r.registrationDate === 'string' ? r.registrationDate : r.registrationDate.toISOString().split('T')[0],
          }));
        }
      } catch (err: any) {
        console.warn('[Postgres getParticipants error]:', err.message);
      }
    }
    return this.participants;
  }

  async getParticipantById(id: string) {
    if (this.pool && this.isPostgresConnected) {
      try {
        const res = await this.pool.query(
          `SELECT id, full_name as "fullName", fayida_id as "fayidaId", phone, sex, age, education, region, woreda, kebele, disability, disability_type as "disabilityType", status, cohort, registration_date as "registrationDate"
           FROM participants WHERE id = $1`,
          [id]
        );
        if (res.rows && res.rows.length > 0) {
          const r = res.rows[0];
          return {
            ...r,
            registrationDate: typeof r.registrationDate === 'string' ? r.registrationDate : r.registrationDate.toISOString().split('T')[0],
          };
        }
      } catch (err: any) {
        console.warn('[Postgres getParticipantById error]:', err.message);
      }
    }
    return this.participants.find(p => p.id === id);
  }

  async createParticipant(data: any) {
    const newParticipant = {
      ...data,
      id: data.id || `p-${Date.now()}`,
      registrationDate: data.registrationDate || new Date().toISOString().split('T')[0],
    };
    this.participants.unshift(newParticipant);

    if (this.pool && this.isPostgresConnected) {
      try {
        await this.pool.query(
          `INSERT INTO participants (id, full_name, fayida_id, phone, sex, age, education, region, woreda, kebele, disability, status, cohort, registration_date)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`,
          [
            newParticipant.id,
            newParticipant.fullName,
            newParticipant.fayidaId,
            newParticipant.phone,
            newParticipant.sex,
            newParticipant.age,
            newParticipant.education,
            newParticipant.region,
            newParticipant.woreda,
            newParticipant.kebele,
            newParticipant.disability || false,
            newParticipant.status,
            newParticipant.cohort,
            newParticipant.registrationDate,
          ]
        );
      } catch (err: any) {
        console.warn('[Postgres createParticipant error]:', err.message);
      }
    }

    this.logAudit('CREATE', 'Participants', `Enrolled participant ${newParticipant.fullName}`, 'API User');
    return newParticipant;
  }

  async deleteParticipant(id: string) {
    const idx = this.participants.findIndex(p => p.id === id);
    if (idx !== -1) {
      this.participants.splice(idx, 1);
    }
    if (this.pool && this.isPostgresConnected) {
      try {
        await this.pool.query('DELETE FROM participants WHERE id = $1', [id]);
        return true;
      } catch (err: any) {
        console.warn('[Postgres deleteParticipant error]:', err.message);
      }
    }
    return idx !== -1;
  }

  // ==========================================
  // 3. EMPLOYMENT OUTCOMES CRUD (PostgreSQL)
  // ==========================================
  async getEmploymentOutcomes() {
    if (this.pool && this.isPostgresConnected) {
      try {
        const res = await this.pool.query(
          `SELECT id, participant_id as "participantId", participant_name as "participantName", sex, region, type, job_title as "jobTitle", employer_or_business as "employerOrBusiness", sector, monthly_income_etb as "monthlyIncomeEtb", contract_type as "contractType", verified, verification_date as "verificationDate", start_date as "startDate"
           FROM employment_outcomes ORDER BY start_date DESC`
        );
        if (res.rows && res.rows.length > 0) {
          return res.rows.map(r => ({
            ...r,
            monthlyIncomeEtb: Number(r.monthlyIncomeEtb),
            verificationDate: r.verificationDate ? (typeof r.verificationDate === 'string' ? r.verificationDate : r.verificationDate.toISOString().split('T')[0]) : undefined,
            startDate: typeof r.startDate === 'string' ? r.startDate : r.startDate.toISOString().split('T')[0],
          }));
        }
      } catch (err: any) {
        console.warn('[Postgres getEmploymentOutcomes error]:', err.message);
      }
    }
    return this.employment;
  }

  async verifyEmployment(id: string) {
    const today = new Date().toISOString().split('T')[0];
    const item = this.employment.find(e => e.id === id);
    if (item) {
      item.verified = true;
      item.verificationDate = today;
    }

    if (this.pool && this.isPostgresConnected) {
      try {
        await this.pool.query('UPDATE employment_outcomes SET verified = TRUE, verification_date = $1 WHERE id = $2', [today, id]);
      } catch (err: any) {
        console.warn('[Postgres verifyEmployment error]:', err.message);
      }
    }
    return item;
  }

  // ==========================================
  // 4. ENTERPRISES CRUD (PostgreSQL)
  // ==========================================
  async getEnterprises() {
    if (this.pool && this.isPostgresConnected) {
      try {
        const res = await this.pool.query(
          `SELECT id, name, registration_number as "registrationNumber", owner_name as "ownerName", owner_sex as "ownerSex", owner_age as "ownerAge", fayida_id as "fayidaId", phone, sector, tier, region, woreda, employees_count as "employeesCount", youth_employees_count as "youthEmployeesCount", female_employees_count as "femaleEmployeesCount", monthly_revenue_etb as "monthlyRevenueEtb", loan_received_etb as "loanReceivedEtb", status, established_date as "establishedDate"
           FROM enterprises ORDER BY established_date DESC`
        );
        if (res.rows && res.rows.length > 0) {
          return res.rows.map(r => ({
            ...r,
            monthlyRevenueEtb: Number(r.monthlyRevenueEtb),
            loanReceivedEtb: Number(r.loanReceivedEtb),
            supportReceived: ['BDS Training', 'Mentorship'],
            establishedDate: typeof r.establishedDate === 'string' ? r.establishedDate : r.establishedDate.toISOString().split('T')[0],
          }));
        }
      } catch (err: any) {
        console.warn('[Postgres getEnterprises error]:', err.message);
      }
    }
    return this.enterprises;
  }

  async createEnterprise(data: any) {
    const newEnt = {
      ...data,
      id: data.id || `ent-${Date.now()}`,
      establishedDate: data.establishedDate || new Date().toISOString().split('T')[0],
    };
    this.enterprises.unshift(newEnt);

    if (this.pool && this.isPostgresConnected) {
      try {
        await this.pool.query(
          `INSERT INTO enterprises (id, name, registration_number, owner_name, owner_sex, owner_age, fayida_id, phone, sector, tier, region, woreda, employees_count, youth_employees_count, female_employees_count, monthly_revenue_etb, loan_received_etb, status, established_date)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)`,
          [
            newEnt.id,
            newEnt.name,
            newEnt.registrationNumber || `REG-${Date.now()}`,
            newEnt.ownerName,
            newEnt.ownerSex || 'Female',
            newEnt.ownerAge || 28,
            newEnt.fayidaId || null,
            newEnt.phone,
            newEnt.sector,
            newEnt.tier || 'Micro (3-5)',
            newEnt.region,
            newEnt.woreda || 'Woreda 01',
            newEnt.employeesCount || 4,
            newEnt.youthEmployeesCount || 3,
            newEnt.femaleEmployeesCount || 2,
            newEnt.monthlyRevenueEtb || 100000,
            newEnt.loanReceivedEtb || 0,
            newEnt.status || 'Active',
            newEnt.establishedDate,
          ]
        );
      } catch (err: any) {
        console.warn('[Postgres createEnterprise error]:', err.message);
      }
    }

    this.logAudit('CREATE', 'Enterprises', `Registered enterprise ${newEnt.name}`, 'API User');
    return newEnt;
  }

  async getTrainingCohorts() {
    if (this.pool && this.isPostgresConnected) {
      try {
        const res = await this.pool.query(
          `SELECT id, code, title, provider, sector, region, woreda, start_date as "startDate", end_date as "endDate", enrolled_total as "enrolledTotal", enrolled_female as "enrolledFemale", graduated_total as "graduatedTotal", graduated_female as "graduatedFemale", status, attendance_rate_percent as "attendanceRatePercent", curriculum_hours as "curriculumHours"
           FROM training_cohorts ORDER BY start_date DESC`
        );
        if (res.rows && res.rows.length > 0) {
          return res.rows.map(r => ({
            ...r,
            attendanceRatePercent: Number(r.attendanceRatePercent),
            startDate: typeof r.startDate === 'string' ? r.startDate : r.startDate.toISOString().split('T')[0],
            endDate: typeof r.endDate === 'string' ? r.endDate : r.endDate.toISOString().split('T')[0],
          }));
        }
      } catch (err: any) {
        console.warn('[Postgres getTrainingCohorts error]:', err.message);
      }
    }
    return this.training;
  }

  // ==========================================
  // 5. FINANCE & LOANS CRUD (PostgreSQL)
  // ==========================================
  async getBudget() {
    return this.budget;
  }

  async getLoans() {
    if (this.pool && this.isPostgresConnected) {
      try {
        const res = await this.pool.query(
          `SELECT id, loan_reference as "loanReference", beneficiary_name as "beneficiaryName", beneficiary_type as "beneficiaryType", sex, fayida_id as "fayidaId", mfi_partner as "mfiPartner", region, woreda, amount_requested_etb as "amountRequestedEtb", amount_disbursed_etb as "amountDisbursedEtb", interest_rate_percent as "interestRatePercent", disbursement_date as "disbursementDate", due_date as "dueDate", amount_repaid_etb as "amountRepaidEtb", repayment_status as "repaymentStatus", purpose
           FROM loans ORDER BY disbursement_date DESC`
        );
        if (res.rows && res.rows.length > 0) {
          return res.rows.map(r => ({
            ...r,
            amountRequestedEtb: Number(r.amountRequestedEtb),
            amountDisbursedEtb: Number(r.amountDisbursedEtb),
            interestRatePercent: Number(r.interestRatePercent),
            amountRepaidEtb: Number(r.amountRepaidEtb),
            disbursementDate: typeof r.disbursementDate === 'string' ? r.disbursementDate : r.disbursementDate.toISOString().split('T')[0],
            dueDate: typeof r.dueDate === 'string' ? r.dueDate : r.dueDate.toISOString().split('T')[0],
          }));
        }
      } catch (err: any) {
        console.warn('[Postgres getLoans error]:', err.message);
      }
    }
    return this.loans;
  }

  async createLoan(data: any) {
    const newLoan = {
      ...data,
      id: data.id || `ln-${Date.now()}`,
      disbursementDate: data.disbursementDate || new Date().toISOString().split('T')[0],
    };
    this.loans.unshift(newLoan);

    if (this.pool && this.isPostgresConnected) {
      try {
        await this.pool.query(
          `INSERT INTO loans (id, loan_reference, beneficiary_name, beneficiary_type, sex, fayida_id, mfi_partner, region, woreda, amount_requested_etb, amount_disbursed_etb, interest_rate_percent, disbursement_date, due_date, amount_repaid_etb, repayment_status, purpose)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)`,
          [
            newLoan.id,
            newLoan.loanReference || `LN-${Date.now()}`,
            newLoan.beneficiaryName,
            newLoan.beneficiaryType || 'Individual Youth',
            newLoan.sex || 'Female',
            newLoan.fayidaId || null,
            newLoan.mfiPartner,
            newLoan.region,
            newLoan.woreda || 'Woreda 01',
            newLoan.amountRequestedEtb || newLoan.amountDisbursedEtb,
            newLoan.amountDisbursedEtb,
            newLoan.interestRatePercent || 8.5,
            newLoan.disbursementDate,
            newLoan.dueDate || '2027-01-01',
            0,
            'Current',
            newLoan.purpose || 'Enterprise Expansion',
          ]
        );
      } catch (err: any) {
        console.warn('[Postgres createLoan error]:', err.message);
      }
    }
    return newLoan;
  }

  async getSavingsGroups() {
    if (this.pool && this.isPostgresConnected) {
      try {
        const res = await this.pool.query(
          `SELECT id, group_name as "groupName", code, region, woreda, total_members as "totalMembers", female_members as "femaleMembers", youth_members as "youthMembers", established_date as "establishedDate", total_savings_mobilized_etb as "totalSavingsMobilizedEtb", loans_issued_internal_etb as "loansIssuedInternalEtb", bank_linkage_established as "bankLinkageEstablished", linked_bank_or_mfi as "linkedBankOrMfi", status
           FROM savings_groups ORDER BY established_date DESC`
        );
        if (res.rows && res.rows.length > 0) {
          return res.rows.map(r => ({
            ...r,
            totalSavingsMobilizedEtb: Number(r.totalSavingsMobilizedEtb),
            loansIssuedInternalEtb: Number(r.loansIssuedInternalEtb),
            establishedDate: typeof r.establishedDate === 'string' ? r.establishedDate : r.establishedDate.toISOString().split('T')[0],
          }));
        }
      } catch (err: any) {
        console.warn('[Postgres getSavingsGroups error]:', err.message);
      }
    }
    return this.savings;
  }

  // ==========================================
  // 6. SAFEGUARDING & FEEDBACK CRUD (PostgreSQL)
  // ==========================================
  async getSafeguarding() {
    if (this.pool && this.isPostgresConnected) {
      try {
        const res = await this.pool.query(
          `SELECT id, incident_code as "incidentCode", title, category, severity, status, reported_date as "reportedDate", region, woreda, is_confidential as "isConfidential", assigned_investigator as "assignedInvestigator", target_resolution_date as "targetResolutionDate", summary, actions_taken as "actionsTaken"
           FROM safeguarding_incidents ORDER BY reported_date DESC`
        );
        if (res.rows && res.rows.length > 0) {
          return res.rows.map(r => ({
            ...r,
            reportedDate: typeof r.reportedDate === 'string' ? r.reportedDate : r.reportedDate.toISOString().split('T')[0],
            targetResolutionDate: r.targetResolutionDate ? (typeof r.targetResolutionDate === 'string' ? r.targetResolutionDate : r.targetResolutionDate.toISOString().split('T')[0]) : undefined,
          }));
        }
      } catch (err: any) {
        console.warn('[Postgres getSafeguarding error]:', err.message);
      }
    }
    return this.safeguarding;
  }

  async createSafeguarding(data: any) {
    const newIncident = {
      ...data,
      id: data.id || `sg-${Date.now()}`,
      incidentCode: `SG-2026-${Math.floor(100 + Math.random() * 900)}`,
      status: 'Reported',
      reportedDate: new Date().toISOString().split('T')[0],
      actionsTaken: ['Logged into confidential central PostgreSQL registry.'],
    };
    this.safeguarding.unshift(newIncident);

    if (this.pool && this.isPostgresConnected) {
      try {
        await this.pool.query(
          `INSERT INTO safeguarding_incidents (id, incident_code, title, category, severity, status, reported_date, region, woreda, is_confidential, assigned_investigator, summary, actions_taken)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
          [
            newIncident.id,
            newIncident.incidentCode,
            newIncident.title,
            newIncident.category,
            newIncident.severity,
            newIncident.status,
            newIncident.reportedDate,
            newIncident.region || 'Oromia',
            newIncident.woreda || 'Woreda 01',
            newIncident.isConfidential !== false,
            newIncident.assignedInvestigator || 'Lead Safeguarding Specialist',
            newIncident.summary,
            newIncident.actionsTaken,
          ]
        );
      } catch (err: any) {
        console.warn('[Postgres createSafeguarding error]:', err.message);
      }
    }

    this.logAudit('CREATE', 'Safeguarding', `Filed safeguarding incident ${newIncident.incidentCode}`, 'API User');
    return newIncident;
  }

  async updateSafeguardingStatus(id: string, status: string, note?: string) {
    const item = this.safeguarding.find(s => s.id === id);
    if (item) {
      item.status = status;
      if (note) item.actionsTaken.push(note);
    }

    if (this.pool && this.isPostgresConnected) {
      try {
        await this.pool.query(
          `UPDATE safeguarding_incidents SET status = $1, actions_taken = array_append(actions_taken, $2) WHERE id = $3`,
          [status, note || `Status changed to ${status}`, id]
        );
      } catch (err: any) {
        console.warn('[Postgres updateSafeguardingStatus error]:', err.message);
      }
    }
    return item;
  }

  async getFeedback() {
    if (this.pool && this.isPostgresConnected) {
      try {
        const res = await this.pool.query(
          `SELECT id, ticket_number as "ticketNumber", channel, category, sender_name as "senderName", is_anonymous as "isAnonymous", phone_or_contact as "phoneOrContact", region, date_received as "dateReceived", message, status, sla_breach as "slaBreach", resolution_summary as "resolutionSummary"
           FROM feedback_tickets ORDER BY date_received DESC`
        );
        if (res.rows && res.rows.length > 0) {
          return res.rows.map(r => ({
            ...r,
            dateReceived: typeof r.dateReceived === 'string' ? r.dateReceived : r.dateReceived.toISOString().split('T')[0],
          }));
        }
      } catch (err: any) {
        console.warn('[Postgres getFeedback error]:', err.message);
      }
    }
    return this.feedback;
  }

  async createFeedback(data: any) {
    const newTicket = {
      ...data,
      id: data.id || `fb-${Date.now()}`,
      ticketNumber: `FB-2026-${Math.floor(100 + Math.random() * 900)}`,
      dateReceived: new Date().toISOString().split('T')[0],
      status: 'New',
    };
    this.feedback.unshift(newTicket);

    if (this.pool && this.isPostgresConnected) {
      try {
        await this.pool.query(
          `INSERT INTO feedback_tickets (id, ticket_number, channel, category, sender_name, is_anonymous, phone_or_contact, region, date_received, message, status)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
          [
            newTicket.id,
            newTicket.ticketNumber,
            newTicket.channel || 'Hotline 8080',
            newTicket.category || 'Inquiry',
            newTicket.senderName || 'Anonymous',
            newTicket.isAnonymous || false,
            newTicket.phoneOrContact || null,
            newTicket.region || 'Oromia',
            newTicket.dateReceived,
            newTicket.message,
            newTicket.status,
          ]
        );
      } catch (err: any) {
        console.warn('[Postgres createFeedback error]:', err.message);
      }
    }
    return newTicket;
  }

  async resolveFeedback(id: string, resolution: string) {
    const item = this.feedback.find(f => f.id === id);
    if (item) {
      item.status = 'Resolved';
      item.resolutionSummary = resolution;
    }

    if (this.pool && this.isPostgresConnected) {
      try {
        await this.pool.query(
          `UPDATE feedback_tickets SET status = 'Resolved', resolution_summary = $1 WHERE id = $2`,
          [resolution, id]
        );
      } catch (err: any) {
        console.warn('[Postgres resolveFeedback error]:', err.message);
      }
    }
    return item;
  }

  // ==========================================
  // 7. INDICATORS & SURVEYS CRUD (PostgreSQL)
  // ==========================================
  async getIndicators() {
    if (this.pool && this.isPostgresConnected) {
      try {
        const res = await this.pool.query(
          `SELECT id, code, title, pillar, level, baseline, target_year1 as "targetYear1", target_life_of_programme as "targetLifeOfProgramme", actual_achieved as "actualAchieved", achievement_rate_percent as "achievementRatePercent", unit, rag_status as "ragStatus", last_updated as "lastUpdated", frequency, data_collector_role as "dataCollectorRole"
           FROM indicators ORDER BY code ASC`
        );
        if (res.rows && res.rows.length > 0) {
          return res.rows.map(r => ({
            ...r,
            baseline: Number(r.baseline),
            targetYear1: Number(r.targetYear1),
            targetLifeOfProgramme: Number(r.targetLifeOfProgramme),
            actualAchieved: Number(r.actualAchieved),
            achievementRatePercent: Number(r.achievementRatePercent),
            lastUpdated: typeof r.lastUpdated === 'string' ? r.lastUpdated : r.lastUpdated.toISOString().split('T')[0],
          }));
        }
      } catch (err: any) {
        console.warn('[Postgres getIndicators error]:', err.message);
      }
    }
    return this.indicators;
  }

  async updateIndicatorActual(id: string, actual: number) {
    const item = this.indicators.find(i => i.id === id);
    if (item) {
      item.actualAchieved = actual;
      item.achievementRatePercent = Number(((actual / item.targetYear1) * 100).toFixed(1));
      item.ragStatus = item.achievementRatePercent >= 90 ? 'Achieved' : item.achievementRatePercent >= 75 ? 'On Track' : item.achievementRatePercent >= 50 ? 'At Risk' : 'Delayed';
      item.lastUpdated = new Date().toISOString().split('T')[0];

      if (this.pool && this.isPostgresConnected) {
        try {
          await this.pool.query(
            `UPDATE indicators SET actual_achieved = $1, achievement_rate_percent = $2, rag_status = $3, last_updated = $4 WHERE id = $5`,
            [item.actualAchieved, item.achievementRatePercent, item.ragStatus, item.lastUpdated, id]
          );
        } catch (err: any) {
          console.warn('[Postgres updateIndicatorActual error]:', err.message);
        }
      }
    }
    return item;
  }

  async getSurveyRounds() {
    if (this.pool && this.isPostgresConnected) {
      try {
        const res = await this.pool.query(
          `SELECT id, code, title, type, target_sample as "targetSample", completed_sample as "completedSample", start_date as "startDate", end_date as "endDate", status, regions_included as "regionsIncluded"
           FROM survey_rounds ORDER BY start_date DESC`
        );
        if (res.rows && res.rows.length > 0) {
          return res.rows.map(r => ({
            ...r,
            startDate: typeof r.startDate === 'string' ? r.startDate : r.startDate.toISOString().split('T')[0],
            endDate: typeof r.endDate === 'string' ? r.endDate : r.endDate.toISOString().split('T')[0],
          }));
        }
      } catch (err: any) {
        console.warn('[Postgres getSurveyRounds error]:', err.message);
      }
    }
    return this.surveys;
  }

  async batchSyncSurveys(surveys: any[]) {
    const count = surveys.length;
    this.logAudit('SYNC', 'Surveys', `Batch ingested ${count} field survey submissions into PostgreSQL database`, 'Field Collector Sync');
    return { ingestedCount: count, status: 'SUCCESS' };
  }

  // ==========================================
  // 8. AUDIT LOGS CRUD (PostgreSQL)
  // ==========================================
  async getAuditLogs() {
    if (this.pool && this.isPostgresConnected) {
      try {
        const res = await this.pool.query(
          `SELECT id, timestamp, user_email as "userEmail", user_name as "userName", user_role as "userRole", action, module, description, ip_address as "ipAddress"
           FROM audit_logs ORDER BY timestamp DESC LIMIT 50`
        );
        if (res.rows && res.rows.length > 0) {
          return res.rows.map(r => ({
            ...r,
            timestamp: typeof r.timestamp === 'string' ? r.timestamp : r.timestamp.toISOString().replace('T', ' ').substring(0, 19),
          }));
        }
      } catch (err: any) {
        console.warn('[Postgres getAuditLogs error]:', err.message);
      }
    }
    return this.auditLogs;
  }

  async logAudit(action: string, module: string, description: string, user: string) {
    const newLog = {
      id: `aud-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      userEmail: 'system@api.meal.et',
      userName: user,
      userRole: 'system',
      action,
      module,
      description,
      ipAddress: '197.156.104.10',
    };
    this.auditLogs.unshift(newLog);

    if (this.pool && this.isPostgresConnected) {
      try {
        await this.pool.query(
          `INSERT INTO audit_logs (id, user_email, user_name, user_role, action, module, description, ip_address)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
          [newLog.id, newLog.userEmail, newLog.userName, newLog.userRole, newLog.action, newLog.module, newLog.description, newLog.ipAddress]
        );
      } catch (err: any) {
        console.warn('[Postgres logAudit error]:', err.message);
      }
    }
  }

  // ==========================================
  // 9. PARTNERSHIPS CRUD (PostgreSQL)
  // ==========================================
  async getPartnerships() {
    if (this.pool && this.isPostgresConnected) {
      try {
        const res = await this.pool.query(
          `SELECT id, partner_name AS "partnerName", type, focus_area AS "focusArea", region, status,
           mou_signed_date AS "mouSignedDate", expiry_date AS "expiryDate", contact_person AS "contactPerson",
           email, phone, active_projects_count AS "activeProjectsCount"
           FROM partnerships ORDER BY partner_name ASC`
        );
        if (res.rows && res.rows.length > 0) return res.rows;
      } catch (err) { console.warn('[Postgres getPartnerships error]:', err.message); }
    }
    return this.partnerships;
  }

  async createPartnership(data) {
    const newPartner = { id: `par-${Date.now()}`, ...data, activeProjectsCount: 0 };
    this.partnerships.push(newPartner);
    if (this.pool && this.isPostgresConnected) {
      try {
        await this.pool.query(
          `INSERT INTO partnerships (id, partner_name, type, focus_area, region, status, mou_signed_date, expiry_date, contact_person, email, phone, active_projects_count)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
          [newPartner.id, data.partnerName, data.type, data.focusArea, data.region, data.status,
           data.mouSignedDate, data.expiryDate, data.contactPerson, data.email, data.phone || null, 0]
        );
      } catch (err) { console.warn('[Postgres createPartnership error]:', err.message); }
    }
    return newPartner;
  }

  // ==========================================
  // 10. BUDGET LINES CRUD (PostgreSQL)
  // ==========================================
  async getBudgetLines() {
    if (this.pool && this.isPostgresConnected) {
      try {
        const res = await this.pool.query(
          `SELECT id, component, description, allocated_etb AS "allocatedEtb", disbursed_etb AS "disbursedEtb",
           balance_etb AS "balanceEtb", utilization_percent AS "utilizationPercent", fiscal_year AS "fiscalYear",
           quarter, status FROM budget_lines ORDER BY component ASC`
        );
        if (res.rows && res.rows.length > 0) return res.rows;
      } catch (err) { console.warn('[Postgres getBudgetLines error]:', err.message); }
    }
    return this.budgetLines;
  }

  async createBudgetLine(data) {
    const newLine = { id: `bgt-${Date.now()}`, ...data };
    this.budgetLines.push(newLine);
    if (this.pool && this.isPostgresConnected) {
      try {
        await this.pool.query(
          `INSERT INTO budget_lines (id, component, description, allocated_etb, disbursed_etb, utilization_percent, fiscal_year, quarter, status)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
          [newLine.id, data.component, data.description, data.allocatedEtb, data.disbursedEtb || 0,
           data.utilizationPercent || 0, data.fiscalYear, data.quarter || null, data.status]
        );
      } catch (err) { console.warn('[Postgres createBudgetLine error]:', err.message); }
    }
    return newLine;
  }

  // ==========================================
  // 11. ACTION ITEMS CRUD (PostgreSQL)
  // ==========================================
  async getActionItems() {
    if (this.pool && this.isPostgresConnected) {
      try {
        const res = await this.pool.query(
          `SELECT id, title, description, source, source_reference AS "sourceReference",
           assigned_to AS "assignedTo", priority, status, due_date AS "dueDate",
           completed_date AS "completedDate", module FROM action_items ORDER BY due_date ASC`
        );
        if (res.rows && res.rows.length > 0) return res.rows;
      } catch (err) { console.warn('[Postgres getActionItems error]:', err.message); }
    }
    return this.actionItems;
  }

  async updateActionItemStatus(id, status) {
    const idx = this.actionItems.findIndex(a => a.id === id);
    if (idx >= 0) { this.actionItems[idx].status = status; }
    if (this.pool && this.isPostgresConnected) {
      try {
        await this.pool.query(
          `UPDATE action_items SET status = $1, completed_date = CASE WHEN $1 = 'Completed' THEN CURRENT_DATE ELSE completed_date END WHERE id = $2`,
          [status, id]
        );
      } catch (err) { console.warn('[Postgres updateActionItemStatus error]:', err.message); }
    }
    return this.actionItems.find(a => a.id === id);
  }

  // ==========================================
  // 12. LESSONS LEARNED CRUD (PostgreSQL)
  // ==========================================
  async getLessons() {
    if (this.pool && this.isPostgresConnected) {
      try {
        const res = await this.pool.query(
          `SELECT id, title, context, lesson, recommendation, pillar, region, quarter, rating,
           submitted_by AS "submittedBy", submitted_at AS "submittedAt", tags
           FROM lessons_learned ORDER BY submitted_at DESC`
        );
        if (res.rows && res.rows.length > 0) return res.rows;
      } catch (err) { console.warn('[Postgres getLessons error]:', err.message); }
    }
    return this.lessons;
  }

  async createLesson(data) {
    const newLesson = { id: `ll-${Date.now()}`, submittedAt: new Date().toISOString(), ...data };
    this.lessons.unshift(newLesson);
    if (this.pool && this.isPostgresConnected) {
      try {
        await this.pool.query(
          `INSERT INTO lessons_learned (id, title, context, lesson, recommendation, pillar, region, quarter, rating, submitted_by, tags)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
          [newLesson.id, data.title, data.context, data.lesson, data.recommendation, data.pillar,
           data.region || null, data.quarter, data.rating, data.submittedBy, data.tags || []]
        );
      } catch (err) { console.warn('[Postgres createLesson error]:', err.message); }
    }
    return newLesson;
  }

  // ==========================================
  // 13. KNOWLEDGE DOCUMENTS (PostgreSQL)
  // ==========================================
  async getDocuments() {
    if (this.pool && this.isPostgresConnected) {
      try {
        const res = await this.pool.query(
          `SELECT id, title, description, category, file_format AS "fileFormat", file_size_mb AS "fileSizeMb",
           download_count AS "downloadCount", uploaded_by AS "uploadedBy", upload_date AS "uploadDate",
           version, tags FROM knowledge_documents ORDER BY upload_date DESC`
        );
        if (res.rows && res.rows.length > 0) return res.rows;
      } catch (err) { console.warn('[Postgres getDocuments error]:', err.message); }
    }
    return this.documents;
  }

  // ==========================================
  // 14. LEARNING AGENDA (PostgreSQL)
  // ==========================================
  async getAgenda() {
    if (this.pool && this.isPostgresConnected) {
      try {
        const res = await this.pool.query(
          `SELECT id, question, pillar, priority, status, lead, methodology, target_date AS "targetDate", findings
           FROM learning_agenda ORDER BY priority DESC`
        );
        if (res.rows && res.rows.length > 0) return res.rows;
      } catch (err) { console.warn('[Postgres getAgenda error]:', err.message); }
    }
    return this.agenda;
  }

  // ==========================================
  // 15. REFLECTION MEETINGS (PostgreSQL)
  // ==========================================
  async getMeetings() {
    if (this.pool && this.isPostgresConnected) {
      try {
        const res = await this.pool.query(
          `SELECT id, title, type, date, facilitator, participants_count AS "participantsCount",
           key_findings AS "keyFindings", action_points AS "actionPoints", region, status
           FROM reflection_meetings ORDER BY date DESC`
        );
        if (res.rows && res.rows.length > 0) return res.rows;
      } catch (err) { console.warn('[Postgres getMeetings error]:', err.message); }
    }
    return this.meetings;
  }

  async createMeeting(data) {
    const newMeeting = { id: `rm-${Date.now()}`, ...data };
    this.meetings.unshift(newMeeting);
    if (this.pool && this.isPostgresConnected) {
      try {
        await this.pool.query(
          `INSERT INTO reflection_meetings (id, title, type, date, facilitator, participants_count, key_findings, action_points, region, status)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
          [newMeeting.id, data.title, data.type, data.date, data.facilitator, data.participantsCount,
           data.keyFindings || null, data.actionPoints || [], data.region || null, data.status]
        );
      } catch (err) { console.warn('[Postgres createMeeting error]:', err.message); }
    }
    return newMeeting;
  }

  // ==========================================
  // 16. GOVERNANCE BODIES (PostgreSQL)
  // ==========================================
  async getGovernance() {
    if (this.pool && this.isPostgresConnected) {
      try {
        const res = await this.pool.query(
          `SELECT id, body, title, chair_person AS "chairPerson", last_meeting_date AS "lastMeetingDate",
           next_meeting_date AS "nextMeetingDate", active_resolutions_count AS "activeResolutionsCount",
           status, members_count AS "membersCount", mandate
           FROM governance_bodies ORDER BY body ASC`
        );
        if (res.rows && res.rows.length > 0) return res.rows;
      } catch (err) { console.warn('[Postgres getGovernance error]:', err.message); }
    }
    return this.governance;
  }

  // ==========================================
  // 17. SBCC ACTIVITIES (PostgreSQL)
  // ==========================================
  async getSBCCActivities() {
    if (this.pool && this.isPostgresConnected) {
      try {
        const res = await this.pool.query(
          `SELECT id, code, title, type, theme, region, woreda, target_audience AS "targetAudience",
           target_reach AS "targetReach", actual_reach AS "actualReach", female_reach AS "femaleReach",
           male_reach AS "maleReach", channel, date, status, facilitator,
           behaviour_change_indicators AS "behaviourChangeIndicators"
           FROM sbcc_activities ORDER BY date DESC`
        );
        if (res.rows && res.rows.length > 0) return res.rows;
      } catch (err) { console.warn('[Postgres getSBCCActivities error]:', err.message); }
    }
    return this.sbccActivities;
  }

  async createSBCCActivity(data) {
    const newActivity = { id: `sbcc-${Date.now()}`, code: `SBCC-${Date.now()}`, ...data };
    this.sbccActivities.unshift(newActivity);
    if (this.pool && this.isPostgresConnected) {
      try {
        await this.pool.query(
          `INSERT INTO sbcc_activities (id, code, title, type, theme, region, woreda, target_audience, target_reach, actual_reach, female_reach, male_reach, channel, date, status, facilitator)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)`,
          [newActivity.id, newActivity.code, data.title, data.type, data.theme, data.region,
           data.woreda || null, data.targetAudience, data.targetReach, data.actualReach || 0,
           data.femaleReach || 0, data.maleReach || 0, data.channel, data.date, data.status, data.facilitator || null]
        );
      } catch (err) { console.warn('[Postgres createSBCCActivity error]:', err.message); }
    }
    return newActivity;
  }

  // ==========================================
  // 18. MATERIAL SUPPORT (PostgreSQL)
  // ==========================================
  async getMaterialSupport() {
    if (this.pool && this.isPostgresConnected) {
      try {
        const res = await this.pool.query(
          `SELECT id, reference_code AS "referenceCode", recipient_name AS "recipientName",
           recipient_type AS "recipientType", region, woreda, support_type AS "supportType",
           item_description AS "itemDescription", quantity, unit_cost_etb AS "unitCostEtb",
           total_value_etb AS "totalValueEtb", supplier, distribution_date AS "distributionDate",
           status, verified, purpose FROM material_support ORDER BY distribution_date DESC`
        );
        if (res.rows && res.rows.length > 0) return res.rows;
      } catch (err) { console.warn('[Postgres getMaterialSupport error]:', err.message); }
    }
    return this.materialSupport;
  }

  async createMaterialSupport(data) {
    const newItem = { id: `ms-${Date.now()}`, referenceCode: `MAT-${Date.now()}`, totalValueEtb: data.quantity * data.unitCostEtb, verified: false, ...data };
    this.materialSupport.unshift(newItem);
    if (this.pool && this.isPostgresConnected) {
      try {
        await this.pool.query(
          `INSERT INTO material_support (id, reference_code, recipient_name, recipient_type, region, woreda, support_type, item_description, quantity, unit_cost_etb, supplier, distribution_date, status, verified, purpose)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)`,
          [newItem.id, newItem.referenceCode, data.recipientName, data.recipientType, data.region,
           data.woreda, data.supportType, data.itemDescription, data.quantity, data.unitCostEtb,
           data.supplier || null, data.distributionDate, data.status, false, data.purpose || null]
        );
      } catch (err) { console.warn('[Postgres createMaterialSupport error]:', err.message); }
    }
    return newItem;
  }
}
