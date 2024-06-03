
const { ethers } = require('ethers');
import ERC20_LIST from "../../ERC20_LIST.json";
import { TokenList } from "../types";

interface TokenInfo {
        address: string;
        name: string;
        decimals: number;
        symbol: string;
        hasPermit: boolean;
        useInSwap: boolean;
        logoURI: string;
}

export async function addTokenManually(chainId : string, tokenAdress : string, permit: string, inSwap: string, logoURI : string, show : string, tokenName: string, tokenDecimals : number, tokenSymbol :string) {
    
    let tokenInfo:TokenInfo ={
        address: "",
        name: "",
        decimals: 0,
        symbol: "",
        hasPermit: false,
        useInSwap: false,
        logoURI: ""
    };


    tokenInfo.address = tokenAdress;
    tokenInfo.name =  tokenName;
    tokenInfo.decimals = tokenDecimals;
    tokenInfo.symbol = tokenSymbol;
    if (inSwap == "false"){
        tokenInfo.useInSwap = false
    } else {
        tokenInfo.useInSwap = true
    }
    if (permit == "false"){
        tokenInfo.hasPermit = false
    } else {
        tokenInfo.hasPermit = true
    }
    tokenInfo.logoURI = logoURI

    

    if(tokenInfo.address == "" || tokenInfo.symbol == "" || tokenInfo.decimals == 0 || tokenInfo.address == "" || tokenInfo.name == "" || tokenInfo.decimals == 0 || tokenSymbol ==""){
        console.error("The token fetch wasn't possible, please rerun the script and select manual to enter values manually")
        process.exit(1)
    }
    if (show == "true"){
        console.log("tokenInfo willing to add : ")
        console.log(tokenInfo)
    }
    
    const old_LIST: TokenList = ERC20_LIST[0] as TokenList;
    const updatedData = [{
        ...old_LIST,
        [chainId]: {
          ...old_LIST[chainId],
          [tokenAdress]: tokenInfo,
        },
      }];
    
    return updatedData;
      
}