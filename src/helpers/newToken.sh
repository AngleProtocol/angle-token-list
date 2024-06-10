#!/bin/bash
source src/helpers/common.sh

### Can add a check for the chainID, is it in a list 
### also can add a new code that will check if a token exists and will create a new key for it
### also the chainlist I take the rpcs from has quite some data, so it's possible form the name of a chain get the chainlist and everything Ethereum Mainnet => 1
INSWAP=false
PERMIT=false
GIT=false
TOKENNAME="toFill"
TOKENSYMBOL="toFill"
TOKENDECIMALS="toFill"
DESCRIPTION="toFill"
PERMITVERSION="1"
WRAPPER="toFill"
UNDERLYINGTOKENS=()
LOGOURI="https://raw.githubusercontent.com/AngleProtocol/angle-token-list/main/src/assets/tokens/angle-icon-colorback-black500.png"

echo "Welcome to the ERC20 adding tool !"
echo "Type of script:"

add_to_array() {
    while true; do
        read -p "Enter underlying tokens (or type 'exit' or 'q' to finish): " value
        if [[ "$value" = "exit" ]] || [[ "$value" = "q" ]]; then
            break
        elif [ -z "$value" ]; then
            echo "Input cannot be empty. Please enter a value."
        else
            UNDERLYINGTOKENS+=("$value")
        fi
    done
}

select SERVICE in "${services[@]}"; do
  if [[ -n "$SERVICE" ]]; then
    echo "You selected: $SERVICE"
    break
  fi
done
echo "-----------"


while true; do
read -p "Enter the chainId: " CHAINID

if [[ ! $CHAINID =~ ^[0-9]*$ ]] || [[ -z $CHAINID ]]; then
    echo "$CHAINID must be numbers"
    else 
    break;
    fi 
done 

bun run ./src/functions/showName.ts $CHAINID
echo "-----------"

while true; do
read -p "Enter the Token address: " TOKENADDRESS
if [[ ! $TOKENADDRESS =~ ^(0x)?[0-9a-fA-F]{40}$ ]]; then
    echo "$TOKENADDRESS isn't a valid address"
    else 
    break;
    fi 
done 

echo "-----------"

read -p "Has the token a permit ? (y/n) (false as default) " HASPERMIT
if [[ $HASPERMIT == "y" ]]; then
    PERMIT="true"
    
    while true; do
    read -p "What's the permit version ? (ex: 1,2...) " PERMITVERSION
    if [[ ! $PERMITVERSION =~ ^[0-9]*$ ]]; then
        echo "$PERMITVERSION must be numbers"
        else 
        break;
        fi 
    done 
fi
echo "-----------"

read -p "Is it used in swap ? (y/n) (false as default) " HASINSWAP
if [[ $HASINSWAP == "y" ]]; then
    INSWAP="true"
fi
echo "-----------"


if [[ $SERVICE == "Manual" ]]; then

    while true; do
    read -p "what's the token name ? : " TOKENNAME
    if [[ -z $TOKENNAME ]]; then
        echo "$TOKENNAME isn't a valid address"
        else 
        break;
        fi 
    done 

    echo "-----------"

    while true; do
    

    read -p "what's the token decimals? : " TOKENDECIMALS
    if [[ ! $TOKENDECIMALS =~ ^[0-9]*$ ]] || [[ -z $TOKENDECIMALS ]]; then
        echo "$TOKENDECIMALS must be numbers"
        else 
        break;
    fi 
    done
    echo "-----------"


    while true; do

    read -p "what's the token symbol ? : " TOKENSYMBOL
    if [[ -z $TOKENSYMBOL ]]; then
        echo "$TOKENSYMBOL can't be null"
        else 
        break;
    fi 
    done
    echo "-----------"
fi

bun run ./src/utils/getPreviewURI.ts $CHAINID $TOKENADDRESS

read -p "Enter the logo URI (example ANGLE.svg) (default is angle token logo): " HASLOGOURI
if [[ ! -z $HASLOGOURI ]]; then
    LOGOURI=$HASLOGOURI
fi
echo "-----------"

read -p "Do you need to add a description, wrapping method or underlying tokens ? (y/n) (false default) " MORE
if [[ $MORE == "y" ]]; then
    echo "-----------"
    read -p "What's the token description ? (press enter if none) " HASDESCRIPTION
    if [[ ! -z $HASDESCRIPTION ]]; then
      DESCRIPTION=$HASDESCRIPTION
    fi
    echo "-----------"
    read -p "What's the Wrapping method ? (press enter if none) " HASWRAPPER
    if [[ ! -z $HASWRAPPER ]]; then
      WRAPPER=$HASWRAPPER
    fi
    echo "-----------"
    read -p "Has it underlying tokens ? (y/n) (press enter if none) " HASUNDERLYINGTOKENS
    if [[ $HASUNDERLYINGTOKENS == "y" ]]; then
        add_to_array
    fi

fi

echo "-----------"

bun run ./src/functions/getTokenInfo.ts $CHAINID $TOKENADDRESS $PERMIT $INSWAP $LOGOURI $SERVICE $TOKENNAME $TOKENDECIMALS $TOKENSYMBOL $PERMITVERSION $DESCRIPTION $WRAPPER ${UNDERLYINGTOKENS[0]} ${UNDERLYINGTOKENS[1]} ${UNDERLYINGTOKENS[2]}

echo "-----------"

read -p "Does this token info correspond to the wanted token ? (y/n) (true as default) " CONFIRMATION
if [[ $CONFIRMATION == "n" ]]; then
    echo "Please rerun the command in manual mode"
    exit 0
fi
echo "-----------"

bun run ./src/functions/writeList.ts $CHAINID $TOKENADDRESS $PERMIT $INSWAP $LOGOURI $SERVICE $TOKENNAME $TOKENDECIMALS $TOKENSYMBOL $PERMITVERSION $DESCRIPTION $WRAPPER ${UNDERLYINGTOKENS[0]} ${UNDERLYINGTOKENS[1]} ${UNDERLYINGTOKENS[2]}

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