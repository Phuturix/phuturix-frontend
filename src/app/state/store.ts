import { configureStore } from '@reduxjs/toolkit';
import { pairSelectorSlice } from './pairSelectorSlice';
import { radixSlice } from './radixSlice';
import { priceInfoSlice } from './priceInfoSlice';
import { orderPerpSlice } from './orderPerpSlice';

export const store = configureStore({
  reducer: {
    radix: radixSlice.reducer,
    pairSelector: pairSelectorSlice.reducer,
    priceInfo: priceInfoSlice.reducer,
    perp: orderPerpSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
