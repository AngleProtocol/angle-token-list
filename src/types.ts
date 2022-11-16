import { ChainId } from "@angleprotocol/sdk";
import Joi from "joi";

export type TokenType = {
  readonly decimals: number;
  readonly hasPermit?: boolean;
  readonly isAngleBorrowStaker?: boolean;
  readonly isSanToken?: boolean;
  readonly logoURI?: string;
  readonly name: string;
  readonly permitVersion?: string;
  readonly symbol: string;
  readonly tags?: string[];
  readonly underlyingTokens?: string[];
  readonly useInSwap?: boolean;
}

export type TokenListPerChainId = {
  [address: string]: TokenType;
}

export type TokenList = {
  [chainId: string]: TokenListPerChainId;
}

/** Joi schema */
const tokenInfo = Joi.object().keys({
  decimals: Joi.number(),
  hasPermit: Joi.bool(),
  isAngleBorrowStaker: Joi.bool(),
  isSanToken: Joi.bool(),
  logoURI: Joi.string(),
  name: Joi.string(),
  permitVersion: Joi.string(),
  symbol: Joi.string(),
  underlyingTokens: Joi.array().items(Joi.string()),
  useInSwap: Joi.bool(),
});

// const items: any = {};
// for (const chain of Object.keys(ChainId)) {
//   items[chain] = Joi.object().pattern(Joi.string(), tokenInfo);
// }
export const joiSchema = Joi.object().keys(
  {
    "1": Joi.object().pattern(/^/, tokenInfo),
    "137": Joi.object().pattern(/^/, tokenInfo),
    "43114": Joi.object().pattern(/^/, tokenInfo),
    "10": Joi.object().pattern(/^/, tokenInfo),
    "42161": Joi.object().pattern(/^/, tokenInfo),
    "56": Joi.object().pattern(/^/, tokenInfo),
  }
);

