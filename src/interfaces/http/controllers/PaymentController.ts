import { Request, Response } from "express";
import { PaymentService } from "../../../application/services/PaymentService";

export class PaymentController {
    constructor(private paymentService: PaymentService) {}

    async handle(req: Request, res: Response) {
        const { amount, currency, customerEmail} = req.body;

        const result = await this.paymentService.execute({
            amount,
            currency,
            customerEmail
        });

        return res.json(result);
    }
}