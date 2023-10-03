import AddressApi from "./apis/AddressApi";
import BlockApi from "./apis/BlockApi";
import TransactionApi from "./apis/TransactionApi";

export class Api {}

export interface Api extends AddressApi, BlockApi, TransactionApi {}

function applyMixins(derivedCtor: any, constructors: any[]) {
  constructors.forEach((baseCtor) => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
      Object.defineProperty(
        derivedCtor.prototype,
        name,
        Object.getOwnPropertyDescriptor(baseCtor.prototype, name) ||
          Object.create(null)
      );
    });
  });
}

applyMixins(Api, [AddressApi, BlockApi, TransactionApi]);
