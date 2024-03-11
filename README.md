# Angle ERC20 List

[![Styled With Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://prettier.io/)

This repo contains a list of ERC20 tokens for which Angle-related front-end applications like [Merkl](https://merkl.angle.money) or [Angle Protocol app](https://app.angle.money) can display logos and essential information.

## Add a token to the list

All tokens are listed in `ERC20_LIST.json`.

To add a token to the token list:

- Add in `src/assets/tokens` a svg for the token logo with as a name for the file: `tokenSymbol.svg` (e.g for CRV: `CRV.svg`)
- Update the `ERC20_LIST.json` file with the token info in the place of the json file that corresponds to the chain on which this token exists:
  - Make sure that the token address is checksummed
  - Let the `hasPermit` and `useInSwap` options to false
  - You can use the following model and replace with the information relevant to the token:
  ```
      "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82": {
        "address": "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82",
        "name": "PancakeSwap Token",
        "decimals": 18,
        "symbol": "CAKE",
        "hasPermit": false,
        "useInSwap": false,
        "logoURI": "https://raw.githubusercontent.com/AngleProtocol/angle-token-list/main/src/assets/tokens/cake.svg"
      }
  ```

## `.json` Token List

The type for the tokens in the list is exactly as follows:

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

## Images guidelines

- 400px wide maximum
- If the file is vectorial, you can use SVG which is the most lightweight format. But sometimes, files are so complex than SVG can be heavier than JPG or PNG (if needs to manage transparency).
So please take care of having a visual which is no more than 70Ko (which is already a lot).