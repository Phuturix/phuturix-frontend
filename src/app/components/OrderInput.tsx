import { useEffect, useState } from 'react';

import { truncateWithPrecision } from '../utils';
import SelectTypeTabs from './SelectTypeTabs';
import { CurrencyInputGroup } from './CurrencyInputGroup';
import PrecRangeSlider from './PrecRangeSlider';
import SubmitButton from './CustomButton';
import { useAppSelector } from '@/hooks';

export function OrderInput() {
  return (
    <div className="h-full flex flex-col text-base justify-start items-center">
      <SelectTypeTabs />
      <div className="m-auto my-0 h-[570px] w-full">
        <div className="bg-base-100 px-5 pb-5 rounded-b">
          <CurrencyInputGroup label="Trade Size" />
          <PrecRangeSlider />
        </div>
        <SubmitButton />
        <EstimatedTotalOrQuantity />
      </div>
    </div>
  );
}

function EstimatedTotalOrQuantity() {
  const symbol = 'XTR';
  const { value, leverage } = useAppSelector(state => state.perp);
  const [totalValue, setTotalValue] = useState<number>();
  useEffect(() => {
    console.log(value, leverage, 'value, leverage')
    const val = truncateWithPrecision(value * leverage, 2);
    setTotalValue(val);
  }, [value, leverage]);

  return (
    <div className="flex content-between w-full text-white pb-3 px-2">
      {totalValue && (
        <>
          <p className="grow text-left">Total:</p>
          <p className="">
            ~ {totalValue} {symbol}
          </p>
        </>
      )}
    </div>
  );
}
