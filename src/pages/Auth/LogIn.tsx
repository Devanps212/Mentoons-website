import { SignIn } from "@clerk/clerk-react";

const LogIn = () => {
  return (
    <div className=" h-screen  flex  bg-[url(/assets/images/team-background.png)] bg-no-repeat bg-cover bg-center">
      <div className="hidden flex-1 lg:block">
        <img
          src="/assets/home/team007.png"
          alt=""
          className="object-contain w-full"
        />
      </div>
      <div className="flex flex-1 justify-center items-center">
        <SignIn
          signUpUrl="/sign-up"
          redirectUrl={window.location.href}
          afterSignInUrl={window.location.href}
        />
      </div>
    </div>
  );
};

export default LogIn;
