import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CreateJustForQueryInput = {
  /** Example field (placeholder) */
  exampleField: Scalars['Int'];
};

export type JustForQuery = {
  __typename?: 'JustForQuery';
  /** Example field (placeholder) */
  exampleField: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createJustForQuery: JustForQuery;
  removeJustForQuery: JustForQuery;
  updateJustForQuery: JustForQuery;
};


export type MutationCreateJustForQueryArgs = {
  createJustForQueryInput: CreateJustForQueryInput;
};


export type MutationRemoveJustForQueryArgs = {
  id: Scalars['Int'];
};


export type MutationUpdateJustForQueryArgs = {
  updateJustForQueryInput: UpdateJustForQueryInput;
};

export type Query = {
  __typename?: 'Query';
  justForQuery: JustForQuery;
};


export type QueryJustForQueryArgs = {
  id: Scalars['Int'];
};

export type UpdateJustForQueryInput = {
  /** Example field (placeholder) */
  exampleField?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
};

export type GetTestMessageQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTestMessageQuery = (
  { __typename?: 'Query' }
  & { justForQuery: (
    { __typename?: 'JustForQuery' }
    & Pick<JustForQuery, 'exampleField'>
  ) }
);


export const GetTestMessageDocument = gql`
    query GetTestMessage {
  justForQuery(id: 5) {
    exampleField
  }
}
    `;

/**
 * __useGetTestMessageQuery__
 *
 * To run a query within a React component, call `useGetTestMessageQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTestMessageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTestMessageQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTestMessageQuery(baseOptions?: Apollo.QueryHookOptions<GetTestMessageQuery, GetTestMessageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTestMessageQuery, GetTestMessageQueryVariables>(GetTestMessageDocument, options);
      }
export function useGetTestMessageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTestMessageQuery, GetTestMessageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTestMessageQuery, GetTestMessageQueryVariables>(GetTestMessageDocument, options);
        }
export type GetTestMessageQueryHookResult = ReturnType<typeof useGetTestMessageQuery>;
export type GetTestMessageLazyQueryHookResult = ReturnType<typeof useGetTestMessageLazyQuery>;
export type GetTestMessageQueryResult = Apollo.QueryResult<GetTestMessageQuery, GetTestMessageQueryVariables>;