#!/bin/bash
source src/helpers/common.sh

### Can add a check for the chainID, is it in a list 
### also can add a new code that will check if a token exists and will create a new key for it
### also the chainlist I take the rpcs from has quite some data, so it's possible form the name of a chain get the chainlist and everything Ethereum Mainnet => 1
INSWAP=false
PERMIT=false
GIT=false
LOGOURI="toFill"
echo "Welcome to the ERC20 adding tool !"
echo "Type of script:"
select SERVICE in "${services[@]}"; do
  if [[ -n "$SERVICE" ]]; then
    echo "You selected: $SERVICE"
    break
  fi
done
echo "-----------"


while true; do
read -p "Enter the chainId: " CHAINID

bun run ./src/functions/showName.ts $CHAINID

if [[ ! $CHAINID =~ ^[0-9]*$ ]] || [[ -z $CHAINID ]]; then
    echo "$CHAINID must be numbers"
    else 
    break;
    fi 
done 

while true; do
read -p "Enter the Token address: " TOKENADDRESS
if [[ ! $TOKENADDRESS =~ ^(0x)?[0-9a-fA-F]{40}$ ]]; then
    echo "$TOKENADDRESS isn't a valid address"
    else 
    break;
    fi 
done 

read -p "Has the token a permit ? (y/n) (false default) " HASPERMIT
if [[ $HASPERMIT == "y" ]]; then
    PERMIT="true"
fi

read -p "Is it used in swap ? (y/n) (false default) " HASINSWAP
if [[ $HASINSWAP == "y" ]]; then
    INSWAP="true"
fi

read -p "Enter the logo URI : " HASLOGOURI
if [[ ! -z $HASLOGOURI ]]; then
    LOGOURI=$HASLOGOURI
fi



if [[ $SERVICE == "Manual" ]]; then

read -p "what's the token name ? : " TOKENNAME

while true; do

read -p "what's the token decimals? : " TOKENDECIMALS
if [[ ! $TOKENDECIMALS =~ ^[0-9]*$ ]]; then
    echo "$TOKENDECIMALS must be numbers"
    else 
    break;
fi 
done

read -p "what's the token symbol ? : " TOKENSYMBOL
fi


echo "-----------"

bun run ./src/functions/getTokenInfo.ts $CHAINID $TOKENADDRESS $PERMIT $INSWAP $LOGOURI $SERVICE $TOKENNAME $TOKENDECIMALS $TOKENSYMBOL

read -p "Does this token info correspond to the wanted token ? (y/n) (default true) " CONFIRMATION
if [[ $CONFIRMATION == "n" ]]; then
    echo "Please rerun the command in manual mode"
    exit 0
fi

bun run ./src/functions/writeList.ts $CHAINID $TOKENADDRESS $PERMIT $INSWAP $LOGOURI $SERVICE $TOKENNAME $TOKENDECIMALS $TOKENSYMBOL

yarn validate

# read -p "Do you want to create a branch of the change and push it? (y/n) (default false) " HASGIT
# if [[ $HASGIT == "y" ]]; then
#     git checkout main
#     git pull
#     git checkout -b feat/adding_$CHAIN_$TOKENADDRESS
#     git add ./ERC20_LIST.json
#     git commit -m "feat: Adding token with chainID $CHAIN and token address $TOKENADDRESSS"
#     git push --set-upstream origin feat/adding_$CHAIN_$TOKENADDRESS
# fi