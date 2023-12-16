import Joi from 'joi';

export type TokenType = {
  readonly address: string;
  readonly decimals: number;
  readonly description?: string;
  readonly hasPermit?: boolean;
  readonly logoURI?: string;
  readonly name: string;
  readonly permitVersion?: string;
  readonly symbol: string;
  readonly underlyingTokens?: string[];
  readonly useInSwap?: boolean;
  readonly wrappingMethod?: 'BorrowStaker' | 'Curve' | 'Aave Matic Market' | 'Wrap Native' | 'Convex';
};

export type TokenListPerChainId = {
  [address: string]: TokenType;
};

export type TokenList = {
  [chainId: string]: TokenListPerChainId;
};

/** Joi schema */
const tokenInfo = Joi.object().keys({
  address: Joi.string(),
  decimals: Joi.number(),
  hasPermit: Joi.bool(),
  wrappingMethod: Joi.string(),
  isSanToken: Joi.bool(),
  logoURI: Joi.string(),
  name: Joi.string(),
  permitVersion: Joi.string(),
  symbol: Joi.string(),
  underlyingTokens: Joi.array().items(Joi.string()),
  useInSwap: Joi.bool(),
  description: Joi.string(),
});

export const joiSchema = Joi.object().pattern(Joi.number().integer(), Joi.object().pattern(Joi.string(), tokenInfo));
