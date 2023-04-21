import { createContext, useEffect } from "react";

import type { AppProps } from "next/app";
import Router  from "next/router";
import { Store } from "../store";

const store = new Store();
export const Context = createContext<Store>(store);

const existingRoutes = ["/"];

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (!existingRoutes.includes(Router.pathname)) {
      Router.push("/");
    }
  }, []);
  return (
    <Context.Provider value={store}>
      <Component {...pageProps} />
    </Context.Provider>
  );
}
