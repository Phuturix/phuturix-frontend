'use client';

import { useEffect } from 'react';
import { OrderInput } from './OrderInput';
import { PairSelector } from './PairSelector';
import { PriceInfo } from './PriceInfo';
import { useAppDispatch } from '../hooks';

export default function Trade() {
  const dispatch = useAppDispatch();

  // Update orders of selected pair every 5 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      // dispatch(fetchBalances());
      // dispatch(fetchAccountHistory());
    }, 5000); // Dispatch every 5000 milliseconds (5 second)

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [dispatch]);

  return (
    <div className="grow">
      <div className="max-w-[1521px] m-auto border-x border-[#d0d0d01a]">
        <div className="grid-container">
          <div className="pairSelector">
            <PairSelector />
          </div>
          <div className="priceInfo">
            <PriceInfo />
          </div>
          <div className="orderInput max-[850px]:p-5 max-[700px]:p-0 ">
            <OrderInput />
          </div>
        </div>
      </div>
    </div>
  );
}
