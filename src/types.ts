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

export const joiSchema = Joi.array().items({
  mainnet: Joi.object().pattern(/^/, tokenInfo),
  polygon: Joi.object().pattern(/^/, tokenInfo),
  rinkeby: Joi.object().pattern(/^/, tokenInfo),
});

export interface TokenInfoListType {
  [address: string]: TokenInfo;
}

export interface TokenList {
  [chainName: number]: TokenInfoListType;
}
