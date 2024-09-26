import { Side } from '@/lib/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface PriceInfoState {
    leverage: number;
    price?: number;
    margin?: number;
    totalPosValue?: number
    type: Side;
}

const initialState: PriceInfoState = {
    leverage: 1,
    type: Side.LONG,
};

export const orderPerpSlice = createSlice({
    name: 'orderPerp',
    initialState,
    reducers: {
        updatePrice: (state, action: PayloadAction<number>) => {
            state.price = action.payload;
        },
        updateLeverage: (state, action: PayloadAction<number>) => {
            state.leverage = action.payload;
        },
        updateOrderType: (state, action: PayloadAction<Side>) => {
            state.type = action.payload;
        },
        updateMargin: (state, action: PayloadAction<number>) => {
            state.margin = action.payload;
        },
        updateTotalPosition: (state, action: PayloadAction<number>) => {
            state.totalPosValue = action.payload;
        },
    },
});

// Get last price

export const { updatePrice, updateLeverage } = orderPerpSlice.actions;
