export async function fetchChainlist() {
    const response = await fetch("https://chainid.network/chains_mini.json", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
    return response.json();
}
  