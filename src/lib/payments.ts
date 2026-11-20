export const PAYMENT_METHODS = {
  ESCROW: {
    label: "Escrow (Recommended)",
    desc: "Funds held safely until you confirm delivery",
    requiresDetails: false,
    color: "green",
  },
  CARD: {
    label: "Credit / Debit Card",
    desc: "Visa, Mastercard, Amex",
    requiresDetails: true,
    fields: ["cardNumber", "cardName", "expiry", "cvv"],
    color: "blue",
  },
  JAZZCASH: {
    label: "JazzCash",
    desc: "Mobile wallet",
    requiresDetails: true,
    fields: ["mobile", "pin"],
    color: "red",
  },
  EASYPAISA: {
    label: "Easypaisa",
    desc: "Mobile wallet",
    requiresDetails: true,
    fields: ["mobile", "pin"],
    color: "green",
  },
  BANK: {
    label: "Bank Transfer (Raast)",
    desc: "Direct bank transfer",
    requiresDetails: true,
    fields: ["bankName", "accountNumber"],
    color: "gray",
  },
  PAYPAL: {
    label: "PayPal",
    desc: "International payment",
    requiresDetails: true,
    fields: ["email"],
    color: "indigo",
  },
};

export function validateMobile(mobile: string): { valid: boolean; message?: string } {
  const cleaned = mobile.replace(/[\s-]/g, "");
  if (!/^03\d{9}$/.test(cleaned)) {
    return { valid: false, message: "Mobile must be 11 digits starting with 03 (e.g., 03001234567)" };
  }
  const prefix = cleaned.substring(0, 4);
  const validPrefixes = ["0300", "0301", "0302", "0303", "0304", "0305", "0306", "0307", "0308", "0309", "0310", "0311", "0312", "0313", "0314", "0315", "0316", "0317", "0318", "0319", "0320", "0321", "0322", "0323", "0324", "0325", "0330", "0331", "0332", "0333", "0334", "0335", "0336", "0337", "0338", "0339", "0340", "0341", "0342", "0343", "0344", "0345", "0346", "0347", "0348", "0349"];
  if (!validPrefixes.includes(prefix)) {
    return { valid: false, message: "Invalid mobile prefix. Use 03XX format" };
  }
  return { valid: true };
}