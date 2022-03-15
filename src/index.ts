import { ChainId } from "@angleprotocol/sdk";
import { TokenInfo, TokenInfoListType, TokenList } from "./types";
import { token_list as mainnet_token_list } from "./chains/mainnet";

export const TOKEN_LIST: TokenList = {
  [ChainId.MAINNET]: mainnet_token_list,
};
