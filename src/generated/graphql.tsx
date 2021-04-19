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

export type Authentication = {
  __typename?: 'Authentication';
  accessToken: Scalars['String'];
};

export type GroupedByRoleUniversitiesObject = {
  __typename?: 'GroupedByRoleUniversitiesObject';
  role: Scalars['String'];
  universities: Array<UniversityObject>;
};

export type LoginUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  login: Authentication;
  logout?: Maybe<Authentication>;
  refreshTokens: Authentication;
  register: Authentication;
};


export type MutationLoginArgs = {
  user: LoginUserInput;
};


export type MutationRegisterArgs = {
  user: RegisterUserInput;
};

export type Query = {
  __typename?: 'Query';
  me: UserObject;
};

export type RegisterUserInput = {
  email: Scalars['String'];
  fatherInitial: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
};

export type Role = {
  __typename?: 'Role';
  id: Scalars['ID'];
  name: Scalars['String'];
  scopes?: Maybe<Array<Scope>>;
  universityUsers?: Maybe<Array<UniversityUser>>;
};

export type Scope = {
  __typename?: 'Scope';
  id: Scalars['ID'];
  name: Scalars['String'];
  roles?: Maybe<Array<Role>>;
};

export type University = {
  __typename?: 'University';
  id: Scalars['ID'];
  logo?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  universityUsers?: Maybe<Array<UniversityUser>>;
};

export type UniversityObject = {
  __typename?: 'UniversityObject';
  id: Scalars['ID'];
  logo?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

export type UniversityUser = {
  __typename?: 'UniversityUser';
  role: Role;
  roleId: Scalars['String'];
  university: University;
  universityId: Scalars['String'];
  user: User;
  userId: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  /** First letter of the father's first name */
  fatherInitial: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  universityUsers?: Maybe<Array<UniversityUser>>;
};

export type UserObject = {
  __typename?: 'UserObject';
  avatar?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  /** First letter of the father's first name */
  fatherInitial: Scalars['String'];
  firstName: Scalars['String'];
  groupedByRoleUniversities: Array<GroupedByRoleUniversitiesObject>;
  id: Scalars['ID'];
  lastName: Scalars['String'];
};

export type AuthenticationFieldsFragment = (
  { __typename?: 'Authentication' }
  & Pick<Authentication, 'accessToken'>
);

export type LoginMutationVariables = Exact<{
  user: LoginUserInput;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'Authentication' }
    & AuthenticationFieldsFragment
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & { logout?: Maybe<(
    { __typename?: 'Authentication' }
    & AuthenticationFieldsFragment
  )> }
);

export type RefreshTokensMutationVariables = Exact<{ [key: string]: never; }>;


export type RefreshTokensMutation = (
  { __typename?: 'Mutation' }
  & { refreshTokens: (
    { __typename?: 'Authentication' }
    & AuthenticationFieldsFragment
  ) }
);

export type RegisterMutationVariables = Exact<{
  user: RegisterUserInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'Authentication' }
    & AuthenticationFieldsFragment
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'UserObject' }
    & Pick<UserObject, 'id' | 'email' | 'fatherInitial' | 'firstName' | 'lastName' | 'avatar'>
    & { groupedByRoleUniversities: Array<(
      { __typename?: 'GroupedByRoleUniversitiesObject' }
      & Pick<GroupedByRoleUniversitiesObject, 'role'>
      & { universities: Array<(
        { __typename?: 'UniversityObject' }
        & Pick<UniversityObject, 'id' | 'logo' | 'name'>
      )> }
    )> }
  ) }
);

export const AuthenticationFieldsFragmentDoc = gql`
    fragment AuthenticationFields on Authentication {
  accessToken
}
    `;
export const LoginDocument = gql`
    mutation Login($user: LoginUserInput!) {
  login(user: $user) {
    ...AuthenticationFields
  }
}
    ${AuthenticationFieldsFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      user: // value for 'user'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout {
    ...AuthenticationFields
  }
}
    ${AuthenticationFieldsFragmentDoc}`;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RefreshTokensDocument = gql`
    mutation RefreshTokens {
  refreshTokens {
    ...AuthenticationFields
  }
}
    ${AuthenticationFieldsFragmentDoc}`;
export type RefreshTokensMutationFn = Apollo.MutationFunction<RefreshTokensMutation, RefreshTokensMutationVariables>;

/**
 * __useRefreshTokensMutation__
 *
 * To run a mutation, you first call `useRefreshTokensMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshTokensMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshTokensMutation, { data, loading, error }] = useRefreshTokensMutation({
 *   variables: {
 *   },
 * });
 */
export function useRefreshTokensMutation(baseOptions?: Apollo.MutationHookOptions<RefreshTokensMutation, RefreshTokensMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RefreshTokensMutation, RefreshTokensMutationVariables>(RefreshTokensDocument, options);
      }
export type RefreshTokensMutationHookResult = ReturnType<typeof useRefreshTokensMutation>;
export type RefreshTokensMutationResult = Apollo.MutationResult<RefreshTokensMutation>;
export type RefreshTokensMutationOptions = Apollo.BaseMutationOptions<RefreshTokensMutation, RefreshTokensMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($user: RegisterUserInput!) {
  register(user: $user) {
    ...AuthenticationFields
  }
}
    ${AuthenticationFieldsFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      user: // value for 'user'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    email
    fatherInitial
    firstName
    lastName
    avatar
    groupedByRoleUniversities {
      role
      universities {
        id
        logo
        name
      }
    }
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;