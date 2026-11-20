"use client";
import { useState } from "react";
import { CreditCard, Smartphone, Building2, Mail, Shield, X } from "lucide-react";
import toast from "react-hot-toast";

type Method = "ESCROW" | "CARD" | "JAZZCASH" | "EASYPAISA" | "BANK" | "PAYPAL";

export function PaymentModal({
  method,
  amount,
  onClose,
  onSuccess,
}: {
  method: Method;
  amount: number;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    // Simulate real payment processing
    await new Promise(r => setTimeout(r, 1500));
    toast.success("Payment successful!");
    setLoading(false);
    onSuccess();
  }

  const titles: Record<Method, string> = {
    ESCROW: "Escrow Payment",
    CARD: "Card Payment",
    JAZZCASH: "JazzCash Payment",
    EASYPAISA: "Easypaisa Payment",
    BANK: "Bank Transfer",
    PAYPAL: "PayPal Payment",
  };

  const icons: Record<Method, any> = {
    ESCROW: Shield,
    CARD: CreditCard,
    JAZZCASH: Smartphone,
    EASYPAISA: Smartphone,
    BANK: Building2,
    PAYPAL: Mail,
  };

  const Icon = icons[method];

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-antique-900 rounded-2xl max-w-md w-full p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-antique-500 hover:text-antique-900 dark:text-antique-300">
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-antique-700 to-gold-500 rounded-full flex items-center justify-center mx-auto mb-3">
            <Icon className="w-8 h-8 text-white" />
          </div>
          <h2 className="font-serif text-2xl font-bold">{titles[method]}</h2>
          <p className="text-3xl font-bold text-antique-900 dark:text-gold-400 mt-2">PKR {amount.toLocaleString()}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {method === "ESCROW" && (
            <p className="text-sm text-center text-antique-600 dark:text-antique-300">
              Funds will be held securely by Antique Bazaar until you confirm delivery.
            </p>
          )}

          {method === "CARD" && (
            <>
              <input name="cardNumber" placeholder="Card Number (16 digits)" className="input-field" required maxLength={16} pattern="\d{16}" />
              <input name="cardName" placeholder="Cardholder Name" className="input-field" required />
              <div className="grid grid-cols-2 gap-3">
                <input name="expiry" placeholder="MM/YY" className="input-field" required pattern="\d{2}/\d{2}" />
                <input name="cvv" placeholder="CVV" className="input-field" required maxLength={3} pattern="\d{3}" />
              </div>
            </>
          )}

          {method === "JAZZCASH" && (
            <>
              <input name="mobile" placeholder="JazzCash Mobile (03001234567)" className="input-field" required maxLength={11} pattern="03\d{9}" />
              <input name="pin" type="password" placeholder="MPIN (4 digits)" className="input-field" required maxLength={4} pattern="\d{4}" />
            </>
          )}

          {method === "EASYPAISA" && (
            <>
              <input name="mobile" placeholder="Easypaisa Mobile (03001234567)" className="input-field" required maxLength={11} pattern="03\d{9}" />
              <input name="pin" type="password" placeholder="MPIN (4 digits)" className="input-field" required maxLength={4} pattern="\d{4}" />
            </>
          )}

          {method === "BANK" && (
            <>
              <input name="bankName" placeholder="Bank Name (e.g., HBL)" className="input-field" required />
              <input name="accountNumber" placeholder="Account / IBAN" className="input-field" required />
              <p className="text-xs text-antique-500 dark:text-antique-300">You will receive transfer instructions after placing the order.</p>
            </>
          )}

          {method === "PAYPAL" && (
            <input name="email" type="email" placeholder="PayPal Email" className="input-field" required />
          )}

          <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
            {loading ? "Processing..." : `Pay PKR ${amount.toLocaleString()}`}
          </button>
        </form>

        <p className="text-xs text-center text-antique-500 dark:text-antique-300 mt-4">
          🔒 Your payment is secure and encrypted
        </p>
      </div>
    </div>
  );
}