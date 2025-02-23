# IERC721Enumerable Methods

[Get a token's total supply](#get-a-tokens-total-supply)
[Get a token's ID in a wallet by the token's index](#get-a-tokens-id-in-a-wallet-by-the-tokens-index)
[Get a token's ID by its index in the supply](#get-a-tokens-id-by-its-index-in-the-supply)

## Get a token's total supply
Returns the total amount of tokens stored by the contract.
### Request Endpoint
GET `/totalSupply`
### Request Body
None
### Success Result Example
```json
{
    "message": "Success", // A human readable message of the execution result
    "result": "1" // The result from the blockchain of how many tokens are in this collection
}
```

## Get a token's ID in a wallet by the token's index
Returns a token ID owned by owner at a given index of its token list. Use along with balanceOf to enumerate all of owner's tokens.
### Request Endpoint
GET `/tokenOfOwnerByIndex`
### Request Body
```json
{
    "args": [
        "0x0000000000000000000000000000000000000000", // The address of the wallet we wish to check
        0 // The index of the token which we are trying to get its ID for
    ]
}
```
### Success Result Example
```json
{
    "message": "Success", // A human readable message of the execution result
    "result": "2" // The result from the blockchain of the token ID at that index
}
```
### Error Example
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
            "data": "0x2f745c5900000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
        },
        "invocation": {
            "method": "tokenOfOwnerByIndex",
            "signature": "tokenOfOwnerByIndex(address,uint256)",
            "args": [
                "0x0000000000000000000000000000000000000000",
                "0"
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

## Get a token's ID by its index in the supply
Returns a token ID at a given index of all the tokens stored by the contract. Use along with [Get a token's total supply](#get-a-tokens-total-supply) to enumerate all tokens.
### Request Endpoint
GET `/tokenByIndex`
### Request Body
```json
{
    "args": [
        0 // The index of the token which we are trying to get its ID for
    ]
}
```
### Success Result Example
```json
{
    "message": "Success", // A human readable message of the execution result
    "result": "0" // The result from the blockchain of the token ID at that index
}
```
### Error Example
```json
{
    "message": "An error ocurred", // The token ID that you wish to get who is approved to transfer it.
    "error": {
        "code": "CALL_EXCEPTION",
        "action": "call",
        "data": "0xa57d13dc00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002",
        "reason": "ERC721OutOfBoundsIndex(address,uint256)",
        "transaction": {
            "to": "0xb98E40c77beEBe9501aF1A2bDFFad922B6Bb30eE",
            "data": "0x4f6ccce70000000000000000000000000000000000000000000000000000000000000002"
        },
        "invocation": {
            "method": "tokenByIndex",
            "signature": "tokenByIndex(uint256)",
            "args": [
                "2"
            ]
        },
        "revert": {
            "name": "ERC721OutOfBoundsIndex",
            "signature": "ERC721OutOfBoundsIndex(address,uint256)",
            "args": [
                "0x0000000000000000000000000000000000000000",
                "2"
            ]
        },
        "shortMessage": "execution reverted (unknown custom error)"
    } // This is an Ethers.JS error object, which tells us what went wrong with the transaction.
}
```