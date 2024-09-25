import { useAppSelector } from '@/hooks';

export default function SubmitButton() {
  const { type } = useAppSelector((state: { perp: any }) => state.perp);
  const { isConnected } = useAppSelector(
    (state: { radix: { isConnected: boolean } }) => state.radix
  );
  return (
    <button
      className={`w-full h-[40px] p-3 my-6 rounded ${
        type === 'LONG'
          ? 'bg-radix-green text-black opacity-100'
          : 'bg-radix-red text-white opacity-100'
      }`}
      onClick={async e => {
        if (!isConnected) {
          alert('connect_wallet_to_trade');
          return;
        }

        e.stopPropagation();
        // DToads.promise(
        //   async () => {
        //     // const action = await dispatch(submitOrder());
        //     // if (!action.type.endsWith('fulfilled')) {
        //     //   // Transaction was not fulfilled (e.g. userRejected or userCanceled)
        //     //   throw new Error('Transaction failed due to user action.');
        //     // } else if ((action.payload as any)?.status === 'ERROR') {
        //     //   // Transaction was fulfilled but failed (e.g. submitted onchain failure)
        //     //   throw new Error('Transaction failed onledger');
        //     // }
        //     // dispatch(orderInputSlice.actions.resetUserInput());
        //     // dispatch(fetchBalances());
        //   },
        //   'submitting order', // Loading message
        //   'order submitted', // success message
        //   'failed to submit order' // error message
        // );
      }}
    >
      <div className="flex justify-center items-center">
        <div className="font-bold text-sm tracking-[.1px] uppercase">
          {type} XRP-PERP
        </div>
      </div>
    </button>
  );
}
