# IERC721Metadata Methods

[Get the collection name](#get-the-collection-name)
[Get the collection symbol](#get-the-collection-symbol)
[Get a token's URI](#get-a-tokens-uri)

## Get the collection name
Returns the token collection name.
### Request Endpoint
GET `/name`
### Request Body
None
### Success Result Example
```json
{
    "message": "Success", // A human readable message of the execution result
    "result": "Test" // The result from the blockchain of the name of the collection
}
```

## Get the collection symbol
Returns the token collection symbol.
### Request Endpoint
GET `/symbol`
### Request Body
None
### Success Result Example
```json
{
    "message": "Success", // A human readable message of the execution result
    "result": "TST" // The result from the blockchain of the symbol of the collection
}
```

## Get a token's URI
Returns the Uniform Resource Identifier (URI) for tokenId token.
### Request Endpoint
GET `/tokenURI`
### Request Body
```json
{
    "args": [
        0 // The token ID to get the URI for
    ]
}
```
### Success Result Example
```json
{
    "message": "Success", // A human readable message of the execution result
    "result": "http://example.com" // The result from the blockchain of the token's URI
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
            "data": "0xc87b56dd0000000000000000000000000000000000000000000000000000000000000001"
        },
        "invocation": {
            "method": "tokenURI",
            "signature": "tokenURI(uint256)",
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