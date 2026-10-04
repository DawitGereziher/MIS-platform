import { Controller, Get, Post, Patch, Body, Param } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { DatabaseService } from "../data/database.service";

@ApiTags("Partnerships & Governance")
@Controller("partnerships")
export class PartnershipsController {
  constructor(private readonly db: DatabaseService) {}
  @Get() @ApiOperation({ summary: "List all institutional and private sector partnerships" }) getPartnerships() { return this.db.getPartnerships(); }
  @Post() @ApiOperation({ summary: "Register a new partnership / MoU" }) createPartnership(@Body() body: any) { return this.db.createPartnership(body); }
}

@ApiTags("Budget & Finance Lines")
@Controller("budget")
export class BudgetController {
  constructor(private readonly db: DatabaseService) {}
  @Get("lines") @ApiOperation({ summary: "Get all budget component lines" }) getBudgetLines() { return this.db.getBudgetLines(); }
  @Post("lines") @ApiOperation({ summary: "Add a new budget component line" }) createBudgetLine(@Body() body: any) { return this.db.createBudgetLine(body); }
}

@ApiTags("Action Items Tracker")
@Controller("actions")
export class ActionsController {
  constructor(private readonly db: DatabaseService) {}
  @Get() @ApiOperation({ summary: "Get all programme action items" }) getActions() { return this.db.getActionItems(); }
  @Patch(":id/status") @ApiOperation({ summary: "Update action item status" }) updateStatus(@Param("id") id: string, @Body() body: { status: string }) { return this.db.updateActionItemStatus(id, body.status); }
}

@ApiTags("Learning & Knowledge Management")
@Controller("learning")
export class LearningController {
  constructor(private readonly db: DatabaseService) {}
  @Get("lessons") @ApiOperation({ summary: "Get all lessons learned" }) getLessons() { return this.db.getLessons(); }
  @Post("lessons") @ApiOperation({ summary: "Submit a new lessons learned entry" }) createLesson(@Body() body: any) { return this.db.createLesson(body); }
  @Get("documents") @ApiOperation({ summary: "Get all knowledge library documents" }) getDocuments() { return this.db.getDocuments(); }
  @Get("agenda") @ApiOperation({ summary: "Get all learning agenda questions" }) getAgenda() { return this.db.getAgenda(); }
  @Get("meetings") @ApiOperation({ summary: "Get all reflection meetings" }) getMeetings() { return this.db.getMeetings(); }
  @Post("meetings") @ApiOperation({ summary: "Log a new reflection meeting" }) createMeeting(@Body() body: any) { return this.db.createMeeting(body); }
}

@ApiTags("Governance Bodies")
@Controller("governance")
export class GovernanceController {
  constructor(private readonly db: DatabaseService) {}
  @Get() @ApiOperation({ summary: "Get all governance bodies" }) getGovernance() { return this.db.getGovernance(); }
}

@ApiTags("SBCC Tracker")
@Controller("sbcc")
export class SBCCController {
  constructor(private readonly db: DatabaseService) {}
  @Get() @ApiOperation({ summary: "Get all SBCC campaign activities" }) getSBCC() { return this.db.getSBCCActivities(); }
  @Post() @ApiOperation({ summary: "Log a new SBCC activity" }) createSBCC(@Body() body: any) { return this.db.createSBCCActivity(body); }
}

@ApiTags("Material & Technical Support Tracker")
@Controller("materials")
export class MaterialsController {
  constructor(private readonly db: DatabaseService) {}
  @Get() @ApiOperation({ summary: "Get all material support items distributed" }) getMaterials() { return this.db.getMaterialSupport(); }
  @Post() @ApiOperation({ summary: "Record a new material support disbursement" }) createMaterial(@Body() body: any) { return this.db.createMaterialSupport(body); }
}
