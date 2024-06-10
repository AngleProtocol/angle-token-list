import ERC20_LIST from "../../ERC20_LIST.json";
import { TokenList } from "../types";


export function getExistingLogoUri(symbol : string){
    const TOKEN_LIST: TokenList = ERC20_LIST[0] as TokenList;
    let logoURI: string | undefined = ""
    Object.keys(TOKEN_LIST).forEach((key) => {
        let nothing = TOKEN_LIST[key]
        Object.keys(nothing).forEach(key_bis =>{
            if (TOKEN_LIST[key][key_bis].symbol === symbol){
                logoURI = TOKEN_LIST[key][key_bis].logoURI;
            }
        })
    }
    );
    return logoURI
  }

