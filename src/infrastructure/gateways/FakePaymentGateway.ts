import { PaymentGateway, PaymentInput, PaymentOutput } from "../../domain/interfaces/PaymentGateway";

export class FakePaymentGateway implements PaymentGateway {
    async createPayment(input: PaymentInput): Promise<PaymentOutput> {
        console.log("Simulando pagamento...");

        return {
            id: "pay_" + Math.random().toString(36).substring(2),
            status: "approved"
        };
    }
}