import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { StripePaymentGateway } from "./infrastructure/gateways/StripePaymentGateway";
import { PaymentService } from "./application/services/PaymentService";
import { eventEmitter } from "./infrastructure/events/eventEmitter";
import { PaymentController } from "./interfaces/http/controllers/PaymentController";
import "./infrastructure/email/PaymentApprovedListener";

const app = express();
app.use(express.json());
console.log("ENV:", process.env.STRIPE_SECRET_KEY);
const gateway = new StripePaymentGateway(process.env.STRIPE_SECRET_KEY as string);
const paymentService = new PaymentService(gateway, eventEmitter);
const controller = new PaymentController(paymentService);

app.post("/payments", (req, res) => controller.handle(req, res));

app.listen(3333, () => {
  console.log("🚀 Server running on port 3333");
});