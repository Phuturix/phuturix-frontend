import { TokenInfo } from "alphadex-sdk-js";

export function getLocaleSeparators(): {
  decimalSeparator: string;
  thousandsSeparator: string;
} {
  return {
    decimalSeparator: '.',
    thousandsSeparator: ' ',
  };
}

export enum RoundType {
  UP = 'UP', // rounds away from zero
  DOWN = 'DOWN', // rounds towards zero
  NEAREST = 'NEAREST', // rounds to the nearest
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

