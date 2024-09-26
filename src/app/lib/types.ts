
export enum TokenE {
    XRD = "XRD",
}

export enum TokenId {
    XRD = "radix",
}

export enum Side {
    Long = "Long",
    Short = "Short",
}

export enum Tab {
    Add,
    Remove,
}

export class TradeSide {
    static Long = { long: {} };
    static Short = { short: {} };
}


export interface PriceStat {
    change24hr: number;
    currentPrice: number;
    high24hr: number;
    low24hr: number;
}

export type PriceStats = Record<TokenE, PriceStat>;
