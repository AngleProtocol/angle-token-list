import { fetchChainlist } from "./fetchChainlist";
export async function getRPC(chainId: number) {
  try {
    const data = await fetchChainlist();
    let datum;
    data.forEach((element: any) => {
      if (element.chainId === chainId) {
        datum = element.rpc;
      }
    });
    return datum;
  } catch (e) {
    console.error(e);
  }
}
