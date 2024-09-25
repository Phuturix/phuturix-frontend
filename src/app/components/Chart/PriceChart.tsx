import { createChart } from "lightweight-charts";
import React, { useState, useEffect, useRef } from "react";
// import {
//   CANDLE_PERIODS,
//   OHLCVData,
//   setCandlePeriod,
//   handleCrosshairMove,
//   initializeLegend,
//   initialPriceChartState,
// } from "../state/priceChartSlice";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { displayNumber } from "@/utils";

interface PriceChartProps {
  data: any[];
  candlePrice: any | null;
  change: number | null;
  percChange: number | null;
  volume: number | null;
}

function PriceChartCanvas(props: PriceChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const legendRef = useRef<HTMLDivElement>(null);
//   const currency = useAppSelector((state) => state.pairSelector.token2.symbol);
  const dispatch = useAppDispatch();
  const { data, candlePrice } = props;
  const isLoading = data.length === 0;
  //displayTime offsets by local timezone, causing discrepancy on chart
  const candleDate = new Date(
    parseInt(candlePrice?.time.toString() || "") * 1000
  ).toUTCString();

  const theme = 'dark'

  const nbrOfDigits = 8;
  const currencyPrecision = 2;

  const volume = displayNumber(props.volume || 0, nbrOfDigits, 2);
  const percChange = displayNumber(props.percChange || 0, nbrOfDigits, 2);
  const percChangeFormatted = ` ${
    props.change && props.change > 0 ? "+" : ""
  }${percChange} %`;

  const candleOpen = displayNumber(
    candlePrice?.open || 0,
    nbrOfDigits,
    currencyPrecision
  );

  const candleHigh = displayNumber(
    candlePrice?.high || 0,
    nbrOfDigits,
    currencyPrecision
  );

  const candleLow = displayNumber(
    candlePrice?.low || 0,
    nbrOfDigits,
    currencyPrecision
  );

  const candleClose = displayNumber(
    candlePrice?.close || 0,
    nbrOfDigits,
    currencyPrecision
  );

  useEffect(() => {
    const chartContainer = chartContainerRef.current;

    if (data && data.length > 0) {
    //   dispatch(initializeLegend());
    }

    if (chartContainer) {
      const handleResize = () => {
        // hacky way to fix resizing issue. This is heavily dependant on the
        // grid area breakpoints, so whenever you change grid area, this
        // needs to be adapted too. This is not ideal and should be fixed.
        // TODO: fix price chart container so this code is not needed anymore.
        const adaptForPadding = 15 * 2; // 15px padding on each side
        const priceChartSize =
          window.innerWidth <= 850
            ? window.innerWidth
            : window.innerWidth <= 1025
            ? window.innerWidth - 300
            : window.innerWidth <= 1350
            ? window.innerWidth - 2 * 260
            : Math.min(921, window.innerWidth - 600);
        chart.applyOptions({ width: priceChartSize - adaptForPadding });
        // // OLD CODE
        // chart.applyOptions({ width: chartContainer.clientWidth });
      };
      const vh = window.innerHeight;
      const promoCarouselExists =
        document.querySelector(".promo-banner") !== null;
      const spaceTaken = promoCarouselExists ? 150 + 64 : 150;
      const chartHeight = Math.min(vh - spaceTaken, 550);
      const chart = createChart(chartContainer, {
        width: chartContainer.clientWidth,
        height: chartHeight,
        layout: {

          textColor: "secondary-content"
        },
        // grid: {
        //   vertLines: { color: theme["base-100"] },
        //   horzLines: { color: theme["base-100"] },
        // },
        // timeScale: {
        //   borderColor: theme["base-100"],
        //   timeVisible: true,
        // },
        // crosshair: {
        //   vertLine: {
        //     color: theme["accent"],
        //     labelBackgroundColor: theme["accent"],
        //   },
        //   horzLine: {
        //     color: theme["accent"],
        //     labelBackgroundColor: theme["accent"],
        //   },
        // },
      });

      const clonedData = JSON.parse(JSON.stringify(data));

      // OHLC
      const ohlcSeries = chart.addCandlestickSeries({
        priceLineVisible: false,
        lastValueVisible: false,
      });
      ohlcSeries.setData(clonedData);

      ohlcSeries.applyOptions({
        // borderUpColor: theme["radix-green"],
        // wickUpColor: theme["radix-green"],
        // upColor: theme["radix-green"],
        // borderDownColor: theme["radix-red"],
        // wickDownColor: theme["radix-red"],
        // downColor: theme["radix-red"],
      });

      chart.priceScale("right").applyOptions({
        // borderColor: theme["base-100"],
        scaleMargins: {
          top: 0.1,
          bottom: 0.3,
        },
      });

      // Volume Initialization
      const volumeSeries = chart.addHistogramSeries({
        priceLineVisible: false,
        lastValueVisible: false,
        priceFormat: {
          type: "volume",
        },
        priceScaleId: "volume",
      });

      volumeSeries.setData(
        data.map((datum) => ({
          ...datum,
        //   color:
        //     datum.close - datum.open < 0
        //       ? theme["radix-red"]
        //       : theme["radix-green"],
        }))
      );

      chart.priceScale("volume").applyOptions({
        scaleMargins: {
          top: 0.8,
          bottom: 0.01,
        },
      });

//       //Crosshair Data for legend
//     //   dispatch(handleCrosshairMove(chart, data, volumeSeries));

//       //Prevent Chart from clipping
//       const chartDiv = chartContainer.querySelector(".tv-lightweight-charts");
//       if (chartDiv) {
//         (chartDiv as HTMLElement).style.overflow = "visible";
//       }

//       window.addEventListener("resize", handleResize);

//       // Configure chart candles to have max-width of 13px
//       const totalCandles = clonedData.length;
//       const chartWidth =
//         document.querySelector(".chart-container-ref")?.clientWidth || 600;
//       const minCandleWidth = 13; // in px
//       const nbrOfCandlesToDisply = Math.min(chartWidth / minCandleWidth); //chartWidth / ;
//       chart.timeScale().setVisibleLogicalRange({
//         from: Math.max(totalCandles - nbrOfCandlesToDisply),
//         to: totalCandles,
//       });

//       return () => {
//         window.removeEventListener("resize", handleResize);
//         chart.remove();
//       };
//     }
//   }, [data, theme, dispatch]);
//   //Temporary brute force approach to trim the top of the chart to remove the gap
//   return (
//     <div>
//       <div
//         ref={chartContainerRef}
//         className="relative mt-[-1.7rem] w-full chart-container-ref"
//       >
//         <div
//           ref={legendRef}
//           className={
//             "absolute font-bold text-xs text-left text-secondary-content mt-3 z-20 " +
//             (isLoading
//               ? "hidden"
//               : props.change && props.change < 0
//               ? "!text-radix-red"
//               : "!text-radix-green")
//           }
//         >
//           <div className="flex justify-start gap-x-6 text-xs font-medium">
//             <div className="text-secondary-content">{candleDate}</div>
//             <div className="text-xs font-medium">
//               <span className="text-secondary-content">Change</span>
//               {percChangeFormatted}
//             </div>
//             <div className="text-xs font-medium">
//               <span className="text-secondary-content">Volume</span> {volume}
//             </div>
//           </div>
//           <div className="flex justify-start gap-x-6">
//             <div className="text-xs font-medium">
//               <span className="text-secondary-content">Open </span>
//               {candleOpen}
//             </div>
//             <div className="text-xs font-medium">
//               <span className="text-secondary-content">High </span>
//               {candleHigh}
//             </div>
//             <div className="text-xs font-medium">
//               <span className="text-secondary-content">Low </span>
//               {candleLow}
//             </div>
//             <div className="text-xs font-medium">
//               <span className="text-secondary-content">Close </span>
//               {candleClose}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// enum ChartOrInfoTabOptions {
//   CHART = "CHART",
//   INFO = "INFO",
// }

// export function ChartOrInfo() {
//   const dispatch = useAppDispatch();
//   const candlePeriod = useAppSelector((state) => '1d')


//   // Set default candlePeriod state as defined in initialState of priceChartSlice
// //   useEffect(() => {
// //     // dispatch(setCandlePeriod(initialPriceChartState.candlePeriod));
// //   }, [dispatch]);

// const [currentTab, setCurrentTab] = useState(ChartOrInfoTabOptions.CHART);

//   return (
//     <div>
//       <div className="flex flex-col sm:flex-row justify-between sm:pr-10 pr-4 border-b-[0.5px] border-b-[rgba(255,255,255,0.1)]">
//         <div className="flex space-x-4 sm:space-x-5 pb-0 pt-2">
//           {[
//             ["chart", ChartOrInfoTabOptions.CHART],
//             ["info", ChartOrInfoTabOptions.INFO],
//           ].map(([title, tab], indx) => {
//             const isActive = tab === currentTab;
//             return (
//               <span
//                 key={indx}
//                 className={`text-base pb-2 sm:pb-3 px-2 ${
//                   isActive
//                     ? "text-radix-green-OG border-b border-[#cafc40]"
//                     : "text-[#768089]"
//                 } cursor-pointer`}
//                 onClick={() => setCurrentTab(tab as ChartOrInfoTabOptions)}
//               >
//                 {title}
//               </span>
//             );
//           })}
//         </div>
//         {/* {currentTab === ChartOrInfoTabOptions.CHART && (
//           <div className="flex flex-wrap items-center justify-start sm:justify-end mt-2 sm:mt-0">
//             {CANDLE_PERIODS.map((period) => (
//               <button
//                 key={period}
//                 className={`btn btn-xs sm:btn-sm text-secondary-content focus-within:outline-none ${
//                   candlePeriod === period
//                     ? "!text-primary-content underline underline-offset-8 decoration-accent"
//                     : ""
//                 }`}
//                 onClick={() => dispatch(setCandlePeriod(period))}
//               >
//                 {t(period)}
//               </button>
//             ))}
//           </div>
//         )} */}
//       </div>
//       <div className="mt-4">
//         {currentTab === ChartOrInfoTabOptions.CHART && <Chart />}
//         {/* {currentTab === ChartOrInfoTabOptions.INFO && <Info />} */}
//       </div>
//     </div>
//   );
// }

// export function Chart() {
//   const state = useAppSelector((state) => state.priceChart);
//   console.log(state, 'state')
//   const candlePrice = useAppSelector(
//     (state) => state.priceChart.legendCandlePrice
//   );
//   const change = useAppSelector((state) => state.priceChart.legendChange);
//   const percChange = useAppSelector(
//     (state) => state.priceChart.legendPercChange
//   );
//   const currentVolume = useAppSelector(
//     (state) => state.priceChart.legendCurrentVolume
//   );

//   return (
//     <>
//       <PriceChartCanvas
//         data={state.ohlcv}
//         candlePrice={candlePrice}
//         change={change}
//         percChange={percChange}
//         volume={currentVolume}
//       />
//     </>
//   );
// }




// export default ChartOrInfo;
