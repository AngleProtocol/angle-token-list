# Angle Protocol ERC20 List

[![Styled With Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://prettier.io/)

## `.json` Token List

All tokens are listed in `ERC20_LIST.json` and should be typed as follows:

```
interface TokenInfo {
  readonly name: string;
  readonly address: string;
  readonly decimals: number;
  readonly symbol: string;
  readonly isSanToken: boolean;
  readonly useInSwap?: boolean;
  readonly hasPermit?: boolean;
  readonly permitVersion?: string;
  readonly logoURI?: string;
  readonly tags?: string[];
  readonly description?: string;
}
```

## [WIP] Angle ERC20 list

Create npm package to handle Angle ERC20 list accross different chains.
