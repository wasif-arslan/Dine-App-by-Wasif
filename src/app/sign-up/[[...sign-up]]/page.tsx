import Wrapper from "../../../components/Shared/wrapper";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
    return (
        <Wrapper>
            <div className="flex justify-center items-center w-full">
                <SignUp afterSignUpUrl={"/"}/>
            </div>
        </Wrapper>
    );
}