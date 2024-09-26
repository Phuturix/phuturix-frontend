import * as adex from "alphadex-sdk-js";
import { TokenInfo } from "./state/pairSelectorSlice";
import type { OrderReceipt } from "alphadex-sdk-js";


export function getLocaleSeparators(): {
  decimalSeparator: string;
  thousandsSeparator: string;
} {
  return {
    decimalSeparator: ".",
    thousandsSeparator: " ",
  };
}

export function displayNumber(
  x: number,
  nbrOfDigits: number = 6,
  fixedDecimals: number = -1
): string {
  if (nbrOfDigits < 4) {
    return "ERROR: displayAmount cannot work with nbrOfDigits less than 4";
  }

  const { decimalSeparator, thousandsSeparator } = getLocaleSeparators();

  if (x < 1) {
    let roundedNumber = roundTo(x, nbrOfDigits - 2, RoundType.DOWN);
    if (fixedDecimals >= 0 && fixedDecimals <= nbrOfDigits - 2) {
      return roundedNumber.toFixed(fixedDecimals);
    } else {
      return roundedNumber.toString();
    }
  }
  let numberStr = x.toString();
  let wholeNumber = Math.trunc(x);
  let wholeNumberStr = wholeNumber.toString();
  let numberOfSeparators = Math.trunc((wholeNumberStr.length - 1) / 3);
  if (thousandsSeparator != "" && numberOfSeparators > 0) {
    let firstSeparator = wholeNumberStr.length % 3;
    if (firstSeparator == 0) {
      firstSeparator = 3;
    }
    let lastSeparator = firstSeparator + 3 * (numberOfSeparators - 1);
    for (let i = lastSeparator; i > 0; i = i - 3) {
      wholeNumberStr =
        wholeNumberStr.slice(0, i) +
        thousandsSeparator +
        wholeNumberStr.slice(i);
    }
    // console.log("WholeNumberStr: " + wholeNumberStr);
  }
  if (
    wholeNumberStr.length === nbrOfDigits ||
    wholeNumberStr.length === nbrOfDigits - 1
  ) {
    return wholeNumberStr;
  } else {
    if (wholeNumberStr.length < nbrOfDigits) {
      const noDecimals = nbrOfDigits - wholeNumberStr.length;

      let decimalsStr = numberStr.split(decimalSeparator)[1];
      decimalsStr = decimalsStr
        ? decimalsStr.substring(0, noDecimals - 1).replace(/0+$/, "")
        : "";
      if (fixedDecimals >= 0) {
        if (decimalsStr.length > fixedDecimals) {
          decimalsStr = decimalsStr.substring(0, fixedDecimals);
        } else {
          decimalsStr =
            decimalsStr +
            "0".repeat(
              Math.min(fixedDecimals, noDecimals - 1) - decimalsStr.length
            );
        }
      }
      if (decimalsStr) {
        decimalsStr = decimalSeparator + decimalsStr;
      }
      return wholeNumberStr + decimalsStr;
    } else {
      let excessLength = wholeNumberStr.length - nbrOfDigits + 1;
      let excessRemainder = excessLength % 4;
      let excessMultiple = Math.trunc(excessLength / 4);
      let displayStr = wholeNumberStr.slice(0, nbrOfDigits - 1);
      switch (excessRemainder) {
        case 0:
          if (excessMultiple > 0) {
            excessMultiple = excessMultiple - 1;
          }
          break;
        case 1:
          displayStr =
            displayStr.slice(0, -3) + decimalSeparator + displayStr.slice(-2);
          break;
        case 2:
          displayStr =
            displayStr.slice(0, -2) + decimalSeparator + displayStr.slice(-1);
          break;
        case 3:
          displayStr = displayStr.slice(0, -1);
          break;
      }
      switch (excessMultiple) {
        case 0:
          displayStr = displayStr + "K";
          break;
        case 1:
          displayStr = displayStr + "M";
          break;
        case 2:
          displayStr = displayStr + "B";
          break;
        case 3:
          displayStr = displayStr + "T";
          break;
        default:
          displayStr = displayStr + "G";
          break;
      }
      return displayStr;
    }
  }
}

export enum RoundType {
  UP = "UP", // rounds away from zero
  DOWN = "DOWN", // rounds towards zero
  NEAREST = "NEAREST", // rounds to the nearest
}

// utility function to round a number to a specified number of decimals
export function roundTo(
  x: number, // the number to be rounded
  decimals: number, // the number of decimals to be rounded to
  roundType: RoundType = RoundType.NEAREST // the method of rounding
): number {
  let result = x;
  if (decimals > 10) {
    decimals = 10;
  }
  switch (roundType) {
    case RoundType.NEAREST: {
      result = Math.round(x * 10 ** decimals) / 10 ** decimals;
      break;
    }
    case RoundType.UP: {
      if (x > 0) {
        result = Math.ceil(x * 10 ** decimals) / 10 ** decimals;
      } else {
        result = Math.floor(x * 10 ** decimals) / 10 ** decimals;
      }
      break;
    }
    case RoundType.DOWN: {
      if (x > 0) {
        result = Math.floor(x * 10 ** decimals) / 10 ** decimals;
      } else {
        result = Math.ceil(x * 10 ** decimals) / 10 ** decimals;
      }
      break;
    }
  }
  return result;
}


// Replace DEXTR iconUrl with coingecko hosted url.
export function updateIconIfNeeded(token: adex.TokenInfo): TokenInfo {
  const iconUrl =
    token.symbol === "DEXTR"
      ? // use asset from coingecko to prevent ipfs failure
        "https://assets.coingecko.com/coins/images/34946/standard/DEXTRLogo.jpg"
      : token.symbol === "RDK"
      ? // fix wrong icon URL in metadata ofRDK on ledger, see https://t.me/radix_dlt/716425
        "https://radket.shop/img/logo.svg"
      : token.symbol === "EDG"
      ? // use smaller version to save bandwidth
        "coins/EDG-100x100.png"
      : token.symbol === "HNY"
      ? // use smaller version to save bandwidth
        "coins/HNY-100x100.png"
      : token.iconUrl;

  return {
    ...token,
    iconUrl,
  };
}


export function capitalizeFirstLetter(input: string): string {
  return input.charAt(0).toUpperCase() + input.slice(1);
}

// Gets amount precision for each token traded on dexteronradix.
// Note: precision for price is different.
export function getPrecision(input: string): number {
  return (
    {
      XRD: 2,
      DEXTR: 2,
      CASSIE: 0,
      CAVIAR: 2,
      DFP2: 2,
      DGC: 0,
      FLOOP: 5,
      HUG: 0,
      MNI: 0,
      OCI: 2,
      PLANET: 0,
      RDK: 0,
      WEFT: 2,
      XRAW: 0,
      XUSDC: 2,
    }[input.toUpperCase()] || 2
  );
}

export function formatNumericString(
  value: string,
  separator: string,
  scale: number
): string {
  const regex = separator === "." ? /[^\d.-]/g : /[^\d,-]/g;
  let formattedValue = value.replace(regex, "");
  // Ensure only the first occurrence of the separator is allowed
  const parts = formattedValue.split(separator);
  if (parts.length > 2) {
    // Rejoin with a single separator, discarding additional separators
    formattedValue = parts[0] + separator + parts.slice(1).join("");
  }
  // Allow a trailing separator for user input
  if (formattedValue.endsWith(separator)) {
    return formattedValue;
  }
  // Split and limit fraction scale as before
  let [whole, fraction] = formattedValue.split(separator);
  if (fraction && fraction.length > scale) {
    fraction = fraction.substring(0, scale);
  }
  return fraction ? `${whole}${separator}${fraction}` : whole;
}

// Define an enum for the operating system types
export enum OperatingSystem {
  MAC = "MAC",
  WINDOWS = "WINDOWS",
  LINUX = "LINUX",
  UNKNOWN = "UNKNOWN",
}
export function truncateWithPrecision(num: number, precision: number): number {
  const split = num.toString().split(".");
  if (split.length !== 2) {
    return num;
  }
  const [part1, part2] = split;
  return Number(`${part1}.${part2.substring(0, precision)}`);
}

// Mimicks function .toFixed(n) but always rounds down and returns a number (not a string)
export function toFixedRoundDown(number: number, decimals: number): number {
  if (decimals < 0) {
    throw new Error("Precision cannot be negative");
  }
  let numberParts = number.toString().split(".");
  // If there's no decimal part or decimals is zero, just return the integer part
  if (numberParts.length === 1 || decimals === 0) {
    return Number(numberParts[0]);
  }
  let integerPart = numberParts[0];
  let decimalPart = numberParts[1].substring(0, decimals);
  // Ensure the decimal part has enough digits
  if (decimalPart.length < decimals) {
    decimalPart = decimalPart + "0".repeat(decimals - decimalPart.length);
  }
  return Number(integerPart + "." + decimalPart);
}

// SHortens radix wallet address
export function shortenWalletAddress(address: string): string {
  // minimal length is 35 chars
  if (address.length < 35) {
    return address;
  }
  const firstPart = address.slice(0, 8);
  const lastPart = address.slice(-20);
  return `${firstPart}...${lastPart}`;
}




import { Side } from "@/lib/types";

export function randomIntFromInterval(min: number, max: number) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}


export function calculateFeeToOpenPosition(price: number, quantity: number, fee: number) {
  return price * quantity * fee
}

export function calculateLiquidationPrice(price: number, leverage: number, side: Side, maintenance_margin: number) {
  if (side === Side.Long) {
    price / ((1 + (1 / leverage) + maintenance_margin))
  } else {
    price / ((1 - (1 / leverage) + maintenance_margin))

  }
//Liquidation Price = 3500 / (1 + ((1 / 10) + 0.0015) - 0.00575)
  
  // Liquidation Price = Entry_Price / (1 + initMargin - maintenanceMargin)
  // price / (1 + 1 / leverage)
// Calculate liquidation distance in percentage = 100 / Leverage Ratio(100 / 65 = 1.54 %)

// Calculate the liquidation distance in price = Current Asset Price x Distance In Percentage($233 x 0.0154 % = $3.60)

// Calculate the liquidation price = Current Asset Price – Liquidation Price Distance($233 – $3.60 = $229.40)



}
