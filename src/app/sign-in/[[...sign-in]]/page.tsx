import Wrapper from "../../../components/Shared/wrapper";
import { SignIn ,  SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <Wrapper>
      <div className="flex justify-center items-center w-full">
        <SignIn afterSignInUrl={"/"} />
      </div>
    </Wrapper>
  );
}
