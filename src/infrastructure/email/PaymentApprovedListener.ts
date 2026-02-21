import { eventEmitter } from "../events/eventEmitter";

eventEmitter.on("payment.approved", async (data: any) => {
    console.log("Enviado email para:", data.email);
    console.log(`Pagamento ${data.paymentID} confirmado!`);
})