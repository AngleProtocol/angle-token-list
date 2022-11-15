import { ChainId } from "@angleprotocol/sdk";
import Joi from "joi";

export interface TokenInfo {
  readonly decimals: number;
  readonly hasPermit?: boolean;
  readonly isLP?: string[];
  readonly isSanToken?: boolean;
  readonly logoURI?: string;
  readonly name: string;
  readonly permitVersion?: string;
  readonly symbol: string;
  readonly tags?: string[];
  readonly underlyingTokens?: string[];
  readonly useInSwap?: boolean;
}

const tokenInfo = Joi.object().keys({
  decimals: Joi.number(),
  hasPermit: Joi.bool(),
  isLP: Joi.bool(),
  isSanToken: Joi.bool(),
  logoURI: Joi.string(),
  name: Joi.string(),
  permitVersion: Joi.string(),
  symbol: Joi.string(),
  underlyingTokens: Joi.array().items(Joi.string()),
  useInSwap: Joi.bool(),
});

const items: any = {};
for (const chain of Object.keys(ChainId)) {
  items[chain] = Joi.object().pattern(Joi.string(), tokenInfo);
}
export const joiSchema = Joi.array().items();

export interface TokenInfoListType {
  [address: string]: TokenInfo;
}

export interface TokenList {
  [chainName: number]: TokenInfoListType;
}
