import { Controller, Get, Post, Patch, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { DatabaseService } from '../data/database.service';

@ApiTags('Safeguarding & Accountability CRM')
@Controller('accountability')
export class AccountabilityController {
  constructor(private readonly db: DatabaseService) {}

  @Get('safeguarding')
  @ApiOperation({ summary: 'Get confidential safeguarding & PSEA case log' })
  getSafeguarding() {
    return this.db.getSafeguarding();
  }

  @Post('safeguarding')
  @ApiOperation({ summary: 'File a new safeguarding incident' })
  createSafeguarding(@Body() body: any) {
    return this.db.createSafeguarding(body);
  }

  @Patch('safeguarding/:id/status')
  @ApiOperation({ summary: 'Update safeguarding case progression' })
  updateSafeguardingStatus(
    @Param('id') id: string,
    @Body() body: { status: string; note?: string }
  ) {
    return this.db.updateSafeguardingStatus(id, body.status, body.note);
  }

  @Get('feedback')
  @ApiOperation({ summary: 'List citizen feedback & hotline complaints' })
  getFeedback() {
    return this.db.getFeedback();
  }

  @Post('feedback')
  @ApiOperation({ summary: 'Log a feedback ticket' })
  createFeedback(@Body() body: any) {
    return this.db.createFeedback(body);
  }

  @Patch('feedback/:id/resolve')
  @ApiOperation({ summary: 'Resolve a community ticket' })
  resolveFeedback(
    @Param('id') id: string,
    @Body() body: { resolution: string }
  ) {
    return this.db.resolveFeedback(id, body.resolution);
  }
}
