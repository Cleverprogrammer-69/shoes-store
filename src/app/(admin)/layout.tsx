import StoreProvider from "@/components/provider/StoreProvider";
import React from "react";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
};

export default RootLayout;
