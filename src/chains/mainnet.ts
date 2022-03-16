import { TokenInfo, TokenInfoListType } from "../types";

export const token_list: TokenInfoListType = {
  DAI: {
    name: "Dai Stablecoin",
    address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    decimals: 18,
    symbol: "DAI",
    isSanToken: false,
    hasPermit: false,
  },
  USDC: {
    name: "USD Coin",
    address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    decimals: 6,
    symbol: "USDC",
    isSanToken: false,
    hasPermit: true,
    permitVersion: "2",
  },
  FEI: {
    name: "Fei USD",
    address: "0x956F47F50A910163D8BF957Cf5846D573E7f87CA",
    decimals: 18,
    symbol: "USDC",
    isSanToken: false,
    hasPermit: true,
    permitVersion: "1",
  },
  FRAX: {
    name: "FRAX USD",
    address: "0x853d955aCEf822Db058eb8505911ED77F175b99e",
    decimals: 18,
    symbol: "FRAX",
    isSanToken: false,
    hasPermit: false,
  },
  sanUSDC_EUR: {
    name: "sanToken USDC_EUR",
    address: "0x9C215206Da4bf108aE5aEEf9dA7caD3352A36Dad",
    decimals: 6,
    symbol: "sanUSDC_EUR",
    isSanToken: false,
    hasPermit: true,
    permitVersion: "1",
  },
};
