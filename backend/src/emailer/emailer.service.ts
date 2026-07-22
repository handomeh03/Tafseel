import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { HTMLGenerator } from 'src/utils/HTMLGenerator';

type EmailStoreRequestType = 'ApproveStoreRequest' | 'RejectStoreRequest';

@Injectable()
export class EmailerService {
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
    try {
      const mailUser = process.env.MAIL_USER;

      await this.transporter.sendMail({
        from: `Tafseel <${mailUser}>`,
        to: email,
        subject: subject,
        html: HTMLGenerator[type](email, password),
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to send store request notification email',
      );
    }
  }
}