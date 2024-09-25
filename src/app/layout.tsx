'use client';

import './styles.css';

import { Footer } from './components/Footer';
import { Navbar } from './components/NavBar';
import { Provider } from 'react-redux';
import { DToaster } from './components/DToaster';
import { useEffect, Suspense } from 'react';
import { initializeSubscriptions, unsubscribeAll } from './subscriptions';
import { store } from './state/store';

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
        <title>Radix Dapp Template</title>
      </head>
      <Provider store={store}>
        <AppBody>{children}</AppBody>
      </Provider>
    </html>
  );
}

function AppBody({ children }: { children: React.ReactNode }) {
  return (
    <body>
      <DToaster toastPosition="top-center" />
      <div className="min-h-screen">
        <div className="max-w-[1550px] mx-auto px-4 w-full">

          <Navbar />
          {
            // When using useSearchParams from next/navigation we need to
            // wrap the outer component in a Suspense boundary, otherwise
            // the build on cloudflare fails. More info here:
            // https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
          }
          <Suspense>{children}</Suspense>
          <Footer />
          </div>
      </div>
    </body>
  );
}
