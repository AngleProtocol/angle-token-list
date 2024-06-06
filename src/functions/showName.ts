import { getName } from "../utils/getName"


const chainId= process.argv[2]

async function test(chainId: string){
    let name = await getName(Number(chainId))
    console.log(`the chainId corresponds to ${name}`);
} 

test(chainId)

  
