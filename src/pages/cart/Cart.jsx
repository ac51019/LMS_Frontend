import React, { useState } from "react";
import Navbar from "../../Components/common/Navbar";
import Footer from "../../Components/common/Footer";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { paymentService } from "../../api/payment.service";
import { learningService } from "../../api/learning.service";
import { StripeCheckoutModal } from "../../Components/common/StripeCheckout";
import { message } from "antd";
import { formatCurrency } from "../../utils/currency";


function Cart() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cartItems, cartTotal } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth);

    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [clientSecret, setClientSecret] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);

    // Default to mock numbers if course.price is missing in the database
    const calculateTotal = () => {
        return cartItems.reduce((acc, course) => acc + (course.price || 999), 0);
    };

    const handleCheckout = async () => {
        if (cartTotal === 0) return;
        setIsProcessing(true);
        try {
            const amountToCharge = calculateTotal();
            const paymentRes = await paymentService.createPaymentIntent(1, amountToCharge, "INR");

            if (paymentRes.success) {
                setClientSecret(paymentRes.clientSecret);
                setIsCheckoutOpen(true);
            } else {
                message.error("Failed to initialize secure checkout.");
            }
        } catch (error) {
            message.error("An error occurred during checkout initialization.");
        } finally {
            setIsProcessing(false);
        }
    };

    const finalizeBulkEnrollment = async () => {
        setIsCheckoutOpen(false);
        try {
            // Bulk enroll all cart items
            const enrollPromises = cartItems.map((course) =>
                learningService.enrollCourse(user.id, course.course_id)
            );
            await Promise.all(enrollPromises);

            message.success("Payment successful! Courses have been added to your Learning Dashboard.");
            dispatch(clearCart());
            navigate("/learnings");
        } catch (error) {
            message.error("Error adding courses to your dashboard. Please contact support.");
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors">
            <Navbar page="cart" />
            <div className="flex-grow max-w-7xl mx-auto w-full px-4 py-8 mt-20">
                <div className="flex items-center gap-3 mb-8">
                    <ShoppingBag className="w-8 h-8 text-blue-600" />
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Your Cart</h1>
                </div>

                {cartTotal === 0 ? (
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-16 text-center text-gray-500 dark:text-gray-400 flex flex-col items-center">
                        <ShoppingBag className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
                        <h2 className="text-xl font-bold mb-2">Your cart is currently empty</h2>
                        <p className="mb-6">Before proceeding to checkout you must add some courses to your shopping cart.</p>
                        <button
                            onClick={() => navigate('/courses')}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center gap-2"
                        >
                            Return To Shop
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Cart Items List */}
                        <div className="lg:w-2/3 space-y-4">
                            {cartItems.map((course) => (
                                <div key={course.course_id} className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 transition-all hover:shadow-md">
                                    <img
                                        src={course.p_link || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&q=80"}
                                        alt={course.course_name}
                                        className="w-32 h-24 object-cover rounded-xl"
                                    />
                                    <div className="ml-6 flex-grow">
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1">{course.course_name}</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">By {course.instructor}</p>
                                        <div className="text-blue-600 dark:text-blue-400 font-bold">
                                            {formatCurrency(course.price || 999)}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => dispatch(removeFromCart({ course_id: course.course_id }))}
                                        className="p-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors group"
                                        title="Remove from Cart"
                                    >
                                        <Trash2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary Checkout Panel */}
                        <div className="lg:w-1/3">
                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 sticky top-28">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">Order Summary</h3>

                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between text-gray-600 dark:text-gray-400 text-sm">
                                        <span>Items ({cartTotal})</span>
                                        <span>{formatCurrency(calculateTotal())}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600 dark:text-gray-400 text-sm">
                                        <span>Platform Tax (GST)</span>
                                        <span className="text-green-500 font-medium">Free</span>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center border-t border-gray-100 dark:border-gray-700 pt-4 mb-8">
                                    <span className="text-lg font-bold text-gray-900 dark:text-white">Order Total</span>
                                    <span className="text-2xl font-black text-blue-600 dark:text-blue-400">{formatCurrency(calculateTotal())}</span>
                                </div>

                                <button
                                    onClick={handleCheckout}
                                    disabled={isProcessing}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-md hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isProcessing ? "Processing..." : "Secure Checkout"}
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                                <p className="text-xs text-center text-gray-400 mt-4 leading-relaxed">
                                    By proceeding to payment, you agree to Zenlithic Technologies' Terms of Service and End User License.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Footer />

            <StripeCheckoutModal
                isOpen={isCheckoutOpen}
                clientSecret={clientSecret}
                onPaymentSuccess={finalizeBulkEnrollment}
                onPaymentCancel={() => setIsCheckoutOpen(false)}
            />
        </div>
    );
}

export default Cart;
