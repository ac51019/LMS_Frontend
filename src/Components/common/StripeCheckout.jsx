import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
    Elements,
    CardElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import { message } from "antd";

// Use environment variable exclusively
const stripePromise = loadStripe(
    process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
);

const CheckoutForm = ({ clientSecret, onPaymentSuccess, onPaymentCancel }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        setIsProcessing(true);

        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
            }
        });

        if (error) {
            console.error("[Stripe error]", error);
            message.error(error.message || "Payment Failed!");
            setIsProcessing(false);
        } else if (paymentIntent && paymentIntent.status === "succeeded") {
            message.success("Payment Successful!");
            onPaymentSuccess();
        }
    };

    return (
        <div className="bg-white p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Secure Checkout</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 hover:bg-white hover:border-indigo-300 transition shadow-sm">
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: "16px",
                                    color: "#424770",
                                    "::placeholder": {
                                        color: "#aab7c4",
                                    },
                                },
                                invalid: {
                                    color: "#9e2146",
                                },
                            },
                        }}
                    />
                </div>
                <div className="flex gap-4">
                    <button
                        type="button"
                        onClick={onPaymentCancel}
                        className="flex-1 py-3 text-gray-600 font-semibold border border-gray-300 rounded-xl hover:bg-gray-50 transition"
                        disabled={isProcessing}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={!stripe || isProcessing}
                        className={`flex-1 py-3 text-white font-bold rounded-xl shadow-lg transition transform ${isProcessing
                            ? "bg-indigo-300 cursor-not-allowed"
                            : "bg-indigo-600 hover:bg-indigo-700 hover:-translate-y-1 hover:shadow-xl"
                            }`}
                    >
                        {isProcessing ? "Processing..." : "Pay Now"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export const StripeCheckoutModal = ({
    clientSecret,
    isOpen,
    onPaymentSuccess,
    onPaymentCancel
}) => {
    if (!isOpen || !clientSecret) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="w-full max-w-lg shadow-2xl rounded-2xl animate-fadeIn">
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckoutForm
                        clientSecret={clientSecret}
                        onPaymentSuccess={onPaymentSuccess}
                        onPaymentCancel={onPaymentCancel}
                    />
                </Elements>
            </div>
        </div>
    );
};
