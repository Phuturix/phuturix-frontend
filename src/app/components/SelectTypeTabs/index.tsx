import { useAppDispatch, useAppSelector } from '@/hooks';
import { Side } from '@/lib/types';
import { orderPerpSlice } from '@/state/OrderPerpSlice';

export default function SelectTypeTabs() {
  return (
    <div className="h-[40px] flex w-full">
      {[Side.LONG, Side.SHORT].map((currentSide, indx) => (
        <SelectTypeTab orderSide={currentSide} key={indx} />
      ))}
    </div>
  );
}

interface OrderSideTabProps {
  orderSide: Side;
}

function SelectTypeTab({ orderSide }: OrderSideTabProps): JSX.Element | null {
  const type = useAppSelector(state => state.perp.type);
  const dispatch = useAppDispatch();

  return (
    <div
      className={`w-1/2 flex justify-center items-center cursor-pointer hover:opacity-100 ${
        type === 'LONG' && orderSide === 'LONG'
          ? 'bg-radix-green text-content-dark'
          : type === 'SHORT' && orderSide === 'SHORT'
          ? 'bg-radix-red text-white'
          : 'opacity-50'
      }`}
      onClick={() => {
        dispatch(orderPerpSlice.actions.updateOrderType(orderSide));
      }}
    >
      <p className="font-bold text-sm tracking-[.1px] select-none uppercase">
        {orderSide}
      </p>
    </div>
  );
}
