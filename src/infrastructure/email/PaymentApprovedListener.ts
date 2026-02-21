import { EventEmitter } from "events";
import { EmailService } from "../../domain/interfaces/EmailService";

export class PaymentApprovedListener {
    constructor(
        private eventEmitter: EventEmitter,
        private emailService: EmailService
    ) {
        this.eventEmitter.on("payment.approved", async (data) => {
            await this.emailService.send(
                data.customerEmail,
                "Pagamento aprovado!",
                `Seu pagamento de R$ ${data.amount} foi aprovado.`
            );
        });
    }
}