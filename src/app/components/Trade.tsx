'use client';

import { useEffect } from 'react';
import { OrderInput } from './OrderInput';
import { PairSelector } from './PairSelector';
import { useAppDispatch } from '../hooks';
// import PriceChart from './Chart/PriceChart';

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
    <div className="sm:flex">
        <div>
          <div className="">
            <PairSelector />
          </div>
          <div className="">
            <OrderInput />
          </div>
        </div>
        {/* <PriceChart /> */}
      </div>
  );
}
