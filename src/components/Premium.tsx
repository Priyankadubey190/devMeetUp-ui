import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { BASE_URL } from "../utils/constants";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface IPaymentOrder {
  amount: number;
  keyId: string;
  currency: string;
  orderId: string;
  notes: {
    firstName: string;
    lastName: string;
    emailId: string;
  };
}

type MembershipType = "silver" | "gold";

const Premium: React.FC = () => {
  const [isUserPremium, setIsUserPremium] = useState<boolean>(false);

  const verifyPremiumUser = async (): Promise<void> => {
    try {
      const res = await axios.get<{ isPremium: boolean }>(
        `${BASE_URL}/premium/verify`,
        { withCredentials: true },
      );

      if (res.data.isPremium) {
        setIsUserPremium(true);
      }
    } catch (err) {
      console.error("Verification failed", err);
    }
  };

  useEffect(() => {
    verifyPremiumUser();
  }, []);

  const handleBuyClick = async (type: MembershipType): Promise<void> => {
    try {
      const orderRes = await axios.post<IPaymentOrder>(
        `${BASE_URL}/payment/create`,
        { membershipType: type },
        { withCredentials: true },
      );

      const { amount, keyId, currency, notes, orderId } = orderRes.data;

      const options = {
        key: keyId,
        amount,
        currency,
        name: "Dev Tinder",
        description: "Connect to other developers",
        order_id: orderId,
        prefill: {
          name: `${notes.firstName} ${notes.lastName}`,
          email: notes.emailId,
          contact: "9999999999",
        },
        theme: {
          color: "#F37254",
        },

        handler: function () {
          verifyPremiumUser();
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      const error = err as AxiosError;
      console.error("Payment initiation failed:", error.message);
    }
  };

  if (isUserPremium) {
    return (
      <div className="flex justify-center my-10 text-2xl font-bold text-success">
        You are already a premium user! 🎉
      </div>
    );
  }

  return (
    <div className="m-10">
      <div className="flex flex-col md:flex-row w-full gap-4">
        <div className="card bg-base-300 rounded-box grid h-96 flex-grow place-items-center p-6 text-center">
          <h1 className="font-bold text-3xl">Silver Membership</h1>
          <ul className="text-left my-4 space-y-2">
            <li>✅ Chat with other people</li>
            <li>✅ 100 connection Requests / day</li>
            <li>✅ Blue Tick</li>
            <li>✅ 3 months</li>
          </ul>
          <button
            onClick={() => handleBuyClick("silver")}
            className="btn btn-secondary w-full"
          >
            Buy Silver
          </button>
        </div>

        <div className="divider md:divider-horizontal">OR</div>

        <div className="card bg-base-300 rounded-box grid h-96 flex-grow place-items-center p-6 text-center">
          <h1 className="font-bold text-3xl">Gold Membership</h1>
          <ul className="text-left my-4 space-y-2">
            <li>✅ Chat with other people</li>
            <li>✅ Infinite connection Requests / day</li>
            <li>✅ Blue Tick</li>
            <li>✅ 6 months</li>
          </ul>
          <button
            onClick={() => handleBuyClick("gold")}
            className="btn btn-primary w-full"
          >
            Buy Gold
          </button>
        </div>
      </div>
    </div>
  );
};

export default Premium;
