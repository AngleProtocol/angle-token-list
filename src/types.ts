import { ChainId } from "@angleprotocol/sdk";

export interface TokenInfo {
  readonly name: string;
  readonly address: string;
  readonly decimals: number;
  readonly symbol: string;
  readonly isSanToken: boolean;
  readonly hasPermit?: boolean;
  readonly logoURI?: string;
  readonly tags?: string[];
}

export interface TokenInfoListType {
  [symbol: string]: TokenInfo;
}

export interface TokenList {
  [chainId: number]: TokenInfoListType;
}
