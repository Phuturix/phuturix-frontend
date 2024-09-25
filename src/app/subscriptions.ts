import { Subscription } from "rxjs";
import {
  DataRequestBuilder,
  RadixDappToolkit,
  RadixNetwork,
  WalletDataStateAccount,
} from "@radixdlt/radix-dapp-toolkit";
import { GatewayApiClient } from "@radixdlt/babylon-gateway-api-sdk";
import * as adex from "alphadex-sdk-js";
import { radixSlice, WalletData } from "./state/radixSlice";
import { fetchBalances } from "./state/pairSelectorSlice";
import { pairSelectorSlice } from "./state/pairSelectorSlice";
import { updateCandles } from "./state/priceChartSlice";
import { updatePriceInfo } from "./state/priceInfoSlice";
import { AppStore } from "./state/store";


export type RDT = ReturnType<typeof RadixDappToolkit>;

let rdtInstance: null | RDT = null;
let gatewayApiClient: null | GatewayApiClient = null;

export function getRdt() {
  return rdtInstance;
}

export function getGatewayApiClient() {
  return gatewayApiClient;
}

export function getRdtOrThrow() {
  const rdt = getRdt();
  if (!rdt) {
    throw new Error("RDT initialization failed");
  }
  return rdt;
}

export function getGatewayApiClientOrThrow() {
  const gatewayApiClient = getGatewayApiClient();
  if (!gatewayApiClient) {
    throw new Error("GatewayApiClient initialization failed");
  }
  return gatewayApiClient;
}

function setRdt(rdt: RDT) {
  rdtInstance = rdt;
}

let subs: Subscription[] = [];

export function initializeSubscriptions(store: AppStore) {
  let networkId = RadixNetwork.Stokenet;
  rdtInstance = RadixDappToolkit({
    dAppDefinitionAddress: process.env.NEXT_PUBLIC_DAPP_DEFINITION_ADDRESS!,
    networkId,
    featureFlags: ["ExperimentalMobileSupport"],
  });
  gatewayApiClient = GatewayApiClient.initialize(
    rdtInstance.gatewayApi.clientConfig
  );
  rdtInstance.walletApi.setRequestData(
    DataRequestBuilder.accounts().atLeast(1)
  );
  subs.push(
    rdtInstance.walletApi.walletData$.subscribe((walletData: WalletData) => {
      const data: WalletData = JSON.parse(JSON.stringify(walletData));
      store.dispatch(radixSlice.actions.setWalletData(data));
      // TODO: can we subscribe to balances from somewhere?
      store.dispatch(fetchBalances());
    })
  );
  setRdt(rdtInstance);
  let network = adex.ApiNetworkOptions.indexOf("stokenet");

  adex.init(adex.ApiNetworkOptions[network]);
  subs.push(
    adex.clientState.stateChanged$.subscribe((newState) => {
      const serializedState: adex.StaticState = JSON.parse(
        JSON.stringify(newState)
      );

      store.dispatch(pairSelectorSlice.actions.updateAdex(serializedState));
      // store.dispatch(orderBookSlice.actions.updateAdex(serializedState));
      store.dispatch(updateCandles(serializedState.currentPairCandlesList));
      store.dispatch(updatePriceInfo(serializedState));
    })
  );
}

export function unsubscribeAll() {
  subs.forEach((sub) => {
    sub.unsubscribe();
  });
  subs = [];
}
