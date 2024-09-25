import * as adex from "alphadex-sdk-js";
import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { getGatewayApiClientOrThrow, getRdt } from "../subscriptions";
import { setQueryParam } from "../utils";

export const AMOUNT_MAX_DECIMALS = adex.AMOUNT_MAX_DECIMALS;

export interface TokenInfo {
  balance?: number;
  address?: string;
  name: string
}

export interface PairSelectorState {
  name: string;
  address: string;
  token1: TokenInfo;
  token2: TokenInfo;
  pairsList: adex.PairInfo[];
}

interface SelectPairPayload {
  pairAddress: string;
  pairName: string;
}

export const initalTokenInfo: TokenInfo = {
  address: "",
  name: "",
};

const initialState: PairSelectorState = {
  name: "",
  address: "",
  token1: { ...initalTokenInfo },
  token2: { ...initalTokenInfo },
  pairsList: [],
};

export const fetchBalances = createAsyncThunk<
  undefined, // Return type of the payload creator
  undefined, // argument type
  {
    state: RootState;
  }
>("pairSelector/fetchBalances", async (_arg, thunkAPI) => {
  const dispatch = thunkAPI.dispatch;
  const state = thunkAPI.getState();

  if (state.pairSelector.address === "") {
    return undefined;
  }

  const rdt = getRdt();
  const gatewayApiClient = getGatewayApiClientOrThrow();
  if (rdt && state.radix.walletData.accounts.length > 0) {
    const tokens = [{ address: 'resource_rdx1t4upr78guuapv5ept7d7ptekk9mqhy605zgms33mcszen8l9fac8vf', name: "Wrapped USDC" },
      { address: "resource_rdx1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxradxrd", name: 'Radix'}];

    for (let token of tokens) {
      // separate balance fetching try/catch for each token
      try {
        let response;
        if (token.address) {
          response =
            await gatewayApiClient.state.innerClient.entityFungibleResourceVaultPage(
              {
                stateEntityFungibleResourceVaultsPageRequest: {
                  address: state.radix.selectedAccount?.address,
                  // eslint-disable-next-line camelcase
                  resource_address: token.address,
                },
              }
            );
        }
        // if there are no items in response, set the balance to 0
        const balance = parseFloat(response?.items[0]?.amount || "0");
        dispatch(pairSelectorSlice.actions.setBalance({ balance, token }));
      } catch (error) {
        dispatch(pairSelectorSlice.actions.setBalance({ balance: 0, token }));
        throw new Error("Error getting data from Radix gateway");
      }
    }
  }

  return undefined;
});

export const pairSelectorSlice = createSlice({
  name: "pairSelector",
  initialState,

  // synchronous reducers
  reducers: {
    updateAdex: (
      state: PairSelectorState,
      action: PayloadAction<adex.StaticState>
    ) => {
      const adexState = action.payload;

      state.token1.decimals = adexState.currentPairInfo.token1MaxDecimals;
      state.token2.decimals = adexState.currentPairInfo.token2MaxDecimals;



      state.address = adexState.currentPairAddress;
      state.name = adexState.currentPairInfo.name;
  
    },
    selectPair: (
      state: PairSelectorState,
      action: PayloadAction<SelectPairPayload>
    ) => {
      const { pairAddress, pairName } = action.payload;
      adex.clientState.currentPairAddress = pairAddress;
      if (pairName) {
        state.name = pairName; // Prevent empty pairname during loading
        setQueryParam("pair", formatPairName(pairName));
      }
    },

    setBalance: (
      state: PairSelectorState,
      action: PayloadAction<{ token: TokenInfo; balance: number }>
    ) => {
      const { token, balance } = action.payload;
      if (token.address === state.token1.address) {
        state.token1 = { ...state.token1, balance };
      } else if (token.address === state.token2.address) {
        state.token2 = { ...state.token2, balance };
      }
    },
    resetBalances: (state: PairSelectorState) => {
      delete state.token1.balance;
      delete state.token2.balance;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchBalances.rejected, (state, action) => {
      state.token1.balance = undefined;
      state.token2.balance = undefined;
      console.error(
        "pairSelector/fetchBalances rejected:",
        action.error.message
      );
    });
  },
});

function formatPairName(pairName: string): string {
  return pairName?.toLowerCase().split("/").join("-");
}

export const { updateAdex, selectPair } = pairSelectorSlice.actions;
