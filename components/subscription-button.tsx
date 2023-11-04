"use client";

import axios from "axios";
import { useState } from "react";
import { Zap } from "lucide-react";
import { toast } from "react-hot-toast";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export const SubscriptionButton = ({ isPro = false }: { isPro: boolean }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const userId = user?.id; // Now you have the userId on the client sid

  const onClick = async () => {
    try {
      setLoading(true);

      const response = await axios.post("http://localhost:8000/api/stripe" , {
        userId : userId ,
        user : user
      });

      window.location.href = response.data.url;
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant={isPro ? "default" : "premium"}
      disabled={loading}
      onClick={onClick}
    >
      {isPro ? "Manage Subscription" : "Upgrade"}
      {!isPro && <Zap className="w-4 h-4 ml-2 fill-white" />}
    </Button>
  );
};
