import { useAppSelector } from '@/hooks';

export default function SubmitButton() {
  const { type } = useAppSelector((state: { perp: any }) => state.perp);
    const sendTransaction = useSendTransaction();
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
       const handleClaimToken = async () => {
    console.log("selectedAccount:", selectedAccount);
    if (!selectedAccount) {
      alert("Please select an account first.");
      return;
    }
    setLoading(true);
    const accountAddress = selectedAccount;

    const manifest = `
      CALL_METHOD
        Address("${componentAddress}")
        "free_token"
        ;
      CALL_METHOD
        Address("${accountAddress}")
        "deposit_batch"
        Expression("ENTIRE_WORKTOP")
        ;
    `;
    console.log("manifest:", manifest);

    const result = await sendTransaction(manifest).finally(() =>
      setLoading(false)
    );
    console.log("transaction receipt:", result?.receipt);
  };


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


