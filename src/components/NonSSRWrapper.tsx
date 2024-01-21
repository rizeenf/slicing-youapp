import dynamic from "next/dynamic";
import React, { ReactNode } from "react";

const NonSSRWrapper = ({ children }: { children: ReactNode }) => (
  <>{children}</>
);

export default dynamic(() => Promise.resolve(NonSSRWrapper), {
  ssr: false,
});
