import 'react';
import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="bg-base-300 text-xs w-fill">
      <div className="flex flex-wrap items-center justify-center container pt-4 pb-8">
        <div className="flex col flex-wrap">
          <Logo />

          <div className="ml-4 mt-2">
            <p className="truncate">
              Build on on&nbsp;
              <a
                href="https://www.radixdlt.com/"
                target="_blank"
                className="underline"
              >
                RADIX
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}