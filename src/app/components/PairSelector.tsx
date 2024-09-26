import React from 'react';
import { displayNumber } from '../utils';
import { useAppSelector } from '../hooks';

export function PairSelector() {
  const priceInfo = useAppSelector(state => state.priceInfo);
  const noDigits = 4;
  const fixedDecimals = 3;
  const lastPrice = displayNumber(priceInfo.lastPrice, noDigits, fixedDecimals);
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
          <span className="opacity-90 text-base">{lastPrice}</span>
        </div>
      </div>
    </div>
  );
}
