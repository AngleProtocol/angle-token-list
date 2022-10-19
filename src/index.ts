import { TokenList, joiSchema } from "./types";
import erc20s from "../ERC20_LIST.json";
import { inspect } from "util";
import { utils } from "ethers";

export const TOKEN_LIST: TokenList[] = erc20s;

const result = joiSchema.validate(TOKEN_LIST);
for (const chainId of Object.keys(TOKEN_LIST[0])) {
  for (const key of Object.keys(TOKEN_LIST[0][parseInt(chainId)])) {
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
