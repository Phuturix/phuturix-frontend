import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
export enum OrderPerpType {
    LONG = 'LONG',
    SHORT = 'SHORT',
}
export interface PriceInfoState {
    leverage: number;
    price: number;
    value: number;
    type: OrderPerpType;
}

const initialState: PriceInfoState = {
    leverage: 1,
    price: 0,
    value:0,
    type: OrderPerpType.LONG,
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
        updateOrderType: (state, action: PayloadAction<OrderPerpType>) => {
            state.type = action.payload;
        },
    },
});

// Get last price

export const { updatePrice, updateLeverage } = orderPerpSlice.actions;
