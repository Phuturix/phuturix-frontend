"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { OrderInput } from "@/components/OrderInput";
import { PairSelector } from "@/components/PairSelector";
import { fetchBalances, selectPair } from "@/state/pairSelectorSlice";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { randomIntFromInterval } from "./utils/index";
import { store } from "./state/store";
import { orderPerpSlice } from "./state/OrderPerpSlice";

export default function Trade() {
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const pairSelector = useAppSelector((state) => state.pairSelector);
  const pairsList = pairSelector.pairsList;

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(fetchBalances());
    }, 5000); // Dispatch every 5000 milliseconds (5 second)

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [dispatch]);

  useEffect(() => {
    if (pairsList.length > 0) {
      const pairToInit = searchParams.get("pair")?.split("-").join("/");
      const pair = pairsList.find(
        (pair) => pair.name.toUpperCase() === pairToInit?.toUpperCase()
      );
      if (pair) {
        dispatch(
          selectPair({ pairAddress: pair.address, pairName: pair.name })
        );
      }
    }
  }, [pairsList, dispatch, searchParams]);

  // Update orders of selected pair every 5 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(fetchBalances());
      // dispatch(fetchAccountHistory());
    }, 5000); // Dispatch every 5000 milliseconds (5 second)

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [dispatch]);


    useEffect(() => {

    const handleUpdate =  () => {
      const randomPrice = randomIntFromInterval(150, 4) /10000
       store.dispatch(orderPerpSlice.actions.updatePrice(randomPrice));
    };

    handleUpdate();


    const interval = setInterval(handleUpdate, 50000);

    return () => clearInterval(interval);
  }, []);


  return (
    <div className="grow">
      <div className="max-w-[1521px] m-auto border-x border-[#d0d0d01a]">
        <div className="grid-container">
          <div className="pairSelector">
            <PairSelector />
          </div>
          <div className="orderInput max-[850px]:p-5 max-[700px]:p-0 ">
            <OrderInput />
          </div>
        </div>
      </div>
    </div>
  );
}
