import { configureStore } from "@reduxjs/toolkit";
import { pairSelectorSlice } from "./pairSelectorSlice";
import { orderBookSlice } from "./orderBookSlice";
import { priceChartSlice } from "./priceChartSlice";
import { radixSlice } from "./radixSlice";
import { rewardSlice } from "./rewardSlice";
import { priceInfoSlice } from "./priceInfoSlice";
import { orderPerpSlice } from "./orderPerpSlice";

export const store = configureStore({
  reducer: {
    radix: radixSlice.reducer,
    pairSelector: pairSelectorSlice.reducer,
    orderBook: orderBookSlice.reducer,
    priceChart: priceChartSlice.reducer,
    priceInfo: priceInfoSlice.reducer,
    rewardSlice: rewardSlice.reducer,
    perp: orderPerpSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
