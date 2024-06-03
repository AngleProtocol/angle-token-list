import * as fs from 'fs';
import { getTokenInfo } from '../utils/getTokenAutomated';
import { addTokenManually } from '../utils/addTokenManually';
const chainId= process.argv[2]
const tokenAdress = process.argv[3]
const permit = process.argv[4]
const inSwap = process.argv[5]
const logoURI = process.argv[6]
const method = process.argv[7]
const tokenName = process.argv[8]
const tokenDecimals = Number(process.argv[9])
const tokenSymbol = process.argv[10]

export async function writeList(chainId : string, tokenAdress : string, permit: string, inSwap: string, logoURI : string, method : string,  tokenName: string, tokenDecimals : number, tokenSymbol :string) {
    let newERC : any; 
    if(method === "Automated"){
        newERC = await getTokenInfo(chainId, tokenAdress , permit, inSwap, logoURI , "");
    } else{
        newERC = await addTokenManually(chainId, tokenAdress , permit, inSwap, logoURI , "", tokenName, tokenDecimals, tokenSymbol);
    }
    const newERCString = JSON.stringify(newERC, null,2);
    fs.writeFile("NEW_ERC20_LIST.json", newERCString, function(err) {
        if (err) throw err;
        console.log('Creation of the new ERC20_LIST completed');
        }
    );
   
}


writeList(chainId, tokenAdress , permit, inSwap, logoURI , method, tokenName, tokenDecimals, tokenSymbol)