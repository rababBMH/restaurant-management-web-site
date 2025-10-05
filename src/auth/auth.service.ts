import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LogInDto, ResetPasswordDto, SignUpDto } from './dto/create-auth.dto';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../mail/mail.service';


const prisma = new PrismaClient();

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly mailService: MailService, // ✅ MailService injected
  ) {}

  //// user registration
  async signup(SignUpDto: SignUpDto) {
    const { restaurant_name, email, password } = SignUpDto;
    const existingUser = await prisma.restaurant.findUnique({ where: { email } });

    if (existingUser) {
      throw new UnauthorizedException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.restaurant.create({
      data: { restaurant_name, email, password: hashedPassword },
    });

    // generate token
    const token = this.jwtService.sign({ sub: user.restaurant_id, email: user.email });

  }

  
  //// user login
  async logIn(LogInDto: LogInDto) {
    const { email, password } = LogInDto;
    const user = await this.validateUser(email, password);

    if (user) {
      const token = this.jwtService.sign({
        sub: user.restaurant_id,
        email: user.email,
      });

      return {
        message: 'Login successful',
        access_token: token,
        user,
      };
    } else {
      throw new NotFoundException('User not found');
    }
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await prisma.restaurant.findUnique({ where: { email } });
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  ///// delete account
  async deleteaccount(email: string) {
    const user = await prisma.restaurant.findUnique({ where: { email } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await prisma.restaurant.delete({ where: { email } });
    return { message: 'Account deleted successfully' };
  }

  /// forgot password
  async forgotPassword(email: string) {
    const user = await prisma.restaurant.findUnique({ where: { email } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // generate OTP (6 digits) and expiry (10 minutes)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 70 * 60 * 1000);

    // save OTP in DB
   await prisma.otp.create({
    data: { email, code: otp, expiredAt: expiry },
  });


    // send OTP email
    await this.mailService.sendMail(
      email,
      'Password Reset OTP',
      `<p>Your OTP is: <b>${otp}</b>. It will expire in 10 minutes.</p>`,
    );

    return { message: 'OTP sent to your email' };
  }

  /// reset password
  async resetPassword(ResetPasswordDto: ResetPasswordDto) {
    const { email, otp, newPassword } = ResetPasswordDto;

    const sentOtp = await prisma.otp.findFirst({
      where: { email },
      orderBy: { expiredAt: 'desc' },
    });

    if (!sentOtp ){
      throw new NotFoundException("no otp sent")
    }
    if(sentOtp.code != otp)  {
      throw new UnauthorizedException("otp not correct")
    }
    if(sentOtp.expiredAt < new Date())
       {
      throw new UnauthorizedException('expired OTP');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.restaurant.update({
      where: { email },
      data: { password: hashedPassword },
    });

    await prisma.otp.delete({ where: { id: sentOtp.id } });

    return { message: 'Password reset successfully' };
  }
}
