import { TokenList, joiSchema } from "./types";
import ERC20_LIST from "../ERC20_LIST.json";
import { inspect } from "util";
import { utils } from "ethers";

export const TOKEN_LIST: TokenList = ERC20_LIST[0] as TokenList;

const result = joiSchema.validate(TOKEN_LIST);
for (const chainIdString of Object.keys(TOKEN_LIST)) {
  const chainId = parseFloat(chainIdString)
  for (const key of Object.keys(TOKEN_LIST[chainId])) {
    if (utils.getAddress(key) !== key || TOKEN_LIST[chainId][key].address !== key) {
      if (TOKEN_LIST[chainId][key].wrappingMethod === 'Wrap Native' && !TOKEN_LIST[chainId]['0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'].address){
        console.log(key, utils.getAddress(key));
        throw new Error("Native Token is missing");
      }
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
