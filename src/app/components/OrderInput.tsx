import { useEffect, useState } from 'react';

import { truncateWithPrecision, calculateLiquidationPrice } from '@/utils';
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
          <CurrencyInputGroup label="Margin" />
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
  const { margin, leverage, price, type, } = useAppSelector(state => state.perp);
  const [totalValue, setTotalValue] = useState<number>();
  useEffect(() => {
    const totalValue = truncateWithPrecision(margin || 0 * leverage, 2);
    setTotalValue(totalValue);
    if(price) {
          const liquid_price = calculateLiquidationPrice(price, leverage, type, 0.0015)

    }  }, [leverage]);

  

  return (
    <div className="flex content-between w-full text-white pb-3 px-2">
          <p className="grow text-left">Total:</p>
          <p className="">
            ~ {totalValue} {symbol}
          </p>
    </div>
  );
}
