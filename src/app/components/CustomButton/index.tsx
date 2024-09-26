import { useAppDispatch, useAppSelector } from "@/hooks";
import { getRdtOrThrow } from "../../subscriptions";
import { orderPerpSlice } from "@/state/OrderPerpSlice";
import { Side } from "@/lib/types";

export async function submitOrder(leverage: number, price: number, position: Side, margin: number) {
  const totalPosValue = leverage * margin;
  const pos = position === Side.LONG ? "long" : "short";
  const rdt = getRdtOrThrow();
  const account_address =
    "account_tdx_2_128ncus8jayt2yc8wkkk6643yd6ragd7j80mycvrfajll55u2hx3k5d";
  const manifest = `CALL_METHOD
      Address("component_tdx_2_1cqg6h0xmp6p3h529mq8fnr9m0lvlaaqaam7eec7w3ly7hlmscn675z")
      "add_position"
      Address("${account_address}")
      "${pos}"
      Decimal("${leverage}")
      Decimal("${price}")
      Decimal("${totalPosValue}")
  ;
  CALL_METHOD
      Address("${account_address}")
      "try_deposit_batch_or_refund"
      Expression("ENTIRE_WORKTOP")
      Enum<0u8>()
  ;`;

  // Send manifest to extension for signing
  const result = await rdt.walletApi.sendTransaction({
    transactionManifest: manifest,
    version: 2,
  });
  if (result.isErr()) throw result.error;
  console.log("Transaction Output: ", result.value);
}

export default function SubmitButton() {
  const dispatch = useAppDispatch();
   const { margin, leverage, price, type} = useAppSelector(state => state.perp);
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
        dispatch(orderPerpSlice.actions.updateStatusLoading(true))
        price && submitOrder(leverage, price, type, margin);
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
