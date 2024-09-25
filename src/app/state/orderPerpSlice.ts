import { PayloadAction, createSlice } from '@reduxjs/toolkit';
export enum OrderPerpType {
  LONG = 'LONG',
  SHORT = 'SHORT',
}
export interface PriceInfoState {
  leverage: number;
  value: number;
  balance: number;
  type: OrderPerpType;
}

const initialState: PriceInfoState = {
  leverage: 0,
  value: 0,
  balance: 10,
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



export const { updateValue, updateLeverage } = orderPerpSlice.actions;
