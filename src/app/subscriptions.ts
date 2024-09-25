import { Subscription } from 'rxjs';
import {
  DataRequestBuilder,
  RadixDappToolkit,
} from '@radixdlt/radix-dapp-toolkit';
import { GatewayApiClient } from '@radixdlt/babylon-gateway-api-sdk';
import * as adex from "alphadex-sdk-js";
import { radixSlice, WalletData } from './state/radixSlice';
import { fetchBalances, pairSelectorSlice } from './state/pairSelectorSlice';
import { updatePriceInfo } from "./state/priceInfoSlice";

import { AppStore } from './state/store';

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
    throw new Error('RDT initialization failed');
  }
  return rdt;
}

export function getGatewayApiClientOrThrow() {
  const gatewayApiClient = getGatewayApiClient();
  if (!gatewayApiClient) {
    throw new Error('GatewayApiClient initialization failed');
  }
  return gatewayApiClient;
}

let subs: Subscription[] = [];

export function initializeSubscriptions(store: AppStore) {
  rdtInstance = RadixDappToolkit({
    dAppDefinitionAddress: process.env.NEXT_PUBLIC_DAPP_DEFINITION_ADDRESS!,
    networkId: 2,
    featureFlags: ['ExperimentalMobileSupport'],
  });
  gatewayApiClient = GatewayApiClient.initialize(
    rdtInstance.gatewayApi.clientConfig
  );
  rdtInstance.walletApi.setRequestData(
    DataRequestBuilder.accounts().atLeast(1)
  );
  adex.init(adex.ApiNetworkOptions[2]);
  subs.push(
    adex.clientState.stateChanged$.subscribe((newState) => {
      const serializedState: adex.StaticState = JSON.parse(
        JSON.stringify(newState)
      );

      store.dispatch(pairSelectorSlice.actions.updateAdex(serializedState));
      store.dispatch(updatePriceInfo(serializedState));
      // store.dispatch(accountHistorySlice.actions.updateAdex(serializedState));
      // store.dispatch(orderInputSlice.actions.updateAdex(serializedState));
      // store.dispatch(
      //   rewardSlice.actions.updateTokensList(serializedState.tokensList)
      // );
      // store.dispatch(
      //   rewardSlice.actions.updatePairsList(serializedState.pairsList)
      // );
      // store.dispatch(
      //   orderBookSlice.actions.updateRecentTrades(
      //     serializedState.currentPairTrades
      //   )
      // );
    })
  );
  // subs.push(
  //   rdtInstance.walletApi.walletData$.subscribe((walletData: WalletData) => {
  //     const data: WalletData = JSON.parse(JSON.stringify(walletData));
  //     store.dispatch(radixSlice.actions.setWalletData(data));
  //     console.log(fetchBalances(), 'fetchBalances()')
  //     store.dispatch(fetchBalances());
  //   })
  // );
}

export function unsubscribeAll() {
  subs.forEach(sub => {
    sub.unsubscribe();
  });
  subs = [];
}

