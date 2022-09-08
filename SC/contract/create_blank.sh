#!/bin/bash

# Admin's settings

near delete $CONTRACT_ID $OWNER_ID
near create-account $CONTRACT_ID --masterAccount $OWNER_ID --initialBalance 10

near deploy $CONTRACT_ID --wasmFile=res/antif_release.wasm

near call $CONTRACT_ID new '{"owner_id": "'$OWNER_ID'"}' --accountId $CONTRACT_ID

near call $CONTRACT_ID create_case '{"case":{
"title":"Rusni pi*da",
"description":"Some description",
"ipfs": "",
"category": "TerroristFinancing"
}}' --accountId $OWNER_ID --gas=41000000000000

near call $CONTRACT_ID create_address '{"case_id": 0,"address":{
"chain":"BTC",
"address":"0xfb3024a054816c9a68469bf0fea62a68614bbc2b",
"ipfs": ""
}}' --accountId $OWNER_ID --gas=41000000000000

near call $CONTRACT_ID create_address '{"case_id": 0,"address":{
"chain":"ETH",
"address":"0xbf66d700df08381d57cfbe507ecd59994689464a",
"ipfs": ""
}}' --accountId $OWNER_ID --gas=41000000000000

near call $CONTRACT_ID add_admin '{"account_id":"'$OWNER_ID'"}' --accountId $OWNER_ID

near call $CONTRACT_ID update_address_link '{"case_id":0,"address":"0xbf66d700df08381d57cfbe507ecd59994689464a", "chain":"ETH", "ipfs_link": "https://nftstorage.link/ipfs/bafkreifzoyisbajcy3sx63hdgfjg45lc463iahm42kh2xh3llbm7ux5lme"}' --accountId $OWNER_ID

near call $CONTRACT_ID update_status '{"case_id":0,"address":"0xbf66d700df08381d57cfbe507ecd59994689464a", "chain":"ETH", "status": "Accepted"}' --accountId $OWNER_ID

near call $CONTRACT_ID update_status '{"case_id":0,"address":"0xfb3024a054816c9a68469bf0fea62a68614bbc2b", "chain":"BTC", "status": "Rejected"}' --accountId $OWNER_ID
