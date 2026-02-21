import Stripe from "stripe";
import {
  PaymentGateway,
  PaymentInput,
  PaymentOutput,
} from "../../domain/interfaces/PaymentGateway";

export class StripePaymentGateway implements PaymentGateway {
  private stripe: Stripe;

  constructor(secretKey: string) {
    this.stripe = new Stripe(secretKey);
  }
  

  async createPayment(input: PaymentInput): Promise<PaymentOutput> {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: input.amount * 100,
      currency: input.currency,
      automatic_payment_methods: { enabled: true },
      metadata: {
        customerEmail: input.customerEmail,
      },
    });

    return {
      id: paymentIntent.id,
      status:
        paymentIntent.status === "succeeded"
          ? "approved"
          : "failed",
      clientSecret: paymentIntent.client_secret!,
    };
  }
}