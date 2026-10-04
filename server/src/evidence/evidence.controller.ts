import { Controller, Get, Patch, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { DatabaseService } from '../data/database.service';

@ApiTags('Evidence, Indicators & Offline Sync')
@Controller('evidence')
export class EvidenceController {
  constructor(private readonly db: DatabaseService) {}

  @Get('indicators')
  @ApiOperation({ summary: 'Get all logframe indicators with targets and actuals' })
  getIndicators() {
    return this.db.getIndicators();
  }

  @Patch('indicators/:id')
  @ApiOperation({ summary: 'Update indicator achievement value and recalculate RAG' })
  updateIndicator(
    @Param('id') id: string,
    @Body() body: { actual: number }
  ) {
    return this.db.updateIndicatorActual(id, Number(body.actual));
  }

  @Get('surveys')
  @ApiOperation({ summary: 'Get all evaluation survey rounds' })
  getSurveys() {
    return this.db.getSurveyRounds();
  }

  @Post('sync')
  @ApiOperation({ summary: 'Batch sync offline field survey submissions from mobile PWA' })
  syncSurveys(@Body() body: { items: any[] }) {
    return this.db.batchSyncSurveys(body.items || []);
  }
}

@ApiTags('System & Audit Trail')
@Controller('system')
export class SystemController {
  constructor(private readonly db: DatabaseService) {}

  @Get('audit')
  @ApiOperation({ summary: 'Get immutable audit trail log' })
  getAudit() {
    return this.db.getAuditLogs();
  }

  @Get('health')
  @ApiOperation({ summary: 'API & Database Health check' })
  health() {
    return {
      status: 'UP',
      timestamp: new Date().toISOString(),
      service: 'NexusMEAL Enterprise MIS Core Backend',
      version: '2.4.0',
      database: this.db.getDbStatus(),
    };
  }
}
