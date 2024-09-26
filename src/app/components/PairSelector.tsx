import React from 'react';
import { useAppSelector } from '../hooks';
import { displayNumber } from '@/utils';

export function PairSelector() {
  const price = useAppSelector(state => state.perp.price);
    console.log(price, 'price')

  const token = 'XTR';

  return (
    <div className="w-full h-full relative uppercase bg-base-100">
      <div className="flex justify-between px-6 py-4">
        <div className="flex justify-center items-center truncate">
          <div className="relative mr-8">
            <img
              src="/coins/radix.svg"
              alt="radix Icon"
              className="w-6 h-6 rounded-full z-20"
            />
          </div>
          <span className="opacity-90 text-base">{`${token}-PERP`}</span>
        </div>
        <div className="flex flex-col text-sm text-right font-sans">
          <span className="opacity-90 text-base">{price}</span>
        </div>
      </div>
    </div>
  );
}
