"use client";

import SignIn from "./sign-in-form";

const SignInPage = () => {
  return (
    <div className="flex justify-center items-center flex-col h-full gap-2 ">
      <div className="w-lg">
        <SignIn />
      </div>
    </div>
  );
};

export default SignInPage;
