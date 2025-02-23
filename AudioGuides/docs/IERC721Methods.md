# IERC721 Methods

[Get the balance of a wallet](#get-the-balance-of-a-wallet)  
[Get the owner of a token](#get-the-owner-of-a-token)  
[Transfer a token from wallet A to B](#transfer-a-token-from-wallet-a-to-b)  
[Approve an address to transfer a specific token ID from your wallet](#approve-an-address-to-transfer-a-specific-token-id-from-your-wallet)  
[Set the approval for an address to transfer all tokens in your wallet](#set-the-approval-for-an-address-to-transfer-all-tokens-in-your-wallet)  
[Get the account approved for the transfer of a specific token](#get-the-account-approved-for-the-transfer-of-a-specific-token)  
[Check if address is approved to transfer all tokens from specified wallet](#check-if-address-is-approved-to-transfer-all-tokens-from-specified-wallet)

## Get the balance of a wallet
Returns the number of tokens in owner's account.

Requirements:
- Owner must be a valid address, and not the zero address.
### Request Endpoint
GET `/balanceOf`
### Request Body
```json
{
  "args": [
    "0x0000000000000000000000000000000000000000" // The address that we are checking the balance of.
  ]
}
```
### Success Result Example
```json
{
    "message": "Success", // A human readable message of the execution result
    "result": "0" // The result from the blockchain of how many tokens the wallet has
}
```
### Error Result Example
```json
{
    "message": "An error ocurred", // A human readable message of the execution result
    "error": {
        "code": "CALL_EXCEPTION",
        "action": "call",
        "data": "0x89c62b640000000000000000000000000000000000000000000000000000000000000000",
        "reason": "ERC721InvalidOwner(address)",
        "transaction": {
            "to": "0xb98E40c77beEBe9501aF1A2bDFFad922B6Bb30eE",
            "data": "0x70a082310000000000000000000000000000000000000000000000000000000000000000"
        },
        "invocation": {
            "method": "balanceOf",
            "signature": "balanceOf(address)",
            "args": [
                "0x0000000000000000000000000000000000000000"
            ]
        },
        "revert": {
            "name": "ERC721InvalidOwner",
            "signature": "ERC721InvalidOwner(address)",
            "args": [
                "0x0000000000000000000000000000000000000000"
            ]
        },
        "shortMessage": "execution reverted (unknown custom error)"
    } // This is an Ethers.JS error object, which tells us what went wrong with the transaction.
}
```

## Get the owner of a token
Returns the owner of the tokenId token.

Requirements:  
- tokenId must exist.
### Request Endpoint
GET `/ownerOf`
### Request Body
```json
{
    "args": [
        0 // The ID of the token.
    ]
}
```
### Result Example
```json
{
    "message": "Success", // A human readable message of the execution result
    "result": "0x12F368383f4100ce8E825dd7D121912a4fDDC2E0" // The result from the blockchain of which wallet owns the token
}
```
### Error Example
```json
{
    "message": "An error ocurred", // A human readable message of the execution result
    "error": {
        "code": "CALL_EXCEPTION",
        "action": "call",
        "data": "0x7e2732890000000000000000000000000000000000000000000000000000000000000000",
        "reason": "ERC721NonexistentToken(uint256)",
        "transaction": {
            "to": "0xb98E40c77beEBe9501aF1A2bDFFad922B6Bb30eE",
            "data": "0x6352211e0000000000000000000000000000000000000000000000000000000000000000"
        },
        "invocation": {
            "method": "ownerOf",
            "signature": "ownerOf(uint256)",
            "args": [
                "0"
            ]
        },
        "revert": {
            "name": "ERC721NonexistentToken",
            "signature": "ERC721NonexistentToken(uint256)",
            "args": [
                "0"
            ]
        },
        "shortMessage": "execution reverted (unknown custom error)"
    } // This is an Ethers.JS error object, which tells us what went wrong with the transaction.
}
```

## Transfer a token from wallet A to B
Safely transfers tokenId token from from to to.

Requirements:
- from cannot be the zero address.
- to cannot be the zero address.
- tokenId token must exist and be owned by from.
- If the caller is not from, it must be approved to move this token by either approve or setApprovalForAll.
- If to refers to a smart contract, it must implement IERC721Receiver.onERC721Received, which is called upon a safe transfer.

Emits a Transfer event.
### Request Endpoint
POST `/safeTransferFrom`
### Request Body
```json
{
    "args": [
        "0x0000000000000000000000000000000000000000", // Wallet A, where the token is being transferred from
        "0x0000000000000000000000000000000000000000", // Wallet B, where the token is being transferred to
        0 // The ID of the token that is being transferred
    ]
}
```
### Result Example
```json
{
    "message": "Transaction executed", // A human readable message of the execution result
    "result": {
        "_type": "TransactionReceipt",
        "blockHash": "0x42829c8f39c571153e592ee0f15e06fa4c8e31d410d386f56be0225e7cac5169",
        "blockNumber": 45732913,
        "contractAddress": null,
        "cumulativeGasUsed": "53248",
        "from": "0x12F368383f4100ce8E825dd7D121912a4fDDC2E0",
        "gasPrice": "0",
        "blobGasUsed": null,
        "blobGasPrice": null,
        "gasUsed": "53248",
        "hash": "0xb8617ce9cb9d07e4636e03bf59f80d7754a9144b5365d06db0b4e7eeace095d8",
        "index": 0,
        "logs": [
            {
                "_type": "log",
                "address": "0xb98E40c77beEBe9501aF1A2bDFFad922B6Bb30eE",
                "blockHash": "0x42829c8f39c571153e592ee0f15e06fa4c8e31d410d386f56be0225e7cac5169",
                "blockNumber": 45732913,
                "data": "0x",
                "index": 0,
                "topics": [
                    "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
                    "0x00000000000000000000000012f368383f4100ce8e825dd7d121912a4fddc2e0",
                    "0x0000000000000000000000000000000000000000000000000000000000000001",
                    "0x0000000000000000000000000000000000000000000000000000000000000000"
                ],
                "transactionHash": "0xb8617ce9cb9d07e4636e03bf59f80d7754a9144b5365d06db0b4e7eeace095d8",
                "transactionIndex": 0
            }
        ],
        "logsBloom": "0x02000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000040000000000000000000000000008000000000000000000040000000000000000000000004000020000000000000000000800000000000000000000000010000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000002000000000000000000000000000000000002000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000100000000000",
        "status": 1,
        "to": "0xb98E40c77beEBe9501aF1A2bDFFad922B6Bb30eE"
    } // This is an Ethers.JS transaction receipt object, which gives us the transaction receipt and all its information, like if we looked up this transaction in a block explorer
}
```
### Error Example
```json
{
    "message": "An error ocurred", // A human readable message of the execution result
    "error": {
        "code": "CALL_EXCEPTION",
        "action": "estimateGas",
        "data": "0x64a0ae920000000000000000000000000000000000000000000000000000000000000000",
        "reason": null,
        "transaction": {
            "to": "0xb98E40c77beEBe9501aF1A2bDFFad922B6Bb30eE",
            "data": "0x42842e0e000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
            "from": "0x12F368383f4100ce8E825dd7D121912a4fDDC2E0"
        },
        "invocation": null,
        "revert": null,
        "shortMessage": "execution reverted (unknown custom error)",
        "info": {
            "error": {
                "code": -32000,
                "message": "Execution reverted",
                "data": "0x64a0ae920000000000000000000000000000000000000000000000000000000000000000"
            },
            "payload": {
                "method": "eth_estimateGas",
                "params": [
                    {
                        "nonce": "0x9",
                        "from": "0x12f368383f4100ce8e825dd7d121912a4fddc2e0",
                        "to": "0xb98e40c77beebe9501af1a2bdffad922b6bb30ee",
                        "data": "0x42842e0e000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
                    }
                ],
                "id": 57,
                "jsonrpc": "2.0"
            }
        }
    } // This is an Ethers.JS error object. Due to how Ethers.JS works, if you get a CALL_EXCEPTION (code) in estimateGas (action), it means that a smart contract error was thrown.
}
```



## Approve an address to transfer a specific token ID from your wallet
Gives permission to to to transfer tokenId token to another account. The approval is cleared when the token is transferred.  
Only a single account can be approved at a time, so approving the zero address clears previous approvals.

Requirements:
- The caller must own the token or be an approved operator.
- tokenId must exist.

Emits an Approval event.
### Request Endpoint
POST `/approve`
### Request Body
```json
{
    "args": [
        "0x0000000000000000000000000000000000000000", // The address that you will approve to be able to transfer the token
        0 // The token ID that you are allowing the address to transfer from your wallet
    ]
}
```
### Result Example
```json
{
    "message": "Transaction executed", // A human readable message of the execution result
    "result": {
        "_type": "TransactionReceipt",
        "blockHash": "0x42829c8f39c571153e592ee0f15e06fa4c8e31d410d386f56be0225e7cac5169",
        "blockNumber": 45732913,
        "contractAddress": null,
        "cumulativeGasUsed": "53248",
        "from": "0x12F368383f4100ce8E825dd7D121912a4fDDC2E0",
        "gasPrice": "0",
        "blobGasUsed": null,
        "blobGasPrice": null,
        "gasUsed": "53248",
        "hash": "0xb8617ce9cb9d07e4636e03bf59f80d7754a9144b5365d06db0b4e7eeace095d8",
        "index": 0,
        "logs": [
            {
                "_type": "log",
                "address": "0xb98E40c77beEBe9501aF1A2bDFFad922B6Bb30eE",
                "blockHash": "0x42829c8f39c571153e592ee0f15e06fa4c8e31d410d386f56be0225e7cac5169",
                "blockNumber": 45732913,
                "data": "0x",
                "index": 0,
                "topics": [
                    "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
                    "0x00000000000000000000000012f368383f4100ce8e825dd7d121912a4fddc2e0",
                    "0x0000000000000000000000000000000000000000000000000000000000000001",
                    "0x0000000000000000000000000000000000000000000000000000000000000000"
                ],
                "transactionHash": "0xb8617ce9cb9d07e4636e03bf59f80d7754a9144b5365d06db0b4e7eeace095d8",
                "transactionIndex": 0
            }
        ],
        "logsBloom": "0x02000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000040000000000000000000000000008000000000000000000040000000000000000000000004000020000000000000000000800000000000000000000000010000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000002000000000000000000000000000000000002000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000100000000000",
        "status": 1,
        "to": "0xb98E40c77beEBe9501aF1A2bDFFad922B6Bb30eE"
    } // This is an Ethers.JS transaction receipt object, which gives us the transaction receipt and all its information, like if we looked up this transaction in a block explorer
}
```
### Error Example
```json
{
    "message": "An error ocurred", // A human readable message of the execution result
    "error": {
        "code": "CALL_EXCEPTION",
        "action": "estimateGas",
        "data": "0x64a0ae920000000000000000000000000000000000000000000000000000000000000000",
        "reason": null,
        "transaction": {
            "to": "0xb98E40c77beEBe9501aF1A2bDFFad922B6Bb30eE",
            "data": "0x42842e0e000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
            "from": "0x12F368383f4100ce8E825dd7D121912a4fDDC2E0"
        },
        "invocation": null,
        "revert": null,
        "shortMessage": "execution reverted (unknown custom error)",
        "info": {
            "error": {
                "code": -32000,
                "message": "Execution reverted",
                "data": "0x64a0ae920000000000000000000000000000000000000000000000000000000000000000"
            },
            "payload": {
                "method": "eth_estimateGas",
                "params": [
                    {
                        "nonce": "0x9",
                        "from": "0x12f368383f4100ce8e825dd7d121912a4fddc2e0",
                        "to": "0xb98e40c77beebe9501af1a2bdffad922b6bb30ee",
                        "data": "0x42842e0e000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
                    }
                ],
                "id": 57,
                "jsonrpc": "2.0"
            }
        }
    } // This is an Ethers.JS error object. Due to how Ethers.JS works, if you get a CALL_EXCEPTION (code) in estimateGas (action), it means that a smart contract error was thrown.
}
```

## Set the approval for an address to transfer all tokens in your wallet
Approve or remove operator as an operator for the caller. Operators can call transferFrom or safeTransferFrom for any token owned by the caller.

Requirements:
- The operator cannot be the address zero.

Emits an ApprovalForAll event.
### Request Endpoint
POST `/setApprovalForAll`
### Request Body
```json
{
    "args": [
        "0x0000000000000000000000000000000000000000", // The address that you will set the approval for them to be able to transfer all tokens from your wallet
        true // If they are approved to transfer all tokens from your wallet. Set to `false` to disallow them.
    ]
}
```
### Result Example
```json
{
    "message": "Transaction executed", // A human readable message of the execution result
    "result": {
        "_type": "TransactionReceipt",
        "blockHash": "0x42829c8f39c571153e592ee0f15e06fa4c8e31d410d386f56be0225e7cac5169",
        "blockNumber": 45732913,
        "contractAddress": null,
        "cumulativeGasUsed": "53248",
        "from": "0x12F368383f4100ce8E825dd7D121912a4fDDC2E0",
        "gasPrice": "0",
        "blobGasUsed": null,
        "blobGasPrice": null,
        "gasUsed": "53248",
        "hash": "0xb8617ce9cb9d07e4636e03bf59f80d7754a9144b5365d06db0b4e7eeace095d8",
        "index": 0,
        "logs": [
            {
                "_type": "log",
                "address": "0xb98E40c77beEBe9501aF1A2bDFFad922B6Bb30eE",
                "blockHash": "0x42829c8f39c571153e592ee0f15e06fa4c8e31d410d386f56be0225e7cac5169",
                "blockNumber": 45732913,
                "data": "0x",
                "index": 0,
                "topics": [
                    "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
                    "0x00000000000000000000000012f368383f4100ce8e825dd7d121912a4fddc2e0",
                    "0x0000000000000000000000000000000000000000000000000000000000000001",
                    "0x0000000000000000000000000000000000000000000000000000000000000000"
                ],
                "transactionHash": "0xb8617ce9cb9d07e4636e03bf59f80d7754a9144b5365d06db0b4e7eeace095d8",
                "transactionIndex": 0
            }
        ],
        "logsBloom": "0x02000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000040000000000000000000000000008000000000000000000040000000000000000000000004000020000000000000000000800000000000000000000000010000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000002000000000000000000000000000000000002000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000100000000000",
        "status": 1,
        "to": "0xb98E40c77beEBe9501aF1A2bDFFad922B6Bb30eE"
    } // This is an Ethers.JS transaction receipt object, which gives us the transaction receipt and all its information, like if we looked up this transaction in a block explorer
}
```
### Error Example
```json
{
    "message": "An error ocurred", // A human readable message of the execution result
    "error": {
        "code": "CALL_EXCEPTION",
        "action": "estimateGas",
        "data": "0x64a0ae920000000000000000000000000000000000000000000000000000000000000000",
        "reason": null,
        "transaction": {
            "to": "0xb98E40c77beEBe9501aF1A2bDFFad922B6Bb30eE",
            "data": "0x42842e0e000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
            "from": "0x12F368383f4100ce8E825dd7D121912a4fDDC2E0"
        },
        "invocation": null,
        "revert": null,
        "shortMessage": "execution reverted (unknown custom error)",
        "info": {
            "error": {
                "code": -32000,
                "message": "Execution reverted",
                "data": "0x64a0ae920000000000000000000000000000000000000000000000000000000000000000"
            },
            "payload": {
                "method": "eth_estimateGas",
                "params": [
                    {
                        "nonce": "0x9",
                        "from": "0x12f368383f4100ce8e825dd7d121912a4fddc2e0",
                        "to": "0xb98e40c77beebe9501af1a2bdffad922b6bb30ee",
                        "data": "0x42842e0e000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
                    }
                ],
                "id": 57,
                "jsonrpc": "2.0"
            }
        }
    } // This is an Ethers.JS error object. Due to how Ethers.JS works, if you get a CALL_EXCEPTION (code) in estimateGas (action), it means that a smart contract error was thrown.
}
```

## Get the account approved for the transfer of a specific token
Returns the account approved for tokenId token.

Requirements:
- tokenId must exist.

### Request Endpoint
GET `/getApproved`
### Request Body
```json
{
    "args": [
        0 // The token ID that you wish to get who is approved to transfer it.
    ]
}
```
### Result Example
```json
{
    "message": "Success", // A human readable message of the execution result
    "result": "0x0000000000000000000000000000000000000000" // The address that is allowed to transfer the token. If zero address, then nobody is.
}
```
### Error Example
```json
{
    "message": "An error ocurred", // The token ID that you wish to get who is approved to transfer it.
    "error": {
        "code": "CALL_EXCEPTION",
        "action": "call",
        "data": "0x7e2732890000000000000000000000000000000000000000000000000000000000000001",
        "reason": "ERC721NonexistentToken(uint256)",
        "transaction": {
            "to": "0xb98E40c77beEBe9501aF1A2bDFFad922B6Bb30eE",
            "data": "0x081812fc0000000000000000000000000000000000000000000000000000000000000001"
        },
        "invocation": {
            "method": "getApproved",
            "signature": "getApproved(uint256)",
            "args": [
                "1"
            ]
        },
        "revert": {
            "name": "ERC721NonexistentToken",
            "signature": "ERC721NonexistentToken(uint256)",
            "args": [
                "1"
            ]
        },
        "shortMessage": "execution reverted (unknown custom error)"
    } // This is an Ethers.JS error object, which tells us what went wrong with the transaction.
}
```

## Check if address is approved to transfer all tokens from specified wallet
Returns if the operator is allowed to manage all of the assets of owner.

See [Set the approval for an address to transfer all tokens in your wallet](#set-the-approval-for-an-address-to-transfer-all-tokens-in-your-wallet)
### Request Endpoint
GET `/isApprovedForAll`
### Request Body
```json
{
    "args": [
        "0x0000000000000000000000000000000000000000", // The address that owns the tokens
        "0x0000000000000000000000000000000000000000" // The address that to check if they are approved to transfer all the tokens from the owner.
    ]
}
```
### Result Example
```json
{
    "message": "Success", // A human readable message of the execution result
    "result": false // If they are approved to transfer all the tokens from the owner
}
```