import { getTokenInfo } from "../utils/getTokenAutomated";
import { addTokenManually } from "../utils/addTokenManually";
const chainId= process.argv[2]
const tokenAdress = process.argv[3]
const permit = process.argv[4]
const inSwap = process.argv[5]
const logoURI = process.argv[6]
const method = process.argv[7]
const tokenName = process.argv[8]
const tokenDecimals = Number(process.argv[9])
const tokenSymbol = process.argv[10]

if(method === "Automated"){
    getTokenInfo(chainId, tokenAdress , permit, inSwap, logoURI , "true");
} else{
    addTokenManually(chainId, tokenAdress , permit, inSwap, logoURI , "true", tokenName, tokenDecimals, tokenSymbol);
}


  
