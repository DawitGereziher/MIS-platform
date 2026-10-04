import { Controller, Post, Body, Get, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DatabaseService } from '../data/database.service';

@ApiTags('Authentication & RBAC')
@Controller('auth')
export class AuthController {
  constructor(private readonly db: DatabaseService) {}

  @Post('login')
  @ApiOperation({ summary: 'Authenticate user with email and password against database' })
  @ApiResponse({ status: 200, description: 'User successfully authenticated with JWT token' })
  async login(@Body() body: { email: string; pass: string }) {
    if (!body.email || !body.pass) {
      throw new BadRequestException('Email and password are required');
    }

    const user = await this.db.validateCredentials(body.email, body.pass);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return {
      accessToken: `jwt-${user.role}-${Date.now()}`,
      user,
      expiresIn: '8h',
    };
  }

  @Post('register')
  @ApiOperation({ summary: 'Register a new officer or stakeholder account' })
  @ApiResponse({ status: 201, description: 'Account registered successfully' })
  async register(@Body() body: { name: string; email: string; pass: string; role?: string; organization?: string; region?: string }) {
    if (!body.email || !body.name || !body.pass) {
      throw new BadRequestException('Name, email, and password are required');
    }
    const existing = await this.db.findUserByEmail(body.email);
    if (existing) {
      throw new BadRequestException('An account with this email address already exists');
    }
    const roleLabels: Record<string, string> = {
      field_officer: 'Field Officer',
      monitoring_officer: 'Monitoring Officer',
      partner_officer: 'Partner Officer',
      finance_officer: 'Finance Officer',
      programme_manager: 'Programme Manager',
      donor_viewer: 'Donor / Stakeholder Viewer',
    };
    const chosenRole = body.role || 'field_officer';
    const newUser = await this.db.createUser({
      name: body.name,
      email: body.email,
      password: body.pass,
      role: chosenRole,
      roleLabel: roleLabels[chosenRole] || 'Field Officer',
      organization: body.organization || 'Programme Partner',
      region: body.region || 'Addis Ababa',
    });
    return {
      success: true,
      message: 'Account successfully registered',
      user: newUser,
    };
  }

  @Get('users')
  @ApiOperation({ summary: 'Get all configured users' })
  getUsers() {
    return this.db.getUsers();
  }
}
