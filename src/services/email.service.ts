// filepath: /e:/Angular/fake-api-backend/src/services/email.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password'
      }
    });
  }

  async sendEmail(to: string, subject: string, text: string, pdfBuffer: Buffer) {
    const mailOptions = {
      from: 'your-email@gmail.com',
      to: to,
      subject: subject,
      text: text,
      attachments: [
        {
          filename: 'receipt.pdf',
          content: pdfBuffer
        }
      ]
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}