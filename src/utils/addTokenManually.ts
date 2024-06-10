
import ERC20_LIST from "../../ERC20_LIST.json";
import { TokenList } from "../types";
import { getExistingLogoUri } from "./getExistingLogoUri";
interface TokenInfo {
    address: string;
    name: string;
    decimals: number;
    symbol: string;
    hasPermit: boolean;
    useInSwap: boolean;
    logoURI: string;
    permitVersion?: string;
    description?: string;
    wrappingMethod?: string;
    underlyingTokens?: string[];
}


export async function addTokenManually(chainId : string, tokenAdress : string, permit: string, inSwap: string, logoURI : string, show : string, tokenName: string, tokenDecimals : number, tokenSymbol :string, permitVersion?:string, description?:string, wrapper?:string, underlyingTokens?: string[]) {
    
    let tokenInfo:TokenInfo ={
        address: "",
        name: "",
        decimals: 0,
        symbol: "",
        hasPermit: false,
        useInSwap: false,
        logoURI: "",
    };

    
    tokenInfo.address = tokenAdress;
    tokenInfo.name =  tokenName;
    tokenInfo.decimals = tokenDecimals;
    tokenInfo.symbol = tokenSymbol;
    const TOKEN_LIST: TokenList = ERC20_LIST[0] as TokenList;

    if (TOKEN_LIST[chainId][tokenAdress] !== null){
        console.error("The token you want to add  already exists, the modification is not automated yet");
        process.exit(1)
    }
    if (inSwap == "false"){
        tokenInfo.useInSwap = false
    } else {
        tokenInfo.useInSwap = true
    }
    if (permit == "false"){
        tokenInfo.hasPermit = false
    } else {
        tokenInfo.hasPermit = true
        tokenInfo.permitVersion = permitVersion
    }
    let ExistingLogoUri= "";

    if (!!tokenInfo.symbol){
        ExistingLogoUri = getExistingLogoUri(tokenInfo.symbol)
    }
    if (logoURI !== "https://raw.githubusercontent.com/AngleProtocol/angle-token-list/main/src/assets/tokens/angle-icon-colorback-black500.png"){
        tokenInfo.logoURI = `https://raw.githubusercontent.com/AngleProtocol/angle-token-list/main/src/assets/tokens/${logoURI}`
    }
    else if(!!ExistingLogoUri){
        console.log("There is a token in the list with the same symbol !")
        console.log(`The following logoUri will be used : ${ExistingLogoUri}`)
        tokenInfo.logoURI = ExistingLogoUri
    }else {
        tokenInfo.logoURI = logoURI
    }
    if(description !== "toFill"){
        tokenInfo.description = description
    }
    if(wrapper !== "toFill"){
        tokenInfo.wrappingMethod = wrapper
    }
    if((underlyingTokens?.length !== 0) && underlyingTokens){
        let temp :string[]= [];
        for(let i =0; i<underlyingTokens.length; i++)
            {
                temp.push(underlyingTokens[i])
        }
        tokenInfo.underlyingTokens= temp;
    }
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