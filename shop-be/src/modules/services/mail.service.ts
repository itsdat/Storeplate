import { Injectable } from "@nestjs/common";
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendVerifyEmail(to: string, token: string) {
    const verifyUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

    await this.transporter.sendMail({
      from: `"Storeplate" <${process.env.SMTP_USER}>`,
      to,
      subject: 'Verify your account',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 60px 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; max-width: 600px;">
                  
                  <!-- Logo/Header -->
                  <tr>
                    <td style="padding: 50px 40px 40px 40px; text-align: center; border-bottom: 1px solid #e5e5e5;">
                      <h1 style="margin: 0; color: #000000; font-size: 24px; font-weight: 600; letter-spacing: -0.5px;">
                        Storeplate
                      </h1>
                    </td>
                  </tr>
                  
                  <!-- Main Content -->
                  <tr>
                    <td style="padding: 50px 40px;">
                      <h2 style="margin: 0 0 24px 0; color: #000000; font-size: 20px; font-weight: 500; line-height: 1.4;">
                        Verify your email address
                      </h2>
                      
                      <p style="margin: 0 0 32px 0; color: #666666; font-size: 15px; line-height: 1.6;">
                        Thank you for signing up with Storeplate. To complete your registration, please click the button below to verify your email address.
                      </p>
                      
                      <!-- Button -->
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td align="center" style="padding: 0 0 32px 0;">
                            <a href="${verifyUrl}" style="display: inline-block; background-color: #000000; color: #ffffff; text-decoration: none; padding: 14px 32px; font-size: 14px; font-weight: 500; letter-spacing: 0.3px; text-transform: uppercase;">
                              Verify Email
                            </a>
                          </td>
                        </tr>
                      </table>
                      
                      <p style="margin: 0 0 8px 0; color: #999999; font-size: 13px; line-height: 1.5;">
                        Or copy and paste this link into your browser:
                      </p>
                      <p style="margin: 0 0 32px 0; color: #666666; font-size: 13px; word-break: break-all; line-height: 1.5;">
                        ${verifyUrl}
                      </p>
                      
                      <!-- Notice -->
                      <div style="border-left: 2px solid #000000; padding: 16px 20px; margin: 32px 0; background-color: #fafafa;">
                        <p style="margin: 0; color: #666666; font-size: 13px; line-height: 1.5;">
                          This link will expire in 15 minutes.
                        </p>
                      </div>
                      
                      <p style="margin: 0; color: #999999; font-size: 13px; line-height: 1.5;">
                        If you didn't create this account, please ignore this email.
                      </p>
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td style="padding: 40px; text-align: center; border-top: 1px solid #e5e5e5;">
                      <p style="margin: 0 0 8px 0; color: #999999; font-size: 12px; line-height: 1.5;">
                        © ${new Date().getFullYear()} Storeplate. All rights reserved.
                      </p>
                      <p style="margin: 0; color: #cccccc; font-size: 11px;">
                        This is an automated email, please do not reply.
                      </p>
                    </td>
                  </tr>
                  
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });
  }
}