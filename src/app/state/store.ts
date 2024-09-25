import { configureStore } from '@reduxjs/toolkit';
import { radixSlice } from './radixSlice';
import { orderPerpSlice } from './orderPerpSlice';
import { tokenInfoSlice } from './tokenInfo';
import { pairSelectorSlice } from "./pairSelectorSlice";
import { priceInfoSlice } from "./priceInfoSlice";

export const store = configureStore({
  reducer: {
    radix: radixSlice.reducer,
    tokenInfo: tokenInfoSlice.reducer,
    perp: orderPerpSlice.reducer,
    pairSelector: pairSelectorSlice.reducer,
    priceInfo: priceInfoSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
