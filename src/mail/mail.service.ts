import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail', 
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
      },
    });
  }

  async sendMail(to: string, subject: string, html: string) {
    return await this.transporter.sendMail({
      from: `"My restaurant" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
  }
}
