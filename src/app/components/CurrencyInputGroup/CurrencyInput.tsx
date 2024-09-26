// import { ValidationResult } from '@/types';
import { useAppSelector } from '@/hooks';
import { orderPerpSlice } from '@/state/OrderPerpSlice';
import { store } from '@/state/store';
import { formatNumericString, getLocaleSeparators } from '@/utils';
import { ChangeEvent } from 'react';
interface CurrencyInputProps {
  currency: string;
  maxValue?: number;
}

export default function CurrencyInput({
  currency,
}: CurrencyInputProps): JSX.Element | null {
  const { decimalSeparator } = getLocaleSeparators();
  const scale = 8;
  const value = useAppSelector(state => state.perp.value);
  const handleUpdate = (value: number) => {
    store.dispatch(orderPerpSlice.actions.updateValue(value));
  };

  const max = useAppSelector(state => state.pairSelector.token1.balance) || 0;
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target;
    value = value.replace(/,/g, decimalSeparator).replace(/-/g, '');
    if (value.startsWith('.') || value.startsWith(',')) {
      value = value.substring(1, value.length);
    }
    if (value === '') {
      return;
    }
    const formattedValue = formatNumericString(value, decimalSeparator, scale);
    // Regex that limits precision to defined "scale" and allows a single
    // dot between digits or at the very end
    const regexForAccept = new RegExp(`^\\d+(\\.\\d{1,${scale}})?$`);
    if (regexForAccept.test(formattedValue)) {
      if (parseFloat(formattedValue) > max) {
        handleUpdate(max);
      } else {
        handleUpdate(parseFloat(formattedValue));
      }
    }
  };

  return (
    <>
      <div className="h-[40px] w-full content-between bg-base-200 flex rounded-lg hover:outline hover:outline-1 hover:outline-white/50">
        <input
          type="text"
          value={value}
          onChange={handleChange}
          className="text-sm grow w-full text-right pr-2 bg-base-200 rounded-lg hover:outline-none"
        />
        <div className="text-sm shrink-0 bg-base-200 content-center items-center flex pl-2 pr-4 rounded-r-md">
          {currency}
        </div>
      </div>
    </>
  );
}
