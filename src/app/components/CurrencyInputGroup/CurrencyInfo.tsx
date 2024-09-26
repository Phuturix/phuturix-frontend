import { useAppSelector } from '@/hooks';
import { orderPerpSlice } from '@/state/OrderPerpSlice';
import { store } from '@/state/store';
import { truncateWithPrecision } from '@/utils';

interface CurrencyInfoProps {
  disabled?: boolean;
  title: string;
  currency: string;
  updateMargin?: (value: number) => void;
  setPercentageValue?: (percentage: number, isXRD: boolean) => void;
}

export default function CurrencyInfo({
  disabled = false,
  title,
  currency,
}: CurrencyInfoProps): JSX.Element | null {
  //const balance = useAppSelector(state => state.perp.balance);
    const balance = useAppSelector(state => state.pairSelector.token1.balance);

  const handleUpdate = () => {
    store.dispatch(orderPerpSlice.actions.updateMargin(balance || 0));
  };
  return disabled ? (
    <></>
  ) : (
    <button
      className="text-xs font-medium text-white underline mr-1 cursor-pointer tracking-[0.1px] text-right"
      onClick={handleUpdate}
    >
      {title}:{' '}
      {!balance
        ? 0
        : truncateWithPrecision(balance, 2)}{' '}
      {currency}
    </button>
  );
}
