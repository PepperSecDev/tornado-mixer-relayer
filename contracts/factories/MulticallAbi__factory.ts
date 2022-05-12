/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { MulticallAbi, MulticallAbiInterface } from "../MulticallAbi";

const _abi = [
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
        ],
        internalType: "struct MultiCall.Call[]",
        name: "calls",
        type: "tuple[]",
      },
    ],
    name: "multicall",
    outputs: [
      {
        internalType: "bytes[]",
        name: "results",
        type: "bytes[]",
      },
      {
        internalType: "bool[]",
        name: "success",
        type: "bool[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export class MulticallAbi__factory {
  static readonly abi = _abi;
  static createInterface(): MulticallAbiInterface {
    return new utils.Interface(_abi) as MulticallAbiInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MulticallAbi {
    return new Contract(address, _abi, signerOrProvider) as MulticallAbi;
  }
}
