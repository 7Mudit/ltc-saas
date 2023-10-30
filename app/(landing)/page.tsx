import { Button } from "@/components/ui/button";
import { testing } from "@/lib/actions/sample";
import Link from "next/link";

const LandingPage = () => {
  const response = testing()
  return (
    <div>
      <div>Landing Page</div>
      <div>
        <Link href="/sign-in">
          <Button>Login</Button>
        </Link>
        <Link href="/sign-up">
          <Button>Register</Button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
