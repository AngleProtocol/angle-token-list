
const { ethers } = require('ethers');
import { getRPC } from "./getRPC";
import { getExistingLogoUri } from "./getExistingLogoUri";

const chainId= process.argv[2]
const tokenAdress = process.argv[3]
export async function getPreviewURI(chainId : string, tokenAdress : string ) {

    const RPCList:any = await getRPC(Number(chainId));
    let ExistingLogoUri= "";


    let symbol = ""

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
    if (!!symbol){
            ExistingLogoUri = getExistingLogoUri(symbol)
            console.log("There is a token in the list with the same symbol !")
            console.log(`The following logoUri will be used : ${ExistingLogoUri} , if you don't want it to be used, write the right one in the next question or default to use angle icon`)
    }
    return symbol;
}
getPreviewURI(chainId, tokenAdress)
