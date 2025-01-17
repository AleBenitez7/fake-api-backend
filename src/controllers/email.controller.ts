// filepath: /e:/Angular/fake-api-backend/src/controllers/email.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from '@services/email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send-receipt')
  async sendReceipt(@Body() body: { email: string; pdfBuffer: string }) {
    const { email, pdfBuffer } = body;
    const buffer = Buffer.from(pdfBuffer, 'base64');
    await this.emailService.sendEmail(email, 'Your Receipt', 'Please find attached your receipt.', buffer);
    return { message: 'Email sent successfully' };
  }
}