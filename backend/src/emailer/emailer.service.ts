import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { HTMLGenerator } from 'src/utils/HTMLGenerator';

type EmailStoreRequestType = 'ApproveStoreRequest' | 'RejectStoreRequest';

@Injectable()
export class EmailerService {
  private readonly logger = new Logger(EmailerService.name);

  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  async SendEmailOfStoreRequest(
    subject: string,
    email: string,
    type: EmailStoreRequestType,
    password?: string,
  ) {
    const mailUser = process.env.MAIL_USER;

    if (!mailUser || !process.env.MAIL_PASS) {
      this.logger.error('MAIL_USER or MAIL_PASS is missing in environment variables.');
      throw new InternalServerErrorException('Email configuration error');
    }

    try {
      await this.transporter.sendMail({
        from: `Tafseel <${mailUser}>`,
        to: email,
        subject: subject,
        html: HTMLGenerator[type](email, password),
      })
      this.logger.log(`Email successfully sent to ${email}`);
    } catch (error: any) {
  
      this.logger.error(`Failed to send email to ${email}. Error details:`, error);

      throw new InternalServerErrorException('Failed to send store request notification email');
    }
  }
}