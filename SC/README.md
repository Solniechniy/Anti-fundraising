# Antif

It is a smart contract which collect addresses in different category.

## Getting started

Preparing process

Create constants
```bash
export NEAR_ENV=testnet
export OWNER_ID=migration.testnet
export CONTRACT_ID=antif.$OWNER_ID
```

For creating the new account for deploying contract use next command 

```bash
near create-account $CONTRACT_ID --masterAccount $OWNER_ID --initialBalance 10
```

First of all - you will need to deploy the wasm file.
```bash
near deploy $CONTRACT_ID --wasmFile=res/antif_release.wasm
```

1 Near = 1000000000000000000000000

## Useful commands:

NEW

Then initialize contract with command where OWNER_ID is your admin UI account.

```bash
near call $CONTRACT_ID new '{"owner_id": "'$OWNER_ID'"}' --accountId $CONTRACT_ID
```


CREATE CASE

Here you can take a time for creating auction https://currentmillis.com.
Add 000000 to the time for recieving time in nanoseconds.
```bash
near call $CONTRACT_ID create_case '{"case":{
"title":"Rusni pi*da",
"description":"Some description",
"ipfs": "link",
"category": "TerroristFinancing"
}}' --accountId $OWNER_ID --gas=41000000000000
```

CREATE ADDRESS
```bash
near call $CONTRACT_ID create_address '{"case_id": 0,"address":{
"chain":"NEAR",
"address":"proverka.testnet",
"ipfs": "link"
}}' --accountId $OWNER_ID --gas=41000000000000
```

GET WINNER
```bash
near view $CONTRACT_ID get_num_cases
```

GET WINNER
```bash
near view $CONTRACT_ID get_cases '{"from_index": 0, "limit": 10}'
```

GET WINNER
```bash
near view $CONTRACT_ID get_addresses '{"case_id": 0}'
```

near call $CONTRACT_ID add_admin '{"account_id":"failure.testnet"}' --accountId $OWNER_ID