import React, { useEffect, useState, useRef } from 'react';
import { Logo } from './Logo';
import { useAppDispatch, useAppSelector } from '../hooks';

import { radixSlice } from '../state/radixSlice';

import { shortenWalletAddress } from '../utils';

import { fetchBalances, pairSelectorSlice } from '../state/pairSelectorSlice';
// eslint-disable-next-line no-restricted-imports
import { WalletDataStateAccount } from '@radixdlt/radix-dapp-toolkit';

export function Navbar() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const radixConnectButton = document.querySelector('radix-connect-button')!;
    // Trigger disconnect actions
    const handleDisconnect = () => {
      dispatch(pairSelectorSlice.actions.resetBalances());
    };

    radixConnectButton.addEventListener('onDisconnect', handleDisconnect);

    return () => {
      radixConnectButton.removeEventListener('onDisconnect', handleDisconnect);
    };
  }, [dispatch]);

  return (
    <nav className='sticky top-0 sm:static flex items-center justify-between w-full !h-[64px] !min-h-[64px]'>
      <div className="flex h-full">
        <Logo />
      </div>
      <div className="flex items-center content-center h-full relative">
        <div className="flex pr-4">
          <WalletSelector />
          <radix-connect-button></radix-connect-button>
        </div>
      </div>
    </nav>
  );
}

function WalletSelector() {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const { isConnected, walletData, selectedAccount } = useAppSelector(
    state => state.radix
  );

  console.log(walletData, 'walletData')

  const menuRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLImageElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target as Node) &&
      iconRef.current &&
      !iconRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  if (!isConnected) {
    return <></>;
  }

  return (
    <div
      className="flex justify-center items-center cursor-pointer hover:bg-slate-700 px-2 mx-2 rounded"
      onClick={() => setIsOpen(!isOpen)}
    >
      <img ref={iconRef} src="/wallet.svg" alt="wallet icon" />
      {isOpen && (
        <div
          ref={menuRef}
          className="absolute top-[64px] right-0 w-[350px] max-[500px]:pl-4 max-[500px]:w-[100vw] max-w-[100vw] max-h-[50vh] overflow-hidden rounded bg-[#232629] overflow-y-scroll scrollbar-thin border-red"
        >
          {walletData.accounts.map((account, indx) => {
            const selectAccount = (account: WalletDataStateAccount) => {
              dispatch(radixSlice.actions.selectAccount(account));
              dispatch(fetchBalances());
            };
            return (
              <div
                className='hover:bg-slate-700 px-4'
                onClick={() => selectAccount(account)}
                key={indx}
              >
                <div className="text-base font-bold pt-3 flex justify-between">
                  <span
                    className={`truncate ${
                      account.address === selectedAccount.address
                        ? 'bg-gradient-to-r from-radix-gradient-blue to-radix-gradient-green to-80% bg-clip-text text-transparent font-base'
                        : ''
                    }`}
                  >
                    {account.label}
                  </span>
                  {account.address === selectedAccount.address ? (
                    <span className="pl-2 font-base font-normal">
                      (current)
                    </span>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="truncate text-sm font-light opacity-80 pb-3 border-b-[1px] border-b-[#5d5d5d7a]">
                  {shortenWalletAddress(account.address)}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}


