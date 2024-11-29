import { Container } from "@/components/container/Container";
import Image from "next/image";
import React from "react";
import GoogleIcon from "@/assets/google.png";
import { Button } from "@/components/ui/button";
import { signIn } from "@/auth";

function page() {
  return (
    <Container className="py-20">
      <form
        action={async () => {
          "use server";
          await signIn("google", { redirectTo: "/" });
        }}
        className="flex flex-col items-center justify-center"
      >
        <Button variant={"outline"}>
          <Image src={GoogleIcon} alt="google-icon" width={20} height={20} />
          <span>Sign-in with Google</span>
        </Button>
      </form>
    </Container>
  );
}

export default page;
