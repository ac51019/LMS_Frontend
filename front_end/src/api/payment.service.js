import api from "./api";

async function createPaymentIntent(courseId, amount, currency = "INR") {
    try {
        const { data } = await api.post("/api/payment/create-payment-intent", {
            courseId,
            amount: parseInt(amount * 100), // convert to cents / paise
            currency
        });
        return { success: true, clientSecret: data.clientSecret };
    } catch (error) {
        console.error("Error creating payment intent:", error);
        return { success: false, error: "Payment initiation failed" };
    }
}

export const paymentService = {
    createPaymentIntent
};
