import * as adex from 'alphadex-sdk-js';
import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from './store';
import { getGatewayApiClientOrThrow, getRdt } from '../subscriptions';

export const AMOUNT_MAX_DECIMALS = adex.AMOUNT_MAX_DECIMALS;

export interface TokenInfo {
  balance?: number;
  decimals?: number;
  address?: string;
  symbol?: string;
  name: string
  iconUrl: string;
}

export interface PairSelectorState {
  name: string;
  address: string;
  token1: TokenInfo;
  token2: TokenInfo;
}

interface SelectPairPayload {
  pairAddress: string;
  pairName: string;
}

export const initialTokenInfo: TokenInfo = {
  address: '',
  symbol: '',
  name: '',
  iconUrl: '',
  decimals: 8,
};

const initialState: PairSelectorState = {
  name: '',
  address: '',
  token1: { ...initialTokenInfo },
  token2: { ...initialTokenInfo },
};

export const fetchBalances = createAsyncThunk<
  undefined, // Return type of the payload creator
  undefined, // argument type
  {
    state: RootState;
  }
>('pairSelector/fetchBalances', async (_arg, thunkAPI) => {
  const dispatch = thunkAPI.dispatch;
  const state = thunkAPI.getState();

  if (state.pairSelector.address === '') {
    return undefined;
  }

  const rdt = getRdt();
  const gatewayApiClient = getGatewayApiClientOrThrow();
  console.log(state.radix.walletData.accounts, 'state.radix.walletData.accounts')
  if (rdt && state.radix.walletData.accounts.length > 0) {
    const tokens = [state.pairSelector.token1, state.pairSelector.token2];

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
                  resource_address: token.address,
                },
              }
            );
        }
        // if there are no items in response, set the balance to 0
        const balance = parseFloat(response?.items[0]?.amount || '0');
        dispatch(pairSelectorSlice.actions.setBalance({ balance, token }));
      } catch (error) {
        dispatch(pairSelectorSlice.actions.setBalance({ balance: 0, token }));
        throw new Error('Error getting data from Radix gateway');
      }
    }
  }

  return undefined;
});

export const pairSelectorSlice = createSlice({
  name: 'pairSelector',
  initialState,

  // synchronous reducers
  reducers: {
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

  extraReducers: builder => {
    builder.addCase(fetchBalances.rejected, (state, action) => {
      state.token1.balance = undefined;
      state.token2.balance = undefined;
      console.error(
        'pairSelector/fetchBalances rejected:',
        action.error.message
      );
    });
  },
});



