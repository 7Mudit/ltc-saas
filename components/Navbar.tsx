
import MobileSidebar from "@/components/mobile-sidebar";
import { getApiLimitCount } from "@/lib/actions/api-limit";
import { UserButton } from "@clerk/nextjs";

const Navbar = async() => {
  const apiLimitCount  = await getApiLimitCount()
  return (
    <div className="flex items-center p-4">
      <MobileSidebar apiLimitCount = {apiLimitCount}/>
      <div className="flex w-full justify-end">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default Navbar;
