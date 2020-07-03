import {
  DMMF,
  DMMFClass,
  Engine,
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  sqltag as sql,
  empty,
  join,
  raw,
} from './runtime';

export { PrismaClientKnownRequestError }
export { PrismaClientUnknownRequestError }
export { PrismaClientRustPanicError }
export { PrismaClientInitializationError }
export { PrismaClientValidationError }

/**
 * Prisma Client JS version: 2.0.0-beta.6
 * Query Engine version: ff6959d77f8880ec037ed8201fff4a92f3aabaa0
 */
export declare type PrismaVersion = {
  client: string
}

export declare const prismaVersion: PrismaVersion 

/**
 * Utility Types
 */

declare type SelectAndInclude = {
  select: any
  include: any
}

declare type HasSelect = {
  select: any
}

declare type HasInclude = {
  include: any
}


declare type CheckSelect<T, S, U> = T extends SelectAndInclude
  ? 'Please either choose `select` or `include`'
  : T extends HasSelect
  ? U
  : T extends HasInclude
  ? U
  : S

/**
 * Get the type of the value, that the Promise holds.
 */
export declare type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

/**
 * Get the return type of a function which returns a Promise.
 */
export declare type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>


export declare type Enumerable<T> = T | Array<T>;

export declare type TrueKeys<T> = {
  [key in keyof T]: T[key] extends false | undefined | null ? never : key
}[keyof T]

/**
 * Subset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
 */
export declare type Subset<T, U> = {
  [key in keyof T]: key extends keyof U ? T[key] : never;
};
declare class PrismaClientFetcher {
  private readonly prisma;
  private readonly debug;
  private readonly hooks?;
  constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
  request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string, collectTimestamps?: any): Promise<T>;
  sanitizeMessage(message: string): string;
  protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
}


/**
 * Client
**/


export type Datasources = {
  postgresql?: string
}

export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

export interface PrismaClientOptions {
  /**
   * Overwrites the datasource url from your prisma.schema file
   */
  datasources?: Datasources

  /**
   * @default "colorless"
   */
  errorFormat?: ErrorFormat

  /**
   * @example
   * ```
   * // Defaults to stdout
   * log: ['query', 'info', 'warn']
   * 
   * // Emit as events
   * log: [
   *  { emit: 'stdout', level: 'query' },
   *  { emit: 'stdout', level: 'info' },
   *  { emit: 'stdout', level: 'warn' }
   * ]
   * ```
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
   */
  log?: Array<LogLevel | LogDefinition>

  /**
   * You probably don't want to use this. `__internal` is used by internal tooling.
   */
  __internal?: {
    debug?: boolean
    hooks?: Hooks
    engine?: {
      cwd?: string
      binaryPath?: string
    }
    measurePerformance?: boolean
  }
}

export type Hooks = {
  beforeRequest?: (options: {query: string, path: string[], rootField?: string, typeName?: string, document: any}) => any
}

/* Types for Logging */
export type LogLevel = 'info' | 'query' | 'warn'
export type LogDefinition = {
  level: LogLevel
  emit: 'stdout' | 'event'
}

export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
export type GetEvents<T extends Array<LogLevel | LogDefinition>> = GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]>

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

// tested in getLogLevel.test.ts
export declare function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js (ORM replacement)
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Comments
 * const comments = await prisma.comment.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://github.com/prisma/prisma/blob/master/docs/prisma-client-js/api.md).
 */
export declare class PrismaClient<T extends PrismaClientOptions = {}, U = keyof T extends 'log' ? T['log'] extends Array<LogLevel | LogDefinition> ? GetEvents<T['log']> : never : never> {
  /**
   * @private
   */
  private fetcher;
  /**
   * @private
   */
  private readonly dmmf;
  /**
   * @private
   */
  private connectionPromise?;
  /**
   * @private
   */
  private disconnectionPromise?;
  /**
   * @private
   */
  private readonly engineConfig;
  /**
   * @private
   */
  private readonly measurePerformance;
  /**
   * @private
   */
  private engine: Engine;
  /**
   * @private
   */
  private errorFormat: ErrorFormat;

  /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js (ORM replacement)
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Comments
   * const comments = await prisma.comment.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://github.com/prisma/prisma/blob/master/docs/prisma-client-js/api.md).
   */
  constructor(optionsArg?: T);
  on<V extends U>(eventType: V, callback: V extends never ? never : (event: V extends 'query' ? QueryEvent : LogEvent) => void): void;
  /**
   * Connect with the database
   */
  connect(): Promise<void>;
  /**
   * @private
   */
  private runDisconnect;
  /**
   * Disconnect from the database
   */
  disconnect(): Promise<any>;
  /**
   * Makes a raw query
   * @example
   * ```
   * // With parameters use prisma.raw``, values will be escaped automatically
   * const result = await prisma.raw`SELECT * FROM User WHERE id = ${1} OR email = ${'e@ma.il'};`
   * // Or
   * const result = await prisma.raw('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'e@ma.il')
  * ```
  * 
  * Read more in our [docs](https://github.com/prisma/prisma/blob/master/docs/prisma-client-js/api.md#raw-database-access).
  */
  raw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<T>;

  /**
   * `prisma.comment`: Exposes CRUD operations for the **comment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Comments
    * const comments = await prisma.comment.findMany()
    * ```
    */
  get comment(): commentDelegate;

  /**
   * `prisma.likes`: Exposes CRUD operations for the **likes** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Likes
    * const likes = await prisma.likes.findMany()
    * ```
    */
  get likes(): likesDelegate;

  /**
   * `prisma.posts`: Exposes CRUD operations for the **posts** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Posts
    * const posts = await prisma.posts.findMany()
    * ```
    */
  get posts(): postsDelegate;

  /**
   * `prisma.profile`: Exposes CRUD operations for the **profile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Profiles
    * const profiles = await prisma.profile.findMany()
    * ```
    */
  get profile(): profileDelegate;

  /**
   * `prisma.todo`: Exposes CRUD operations for the **todo** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Todos
    * const todos = await prisma.todo.findMany()
    * ```
    */
  get todo(): todoDelegate;

  /**
   * `prisma.users`: Exposes CRUD operations for the **users** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.users.findMany()
    * ```
    */
  get users(): usersDelegate;
}



/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export declare const OrderByArg: {
  asc: 'asc',
  desc: 'desc'
};

export declare type OrderByArg = (typeof OrderByArg)[keyof typeof OrderByArg]



/**
 * Model comment
 */

export type comment = {
  comment: string | null
  email: string | null
  id: string
  postid: string | null
}

export type commentSelect = {
  comment?: boolean
  email?: boolean
  id?: boolean
  postid?: boolean
  users?: boolean | usersArgs
}

export type commentInclude = {
  users?: boolean | usersArgs
}

export type commentGetPayload<
  S extends boolean | null | undefined | commentArgs,
  U = keyof S
> = S extends true
  ? comment
  : S extends undefined
  ? never
  : S extends commentArgs | FindManycommentArgs
  ? 'include' extends U
    ? comment  & {
      [P in TrueKeys<S['include']>]:
      P extends 'users'
      ? usersGetPayload<S['include'][P]> | null : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof comment ? comment[P]
: 
      P extends 'users'
      ? usersGetPayload<S['select'][P]> | null : never
    }
  : comment
: comment


export interface commentDelegate {
  /**
   * Find zero or one Comment.
   * @param {FindOnecommentArgs} args - Arguments to find a Comment
   * @example
   * // Get one Comment
   * const comment = await prisma.comment.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOnecommentArgs>(
    args: Subset<T, FindOnecommentArgs>
  ): CheckSelect<T, commentClient<comment | null>, commentClient<commentGetPayload<T> | null>>
  /**
   * Find zero or more Comments.
   * @param {FindManycommentArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Comments
   * const comments = await prisma.comment.findMany()
   * 
   * // Get first 10 Comments
   * const comments = await prisma.comment.findMany({ first: 10 })
   * 
   * // Only select the `comment`
   * const commentWithCommentOnly = await prisma.comment.findMany({ select: { comment: true } })
   * 
  **/
  findMany<T extends FindManycommentArgs>(
    args?: Subset<T, FindManycommentArgs>
  ): CheckSelect<T, Promise<Array<comment>>, Promise<Array<commentGetPayload<T>>>>
  /**
   * Create a Comment.
   * @param {commentCreateArgs} args - Arguments to create a Comment.
   * @example
   * // Create one Comment
   * const user = await prisma.comment.create({
   *   data: {
   *     // ... data to create a Comment
   *   }
   * })
   * 
  **/
  create<T extends commentCreateArgs>(
    args: Subset<T, commentCreateArgs>
  ): CheckSelect<T, commentClient<comment>, commentClient<commentGetPayload<T>>>
  /**
   * Delete a Comment.
   * @param {commentDeleteArgs} args - Arguments to delete one Comment.
   * @example
   * // Delete one Comment
   * const user = await prisma.comment.delete({
   *   where: {
   *     // ... filter to delete one Comment
   *   }
   * })
   * 
  **/
  delete<T extends commentDeleteArgs>(
    args: Subset<T, commentDeleteArgs>
  ): CheckSelect<T, commentClient<comment>, commentClient<commentGetPayload<T>>>
  /**
   * Update one Comment.
   * @param {commentUpdateArgs} args - Arguments to update one Comment.
   * @example
   * // Update one Comment
   * const comment = await prisma.comment.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends commentUpdateArgs>(
    args: Subset<T, commentUpdateArgs>
  ): CheckSelect<T, commentClient<comment>, commentClient<commentGetPayload<T>>>
  /**
   * Delete zero or more Comments.
   * @param {commentDeleteManyArgs} args - Arguments to filter Comments to delete.
   * @example
   * // Delete a few Comments
   * const { count } = await prisma.comment.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends commentDeleteManyArgs>(
    args: Subset<T, commentDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Comments.
   * @param {commentUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Comments
   * const comment = await prisma.comment.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends commentUpdateManyArgs>(
    args: Subset<T, commentUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Comment.
   * @param {commentUpsertArgs} args - Arguments to update or create a Comment.
   * @example
   * // Update or create a Comment
   * const comment = await prisma.comment.upsert({
   *   create: {
   *     // ... data to create a Comment
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Comment we want to update
   *   }
   * })
  **/
  upsert<T extends commentUpsertArgs>(
    args: Subset<T, commentUpsertArgs>
  ): CheckSelect<T, commentClient<comment>, commentClient<commentGetPayload<T>>>
  /**
   * 
   */
  count(args?: Omit<FindManycommentArgs, 'select' | 'include'>): Promise<number>
}

export declare class commentClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  private _collectTimestamps?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  users<T extends usersArgs = {}>(args?: Subset<T, usersArgs>): CheckSelect<T, usersClient<users | null>, usersClient<usersGetPayload<T> | null>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * comment findOne
 */
export type FindOnecommentArgs = {
  /**
   * Select specific fields to fetch from the comment
  **/
  select?: commentSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: commentInclude | null
  /**
   * Filter, which comment to fetch.
  **/
  where: commentWhereUniqueInput
}


/**
 * comment findMany
 */
export type FindManycommentArgs = {
  /**
   * Select specific fields to fetch from the comment
  **/
  select?: commentSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: commentInclude | null
  /**
   * Filter, which comments to fetch.
  **/
  where?: commentWhereInput
  /**
   * Determine the order of the comments to fetch.
  **/
  orderBy?: commentOrderByInput
  cursor?: commentWhereUniqueInput
  take?: number
  /**
   * Skip the first `n` comments.
  **/
  skip?: number
}


/**
 * comment create
 */
export type commentCreateArgs = {
  /**
   * Select specific fields to fetch from the comment
  **/
  select?: commentSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: commentInclude | null
  /**
   * The data needed to create a comment.
  **/
  data: commentCreateInput
}


/**
 * comment update
 */
export type commentUpdateArgs = {
  /**
   * Select specific fields to fetch from the comment
  **/
  select?: commentSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: commentInclude | null
  /**
   * The data needed to update a comment.
  **/
  data: commentUpdateInput
  /**
   * Choose, which comment to update.
  **/
  where: commentWhereUniqueInput
}


/**
 * comment updateMany
 */
export type commentUpdateManyArgs = {
  data: commentUpdateManyMutationInput
  where?: commentWhereInput
}


/**
 * comment upsert
 */
export type commentUpsertArgs = {
  /**
   * Select specific fields to fetch from the comment
  **/
  select?: commentSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: commentInclude | null
  /**
   * The filter to search for the comment to update in case it exists.
  **/
  where: commentWhereUniqueInput
  /**
   * In case the comment found by the `where` argument doesn't exist, create a new comment with this data.
  **/
  create: commentCreateInput
  /**
   * In case the comment was found with the provided `where` argument, update it with this data.
  **/
  update: commentUpdateInput
}


/**
 * comment delete
 */
export type commentDeleteArgs = {
  /**
   * Select specific fields to fetch from the comment
  **/
  select?: commentSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: commentInclude | null
  /**
   * Filter which comment to delete.
  **/
  where: commentWhereUniqueInput
}


/**
 * comment deleteMany
 */
export type commentDeleteManyArgs = {
  where?: commentWhereInput
}


/**
 * comment without action
 */
export type commentArgs = {
  /**
   * Select specific fields to fetch from the comment
  **/
  select?: commentSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: commentInclude | null
}



/**
 * Model likes
 */

export type likes = {
  email: string | null
  id: string
  postid: string
}

export type likesSelect = {
  email?: boolean
  id?: boolean
  postid?: boolean
  post?: boolean | postsArgs
  users?: boolean | usersArgs
}

export type likesInclude = {
  post?: boolean | postsArgs
  users?: boolean | usersArgs
}

export type likesGetPayload<
  S extends boolean | null | undefined | likesArgs,
  U = keyof S
> = S extends true
  ? likes
  : S extends undefined
  ? never
  : S extends likesArgs | FindManylikesArgs
  ? 'include' extends U
    ? likes  & {
      [P in TrueKeys<S['include']>]:
      P extends 'post'
      ? postsGetPayload<S['include'][P]> :
      P extends 'users'
      ? usersGetPayload<S['include'][P]> | null : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof likes ? likes[P]
: 
      P extends 'post'
      ? postsGetPayload<S['select'][P]> :
      P extends 'users'
      ? usersGetPayload<S['select'][P]> | null : never
    }
  : likes
: likes


export interface likesDelegate {
  /**
   * Find zero or one Likes.
   * @param {FindOnelikesArgs} args - Arguments to find a Likes
   * @example
   * // Get one Likes
   * const likes = await prisma.likes.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOnelikesArgs>(
    args: Subset<T, FindOnelikesArgs>
  ): CheckSelect<T, likesClient<likes | null>, likesClient<likesGetPayload<T> | null>>
  /**
   * Find zero or more Likes.
   * @param {FindManylikesArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Likes
   * const likes = await prisma.likes.findMany()
   * 
   * // Get first 10 Likes
   * const likes = await prisma.likes.findMany({ first: 10 })
   * 
   * // Only select the `email`
   * const likesWithEmailOnly = await prisma.likes.findMany({ select: { email: true } })
   * 
  **/
  findMany<T extends FindManylikesArgs>(
    args?: Subset<T, FindManylikesArgs>
  ): CheckSelect<T, Promise<Array<likes>>, Promise<Array<likesGetPayload<T>>>>
  /**
   * Create a Likes.
   * @param {likesCreateArgs} args - Arguments to create a Likes.
   * @example
   * // Create one Likes
   * const user = await prisma.likes.create({
   *   data: {
   *     // ... data to create a Likes
   *   }
   * })
   * 
  **/
  create<T extends likesCreateArgs>(
    args: Subset<T, likesCreateArgs>
  ): CheckSelect<T, likesClient<likes>, likesClient<likesGetPayload<T>>>
  /**
   * Delete a Likes.
   * @param {likesDeleteArgs} args - Arguments to delete one Likes.
   * @example
   * // Delete one Likes
   * const user = await prisma.likes.delete({
   *   where: {
   *     // ... filter to delete one Likes
   *   }
   * })
   * 
  **/
  delete<T extends likesDeleteArgs>(
    args: Subset<T, likesDeleteArgs>
  ): CheckSelect<T, likesClient<likes>, likesClient<likesGetPayload<T>>>
  /**
   * Update one Likes.
   * @param {likesUpdateArgs} args - Arguments to update one Likes.
   * @example
   * // Update one Likes
   * const likes = await prisma.likes.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends likesUpdateArgs>(
    args: Subset<T, likesUpdateArgs>
  ): CheckSelect<T, likesClient<likes>, likesClient<likesGetPayload<T>>>
  /**
   * Delete zero or more Likes.
   * @param {likesDeleteManyArgs} args - Arguments to filter Likes to delete.
   * @example
   * // Delete a few Likes
   * const { count } = await prisma.likes.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends likesDeleteManyArgs>(
    args: Subset<T, likesDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Likes.
   * @param {likesUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Likes
   * const likes = await prisma.likes.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends likesUpdateManyArgs>(
    args: Subset<T, likesUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Likes.
   * @param {likesUpsertArgs} args - Arguments to update or create a Likes.
   * @example
   * // Update or create a Likes
   * const likes = await prisma.likes.upsert({
   *   create: {
   *     // ... data to create a Likes
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Likes we want to update
   *   }
   * })
  **/
  upsert<T extends likesUpsertArgs>(
    args: Subset<T, likesUpsertArgs>
  ): CheckSelect<T, likesClient<likes>, likesClient<likesGetPayload<T>>>
  /**
   * 
   */
  count(args?: Omit<FindManylikesArgs, 'select' | 'include'>): Promise<number>
}

export declare class likesClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  private _collectTimestamps?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  post<T extends postsArgs = {}>(args?: Subset<T, postsArgs>): CheckSelect<T, postsClient<posts | null>, postsClient<postsGetPayload<T> | null>>;

  users<T extends usersArgs = {}>(args?: Subset<T, usersArgs>): CheckSelect<T, usersClient<users | null>, usersClient<usersGetPayload<T> | null>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * likes findOne
 */
export type FindOnelikesArgs = {
  /**
   * Select specific fields to fetch from the likes
  **/
  select?: likesSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: likesInclude | null
  /**
   * Filter, which likes to fetch.
  **/
  where: likesWhereUniqueInput
}


/**
 * likes findMany
 */
export type FindManylikesArgs = {
  /**
   * Select specific fields to fetch from the likes
  **/
  select?: likesSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: likesInclude | null
  /**
   * Filter, which likes to fetch.
  **/
  where?: likesWhereInput
  /**
   * Determine the order of the likes to fetch.
  **/
  orderBy?: likesOrderByInput
  cursor?: likesWhereUniqueInput
  take?: number
  /**
   * Skip the first `n` likes.
  **/
  skip?: number
}


/**
 * likes create
 */
export type likesCreateArgs = {
  /**
   * Select specific fields to fetch from the likes
  **/
  select?: likesSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: likesInclude | null
  /**
   * The data needed to create a likes.
  **/
  data: likesCreateInput
}


/**
 * likes update
 */
export type likesUpdateArgs = {
  /**
   * Select specific fields to fetch from the likes
  **/
  select?: likesSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: likesInclude | null
  /**
   * The data needed to update a likes.
  **/
  data: likesUpdateInput
  /**
   * Choose, which likes to update.
  **/
  where: likesWhereUniqueInput
}


/**
 * likes updateMany
 */
export type likesUpdateManyArgs = {
  data: likesUpdateManyMutationInput
  where?: likesWhereInput
}


/**
 * likes upsert
 */
export type likesUpsertArgs = {
  /**
   * Select specific fields to fetch from the likes
  **/
  select?: likesSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: likesInclude | null
  /**
   * The filter to search for the likes to update in case it exists.
  **/
  where: likesWhereUniqueInput
  /**
   * In case the likes found by the `where` argument doesn't exist, create a new likes with this data.
  **/
  create: likesCreateInput
  /**
   * In case the likes was found with the provided `where` argument, update it with this data.
  **/
  update: likesUpdateInput
}


/**
 * likes delete
 */
export type likesDeleteArgs = {
  /**
   * Select specific fields to fetch from the likes
  **/
  select?: likesSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: likesInclude | null
  /**
   * Filter which likes to delete.
  **/
  where: likesWhereUniqueInput
}


/**
 * likes deleteMany
 */
export type likesDeleteManyArgs = {
  where?: likesWhereInput
}


/**
 * likes without action
 */
export type likesArgs = {
  /**
   * Select specific fields to fetch from the likes
  **/
  select?: likesSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: likesInclude | null
}



/**
 * Model posts
 */

export type posts = {
  author: string | null
  avatar: string | null
  content: string | null
  created_at: Date | null
  email: string | null
  id: string
  postlike: number | null
  title: string | null
}

export type postsSelect = {
  author?: boolean
  avatar?: boolean
  content?: boolean
  created_at?: boolean
  email?: boolean
  id?: boolean
  postlike?: boolean
  title?: boolean
  users?: boolean | usersArgs
  Likes?: boolean | FindManylikesArgs
}

export type postsInclude = {
  users?: boolean | usersArgs
  Likes?: boolean | FindManylikesArgs
}

export type postsGetPayload<
  S extends boolean | null | undefined | postsArgs,
  U = keyof S
> = S extends true
  ? posts
  : S extends undefined
  ? never
  : S extends postsArgs | FindManypostsArgs
  ? 'include' extends U
    ? posts  & {
      [P in TrueKeys<S['include']>]:
      P extends 'users'
      ? usersGetPayload<S['include'][P]> | null :
      P extends 'Likes'
      ? Array<likesGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof posts ? posts[P]
: 
      P extends 'users'
      ? usersGetPayload<S['select'][P]> | null :
      P extends 'Likes'
      ? Array<likesGetPayload<S['select'][P]>> : never
    }
  : posts
: posts


export interface postsDelegate {
  /**
   * Find zero or one Posts.
   * @param {FindOnepostsArgs} args - Arguments to find a Posts
   * @example
   * // Get one Posts
   * const posts = await prisma.posts.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOnepostsArgs>(
    args: Subset<T, FindOnepostsArgs>
  ): CheckSelect<T, postsClient<posts | null>, postsClient<postsGetPayload<T> | null>>
  /**
   * Find zero or more Posts.
   * @param {FindManypostsArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Posts
   * const posts = await prisma.posts.findMany()
   * 
   * // Get first 10 Posts
   * const posts = await prisma.posts.findMany({ first: 10 })
   * 
   * // Only select the `author`
   * const postsWithAuthorOnly = await prisma.posts.findMany({ select: { author: true } })
   * 
  **/
  findMany<T extends FindManypostsArgs>(
    args?: Subset<T, FindManypostsArgs>
  ): CheckSelect<T, Promise<Array<posts>>, Promise<Array<postsGetPayload<T>>>>
  /**
   * Create a Posts.
   * @param {postsCreateArgs} args - Arguments to create a Posts.
   * @example
   * // Create one Posts
   * const user = await prisma.posts.create({
   *   data: {
   *     // ... data to create a Posts
   *   }
   * })
   * 
  **/
  create<T extends postsCreateArgs>(
    args: Subset<T, postsCreateArgs>
  ): CheckSelect<T, postsClient<posts>, postsClient<postsGetPayload<T>>>
  /**
   * Delete a Posts.
   * @param {postsDeleteArgs} args - Arguments to delete one Posts.
   * @example
   * // Delete one Posts
   * const user = await prisma.posts.delete({
   *   where: {
   *     // ... filter to delete one Posts
   *   }
   * })
   * 
  **/
  delete<T extends postsDeleteArgs>(
    args: Subset<T, postsDeleteArgs>
  ): CheckSelect<T, postsClient<posts>, postsClient<postsGetPayload<T>>>
  /**
   * Update one Posts.
   * @param {postsUpdateArgs} args - Arguments to update one Posts.
   * @example
   * // Update one Posts
   * const posts = await prisma.posts.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends postsUpdateArgs>(
    args: Subset<T, postsUpdateArgs>
  ): CheckSelect<T, postsClient<posts>, postsClient<postsGetPayload<T>>>
  /**
   * Delete zero or more Posts.
   * @param {postsDeleteManyArgs} args - Arguments to filter Posts to delete.
   * @example
   * // Delete a few Posts
   * const { count } = await prisma.posts.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends postsDeleteManyArgs>(
    args: Subset<T, postsDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Posts.
   * @param {postsUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Posts
   * const posts = await prisma.posts.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends postsUpdateManyArgs>(
    args: Subset<T, postsUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Posts.
   * @param {postsUpsertArgs} args - Arguments to update or create a Posts.
   * @example
   * // Update or create a Posts
   * const posts = await prisma.posts.upsert({
   *   create: {
   *     // ... data to create a Posts
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Posts we want to update
   *   }
   * })
  **/
  upsert<T extends postsUpsertArgs>(
    args: Subset<T, postsUpsertArgs>
  ): CheckSelect<T, postsClient<posts>, postsClient<postsGetPayload<T>>>
  /**
   * 
   */
  count(args?: Omit<FindManypostsArgs, 'select' | 'include'>): Promise<number>
}

export declare class postsClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  private _collectTimestamps?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  users<T extends usersArgs = {}>(args?: Subset<T, usersArgs>): CheckSelect<T, usersClient<users | null>, usersClient<usersGetPayload<T> | null>>;

  Likes<T extends FindManylikesArgs = {}>(args?: Subset<T, FindManylikesArgs>): CheckSelect<T, Promise<Array<likes>>, Promise<Array<likesGetPayload<T>>>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * posts findOne
 */
export type FindOnepostsArgs = {
  /**
   * Select specific fields to fetch from the posts
  **/
  select?: postsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: postsInclude | null
  /**
   * Filter, which posts to fetch.
  **/
  where: postsWhereUniqueInput
}


/**
 * posts findMany
 */
export type FindManypostsArgs = {
  /**
   * Select specific fields to fetch from the posts
  **/
  select?: postsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: postsInclude | null
  /**
   * Filter, which posts to fetch.
  **/
  where?: postsWhereInput
  /**
   * Determine the order of the posts to fetch.
  **/
  orderBy?: postsOrderByInput
  cursor?: postsWhereUniqueInput
  take?: number
  /**
   * Skip the first `n` posts.
  **/
  skip?: number
}


/**
 * posts create
 */
export type postsCreateArgs = {
  /**
   * Select specific fields to fetch from the posts
  **/
  select?: postsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: postsInclude | null
  /**
   * The data needed to create a posts.
  **/
  data: postsCreateInput
}


/**
 * posts update
 */
export type postsUpdateArgs = {
  /**
   * Select specific fields to fetch from the posts
  **/
  select?: postsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: postsInclude | null
  /**
   * The data needed to update a posts.
  **/
  data: postsUpdateInput
  /**
   * Choose, which posts to update.
  **/
  where: postsWhereUniqueInput
}


/**
 * posts updateMany
 */
export type postsUpdateManyArgs = {
  data: postsUpdateManyMutationInput
  where?: postsWhereInput
}


/**
 * posts upsert
 */
export type postsUpsertArgs = {
  /**
   * Select specific fields to fetch from the posts
  **/
  select?: postsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: postsInclude | null
  /**
   * The filter to search for the posts to update in case it exists.
  **/
  where: postsWhereUniqueInput
  /**
   * In case the posts found by the `where` argument doesn't exist, create a new posts with this data.
  **/
  create: postsCreateInput
  /**
   * In case the posts was found with the provided `where` argument, update it with this data.
  **/
  update: postsUpdateInput
}


/**
 * posts delete
 */
export type postsDeleteArgs = {
  /**
   * Select specific fields to fetch from the posts
  **/
  select?: postsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: postsInclude | null
  /**
   * Filter which posts to delete.
  **/
  where: postsWhereUniqueInput
}


/**
 * posts deleteMany
 */
export type postsDeleteManyArgs = {
  where?: postsWhereInput
}


/**
 * posts without action
 */
export type postsArgs = {
  /**
   * Select specific fields to fetch from the posts
  **/
  select?: postsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: postsInclude | null
}



/**
 * Model profile
 */

export type profile = {
  about: string | null
  email: string
  hobbies: string | null
  name: string | null
  occupation: string | null
  skills: string | null
}

export type profileSelect = {
  about?: boolean
  email?: boolean
  hobbies?: boolean
  name?: boolean
  occupation?: boolean
  skills?: boolean
}

export type profileGetPayload<
  S extends boolean | null | undefined | profileArgs,
  U = keyof S
> = S extends true
  ? profile
  : S extends undefined
  ? never
  : S extends profileArgs | FindManyprofileArgs
  ? 'include' extends U
    ? profile 
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof profile ? profile[P]
: 
 never
    }
  : profile
: profile


export interface profileDelegate {
  /**
   * Find zero or one Profile.
   * @param {FindOneprofileArgs} args - Arguments to find a Profile
   * @example
   * // Get one Profile
   * const profile = await prisma.profile.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneprofileArgs>(
    args: Subset<T, FindOneprofileArgs>
  ): CheckSelect<T, profileClient<profile | null>, profileClient<profileGetPayload<T> | null>>
  /**
   * Find zero or more Profiles.
   * @param {FindManyprofileArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Profiles
   * const profiles = await prisma.profile.findMany()
   * 
   * // Get first 10 Profiles
   * const profiles = await prisma.profile.findMany({ first: 10 })
   * 
   * // Only select the `about`
   * const profileWithAboutOnly = await prisma.profile.findMany({ select: { about: true } })
   * 
  **/
  findMany<T extends FindManyprofileArgs>(
    args?: Subset<T, FindManyprofileArgs>
  ): CheckSelect<T, Promise<Array<profile>>, Promise<Array<profileGetPayload<T>>>>
  /**
   * Create a Profile.
   * @param {profileCreateArgs} args - Arguments to create a Profile.
   * @example
   * // Create one Profile
   * const user = await prisma.profile.create({
   *   data: {
   *     // ... data to create a Profile
   *   }
   * })
   * 
  **/
  create<T extends profileCreateArgs>(
    args: Subset<T, profileCreateArgs>
  ): CheckSelect<T, profileClient<profile>, profileClient<profileGetPayload<T>>>
  /**
   * Delete a Profile.
   * @param {profileDeleteArgs} args - Arguments to delete one Profile.
   * @example
   * // Delete one Profile
   * const user = await prisma.profile.delete({
   *   where: {
   *     // ... filter to delete one Profile
   *   }
   * })
   * 
  **/
  delete<T extends profileDeleteArgs>(
    args: Subset<T, profileDeleteArgs>
  ): CheckSelect<T, profileClient<profile>, profileClient<profileGetPayload<T>>>
  /**
   * Update one Profile.
   * @param {profileUpdateArgs} args - Arguments to update one Profile.
   * @example
   * // Update one Profile
   * const profile = await prisma.profile.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends profileUpdateArgs>(
    args: Subset<T, profileUpdateArgs>
  ): CheckSelect<T, profileClient<profile>, profileClient<profileGetPayload<T>>>
  /**
   * Delete zero or more Profiles.
   * @param {profileDeleteManyArgs} args - Arguments to filter Profiles to delete.
   * @example
   * // Delete a few Profiles
   * const { count } = await prisma.profile.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends profileDeleteManyArgs>(
    args: Subset<T, profileDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Profiles.
   * @param {profileUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Profiles
   * const profile = await prisma.profile.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends profileUpdateManyArgs>(
    args: Subset<T, profileUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Profile.
   * @param {profileUpsertArgs} args - Arguments to update or create a Profile.
   * @example
   * // Update or create a Profile
   * const profile = await prisma.profile.upsert({
   *   create: {
   *     // ... data to create a Profile
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Profile we want to update
   *   }
   * })
  **/
  upsert<T extends profileUpsertArgs>(
    args: Subset<T, profileUpsertArgs>
  ): CheckSelect<T, profileClient<profile>, profileClient<profileGetPayload<T>>>
  /**
   * 
   */
  count(args?: Omit<FindManyprofileArgs, 'select' | 'include'>): Promise<number>
}

export declare class profileClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  private _collectTimestamps?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';


  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * profile findOne
 */
export type FindOneprofileArgs = {
  /**
   * Select specific fields to fetch from the profile
  **/
  select?: profileSelect | null
  /**
   * Filter, which profile to fetch.
  **/
  where: profileWhereUniqueInput
}


/**
 * profile findMany
 */
export type FindManyprofileArgs = {
  /**
   * Select specific fields to fetch from the profile
  **/
  select?: profileSelect | null
  /**
   * Filter, which profiles to fetch.
  **/
  where?: profileWhereInput
  /**
   * Determine the order of the profiles to fetch.
  **/
  orderBy?: profileOrderByInput
  cursor?: profileWhereUniqueInput
  take?: number
  /**
   * Skip the first `n` profiles.
  **/
  skip?: number
}


/**
 * profile create
 */
export type profileCreateArgs = {
  /**
   * Select specific fields to fetch from the profile
  **/
  select?: profileSelect | null
  /**
   * The data needed to create a profile.
  **/
  data: profileCreateInput
}


/**
 * profile update
 */
export type profileUpdateArgs = {
  /**
   * Select specific fields to fetch from the profile
  **/
  select?: profileSelect | null
  /**
   * The data needed to update a profile.
  **/
  data: profileUpdateInput
  /**
   * Choose, which profile to update.
  **/
  where: profileWhereUniqueInput
}


/**
 * profile updateMany
 */
export type profileUpdateManyArgs = {
  data: profileUpdateManyMutationInput
  where?: profileWhereInput
}


/**
 * profile upsert
 */
export type profileUpsertArgs = {
  /**
   * Select specific fields to fetch from the profile
  **/
  select?: profileSelect | null
  /**
   * The filter to search for the profile to update in case it exists.
  **/
  where: profileWhereUniqueInput
  /**
   * In case the profile found by the `where` argument doesn't exist, create a new profile with this data.
  **/
  create: profileCreateInput
  /**
   * In case the profile was found with the provided `where` argument, update it with this data.
  **/
  update: profileUpdateInput
}


/**
 * profile delete
 */
export type profileDeleteArgs = {
  /**
   * Select specific fields to fetch from the profile
  **/
  select?: profileSelect | null
  /**
   * Filter which profile to delete.
  **/
  where: profileWhereUniqueInput
}


/**
 * profile deleteMany
 */
export type profileDeleteManyArgs = {
  where?: profileWhereInput
}


/**
 * profile without action
 */
export type profileArgs = {
  /**
   * Select specific fields to fetch from the profile
  **/
  select?: profileSelect | null
}



/**
 * Model todo
 */

export type todo = {
  content: string | null
  email: string | null
  id: string
  task: string | null
}

export type todoSelect = {
  content?: boolean
  email?: boolean
  id?: boolean
  task?: boolean
  users?: boolean | usersArgs
}

export type todoInclude = {
  users?: boolean | usersArgs
}

export type todoGetPayload<
  S extends boolean | null | undefined | todoArgs,
  U = keyof S
> = S extends true
  ? todo
  : S extends undefined
  ? never
  : S extends todoArgs | FindManytodoArgs
  ? 'include' extends U
    ? todo  & {
      [P in TrueKeys<S['include']>]:
      P extends 'users'
      ? usersGetPayload<S['include'][P]> | null : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof todo ? todo[P]
: 
      P extends 'users'
      ? usersGetPayload<S['select'][P]> | null : never
    }
  : todo
: todo


export interface todoDelegate {
  /**
   * Find zero or one Todo.
   * @param {FindOnetodoArgs} args - Arguments to find a Todo
   * @example
   * // Get one Todo
   * const todo = await prisma.todo.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOnetodoArgs>(
    args: Subset<T, FindOnetodoArgs>
  ): CheckSelect<T, todoClient<todo | null>, todoClient<todoGetPayload<T> | null>>
  /**
   * Find zero or more Todos.
   * @param {FindManytodoArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Todos
   * const todos = await prisma.todo.findMany()
   * 
   * // Get first 10 Todos
   * const todos = await prisma.todo.findMany({ first: 10 })
   * 
   * // Only select the `content`
   * const todoWithContentOnly = await prisma.todo.findMany({ select: { content: true } })
   * 
  **/
  findMany<T extends FindManytodoArgs>(
    args?: Subset<T, FindManytodoArgs>
  ): CheckSelect<T, Promise<Array<todo>>, Promise<Array<todoGetPayload<T>>>>
  /**
   * Create a Todo.
   * @param {todoCreateArgs} args - Arguments to create a Todo.
   * @example
   * // Create one Todo
   * const user = await prisma.todo.create({
   *   data: {
   *     // ... data to create a Todo
   *   }
   * })
   * 
  **/
  create<T extends todoCreateArgs>(
    args: Subset<T, todoCreateArgs>
  ): CheckSelect<T, todoClient<todo>, todoClient<todoGetPayload<T>>>
  /**
   * Delete a Todo.
   * @param {todoDeleteArgs} args - Arguments to delete one Todo.
   * @example
   * // Delete one Todo
   * const user = await prisma.todo.delete({
   *   where: {
   *     // ... filter to delete one Todo
   *   }
   * })
   * 
  **/
  delete<T extends todoDeleteArgs>(
    args: Subset<T, todoDeleteArgs>
  ): CheckSelect<T, todoClient<todo>, todoClient<todoGetPayload<T>>>
  /**
   * Update one Todo.
   * @param {todoUpdateArgs} args - Arguments to update one Todo.
   * @example
   * // Update one Todo
   * const todo = await prisma.todo.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends todoUpdateArgs>(
    args: Subset<T, todoUpdateArgs>
  ): CheckSelect<T, todoClient<todo>, todoClient<todoGetPayload<T>>>
  /**
   * Delete zero or more Todos.
   * @param {todoDeleteManyArgs} args - Arguments to filter Todos to delete.
   * @example
   * // Delete a few Todos
   * const { count } = await prisma.todo.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends todoDeleteManyArgs>(
    args: Subset<T, todoDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Todos.
   * @param {todoUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Todos
   * const todo = await prisma.todo.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends todoUpdateManyArgs>(
    args: Subset<T, todoUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Todo.
   * @param {todoUpsertArgs} args - Arguments to update or create a Todo.
   * @example
   * // Update or create a Todo
   * const todo = await prisma.todo.upsert({
   *   create: {
   *     // ... data to create a Todo
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Todo we want to update
   *   }
   * })
  **/
  upsert<T extends todoUpsertArgs>(
    args: Subset<T, todoUpsertArgs>
  ): CheckSelect<T, todoClient<todo>, todoClient<todoGetPayload<T>>>
  /**
   * 
   */
  count(args?: Omit<FindManytodoArgs, 'select' | 'include'>): Promise<number>
}

export declare class todoClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  private _collectTimestamps?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  users<T extends usersArgs = {}>(args?: Subset<T, usersArgs>): CheckSelect<T, usersClient<users | null>, usersClient<usersGetPayload<T> | null>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * todo findOne
 */
export type FindOnetodoArgs = {
  /**
   * Select specific fields to fetch from the todo
  **/
  select?: todoSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: todoInclude | null
  /**
   * Filter, which todo to fetch.
  **/
  where: todoWhereUniqueInput
}


/**
 * todo findMany
 */
export type FindManytodoArgs = {
  /**
   * Select specific fields to fetch from the todo
  **/
  select?: todoSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: todoInclude | null
  /**
   * Filter, which todos to fetch.
  **/
  where?: todoWhereInput
  /**
   * Determine the order of the todos to fetch.
  **/
  orderBy?: todoOrderByInput
  cursor?: todoWhereUniqueInput
  take?: number
  /**
   * Skip the first `n` todos.
  **/
  skip?: number
}


/**
 * todo create
 */
export type todoCreateArgs = {
  /**
   * Select specific fields to fetch from the todo
  **/
  select?: todoSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: todoInclude | null
  /**
   * The data needed to create a todo.
  **/
  data: todoCreateInput
}


/**
 * todo update
 */
export type todoUpdateArgs = {
  /**
   * Select specific fields to fetch from the todo
  **/
  select?: todoSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: todoInclude | null
  /**
   * The data needed to update a todo.
  **/
  data: todoUpdateInput
  /**
   * Choose, which todo to update.
  **/
  where: todoWhereUniqueInput
}


/**
 * todo updateMany
 */
export type todoUpdateManyArgs = {
  data: todoUpdateManyMutationInput
  where?: todoWhereInput
}


/**
 * todo upsert
 */
export type todoUpsertArgs = {
  /**
   * Select specific fields to fetch from the todo
  **/
  select?: todoSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: todoInclude | null
  /**
   * The filter to search for the todo to update in case it exists.
  **/
  where: todoWhereUniqueInput
  /**
   * In case the todo found by the `where` argument doesn't exist, create a new todo with this data.
  **/
  create: todoCreateInput
  /**
   * In case the todo was found with the provided `where` argument, update it with this data.
  **/
  update: todoUpdateInput
}


/**
 * todo delete
 */
export type todoDeleteArgs = {
  /**
   * Select specific fields to fetch from the todo
  **/
  select?: todoSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: todoInclude | null
  /**
   * Filter which todo to delete.
  **/
  where: todoWhereUniqueInput
}


/**
 * todo deleteMany
 */
export type todoDeleteManyArgs = {
  where?: todoWhereInput
}


/**
 * todo without action
 */
export type todoArgs = {
  /**
   * Select specific fields to fetch from the todo
  **/
  select?: todoSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: todoInclude | null
}



/**
 * Model users
 */

export type users = {
  avatar: string | null
  email: string
  name: string | null
  password: string | null
  password2: string | null
}

export type usersSelect = {
  avatar?: boolean
  email?: boolean
  name?: boolean
  password?: boolean
  password2?: boolean
  followedBy?: boolean | FindManyusersArgs
  following?: boolean | FindManyusersArgs
  comment?: boolean | FindManycommentArgs
  posts?: boolean | FindManypostsArgs
  todo?: boolean | FindManytodoArgs
  Likes?: boolean | FindManylikesArgs
}

export type usersInclude = {
  followedBy?: boolean | FindManyusersArgs
  following?: boolean | FindManyusersArgs
  comment?: boolean | FindManycommentArgs
  posts?: boolean | FindManypostsArgs
  todo?: boolean | FindManytodoArgs
  Likes?: boolean | FindManylikesArgs
}

export type usersGetPayload<
  S extends boolean | null | undefined | usersArgs,
  U = keyof S
> = S extends true
  ? users
  : S extends undefined
  ? never
  : S extends usersArgs | FindManyusersArgs
  ? 'include' extends U
    ? users  & {
      [P in TrueKeys<S['include']>]:
      P extends 'followedBy'
      ? Array<usersGetPayload<S['include'][P]>> :
      P extends 'following'
      ? Array<usersGetPayload<S['include'][P]>> :
      P extends 'comment'
      ? Array<commentGetPayload<S['include'][P]>> :
      P extends 'posts'
      ? Array<postsGetPayload<S['include'][P]>> :
      P extends 'todo'
      ? Array<todoGetPayload<S['include'][P]>> :
      P extends 'Likes'
      ? Array<likesGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof users ? users[P]
: 
      P extends 'followedBy'
      ? Array<usersGetPayload<S['select'][P]>> :
      P extends 'following'
      ? Array<usersGetPayload<S['select'][P]>> :
      P extends 'comment'
      ? Array<commentGetPayload<S['select'][P]>> :
      P extends 'posts'
      ? Array<postsGetPayload<S['select'][P]>> :
      P extends 'todo'
      ? Array<todoGetPayload<S['select'][P]>> :
      P extends 'Likes'
      ? Array<likesGetPayload<S['select'][P]>> : never
    }
  : users
: users


export interface usersDelegate {
  /**
   * Find zero or one Users.
   * @param {FindOneusersArgs} args - Arguments to find a Users
   * @example
   * // Get one Users
   * const users = await prisma.users.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneusersArgs>(
    args: Subset<T, FindOneusersArgs>
  ): CheckSelect<T, usersClient<users | null>, usersClient<usersGetPayload<T> | null>>
  /**
   * Find zero or more Users.
   * @param {FindManyusersArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Users
   * const users = await prisma.users.findMany()
   * 
   * // Get first 10 Users
   * const users = await prisma.users.findMany({ first: 10 })
   * 
   * // Only select the `avatar`
   * const usersWithAvatarOnly = await prisma.users.findMany({ select: { avatar: true } })
   * 
  **/
  findMany<T extends FindManyusersArgs>(
    args?: Subset<T, FindManyusersArgs>
  ): CheckSelect<T, Promise<Array<users>>, Promise<Array<usersGetPayload<T>>>>
  /**
   * Create a Users.
   * @param {usersCreateArgs} args - Arguments to create a Users.
   * @example
   * // Create one Users
   * const user = await prisma.users.create({
   *   data: {
   *     // ... data to create a Users
   *   }
   * })
   * 
  **/
  create<T extends usersCreateArgs>(
    args: Subset<T, usersCreateArgs>
  ): CheckSelect<T, usersClient<users>, usersClient<usersGetPayload<T>>>
  /**
   * Delete a Users.
   * @param {usersDeleteArgs} args - Arguments to delete one Users.
   * @example
   * // Delete one Users
   * const user = await prisma.users.delete({
   *   where: {
   *     // ... filter to delete one Users
   *   }
   * })
   * 
  **/
  delete<T extends usersDeleteArgs>(
    args: Subset<T, usersDeleteArgs>
  ): CheckSelect<T, usersClient<users>, usersClient<usersGetPayload<T>>>
  /**
   * Update one Users.
   * @param {usersUpdateArgs} args - Arguments to update one Users.
   * @example
   * // Update one Users
   * const users = await prisma.users.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends usersUpdateArgs>(
    args: Subset<T, usersUpdateArgs>
  ): CheckSelect<T, usersClient<users>, usersClient<usersGetPayload<T>>>
  /**
   * Delete zero or more Users.
   * @param {usersDeleteManyArgs} args - Arguments to filter Users to delete.
   * @example
   * // Delete a few Users
   * const { count } = await prisma.users.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends usersDeleteManyArgs>(
    args: Subset<T, usersDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Users.
   * @param {usersUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Users
   * const users = await prisma.users.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends usersUpdateManyArgs>(
    args: Subset<T, usersUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Users.
   * @param {usersUpsertArgs} args - Arguments to update or create a Users.
   * @example
   * // Update or create a Users
   * const users = await prisma.users.upsert({
   *   create: {
   *     // ... data to create a Users
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Users we want to update
   *   }
   * })
  **/
  upsert<T extends usersUpsertArgs>(
    args: Subset<T, usersUpsertArgs>
  ): CheckSelect<T, usersClient<users>, usersClient<usersGetPayload<T>>>
  /**
   * 
   */
  count(args?: Omit<FindManyusersArgs, 'select' | 'include'>): Promise<number>
}

export declare class usersClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  private _collectTimestamps?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  followedBy<T extends FindManyusersArgs = {}>(args?: Subset<T, FindManyusersArgs>): CheckSelect<T, Promise<Array<users>>, Promise<Array<usersGetPayload<T>>>>;

  following<T extends FindManyusersArgs = {}>(args?: Subset<T, FindManyusersArgs>): CheckSelect<T, Promise<Array<users>>, Promise<Array<usersGetPayload<T>>>>;

  comment<T extends FindManycommentArgs = {}>(args?: Subset<T, FindManycommentArgs>): CheckSelect<T, Promise<Array<comment>>, Promise<Array<commentGetPayload<T>>>>;

  posts<T extends FindManypostsArgs = {}>(args?: Subset<T, FindManypostsArgs>): CheckSelect<T, Promise<Array<posts>>, Promise<Array<postsGetPayload<T>>>>;

  todo<T extends FindManytodoArgs = {}>(args?: Subset<T, FindManytodoArgs>): CheckSelect<T, Promise<Array<todo>>, Promise<Array<todoGetPayload<T>>>>;

  Likes<T extends FindManylikesArgs = {}>(args?: Subset<T, FindManylikesArgs>): CheckSelect<T, Promise<Array<likes>>, Promise<Array<likesGetPayload<T>>>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * users findOne
 */
export type FindOneusersArgs = {
  /**
   * Select specific fields to fetch from the users
  **/
  select?: usersSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: usersInclude | null
  /**
   * Filter, which users to fetch.
  **/
  where: usersWhereUniqueInput
}


/**
 * users findMany
 */
export type FindManyusersArgs = {
  /**
   * Select specific fields to fetch from the users
  **/
  select?: usersSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: usersInclude | null
  /**
   * Filter, which users to fetch.
  **/
  where?: usersWhereInput
  /**
   * Determine the order of the users to fetch.
  **/
  orderBy?: usersOrderByInput
  cursor?: usersWhereUniqueInput
  take?: number
  /**
   * Skip the first `n` users.
  **/
  skip?: number
}


/**
 * users create
 */
export type usersCreateArgs = {
  /**
   * Select specific fields to fetch from the users
  **/
  select?: usersSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: usersInclude | null
  /**
   * The data needed to create a users.
  **/
  data: usersCreateInput
}


/**
 * users update
 */
export type usersUpdateArgs = {
  /**
   * Select specific fields to fetch from the users
  **/
  select?: usersSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: usersInclude | null
  /**
   * The data needed to update a users.
  **/
  data: usersUpdateInput
  /**
   * Choose, which users to update.
  **/
  where: usersWhereUniqueInput
}


/**
 * users updateMany
 */
export type usersUpdateManyArgs = {
  data: usersUpdateManyMutationInput
  where?: usersWhereInput
}


/**
 * users upsert
 */
export type usersUpsertArgs = {
  /**
   * Select specific fields to fetch from the users
  **/
  select?: usersSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: usersInclude | null
  /**
   * The filter to search for the users to update in case it exists.
  **/
  where: usersWhereUniqueInput
  /**
   * In case the users found by the `where` argument doesn't exist, create a new users with this data.
  **/
  create: usersCreateInput
  /**
   * In case the users was found with the provided `where` argument, update it with this data.
  **/
  update: usersUpdateInput
}


/**
 * users delete
 */
export type usersDeleteArgs = {
  /**
   * Select specific fields to fetch from the users
  **/
  select?: usersSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: usersInclude | null
  /**
   * Filter which users to delete.
  **/
  where: usersWhereUniqueInput
}


/**
 * users deleteMany
 */
export type usersDeleteManyArgs = {
  where?: usersWhereInput
}


/**
 * users without action
 */
export type usersArgs = {
  /**
   * Select specific fields to fetch from the users
  **/
  select?: usersSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: usersInclude | null
}



/**
 * Deep Input Types
 */


export type likesWhereInput = {
  email?: string | NullableStringFilter | null
  id?: string | StringFilter
  postid?: string | StringFilter
  AND?: Enumerable<likesWhereInput>
  OR?: Enumerable<likesWhereInput>
  NOT?: Enumerable<likesWhereInput>
  post?: postsWhereInput | null
  users?: usersWhereInput | null
}

export type postsWhereInput = {
  author?: string | NullableStringFilter | null
  avatar?: string | NullableStringFilter | null
  content?: string | NullableStringFilter | null
  created_at?: Date | string | NullableDateTimeFilter | null
  email?: string | NullableStringFilter | null
  id?: string | StringFilter
  postlike?: number | NullableIntFilter | null
  title?: string | NullableStringFilter | null
  Likes?: likesFilter | null
  AND?: Enumerable<postsWhereInput>
  OR?: Enumerable<postsWhereInput>
  NOT?: Enumerable<postsWhereInput>
  users?: usersWhereInput | null
}

export type todoWhereInput = {
  content?: string | NullableStringFilter | null
  email?: string | NullableStringFilter | null
  id?: string | StringFilter
  task?: string | NullableStringFilter | null
  AND?: Enumerable<todoWhereInput>
  OR?: Enumerable<todoWhereInput>
  NOT?: Enumerable<todoWhereInput>
  users?: usersWhereInput | null
}

export type usersWhereInput = {
  avatar?: string | NullableStringFilter | null
  email?: string | StringFilter
  name?: string | NullableStringFilter | null
  password?: string | NullableStringFilter | null
  password2?: string | NullableStringFilter | null
  followedBy?: usersFilter | null
  following?: usersFilter | null
  comment?: commentFilter | null
  posts?: postsFilter | null
  todo?: todoFilter | null
  Likes?: likesFilter | null
  AND?: Enumerable<usersWhereInput>
  OR?: Enumerable<usersWhereInput>
  NOT?: Enumerable<usersWhereInput>
}

export type commentWhereInput = {
  comment?: string | NullableStringFilter | null
  email?: string | NullableStringFilter | null
  id?: string | StringFilter
  postid?: string | NullableStringFilter | null
  AND?: Enumerable<commentWhereInput>
  OR?: Enumerable<commentWhereInput>
  NOT?: Enumerable<commentWhereInput>
  users?: usersWhereInput | null
}

export type commentWhereUniqueInput = {
  email?: string | null
  id?: string
}

export type usersWhereUniqueInput = {
  email?: string
}

export type postsWhereUniqueInput = {
  email?: string | null
  id?: string
}

export type likesWhereUniqueInput = {
  id?: string
}

export type todoWhereUniqueInput = {
  email?: string | null
  id?: string
}

export type profileWhereInput = {
  about?: string | NullableStringFilter | null
  email?: string | StringFilter
  hobbies?: string | NullableStringFilter | null
  name?: string | NullableStringFilter | null
  occupation?: string | NullableStringFilter | null
  skills?: string | NullableStringFilter | null
  AND?: Enumerable<profileWhereInput>
  OR?: Enumerable<profileWhereInput>
  NOT?: Enumerable<profileWhereInput>
}

export type profileWhereUniqueInput = {
  email?: string
}

export type commentCreateWithoutUsersInput = {
  comment?: string | null
  id?: string
  postid?: string | null
}

export type commentCreateManyWithoutUsersInput = {
  create?: Enumerable<commentCreateWithoutUsersInput>
  connect?: Enumerable<commentWhereUniqueInput>
}

export type todoCreateWithoutUsersInput = {
  content?: string | null
  id?: string
  task?: string | null
}

export type todoCreateManyWithoutUsersInput = {
  create?: Enumerable<todoCreateWithoutUsersInput>
  connect?: Enumerable<todoWhereUniqueInput>
}

export type usersCreateWithoutPostsInput = {
  avatar?: string | null
  email: string
  name?: string | null
  password?: string | null
  password2?: string | null
  followedBy?: usersCreateManyWithoutFollowingInput | null
  following?: usersCreateManyWithoutFollowedByInput | null
  comment?: commentCreateManyWithoutUsersInput | null
  todo?: todoCreateManyWithoutUsersInput | null
  Likes?: likesCreateManyWithoutUsersInput | null
}

export type usersCreateOneWithoutPostsInput = {
  create?: usersCreateWithoutPostsInput
  connect?: usersWhereUniqueInput
}

export type postsCreateWithoutLikesInput = {
  author?: string | null
  avatar?: string | null
  content?: string | null
  created_at?: Date | string | null
  id?: string
  postlike?: number | null
  title?: string | null
  users?: usersCreateOneWithoutPostsInput | null
}

export type postsCreateOneWithoutLikesInput = {
  create?: postsCreateWithoutLikesInput
  connect?: postsWhereUniqueInput
}

export type likesCreateWithoutUsersInput = {
  id?: string
  post: postsCreateOneWithoutLikesInput
}

export type likesCreateManyWithoutUsersInput = {
  create?: Enumerable<likesCreateWithoutUsersInput>
  connect?: Enumerable<likesWhereUniqueInput>
}

export type usersCreateWithoutFollowedByInput = {
  avatar?: string | null
  email: string
  name?: string | null
  password?: string | null
  password2?: string | null
  following?: usersCreateManyWithoutFollowedByInput | null
  comment?: commentCreateManyWithoutUsersInput | null
  posts?: postsCreateManyWithoutUsersInput | null
  todo?: todoCreateManyWithoutUsersInput | null
  Likes?: likesCreateManyWithoutUsersInput | null
}

export type usersCreateManyWithoutFollowedByInput = {
  create?: Enumerable<usersCreateWithoutFollowedByInput>
  connect?: Enumerable<usersWhereUniqueInput>
}

export type usersCreateWithoutLikesInput = {
  avatar?: string | null
  email: string
  name?: string | null
  password?: string | null
  password2?: string | null
  followedBy?: usersCreateManyWithoutFollowingInput | null
  following?: usersCreateManyWithoutFollowedByInput | null
  comment?: commentCreateManyWithoutUsersInput | null
  posts?: postsCreateManyWithoutUsersInput | null
  todo?: todoCreateManyWithoutUsersInput | null
}

export type usersCreateOneWithoutLikesInput = {
  create?: usersCreateWithoutLikesInput
  connect?: usersWhereUniqueInput
}

export type likesCreateWithoutPostInput = {
  id?: string
  users?: usersCreateOneWithoutLikesInput | null
}

export type likesCreateManyWithoutPostInput = {
  create?: Enumerable<likesCreateWithoutPostInput>
  connect?: Enumerable<likesWhereUniqueInput>
}

export type postsCreateWithoutUsersInput = {
  author?: string | null
  avatar?: string | null
  content?: string | null
  created_at?: Date | string | null
  id?: string
  postlike?: number | null
  title?: string | null
  Likes?: likesCreateManyWithoutPostInput | null
}

export type postsCreateManyWithoutUsersInput = {
  create?: Enumerable<postsCreateWithoutUsersInput>
  connect?: Enumerable<postsWhereUniqueInput>
}

export type usersCreateWithoutFollowingInput = {
  avatar?: string | null
  email: string
  name?: string | null
  password?: string | null
  password2?: string | null
  followedBy?: usersCreateManyWithoutFollowingInput | null
  comment?: commentCreateManyWithoutUsersInput | null
  posts?: postsCreateManyWithoutUsersInput | null
  todo?: todoCreateManyWithoutUsersInput | null
  Likes?: likesCreateManyWithoutUsersInput | null
}

export type usersCreateManyWithoutFollowingInput = {
  create?: Enumerable<usersCreateWithoutFollowingInput>
  connect?: Enumerable<usersWhereUniqueInput>
}

export type usersCreateWithoutCommentInput = {
  avatar?: string | null
  email: string
  name?: string | null
  password?: string | null
  password2?: string | null
  followedBy?: usersCreateManyWithoutFollowingInput | null
  following?: usersCreateManyWithoutFollowedByInput | null
  posts?: postsCreateManyWithoutUsersInput | null
  todo?: todoCreateManyWithoutUsersInput | null
  Likes?: likesCreateManyWithoutUsersInput | null
}

export type usersCreateOneWithoutCommentInput = {
  create?: usersCreateWithoutCommentInput
  connect?: usersWhereUniqueInput
}

export type commentCreateInput = {
  comment?: string | null
  id?: string
  postid?: string | null
  users?: usersCreateOneWithoutCommentInput | null
}

export type commentUpdateWithoutUsersDataInput = {
  comment?: string | null
  id?: string
  postid?: string | null
}

export type commentUpdateWithWhereUniqueWithoutUsersInput = {
  where: commentWhereUniqueInput
  data: commentUpdateWithoutUsersDataInput
}

export type commentScalarWhereInput = {
  comment?: string | NullableStringFilter | null
  email?: string | NullableStringFilter | null
  id?: string | StringFilter
  postid?: string | NullableStringFilter | null
  AND?: Enumerable<commentScalarWhereInput>
  OR?: Enumerable<commentScalarWhereInput>
  NOT?: Enumerable<commentScalarWhereInput>
}

export type commentUpdateManyDataInput = {
  comment?: string | null
  id?: string
  postid?: string | null
}

export type commentUpdateManyWithWhereNestedInput = {
  where: commentScalarWhereInput
  data: commentUpdateManyDataInput
}

export type commentUpsertWithWhereUniqueWithoutUsersInput = {
  where: commentWhereUniqueInput
  update: commentUpdateWithoutUsersDataInput
  create: commentCreateWithoutUsersInput
}

export type commentUpdateManyWithoutUsersInput = {
  create?: Enumerable<commentCreateWithoutUsersInput>
  connect?: Enumerable<commentWhereUniqueInput>
  set?: Enumerable<commentWhereUniqueInput>
  disconnect?: Enumerable<commentWhereUniqueInput>
  delete?: Enumerable<commentWhereUniqueInput>
  update?: Enumerable<commentUpdateWithWhereUniqueWithoutUsersInput>
  updateMany?: Enumerable<commentUpdateManyWithWhereNestedInput>
  deleteMany?: Enumerable<commentScalarWhereInput>
  upsert?: Enumerable<commentUpsertWithWhereUniqueWithoutUsersInput>
}

export type todoUpdateWithoutUsersDataInput = {
  content?: string | null
  id?: string
  task?: string | null
}

export type todoUpdateWithWhereUniqueWithoutUsersInput = {
  where: todoWhereUniqueInput
  data: todoUpdateWithoutUsersDataInput
}

export type todoScalarWhereInput = {
  content?: string | NullableStringFilter | null
  email?: string | NullableStringFilter | null
  id?: string | StringFilter
  task?: string | NullableStringFilter | null
  AND?: Enumerable<todoScalarWhereInput>
  OR?: Enumerable<todoScalarWhereInput>
  NOT?: Enumerable<todoScalarWhereInput>
}

export type todoUpdateManyDataInput = {
  content?: string | null
  id?: string
  task?: string | null
}

export type todoUpdateManyWithWhereNestedInput = {
  where: todoScalarWhereInput
  data: todoUpdateManyDataInput
}

export type todoUpsertWithWhereUniqueWithoutUsersInput = {
  where: todoWhereUniqueInput
  update: todoUpdateWithoutUsersDataInput
  create: todoCreateWithoutUsersInput
}

export type todoUpdateManyWithoutUsersInput = {
  create?: Enumerable<todoCreateWithoutUsersInput>
  connect?: Enumerable<todoWhereUniqueInput>
  set?: Enumerable<todoWhereUniqueInput>
  disconnect?: Enumerable<todoWhereUniqueInput>
  delete?: Enumerable<todoWhereUniqueInput>
  update?: Enumerable<todoUpdateWithWhereUniqueWithoutUsersInput>
  updateMany?: Enumerable<todoUpdateManyWithWhereNestedInput>
  deleteMany?: Enumerable<todoScalarWhereInput>
  upsert?: Enumerable<todoUpsertWithWhereUniqueWithoutUsersInput>
}

export type usersUpdateWithoutPostsDataInput = {
  avatar?: string | null
  email?: string
  name?: string | null
  password?: string | null
  password2?: string | null
  followedBy?: usersUpdateManyWithoutFollowingInput
  following?: usersUpdateManyWithoutFollowedByInput
  comment?: commentUpdateManyWithoutUsersInput
  todo?: todoUpdateManyWithoutUsersInput
  Likes?: likesUpdateManyWithoutUsersInput
}

export type usersUpsertWithoutPostsInput = {
  update: usersUpdateWithoutPostsDataInput
  create: usersCreateWithoutPostsInput
}

export type usersUpdateOneWithoutPostsInput = {
  create?: usersCreateWithoutPostsInput
  connect?: usersWhereUniqueInput
  disconnect?: boolean
  delete?: boolean
  update?: usersUpdateWithoutPostsDataInput
  upsert?: usersUpsertWithoutPostsInput
}

export type postsUpdateWithoutLikesDataInput = {
  author?: string | null
  avatar?: string | null
  content?: string | null
  created_at?: Date | string | null
  id?: string
  postlike?: number | null
  title?: string | null
  users?: usersUpdateOneWithoutPostsInput
}

export type postsUpsertWithoutLikesInput = {
  update: postsUpdateWithoutLikesDataInput
  create: postsCreateWithoutLikesInput
}

export type postsUpdateOneRequiredWithoutLikesInput = {
  create?: postsCreateWithoutLikesInput
  connect?: postsWhereUniqueInput
  update?: postsUpdateWithoutLikesDataInput
  upsert?: postsUpsertWithoutLikesInput
}

export type likesUpdateWithoutUsersDataInput = {
  id?: string
  post?: postsUpdateOneRequiredWithoutLikesInput
}

export type likesUpdateWithWhereUniqueWithoutUsersInput = {
  where: likesWhereUniqueInput
  data: likesUpdateWithoutUsersDataInput
}

export type likesScalarWhereInput = {
  email?: string | NullableStringFilter | null
  id?: string | StringFilter
  postid?: string | StringFilter
  AND?: Enumerable<likesScalarWhereInput>
  OR?: Enumerable<likesScalarWhereInput>
  NOT?: Enumerable<likesScalarWhereInput>
}

export type likesUpdateManyDataInput = {
  id?: string
}

export type likesUpdateManyWithWhereNestedInput = {
  where: likesScalarWhereInput
  data: likesUpdateManyDataInput
}

export type likesUpsertWithWhereUniqueWithoutUsersInput = {
  where: likesWhereUniqueInput
  update: likesUpdateWithoutUsersDataInput
  create: likesCreateWithoutUsersInput
}

export type likesUpdateManyWithoutUsersInput = {
  create?: Enumerable<likesCreateWithoutUsersInput>
  connect?: Enumerable<likesWhereUniqueInput>
  set?: Enumerable<likesWhereUniqueInput>
  disconnect?: Enumerable<likesWhereUniqueInput>
  delete?: Enumerable<likesWhereUniqueInput>
  update?: Enumerable<likesUpdateWithWhereUniqueWithoutUsersInput>
  updateMany?: Enumerable<likesUpdateManyWithWhereNestedInput>
  deleteMany?: Enumerable<likesScalarWhereInput>
  upsert?: Enumerable<likesUpsertWithWhereUniqueWithoutUsersInput>
}

export type usersUpdateWithoutFollowedByDataInput = {
  avatar?: string | null
  email?: string
  name?: string | null
  password?: string | null
  password2?: string | null
  following?: usersUpdateManyWithoutFollowedByInput
  comment?: commentUpdateManyWithoutUsersInput
  posts?: postsUpdateManyWithoutUsersInput
  todo?: todoUpdateManyWithoutUsersInput
  Likes?: likesUpdateManyWithoutUsersInput
}

export type usersUpdateWithWhereUniqueWithoutFollowedByInput = {
  where: usersWhereUniqueInput
  data: usersUpdateWithoutFollowedByDataInput
}

export type usersScalarWhereInput = {
  avatar?: string | NullableStringFilter | null
  email?: string | StringFilter
  name?: string | NullableStringFilter | null
  password?: string | NullableStringFilter | null
  password2?: string | NullableStringFilter | null
  followedBy?: usersFilter | null
  following?: usersFilter | null
  comment?: commentFilter | null
  posts?: postsFilter | null
  todo?: todoFilter | null
  Likes?: likesFilter | null
  AND?: Enumerable<usersScalarWhereInput>
  OR?: Enumerable<usersScalarWhereInput>
  NOT?: Enumerable<usersScalarWhereInput>
}

export type usersUpdateManyDataInput = {
  avatar?: string | null
  email?: string
  name?: string | null
  password?: string | null
  password2?: string | null
}

export type usersUpdateManyWithWhereNestedInput = {
  where: usersScalarWhereInput
  data: usersUpdateManyDataInput
}

export type usersUpsertWithWhereUniqueWithoutFollowedByInput = {
  where: usersWhereUniqueInput
  update: usersUpdateWithoutFollowedByDataInput
  create: usersCreateWithoutFollowedByInput
}

export type usersUpdateManyWithoutFollowedByInput = {
  create?: Enumerable<usersCreateWithoutFollowedByInput>
  connect?: Enumerable<usersWhereUniqueInput>
  set?: Enumerable<usersWhereUniqueInput>
  disconnect?: Enumerable<usersWhereUniqueInput>
  delete?: Enumerable<usersWhereUniqueInput>
  update?: Enumerable<usersUpdateWithWhereUniqueWithoutFollowedByInput>
  updateMany?: Enumerable<usersUpdateManyWithWhereNestedInput>
  deleteMany?: Enumerable<usersScalarWhereInput>
  upsert?: Enumerable<usersUpsertWithWhereUniqueWithoutFollowedByInput>
}

export type usersUpdateWithoutLikesDataInput = {
  avatar?: string | null
  email?: string
  name?: string | null
  password?: string | null
  password2?: string | null
  followedBy?: usersUpdateManyWithoutFollowingInput
  following?: usersUpdateManyWithoutFollowedByInput
  comment?: commentUpdateManyWithoutUsersInput
  posts?: postsUpdateManyWithoutUsersInput
  todo?: todoUpdateManyWithoutUsersInput
}

export type usersUpsertWithoutLikesInput = {
  update: usersUpdateWithoutLikesDataInput
  create: usersCreateWithoutLikesInput
}

export type usersUpdateOneWithoutLikesInput = {
  create?: usersCreateWithoutLikesInput
  connect?: usersWhereUniqueInput
  disconnect?: boolean
  delete?: boolean
  update?: usersUpdateWithoutLikesDataInput
  upsert?: usersUpsertWithoutLikesInput
}

export type likesUpdateWithoutPostDataInput = {
  id?: string
  users?: usersUpdateOneWithoutLikesInput
}

export type likesUpdateWithWhereUniqueWithoutPostInput = {
  where: likesWhereUniqueInput
  data: likesUpdateWithoutPostDataInput
}

export type likesUpsertWithWhereUniqueWithoutPostInput = {
  where: likesWhereUniqueInput
  update: likesUpdateWithoutPostDataInput
  create: likesCreateWithoutPostInput
}

export type likesUpdateManyWithoutPostInput = {
  create?: Enumerable<likesCreateWithoutPostInput>
  connect?: Enumerable<likesWhereUniqueInput>
  set?: Enumerable<likesWhereUniqueInput>
  disconnect?: Enumerable<likesWhereUniqueInput>
  delete?: Enumerable<likesWhereUniqueInput>
  update?: Enumerable<likesUpdateWithWhereUniqueWithoutPostInput>
  updateMany?: Enumerable<likesUpdateManyWithWhereNestedInput>
  deleteMany?: Enumerable<likesScalarWhereInput>
  upsert?: Enumerable<likesUpsertWithWhereUniqueWithoutPostInput>
}

export type postsUpdateWithoutUsersDataInput = {
  author?: string | null
  avatar?: string | null
  content?: string | null
  created_at?: Date | string | null
  id?: string
  postlike?: number | null
  title?: string | null
  Likes?: likesUpdateManyWithoutPostInput
}

export type postsUpdateWithWhereUniqueWithoutUsersInput = {
  where: postsWhereUniqueInput
  data: postsUpdateWithoutUsersDataInput
}

export type postsScalarWhereInput = {
  author?: string | NullableStringFilter | null
  avatar?: string | NullableStringFilter | null
  content?: string | NullableStringFilter | null
  created_at?: Date | string | NullableDateTimeFilter | null
  email?: string | NullableStringFilter | null
  id?: string | StringFilter
  postlike?: number | NullableIntFilter | null
  title?: string | NullableStringFilter | null
  Likes?: likesFilter | null
  AND?: Enumerable<postsScalarWhereInput>
  OR?: Enumerable<postsScalarWhereInput>
  NOT?: Enumerable<postsScalarWhereInput>
}

export type postsUpdateManyDataInput = {
  author?: string | null
  avatar?: string | null
  content?: string | null
  created_at?: Date | string | null
  id?: string
  postlike?: number | null
  title?: string | null
}

export type postsUpdateManyWithWhereNestedInput = {
  where: postsScalarWhereInput
  data: postsUpdateManyDataInput
}

export type postsUpsertWithWhereUniqueWithoutUsersInput = {
  where: postsWhereUniqueInput
  update: postsUpdateWithoutUsersDataInput
  create: postsCreateWithoutUsersInput
}

export type postsUpdateManyWithoutUsersInput = {
  create?: Enumerable<postsCreateWithoutUsersInput>
  connect?: Enumerable<postsWhereUniqueInput>
  set?: Enumerable<postsWhereUniqueInput>
  disconnect?: Enumerable<postsWhereUniqueInput>
  delete?: Enumerable<postsWhereUniqueInput>
  update?: Enumerable<postsUpdateWithWhereUniqueWithoutUsersInput>
  updateMany?: Enumerable<postsUpdateManyWithWhereNestedInput>
  deleteMany?: Enumerable<postsScalarWhereInput>
  upsert?: Enumerable<postsUpsertWithWhereUniqueWithoutUsersInput>
}

export type usersUpdateWithoutFollowingDataInput = {
  avatar?: string | null
  email?: string
  name?: string | null
  password?: string | null
  password2?: string | null
  followedBy?: usersUpdateManyWithoutFollowingInput
  comment?: commentUpdateManyWithoutUsersInput
  posts?: postsUpdateManyWithoutUsersInput
  todo?: todoUpdateManyWithoutUsersInput
  Likes?: likesUpdateManyWithoutUsersInput
}

export type usersUpdateWithWhereUniqueWithoutFollowingInput = {
  where: usersWhereUniqueInput
  data: usersUpdateWithoutFollowingDataInput
}

export type usersUpsertWithWhereUniqueWithoutFollowingInput = {
  where: usersWhereUniqueInput
  update: usersUpdateWithoutFollowingDataInput
  create: usersCreateWithoutFollowingInput
}

export type usersUpdateManyWithoutFollowingInput = {
  create?: Enumerable<usersCreateWithoutFollowingInput>
  connect?: Enumerable<usersWhereUniqueInput>
  set?: Enumerable<usersWhereUniqueInput>
  disconnect?: Enumerable<usersWhereUniqueInput>
  delete?: Enumerable<usersWhereUniqueInput>
  update?: Enumerable<usersUpdateWithWhereUniqueWithoutFollowingInput>
  updateMany?: Enumerable<usersUpdateManyWithWhereNestedInput>
  deleteMany?: Enumerable<usersScalarWhereInput>
  upsert?: Enumerable<usersUpsertWithWhereUniqueWithoutFollowingInput>
}

export type usersUpdateWithoutCommentDataInput = {
  avatar?: string | null
  email?: string
  name?: string | null
  password?: string | null
  password2?: string | null
  followedBy?: usersUpdateManyWithoutFollowingInput
  following?: usersUpdateManyWithoutFollowedByInput
  posts?: postsUpdateManyWithoutUsersInput
  todo?: todoUpdateManyWithoutUsersInput
  Likes?: likesUpdateManyWithoutUsersInput
}

export type usersUpsertWithoutCommentInput = {
  update: usersUpdateWithoutCommentDataInput
  create: usersCreateWithoutCommentInput
}

export type usersUpdateOneWithoutCommentInput = {
  create?: usersCreateWithoutCommentInput
  connect?: usersWhereUniqueInput
  disconnect?: boolean
  delete?: boolean
  update?: usersUpdateWithoutCommentDataInput
  upsert?: usersUpsertWithoutCommentInput
}

export type commentUpdateInput = {
  comment?: string | null
  id?: string
  postid?: string | null
  users?: usersUpdateOneWithoutCommentInput
}

export type commentUpdateManyMutationInput = {
  comment?: string | null
  id?: string
  postid?: string | null
}

export type likesCreateInput = {
  id?: string
  post: postsCreateOneWithoutLikesInput
  users?: usersCreateOneWithoutLikesInput | null
}

export type likesUpdateInput = {
  id?: string
  post?: postsUpdateOneRequiredWithoutLikesInput
  users?: usersUpdateOneWithoutLikesInput
}

export type likesUpdateManyMutationInput = {
  id?: string
}

export type postsCreateInput = {
  author?: string | null
  avatar?: string | null
  content?: string | null
  created_at?: Date | string | null
  id?: string
  postlike?: number | null
  title?: string | null
  users?: usersCreateOneWithoutPostsInput | null
  Likes?: likesCreateManyWithoutPostInput | null
}

export type postsUpdateInput = {
  author?: string | null
  avatar?: string | null
  content?: string | null
  created_at?: Date | string | null
  id?: string
  postlike?: number | null
  title?: string | null
  users?: usersUpdateOneWithoutPostsInput
  Likes?: likesUpdateManyWithoutPostInput
}

export type postsUpdateManyMutationInput = {
  author?: string | null
  avatar?: string | null
  content?: string | null
  created_at?: Date | string | null
  id?: string
  postlike?: number | null
  title?: string | null
}

export type profileCreateInput = {
  about?: string | null
  email: string
  hobbies?: string | null
  name?: string | null
  occupation?: string | null
  skills?: string | null
}

export type profileUpdateInput = {
  about?: string | null
  email?: string
  hobbies?: string | null
  name?: string | null
  occupation?: string | null
  skills?: string | null
}

export type profileUpdateManyMutationInput = {
  about?: string | null
  email?: string
  hobbies?: string | null
  name?: string | null
  occupation?: string | null
  skills?: string | null
}

export type usersCreateWithoutTodoInput = {
  avatar?: string | null
  email: string
  name?: string | null
  password?: string | null
  password2?: string | null
  followedBy?: usersCreateManyWithoutFollowingInput | null
  following?: usersCreateManyWithoutFollowedByInput | null
  comment?: commentCreateManyWithoutUsersInput | null
  posts?: postsCreateManyWithoutUsersInput | null
  Likes?: likesCreateManyWithoutUsersInput | null
}

export type usersCreateOneWithoutTodoInput = {
  create?: usersCreateWithoutTodoInput
  connect?: usersWhereUniqueInput
}

export type todoCreateInput = {
  content?: string | null
  id?: string
  task?: string | null
  users?: usersCreateOneWithoutTodoInput | null
}

export type usersUpdateWithoutTodoDataInput = {
  avatar?: string | null
  email?: string
  name?: string | null
  password?: string | null
  password2?: string | null
  followedBy?: usersUpdateManyWithoutFollowingInput
  following?: usersUpdateManyWithoutFollowedByInput
  comment?: commentUpdateManyWithoutUsersInput
  posts?: postsUpdateManyWithoutUsersInput
  Likes?: likesUpdateManyWithoutUsersInput
}

export type usersUpsertWithoutTodoInput = {
  update: usersUpdateWithoutTodoDataInput
  create: usersCreateWithoutTodoInput
}

export type usersUpdateOneWithoutTodoInput = {
  create?: usersCreateWithoutTodoInput
  connect?: usersWhereUniqueInput
  disconnect?: boolean
  delete?: boolean
  update?: usersUpdateWithoutTodoDataInput
  upsert?: usersUpsertWithoutTodoInput
}

export type todoUpdateInput = {
  content?: string | null
  id?: string
  task?: string | null
  users?: usersUpdateOneWithoutTodoInput
}

export type todoUpdateManyMutationInput = {
  content?: string | null
  id?: string
  task?: string | null
}

export type usersCreateInput = {
  avatar?: string | null
  email: string
  name?: string | null
  password?: string | null
  password2?: string | null
  followedBy?: usersCreateManyWithoutFollowingInput | null
  following?: usersCreateManyWithoutFollowedByInput | null
  comment?: commentCreateManyWithoutUsersInput | null
  posts?: postsCreateManyWithoutUsersInput | null
  todo?: todoCreateManyWithoutUsersInput | null
  Likes?: likesCreateManyWithoutUsersInput | null
}

export type usersUpdateInput = {
  avatar?: string | null
  email?: string
  name?: string | null
  password?: string | null
  password2?: string | null
  followedBy?: usersUpdateManyWithoutFollowingInput
  following?: usersUpdateManyWithoutFollowedByInput
  comment?: commentUpdateManyWithoutUsersInput
  posts?: postsUpdateManyWithoutUsersInput
  todo?: todoUpdateManyWithoutUsersInput
  Likes?: likesUpdateManyWithoutUsersInput
}

export type usersUpdateManyMutationInput = {
  avatar?: string | null
  email?: string
  name?: string | null
  password?: string | null
  password2?: string | null
}

export type NullableStringFilter = {
  equals?: string | null
  not?: string | null | NullableStringFilter
  in?: Enumerable<string> | null
  notIn?: Enumerable<string> | null
  lt?: string | null
  lte?: string | null
  gt?: string | null
  gte?: string | null
  contains?: string | null
  startsWith?: string | null
  endsWith?: string | null
}

export type StringFilter = {
  equals?: string
  not?: string | StringFilter
  in?: Enumerable<string>
  notIn?: Enumerable<string>
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
}

export type NullableDateTimeFilter = {
  equals?: Date | string | null
  not?: Date | string | null | NullableDateTimeFilter
  in?: Enumerable<Date | string> | null
  notIn?: Enumerable<Date | string> | null
  lt?: Date | string | null
  lte?: Date | string | null
  gt?: Date | string | null
  gte?: Date | string | null
}

export type NullableIntFilter = {
  equals?: number | null
  not?: number | null | NullableIntFilter
  in?: Enumerable<number> | null
  notIn?: Enumerable<number> | null
  lt?: number | null
  lte?: number | null
  gt?: number | null
  gte?: number | null
}

export type likesFilter = {
  every?: likesWhereInput
  some?: likesWhereInput
  none?: likesWhereInput
}

export type usersFilter = {
  every?: usersWhereInput
  some?: usersWhereInput
  none?: usersWhereInput
}

export type commentFilter = {
  every?: commentWhereInput
  some?: commentWhereInput
  none?: commentWhereInput
}

export type postsFilter = {
  every?: postsWhereInput
  some?: postsWhereInput
  none?: postsWhereInput
}

export type todoFilter = {
  every?: todoWhereInput
  some?: todoWhereInput
  none?: todoWhereInput
}

export type commentOrderByInput = {
  comment?: OrderByArg | null
  email?: OrderByArg | null
  id?: OrderByArg | null
  postid?: OrderByArg | null
}

export type usersOrderByInput = {
  avatar?: OrderByArg | null
  email?: OrderByArg | null
  name?: OrderByArg | null
  password?: OrderByArg | null
  password2?: OrderByArg | null
}

export type postsOrderByInput = {
  author?: OrderByArg | null
  avatar?: OrderByArg | null
  content?: OrderByArg | null
  created_at?: OrderByArg | null
  email?: OrderByArg | null
  id?: OrderByArg | null
  postlike?: OrderByArg | null
  title?: OrderByArg | null
}

export type likesOrderByInput = {
  email?: OrderByArg | null
  id?: OrderByArg | null
  postid?: OrderByArg | null
}

export type todoOrderByInput = {
  content?: OrderByArg | null
  email?: OrderByArg | null
  id?: OrderByArg | null
  task?: OrderByArg | null
}

export type profileOrderByInput = {
  about?: OrderByArg | null
  email?: OrderByArg | null
  hobbies?: OrderByArg | null
  name?: OrderByArg | null
  occupation?: OrderByArg | null
  skills?: OrderByArg | null
}

/**
 * Batch Payload for updateMany & deleteMany
 */

export type BatchPayload = {
  count: number
}

/**
 * DMMF
 */
export declare const dmmf: DMMF.Document;
export {};
