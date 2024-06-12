
const { ethers } = require('ethers');
import { getRPC } from "./getRPC";
import { getExistingLogoUri } from "./getExistingLogoUri";

const chainId= process.argv[2]
const tokenAdress = process.argv[3]
const tokenSymbol = process.argv[4]

export async function getPreviewURI(chainId : string, tokenAdress : string , tokenSymbol?:string) {

    let ExistingLogoUri= "";
    let symbol :any= ""
    if(tokenSymbol === "toFill"){
        const RPCList:any = await getRPC(Number(chainId));
        console.log("If the fetch takes too long, ctrl^c and run in manual mode (example gnosis broken)")
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
                symbol = await contract.symbol();
            } catch (error) {
                //console.error("Error:", error);
            }
        }
        if (!symbol){
            console.error("The token fetch wasn't possible, please rerun the script and select manual to enter values manually")
            process.exit(1)
        }
    } else{
        symbol = tokenSymbol
    }
    if (!!symbol){
            ExistingLogoUri = getExistingLogoUri(symbol)
            if (!!ExistingLogoUri){
                console.log("There is a token in the list with the same symbol !")
                console.log(`The following logoUri will be used : ${ExistingLogoUri} , if you don't want it to be used, write the right one in the next question or default to use angle icon`)
            }
    }
    return symbol;
}
getPreviewURI(chainId, tokenAdress, tokenSymbol)
