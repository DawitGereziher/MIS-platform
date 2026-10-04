import { Module } from "@nestjs/common";
import { DatabaseService } from "./data/database.service";
import { AuthController } from "./auth/auth.controller";
import { ParticipantsController } from "./participants/participants.controller";
import { EnterprisesController, FinanceController } from "./enterprises/enterprises.controller";
import { AccountabilityController } from "./accountability/accountability.controller";
import { EvidenceController, SystemController } from "./evidence/evidence.controller";
import { PartnershipsController, BudgetController, ActionsController, LearningController, GovernanceController, SBCCController, MaterialsController } from "./trackers/trackers.controller";

@Module({
  imports: [],
  controllers: [
    AuthController,
    ParticipantsController,
    EnterprisesController,
    FinanceController,
    AccountabilityController,
    EvidenceController,
    SystemController,
    PartnershipsController,
    BudgetController,
    ActionsController,
    LearningController,
    GovernanceController,
    SBCCController,
    MaterialsController,
  ],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class AppModule {}
