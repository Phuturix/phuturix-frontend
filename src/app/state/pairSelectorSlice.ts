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
  token: TokenInfo;
}

interface SelectPairPayload {
  pairAddress: string;
  pairName: string;
}

export const initialTokenInfo: TokenInfo = {
  address: 'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc',
  symbol: '',
  name: '',
  iconUrl: '',
  decimals: 8,
};

const initialState: PairSelectorState = {
  name: '',
  address: '',
  token: { ...initialTokenInfo },
};

export const fetchBalances = createAsyncThunk<
  undefined, // Return type of the payload creator
  undefined, // argument type
  {
    state: RootState;
  }
>('', async (_arg, thunkAPI) => {
  const dispatch = thunkAPI.dispatch;
  const state = thunkAPI.getState();


  const rdt = getRdt();
  const gatewayApiClient = getGatewayApiClientOrThrow();
  console.log(state.radix.walletData.accounts, 'state.radix.walletData.accounts')
  if (rdt && state.radix.walletData.accounts.length > 0) {
    const token = state.pairSelector.token;

    // for (let token of tokens) {
      // separate balance fetching try/catch for each token
      try {
        let response = await gatewayApiClient.state.innerClient.entityFungibleResourceVaultPage(
              {
                stateEntityFungibleResourceVaultsPageRequest: {
                  address: state.radix.selectedAccount?.address,
                  resource_address: token.address || 'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc',
                },
              }
            );
      
        // if there are no items in response, set the balance to 0
        const balance = parseFloat(response?.items[0]?.amount || '0');
        dispatch(pairSelectorSlice.actions.setBalance({ balance, token }));
      } catch (error) {
        dispatch(pairSelectorSlice.actions.setBalance({ balance: 0, token }));
        throw new Error('Error getting data from Radix gateway');
      }
    // }
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
     
        state.token = { ...state.token, balance };
    },
    resetBalances: (state: PairSelectorState) => {
      delete state.token.balance;
    },
  },

  extraReducers: builder => {
    builder.addCase(fetchBalances.rejected, (state, action) => {
      state.token.balance = undefined;
      console.error(
        'pairSelector/fetchBalances rejected:',
        action.error.message
      );
    });
  },
});



