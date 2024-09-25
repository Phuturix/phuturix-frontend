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
          <radix-connect-button></radix-connect-button>
        </div>
      </div>
    </nav>
  );
}


