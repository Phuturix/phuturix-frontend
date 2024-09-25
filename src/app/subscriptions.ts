import { Subscription } from 'rxjs';
import {
  DataRequestBuilder,
  RadixDappToolkit,
} from '@radixdlt/radix-dapp-toolkit';
import { GatewayApiClient } from '@radixdlt/babylon-gateway-api-sdk';
import { radixSlice, WalletData } from './state/radixSlice';
import { fetchBalances } from './state/pairSelectorSlice';

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
  subs.push(
    rdtInstance.walletApi.walletData$.subscribe((walletData: WalletData) => {
      const data: WalletData = JSON.parse(JSON.stringify(walletData));
      store.dispatch(radixSlice.actions.setWalletData(data));
      console.log(fetchBalances(), 'fetchBalances()')
      store.dispatch(fetchBalances());
    })
  );
}

export function unsubscribeAll() {
  subs.forEach(sub => {
    sub.unsubscribe();
  });
  subs = [];
}
