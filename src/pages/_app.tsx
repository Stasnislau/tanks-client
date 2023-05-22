import { useEffect } from "react";

import type { AppProps } from "next/app";
import Router from "next/router";

const existingRoutes = ["/"];

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (!existingRoutes.includes(Router.pathname)) {
      Router.push("/");
    }
  }, []);
  return <Component {...pageProps} />;
}
