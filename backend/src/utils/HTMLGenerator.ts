export const HTMLGenerator = {
  ApproveStoreRequest: (email: string, password?: string) => {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Store Request Approved</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f6f9; margin: 0; padding: 0; color: #333333; }
          .container { max-width: 600px; margin: 30px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05); }
          .header { background-color: #1e293b; color: #ffffff; padding: 24px; text-align: center; }
          .header h1 { margin: 0; font-size: 24px; font-weight: bold; }
          .content { padding: 30px 24px; line-height: 1.7; }
          .greeting { font-size: 18px; font-weight: 600; color: #0f172a; margin-bottom: 12px; }
          .credentials-box { background-color: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #2563eb; border-radius: 8px; padding: 20px; margin: 24px 0; }
          .credential-item { margin-bottom: 10px; font-size: 15px; }
          .code-block { font-family: 'Courier New', Courier, monospace; background-color: #e2e8f0; padding: 4px 10px; border-radius: 4px; font-weight: bold; color: #1e293b; letter-spacing: 1px; }
          .footer { background-color: #f8fafc; padding: 16px 24px; text-align: center; font-size: 13px; color: #64748b; border-top: 1px solid #e2e8f0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Tafseel Platform</h1>
          </div>
          <div class="content">
            <div class="greeting">Welcome Aboard! 🎉</div>
            <p>We are excited to inform you that your request to join <strong>Tafseel</strong> has been approved.</p>
            <p>You can now log in to your Store Owner Dashboard using the following temporary credentials:</p>
            
            <div class="credentials-box">
              <div class="credential-item">
                <strong>Email:</strong> <span>${email}</span>
              </div>
              ${
                password
                  ? `
              <div class="credential-item" style="margin-top: 12px;">
                <strong>Temporary Password:</strong> <span class="code-block">${password}</span>
              </div>
              `
                  : ''
              }
            </div>

            <p style="color: #ef4444; font-size: 14px;">
              ⚠️ <strong>Security Notice:</strong> Please make sure to change your temporary password immediately upon your first login.
            </p>
          </div>
          <div class="footer">
            All rights reserved © ${new Date().getFullYear()} Tafseel Platform.
          </div>
        </div>
      </body>
      </html>
    `;
  },

  RejectStoreRequest: (email: string) => {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Store Request Update</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f6f9; margin: 0; padding: 0; color: #333333; }
          .container { max-width: 600px; margin: 30px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05); }
          .header { background-color: #1e293b; color: #ffffff; padding: 24px; text-align: center; }
          .header h1 { margin: 0; font-size: 24px; font-weight: bold; }
          .content { padding: 30px 24px; line-height: 1.7; }
          .greeting { font-size: 18px; font-weight: 600; color: #0f172a; margin-bottom: 12px; }
          .footer { background-color: #f8fafc; padding: 16px 24px; text-align: center; font-size: 13px; color: #64748b; border-top: 1px solid #e2e8f0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Tafseel Platform</h1>
          </div>
          <div class="content">
            <div class="greeting">Hello,</div>
            <p>Thank you for your interest in joining <strong>Tafseel</strong> platform.</p>
            <p>After reviewing the details provided for your store application associated with (<strong>${email}</strong>), we regret to inform you that your request has not been approved at this time.</p>
            <p style="margin-top: 20px; font-size: 14px; color: #475569;">
              If you have any questions or wish to update your information and re-apply, feel free to contact our support team.
            </p>
          </div>
          <div class="footer">
            All rights reserved © ${new Date().getFullYear()} Tafseel Platform.
          </div>
        </div>
      </body>
      </html>
    `;
  },
};