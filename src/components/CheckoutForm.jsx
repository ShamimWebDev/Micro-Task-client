import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import { axiosSecure } from "../hooks/useAxios";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CreditCard, CheckCircle2, Loader, AlertCircle } from "lucide-react";

const CheckoutForm = ({ selectedPackage, onClose }) => {
  const { user } = useContext(AuthContext);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [transactionId, setTransactionId] = useState("");

  useEffect(() => {
    if (selectedPackage?.price) {
      axiosSecure
        .post("/create-payment-intent", { price: selectedPackage.price })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        })
        .catch((err) => {
          console.error("Payment Intent Error:", err);
          setError("Failed to initialize payment. Please try again.");
        });
    }
  }, [selectedPackage]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    setProcessing(true);
    setError("");

    const { error: paymentMethodError } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (paymentMethodError) {
      setError(paymentMethodError.message);
      setProcessing(false);
      return;
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      setError(confirmError.message);
      setProcessing(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      setTransactionId(paymentIntent.id);

      // Save payment to database
      const paymentInfo = {
        email: user?.email,
        coins: selectedPackage.coins,
        price: selectedPackage.price,
        date: new Date().toISOString(),
        transactionId: paymentIntent.id,
        status: "succeeded",
      };

      try {
        await axiosSecure.post("/payments", paymentInfo);
        setSuccess(true);
        setTimeout(() => {
          // Use window.location to force full page refresh and update coin balance
          window.location.href = "/dashboard/payment-history";
        }, 2000);
      } catch (err) {
        console.error("Save Payment Error:", err);
        setError(
          "Payment succeeded but failed to save. Please contact support."
        );
      }
    }

    setProcessing(false);
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#e2e8f0",
        fontFamily: "'Inter', sans-serif",
        "::placeholder": {
          color: "#64748b",
        },
        iconColor: "#a5b4fc",
      },
      invalid: {
        color: "#f87171",
        iconColor: "#f87171",
      },
    },
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle2 className="text-emerald-400" size={40} />
        </motion.div>
        <h3 className="text-2xl font-bold text-white mb-2">
          Payment Successful!
        </h3>
        <p className="text-slate-400 mb-4">
          {selectedPackage.coins} coins have been added to your account.
        </p>
        <p className="text-sm text-slate-500">
          Transaction ID:{" "}
          <span className="text-indigo-400">{transactionId}</span>
        </p>
        <p className="text-sm text-slate-500 mt-2">
          Redirecting to payment history...
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Package Summary */}
      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400">Package</p>
            <p className="text-lg font-bold text-white">
              {selectedPackage.label}
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-black text-indigo-400">
              {selectedPackage.coins}
            </p>
            <p className="text-sm text-slate-400">coins</p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-slate-700/50 flex items-center justify-between">
          <span className="text-slate-400">Total Amount</span>
          <span className="text-2xl font-black text-emerald-400">
            ${selectedPackage.price}
          </span>
        </div>
      </div>

      {/* Card Input */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
          <CreditCard size={16} className="text-indigo-400" />
          Card Details
        </label>
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 focus-within:border-indigo-500/50 transition-colors">
          <CardElement options={cardElementOptions} />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg p-3"
        >
          <AlertCircle size={18} />
          <span className="text-sm">{error}</span>
        </motion.div>
      )}

      {/* Test Card Info */}
      <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4">
        <p className="text-sm text-indigo-300 font-medium mb-2">
          Test Card Details:
        </p>
        <p className="text-xs text-slate-400">Card: 4242 4242 4242 4242</p>
        <p className="text-xs text-slate-400">
          Expiry: Any future date | CVC: Any 3 digits
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 py-3 px-6 rounded-xl font-semibold text-slate-300 bg-slate-800/50 border border-slate-700/50 hover:bg-slate-700/50 transition-all"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!stripe || !clientSecret || processing}
          className="flex-1 py-3 px-6 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
        >
          {processing ? (
            <>
              <Loader className="animate-spin" size={18} />
              Processing...
            </>
          ) : (
            <>Pay ${selectedPackage.price}</>
          )}
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
