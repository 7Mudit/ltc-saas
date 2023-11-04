"use client";
import { Heading } from "@/components/Heading";
import { SubscriptionButton } from "@/components/subscription-button";
import axios from "axios";
import { Settings } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

const SettingsPage = () => {
  const { user } = useUser();
  const userId = user?.id;
  const [isPro, setIsPro] = useState(false); // State to keep track of subscription status

  useEffect(() => {
    const checkSubs = async () => {
      try {
        // Ensure you have a correct endpoint and the server is expecting a POST request
        const response = await axios.post(
          "http://localhost:8000/api/checkSubscription",
          { userId: userId }
        );
        setIsPro(response?.data?.data); // Update state based on response
        console.log(response);
      } catch (error) {
        console.error("Error checking subscription status:", error);
        // Handle error, for example setting an error state
      }
    };

    if (userId) {
      // Only run if userId is not undefined or null
      checkSubs();
    }
  }, [userId]); // Dependency array now includes userId to re-run when it changes

  return (
    <div>
      <Heading
        title="Settings"
        description="Manage Account Settings"
        icon={Settings}
        iconColor="text-gray-700"
        bgColor="bg-gray-700/10"
      />
      <div className="px-4 lg:px-8 space-y-4">
        <div className="text-muted-foreground text-sm">
          {isPro
            ? "You are currently on a pro plan"
            : "You are currently on a free plan"}
        </div>
        <SubscriptionButton isPro={isPro} />
      </div>
    </div>
  );
};

export default SettingsPage;
