"use client"
import MobileSidebar from "@/components/mobile-sidebar";
import { getApiLimitCount } from "@/lib/actions/api-limit";
import { checkSubscription } from "@/lib/actions/subscription";
import { UserButton } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { URL } from "@/app/constants";
import axios from "axios";


const Navbar = () => {
  const [isPro, setIsPro] = useState(false); // State to keep track of subscription status
  const [apiLimitCount , setApiLimitCount] = useState(0)  
  const { user } = useUser();
  const userId = user?.id;
  useEffect(() => {
    const checkSubs = async () => {
      try {
        // Ensure you have a correct endpoint and the server is expecting a POST request
        const response = await axios.post(
          `${URL}/api/checkSubscription`,
          { userId: userId }
        );
        setIsPro(response?.data?.data); // Update state based on response
        console.log(response);
      } catch (error) {
        console.error("Error checking subscription status:", error);
        // Handle error, for example setting an error state
      }
    };
    const checkApiLimit = async() => {
      try{
        const response = await axios.post(
          `${URL}/api/apiLimit`,
          { userId: userId }
        );
        setApiLimitCount(response?.data?.result); // Update state based on response
        console.log(response);
      }
      catch(error){
        console.error("Error checking api limit status:", error);
      }
    }

    if (userId) {
      // Only run if userId is not undefined or null
      checkSubs();
      checkApiLimit();
    }
  }, [userId]); // Dependency array now includes userId to re-run when it changes

  return (
    <div className="flex items-center p-4">
      <MobileSidebar apiLimitCount = {apiLimitCount} isPro={isPro}/>
      <div className="flex w-full justify-end">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default Navbar;
