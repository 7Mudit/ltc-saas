
import MobileSidebar from "@/components/mobile-sidebar";
import { getApiLimitCount } from "@/lib/actions/api-limit";
import { checkSubscription } from "@/lib/actions/subscription";
import { UserButton } from "@clerk/nextjs";

const Navbar = async() => {
  const apiLimitCount  = await getApiLimitCount()
  const isPro = await checkSubscription()
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
