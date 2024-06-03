import { fetchChainlist } from "./fetchChainlist";

export async function getName(chainId: number) {
  try {
    const data = await fetchChainlist();
    let name;
    data.forEach((element: any) => {
      if (element.chainId === chainId) {
        name= element.name;
      }
    });
    return name;
  } catch (e) {
    console.error(e);
  }
}
