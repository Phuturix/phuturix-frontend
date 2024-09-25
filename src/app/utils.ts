export function getLocaleSeparators(): {
  decimalSeparator: string;
  thousandsSeparator: string;
} {
  return {
    decimalSeparator: '.',
    thousandsSeparator: ' ',
  };
}

export function displayNumber(
  x: number,
  nbrOfDigits: number = 6,
  fixedDecimals: number = -1
): string {
  if (nbrOfDigits < 4) {
    return 'ERROR: displayAmount cannot work with nbrOfDigits less than 4';
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
  if (thousandsSeparator != '' && numberOfSeparators > 0) {
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
        ? decimalsStr.substring(0, noDecimals - 1).replace(/0+$/, '')
        : '';
      if (fixedDecimals >= 0) {
        if (decimalsStr.length > fixedDecimals) {
          decimalsStr = decimalsStr.substring(0, fixedDecimals);
        } else {
          decimalsStr =
            decimalsStr +
            '0'.repeat(
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
          displayStr = displayStr + 'K';
          break;
        case 1:
          displayStr = displayStr + 'M';
          break;
        case 2:
          displayStr = displayStr + 'B';
          break;
        case 3:
          displayStr = displayStr + 'T';
          break;
        default:
          displayStr = displayStr + 'G';
          break;
      }
      return displayStr;
    }
  }
}

export enum RoundType {
  UP = 'UP', // rounds away from zero
  DOWN = 'DOWN', // rounds towards zero
  NEAREST = 'NEAREST', // rounds to the nearest
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



// Gets amount precision for each token traded on radixonradix.
// Note: precision for price is different.
export function getPrecision(input: string): number {
  return (
    {
      XRD: 2,
      XUSDC: 2,
    }[input.toUpperCase()] || 2
  );
}

export function formatNumericString(
  value: string,
  separator: string,
  scale: number
): string {
  const regex = separator === '.' ? /[^\d.-]/g : /[^\d,-]/g;
  let formattedValue = value.replace(regex, '');
  // Ensure only the first occurrence of the separator is allowed
  const parts = formattedValue.split(separator);
  if (parts.length > 2) {
    // Rejoin with a single separator, discarding additional separators
    formattedValue = parts[0] + separator + parts.slice(1).join('');
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
  MAC = 'MAC',
  WINDOWS = 'WINDOWS',
  LINUX = 'LINUX',
  UNKNOWN = 'UNKNOWN',
}

// Function to detect the users operating system based on navigator
export function detectOperatingSystem(): OperatingSystem {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return OperatingSystem.UNKNOWN;
  }
  const userAgent = navigator.userAgent.toLowerCase();
  if (userAgent.includes('mac os')) {
    return OperatingSystem.MAC;
  } else if (userAgent.includes('windows')) {
    return OperatingSystem.WINDOWS;
  } else if (userAgent.includes('linux')) {
    return OperatingSystem.LINUX;
  } else {
    return OperatingSystem.UNKNOWN;
  }
}

export function truncateWithPrecision(num: number, precision: number): number {
  const split = num.toString().split('.');
  if (split.length !== 2) {
    return num;
  }
  const [part1, part2] = split;
  return Number(`${part1}.${part2.substring(0, precision)}`);
}

// Detects mobile devices
export function isMobile(): boolean {
  const userAgent = navigator.userAgent.toLowerCase();
  if (
    userAgent.match(/Android/i) ||
    userAgent.match(/webOS/i) ||
    userAgent.match(/avantgo/i) ||
    userAgent.match(/iPhone/i) ||
    userAgent.match(/iPad/i) ||
    userAgent.match(/iPod/i) ||
    userAgent.match(/BlackBerry/i) ||
    userAgent.match(/bolt/i) ||
    userAgent.match(/Windows Phone/i) ||
    userAgent.match(/Phone/i)
  ) {
    return true;
  }
  return false;
}

// Sets a URL query parameter and updates the browser's history state
// without triggering a reload of the page.
export function setQueryParam(key: string, value: string) {
  if (!window) {
    return;
  }
  const url = new URL(window.location.href);
  url.searchParams.set(key, value);
  history.pushState({}, '', url);
}


export function shortenWalletAddress(address: string): string {
  // minimal length is 35 chars
  if (address.length < 35) {
    return address;
  }
  const firstPart = address.slice(0, 8);
  const lastPart = address.slice(-20);
  return `${firstPart}...${lastPart}`;
}

