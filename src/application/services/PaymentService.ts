import { PaymentGateway, PaymentInput } from "../../domain/interfaces/PaymentGateway";
import { EventEmitter } from "events";

export class PaymentService {
    constructor(
        private gateway: PaymentGateway,
        private eventEmitter: EventEmitter
    ) {}

    
    async execute(input: PaymentInput) {
        const payment = await this.gateway.createPayment(input);

        if (payment.status === "approved") {
            this.eventEmitter.emit("payment.approved", {
                paymentID: payment.id,
                email: input.customerEmail,
                amount: input.amount
            })
        }

        return payment;
    }

}