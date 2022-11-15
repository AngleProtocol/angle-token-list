import { TokenList, joiSchema } from "./types";
import ERC20_LIST from "../ERC20_LIST.json";
import { inspect } from "util";
import { utils } from "ethers";
import { ChainId } from "@angleprotocol/sdk";

export const TOKEN_LIST: TokenList = ERC20_LIST[0];

const result = joiSchema.validate(TOKEN_LIST);
for (const chainId of Object.keys(TOKEN_LIST)) {
  for (const key of Object.keys(TOKEN_LIST[parseFloat(chainId)])) {
    if (utils.getAddress(key) !== key) {
      console.log(key, utils.getAddress(key));
      throw new Error("wrong JSON format");
    }
  }
}
if (result.error) {
  console.log(
    inspect(result.error, { showHidden: false, depth: null, colors: true })
  );
  throw new Error("wrong JSON format");
} else {
  console.log("all good");
}
