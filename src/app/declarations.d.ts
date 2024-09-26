/* eslint-disable @typescript-eslint/no-unused-vars */

interface Window {
  transactionPreviewModal: {
    showModal: () => void;
  };
}

namespace JSX {
  interface IntrinsicElements {
    "radix-connect-button": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    >;
  }
}
