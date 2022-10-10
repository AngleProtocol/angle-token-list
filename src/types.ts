import { ChainId } from "@angleprotocol/sdk";
import Joi from "joi";

export interface TokenInfo {
  readonly name: string;
  readonly decimals: number;
  readonly symbol: string;
  readonly isSanToken?: boolean;
  readonly useInSwap?: boolean;
  readonly hasPermit?: boolean;
  readonly permitVersion?: string;
  readonly logoURI?: string;
  readonly tags?: string[];
}

const tokenInfo = Joi.object().keys({
  name: Joi.string(),
  decimals: Joi.number(),
  symbol: Joi.string(),
  useInSwap: Joi.bool(),
  isSanToken: Joi.bool(),
  hasPermit: Joi.bool(),
  permitVersion: Joi.string(),
  logoURI: Joi.string(),
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
