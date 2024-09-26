"use client";

import "./styles/globals.css";
import { Navbar } from './components/NavBar';

import { Footer } from "./components/Footer";
import { Provider } from "react-redux";
import { usePathname } from "next/navigation";
import { PToaster } from "./components/PToaster";
import { useEffect, Suspense } from "react";
import { initializeSubscriptions, unsubscribeAll } from "./subscriptions";
import { store } from "./state/store";


import { useAppDispatch } from "@/hooks";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Initialize store
  useEffect(() => {
    initializeSubscriptions(store);
    return () => {
      unsubscribeAll();
    };
  }, []);

  // TODO: after MVP remove "use client", fix all as many Components as possible
  // to be server components for better SSG and SEO
  // and use metadata https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration#step-2-creating-a-root-layout

  return (
    <html lang="en" data-theme="dark" className="scrollbar-none">
      <head>
        <title>Phutirix</title>
      </head>
      <Provider store={store}>
        <AppBody>{children}</AppBody>
      </Provider>
    </html>
  );
}

// This subcomponent is needed to initialize browser language for the whole app
function AppBody({ children }: { children: React.ReactNode }) {
  const path = usePathname();

  return (
    <body>
      <PToaster toastPosition="top-center" />
      <div
        data-path={path}
        className="h-screen prose md:prose-lg lg:prose-xl max-w-none flex flex-col"
      >
        <div className="flex flex-col justify-between min-h-[100vh] max-w-[100vw] overflow-x-hidden">
          <Navbar />

          <Suspense>{children}</Suspense>
          <Footer />
        </div>
      </div>
    </body>
  );
}
