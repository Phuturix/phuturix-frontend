export enum TokenE {
  SOL = "SOL",
  mSOL = "mSOL",
  stSOL = "stSOL",
  USDC = "USDC",
  USDT = "USDT",
}
export const TOKEN_LIST = [
  TokenE.SOL,
  TokenE.mSOL,
  TokenE.stSOL,
  TokenE.USDC,
  TokenE.USDT,
];

export function asToken(tokenStr: string): TokenE {
  switch (tokenStr) {
    case "SOL":
      return TokenE.SOL;
    case "mSOL":
      return TokenE.mSOL;
    case "stSOL":
      return TokenE.stSOL;
    case "USDC":
      return TokenE.USDC;
    case "USDT":
      return TokenE.USDT;
    default:
      throw new Error("Not a valid token string");
  }
}

export function getTokenLabel(token: TokenE) {
  switch (token) {
    case TokenE.SOL:
      return "Solana";
    case TokenE.USDC:
      return "UDC Coin";
    case TokenE.mSOL:
      return "Marinade Staked SOL";
    case TokenE.stSOL:
      return "Lido Staked SOL";
    case TokenE.USDT:
      return "USDT";
  }
}

export function getSymbol(token: TokenE) {
  switch (token) {
    case TokenE.SOL:
      return "SOLUSD";
    case TokenE.USDC:
      return "USDCUSD";
    case TokenE.USDT:
      return "USDTUSD";
  }
}

export function getTokenIcon(token: TokenE) {
    return   <img
              src="/coins/radix.svg"
              alt="radix Icon"
              className="w-6 h-6 rounded-full z-20"
            />
//   switch (token) {
//     case TokenE.SOL:
//       return <SolanaIconCircle />;
//     case TokenE.USDC:
//       return <UsdcIconCircle />;
//     case TokenE.mSOL:
//       return <MSolIconCircle />;
//     case TokenE.stSOL:
//       return <STSolIconCircle />;
//     case TokenE.USDT:
//       return <UsdtIconCircle />;
//   }
}

export function getTokenId(token: TokenE) {
  switch (token) {
    case TokenE.SOL:
      return "solana";
    case TokenE.mSOL:
      return "msol";
    case TokenE.stSOL:
      return "lido-staked-sol";
    case TokenE.USDC:
      return "usd-coin";
    case TokenE.USDT:
      return "tether";
  }
}

export function tokenAddressToToken(address: string): TokenE | null {
  switch (address) {
    case "So11111111111111111111111111111111111111112":
      return TokenE.SOL;
    case "mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So":
      return TokenE.mSOL;
    case "7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj":
      return TokenE.stSOL;
    // case "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU":
    case "Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr":
      return TokenE.USDC;
    case "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB":
      return TokenE.USDT;
    case "4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R":
    default:
      return null;
  }
}

export function getTokenAddress(token: TokenE) {
  switch (token) {
    case TokenE.SOL:
      return "So11111111111111111111111111111111111111112";
    case TokenE.mSOL:
      return "mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So";
    case TokenE.stSOL:
      return "7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj";
    case TokenE.USDC:
      // return "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU";
      return "Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr";
    case TokenE.USDT:
      return "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB";
  }
}
