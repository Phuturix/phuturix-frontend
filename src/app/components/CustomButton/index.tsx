import { useAppSelector } from "@/hooks";
import { getRdtOrThrow } from "../../subscriptions";

export async function submitOrder() {
  const rdt = getRdtOrThrow();
  const account_address =
    "account_tdx_2_12yas0232myy5vv60hepjznf4m3khjlpyuu7v2ckvtd6337razwwcru";
  const manifest = `CALL_METHOD
      Address("component_tdx_2_1cqg6h0xmp6p3h529mq8fnr9m0lvlaaqaam7eec7w3ly7hlmscn675z")
      "add_position"
      Address("${account_address}")
      "long"
      Decimal("3")
      Decimal("0.5")
      Decimal("1")
  ;
  CALL_METHOD
      Address("${account_address}")
      "try_deposit_batch_or_refund"
      Expression("ENTIRE_WORKTOP")
      Enum<0u8>()
  ;`;

  console.log(manifest);
  // Send manifest to extension for signing
  const result = await rdt.walletApi.sendTransaction({
    transactionManifest: manifest,
    version: 2,
  });
  if (result.isErr()) throw result.error;
  console.log("Transaction Output: ", result.value);
}

export default function SubmitButton() {
  const { type } = useAppSelector((state: { perp: any }) => state.perp);
  const { isConnected } = useAppSelector(
    (state: { radix: { isConnected: boolean } }) => state.radix
  );
  return (
    <button
      className={`w-full h-[40px] p-3 my-6 rounded ${
        type === "LONG"
          ? "bg-radix-green text-black opacity-100"
          : "bg-radix-red text-white opacity-100"
      }`}
      onClick={async (e) => {
        if (!isConnected) {
          alert("connect_wallet_to_trade");
          return;
        }

        e.stopPropagation();
        console.log("submit");
        submitOrder();

        // DToads.promise(
        //   async () => {
        //     const action = await dispatch(submitOrder());
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
        //   "submitting order", // Loading message
        //   "order submitted", // success message
        //   "failed to submit order" // error message
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
