import nodemailer from "nodemailer";
import { EmailService } from "../../domain/interfaces/EmailService";

export class NodemailerEmailService implements EmailService {
    private transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
    });

    async send(to: string, subject: string, body: string): Promise<void> {
        await this.transporter.sendMail({
            from:  '"Gateway Pagamentos" <no-reply@gateway.com>',
            to,
            subject,
            text: body,
        });
    }
}