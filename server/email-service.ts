import nodemailer from 'nodemailer';

interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

class EmailService {
  private transporter: nodemailer.Transporter | null = null;
  private isConfigured = false;

  constructor() {
    this.initialize();
  }

  private initialize() {
    // Use environment variables for email configuration
    const emailHost = process.env.EMAIL_HOST;
    const emailPort = process.env.EMAIL_PORT;
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;

    if (emailHost && emailPort && emailUser && emailPass) {
      const config: EmailConfig = {
        host: emailHost,
        port: parseInt(emailPort),
        secure: parseInt(emailPort) === 465, // Use SSL for port 465
        auth: {
          user: emailUser,
          pass: emailPass
        }
      };

      this.transporter = nodemailer.createTransporter(config);
      this.isConfigured = true;
      console.log('📧 Email service configured successfully');
    } else {
      console.log('⚠️ Email service not configured - missing environment variables');
      console.log('   Required: EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS');
    }
  }

  async sendEmail(to: string, subject: string, text: string, html?: string): Promise<boolean> {
    if (!this.isConfigured || !this.transporter) {
      console.log('❌ Email service not configured - cannot send email');
      return false;
    }

    try {
      const mailOptions = {
        from: `"KushKlicker Support" <support@kushklicker.com>`,
        to,
        subject,
        text,
        html: html || `<p>${text}</p>`,
        replyTo: 'support@kushklicker.com'
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log(`📧 Email sent successfully to ${to}: ${result.messageId}`);
      return true;
    } catch (error) {
      console.error('❌ Failed to send email:', error);
      return false;
    }
  }

  async sendNotification(
    to: string, 
    title: string, 
    message: string, 
    gameUrl: string = 'https://kushklicker.com'
  ): Promise<boolean> {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1f2937; color: white; border-radius: 8px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #10b981, #059669); padding: 20px; text-align: center;">
          <h1 style="margin: 0; color: white; font-size: 24px;">🌿 KushKlicker</h1>
        </div>
        <div style="padding: 20px;">
          <h2 style="color: #10b981; margin: 0 0 15px 0;">${title}</h2>
          <p style="color: #e5e7eb; line-height: 1.6; margin: 0 0 20px 0;">${message}</p>
          <div style="text-align: center;">
            <a href="${gameUrl}" style="display: inline-block; background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
              🎮 Play KushKlicker
            </a>
          </div>
        </div>
        <div style="background: #374151; padding: 15px; text-align: center; color: #9ca3af; font-size: 12px;">
          <p style="margin: 0 0 8px 0;">You received this because you're part of the KushKlicker community.</p>
          <p style="margin: 0;">Need help? Contact us: <a href="mailto:support@kushklicker.com" style="color: #10b981;">support@kushklicker.com</a></p>
        </div>
      </div>
    `;

    return await this.sendEmail(to, title, message, html);
  }

  isReady(): boolean {
    return this.isConfigured;
  }
}

// Export singleton instance
export const emailService = new EmailService();