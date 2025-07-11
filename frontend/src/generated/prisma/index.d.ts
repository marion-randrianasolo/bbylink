
/**
 * Client
**/

import * as runtime from './runtime/binary.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model FoosballTable
 * 
 */
export type FoosballTable = $Result.DefaultSelection<Prisma.$FoosballTablePayload>
/**
 * Model Game
 * 
 */
export type Game = $Result.DefaultSelection<Prisma.$GamePayload>
/**
 * Model GamePlayer
 * 
 */
export type GamePlayer = $Result.DefaultSelection<Prisma.$GamePlayerPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends (U | 'beforeExit')>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : V extends 'beforeExit' ? () => $Utils.JsPromise<void> : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.foosballTable`: Exposes CRUD operations for the **FoosballTable** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FoosballTables
    * const foosballTables = await prisma.foosballTable.findMany()
    * ```
    */
  get foosballTable(): Prisma.FoosballTableDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.game`: Exposes CRUD operations for the **Game** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Games
    * const games = await prisma.game.findMany()
    * ```
    */
  get game(): Prisma.GameDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.gamePlayer`: Exposes CRUD operations for the **GamePlayer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GamePlayers
    * const gamePlayers = await prisma.gamePlayer.findMany()
    * ```
    */
  get gamePlayer(): Prisma.GamePlayerDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.11.1
   * Query Engine version: f40f79ec31188888a2e33acda0ecc8fd10a853a9
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    FoosballTable: 'FoosballTable',
    Game: 'Game',
    GamePlayer: 'GamePlayer'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "foosballTable" | "game" | "gamePlayer"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      FoosballTable: {
        payload: Prisma.$FoosballTablePayload<ExtArgs>
        fields: Prisma.FoosballTableFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FoosballTableFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoosballTablePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FoosballTableFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoosballTablePayload>
          }
          findFirst: {
            args: Prisma.FoosballTableFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoosballTablePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FoosballTableFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoosballTablePayload>
          }
          findMany: {
            args: Prisma.FoosballTableFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoosballTablePayload>[]
          }
          create: {
            args: Prisma.FoosballTableCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoosballTablePayload>
          }
          createMany: {
            args: Prisma.FoosballTableCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FoosballTableCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoosballTablePayload>[]
          }
          delete: {
            args: Prisma.FoosballTableDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoosballTablePayload>
          }
          update: {
            args: Prisma.FoosballTableUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoosballTablePayload>
          }
          deleteMany: {
            args: Prisma.FoosballTableDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FoosballTableUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FoosballTableUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoosballTablePayload>[]
          }
          upsert: {
            args: Prisma.FoosballTableUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoosballTablePayload>
          }
          aggregate: {
            args: Prisma.FoosballTableAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFoosballTable>
          }
          groupBy: {
            args: Prisma.FoosballTableGroupByArgs<ExtArgs>
            result: $Utils.Optional<FoosballTableGroupByOutputType>[]
          }
          count: {
            args: Prisma.FoosballTableCountArgs<ExtArgs>
            result: $Utils.Optional<FoosballTableCountAggregateOutputType> | number
          }
        }
      }
      Game: {
        payload: Prisma.$GamePayload<ExtArgs>
        fields: Prisma.GameFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GameFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GameFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          findFirst: {
            args: Prisma.GameFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GameFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          findMany: {
            args: Prisma.GameFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>[]
          }
          create: {
            args: Prisma.GameCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          createMany: {
            args: Prisma.GameCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GameCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>[]
          }
          delete: {
            args: Prisma.GameDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          update: {
            args: Prisma.GameUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          deleteMany: {
            args: Prisma.GameDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GameUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GameUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>[]
          }
          upsert: {
            args: Prisma.GameUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          aggregate: {
            args: Prisma.GameAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGame>
          }
          groupBy: {
            args: Prisma.GameGroupByArgs<ExtArgs>
            result: $Utils.Optional<GameGroupByOutputType>[]
          }
          count: {
            args: Prisma.GameCountArgs<ExtArgs>
            result: $Utils.Optional<GameCountAggregateOutputType> | number
          }
        }
      }
      GamePlayer: {
        payload: Prisma.$GamePlayerPayload<ExtArgs>
        fields: Prisma.GamePlayerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GamePlayerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePlayerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GamePlayerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePlayerPayload>
          }
          findFirst: {
            args: Prisma.GamePlayerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePlayerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GamePlayerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePlayerPayload>
          }
          findMany: {
            args: Prisma.GamePlayerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePlayerPayload>[]
          }
          create: {
            args: Prisma.GamePlayerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePlayerPayload>
          }
          createMany: {
            args: Prisma.GamePlayerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GamePlayerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePlayerPayload>[]
          }
          delete: {
            args: Prisma.GamePlayerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePlayerPayload>
          }
          update: {
            args: Prisma.GamePlayerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePlayerPayload>
          }
          deleteMany: {
            args: Prisma.GamePlayerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GamePlayerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GamePlayerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePlayerPayload>[]
          }
          upsert: {
            args: Prisma.GamePlayerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePlayerPayload>
          }
          aggregate: {
            args: Prisma.GamePlayerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGamePlayer>
          }
          groupBy: {
            args: Prisma.GamePlayerGroupByArgs<ExtArgs>
            result: $Utils.Optional<GamePlayerGroupByOutputType>[]
          }
          count: {
            args: Prisma.GamePlayerCountArgs<ExtArgs>
            result: $Utils.Optional<GamePlayerCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    foosballTable?: FoosballTableOmit
    game?: GameOmit
    gamePlayer?: GamePlayerOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    hostedGames: number
    gameParticipations: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    hostedGames?: boolean | UserCountOutputTypeCountHostedGamesArgs
    gameParticipations?: boolean | UserCountOutputTypeCountGameParticipationsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountHostedGamesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GameWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountGameParticipationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GamePlayerWhereInput
  }


  /**
   * Count Type FoosballTableCountOutputType
   */

  export type FoosballTableCountOutputType = {
    games: number
  }

  export type FoosballTableCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    games?: boolean | FoosballTableCountOutputTypeCountGamesArgs
  }

  // Custom InputTypes
  /**
   * FoosballTableCountOutputType without action
   */
  export type FoosballTableCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoosballTableCountOutputType
     */
    select?: FoosballTableCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * FoosballTableCountOutputType without action
   */
  export type FoosballTableCountOutputTypeCountGamesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GameWhereInput
  }


  /**
   * Count Type GameCountOutputType
   */

  export type GameCountOutputType = {
    players: number
  }

  export type GameCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    players?: boolean | GameCountOutputTypeCountPlayersArgs
  }

  // Custom InputTypes
  /**
   * GameCountOutputType without action
   */
  export type GameCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameCountOutputType
     */
    select?: GameCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * GameCountOutputType without action
   */
  export type GameCountOutputTypeCountPlayersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GamePlayerWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
    score: number | null
    jerseyNumber: number | null
    xp: number | null
    coins: number | null
    elo: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
    score: number | null
    jerseyNumber: number | null
    xp: number | null
    coins: number | null
    elo: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    email: string | null
    name: string | null
    password: string | null
    score: number | null
    createdAt: Date | null
    updatedAt: Date | null
    firstName: string | null
    lastName: string | null
    avatar: string | null
    jerseyNumber: number | null
    skillLevel: string | null
    position: string | null
    championship: string | null
    xp: number | null
    coins: number | null
    elo: number | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    email: string | null
    name: string | null
    password: string | null
    score: number | null
    createdAt: Date | null
    updatedAt: Date | null
    firstName: string | null
    lastName: string | null
    avatar: string | null
    jerseyNumber: number | null
    skillLevel: string | null
    position: string | null
    championship: string | null
    xp: number | null
    coins: number | null
    elo: number | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    name: number
    password: number
    score: number
    createdAt: number
    updatedAt: number
    firstName: number
    lastName: number
    avatar: number
    jerseyNumber: number
    skillLevel: number
    position: number
    championship: number
    xp: number
    coins: number
    elo: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
    score?: true
    jerseyNumber?: true
    xp?: true
    coins?: true
    elo?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
    score?: true
    jerseyNumber?: true
    xp?: true
    coins?: true
    elo?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    score?: true
    createdAt?: true
    updatedAt?: true
    firstName?: true
    lastName?: true
    avatar?: true
    jerseyNumber?: true
    skillLevel?: true
    position?: true
    championship?: true
    xp?: true
    coins?: true
    elo?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    score?: true
    createdAt?: true
    updatedAt?: true
    firstName?: true
    lastName?: true
    avatar?: true
    jerseyNumber?: true
    skillLevel?: true
    position?: true
    championship?: true
    xp?: true
    coins?: true
    elo?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    score?: true
    createdAt?: true
    updatedAt?: true
    firstName?: true
    lastName?: true
    avatar?: true
    jerseyNumber?: true
    skillLevel?: true
    position?: true
    championship?: true
    xp?: true
    coins?: true
    elo?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    email: string
    name: string
    password: string
    score: number
    createdAt: Date
    updatedAt: Date
    firstName: string | null
    lastName: string | null
    avatar: string | null
    jerseyNumber: number | null
    skillLevel: string | null
    position: string | null
    championship: string | null
    xp: number
    coins: number
    elo: number
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    score?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    firstName?: boolean
    lastName?: boolean
    avatar?: boolean
    jerseyNumber?: boolean
    skillLevel?: boolean
    position?: boolean
    championship?: boolean
    xp?: boolean
    coins?: boolean
    elo?: boolean
    hostedGames?: boolean | User$hostedGamesArgs<ExtArgs>
    gameParticipations?: boolean | User$gameParticipationsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    score?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    firstName?: boolean
    lastName?: boolean
    avatar?: boolean
    jerseyNumber?: boolean
    skillLevel?: boolean
    position?: boolean
    championship?: boolean
    xp?: boolean
    coins?: boolean
    elo?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    score?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    firstName?: boolean
    lastName?: boolean
    avatar?: boolean
    jerseyNumber?: boolean
    skillLevel?: boolean
    position?: boolean
    championship?: boolean
    xp?: boolean
    coins?: boolean
    elo?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    score?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    firstName?: boolean
    lastName?: boolean
    avatar?: boolean
    jerseyNumber?: boolean
    skillLevel?: boolean
    position?: boolean
    championship?: boolean
    xp?: boolean
    coins?: boolean
    elo?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "name" | "password" | "score" | "createdAt" | "updatedAt" | "firstName" | "lastName" | "avatar" | "jerseyNumber" | "skillLevel" | "position" | "championship" | "xp" | "coins" | "elo", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    hostedGames?: boolean | User$hostedGamesArgs<ExtArgs>
    gameParticipations?: boolean | User$gameParticipationsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      hostedGames: Prisma.$GamePayload<ExtArgs>[]
      gameParticipations: Prisma.$GamePlayerPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      email: string
      name: string
      password: string
      score: number
      createdAt: Date
      updatedAt: Date
      firstName: string | null
      lastName: string | null
      avatar: string | null
      jerseyNumber: number | null
      skillLevel: string | null
      position: string | null
      championship: string | null
      xp: number
      coins: number
      elo: number
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    hostedGames<T extends User$hostedGamesArgs<ExtArgs> = {}>(args?: Subset<T, User$hostedGamesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    gameParticipations<T extends User$gameParticipationsArgs<ExtArgs> = {}>(args?: Subset<T, User$gameParticipationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GamePlayerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly score: FieldRef<"User", 'Int'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly firstName: FieldRef<"User", 'String'>
    readonly lastName: FieldRef<"User", 'String'>
    readonly avatar: FieldRef<"User", 'String'>
    readonly jerseyNumber: FieldRef<"User", 'Int'>
    readonly skillLevel: FieldRef<"User", 'String'>
    readonly position: FieldRef<"User", 'String'>
    readonly championship: FieldRef<"User", 'String'>
    readonly xp: FieldRef<"User", 'Int'>
    readonly coins: FieldRef<"User", 'Int'>
    readonly elo: FieldRef<"User", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.hostedGames
   */
  export type User$hostedGamesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    where?: GameWhereInput
    orderBy?: GameOrderByWithRelationInput | GameOrderByWithRelationInput[]
    cursor?: GameWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GameScalarFieldEnum | GameScalarFieldEnum[]
  }

  /**
   * User.gameParticipations
   */
  export type User$gameParticipationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GamePlayer
     */
    select?: GamePlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GamePlayer
     */
    omit?: GamePlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GamePlayerInclude<ExtArgs> | null
    where?: GamePlayerWhereInput
    orderBy?: GamePlayerOrderByWithRelationInput | GamePlayerOrderByWithRelationInput[]
    cursor?: GamePlayerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GamePlayerScalarFieldEnum | GamePlayerScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model FoosballTable
   */

  export type AggregateFoosballTable = {
    _count: FoosballTableCountAggregateOutputType | null
    _avg: FoosballTableAvgAggregateOutputType | null
    _sum: FoosballTableSumAggregateOutputType | null
    _min: FoosballTableMinAggregateOutputType | null
    _max: FoosballTableMaxAggregateOutputType | null
  }

  export type FoosballTableAvgAggregateOutputType = {
    id: number | null
  }

  export type FoosballTableSumAggregateOutputType = {
    id: number | null
  }

  export type FoosballTableMinAggregateOutputType = {
    id: number | null
    name: string | null
    location: string | null
    isActive: boolean | null
    isAvailable: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FoosballTableMaxAggregateOutputType = {
    id: number | null
    name: string | null
    location: string | null
    isActive: boolean | null
    isAvailable: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FoosballTableCountAggregateOutputType = {
    id: number
    name: number
    location: number
    isActive: number
    isAvailable: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type FoosballTableAvgAggregateInputType = {
    id?: true
  }

  export type FoosballTableSumAggregateInputType = {
    id?: true
  }

  export type FoosballTableMinAggregateInputType = {
    id?: true
    name?: true
    location?: true
    isActive?: true
    isAvailable?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FoosballTableMaxAggregateInputType = {
    id?: true
    name?: true
    location?: true
    isActive?: true
    isAvailable?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FoosballTableCountAggregateInputType = {
    id?: true
    name?: true
    location?: true
    isActive?: true
    isAvailable?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type FoosballTableAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FoosballTable to aggregate.
     */
    where?: FoosballTableWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FoosballTables to fetch.
     */
    orderBy?: FoosballTableOrderByWithRelationInput | FoosballTableOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FoosballTableWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FoosballTables from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FoosballTables.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FoosballTables
    **/
    _count?: true | FoosballTableCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FoosballTableAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FoosballTableSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FoosballTableMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FoosballTableMaxAggregateInputType
  }

  export type GetFoosballTableAggregateType<T extends FoosballTableAggregateArgs> = {
        [P in keyof T & keyof AggregateFoosballTable]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFoosballTable[P]>
      : GetScalarType<T[P], AggregateFoosballTable[P]>
  }




  export type FoosballTableGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FoosballTableWhereInput
    orderBy?: FoosballTableOrderByWithAggregationInput | FoosballTableOrderByWithAggregationInput[]
    by: FoosballTableScalarFieldEnum[] | FoosballTableScalarFieldEnum
    having?: FoosballTableScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FoosballTableCountAggregateInputType | true
    _avg?: FoosballTableAvgAggregateInputType
    _sum?: FoosballTableSumAggregateInputType
    _min?: FoosballTableMinAggregateInputType
    _max?: FoosballTableMaxAggregateInputType
  }

  export type FoosballTableGroupByOutputType = {
    id: number
    name: string
    location: string
    isActive: boolean
    isAvailable: boolean
    createdAt: Date
    updatedAt: Date
    _count: FoosballTableCountAggregateOutputType | null
    _avg: FoosballTableAvgAggregateOutputType | null
    _sum: FoosballTableSumAggregateOutputType | null
    _min: FoosballTableMinAggregateOutputType | null
    _max: FoosballTableMaxAggregateOutputType | null
  }

  type GetFoosballTableGroupByPayload<T extends FoosballTableGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FoosballTableGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FoosballTableGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FoosballTableGroupByOutputType[P]>
            : GetScalarType<T[P], FoosballTableGroupByOutputType[P]>
        }
      >
    >


  export type FoosballTableSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    location?: boolean
    isActive?: boolean
    isAvailable?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    games?: boolean | FoosballTable$gamesArgs<ExtArgs>
    _count?: boolean | FoosballTableCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["foosballTable"]>

  export type FoosballTableSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    location?: boolean
    isActive?: boolean
    isAvailable?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["foosballTable"]>

  export type FoosballTableSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    location?: boolean
    isActive?: boolean
    isAvailable?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["foosballTable"]>

  export type FoosballTableSelectScalar = {
    id?: boolean
    name?: boolean
    location?: boolean
    isActive?: boolean
    isAvailable?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type FoosballTableOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "location" | "isActive" | "isAvailable" | "createdAt" | "updatedAt", ExtArgs["result"]["foosballTable"]>
  export type FoosballTableInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    games?: boolean | FoosballTable$gamesArgs<ExtArgs>
    _count?: boolean | FoosballTableCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type FoosballTableIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type FoosballTableIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $FoosballTablePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FoosballTable"
    objects: {
      games: Prisma.$GamePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      location: string
      isActive: boolean
      isAvailable: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["foosballTable"]>
    composites: {}
  }

  type FoosballTableGetPayload<S extends boolean | null | undefined | FoosballTableDefaultArgs> = $Result.GetResult<Prisma.$FoosballTablePayload, S>

  type FoosballTableCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FoosballTableFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FoosballTableCountAggregateInputType | true
    }

  export interface FoosballTableDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FoosballTable'], meta: { name: 'FoosballTable' } }
    /**
     * Find zero or one FoosballTable that matches the filter.
     * @param {FoosballTableFindUniqueArgs} args - Arguments to find a FoosballTable
     * @example
     * // Get one FoosballTable
     * const foosballTable = await prisma.foosballTable.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FoosballTableFindUniqueArgs>(args: SelectSubset<T, FoosballTableFindUniqueArgs<ExtArgs>>): Prisma__FoosballTableClient<$Result.GetResult<Prisma.$FoosballTablePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FoosballTable that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FoosballTableFindUniqueOrThrowArgs} args - Arguments to find a FoosballTable
     * @example
     * // Get one FoosballTable
     * const foosballTable = await prisma.foosballTable.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FoosballTableFindUniqueOrThrowArgs>(args: SelectSubset<T, FoosballTableFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FoosballTableClient<$Result.GetResult<Prisma.$FoosballTablePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FoosballTable that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoosballTableFindFirstArgs} args - Arguments to find a FoosballTable
     * @example
     * // Get one FoosballTable
     * const foosballTable = await prisma.foosballTable.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FoosballTableFindFirstArgs>(args?: SelectSubset<T, FoosballTableFindFirstArgs<ExtArgs>>): Prisma__FoosballTableClient<$Result.GetResult<Prisma.$FoosballTablePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FoosballTable that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoosballTableFindFirstOrThrowArgs} args - Arguments to find a FoosballTable
     * @example
     * // Get one FoosballTable
     * const foosballTable = await prisma.foosballTable.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FoosballTableFindFirstOrThrowArgs>(args?: SelectSubset<T, FoosballTableFindFirstOrThrowArgs<ExtArgs>>): Prisma__FoosballTableClient<$Result.GetResult<Prisma.$FoosballTablePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FoosballTables that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoosballTableFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FoosballTables
     * const foosballTables = await prisma.foosballTable.findMany()
     * 
     * // Get first 10 FoosballTables
     * const foosballTables = await prisma.foosballTable.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const foosballTableWithIdOnly = await prisma.foosballTable.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FoosballTableFindManyArgs>(args?: SelectSubset<T, FoosballTableFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FoosballTablePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FoosballTable.
     * @param {FoosballTableCreateArgs} args - Arguments to create a FoosballTable.
     * @example
     * // Create one FoosballTable
     * const FoosballTable = await prisma.foosballTable.create({
     *   data: {
     *     // ... data to create a FoosballTable
     *   }
     * })
     * 
     */
    create<T extends FoosballTableCreateArgs>(args: SelectSubset<T, FoosballTableCreateArgs<ExtArgs>>): Prisma__FoosballTableClient<$Result.GetResult<Prisma.$FoosballTablePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FoosballTables.
     * @param {FoosballTableCreateManyArgs} args - Arguments to create many FoosballTables.
     * @example
     * // Create many FoosballTables
     * const foosballTable = await prisma.foosballTable.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FoosballTableCreateManyArgs>(args?: SelectSubset<T, FoosballTableCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FoosballTables and returns the data saved in the database.
     * @param {FoosballTableCreateManyAndReturnArgs} args - Arguments to create many FoosballTables.
     * @example
     * // Create many FoosballTables
     * const foosballTable = await prisma.foosballTable.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FoosballTables and only return the `id`
     * const foosballTableWithIdOnly = await prisma.foosballTable.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FoosballTableCreateManyAndReturnArgs>(args?: SelectSubset<T, FoosballTableCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FoosballTablePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a FoosballTable.
     * @param {FoosballTableDeleteArgs} args - Arguments to delete one FoosballTable.
     * @example
     * // Delete one FoosballTable
     * const FoosballTable = await prisma.foosballTable.delete({
     *   where: {
     *     // ... filter to delete one FoosballTable
     *   }
     * })
     * 
     */
    delete<T extends FoosballTableDeleteArgs>(args: SelectSubset<T, FoosballTableDeleteArgs<ExtArgs>>): Prisma__FoosballTableClient<$Result.GetResult<Prisma.$FoosballTablePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FoosballTable.
     * @param {FoosballTableUpdateArgs} args - Arguments to update one FoosballTable.
     * @example
     * // Update one FoosballTable
     * const foosballTable = await prisma.foosballTable.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FoosballTableUpdateArgs>(args: SelectSubset<T, FoosballTableUpdateArgs<ExtArgs>>): Prisma__FoosballTableClient<$Result.GetResult<Prisma.$FoosballTablePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FoosballTables.
     * @param {FoosballTableDeleteManyArgs} args - Arguments to filter FoosballTables to delete.
     * @example
     * // Delete a few FoosballTables
     * const { count } = await prisma.foosballTable.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FoosballTableDeleteManyArgs>(args?: SelectSubset<T, FoosballTableDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FoosballTables.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoosballTableUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FoosballTables
     * const foosballTable = await prisma.foosballTable.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FoosballTableUpdateManyArgs>(args: SelectSubset<T, FoosballTableUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FoosballTables and returns the data updated in the database.
     * @param {FoosballTableUpdateManyAndReturnArgs} args - Arguments to update many FoosballTables.
     * @example
     * // Update many FoosballTables
     * const foosballTable = await prisma.foosballTable.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more FoosballTables and only return the `id`
     * const foosballTableWithIdOnly = await prisma.foosballTable.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FoosballTableUpdateManyAndReturnArgs>(args: SelectSubset<T, FoosballTableUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FoosballTablePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one FoosballTable.
     * @param {FoosballTableUpsertArgs} args - Arguments to update or create a FoosballTable.
     * @example
     * // Update or create a FoosballTable
     * const foosballTable = await prisma.foosballTable.upsert({
     *   create: {
     *     // ... data to create a FoosballTable
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FoosballTable we want to update
     *   }
     * })
     */
    upsert<T extends FoosballTableUpsertArgs>(args: SelectSubset<T, FoosballTableUpsertArgs<ExtArgs>>): Prisma__FoosballTableClient<$Result.GetResult<Prisma.$FoosballTablePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FoosballTables.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoosballTableCountArgs} args - Arguments to filter FoosballTables to count.
     * @example
     * // Count the number of FoosballTables
     * const count = await prisma.foosballTable.count({
     *   where: {
     *     // ... the filter for the FoosballTables we want to count
     *   }
     * })
    **/
    count<T extends FoosballTableCountArgs>(
      args?: Subset<T, FoosballTableCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FoosballTableCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FoosballTable.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoosballTableAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FoosballTableAggregateArgs>(args: Subset<T, FoosballTableAggregateArgs>): Prisma.PrismaPromise<GetFoosballTableAggregateType<T>>

    /**
     * Group by FoosballTable.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoosballTableGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FoosballTableGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FoosballTableGroupByArgs['orderBy'] }
        : { orderBy?: FoosballTableGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FoosballTableGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFoosballTableGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FoosballTable model
   */
  readonly fields: FoosballTableFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FoosballTable.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FoosballTableClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    games<T extends FoosballTable$gamesArgs<ExtArgs> = {}>(args?: Subset<T, FoosballTable$gamesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FoosballTable model
   */
  interface FoosballTableFieldRefs {
    readonly id: FieldRef<"FoosballTable", 'Int'>
    readonly name: FieldRef<"FoosballTable", 'String'>
    readonly location: FieldRef<"FoosballTable", 'String'>
    readonly isActive: FieldRef<"FoosballTable", 'Boolean'>
    readonly isAvailable: FieldRef<"FoosballTable", 'Boolean'>
    readonly createdAt: FieldRef<"FoosballTable", 'DateTime'>
    readonly updatedAt: FieldRef<"FoosballTable", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FoosballTable findUnique
   */
  export type FoosballTableFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoosballTable
     */
    select?: FoosballTableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FoosballTable
     */
    omit?: FoosballTableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoosballTableInclude<ExtArgs> | null
    /**
     * Filter, which FoosballTable to fetch.
     */
    where: FoosballTableWhereUniqueInput
  }

  /**
   * FoosballTable findUniqueOrThrow
   */
  export type FoosballTableFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoosballTable
     */
    select?: FoosballTableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FoosballTable
     */
    omit?: FoosballTableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoosballTableInclude<ExtArgs> | null
    /**
     * Filter, which FoosballTable to fetch.
     */
    where: FoosballTableWhereUniqueInput
  }

  /**
   * FoosballTable findFirst
   */
  export type FoosballTableFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoosballTable
     */
    select?: FoosballTableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FoosballTable
     */
    omit?: FoosballTableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoosballTableInclude<ExtArgs> | null
    /**
     * Filter, which FoosballTable to fetch.
     */
    where?: FoosballTableWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FoosballTables to fetch.
     */
    orderBy?: FoosballTableOrderByWithRelationInput | FoosballTableOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FoosballTables.
     */
    cursor?: FoosballTableWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FoosballTables from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FoosballTables.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FoosballTables.
     */
    distinct?: FoosballTableScalarFieldEnum | FoosballTableScalarFieldEnum[]
  }

  /**
   * FoosballTable findFirstOrThrow
   */
  export type FoosballTableFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoosballTable
     */
    select?: FoosballTableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FoosballTable
     */
    omit?: FoosballTableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoosballTableInclude<ExtArgs> | null
    /**
     * Filter, which FoosballTable to fetch.
     */
    where?: FoosballTableWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FoosballTables to fetch.
     */
    orderBy?: FoosballTableOrderByWithRelationInput | FoosballTableOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FoosballTables.
     */
    cursor?: FoosballTableWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FoosballTables from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FoosballTables.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FoosballTables.
     */
    distinct?: FoosballTableScalarFieldEnum | FoosballTableScalarFieldEnum[]
  }

  /**
   * FoosballTable findMany
   */
  export type FoosballTableFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoosballTable
     */
    select?: FoosballTableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FoosballTable
     */
    omit?: FoosballTableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoosballTableInclude<ExtArgs> | null
    /**
     * Filter, which FoosballTables to fetch.
     */
    where?: FoosballTableWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FoosballTables to fetch.
     */
    orderBy?: FoosballTableOrderByWithRelationInput | FoosballTableOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FoosballTables.
     */
    cursor?: FoosballTableWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FoosballTables from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FoosballTables.
     */
    skip?: number
    distinct?: FoosballTableScalarFieldEnum | FoosballTableScalarFieldEnum[]
  }

  /**
   * FoosballTable create
   */
  export type FoosballTableCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoosballTable
     */
    select?: FoosballTableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FoosballTable
     */
    omit?: FoosballTableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoosballTableInclude<ExtArgs> | null
    /**
     * The data needed to create a FoosballTable.
     */
    data: XOR<FoosballTableCreateInput, FoosballTableUncheckedCreateInput>
  }

  /**
   * FoosballTable createMany
   */
  export type FoosballTableCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FoosballTables.
     */
    data: FoosballTableCreateManyInput | FoosballTableCreateManyInput[]
  }

  /**
   * FoosballTable createManyAndReturn
   */
  export type FoosballTableCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoosballTable
     */
    select?: FoosballTableSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FoosballTable
     */
    omit?: FoosballTableOmit<ExtArgs> | null
    /**
     * The data used to create many FoosballTables.
     */
    data: FoosballTableCreateManyInput | FoosballTableCreateManyInput[]
  }

  /**
   * FoosballTable update
   */
  export type FoosballTableUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoosballTable
     */
    select?: FoosballTableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FoosballTable
     */
    omit?: FoosballTableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoosballTableInclude<ExtArgs> | null
    /**
     * The data needed to update a FoosballTable.
     */
    data: XOR<FoosballTableUpdateInput, FoosballTableUncheckedUpdateInput>
    /**
     * Choose, which FoosballTable to update.
     */
    where: FoosballTableWhereUniqueInput
  }

  /**
   * FoosballTable updateMany
   */
  export type FoosballTableUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FoosballTables.
     */
    data: XOR<FoosballTableUpdateManyMutationInput, FoosballTableUncheckedUpdateManyInput>
    /**
     * Filter which FoosballTables to update
     */
    where?: FoosballTableWhereInput
    /**
     * Limit how many FoosballTables to update.
     */
    limit?: number
  }

  /**
   * FoosballTable updateManyAndReturn
   */
  export type FoosballTableUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoosballTable
     */
    select?: FoosballTableSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FoosballTable
     */
    omit?: FoosballTableOmit<ExtArgs> | null
    /**
     * The data used to update FoosballTables.
     */
    data: XOR<FoosballTableUpdateManyMutationInput, FoosballTableUncheckedUpdateManyInput>
    /**
     * Filter which FoosballTables to update
     */
    where?: FoosballTableWhereInput
    /**
     * Limit how many FoosballTables to update.
     */
    limit?: number
  }

  /**
   * FoosballTable upsert
   */
  export type FoosballTableUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoosballTable
     */
    select?: FoosballTableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FoosballTable
     */
    omit?: FoosballTableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoosballTableInclude<ExtArgs> | null
    /**
     * The filter to search for the FoosballTable to update in case it exists.
     */
    where: FoosballTableWhereUniqueInput
    /**
     * In case the FoosballTable found by the `where` argument doesn't exist, create a new FoosballTable with this data.
     */
    create: XOR<FoosballTableCreateInput, FoosballTableUncheckedCreateInput>
    /**
     * In case the FoosballTable was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FoosballTableUpdateInput, FoosballTableUncheckedUpdateInput>
  }

  /**
   * FoosballTable delete
   */
  export type FoosballTableDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoosballTable
     */
    select?: FoosballTableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FoosballTable
     */
    omit?: FoosballTableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoosballTableInclude<ExtArgs> | null
    /**
     * Filter which FoosballTable to delete.
     */
    where: FoosballTableWhereUniqueInput
  }

  /**
   * FoosballTable deleteMany
   */
  export type FoosballTableDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FoosballTables to delete
     */
    where?: FoosballTableWhereInput
    /**
     * Limit how many FoosballTables to delete.
     */
    limit?: number
  }

  /**
   * FoosballTable.games
   */
  export type FoosballTable$gamesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    where?: GameWhereInput
    orderBy?: GameOrderByWithRelationInput | GameOrderByWithRelationInput[]
    cursor?: GameWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GameScalarFieldEnum | GameScalarFieldEnum[]
  }

  /**
   * FoosballTable without action
   */
  export type FoosballTableDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoosballTable
     */
    select?: FoosballTableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FoosballTable
     */
    omit?: FoosballTableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoosballTableInclude<ExtArgs> | null
  }


  /**
   * Model Game
   */

  export type AggregateGame = {
    _count: GameCountAggregateOutputType | null
    _avg: GameAvgAggregateOutputType | null
    _sum: GameSumAggregateOutputType | null
    _min: GameMinAggregateOutputType | null
    _max: GameMaxAggregateOutputType | null
  }

  export type GameAvgAggregateOutputType = {
    id: number | null
    scoreLeft: number | null
    scoreRight: number | null
    maxScore: number | null
    tableId: number | null
    hostId: number | null
  }

  export type GameSumAggregateOutputType = {
    id: number | null
    scoreLeft: number | null
    scoreRight: number | null
    maxScore: number | null
    tableId: number | null
    hostId: number | null
  }

  export type GameMinAggregateOutputType = {
    id: number | null
    code: string | null
    status: string | null
    gameMode: string | null
    scoreLeft: number | null
    scoreRight: number | null
    maxScore: number | null
    createdAt: Date | null
    updatedAt: Date | null
    startedAt: Date | null
    finishedAt: Date | null
    tableId: number | null
    hostId: number | null
  }

  export type GameMaxAggregateOutputType = {
    id: number | null
    code: string | null
    status: string | null
    gameMode: string | null
    scoreLeft: number | null
    scoreRight: number | null
    maxScore: number | null
    createdAt: Date | null
    updatedAt: Date | null
    startedAt: Date | null
    finishedAt: Date | null
    tableId: number | null
    hostId: number | null
  }

  export type GameCountAggregateOutputType = {
    id: number
    code: number
    status: number
    gameMode: number
    scoreLeft: number
    scoreRight: number
    maxScore: number
    createdAt: number
    updatedAt: number
    startedAt: number
    finishedAt: number
    tableId: number
    hostId: number
    _all: number
  }


  export type GameAvgAggregateInputType = {
    id?: true
    scoreLeft?: true
    scoreRight?: true
    maxScore?: true
    tableId?: true
    hostId?: true
  }

  export type GameSumAggregateInputType = {
    id?: true
    scoreLeft?: true
    scoreRight?: true
    maxScore?: true
    tableId?: true
    hostId?: true
  }

  export type GameMinAggregateInputType = {
    id?: true
    code?: true
    status?: true
    gameMode?: true
    scoreLeft?: true
    scoreRight?: true
    maxScore?: true
    createdAt?: true
    updatedAt?: true
    startedAt?: true
    finishedAt?: true
    tableId?: true
    hostId?: true
  }

  export type GameMaxAggregateInputType = {
    id?: true
    code?: true
    status?: true
    gameMode?: true
    scoreLeft?: true
    scoreRight?: true
    maxScore?: true
    createdAt?: true
    updatedAt?: true
    startedAt?: true
    finishedAt?: true
    tableId?: true
    hostId?: true
  }

  export type GameCountAggregateInputType = {
    id?: true
    code?: true
    status?: true
    gameMode?: true
    scoreLeft?: true
    scoreRight?: true
    maxScore?: true
    createdAt?: true
    updatedAt?: true
    startedAt?: true
    finishedAt?: true
    tableId?: true
    hostId?: true
    _all?: true
  }

  export type GameAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Game to aggregate.
     */
    where?: GameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Games to fetch.
     */
    orderBy?: GameOrderByWithRelationInput | GameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Games from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Games.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Games
    **/
    _count?: true | GameCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GameAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GameSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GameMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GameMaxAggregateInputType
  }

  export type GetGameAggregateType<T extends GameAggregateArgs> = {
        [P in keyof T & keyof AggregateGame]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGame[P]>
      : GetScalarType<T[P], AggregateGame[P]>
  }




  export type GameGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GameWhereInput
    orderBy?: GameOrderByWithAggregationInput | GameOrderByWithAggregationInput[]
    by: GameScalarFieldEnum[] | GameScalarFieldEnum
    having?: GameScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GameCountAggregateInputType | true
    _avg?: GameAvgAggregateInputType
    _sum?: GameSumAggregateInputType
    _min?: GameMinAggregateInputType
    _max?: GameMaxAggregateInputType
  }

  export type GameGroupByOutputType = {
    id: number
    code: string
    status: string
    gameMode: string
    scoreLeft: number
    scoreRight: number
    maxScore: number
    createdAt: Date
    updatedAt: Date
    startedAt: Date | null
    finishedAt: Date | null
    tableId: number
    hostId: number
    _count: GameCountAggregateOutputType | null
    _avg: GameAvgAggregateOutputType | null
    _sum: GameSumAggregateOutputType | null
    _min: GameMinAggregateOutputType | null
    _max: GameMaxAggregateOutputType | null
  }

  type GetGameGroupByPayload<T extends GameGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GameGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GameGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GameGroupByOutputType[P]>
            : GetScalarType<T[P], GameGroupByOutputType[P]>
        }
      >
    >


  export type GameSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    status?: boolean
    gameMode?: boolean
    scoreLeft?: boolean
    scoreRight?: boolean
    maxScore?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    startedAt?: boolean
    finishedAt?: boolean
    tableId?: boolean
    hostId?: boolean
    table?: boolean | FoosballTableDefaultArgs<ExtArgs>
    host?: boolean | UserDefaultArgs<ExtArgs>
    players?: boolean | Game$playersArgs<ExtArgs>
    _count?: boolean | GameCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["game"]>

  export type GameSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    status?: boolean
    gameMode?: boolean
    scoreLeft?: boolean
    scoreRight?: boolean
    maxScore?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    startedAt?: boolean
    finishedAt?: boolean
    tableId?: boolean
    hostId?: boolean
    table?: boolean | FoosballTableDefaultArgs<ExtArgs>
    host?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["game"]>

  export type GameSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    status?: boolean
    gameMode?: boolean
    scoreLeft?: boolean
    scoreRight?: boolean
    maxScore?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    startedAt?: boolean
    finishedAt?: boolean
    tableId?: boolean
    hostId?: boolean
    table?: boolean | FoosballTableDefaultArgs<ExtArgs>
    host?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["game"]>

  export type GameSelectScalar = {
    id?: boolean
    code?: boolean
    status?: boolean
    gameMode?: boolean
    scoreLeft?: boolean
    scoreRight?: boolean
    maxScore?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    startedAt?: boolean
    finishedAt?: boolean
    tableId?: boolean
    hostId?: boolean
  }

  export type GameOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "code" | "status" | "gameMode" | "scoreLeft" | "scoreRight" | "maxScore" | "createdAt" | "updatedAt" | "startedAt" | "finishedAt" | "tableId" | "hostId", ExtArgs["result"]["game"]>
  export type GameInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    table?: boolean | FoosballTableDefaultArgs<ExtArgs>
    host?: boolean | UserDefaultArgs<ExtArgs>
    players?: boolean | Game$playersArgs<ExtArgs>
    _count?: boolean | GameCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type GameIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    table?: boolean | FoosballTableDefaultArgs<ExtArgs>
    host?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type GameIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    table?: boolean | FoosballTableDefaultArgs<ExtArgs>
    host?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $GamePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Game"
    objects: {
      table: Prisma.$FoosballTablePayload<ExtArgs>
      host: Prisma.$UserPayload<ExtArgs>
      players: Prisma.$GamePlayerPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      code: string
      status: string
      gameMode: string
      scoreLeft: number
      scoreRight: number
      maxScore: number
      createdAt: Date
      updatedAt: Date
      startedAt: Date | null
      finishedAt: Date | null
      tableId: number
      hostId: number
    }, ExtArgs["result"]["game"]>
    composites: {}
  }

  type GameGetPayload<S extends boolean | null | undefined | GameDefaultArgs> = $Result.GetResult<Prisma.$GamePayload, S>

  type GameCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GameFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GameCountAggregateInputType | true
    }

  export interface GameDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Game'], meta: { name: 'Game' } }
    /**
     * Find zero or one Game that matches the filter.
     * @param {GameFindUniqueArgs} args - Arguments to find a Game
     * @example
     * // Get one Game
     * const game = await prisma.game.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GameFindUniqueArgs>(args: SelectSubset<T, GameFindUniqueArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Game that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GameFindUniqueOrThrowArgs} args - Arguments to find a Game
     * @example
     * // Get one Game
     * const game = await prisma.game.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GameFindUniqueOrThrowArgs>(args: SelectSubset<T, GameFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Game that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameFindFirstArgs} args - Arguments to find a Game
     * @example
     * // Get one Game
     * const game = await prisma.game.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GameFindFirstArgs>(args?: SelectSubset<T, GameFindFirstArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Game that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameFindFirstOrThrowArgs} args - Arguments to find a Game
     * @example
     * // Get one Game
     * const game = await prisma.game.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GameFindFirstOrThrowArgs>(args?: SelectSubset<T, GameFindFirstOrThrowArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Games that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Games
     * const games = await prisma.game.findMany()
     * 
     * // Get first 10 Games
     * const games = await prisma.game.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const gameWithIdOnly = await prisma.game.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GameFindManyArgs>(args?: SelectSubset<T, GameFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Game.
     * @param {GameCreateArgs} args - Arguments to create a Game.
     * @example
     * // Create one Game
     * const Game = await prisma.game.create({
     *   data: {
     *     // ... data to create a Game
     *   }
     * })
     * 
     */
    create<T extends GameCreateArgs>(args: SelectSubset<T, GameCreateArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Games.
     * @param {GameCreateManyArgs} args - Arguments to create many Games.
     * @example
     * // Create many Games
     * const game = await prisma.game.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GameCreateManyArgs>(args?: SelectSubset<T, GameCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Games and returns the data saved in the database.
     * @param {GameCreateManyAndReturnArgs} args - Arguments to create many Games.
     * @example
     * // Create many Games
     * const game = await prisma.game.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Games and only return the `id`
     * const gameWithIdOnly = await prisma.game.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GameCreateManyAndReturnArgs>(args?: SelectSubset<T, GameCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Game.
     * @param {GameDeleteArgs} args - Arguments to delete one Game.
     * @example
     * // Delete one Game
     * const Game = await prisma.game.delete({
     *   where: {
     *     // ... filter to delete one Game
     *   }
     * })
     * 
     */
    delete<T extends GameDeleteArgs>(args: SelectSubset<T, GameDeleteArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Game.
     * @param {GameUpdateArgs} args - Arguments to update one Game.
     * @example
     * // Update one Game
     * const game = await prisma.game.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GameUpdateArgs>(args: SelectSubset<T, GameUpdateArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Games.
     * @param {GameDeleteManyArgs} args - Arguments to filter Games to delete.
     * @example
     * // Delete a few Games
     * const { count } = await prisma.game.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GameDeleteManyArgs>(args?: SelectSubset<T, GameDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Games.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Games
     * const game = await prisma.game.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GameUpdateManyArgs>(args: SelectSubset<T, GameUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Games and returns the data updated in the database.
     * @param {GameUpdateManyAndReturnArgs} args - Arguments to update many Games.
     * @example
     * // Update many Games
     * const game = await prisma.game.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Games and only return the `id`
     * const gameWithIdOnly = await prisma.game.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GameUpdateManyAndReturnArgs>(args: SelectSubset<T, GameUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Game.
     * @param {GameUpsertArgs} args - Arguments to update or create a Game.
     * @example
     * // Update or create a Game
     * const game = await prisma.game.upsert({
     *   create: {
     *     // ... data to create a Game
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Game we want to update
     *   }
     * })
     */
    upsert<T extends GameUpsertArgs>(args: SelectSubset<T, GameUpsertArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Games.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameCountArgs} args - Arguments to filter Games to count.
     * @example
     * // Count the number of Games
     * const count = await prisma.game.count({
     *   where: {
     *     // ... the filter for the Games we want to count
     *   }
     * })
    **/
    count<T extends GameCountArgs>(
      args?: Subset<T, GameCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GameCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Game.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GameAggregateArgs>(args: Subset<T, GameAggregateArgs>): Prisma.PrismaPromise<GetGameAggregateType<T>>

    /**
     * Group by Game.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GameGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GameGroupByArgs['orderBy'] }
        : { orderBy?: GameGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GameGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGameGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Game model
   */
  readonly fields: GameFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Game.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GameClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    table<T extends FoosballTableDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FoosballTableDefaultArgs<ExtArgs>>): Prisma__FoosballTableClient<$Result.GetResult<Prisma.$FoosballTablePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    host<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    players<T extends Game$playersArgs<ExtArgs> = {}>(args?: Subset<T, Game$playersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GamePlayerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Game model
   */
  interface GameFieldRefs {
    readonly id: FieldRef<"Game", 'Int'>
    readonly code: FieldRef<"Game", 'String'>
    readonly status: FieldRef<"Game", 'String'>
    readonly gameMode: FieldRef<"Game", 'String'>
    readonly scoreLeft: FieldRef<"Game", 'Int'>
    readonly scoreRight: FieldRef<"Game", 'Int'>
    readonly maxScore: FieldRef<"Game", 'Int'>
    readonly createdAt: FieldRef<"Game", 'DateTime'>
    readonly updatedAt: FieldRef<"Game", 'DateTime'>
    readonly startedAt: FieldRef<"Game", 'DateTime'>
    readonly finishedAt: FieldRef<"Game", 'DateTime'>
    readonly tableId: FieldRef<"Game", 'Int'>
    readonly hostId: FieldRef<"Game", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Game findUnique
   */
  export type GameFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * Filter, which Game to fetch.
     */
    where: GameWhereUniqueInput
  }

  /**
   * Game findUniqueOrThrow
   */
  export type GameFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * Filter, which Game to fetch.
     */
    where: GameWhereUniqueInput
  }

  /**
   * Game findFirst
   */
  export type GameFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * Filter, which Game to fetch.
     */
    where?: GameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Games to fetch.
     */
    orderBy?: GameOrderByWithRelationInput | GameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Games.
     */
    cursor?: GameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Games from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Games.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Games.
     */
    distinct?: GameScalarFieldEnum | GameScalarFieldEnum[]
  }

  /**
   * Game findFirstOrThrow
   */
  export type GameFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * Filter, which Game to fetch.
     */
    where?: GameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Games to fetch.
     */
    orderBy?: GameOrderByWithRelationInput | GameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Games.
     */
    cursor?: GameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Games from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Games.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Games.
     */
    distinct?: GameScalarFieldEnum | GameScalarFieldEnum[]
  }

  /**
   * Game findMany
   */
  export type GameFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * Filter, which Games to fetch.
     */
    where?: GameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Games to fetch.
     */
    orderBy?: GameOrderByWithRelationInput | GameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Games.
     */
    cursor?: GameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Games from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Games.
     */
    skip?: number
    distinct?: GameScalarFieldEnum | GameScalarFieldEnum[]
  }

  /**
   * Game create
   */
  export type GameCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * The data needed to create a Game.
     */
    data: XOR<GameCreateInput, GameUncheckedCreateInput>
  }

  /**
   * Game createMany
   */
  export type GameCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Games.
     */
    data: GameCreateManyInput | GameCreateManyInput[]
  }

  /**
   * Game createManyAndReturn
   */
  export type GameCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * The data used to create many Games.
     */
    data: GameCreateManyInput | GameCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Game update
   */
  export type GameUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * The data needed to update a Game.
     */
    data: XOR<GameUpdateInput, GameUncheckedUpdateInput>
    /**
     * Choose, which Game to update.
     */
    where: GameWhereUniqueInput
  }

  /**
   * Game updateMany
   */
  export type GameUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Games.
     */
    data: XOR<GameUpdateManyMutationInput, GameUncheckedUpdateManyInput>
    /**
     * Filter which Games to update
     */
    where?: GameWhereInput
    /**
     * Limit how many Games to update.
     */
    limit?: number
  }

  /**
   * Game updateManyAndReturn
   */
  export type GameUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * The data used to update Games.
     */
    data: XOR<GameUpdateManyMutationInput, GameUncheckedUpdateManyInput>
    /**
     * Filter which Games to update
     */
    where?: GameWhereInput
    /**
     * Limit how many Games to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Game upsert
   */
  export type GameUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * The filter to search for the Game to update in case it exists.
     */
    where: GameWhereUniqueInput
    /**
     * In case the Game found by the `where` argument doesn't exist, create a new Game with this data.
     */
    create: XOR<GameCreateInput, GameUncheckedCreateInput>
    /**
     * In case the Game was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GameUpdateInput, GameUncheckedUpdateInput>
  }

  /**
   * Game delete
   */
  export type GameDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * Filter which Game to delete.
     */
    where: GameWhereUniqueInput
  }

  /**
   * Game deleteMany
   */
  export type GameDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Games to delete
     */
    where?: GameWhereInput
    /**
     * Limit how many Games to delete.
     */
    limit?: number
  }

  /**
   * Game.players
   */
  export type Game$playersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GamePlayer
     */
    select?: GamePlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GamePlayer
     */
    omit?: GamePlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GamePlayerInclude<ExtArgs> | null
    where?: GamePlayerWhereInput
    orderBy?: GamePlayerOrderByWithRelationInput | GamePlayerOrderByWithRelationInput[]
    cursor?: GamePlayerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GamePlayerScalarFieldEnum | GamePlayerScalarFieldEnum[]
  }

  /**
   * Game without action
   */
  export type GameDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
  }


  /**
   * Model GamePlayer
   */

  export type AggregateGamePlayer = {
    _count: GamePlayerCountAggregateOutputType | null
    _avg: GamePlayerAvgAggregateOutputType | null
    _sum: GamePlayerSumAggregateOutputType | null
    _min: GamePlayerMinAggregateOutputType | null
    _max: GamePlayerMaxAggregateOutputType | null
  }

  export type GamePlayerAvgAggregateOutputType = {
    id: number | null
    gameId: number | null
    userId: number | null
  }

  export type GamePlayerSumAggregateOutputType = {
    id: number | null
    gameId: number | null
    userId: number | null
  }

  export type GamePlayerMinAggregateOutputType = {
    id: number | null
    team: string | null
    position: string | null
    isGuest: boolean | null
    guestName: string | null
    gameId: number | null
    userId: number | null
  }

  export type GamePlayerMaxAggregateOutputType = {
    id: number | null
    team: string | null
    position: string | null
    isGuest: boolean | null
    guestName: string | null
    gameId: number | null
    userId: number | null
  }

  export type GamePlayerCountAggregateOutputType = {
    id: number
    team: number
    position: number
    isGuest: number
    guestName: number
    gameId: number
    userId: number
    _all: number
  }


  export type GamePlayerAvgAggregateInputType = {
    id?: true
    gameId?: true
    userId?: true
  }

  export type GamePlayerSumAggregateInputType = {
    id?: true
    gameId?: true
    userId?: true
  }

  export type GamePlayerMinAggregateInputType = {
    id?: true
    team?: true
    position?: true
    isGuest?: true
    guestName?: true
    gameId?: true
    userId?: true
  }

  export type GamePlayerMaxAggregateInputType = {
    id?: true
    team?: true
    position?: true
    isGuest?: true
    guestName?: true
    gameId?: true
    userId?: true
  }

  export type GamePlayerCountAggregateInputType = {
    id?: true
    team?: true
    position?: true
    isGuest?: true
    guestName?: true
    gameId?: true
    userId?: true
    _all?: true
  }

  export type GamePlayerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GamePlayer to aggregate.
     */
    where?: GamePlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GamePlayers to fetch.
     */
    orderBy?: GamePlayerOrderByWithRelationInput | GamePlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GamePlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GamePlayers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GamePlayers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GamePlayers
    **/
    _count?: true | GamePlayerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GamePlayerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GamePlayerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GamePlayerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GamePlayerMaxAggregateInputType
  }

  export type GetGamePlayerAggregateType<T extends GamePlayerAggregateArgs> = {
        [P in keyof T & keyof AggregateGamePlayer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGamePlayer[P]>
      : GetScalarType<T[P], AggregateGamePlayer[P]>
  }




  export type GamePlayerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GamePlayerWhereInput
    orderBy?: GamePlayerOrderByWithAggregationInput | GamePlayerOrderByWithAggregationInput[]
    by: GamePlayerScalarFieldEnum[] | GamePlayerScalarFieldEnum
    having?: GamePlayerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GamePlayerCountAggregateInputType | true
    _avg?: GamePlayerAvgAggregateInputType
    _sum?: GamePlayerSumAggregateInputType
    _min?: GamePlayerMinAggregateInputType
    _max?: GamePlayerMaxAggregateInputType
  }

  export type GamePlayerGroupByOutputType = {
    id: number
    team: string
    position: string | null
    isGuest: boolean
    guestName: string | null
    gameId: number
    userId: number | null
    _count: GamePlayerCountAggregateOutputType | null
    _avg: GamePlayerAvgAggregateOutputType | null
    _sum: GamePlayerSumAggregateOutputType | null
    _min: GamePlayerMinAggregateOutputType | null
    _max: GamePlayerMaxAggregateOutputType | null
  }

  type GetGamePlayerGroupByPayload<T extends GamePlayerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GamePlayerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GamePlayerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GamePlayerGroupByOutputType[P]>
            : GetScalarType<T[P], GamePlayerGroupByOutputType[P]>
        }
      >
    >


  export type GamePlayerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    team?: boolean
    position?: boolean
    isGuest?: boolean
    guestName?: boolean
    gameId?: boolean
    userId?: boolean
    game?: boolean | GameDefaultArgs<ExtArgs>
    user?: boolean | GamePlayer$userArgs<ExtArgs>
  }, ExtArgs["result"]["gamePlayer"]>

  export type GamePlayerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    team?: boolean
    position?: boolean
    isGuest?: boolean
    guestName?: boolean
    gameId?: boolean
    userId?: boolean
    game?: boolean | GameDefaultArgs<ExtArgs>
    user?: boolean | GamePlayer$userArgs<ExtArgs>
  }, ExtArgs["result"]["gamePlayer"]>

  export type GamePlayerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    team?: boolean
    position?: boolean
    isGuest?: boolean
    guestName?: boolean
    gameId?: boolean
    userId?: boolean
    game?: boolean | GameDefaultArgs<ExtArgs>
    user?: boolean | GamePlayer$userArgs<ExtArgs>
  }, ExtArgs["result"]["gamePlayer"]>

  export type GamePlayerSelectScalar = {
    id?: boolean
    team?: boolean
    position?: boolean
    isGuest?: boolean
    guestName?: boolean
    gameId?: boolean
    userId?: boolean
  }

  export type GamePlayerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "team" | "position" | "isGuest" | "guestName" | "gameId" | "userId", ExtArgs["result"]["gamePlayer"]>
  export type GamePlayerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    game?: boolean | GameDefaultArgs<ExtArgs>
    user?: boolean | GamePlayer$userArgs<ExtArgs>
  }
  export type GamePlayerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    game?: boolean | GameDefaultArgs<ExtArgs>
    user?: boolean | GamePlayer$userArgs<ExtArgs>
  }
  export type GamePlayerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    game?: boolean | GameDefaultArgs<ExtArgs>
    user?: boolean | GamePlayer$userArgs<ExtArgs>
  }

  export type $GamePlayerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GamePlayer"
    objects: {
      game: Prisma.$GamePayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      team: string
      position: string | null
      isGuest: boolean
      guestName: string | null
      gameId: number
      userId: number | null
    }, ExtArgs["result"]["gamePlayer"]>
    composites: {}
  }

  type GamePlayerGetPayload<S extends boolean | null | undefined | GamePlayerDefaultArgs> = $Result.GetResult<Prisma.$GamePlayerPayload, S>

  type GamePlayerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GamePlayerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GamePlayerCountAggregateInputType | true
    }

  export interface GamePlayerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GamePlayer'], meta: { name: 'GamePlayer' } }
    /**
     * Find zero or one GamePlayer that matches the filter.
     * @param {GamePlayerFindUniqueArgs} args - Arguments to find a GamePlayer
     * @example
     * // Get one GamePlayer
     * const gamePlayer = await prisma.gamePlayer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GamePlayerFindUniqueArgs>(args: SelectSubset<T, GamePlayerFindUniqueArgs<ExtArgs>>): Prisma__GamePlayerClient<$Result.GetResult<Prisma.$GamePlayerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one GamePlayer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GamePlayerFindUniqueOrThrowArgs} args - Arguments to find a GamePlayer
     * @example
     * // Get one GamePlayer
     * const gamePlayer = await prisma.gamePlayer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GamePlayerFindUniqueOrThrowArgs>(args: SelectSubset<T, GamePlayerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GamePlayerClient<$Result.GetResult<Prisma.$GamePlayerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GamePlayer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GamePlayerFindFirstArgs} args - Arguments to find a GamePlayer
     * @example
     * // Get one GamePlayer
     * const gamePlayer = await prisma.gamePlayer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GamePlayerFindFirstArgs>(args?: SelectSubset<T, GamePlayerFindFirstArgs<ExtArgs>>): Prisma__GamePlayerClient<$Result.GetResult<Prisma.$GamePlayerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GamePlayer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GamePlayerFindFirstOrThrowArgs} args - Arguments to find a GamePlayer
     * @example
     * // Get one GamePlayer
     * const gamePlayer = await prisma.gamePlayer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GamePlayerFindFirstOrThrowArgs>(args?: SelectSubset<T, GamePlayerFindFirstOrThrowArgs<ExtArgs>>): Prisma__GamePlayerClient<$Result.GetResult<Prisma.$GamePlayerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more GamePlayers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GamePlayerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GamePlayers
     * const gamePlayers = await prisma.gamePlayer.findMany()
     * 
     * // Get first 10 GamePlayers
     * const gamePlayers = await prisma.gamePlayer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const gamePlayerWithIdOnly = await prisma.gamePlayer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GamePlayerFindManyArgs>(args?: SelectSubset<T, GamePlayerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GamePlayerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a GamePlayer.
     * @param {GamePlayerCreateArgs} args - Arguments to create a GamePlayer.
     * @example
     * // Create one GamePlayer
     * const GamePlayer = await prisma.gamePlayer.create({
     *   data: {
     *     // ... data to create a GamePlayer
     *   }
     * })
     * 
     */
    create<T extends GamePlayerCreateArgs>(args: SelectSubset<T, GamePlayerCreateArgs<ExtArgs>>): Prisma__GamePlayerClient<$Result.GetResult<Prisma.$GamePlayerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many GamePlayers.
     * @param {GamePlayerCreateManyArgs} args - Arguments to create many GamePlayers.
     * @example
     * // Create many GamePlayers
     * const gamePlayer = await prisma.gamePlayer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GamePlayerCreateManyArgs>(args?: SelectSubset<T, GamePlayerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GamePlayers and returns the data saved in the database.
     * @param {GamePlayerCreateManyAndReturnArgs} args - Arguments to create many GamePlayers.
     * @example
     * // Create many GamePlayers
     * const gamePlayer = await prisma.gamePlayer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GamePlayers and only return the `id`
     * const gamePlayerWithIdOnly = await prisma.gamePlayer.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GamePlayerCreateManyAndReturnArgs>(args?: SelectSubset<T, GamePlayerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GamePlayerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a GamePlayer.
     * @param {GamePlayerDeleteArgs} args - Arguments to delete one GamePlayer.
     * @example
     * // Delete one GamePlayer
     * const GamePlayer = await prisma.gamePlayer.delete({
     *   where: {
     *     // ... filter to delete one GamePlayer
     *   }
     * })
     * 
     */
    delete<T extends GamePlayerDeleteArgs>(args: SelectSubset<T, GamePlayerDeleteArgs<ExtArgs>>): Prisma__GamePlayerClient<$Result.GetResult<Prisma.$GamePlayerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one GamePlayer.
     * @param {GamePlayerUpdateArgs} args - Arguments to update one GamePlayer.
     * @example
     * // Update one GamePlayer
     * const gamePlayer = await prisma.gamePlayer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GamePlayerUpdateArgs>(args: SelectSubset<T, GamePlayerUpdateArgs<ExtArgs>>): Prisma__GamePlayerClient<$Result.GetResult<Prisma.$GamePlayerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more GamePlayers.
     * @param {GamePlayerDeleteManyArgs} args - Arguments to filter GamePlayers to delete.
     * @example
     * // Delete a few GamePlayers
     * const { count } = await prisma.gamePlayer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GamePlayerDeleteManyArgs>(args?: SelectSubset<T, GamePlayerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GamePlayers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GamePlayerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GamePlayers
     * const gamePlayer = await prisma.gamePlayer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GamePlayerUpdateManyArgs>(args: SelectSubset<T, GamePlayerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GamePlayers and returns the data updated in the database.
     * @param {GamePlayerUpdateManyAndReturnArgs} args - Arguments to update many GamePlayers.
     * @example
     * // Update many GamePlayers
     * const gamePlayer = await prisma.gamePlayer.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more GamePlayers and only return the `id`
     * const gamePlayerWithIdOnly = await prisma.gamePlayer.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GamePlayerUpdateManyAndReturnArgs>(args: SelectSubset<T, GamePlayerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GamePlayerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one GamePlayer.
     * @param {GamePlayerUpsertArgs} args - Arguments to update or create a GamePlayer.
     * @example
     * // Update or create a GamePlayer
     * const gamePlayer = await prisma.gamePlayer.upsert({
     *   create: {
     *     // ... data to create a GamePlayer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GamePlayer we want to update
     *   }
     * })
     */
    upsert<T extends GamePlayerUpsertArgs>(args: SelectSubset<T, GamePlayerUpsertArgs<ExtArgs>>): Prisma__GamePlayerClient<$Result.GetResult<Prisma.$GamePlayerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of GamePlayers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GamePlayerCountArgs} args - Arguments to filter GamePlayers to count.
     * @example
     * // Count the number of GamePlayers
     * const count = await prisma.gamePlayer.count({
     *   where: {
     *     // ... the filter for the GamePlayers we want to count
     *   }
     * })
    **/
    count<T extends GamePlayerCountArgs>(
      args?: Subset<T, GamePlayerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GamePlayerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GamePlayer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GamePlayerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GamePlayerAggregateArgs>(args: Subset<T, GamePlayerAggregateArgs>): Prisma.PrismaPromise<GetGamePlayerAggregateType<T>>

    /**
     * Group by GamePlayer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GamePlayerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GamePlayerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GamePlayerGroupByArgs['orderBy'] }
        : { orderBy?: GamePlayerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GamePlayerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGamePlayerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GamePlayer model
   */
  readonly fields: GamePlayerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GamePlayer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GamePlayerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    game<T extends GameDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GameDefaultArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends GamePlayer$userArgs<ExtArgs> = {}>(args?: Subset<T, GamePlayer$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the GamePlayer model
   */
  interface GamePlayerFieldRefs {
    readonly id: FieldRef<"GamePlayer", 'Int'>
    readonly team: FieldRef<"GamePlayer", 'String'>
    readonly position: FieldRef<"GamePlayer", 'String'>
    readonly isGuest: FieldRef<"GamePlayer", 'Boolean'>
    readonly guestName: FieldRef<"GamePlayer", 'String'>
    readonly gameId: FieldRef<"GamePlayer", 'Int'>
    readonly userId: FieldRef<"GamePlayer", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * GamePlayer findUnique
   */
  export type GamePlayerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GamePlayer
     */
    select?: GamePlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GamePlayer
     */
    omit?: GamePlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GamePlayerInclude<ExtArgs> | null
    /**
     * Filter, which GamePlayer to fetch.
     */
    where: GamePlayerWhereUniqueInput
  }

  /**
   * GamePlayer findUniqueOrThrow
   */
  export type GamePlayerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GamePlayer
     */
    select?: GamePlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GamePlayer
     */
    omit?: GamePlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GamePlayerInclude<ExtArgs> | null
    /**
     * Filter, which GamePlayer to fetch.
     */
    where: GamePlayerWhereUniqueInput
  }

  /**
   * GamePlayer findFirst
   */
  export type GamePlayerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GamePlayer
     */
    select?: GamePlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GamePlayer
     */
    omit?: GamePlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GamePlayerInclude<ExtArgs> | null
    /**
     * Filter, which GamePlayer to fetch.
     */
    where?: GamePlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GamePlayers to fetch.
     */
    orderBy?: GamePlayerOrderByWithRelationInput | GamePlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GamePlayers.
     */
    cursor?: GamePlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GamePlayers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GamePlayers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GamePlayers.
     */
    distinct?: GamePlayerScalarFieldEnum | GamePlayerScalarFieldEnum[]
  }

  /**
   * GamePlayer findFirstOrThrow
   */
  export type GamePlayerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GamePlayer
     */
    select?: GamePlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GamePlayer
     */
    omit?: GamePlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GamePlayerInclude<ExtArgs> | null
    /**
     * Filter, which GamePlayer to fetch.
     */
    where?: GamePlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GamePlayers to fetch.
     */
    orderBy?: GamePlayerOrderByWithRelationInput | GamePlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GamePlayers.
     */
    cursor?: GamePlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GamePlayers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GamePlayers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GamePlayers.
     */
    distinct?: GamePlayerScalarFieldEnum | GamePlayerScalarFieldEnum[]
  }

  /**
   * GamePlayer findMany
   */
  export type GamePlayerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GamePlayer
     */
    select?: GamePlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GamePlayer
     */
    omit?: GamePlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GamePlayerInclude<ExtArgs> | null
    /**
     * Filter, which GamePlayers to fetch.
     */
    where?: GamePlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GamePlayers to fetch.
     */
    orderBy?: GamePlayerOrderByWithRelationInput | GamePlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GamePlayers.
     */
    cursor?: GamePlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GamePlayers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GamePlayers.
     */
    skip?: number
    distinct?: GamePlayerScalarFieldEnum | GamePlayerScalarFieldEnum[]
  }

  /**
   * GamePlayer create
   */
  export type GamePlayerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GamePlayer
     */
    select?: GamePlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GamePlayer
     */
    omit?: GamePlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GamePlayerInclude<ExtArgs> | null
    /**
     * The data needed to create a GamePlayer.
     */
    data: XOR<GamePlayerCreateInput, GamePlayerUncheckedCreateInput>
  }

  /**
   * GamePlayer createMany
   */
  export type GamePlayerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GamePlayers.
     */
    data: GamePlayerCreateManyInput | GamePlayerCreateManyInput[]
  }

  /**
   * GamePlayer createManyAndReturn
   */
  export type GamePlayerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GamePlayer
     */
    select?: GamePlayerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GamePlayer
     */
    omit?: GamePlayerOmit<ExtArgs> | null
    /**
     * The data used to create many GamePlayers.
     */
    data: GamePlayerCreateManyInput | GamePlayerCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GamePlayerIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * GamePlayer update
   */
  export type GamePlayerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GamePlayer
     */
    select?: GamePlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GamePlayer
     */
    omit?: GamePlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GamePlayerInclude<ExtArgs> | null
    /**
     * The data needed to update a GamePlayer.
     */
    data: XOR<GamePlayerUpdateInput, GamePlayerUncheckedUpdateInput>
    /**
     * Choose, which GamePlayer to update.
     */
    where: GamePlayerWhereUniqueInput
  }

  /**
   * GamePlayer updateMany
   */
  export type GamePlayerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GamePlayers.
     */
    data: XOR<GamePlayerUpdateManyMutationInput, GamePlayerUncheckedUpdateManyInput>
    /**
     * Filter which GamePlayers to update
     */
    where?: GamePlayerWhereInput
    /**
     * Limit how many GamePlayers to update.
     */
    limit?: number
  }

  /**
   * GamePlayer updateManyAndReturn
   */
  export type GamePlayerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GamePlayer
     */
    select?: GamePlayerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GamePlayer
     */
    omit?: GamePlayerOmit<ExtArgs> | null
    /**
     * The data used to update GamePlayers.
     */
    data: XOR<GamePlayerUpdateManyMutationInput, GamePlayerUncheckedUpdateManyInput>
    /**
     * Filter which GamePlayers to update
     */
    where?: GamePlayerWhereInput
    /**
     * Limit how many GamePlayers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GamePlayerIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * GamePlayer upsert
   */
  export type GamePlayerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GamePlayer
     */
    select?: GamePlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GamePlayer
     */
    omit?: GamePlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GamePlayerInclude<ExtArgs> | null
    /**
     * The filter to search for the GamePlayer to update in case it exists.
     */
    where: GamePlayerWhereUniqueInput
    /**
     * In case the GamePlayer found by the `where` argument doesn't exist, create a new GamePlayer with this data.
     */
    create: XOR<GamePlayerCreateInput, GamePlayerUncheckedCreateInput>
    /**
     * In case the GamePlayer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GamePlayerUpdateInput, GamePlayerUncheckedUpdateInput>
  }

  /**
   * GamePlayer delete
   */
  export type GamePlayerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GamePlayer
     */
    select?: GamePlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GamePlayer
     */
    omit?: GamePlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GamePlayerInclude<ExtArgs> | null
    /**
     * Filter which GamePlayer to delete.
     */
    where: GamePlayerWhereUniqueInput
  }

  /**
   * GamePlayer deleteMany
   */
  export type GamePlayerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GamePlayers to delete
     */
    where?: GamePlayerWhereInput
    /**
     * Limit how many GamePlayers to delete.
     */
    limit?: number
  }

  /**
   * GamePlayer.user
   */
  export type GamePlayer$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * GamePlayer without action
   */
  export type GamePlayerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GamePlayer
     */
    select?: GamePlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GamePlayer
     */
    omit?: GamePlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GamePlayerInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    password: 'password',
    score: 'score',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    firstName: 'firstName',
    lastName: 'lastName',
    avatar: 'avatar',
    jerseyNumber: 'jerseyNumber',
    skillLevel: 'skillLevel',
    position: 'position',
    championship: 'championship',
    xp: 'xp',
    coins: 'coins',
    elo: 'elo'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const FoosballTableScalarFieldEnum: {
    id: 'id',
    name: 'name',
    location: 'location',
    isActive: 'isActive',
    isAvailable: 'isAvailable',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type FoosballTableScalarFieldEnum = (typeof FoosballTableScalarFieldEnum)[keyof typeof FoosballTableScalarFieldEnum]


  export const GameScalarFieldEnum: {
    id: 'id',
    code: 'code',
    status: 'status',
    gameMode: 'gameMode',
    scoreLeft: 'scoreLeft',
    scoreRight: 'scoreRight',
    maxScore: 'maxScore',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    startedAt: 'startedAt',
    finishedAt: 'finishedAt',
    tableId: 'tableId',
    hostId: 'hostId'
  };

  export type GameScalarFieldEnum = (typeof GameScalarFieldEnum)[keyof typeof GameScalarFieldEnum]


  export const GamePlayerScalarFieldEnum: {
    id: 'id',
    team: 'team',
    position: 'position',
    isGuest: 'isGuest',
    guestName: 'guestName',
    gameId: 'gameId',
    userId: 'userId'
  };

  export type GamePlayerScalarFieldEnum = (typeof GamePlayerScalarFieldEnum)[keyof typeof GamePlayerScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    email?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    score?: IntFilter<"User"> | number
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    firstName?: StringNullableFilter<"User"> | string | null
    lastName?: StringNullableFilter<"User"> | string | null
    avatar?: StringNullableFilter<"User"> | string | null
    jerseyNumber?: IntNullableFilter<"User"> | number | null
    skillLevel?: StringNullableFilter<"User"> | string | null
    position?: StringNullableFilter<"User"> | string | null
    championship?: StringNullableFilter<"User"> | string | null
    xp?: IntFilter<"User"> | number
    coins?: IntFilter<"User"> | number
    elo?: IntFilter<"User"> | number
    hostedGames?: GameListRelationFilter
    gameParticipations?: GamePlayerListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    score?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    avatar?: SortOrderInput | SortOrder
    jerseyNumber?: SortOrderInput | SortOrder
    skillLevel?: SortOrderInput | SortOrder
    position?: SortOrderInput | SortOrder
    championship?: SortOrderInput | SortOrder
    xp?: SortOrder
    coins?: SortOrder
    elo?: SortOrder
    hostedGames?: GameOrderByRelationAggregateInput
    gameParticipations?: GamePlayerOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    score?: IntFilter<"User"> | number
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    firstName?: StringNullableFilter<"User"> | string | null
    lastName?: StringNullableFilter<"User"> | string | null
    avatar?: StringNullableFilter<"User"> | string | null
    jerseyNumber?: IntNullableFilter<"User"> | number | null
    skillLevel?: StringNullableFilter<"User"> | string | null
    position?: StringNullableFilter<"User"> | string | null
    championship?: StringNullableFilter<"User"> | string | null
    xp?: IntFilter<"User"> | number
    coins?: IntFilter<"User"> | number
    elo?: IntFilter<"User"> | number
    hostedGames?: GameListRelationFilter
    gameParticipations?: GamePlayerListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    score?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    avatar?: SortOrderInput | SortOrder
    jerseyNumber?: SortOrderInput | SortOrder
    skillLevel?: SortOrderInput | SortOrder
    position?: SortOrderInput | SortOrder
    championship?: SortOrderInput | SortOrder
    xp?: SortOrder
    coins?: SortOrder
    elo?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    email?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    score?: IntWithAggregatesFilter<"User"> | number
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    firstName?: StringNullableWithAggregatesFilter<"User"> | string | null
    lastName?: StringNullableWithAggregatesFilter<"User"> | string | null
    avatar?: StringNullableWithAggregatesFilter<"User"> | string | null
    jerseyNumber?: IntNullableWithAggregatesFilter<"User"> | number | null
    skillLevel?: StringNullableWithAggregatesFilter<"User"> | string | null
    position?: StringNullableWithAggregatesFilter<"User"> | string | null
    championship?: StringNullableWithAggregatesFilter<"User"> | string | null
    xp?: IntWithAggregatesFilter<"User"> | number
    coins?: IntWithAggregatesFilter<"User"> | number
    elo?: IntWithAggregatesFilter<"User"> | number
  }

  export type FoosballTableWhereInput = {
    AND?: FoosballTableWhereInput | FoosballTableWhereInput[]
    OR?: FoosballTableWhereInput[]
    NOT?: FoosballTableWhereInput | FoosballTableWhereInput[]
    id?: IntFilter<"FoosballTable"> | number
    name?: StringFilter<"FoosballTable"> | string
    location?: StringFilter<"FoosballTable"> | string
    isActive?: BoolFilter<"FoosballTable"> | boolean
    isAvailable?: BoolFilter<"FoosballTable"> | boolean
    createdAt?: DateTimeFilter<"FoosballTable"> | Date | string
    updatedAt?: DateTimeFilter<"FoosballTable"> | Date | string
    games?: GameListRelationFilter
  }

  export type FoosballTableOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    location?: SortOrder
    isActive?: SortOrder
    isAvailable?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    games?: GameOrderByRelationAggregateInput
  }

  export type FoosballTableWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: FoosballTableWhereInput | FoosballTableWhereInput[]
    OR?: FoosballTableWhereInput[]
    NOT?: FoosballTableWhereInput | FoosballTableWhereInput[]
    name?: StringFilter<"FoosballTable"> | string
    location?: StringFilter<"FoosballTable"> | string
    isActive?: BoolFilter<"FoosballTable"> | boolean
    isAvailable?: BoolFilter<"FoosballTable"> | boolean
    createdAt?: DateTimeFilter<"FoosballTable"> | Date | string
    updatedAt?: DateTimeFilter<"FoosballTable"> | Date | string
    games?: GameListRelationFilter
  }, "id">

  export type FoosballTableOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    location?: SortOrder
    isActive?: SortOrder
    isAvailable?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: FoosballTableCountOrderByAggregateInput
    _avg?: FoosballTableAvgOrderByAggregateInput
    _max?: FoosballTableMaxOrderByAggregateInput
    _min?: FoosballTableMinOrderByAggregateInput
    _sum?: FoosballTableSumOrderByAggregateInput
  }

  export type FoosballTableScalarWhereWithAggregatesInput = {
    AND?: FoosballTableScalarWhereWithAggregatesInput | FoosballTableScalarWhereWithAggregatesInput[]
    OR?: FoosballTableScalarWhereWithAggregatesInput[]
    NOT?: FoosballTableScalarWhereWithAggregatesInput | FoosballTableScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"FoosballTable"> | number
    name?: StringWithAggregatesFilter<"FoosballTable"> | string
    location?: StringWithAggregatesFilter<"FoosballTable"> | string
    isActive?: BoolWithAggregatesFilter<"FoosballTable"> | boolean
    isAvailable?: BoolWithAggregatesFilter<"FoosballTable"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"FoosballTable"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"FoosballTable"> | Date | string
  }

  export type GameWhereInput = {
    AND?: GameWhereInput | GameWhereInput[]
    OR?: GameWhereInput[]
    NOT?: GameWhereInput | GameWhereInput[]
    id?: IntFilter<"Game"> | number
    code?: StringFilter<"Game"> | string
    status?: StringFilter<"Game"> | string
    gameMode?: StringFilter<"Game"> | string
    scoreLeft?: IntFilter<"Game"> | number
    scoreRight?: IntFilter<"Game"> | number
    maxScore?: IntFilter<"Game"> | number
    createdAt?: DateTimeFilter<"Game"> | Date | string
    updatedAt?: DateTimeFilter<"Game"> | Date | string
    startedAt?: DateTimeNullableFilter<"Game"> | Date | string | null
    finishedAt?: DateTimeNullableFilter<"Game"> | Date | string | null
    tableId?: IntFilter<"Game"> | number
    hostId?: IntFilter<"Game"> | number
    table?: XOR<FoosballTableScalarRelationFilter, FoosballTableWhereInput>
    host?: XOR<UserScalarRelationFilter, UserWhereInput>
    players?: GamePlayerListRelationFilter
  }

  export type GameOrderByWithRelationInput = {
    id?: SortOrder
    code?: SortOrder
    status?: SortOrder
    gameMode?: SortOrder
    scoreLeft?: SortOrder
    scoreRight?: SortOrder
    maxScore?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    startedAt?: SortOrderInput | SortOrder
    finishedAt?: SortOrderInput | SortOrder
    tableId?: SortOrder
    hostId?: SortOrder
    table?: FoosballTableOrderByWithRelationInput
    host?: UserOrderByWithRelationInput
    players?: GamePlayerOrderByRelationAggregateInput
  }

  export type GameWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    code?: string
    AND?: GameWhereInput | GameWhereInput[]
    OR?: GameWhereInput[]
    NOT?: GameWhereInput | GameWhereInput[]
    status?: StringFilter<"Game"> | string
    gameMode?: StringFilter<"Game"> | string
    scoreLeft?: IntFilter<"Game"> | number
    scoreRight?: IntFilter<"Game"> | number
    maxScore?: IntFilter<"Game"> | number
    createdAt?: DateTimeFilter<"Game"> | Date | string
    updatedAt?: DateTimeFilter<"Game"> | Date | string
    startedAt?: DateTimeNullableFilter<"Game"> | Date | string | null
    finishedAt?: DateTimeNullableFilter<"Game"> | Date | string | null
    tableId?: IntFilter<"Game"> | number
    hostId?: IntFilter<"Game"> | number
    table?: XOR<FoosballTableScalarRelationFilter, FoosballTableWhereInput>
    host?: XOR<UserScalarRelationFilter, UserWhereInput>
    players?: GamePlayerListRelationFilter
  }, "id" | "code">

  export type GameOrderByWithAggregationInput = {
    id?: SortOrder
    code?: SortOrder
    status?: SortOrder
    gameMode?: SortOrder
    scoreLeft?: SortOrder
    scoreRight?: SortOrder
    maxScore?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    startedAt?: SortOrderInput | SortOrder
    finishedAt?: SortOrderInput | SortOrder
    tableId?: SortOrder
    hostId?: SortOrder
    _count?: GameCountOrderByAggregateInput
    _avg?: GameAvgOrderByAggregateInput
    _max?: GameMaxOrderByAggregateInput
    _min?: GameMinOrderByAggregateInput
    _sum?: GameSumOrderByAggregateInput
  }

  export type GameScalarWhereWithAggregatesInput = {
    AND?: GameScalarWhereWithAggregatesInput | GameScalarWhereWithAggregatesInput[]
    OR?: GameScalarWhereWithAggregatesInput[]
    NOT?: GameScalarWhereWithAggregatesInput | GameScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Game"> | number
    code?: StringWithAggregatesFilter<"Game"> | string
    status?: StringWithAggregatesFilter<"Game"> | string
    gameMode?: StringWithAggregatesFilter<"Game"> | string
    scoreLeft?: IntWithAggregatesFilter<"Game"> | number
    scoreRight?: IntWithAggregatesFilter<"Game"> | number
    maxScore?: IntWithAggregatesFilter<"Game"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Game"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Game"> | Date | string
    startedAt?: DateTimeNullableWithAggregatesFilter<"Game"> | Date | string | null
    finishedAt?: DateTimeNullableWithAggregatesFilter<"Game"> | Date | string | null
    tableId?: IntWithAggregatesFilter<"Game"> | number
    hostId?: IntWithAggregatesFilter<"Game"> | number
  }

  export type GamePlayerWhereInput = {
    AND?: GamePlayerWhereInput | GamePlayerWhereInput[]
    OR?: GamePlayerWhereInput[]
    NOT?: GamePlayerWhereInput | GamePlayerWhereInput[]
    id?: IntFilter<"GamePlayer"> | number
    team?: StringFilter<"GamePlayer"> | string
    position?: StringNullableFilter<"GamePlayer"> | string | null
    isGuest?: BoolFilter<"GamePlayer"> | boolean
    guestName?: StringNullableFilter<"GamePlayer"> | string | null
    gameId?: IntFilter<"GamePlayer"> | number
    userId?: IntNullableFilter<"GamePlayer"> | number | null
    game?: XOR<GameScalarRelationFilter, GameWhereInput>
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type GamePlayerOrderByWithRelationInput = {
    id?: SortOrder
    team?: SortOrder
    position?: SortOrderInput | SortOrder
    isGuest?: SortOrder
    guestName?: SortOrderInput | SortOrder
    gameId?: SortOrder
    userId?: SortOrderInput | SortOrder
    game?: GameOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type GamePlayerWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    gameId_userId?: GamePlayerGameIdUserIdCompoundUniqueInput
    AND?: GamePlayerWhereInput | GamePlayerWhereInput[]
    OR?: GamePlayerWhereInput[]
    NOT?: GamePlayerWhereInput | GamePlayerWhereInput[]
    team?: StringFilter<"GamePlayer"> | string
    position?: StringNullableFilter<"GamePlayer"> | string | null
    isGuest?: BoolFilter<"GamePlayer"> | boolean
    guestName?: StringNullableFilter<"GamePlayer"> | string | null
    gameId?: IntFilter<"GamePlayer"> | number
    userId?: IntNullableFilter<"GamePlayer"> | number | null
    game?: XOR<GameScalarRelationFilter, GameWhereInput>
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id" | "gameId_userId">

  export type GamePlayerOrderByWithAggregationInput = {
    id?: SortOrder
    team?: SortOrder
    position?: SortOrderInput | SortOrder
    isGuest?: SortOrder
    guestName?: SortOrderInput | SortOrder
    gameId?: SortOrder
    userId?: SortOrderInput | SortOrder
    _count?: GamePlayerCountOrderByAggregateInput
    _avg?: GamePlayerAvgOrderByAggregateInput
    _max?: GamePlayerMaxOrderByAggregateInput
    _min?: GamePlayerMinOrderByAggregateInput
    _sum?: GamePlayerSumOrderByAggregateInput
  }

  export type GamePlayerScalarWhereWithAggregatesInput = {
    AND?: GamePlayerScalarWhereWithAggregatesInput | GamePlayerScalarWhereWithAggregatesInput[]
    OR?: GamePlayerScalarWhereWithAggregatesInput[]
    NOT?: GamePlayerScalarWhereWithAggregatesInput | GamePlayerScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"GamePlayer"> | number
    team?: StringWithAggregatesFilter<"GamePlayer"> | string
    position?: StringNullableWithAggregatesFilter<"GamePlayer"> | string | null
    isGuest?: BoolWithAggregatesFilter<"GamePlayer"> | boolean
    guestName?: StringNullableWithAggregatesFilter<"GamePlayer"> | string | null
    gameId?: IntWithAggregatesFilter<"GamePlayer"> | number
    userId?: IntNullableWithAggregatesFilter<"GamePlayer"> | number | null
  }

  export type UserCreateInput = {
    email: string
    name: string
    password: string
    score?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    firstName?: string | null
    lastName?: string | null
    avatar?: string | null
    jerseyNumber?: number | null
    skillLevel?: string | null
    position?: string | null
    championship?: string | null
    xp?: number
    coins?: number
    elo?: number
    hostedGames?: GameCreateNestedManyWithoutHostInput
    gameParticipations?: GamePlayerCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    email: string
    name: string
    password: string
    score?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    firstName?: string | null
    lastName?: string | null
    avatar?: string | null
    jerseyNumber?: number | null
    skillLevel?: string | null
    position?: string | null
    championship?: string | null
    xp?: number
    coins?: number
    elo?: number
    hostedGames?: GameUncheckedCreateNestedManyWithoutHostInput
    gameParticipations?: GamePlayerUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    jerseyNumber?: NullableIntFieldUpdateOperationsInput | number | null
    skillLevel?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    championship?: NullableStringFieldUpdateOperationsInput | string | null
    xp?: IntFieldUpdateOperationsInput | number
    coins?: IntFieldUpdateOperationsInput | number
    elo?: IntFieldUpdateOperationsInput | number
    hostedGames?: GameUpdateManyWithoutHostNestedInput
    gameParticipations?: GamePlayerUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    jerseyNumber?: NullableIntFieldUpdateOperationsInput | number | null
    skillLevel?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    championship?: NullableStringFieldUpdateOperationsInput | string | null
    xp?: IntFieldUpdateOperationsInput | number
    coins?: IntFieldUpdateOperationsInput | number
    elo?: IntFieldUpdateOperationsInput | number
    hostedGames?: GameUncheckedUpdateManyWithoutHostNestedInput
    gameParticipations?: GamePlayerUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    email: string
    name: string
    password: string
    score?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    firstName?: string | null
    lastName?: string | null
    avatar?: string | null
    jerseyNumber?: number | null
    skillLevel?: string | null
    position?: string | null
    championship?: string | null
    xp?: number
    coins?: number
    elo?: number
  }

  export type UserUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    jerseyNumber?: NullableIntFieldUpdateOperationsInput | number | null
    skillLevel?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    championship?: NullableStringFieldUpdateOperationsInput | string | null
    xp?: IntFieldUpdateOperationsInput | number
    coins?: IntFieldUpdateOperationsInput | number
    elo?: IntFieldUpdateOperationsInput | number
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    jerseyNumber?: NullableIntFieldUpdateOperationsInput | number | null
    skillLevel?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    championship?: NullableStringFieldUpdateOperationsInput | string | null
    xp?: IntFieldUpdateOperationsInput | number
    coins?: IntFieldUpdateOperationsInput | number
    elo?: IntFieldUpdateOperationsInput | number
  }

  export type FoosballTableCreateInput = {
    name: string
    location: string
    isActive?: boolean
    isAvailable?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    games?: GameCreateNestedManyWithoutTableInput
  }

  export type FoosballTableUncheckedCreateInput = {
    id?: number
    name: string
    location: string
    isActive?: boolean
    isAvailable?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    games?: GameUncheckedCreateNestedManyWithoutTableInput
  }

  export type FoosballTableUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    games?: GameUpdateManyWithoutTableNestedInput
  }

  export type FoosballTableUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    games?: GameUncheckedUpdateManyWithoutTableNestedInput
  }

  export type FoosballTableCreateManyInput = {
    id?: number
    name: string
    location: string
    isActive?: boolean
    isAvailable?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FoosballTableUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FoosballTableUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameCreateInput = {
    code: string
    status?: string
    gameMode?: string
    scoreLeft?: number
    scoreRight?: number
    maxScore?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    startedAt?: Date | string | null
    finishedAt?: Date | string | null
    table: FoosballTableCreateNestedOneWithoutGamesInput
    host: UserCreateNestedOneWithoutHostedGamesInput
    players?: GamePlayerCreateNestedManyWithoutGameInput
  }

  export type GameUncheckedCreateInput = {
    id?: number
    code: string
    status?: string
    gameMode?: string
    scoreLeft?: number
    scoreRight?: number
    maxScore?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    startedAt?: Date | string | null
    finishedAt?: Date | string | null
    tableId: number
    hostId: number
    players?: GamePlayerUncheckedCreateNestedManyWithoutGameInput
  }

  export type GameUpdateInput = {
    code?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    gameMode?: StringFieldUpdateOperationsInput | string
    scoreLeft?: IntFieldUpdateOperationsInput | number
    scoreRight?: IntFieldUpdateOperationsInput | number
    maxScore?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    table?: FoosballTableUpdateOneRequiredWithoutGamesNestedInput
    host?: UserUpdateOneRequiredWithoutHostedGamesNestedInput
    players?: GamePlayerUpdateManyWithoutGameNestedInput
  }

  export type GameUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    gameMode?: StringFieldUpdateOperationsInput | string
    scoreLeft?: IntFieldUpdateOperationsInput | number
    scoreRight?: IntFieldUpdateOperationsInput | number
    maxScore?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tableId?: IntFieldUpdateOperationsInput | number
    hostId?: IntFieldUpdateOperationsInput | number
    players?: GamePlayerUncheckedUpdateManyWithoutGameNestedInput
  }

  export type GameCreateManyInput = {
    id?: number
    code: string
    status?: string
    gameMode?: string
    scoreLeft?: number
    scoreRight?: number
    maxScore?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    startedAt?: Date | string | null
    finishedAt?: Date | string | null
    tableId: number
    hostId: number
  }

  export type GameUpdateManyMutationInput = {
    code?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    gameMode?: StringFieldUpdateOperationsInput | string
    scoreLeft?: IntFieldUpdateOperationsInput | number
    scoreRight?: IntFieldUpdateOperationsInput | number
    maxScore?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type GameUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    gameMode?: StringFieldUpdateOperationsInput | string
    scoreLeft?: IntFieldUpdateOperationsInput | number
    scoreRight?: IntFieldUpdateOperationsInput | number
    maxScore?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tableId?: IntFieldUpdateOperationsInput | number
    hostId?: IntFieldUpdateOperationsInput | number
  }

  export type GamePlayerCreateInput = {
    team: string
    position?: string | null
    isGuest?: boolean
    guestName?: string | null
    game: GameCreateNestedOneWithoutPlayersInput
    user?: UserCreateNestedOneWithoutGameParticipationsInput
  }

  export type GamePlayerUncheckedCreateInput = {
    id?: number
    team: string
    position?: string | null
    isGuest?: boolean
    guestName?: string | null
    gameId: number
    userId?: number | null
  }

  export type GamePlayerUpdateInput = {
    team?: StringFieldUpdateOperationsInput | string
    position?: NullableStringFieldUpdateOperationsInput | string | null
    isGuest?: BoolFieldUpdateOperationsInput | boolean
    guestName?: NullableStringFieldUpdateOperationsInput | string | null
    game?: GameUpdateOneRequiredWithoutPlayersNestedInput
    user?: UserUpdateOneWithoutGameParticipationsNestedInput
  }

  export type GamePlayerUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    team?: StringFieldUpdateOperationsInput | string
    position?: NullableStringFieldUpdateOperationsInput | string | null
    isGuest?: BoolFieldUpdateOperationsInput | boolean
    guestName?: NullableStringFieldUpdateOperationsInput | string | null
    gameId?: IntFieldUpdateOperationsInput | number
    userId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type GamePlayerCreateManyInput = {
    id?: number
    team: string
    position?: string | null
    isGuest?: boolean
    guestName?: string | null
    gameId: number
    userId?: number | null
  }

  export type GamePlayerUpdateManyMutationInput = {
    team?: StringFieldUpdateOperationsInput | string
    position?: NullableStringFieldUpdateOperationsInput | string | null
    isGuest?: BoolFieldUpdateOperationsInput | boolean
    guestName?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type GamePlayerUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    team?: StringFieldUpdateOperationsInput | string
    position?: NullableStringFieldUpdateOperationsInput | string | null
    isGuest?: BoolFieldUpdateOperationsInput | boolean
    guestName?: NullableStringFieldUpdateOperationsInput | string | null
    gameId?: IntFieldUpdateOperationsInput | number
    userId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type GameListRelationFilter = {
    every?: GameWhereInput
    some?: GameWhereInput
    none?: GameWhereInput
  }

  export type GamePlayerListRelationFilter = {
    every?: GamePlayerWhereInput
    some?: GamePlayerWhereInput
    none?: GamePlayerWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type GameOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GamePlayerOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    score?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    avatar?: SortOrder
    jerseyNumber?: SortOrder
    skillLevel?: SortOrder
    position?: SortOrder
    championship?: SortOrder
    xp?: SortOrder
    coins?: SortOrder
    elo?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
    score?: SortOrder
    jerseyNumber?: SortOrder
    xp?: SortOrder
    coins?: SortOrder
    elo?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    score?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    avatar?: SortOrder
    jerseyNumber?: SortOrder
    skillLevel?: SortOrder
    position?: SortOrder
    championship?: SortOrder
    xp?: SortOrder
    coins?: SortOrder
    elo?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    score?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    avatar?: SortOrder
    jerseyNumber?: SortOrder
    skillLevel?: SortOrder
    position?: SortOrder
    championship?: SortOrder
    xp?: SortOrder
    coins?: SortOrder
    elo?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
    score?: SortOrder
    jerseyNumber?: SortOrder
    xp?: SortOrder
    coins?: SortOrder
    elo?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type FoosballTableCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    location?: SortOrder
    isActive?: SortOrder
    isAvailable?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FoosballTableAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type FoosballTableMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    location?: SortOrder
    isActive?: SortOrder
    isAvailable?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FoosballTableMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    location?: SortOrder
    isActive?: SortOrder
    isAvailable?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FoosballTableSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type FoosballTableScalarRelationFilter = {
    is?: FoosballTableWhereInput
    isNot?: FoosballTableWhereInput
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type GameCountOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    status?: SortOrder
    gameMode?: SortOrder
    scoreLeft?: SortOrder
    scoreRight?: SortOrder
    maxScore?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    startedAt?: SortOrder
    finishedAt?: SortOrder
    tableId?: SortOrder
    hostId?: SortOrder
  }

  export type GameAvgOrderByAggregateInput = {
    id?: SortOrder
    scoreLeft?: SortOrder
    scoreRight?: SortOrder
    maxScore?: SortOrder
    tableId?: SortOrder
    hostId?: SortOrder
  }

  export type GameMaxOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    status?: SortOrder
    gameMode?: SortOrder
    scoreLeft?: SortOrder
    scoreRight?: SortOrder
    maxScore?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    startedAt?: SortOrder
    finishedAt?: SortOrder
    tableId?: SortOrder
    hostId?: SortOrder
  }

  export type GameMinOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    status?: SortOrder
    gameMode?: SortOrder
    scoreLeft?: SortOrder
    scoreRight?: SortOrder
    maxScore?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    startedAt?: SortOrder
    finishedAt?: SortOrder
    tableId?: SortOrder
    hostId?: SortOrder
  }

  export type GameSumOrderByAggregateInput = {
    id?: SortOrder
    scoreLeft?: SortOrder
    scoreRight?: SortOrder
    maxScore?: SortOrder
    tableId?: SortOrder
    hostId?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type GameScalarRelationFilter = {
    is?: GameWhereInput
    isNot?: GameWhereInput
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type GamePlayerGameIdUserIdCompoundUniqueInput = {
    gameId: number
    userId: number
  }

  export type GamePlayerCountOrderByAggregateInput = {
    id?: SortOrder
    team?: SortOrder
    position?: SortOrder
    isGuest?: SortOrder
    guestName?: SortOrder
    gameId?: SortOrder
    userId?: SortOrder
  }

  export type GamePlayerAvgOrderByAggregateInput = {
    id?: SortOrder
    gameId?: SortOrder
    userId?: SortOrder
  }

  export type GamePlayerMaxOrderByAggregateInput = {
    id?: SortOrder
    team?: SortOrder
    position?: SortOrder
    isGuest?: SortOrder
    guestName?: SortOrder
    gameId?: SortOrder
    userId?: SortOrder
  }

  export type GamePlayerMinOrderByAggregateInput = {
    id?: SortOrder
    team?: SortOrder
    position?: SortOrder
    isGuest?: SortOrder
    guestName?: SortOrder
    gameId?: SortOrder
    userId?: SortOrder
  }

  export type GamePlayerSumOrderByAggregateInput = {
    id?: SortOrder
    gameId?: SortOrder
    userId?: SortOrder
  }

  export type GameCreateNestedManyWithoutHostInput = {
    create?: XOR<GameCreateWithoutHostInput, GameUncheckedCreateWithoutHostInput> | GameCreateWithoutHostInput[] | GameUncheckedCreateWithoutHostInput[]
    connectOrCreate?: GameCreateOrConnectWithoutHostInput | GameCreateOrConnectWithoutHostInput[]
    createMany?: GameCreateManyHostInputEnvelope
    connect?: GameWhereUniqueInput | GameWhereUniqueInput[]
  }

  export type GamePlayerCreateNestedManyWithoutUserInput = {
    create?: XOR<GamePlayerCreateWithoutUserInput, GamePlayerUncheckedCreateWithoutUserInput> | GamePlayerCreateWithoutUserInput[] | GamePlayerUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GamePlayerCreateOrConnectWithoutUserInput | GamePlayerCreateOrConnectWithoutUserInput[]
    createMany?: GamePlayerCreateManyUserInputEnvelope
    connect?: GamePlayerWhereUniqueInput | GamePlayerWhereUniqueInput[]
  }

  export type GameUncheckedCreateNestedManyWithoutHostInput = {
    create?: XOR<GameCreateWithoutHostInput, GameUncheckedCreateWithoutHostInput> | GameCreateWithoutHostInput[] | GameUncheckedCreateWithoutHostInput[]
    connectOrCreate?: GameCreateOrConnectWithoutHostInput | GameCreateOrConnectWithoutHostInput[]
    createMany?: GameCreateManyHostInputEnvelope
    connect?: GameWhereUniqueInput | GameWhereUniqueInput[]
  }

  export type GamePlayerUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<GamePlayerCreateWithoutUserInput, GamePlayerUncheckedCreateWithoutUserInput> | GamePlayerCreateWithoutUserInput[] | GamePlayerUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GamePlayerCreateOrConnectWithoutUserInput | GamePlayerCreateOrConnectWithoutUserInput[]
    createMany?: GamePlayerCreateManyUserInputEnvelope
    connect?: GamePlayerWhereUniqueInput | GamePlayerWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type GameUpdateManyWithoutHostNestedInput = {
    create?: XOR<GameCreateWithoutHostInput, GameUncheckedCreateWithoutHostInput> | GameCreateWithoutHostInput[] | GameUncheckedCreateWithoutHostInput[]
    connectOrCreate?: GameCreateOrConnectWithoutHostInput | GameCreateOrConnectWithoutHostInput[]
    upsert?: GameUpsertWithWhereUniqueWithoutHostInput | GameUpsertWithWhereUniqueWithoutHostInput[]
    createMany?: GameCreateManyHostInputEnvelope
    set?: GameWhereUniqueInput | GameWhereUniqueInput[]
    disconnect?: GameWhereUniqueInput | GameWhereUniqueInput[]
    delete?: GameWhereUniqueInput | GameWhereUniqueInput[]
    connect?: GameWhereUniqueInput | GameWhereUniqueInput[]
    update?: GameUpdateWithWhereUniqueWithoutHostInput | GameUpdateWithWhereUniqueWithoutHostInput[]
    updateMany?: GameUpdateManyWithWhereWithoutHostInput | GameUpdateManyWithWhereWithoutHostInput[]
    deleteMany?: GameScalarWhereInput | GameScalarWhereInput[]
  }

  export type GamePlayerUpdateManyWithoutUserNestedInput = {
    create?: XOR<GamePlayerCreateWithoutUserInput, GamePlayerUncheckedCreateWithoutUserInput> | GamePlayerCreateWithoutUserInput[] | GamePlayerUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GamePlayerCreateOrConnectWithoutUserInput | GamePlayerCreateOrConnectWithoutUserInput[]
    upsert?: GamePlayerUpsertWithWhereUniqueWithoutUserInput | GamePlayerUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: GamePlayerCreateManyUserInputEnvelope
    set?: GamePlayerWhereUniqueInput | GamePlayerWhereUniqueInput[]
    disconnect?: GamePlayerWhereUniqueInput | GamePlayerWhereUniqueInput[]
    delete?: GamePlayerWhereUniqueInput | GamePlayerWhereUniqueInput[]
    connect?: GamePlayerWhereUniqueInput | GamePlayerWhereUniqueInput[]
    update?: GamePlayerUpdateWithWhereUniqueWithoutUserInput | GamePlayerUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: GamePlayerUpdateManyWithWhereWithoutUserInput | GamePlayerUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: GamePlayerScalarWhereInput | GamePlayerScalarWhereInput[]
  }

  export type GameUncheckedUpdateManyWithoutHostNestedInput = {
    create?: XOR<GameCreateWithoutHostInput, GameUncheckedCreateWithoutHostInput> | GameCreateWithoutHostInput[] | GameUncheckedCreateWithoutHostInput[]
    connectOrCreate?: GameCreateOrConnectWithoutHostInput | GameCreateOrConnectWithoutHostInput[]
    upsert?: GameUpsertWithWhereUniqueWithoutHostInput | GameUpsertWithWhereUniqueWithoutHostInput[]
    createMany?: GameCreateManyHostInputEnvelope
    set?: GameWhereUniqueInput | GameWhereUniqueInput[]
    disconnect?: GameWhereUniqueInput | GameWhereUniqueInput[]
    delete?: GameWhereUniqueInput | GameWhereUniqueInput[]
    connect?: GameWhereUniqueInput | GameWhereUniqueInput[]
    update?: GameUpdateWithWhereUniqueWithoutHostInput | GameUpdateWithWhereUniqueWithoutHostInput[]
    updateMany?: GameUpdateManyWithWhereWithoutHostInput | GameUpdateManyWithWhereWithoutHostInput[]
    deleteMany?: GameScalarWhereInput | GameScalarWhereInput[]
  }

  export type GamePlayerUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<GamePlayerCreateWithoutUserInput, GamePlayerUncheckedCreateWithoutUserInput> | GamePlayerCreateWithoutUserInput[] | GamePlayerUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GamePlayerCreateOrConnectWithoutUserInput | GamePlayerCreateOrConnectWithoutUserInput[]
    upsert?: GamePlayerUpsertWithWhereUniqueWithoutUserInput | GamePlayerUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: GamePlayerCreateManyUserInputEnvelope
    set?: GamePlayerWhereUniqueInput | GamePlayerWhereUniqueInput[]
    disconnect?: GamePlayerWhereUniqueInput | GamePlayerWhereUniqueInput[]
    delete?: GamePlayerWhereUniqueInput | GamePlayerWhereUniqueInput[]
    connect?: GamePlayerWhereUniqueInput | GamePlayerWhereUniqueInput[]
    update?: GamePlayerUpdateWithWhereUniqueWithoutUserInput | GamePlayerUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: GamePlayerUpdateManyWithWhereWithoutUserInput | GamePlayerUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: GamePlayerScalarWhereInput | GamePlayerScalarWhereInput[]
  }

  export type GameCreateNestedManyWithoutTableInput = {
    create?: XOR<GameCreateWithoutTableInput, GameUncheckedCreateWithoutTableInput> | GameCreateWithoutTableInput[] | GameUncheckedCreateWithoutTableInput[]
    connectOrCreate?: GameCreateOrConnectWithoutTableInput | GameCreateOrConnectWithoutTableInput[]
    createMany?: GameCreateManyTableInputEnvelope
    connect?: GameWhereUniqueInput | GameWhereUniqueInput[]
  }

  export type GameUncheckedCreateNestedManyWithoutTableInput = {
    create?: XOR<GameCreateWithoutTableInput, GameUncheckedCreateWithoutTableInput> | GameCreateWithoutTableInput[] | GameUncheckedCreateWithoutTableInput[]
    connectOrCreate?: GameCreateOrConnectWithoutTableInput | GameCreateOrConnectWithoutTableInput[]
    createMany?: GameCreateManyTableInputEnvelope
    connect?: GameWhereUniqueInput | GameWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type GameUpdateManyWithoutTableNestedInput = {
    create?: XOR<GameCreateWithoutTableInput, GameUncheckedCreateWithoutTableInput> | GameCreateWithoutTableInput[] | GameUncheckedCreateWithoutTableInput[]
    connectOrCreate?: GameCreateOrConnectWithoutTableInput | GameCreateOrConnectWithoutTableInput[]
    upsert?: GameUpsertWithWhereUniqueWithoutTableInput | GameUpsertWithWhereUniqueWithoutTableInput[]
    createMany?: GameCreateManyTableInputEnvelope
    set?: GameWhereUniqueInput | GameWhereUniqueInput[]
    disconnect?: GameWhereUniqueInput | GameWhereUniqueInput[]
    delete?: GameWhereUniqueInput | GameWhereUniqueInput[]
    connect?: GameWhereUniqueInput | GameWhereUniqueInput[]
    update?: GameUpdateWithWhereUniqueWithoutTableInput | GameUpdateWithWhereUniqueWithoutTableInput[]
    updateMany?: GameUpdateManyWithWhereWithoutTableInput | GameUpdateManyWithWhereWithoutTableInput[]
    deleteMany?: GameScalarWhereInput | GameScalarWhereInput[]
  }

  export type GameUncheckedUpdateManyWithoutTableNestedInput = {
    create?: XOR<GameCreateWithoutTableInput, GameUncheckedCreateWithoutTableInput> | GameCreateWithoutTableInput[] | GameUncheckedCreateWithoutTableInput[]
    connectOrCreate?: GameCreateOrConnectWithoutTableInput | GameCreateOrConnectWithoutTableInput[]
    upsert?: GameUpsertWithWhereUniqueWithoutTableInput | GameUpsertWithWhereUniqueWithoutTableInput[]
    createMany?: GameCreateManyTableInputEnvelope
    set?: GameWhereUniqueInput | GameWhereUniqueInput[]
    disconnect?: GameWhereUniqueInput | GameWhereUniqueInput[]
    delete?: GameWhereUniqueInput | GameWhereUniqueInput[]
    connect?: GameWhereUniqueInput | GameWhereUniqueInput[]
    update?: GameUpdateWithWhereUniqueWithoutTableInput | GameUpdateWithWhereUniqueWithoutTableInput[]
    updateMany?: GameUpdateManyWithWhereWithoutTableInput | GameUpdateManyWithWhereWithoutTableInput[]
    deleteMany?: GameScalarWhereInput | GameScalarWhereInput[]
  }

  export type FoosballTableCreateNestedOneWithoutGamesInput = {
    create?: XOR<FoosballTableCreateWithoutGamesInput, FoosballTableUncheckedCreateWithoutGamesInput>
    connectOrCreate?: FoosballTableCreateOrConnectWithoutGamesInput
    connect?: FoosballTableWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutHostedGamesInput = {
    create?: XOR<UserCreateWithoutHostedGamesInput, UserUncheckedCreateWithoutHostedGamesInput>
    connectOrCreate?: UserCreateOrConnectWithoutHostedGamesInput
    connect?: UserWhereUniqueInput
  }

  export type GamePlayerCreateNestedManyWithoutGameInput = {
    create?: XOR<GamePlayerCreateWithoutGameInput, GamePlayerUncheckedCreateWithoutGameInput> | GamePlayerCreateWithoutGameInput[] | GamePlayerUncheckedCreateWithoutGameInput[]
    connectOrCreate?: GamePlayerCreateOrConnectWithoutGameInput | GamePlayerCreateOrConnectWithoutGameInput[]
    createMany?: GamePlayerCreateManyGameInputEnvelope
    connect?: GamePlayerWhereUniqueInput | GamePlayerWhereUniqueInput[]
  }

  export type GamePlayerUncheckedCreateNestedManyWithoutGameInput = {
    create?: XOR<GamePlayerCreateWithoutGameInput, GamePlayerUncheckedCreateWithoutGameInput> | GamePlayerCreateWithoutGameInput[] | GamePlayerUncheckedCreateWithoutGameInput[]
    connectOrCreate?: GamePlayerCreateOrConnectWithoutGameInput | GamePlayerCreateOrConnectWithoutGameInput[]
    createMany?: GamePlayerCreateManyGameInputEnvelope
    connect?: GamePlayerWhereUniqueInput | GamePlayerWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type FoosballTableUpdateOneRequiredWithoutGamesNestedInput = {
    create?: XOR<FoosballTableCreateWithoutGamesInput, FoosballTableUncheckedCreateWithoutGamesInput>
    connectOrCreate?: FoosballTableCreateOrConnectWithoutGamesInput
    upsert?: FoosballTableUpsertWithoutGamesInput
    connect?: FoosballTableWhereUniqueInput
    update?: XOR<XOR<FoosballTableUpdateToOneWithWhereWithoutGamesInput, FoosballTableUpdateWithoutGamesInput>, FoosballTableUncheckedUpdateWithoutGamesInput>
  }

  export type UserUpdateOneRequiredWithoutHostedGamesNestedInput = {
    create?: XOR<UserCreateWithoutHostedGamesInput, UserUncheckedCreateWithoutHostedGamesInput>
    connectOrCreate?: UserCreateOrConnectWithoutHostedGamesInput
    upsert?: UserUpsertWithoutHostedGamesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutHostedGamesInput, UserUpdateWithoutHostedGamesInput>, UserUncheckedUpdateWithoutHostedGamesInput>
  }

  export type GamePlayerUpdateManyWithoutGameNestedInput = {
    create?: XOR<GamePlayerCreateWithoutGameInput, GamePlayerUncheckedCreateWithoutGameInput> | GamePlayerCreateWithoutGameInput[] | GamePlayerUncheckedCreateWithoutGameInput[]
    connectOrCreate?: GamePlayerCreateOrConnectWithoutGameInput | GamePlayerCreateOrConnectWithoutGameInput[]
    upsert?: GamePlayerUpsertWithWhereUniqueWithoutGameInput | GamePlayerUpsertWithWhereUniqueWithoutGameInput[]
    createMany?: GamePlayerCreateManyGameInputEnvelope
    set?: GamePlayerWhereUniqueInput | GamePlayerWhereUniqueInput[]
    disconnect?: GamePlayerWhereUniqueInput | GamePlayerWhereUniqueInput[]
    delete?: GamePlayerWhereUniqueInput | GamePlayerWhereUniqueInput[]
    connect?: GamePlayerWhereUniqueInput | GamePlayerWhereUniqueInput[]
    update?: GamePlayerUpdateWithWhereUniqueWithoutGameInput | GamePlayerUpdateWithWhereUniqueWithoutGameInput[]
    updateMany?: GamePlayerUpdateManyWithWhereWithoutGameInput | GamePlayerUpdateManyWithWhereWithoutGameInput[]
    deleteMany?: GamePlayerScalarWhereInput | GamePlayerScalarWhereInput[]
  }

  export type GamePlayerUncheckedUpdateManyWithoutGameNestedInput = {
    create?: XOR<GamePlayerCreateWithoutGameInput, GamePlayerUncheckedCreateWithoutGameInput> | GamePlayerCreateWithoutGameInput[] | GamePlayerUncheckedCreateWithoutGameInput[]
    connectOrCreate?: GamePlayerCreateOrConnectWithoutGameInput | GamePlayerCreateOrConnectWithoutGameInput[]
    upsert?: GamePlayerUpsertWithWhereUniqueWithoutGameInput | GamePlayerUpsertWithWhereUniqueWithoutGameInput[]
    createMany?: GamePlayerCreateManyGameInputEnvelope
    set?: GamePlayerWhereUniqueInput | GamePlayerWhereUniqueInput[]
    disconnect?: GamePlayerWhereUniqueInput | GamePlayerWhereUniqueInput[]
    delete?: GamePlayerWhereUniqueInput | GamePlayerWhereUniqueInput[]
    connect?: GamePlayerWhereUniqueInput | GamePlayerWhereUniqueInput[]
    update?: GamePlayerUpdateWithWhereUniqueWithoutGameInput | GamePlayerUpdateWithWhereUniqueWithoutGameInput[]
    updateMany?: GamePlayerUpdateManyWithWhereWithoutGameInput | GamePlayerUpdateManyWithWhereWithoutGameInput[]
    deleteMany?: GamePlayerScalarWhereInput | GamePlayerScalarWhereInput[]
  }

  export type GameCreateNestedOneWithoutPlayersInput = {
    create?: XOR<GameCreateWithoutPlayersInput, GameUncheckedCreateWithoutPlayersInput>
    connectOrCreate?: GameCreateOrConnectWithoutPlayersInput
    connect?: GameWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutGameParticipationsInput = {
    create?: XOR<UserCreateWithoutGameParticipationsInput, UserUncheckedCreateWithoutGameParticipationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutGameParticipationsInput
    connect?: UserWhereUniqueInput
  }

  export type GameUpdateOneRequiredWithoutPlayersNestedInput = {
    create?: XOR<GameCreateWithoutPlayersInput, GameUncheckedCreateWithoutPlayersInput>
    connectOrCreate?: GameCreateOrConnectWithoutPlayersInput
    upsert?: GameUpsertWithoutPlayersInput
    connect?: GameWhereUniqueInput
    update?: XOR<XOR<GameUpdateToOneWithWhereWithoutPlayersInput, GameUpdateWithoutPlayersInput>, GameUncheckedUpdateWithoutPlayersInput>
  }

  export type UserUpdateOneWithoutGameParticipationsNestedInput = {
    create?: XOR<UserCreateWithoutGameParticipationsInput, UserUncheckedCreateWithoutGameParticipationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutGameParticipationsInput
    upsert?: UserUpsertWithoutGameParticipationsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutGameParticipationsInput, UserUpdateWithoutGameParticipationsInput>, UserUncheckedUpdateWithoutGameParticipationsInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type GameCreateWithoutHostInput = {
    code: string
    status?: string
    gameMode?: string
    scoreLeft?: number
    scoreRight?: number
    maxScore?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    startedAt?: Date | string | null
    finishedAt?: Date | string | null
    table: FoosballTableCreateNestedOneWithoutGamesInput
    players?: GamePlayerCreateNestedManyWithoutGameInput
  }

  export type GameUncheckedCreateWithoutHostInput = {
    id?: number
    code: string
    status?: string
    gameMode?: string
    scoreLeft?: number
    scoreRight?: number
    maxScore?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    startedAt?: Date | string | null
    finishedAt?: Date | string | null
    tableId: number
    players?: GamePlayerUncheckedCreateNestedManyWithoutGameInput
  }

  export type GameCreateOrConnectWithoutHostInput = {
    where: GameWhereUniqueInput
    create: XOR<GameCreateWithoutHostInput, GameUncheckedCreateWithoutHostInput>
  }

  export type GameCreateManyHostInputEnvelope = {
    data: GameCreateManyHostInput | GameCreateManyHostInput[]
  }

  export type GamePlayerCreateWithoutUserInput = {
    team: string
    position?: string | null
    isGuest?: boolean
    guestName?: string | null
    game: GameCreateNestedOneWithoutPlayersInput
  }

  export type GamePlayerUncheckedCreateWithoutUserInput = {
    id?: number
    team: string
    position?: string | null
    isGuest?: boolean
    guestName?: string | null
    gameId: number
  }

  export type GamePlayerCreateOrConnectWithoutUserInput = {
    where: GamePlayerWhereUniqueInput
    create: XOR<GamePlayerCreateWithoutUserInput, GamePlayerUncheckedCreateWithoutUserInput>
  }

  export type GamePlayerCreateManyUserInputEnvelope = {
    data: GamePlayerCreateManyUserInput | GamePlayerCreateManyUserInput[]
  }

  export type GameUpsertWithWhereUniqueWithoutHostInput = {
    where: GameWhereUniqueInput
    update: XOR<GameUpdateWithoutHostInput, GameUncheckedUpdateWithoutHostInput>
    create: XOR<GameCreateWithoutHostInput, GameUncheckedCreateWithoutHostInput>
  }

  export type GameUpdateWithWhereUniqueWithoutHostInput = {
    where: GameWhereUniqueInput
    data: XOR<GameUpdateWithoutHostInput, GameUncheckedUpdateWithoutHostInput>
  }

  export type GameUpdateManyWithWhereWithoutHostInput = {
    where: GameScalarWhereInput
    data: XOR<GameUpdateManyMutationInput, GameUncheckedUpdateManyWithoutHostInput>
  }

  export type GameScalarWhereInput = {
    AND?: GameScalarWhereInput | GameScalarWhereInput[]
    OR?: GameScalarWhereInput[]
    NOT?: GameScalarWhereInput | GameScalarWhereInput[]
    id?: IntFilter<"Game"> | number
    code?: StringFilter<"Game"> | string
    status?: StringFilter<"Game"> | string
    gameMode?: StringFilter<"Game"> | string
    scoreLeft?: IntFilter<"Game"> | number
    scoreRight?: IntFilter<"Game"> | number
    maxScore?: IntFilter<"Game"> | number
    createdAt?: DateTimeFilter<"Game"> | Date | string
    updatedAt?: DateTimeFilter<"Game"> | Date | string
    startedAt?: DateTimeNullableFilter<"Game"> | Date | string | null
    finishedAt?: DateTimeNullableFilter<"Game"> | Date | string | null
    tableId?: IntFilter<"Game"> | number
    hostId?: IntFilter<"Game"> | number
  }

  export type GamePlayerUpsertWithWhereUniqueWithoutUserInput = {
    where: GamePlayerWhereUniqueInput
    update: XOR<GamePlayerUpdateWithoutUserInput, GamePlayerUncheckedUpdateWithoutUserInput>
    create: XOR<GamePlayerCreateWithoutUserInput, GamePlayerUncheckedCreateWithoutUserInput>
  }

  export type GamePlayerUpdateWithWhereUniqueWithoutUserInput = {
    where: GamePlayerWhereUniqueInput
    data: XOR<GamePlayerUpdateWithoutUserInput, GamePlayerUncheckedUpdateWithoutUserInput>
  }

  export type GamePlayerUpdateManyWithWhereWithoutUserInput = {
    where: GamePlayerScalarWhereInput
    data: XOR<GamePlayerUpdateManyMutationInput, GamePlayerUncheckedUpdateManyWithoutUserInput>
  }

  export type GamePlayerScalarWhereInput = {
    AND?: GamePlayerScalarWhereInput | GamePlayerScalarWhereInput[]
    OR?: GamePlayerScalarWhereInput[]
    NOT?: GamePlayerScalarWhereInput | GamePlayerScalarWhereInput[]
    id?: IntFilter<"GamePlayer"> | number
    team?: StringFilter<"GamePlayer"> | string
    position?: StringNullableFilter<"GamePlayer"> | string | null
    isGuest?: BoolFilter<"GamePlayer"> | boolean
    guestName?: StringNullableFilter<"GamePlayer"> | string | null
    gameId?: IntFilter<"GamePlayer"> | number
    userId?: IntNullableFilter<"GamePlayer"> | number | null
  }

  export type GameCreateWithoutTableInput = {
    code: string
    status?: string
    gameMode?: string
    scoreLeft?: number
    scoreRight?: number
    maxScore?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    startedAt?: Date | string | null
    finishedAt?: Date | string | null
    host: UserCreateNestedOneWithoutHostedGamesInput
    players?: GamePlayerCreateNestedManyWithoutGameInput
  }

  export type GameUncheckedCreateWithoutTableInput = {
    id?: number
    code: string
    status?: string
    gameMode?: string
    scoreLeft?: number
    scoreRight?: number
    maxScore?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    startedAt?: Date | string | null
    finishedAt?: Date | string | null
    hostId: number
    players?: GamePlayerUncheckedCreateNestedManyWithoutGameInput
  }

  export type GameCreateOrConnectWithoutTableInput = {
    where: GameWhereUniqueInput
    create: XOR<GameCreateWithoutTableInput, GameUncheckedCreateWithoutTableInput>
  }

  export type GameCreateManyTableInputEnvelope = {
    data: GameCreateManyTableInput | GameCreateManyTableInput[]
  }

  export type GameUpsertWithWhereUniqueWithoutTableInput = {
    where: GameWhereUniqueInput
    update: XOR<GameUpdateWithoutTableInput, GameUncheckedUpdateWithoutTableInput>
    create: XOR<GameCreateWithoutTableInput, GameUncheckedCreateWithoutTableInput>
  }

  export type GameUpdateWithWhereUniqueWithoutTableInput = {
    where: GameWhereUniqueInput
    data: XOR<GameUpdateWithoutTableInput, GameUncheckedUpdateWithoutTableInput>
  }

  export type GameUpdateManyWithWhereWithoutTableInput = {
    where: GameScalarWhereInput
    data: XOR<GameUpdateManyMutationInput, GameUncheckedUpdateManyWithoutTableInput>
  }

  export type FoosballTableCreateWithoutGamesInput = {
    name: string
    location: string
    isActive?: boolean
    isAvailable?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FoosballTableUncheckedCreateWithoutGamesInput = {
    id?: number
    name: string
    location: string
    isActive?: boolean
    isAvailable?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FoosballTableCreateOrConnectWithoutGamesInput = {
    where: FoosballTableWhereUniqueInput
    create: XOR<FoosballTableCreateWithoutGamesInput, FoosballTableUncheckedCreateWithoutGamesInput>
  }

  export type UserCreateWithoutHostedGamesInput = {
    email: string
    name: string
    password: string
    score?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    firstName?: string | null
    lastName?: string | null
    avatar?: string | null
    jerseyNumber?: number | null
    skillLevel?: string | null
    position?: string | null
    championship?: string | null
    xp?: number
    coins?: number
    elo?: number
    gameParticipations?: GamePlayerCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutHostedGamesInput = {
    id?: number
    email: string
    name: string
    password: string
    score?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    firstName?: string | null
    lastName?: string | null
    avatar?: string | null
    jerseyNumber?: number | null
    skillLevel?: string | null
    position?: string | null
    championship?: string | null
    xp?: number
    coins?: number
    elo?: number
    gameParticipations?: GamePlayerUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutHostedGamesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutHostedGamesInput, UserUncheckedCreateWithoutHostedGamesInput>
  }

  export type GamePlayerCreateWithoutGameInput = {
    team: string
    position?: string | null
    isGuest?: boolean
    guestName?: string | null
    user?: UserCreateNestedOneWithoutGameParticipationsInput
  }

  export type GamePlayerUncheckedCreateWithoutGameInput = {
    id?: number
    team: string
    position?: string | null
    isGuest?: boolean
    guestName?: string | null
    userId?: number | null
  }

  export type GamePlayerCreateOrConnectWithoutGameInput = {
    where: GamePlayerWhereUniqueInput
    create: XOR<GamePlayerCreateWithoutGameInput, GamePlayerUncheckedCreateWithoutGameInput>
  }

  export type GamePlayerCreateManyGameInputEnvelope = {
    data: GamePlayerCreateManyGameInput | GamePlayerCreateManyGameInput[]
  }

  export type FoosballTableUpsertWithoutGamesInput = {
    update: XOR<FoosballTableUpdateWithoutGamesInput, FoosballTableUncheckedUpdateWithoutGamesInput>
    create: XOR<FoosballTableCreateWithoutGamesInput, FoosballTableUncheckedCreateWithoutGamesInput>
    where?: FoosballTableWhereInput
  }

  export type FoosballTableUpdateToOneWithWhereWithoutGamesInput = {
    where?: FoosballTableWhereInput
    data: XOR<FoosballTableUpdateWithoutGamesInput, FoosballTableUncheckedUpdateWithoutGamesInput>
  }

  export type FoosballTableUpdateWithoutGamesInput = {
    name?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FoosballTableUncheckedUpdateWithoutGamesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpsertWithoutHostedGamesInput = {
    update: XOR<UserUpdateWithoutHostedGamesInput, UserUncheckedUpdateWithoutHostedGamesInput>
    create: XOR<UserCreateWithoutHostedGamesInput, UserUncheckedCreateWithoutHostedGamesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutHostedGamesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutHostedGamesInput, UserUncheckedUpdateWithoutHostedGamesInput>
  }

  export type UserUpdateWithoutHostedGamesInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    jerseyNumber?: NullableIntFieldUpdateOperationsInput | number | null
    skillLevel?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    championship?: NullableStringFieldUpdateOperationsInput | string | null
    xp?: IntFieldUpdateOperationsInput | number
    coins?: IntFieldUpdateOperationsInput | number
    elo?: IntFieldUpdateOperationsInput | number
    gameParticipations?: GamePlayerUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutHostedGamesInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    jerseyNumber?: NullableIntFieldUpdateOperationsInput | number | null
    skillLevel?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    championship?: NullableStringFieldUpdateOperationsInput | string | null
    xp?: IntFieldUpdateOperationsInput | number
    coins?: IntFieldUpdateOperationsInput | number
    elo?: IntFieldUpdateOperationsInput | number
    gameParticipations?: GamePlayerUncheckedUpdateManyWithoutUserNestedInput
  }

  export type GamePlayerUpsertWithWhereUniqueWithoutGameInput = {
    where: GamePlayerWhereUniqueInput
    update: XOR<GamePlayerUpdateWithoutGameInput, GamePlayerUncheckedUpdateWithoutGameInput>
    create: XOR<GamePlayerCreateWithoutGameInput, GamePlayerUncheckedCreateWithoutGameInput>
  }

  export type GamePlayerUpdateWithWhereUniqueWithoutGameInput = {
    where: GamePlayerWhereUniqueInput
    data: XOR<GamePlayerUpdateWithoutGameInput, GamePlayerUncheckedUpdateWithoutGameInput>
  }

  export type GamePlayerUpdateManyWithWhereWithoutGameInput = {
    where: GamePlayerScalarWhereInput
    data: XOR<GamePlayerUpdateManyMutationInput, GamePlayerUncheckedUpdateManyWithoutGameInput>
  }

  export type GameCreateWithoutPlayersInput = {
    code: string
    status?: string
    gameMode?: string
    scoreLeft?: number
    scoreRight?: number
    maxScore?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    startedAt?: Date | string | null
    finishedAt?: Date | string | null
    table: FoosballTableCreateNestedOneWithoutGamesInput
    host: UserCreateNestedOneWithoutHostedGamesInput
  }

  export type GameUncheckedCreateWithoutPlayersInput = {
    id?: number
    code: string
    status?: string
    gameMode?: string
    scoreLeft?: number
    scoreRight?: number
    maxScore?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    startedAt?: Date | string | null
    finishedAt?: Date | string | null
    tableId: number
    hostId: number
  }

  export type GameCreateOrConnectWithoutPlayersInput = {
    where: GameWhereUniqueInput
    create: XOR<GameCreateWithoutPlayersInput, GameUncheckedCreateWithoutPlayersInput>
  }

  export type UserCreateWithoutGameParticipationsInput = {
    email: string
    name: string
    password: string
    score?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    firstName?: string | null
    lastName?: string | null
    avatar?: string | null
    jerseyNumber?: number | null
    skillLevel?: string | null
    position?: string | null
    championship?: string | null
    xp?: number
    coins?: number
    elo?: number
    hostedGames?: GameCreateNestedManyWithoutHostInput
  }

  export type UserUncheckedCreateWithoutGameParticipationsInput = {
    id?: number
    email: string
    name: string
    password: string
    score?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    firstName?: string | null
    lastName?: string | null
    avatar?: string | null
    jerseyNumber?: number | null
    skillLevel?: string | null
    position?: string | null
    championship?: string | null
    xp?: number
    coins?: number
    elo?: number
    hostedGames?: GameUncheckedCreateNestedManyWithoutHostInput
  }

  export type UserCreateOrConnectWithoutGameParticipationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutGameParticipationsInput, UserUncheckedCreateWithoutGameParticipationsInput>
  }

  export type GameUpsertWithoutPlayersInput = {
    update: XOR<GameUpdateWithoutPlayersInput, GameUncheckedUpdateWithoutPlayersInput>
    create: XOR<GameCreateWithoutPlayersInput, GameUncheckedCreateWithoutPlayersInput>
    where?: GameWhereInput
  }

  export type GameUpdateToOneWithWhereWithoutPlayersInput = {
    where?: GameWhereInput
    data: XOR<GameUpdateWithoutPlayersInput, GameUncheckedUpdateWithoutPlayersInput>
  }

  export type GameUpdateWithoutPlayersInput = {
    code?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    gameMode?: StringFieldUpdateOperationsInput | string
    scoreLeft?: IntFieldUpdateOperationsInput | number
    scoreRight?: IntFieldUpdateOperationsInput | number
    maxScore?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    table?: FoosballTableUpdateOneRequiredWithoutGamesNestedInput
    host?: UserUpdateOneRequiredWithoutHostedGamesNestedInput
  }

  export type GameUncheckedUpdateWithoutPlayersInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    gameMode?: StringFieldUpdateOperationsInput | string
    scoreLeft?: IntFieldUpdateOperationsInput | number
    scoreRight?: IntFieldUpdateOperationsInput | number
    maxScore?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tableId?: IntFieldUpdateOperationsInput | number
    hostId?: IntFieldUpdateOperationsInput | number
  }

  export type UserUpsertWithoutGameParticipationsInput = {
    update: XOR<UserUpdateWithoutGameParticipationsInput, UserUncheckedUpdateWithoutGameParticipationsInput>
    create: XOR<UserCreateWithoutGameParticipationsInput, UserUncheckedCreateWithoutGameParticipationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutGameParticipationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutGameParticipationsInput, UserUncheckedUpdateWithoutGameParticipationsInput>
  }

  export type UserUpdateWithoutGameParticipationsInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    jerseyNumber?: NullableIntFieldUpdateOperationsInput | number | null
    skillLevel?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    championship?: NullableStringFieldUpdateOperationsInput | string | null
    xp?: IntFieldUpdateOperationsInput | number
    coins?: IntFieldUpdateOperationsInput | number
    elo?: IntFieldUpdateOperationsInput | number
    hostedGames?: GameUpdateManyWithoutHostNestedInput
  }

  export type UserUncheckedUpdateWithoutGameParticipationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    jerseyNumber?: NullableIntFieldUpdateOperationsInput | number | null
    skillLevel?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    championship?: NullableStringFieldUpdateOperationsInput | string | null
    xp?: IntFieldUpdateOperationsInput | number
    coins?: IntFieldUpdateOperationsInput | number
    elo?: IntFieldUpdateOperationsInput | number
    hostedGames?: GameUncheckedUpdateManyWithoutHostNestedInput
  }

  export type GameCreateManyHostInput = {
    id?: number
    code: string
    status?: string
    gameMode?: string
    scoreLeft?: number
    scoreRight?: number
    maxScore?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    startedAt?: Date | string | null
    finishedAt?: Date | string | null
    tableId: number
  }

  export type GamePlayerCreateManyUserInput = {
    id?: number
    team: string
    position?: string | null
    isGuest?: boolean
    guestName?: string | null
    gameId: number
  }

  export type GameUpdateWithoutHostInput = {
    code?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    gameMode?: StringFieldUpdateOperationsInput | string
    scoreLeft?: IntFieldUpdateOperationsInput | number
    scoreRight?: IntFieldUpdateOperationsInput | number
    maxScore?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    table?: FoosballTableUpdateOneRequiredWithoutGamesNestedInput
    players?: GamePlayerUpdateManyWithoutGameNestedInput
  }

  export type GameUncheckedUpdateWithoutHostInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    gameMode?: StringFieldUpdateOperationsInput | string
    scoreLeft?: IntFieldUpdateOperationsInput | number
    scoreRight?: IntFieldUpdateOperationsInput | number
    maxScore?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tableId?: IntFieldUpdateOperationsInput | number
    players?: GamePlayerUncheckedUpdateManyWithoutGameNestedInput
  }

  export type GameUncheckedUpdateManyWithoutHostInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    gameMode?: StringFieldUpdateOperationsInput | string
    scoreLeft?: IntFieldUpdateOperationsInput | number
    scoreRight?: IntFieldUpdateOperationsInput | number
    maxScore?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tableId?: IntFieldUpdateOperationsInput | number
  }

  export type GamePlayerUpdateWithoutUserInput = {
    team?: StringFieldUpdateOperationsInput | string
    position?: NullableStringFieldUpdateOperationsInput | string | null
    isGuest?: BoolFieldUpdateOperationsInput | boolean
    guestName?: NullableStringFieldUpdateOperationsInput | string | null
    game?: GameUpdateOneRequiredWithoutPlayersNestedInput
  }

  export type GamePlayerUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    team?: StringFieldUpdateOperationsInput | string
    position?: NullableStringFieldUpdateOperationsInput | string | null
    isGuest?: BoolFieldUpdateOperationsInput | boolean
    guestName?: NullableStringFieldUpdateOperationsInput | string | null
    gameId?: IntFieldUpdateOperationsInput | number
  }

  export type GamePlayerUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    team?: StringFieldUpdateOperationsInput | string
    position?: NullableStringFieldUpdateOperationsInput | string | null
    isGuest?: BoolFieldUpdateOperationsInput | boolean
    guestName?: NullableStringFieldUpdateOperationsInput | string | null
    gameId?: IntFieldUpdateOperationsInput | number
  }

  export type GameCreateManyTableInput = {
    id?: number
    code: string
    status?: string
    gameMode?: string
    scoreLeft?: number
    scoreRight?: number
    maxScore?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    startedAt?: Date | string | null
    finishedAt?: Date | string | null
    hostId: number
  }

  export type GameUpdateWithoutTableInput = {
    code?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    gameMode?: StringFieldUpdateOperationsInput | string
    scoreLeft?: IntFieldUpdateOperationsInput | number
    scoreRight?: IntFieldUpdateOperationsInput | number
    maxScore?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    host?: UserUpdateOneRequiredWithoutHostedGamesNestedInput
    players?: GamePlayerUpdateManyWithoutGameNestedInput
  }

  export type GameUncheckedUpdateWithoutTableInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    gameMode?: StringFieldUpdateOperationsInput | string
    scoreLeft?: IntFieldUpdateOperationsInput | number
    scoreRight?: IntFieldUpdateOperationsInput | number
    maxScore?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    hostId?: IntFieldUpdateOperationsInput | number
    players?: GamePlayerUncheckedUpdateManyWithoutGameNestedInput
  }

  export type GameUncheckedUpdateManyWithoutTableInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    gameMode?: StringFieldUpdateOperationsInput | string
    scoreLeft?: IntFieldUpdateOperationsInput | number
    scoreRight?: IntFieldUpdateOperationsInput | number
    maxScore?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    hostId?: IntFieldUpdateOperationsInput | number
  }

  export type GamePlayerCreateManyGameInput = {
    id?: number
    team: string
    position?: string | null
    isGuest?: boolean
    guestName?: string | null
    userId?: number | null
  }

  export type GamePlayerUpdateWithoutGameInput = {
    team?: StringFieldUpdateOperationsInput | string
    position?: NullableStringFieldUpdateOperationsInput | string | null
    isGuest?: BoolFieldUpdateOperationsInput | boolean
    guestName?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneWithoutGameParticipationsNestedInput
  }

  export type GamePlayerUncheckedUpdateWithoutGameInput = {
    id?: IntFieldUpdateOperationsInput | number
    team?: StringFieldUpdateOperationsInput | string
    position?: NullableStringFieldUpdateOperationsInput | string | null
    isGuest?: BoolFieldUpdateOperationsInput | boolean
    guestName?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type GamePlayerUncheckedUpdateManyWithoutGameInput = {
    id?: IntFieldUpdateOperationsInput | number
    team?: StringFieldUpdateOperationsInput | string
    position?: NullableStringFieldUpdateOperationsInput | string | null
    isGuest?: BoolFieldUpdateOperationsInput | boolean
    guestName?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: NullableIntFieldUpdateOperationsInput | number | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}