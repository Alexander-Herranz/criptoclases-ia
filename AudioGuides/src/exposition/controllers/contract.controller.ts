import { ContractTransactionReceipt, ContractTransactionResponse, Overrides, TransactionRequest } from "ethers";
import { Request } from "express";

import { callContractMethod, executeContractMethod } from "../../services/contracts.service";
import AppResult from "../../types/AppResult.type";
import Logger from "../../helpers/logger.helper";
import Config from "../../types/Config.type";

let config: Config;
let logger: Logger;

export async function getTokensOfWallet(req: Request): Promise<AppResult> {
  const contractName: string = config.CONTRACT.NAME;
  const contractAddress: string = config.CONTRACT.ADDRESS;
  const walletAddress: string = req.params.walletAddress;
  const options: Overrides = req.body.options || {};

  const balanceOfMethod: string = 'balanceOf';
  const balanceOfArgs: any[] = [walletAddress];
  const tokenOfOwnerByIndexMethod: string = 'tokenOfOwnerByIndex';
  const tokenOfOwnerByIndexArgs: any[] = [walletAddress, 0];
  const tokensOfOwnerResult: any[] = [];
  const statsMapMethod: string = 'statsMap';

  const totalTokensOfOwner: any = await callContractMethod(
    contractName,
    contractAddress,
    balanceOfMethod,
    balanceOfArgs,
    options
  );

  for (let index = 0; index < totalTokensOfOwner; index++) {
    tokenOfOwnerByIndexArgs[1] = index;

    const tokenId = await callContractMethod(
      contractName,
      contractAddress,
      tokenOfOwnerByIndexMethod,
      tokenOfOwnerByIndexArgs,
      options
    );

    const stats = await callContractMethod(
      contractName,
      contractAddress,
      statsMapMethod,
      [tokenId],
      options
    );

    let item_obj:any = {tokenId:BigInt, tokenCollection:String, type:String, aux:String};    
    item_obj.tokenId = tokenId;
    
    item_obj.catalog = stats.catalog;
    item_obj.type = stats.tipo;
    item_obj.aux = stats.aux;
    console.log(item_obj);

    tokensOfOwnerResult.push(item_obj);

  }

  console.log(tokensOfOwnerResult);

  return {
    statusCode: 200,
    body: {
      message: 'Success',
      result: tokensOfOwnerResult
    }
  }
}

export async function callContractMethodController(req: Request): Promise<AppResult> {
  const contractName: string = config.CONTRACT.NAME;
  const contractAddress: string = config.CONTRACT.ADDRESS;
  const methodName: string = req.params.method;
  const args: any[] = req.body.args || [];
  const options: Overrides = req.body.options || {};

  const result: any = await callContractMethod(contractName, contractAddress, methodName, args, options);

  return {
    statusCode: 200,
    body: {
      message: 'Success',
      result
    }
  };
}

export async function executeContractMethodController(req: Request): Promise<AppResult> {
  const contractName: string = config.CONTRACT.NAME;
  const contractAddress: string = config.CONTRACT.ADDRESS;
  const methodName: string = req.params.method;
  const args: any[] = req.body.args || [];
  const options: Overrides = req.body.options || {};

  let response: ContractTransactionResponse | ContractTransactionReceipt | null = await executeContractMethod(contractName, contractAddress, methodName, args, options);

    let result: any = response;

    if ((methodName === "mint" || methodName === "mintTo") && response instanceof ContractTransactionReceipt) {
      let tokenId = null;
      tokenId = BigInt(response.logs[0].topics[3]).toString();
      result = {
        tokenId,
        transactionReceipt: response
      }
    }
/*
    if ((methodName === "lock") && response instanceof ContractTransactionReceipt) {
      let metadata = null;
      metadata = response.logs[0].topics; //BigInt(response.logs[0].topics[3]).toString();
      result = {
        metadata,
        transactionReceipt: response
      }
    }
*/
    return {
      statusCode: 201,
      body: {
        message: response instanceof ContractTransactionReceipt ? 'Transaction executed' : 'Transacion processed',
        result
    }
  }
}

export default function initContractController(_logger: Logger, _config: Config) {
  logger = _logger;
  config = _config;
}
