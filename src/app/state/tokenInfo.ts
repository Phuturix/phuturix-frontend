import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface TokenInfo {
    balance?: number;
    address?: string;
    symbol?: string;
    name?: string
    iconUrl?: string;
}

const initialState: TokenInfo = {
    balance: 0,
};

export const tokenInfoSlice = createSlice({
    name: 'tokenInfo',
    initialState,
    reducers: {
        updateTokenBalance: (state, action: PayloadAction<number>) => {
            state.balance = action.payload;
        },
    },
});



export const { updateTokenBalance } = tokenInfoSlice.actions;
