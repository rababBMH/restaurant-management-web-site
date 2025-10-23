import { Controller, Post, Body, Delete,Request, UseGuards, } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LogInDto, ResetPasswordDto } from './dto/create-auth.dto';
import { SignUpDto } from './dto/create-auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('auth') 
@Controller('auth')
///SIGN UP
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signUp')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: SignUpDto })
  @ApiResponse({ status: 201, description: 'User successfully registered' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  create(@Body() signUpDto: SignUpDto) {
    return this.authService.signup(signUpDto);
  }

  // LOG IN
  @UseGuards(AuthGuard('local'))
  @Post('logIn')
  @ApiOperation({ summary: 'Login and receive a JWT token' })
  @ApiBody({ type: LogInDto })
  @ApiResponse({ status: 200, description: 'Login successful, returns JWT' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  findAll(@Body() logInDto: LogInDto) {
    return this.authService.logIn(logInDto);
  }

  // DELETE ACCOUNT (JWT protected)
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth() 
  @Delete('delete')
  @ApiOperation({ summary: 'Delete user account (requires JWT)' })
  @ApiResponse({ status: 200, description: 'Account deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  deleteAccount(@Request() req): any {
    return this.authService.deleteaccount(req.user.email);
  }

  // 🟠 FORGOT PASSWORD
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Post('forgot-password')
  @ApiOperation({ summary: 'Request a password reset link (JWT protected)' })
  @ApiBody({ schema: { example: { email: 'user@example.com' } } })
  @ApiResponse({ status: 200, description: 'Reset link sent to email' })
  @ApiResponse({ status: 404, description: 'Email not found' })
  async forgotPassword(@Body('email') email: string) {
    return this.authService.forgotPassword(email);
  }

  // 🟡 RESET PASSWORD
  @Post('reset-password')
  @ApiOperation({ summary: 'Reset password using the received token' })
  @ApiBody({ type: ResetPasswordDto })
  @ApiResponse({ status: 200, description: 'Password reset successfully' })
  @ApiResponse({ status: 400, description: 'Invalid or expired token' })
  resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto);
  }
}
