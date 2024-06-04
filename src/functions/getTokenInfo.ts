import { getTokenAutomated } from "../utils/getTokenAutomated";
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
const permitVersion = process.argv[11]
const description = process.argv[12]
const wrapper = process.argv[13]
let underlyingTokens : string[]= [];

for(let i =14; i<17;i++){
    if (!!process.argv[i]){
        underlyingTokens.push(process.argv[i])
    } 
}
if(method === "Automated"){
    getTokenAutomated(chainId, tokenAdress , permit, inSwap, logoURI , "true", permitVersion, description, wrapper, underlyingTokens);
} else{
    addTokenManually(chainId, tokenAdress , permit, inSwap, logoURI , "true", tokenName, tokenDecimals, tokenSymbol, permitVersion, description, wrapper, underlyingTokens);
}


  
