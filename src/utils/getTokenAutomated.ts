
const { ethers } = require('ethers');
import ERC20_LIST from "../../ERC20_LIST.json";
import { getRPC } from "./getRPC";
import { TokenList } from "../types";

interface TokenInfo {
        address: string;
        name: string;
        decimals: number;
        symbol: string;
        hasPermit: boolean;
        useInSwap: boolean;
        logoURI: string;
        permitVersion?: string;

}

export async function getTokenInfo(chainId : string, tokenAdress : string, permit: string, inSwap: string, logoURI : string , show : string) {
    
    let tokenInfo:TokenInfo ={
        address: "",
        name: "",
        decimals: 0,
        symbol: "",
        hasPermit: false,
        useInSwap: false,
        logoURI: ""
    };

    const RPCList:any = await getRPC(Number(chainId));
    if(show === "true"){
        console.log("RPC list : ", RPCList)
    }

    for(let i in RPCList){
        try {
            let currentRPC = RPCList[i]
            const provider = new ethers.providers.JsonRpcProvider(currentRPC);
        
            const abi = [
                'function name() view returns (string memory)',
                'function symbol() view returns (string memory)',
                'function decimals() view returns (uint8)',
            ];
        
            const contract = new ethers.Contract(tokenAdress, abi, provider);

            tokenInfo.address = tokenAdress;
            tokenInfo.name =  await contract.name();
            tokenInfo.decimals = await contract.decimals();
            tokenInfo.symbol = await contract.symbol();
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
        } catch (error) {
            //console.error("Error:", error);
        }
    }

    if(tokenInfo.address == "" || tokenInfo.symbol == "" || tokenInfo.decimals == 0 || tokenInfo.address == ""){
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

