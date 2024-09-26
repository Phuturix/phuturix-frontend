import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "./state/store";
import {  useEffect, useState, useCallback } from "react";


// https://redux-toolkit.js.org/tutorials/typescript#define-typed-hooks
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


// Hook to fix hydration errors by delaying rendering until client-side mount
export const useHydrationErrorFix = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
};




import { getGatewayApiClientOrThrow, getRdtOrThrow } from "./subscriptions";
export const useSendTransaction = () => {
  const rdt = getRdtOrThrow();
  const gatewayApiClient = getGatewayApiClientOrThrow();

  const sendTransaction = useCallback(
    // Send manifest to extension for signing
    async (transactionManifest: string, message?: string) => {
      if (!rdt || !gatewayApiClient) return;

      const transactionResult = await rdt.walletApi.sendTransaction({
        transactionManifest,
        version: 1,
        message,
      });

      if (transactionResult.isErr()) throw transactionResult.error;
      console.log("transaction result:", transactionResult);

      // Get the details of the transaction committed to the ledger
      const receipt = await gatewayApiClient.transaction.getCommittedDetails(
        transactionResult.value.transactionIntentHash
      );
      return { transactionResult: transactionResult.value, receipt };
    },
    [gatewayApiClient, rdt]
  );

  return sendTransaction;
};






