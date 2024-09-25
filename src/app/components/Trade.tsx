'use client';

import { useEffect } from 'react';
import { OrderInput } from './OrderInput';
import { PairSelector } from './PairSelector';
import { useAppDispatch, useAppSelector } from '../hooks';
import SelectTypeTabs from './SelectTypeTabs';

export default function Trade() {
  const dispatch = useAppDispatch();
 const balance = useAppSelector(state => state);
 console.log(balance, 'balance')
  useEffect(() => {
    const intervalId = setInterval(() => {
    }, 5000); // Dispatch every 5000 milliseconds (5 second)

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [dispatch]);

  return (
    <div className="sm:flex">
        <div>
          <div className="">
            <SelectTypeTabs />
          </div>
          <div className="">
            <OrderInput />
          </div>
        </div>
      </div>
  );
}
