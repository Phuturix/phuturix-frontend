import { useAppSelector } from '@/hooks';
import { orderPerpSlice } from '@/state/orderPerpSlice';
import { store } from '@/state/store';
import { getPrecision, truncateWithPrecision } from '@/utils';

interface CurrencyInfoProps {
  disabled?: boolean;
  title: string;
  currency: string;
  updateValue?: (value: number) => void;
  setPercentageValue?: (percentage: number, isXRD: boolean) => void;
}

export default function CurrencyInfo({
  disabled = false,
  title,
  currency,
}: CurrencyInfoProps): JSX.Element | null {
  const balance = useAppSelector(state => state.perp.balance);
  const handleUpdate = () => {
    store.dispatch(orderPerpSlice.actions.updateValue(balance));
  };
  return disabled ? (
    <></>
  ) : (
    <button
      className="text-xs font-medium text-white underline mr-1 cursor-pointer tracking-[0.1px] text-right"
      onClick={handleUpdate}
    >
      {title}:{' '}
      {balance === 0
        ? 0
        : truncateWithPrecision(balance, 2)}{' '}
      {currency}
    </button>
  );
}
