import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
export enum OrderPerpType {
    LONG = 'LONG',
    SHORT = 'SHORT',
}
export interface PriceInfoState {
    leverage: number;
    value: number;
    type: OrderPerpType;
}

const initialState: PriceInfoState = {
    leverage: 1,
    value: 0,
    type: OrderPerpType.LONG,
};

export const orderPerpSlice = createSlice({
    name: 'orderPerp',
    initialState,
    reducers: {
        updateValue: (state, action: PayloadAction<number>) => {
            state.value = action.payload;
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
export const selectLastPrice = (state: RootState) => state.priceInfo.lastPrice;

export const { updateValue, updateLeverage } = orderPerpSlice.actions;
