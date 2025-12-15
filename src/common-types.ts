import { code, Code } from "ts-poet";

export function generateCommonTypes(): Code {
  return code`
    export interface MessageFns<T> {
      encode(message: T): Uint8Array;
      decode(data: Uint8Array): T;
      fromJSON(object: any): T;
      toJSON(message: T): unknown;
    }

    export type DeepPartial<T> = T extends Array<infer U>
      ? Array<DeepPartial<U>>
      : T extends ReadonlyArray<infer U>
      ? ReadonlyArray<DeepPartial<U>>
      : T extends {}
      ? { [K in keyof T]?: DeepPartial<T[K]> }
      : Partial<T>;

    export type Exact<P, I> = P extends Builtin
      ? P
      : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

    export type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

    export type KeysOfUnion<T> = T extends T ? keyof T : never;
  `;
} 