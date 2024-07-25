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

- A token SVG file should be around 1ko or 2ko.
- But sometimes it has to be converted into JPG/PNG, so let's fix a **limit of 70Ko per file** (which is a lot).
- Reduce dimensions (in Figma) so that it fits a 400px square wide maximum (in 1x resolution, or 200px in 2x resolution).
- Throw the images in [ImageOptim](https://imageoptim.com/mac) to get the best compression/quality ratio.


### A few words about SVGs
SVG is a vectorial format and is the most lightweight format, except in two situations:

1. Some SVG files can contains so many vectors (such as Curve logo) that SVG can be heavier than JPG or PNG.
2. If you open the SVG file with a code editor, you might sometimes notice a data:image base64 tag with thousands of code lines, it means that a JPG/PNG is encapsulated inside the SVG. So the SVG is not actually vectorial.

In these two situations, you should convert the file into JPG or into PNG if it needs to support transparency.

### How to convert images?

1. Use Figma, and export the file in the good format.
2. Sometimes, the SVG doesn't show in Figma. In this case, use an online converter such as [SVGtoPNG](https://svgtopng.com/), and pay attention to the output so that the file isn't cropped.