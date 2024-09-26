import React from "react";
import { useAppSelector } from "../hooks";
import { displayNumber } from "../utils";

export function PriceInfo() {
  const priceInfo = useAppSelector((state) => state.priceInfo);
  const noDigits = 4;
  const fixedDecimals = 3;
  const lastPrice = displayNumber(priceInfo.lastPrice, noDigits, fixedDecimals);
  const change = displayNumber(priceInfo.change24h, noDigits, fixedDecimals);
  const high = displayNumber(priceInfo.high24h, noDigits, fixedDecimals);
  const low = displayNumber(priceInfo.low24h, noDigits, fixedDecimals);
  const volume = displayNumber(priceInfo.value24h, noDigits, fixedDecimals);
  const isNegativeOrZero = priceInfo.isNegativeOrZero;
  const priceCurrency = "USD";

  return (
    <div className="flex flex-wrap justify-between items-center py-2 px-5 h-full max-w-[470px] min-[1026px]:m-auto max-[500px]:py-4 max-[500px]:justify-start">
      <PriceInfoItem
        title="price"
        valueStr={lastPrice}
        label={priceCurrency}
        color="text-grey-200"
      />
      <PriceInfoItem
        title="24h change"
        valueStr={isNegativeOrZero ? `${change} %` : `+${change} %`}
        label={""}
        color={isNegativeOrZero ? "text-red-500" : "text-grey-300"}
      />
      <PriceInfoItem
        title="24h volume"
        valueStr={volume}
        label={priceCurrency}
        color="text-grey-300"
      />
      <PriceInfoItem
        title="24h high"
        valueStr={high}
        label={priceCurrency}
        color="text-grey-300"
      />
      <PriceInfoItem
        title="24h low"
        valueStr={low}
        label={priceCurrency}
        color="text-grey-300"
      />
    </div>
  );
}



interface PriceInfoItemProps {
  title: string;
  valueStr: string;
  label: string;
  color: string;
}

function PriceInfoItem({ title, valueStr, label, color }: PriceInfoItemProps) {
  return (
    <div className="flex flex-col items-start justify-start max-[500px]:pr-5">
      <div className="text-sm text-gray-400 pt-1">{title}</div>
      <div className="flex">
        <p className={`text-sm font-bold ${color} mr-1`}>{valueStr}</p>
        <p className="text-sm text-gray-400"> {label}</p>
      </div>
    </div>
  );
}
