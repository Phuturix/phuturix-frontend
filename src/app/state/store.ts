import { configureStore } from "@reduxjs/toolkit";
import { pairSelectorSlice } from "./pairSelectorSlice";
import { orderBookSlice } from "./orderBookSlice";
import { radixSlice } from "./radixSlice";
import { teamSlice } from "./teamSlice";
import { orderPerpSlice } from "./OrderPerpSlice";

export const store = configureStore({
  reducer: {
    radix: radixSlice.reducer,
    pairSelector: pairSelectorSlice.reducer,
    orderBook: orderBookSlice.reducer,
    perp: orderPerpSlice.reducer,
    teamSlice: teamSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
