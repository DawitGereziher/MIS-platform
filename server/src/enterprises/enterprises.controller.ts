import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { DatabaseService } from '../data/database.service';

@ApiTags('Enterprises & MSMEs')
@Controller('enterprises')
export class EnterprisesController {
  constructor(private readonly db: DatabaseService) {}

  @Get()
  @ApiOperation({ summary: 'List all profiled MSMEs' })
  getAll() {
    return this.db.getEnterprises();
  }

  @Post()
  @ApiOperation({ summary: 'Register a new enterprise' })
  create(@Body() body: any) {
    return this.db.createEnterprise(body);
  }

  @Get('training/cohorts')
  @ApiOperation({ summary: 'List all TVET training cohorts' })
  getTraining() {
    return this.db.getTrainingCohorts();
  }
}

@ApiTags('Finance & Micro-Loans')
@Controller('finance')
export class FinanceController {
  constructor(private readonly db: DatabaseService) {}

  @Get('budget')
  @ApiOperation({ summary: 'Get programme budget allocations and burn rates' })
  getBudget() {
    return this.db.getBudget();
  }

  @Get('loans')
  @ApiOperation({ summary: 'Get all MFI concessionary loan disbursements' })
  getLoans() {
    return this.db.getLoans();
  }

  @Post('loans')
  @ApiOperation({ summary: 'Record a new loan disbursement' })
  createLoan(@Body() body: any) {
    return this.db.createLoan(body);
  }

  @Get('savings')
  @ApiOperation({ summary: 'List grassroots VSLA savings groups' })
  getSavings() {
    return this.db.getSavingsGroups();
  }
}
