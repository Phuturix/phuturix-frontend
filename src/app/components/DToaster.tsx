/**
 * Wrapper component and service for 'react-hot-toast' notifications
 * to generate radix branded toast notifications.
 * https://react-hot-toast.com/
 */

import { Toaster, toast, ToastPosition } from 'react-hot-toast';

// Styling for toastOptions
const fontSize = '1rem';
const padding = '8px';
const radixGreen = '#CAFC40';
const radixRed = '#D22D2D';
const radixBG = '#232629';
const almostWhite = '#FFFAEE';
const grey = '#74787b';

const toastOptions = {
  loading: {
    style: {
      fontSize: fontSize,
      background: radixBG,
      border: '1px solid rgba(255,255,255,0.2)',
      padding: padding,
      color: almostWhite,
    },
    iconTheme: {
      primary: grey,
      secondary: almostWhite,
    },
  },
  success: {
    style: {
      fontSize: fontSize,
      background: radixBG,
      border: '1px solid rgba(255,255,255,0.2)',
      padding: padding,
      color: almostWhite,
    },
    iconTheme: {
      primary: radixGreen,
      secondary: radixBG,
    },
  },
  error: {
    style: {
      fontSize: fontSize,
      background: radixRed,
      padding: padding,
      color: almostWhite,
    },
    iconTheme: {
      primary: almostWhite,
      secondary: radixRed,
    },
  },
};

interface DToasterProps {
  toastPosition: string;
}

export function DToaster(props: DToasterProps) {
  return (
    <>
      <Toaster
        toastOptions={toastOptions}
        position={props.toastPosition as ToastPosition}
      />
    </>
  );
}

/**
 * Wrapper that exposes toaster API for internal usage
 */
export const DToads = {
  success(message: string) {
    toast.success(message);
  },

  error(message: string) {
    toast.error(message);
  },

  promise<T>(
    func: () => Promise<T>,
    loadingMsg: string,
    successMsg: string,
    errorMsg: string
  ) {
    toast.promise(
      (async () => {
        try {
          await func(); // Await the original function's promise
        } catch (error) {
          throw error; // Ensure errors are propagated
        }
      })(),
      {
        loading: loadingMsg,
        success: successMsg,
        error: errorMsg,
      }
    );
  },
};
