export interface PaymentGateway {
    createPayment(input: PaymentInput): Promise<PaymentOutput>;
}

export interface PaymentInput {
    amount: number;
    currency: string;
    customerEmail: string;
}

export interface PaymentOutput {
    id: string;
    status: "approved" | "failed";
    clientSecret?: string;
}