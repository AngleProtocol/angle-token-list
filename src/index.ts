import { TokenList, joiSchema } from "./types";
import erc20s from "../ERC20_LIST.json";
import { inspect } from "util";

export const TOKEN_LIST: TokenList[] = erc20s;

const result = joiSchema.validate(TOKEN_LIST);
if (result.error) {
  console.log(
    inspect(result.error, { showHidden: false, depth: null, colors: true })
  );
  throw new Error("wrong JSON format");
} else {
  console.log("all good");
}
