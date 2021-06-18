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
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Authentication = {
  __typename?: 'Authentication';
  accessToken: Scalars['String'];
};

export type College = {
  __typename?: 'College';
  courses?: Maybe<Array<Course>>;
  id: Scalars['ID'];
  name: Scalars['String'];
  university: University;
  universityId: Scalars['String'];
};

export type CollegeObject = {
  __typename?: 'CollegeObject';
  courses: Array<CourseObject>;
  id: Scalars['ID'];
  name: Scalars['String'];
  universityId: Scalars['String'];
};

export type Course = {
  __typename?: 'Course';
  college: College;
  collegeId: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  university: University;
  universityId: Scalars['String'];
};

export type CourseObject = {
  __typename?: 'CourseObject';
  collegeId: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  universityId: Scalars['String'];
};

export type CreateCollegeInput = {
  name: Scalars['String'];
};

export type CreateCourseInput = {
  collegeId: Scalars['String'];
  name: Scalars['String'];
};

export type CreateUniversityInput = {
  name: Scalars['String'];
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
  createCollege: CollegeObject;
  createCourse: CourseObject;
  createUniversity: UniversityObject;
  deleteCollege: CollegeObject;
  deleteCourse: CourseObject;
  deleteUniversity: UniversityObject;
  leaveUniversity: UniversityObject;
  login: Authentication;
  logout?: Maybe<Authentication>;
  refreshTokens: Authentication;
  register: Authentication;
  updateCollege: CollegeObject;
  updateCourse: CourseObject;
  updateUniversity: UniversityObject;
};


export type MutationCreateCollegeArgs = {
  data: CreateCollegeInput;
};


export type MutationCreateCourseArgs = {
  data: CreateCourseInput;
};


export type MutationCreateUniversityArgs = {
  data: CreateUniversityInput;
  logo?: Maybe<Scalars['Upload']>;
};


export type MutationDeleteCollegeArgs = {
  id: Scalars['String'];
};


export type MutationDeleteCourseArgs = {
  id: Scalars['String'];
};


export type MutationDeleteUniversityArgs = {
  id: Scalars['String'];
};


export type MutationLeaveUniversityArgs = {
  id: Scalars['String'];
};


export type MutationLoginArgs = {
  user: LoginUserInput;
};


export type MutationRegisterArgs = {
  avatar?: Maybe<Scalars['Upload']>;
  user: RegisterUserInput;
};


export type MutationUpdateCollegeArgs = {
  data: CreateCollegeInput;
  id: Scalars['String'];
};


export type MutationUpdateCourseArgs = {
  data: CreateCourseInput;
  id: Scalars['String'];
};


export type MutationUpdateUniversityArgs = {
  data: CreateUniversityInput;
  id: Scalars['String'];
  logo?: Maybe<Scalars['Upload']>;
};

export type Query = {
  __typename?: 'Query';
  colleges: Array<CollegeObject>;
  me: UserObject;
};


export type QueryCollegesArgs = {
  universityId: Scalars['String'];
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
  colleges?: Maybe<Array<College>>;
  courses?: Maybe<Array<Course>>;
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
  avatar?: Maybe<Scalars['Upload']>;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'Authentication' }
    & AuthenticationFieldsFragment
  ) }
);

export type CollegeFieldsFragment = (
  { __typename?: 'CollegeObject' }
  & Pick<CollegeObject, 'id' | 'name' | 'universityId'>
  & { courses: Array<(
    { __typename?: 'CourseObject' }
    & CourseFieldsFragment
  )> }
);

export type CreateCollegeMutationVariables = Exact<{
  data: CreateCollegeInput;
}>;


export type CreateCollegeMutation = (
  { __typename?: 'Mutation' }
  & { createCollege: (
    { __typename?: 'CollegeObject' }
    & CollegeFieldsFragment
  ) }
);

export type DeleteCollegeMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteCollegeMutation = (
  { __typename?: 'Mutation' }
  & { deleteCollege: (
    { __typename?: 'CollegeObject' }
    & CollegeFieldsFragment
  ) }
);

export type UpdateCollegeMutationVariables = Exact<{
  id: Scalars['String'];
  data: CreateCollegeInput;
}>;


export type UpdateCollegeMutation = (
  { __typename?: 'Mutation' }
  & { updateCollege: (
    { __typename?: 'CollegeObject' }
    & CollegeFieldsFragment
  ) }
);

export type CollegesQueryVariables = Exact<{
  universityId: Scalars['String'];
}>;


export type CollegesQuery = (
  { __typename?: 'Query' }
  & { colleges: Array<(
    { __typename?: 'CollegeObject' }
    & CollegeFieldsFragment
  )> }
);

export type CourseFieldsFragment = (
  { __typename?: 'CourseObject' }
  & Pick<CourseObject, 'id' | 'name' | 'collegeId' | 'universityId'>
);

export type CreateCourseMutationVariables = Exact<{
  data: CreateCourseInput;
}>;


export type CreateCourseMutation = (
  { __typename?: 'Mutation' }
  & { createCourse: (
    { __typename?: 'CourseObject' }
    & CourseFieldsFragment
  ) }
);

export type DeleteCourseMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteCourseMutation = (
  { __typename?: 'Mutation' }
  & { deleteCourse: (
    { __typename?: 'CourseObject' }
    & CourseFieldsFragment
  ) }
);

export type UpdateCourseMutationVariables = Exact<{
  id: Scalars['String'];
  data: CreateCourseInput;
}>;


export type UpdateCourseMutation = (
  { __typename?: 'Mutation' }
  & { updateCourse: (
    { __typename?: 'CourseObject' }
    & CourseFieldsFragment
  ) }
);

export type UniversityFieldsFragment = (
  { __typename?: 'UniversityObject' }
  & Pick<UniversityObject, 'id' | 'name' | 'logo'>
);

export type CreateUniversityMutationVariables = Exact<{
  data: CreateUniversityInput;
  logo?: Maybe<Scalars['Upload']>;
}>;


export type CreateUniversityMutation = (
  { __typename?: 'Mutation' }
  & { createUniversity: (
    { __typename?: 'UniversityObject' }
    & UniversityFieldsFragment
  ) }
);

export type UpdateUniversityMutationVariables = Exact<{
  id: Scalars['String'];
  data: CreateUniversityInput;
  logo?: Maybe<Scalars['Upload']>;
}>;


export type UpdateUniversityMutation = (
  { __typename?: 'Mutation' }
  & { updateUniversity: (
    { __typename?: 'UniversityObject' }
    & UniversityFieldsFragment
  ) }
);

export type DeleteUniversityMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteUniversityMutation = (
  { __typename?: 'Mutation' }
  & { deleteUniversity: (
    { __typename?: 'UniversityObject' }
    & UniversityFieldsFragment
  ) }
);

export type LeaveUniversityMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type LeaveUniversityMutation = (
  { __typename?: 'Mutation' }
  & { leaveUniversity: (
    { __typename?: 'UniversityObject' }
    & UniversityFieldsFragment
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
        & UniversityFieldsFragment
      )> }
    )> }
  ) }
);

export const AuthenticationFieldsFragmentDoc = gql`
    fragment AuthenticationFields on Authentication {
  accessToken
}
    `;
export const CourseFieldsFragmentDoc = gql`
    fragment CourseFields on CourseObject {
  id
  name
  collegeId
  universityId
}
    `;
export const CollegeFieldsFragmentDoc = gql`
    fragment CollegeFields on CollegeObject {
  id
  name
  universityId
  courses {
    ...CourseFields
  }
}
    ${CourseFieldsFragmentDoc}`;
export const UniversityFieldsFragmentDoc = gql`
    fragment UniversityFields on UniversityObject {
  id
  name
  logo
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
    mutation Register($user: RegisterUserInput!, $avatar: Upload) {
  register(user: $user, avatar: $avatar) {
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
 *      avatar: // value for 'avatar'
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
export const CreateCollegeDocument = gql`
    mutation CreateCollege($data: CreateCollegeInput!) {
  createCollege(data: $data) {
    ...CollegeFields
  }
}
    ${CollegeFieldsFragmentDoc}`;
export type CreateCollegeMutationFn = Apollo.MutationFunction<CreateCollegeMutation, CreateCollegeMutationVariables>;

/**
 * __useCreateCollegeMutation__
 *
 * To run a mutation, you first call `useCreateCollegeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCollegeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCollegeMutation, { data, loading, error }] = useCreateCollegeMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateCollegeMutation(baseOptions?: Apollo.MutationHookOptions<CreateCollegeMutation, CreateCollegeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCollegeMutation, CreateCollegeMutationVariables>(CreateCollegeDocument, options);
      }
export type CreateCollegeMutationHookResult = ReturnType<typeof useCreateCollegeMutation>;
export type CreateCollegeMutationResult = Apollo.MutationResult<CreateCollegeMutation>;
export type CreateCollegeMutationOptions = Apollo.BaseMutationOptions<CreateCollegeMutation, CreateCollegeMutationVariables>;
export const DeleteCollegeDocument = gql`
    mutation DeleteCollege($id: String!) {
  deleteCollege(id: $id) {
    ...CollegeFields
  }
}
    ${CollegeFieldsFragmentDoc}`;
export type DeleteCollegeMutationFn = Apollo.MutationFunction<DeleteCollegeMutation, DeleteCollegeMutationVariables>;

/**
 * __useDeleteCollegeMutation__
 *
 * To run a mutation, you first call `useDeleteCollegeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCollegeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCollegeMutation, { data, loading, error }] = useDeleteCollegeMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCollegeMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCollegeMutation, DeleteCollegeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCollegeMutation, DeleteCollegeMutationVariables>(DeleteCollegeDocument, options);
      }
export type DeleteCollegeMutationHookResult = ReturnType<typeof useDeleteCollegeMutation>;
export type DeleteCollegeMutationResult = Apollo.MutationResult<DeleteCollegeMutation>;
export type DeleteCollegeMutationOptions = Apollo.BaseMutationOptions<DeleteCollegeMutation, DeleteCollegeMutationVariables>;
export const UpdateCollegeDocument = gql`
    mutation UpdateCollege($id: String!, $data: CreateCollegeInput!) {
  updateCollege(id: $id, data: $data) {
    ...CollegeFields
  }
}
    ${CollegeFieldsFragmentDoc}`;
export type UpdateCollegeMutationFn = Apollo.MutationFunction<UpdateCollegeMutation, UpdateCollegeMutationVariables>;

/**
 * __useUpdateCollegeMutation__
 *
 * To run a mutation, you first call `useUpdateCollegeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCollegeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCollegeMutation, { data, loading, error }] = useUpdateCollegeMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateCollegeMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCollegeMutation, UpdateCollegeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCollegeMutation, UpdateCollegeMutationVariables>(UpdateCollegeDocument, options);
      }
export type UpdateCollegeMutationHookResult = ReturnType<typeof useUpdateCollegeMutation>;
export type UpdateCollegeMutationResult = Apollo.MutationResult<UpdateCollegeMutation>;
export type UpdateCollegeMutationOptions = Apollo.BaseMutationOptions<UpdateCollegeMutation, UpdateCollegeMutationVariables>;
export const CollegesDocument = gql`
    query Colleges($universityId: String!) {
  colleges(universityId: $universityId) {
    ...CollegeFields
  }
}
    ${CollegeFieldsFragmentDoc}`;

/**
 * __useCollegesQuery__
 *
 * To run a query within a React component, call `useCollegesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCollegesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCollegesQuery({
 *   variables: {
 *      universityId: // value for 'universityId'
 *   },
 * });
 */
export function useCollegesQuery(baseOptions: Apollo.QueryHookOptions<CollegesQuery, CollegesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CollegesQuery, CollegesQueryVariables>(CollegesDocument, options);
      }
export function useCollegesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CollegesQuery, CollegesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CollegesQuery, CollegesQueryVariables>(CollegesDocument, options);
        }
export type CollegesQueryHookResult = ReturnType<typeof useCollegesQuery>;
export type CollegesLazyQueryHookResult = ReturnType<typeof useCollegesLazyQuery>;
export type CollegesQueryResult = Apollo.QueryResult<CollegesQuery, CollegesQueryVariables>;
export const CreateCourseDocument = gql`
    mutation CreateCourse($data: CreateCourseInput!) {
  createCourse(data: $data) {
    ...CourseFields
  }
}
    ${CourseFieldsFragmentDoc}`;
export type CreateCourseMutationFn = Apollo.MutationFunction<CreateCourseMutation, CreateCourseMutationVariables>;

/**
 * __useCreateCourseMutation__
 *
 * To run a mutation, you first call `useCreateCourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCourseMutation, { data, loading, error }] = useCreateCourseMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateCourseMutation(baseOptions?: Apollo.MutationHookOptions<CreateCourseMutation, CreateCourseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCourseMutation, CreateCourseMutationVariables>(CreateCourseDocument, options);
      }
export type CreateCourseMutationHookResult = ReturnType<typeof useCreateCourseMutation>;
export type CreateCourseMutationResult = Apollo.MutationResult<CreateCourseMutation>;
export type CreateCourseMutationOptions = Apollo.BaseMutationOptions<CreateCourseMutation, CreateCourseMutationVariables>;
export const DeleteCourseDocument = gql`
    mutation DeleteCourse($id: String!) {
  deleteCourse(id: $id) {
    ...CourseFields
  }
}
    ${CourseFieldsFragmentDoc}`;
export type DeleteCourseMutationFn = Apollo.MutationFunction<DeleteCourseMutation, DeleteCourseMutationVariables>;

/**
 * __useDeleteCourseMutation__
 *
 * To run a mutation, you first call `useDeleteCourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCourseMutation, { data, loading, error }] = useDeleteCourseMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCourseMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCourseMutation, DeleteCourseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCourseMutation, DeleteCourseMutationVariables>(DeleteCourseDocument, options);
      }
export type DeleteCourseMutationHookResult = ReturnType<typeof useDeleteCourseMutation>;
export type DeleteCourseMutationResult = Apollo.MutationResult<DeleteCourseMutation>;
export type DeleteCourseMutationOptions = Apollo.BaseMutationOptions<DeleteCourseMutation, DeleteCourseMutationVariables>;
export const UpdateCourseDocument = gql`
    mutation UpdateCourse($id: String!, $data: CreateCourseInput!) {
  updateCourse(id: $id, data: $data) {
    ...CourseFields
  }
}
    ${CourseFieldsFragmentDoc}`;
export type UpdateCourseMutationFn = Apollo.MutationFunction<UpdateCourseMutation, UpdateCourseMutationVariables>;

/**
 * __useUpdateCourseMutation__
 *
 * To run a mutation, you first call `useUpdateCourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCourseMutation, { data, loading, error }] = useUpdateCourseMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateCourseMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCourseMutation, UpdateCourseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCourseMutation, UpdateCourseMutationVariables>(UpdateCourseDocument, options);
      }
export type UpdateCourseMutationHookResult = ReturnType<typeof useUpdateCourseMutation>;
export type UpdateCourseMutationResult = Apollo.MutationResult<UpdateCourseMutation>;
export type UpdateCourseMutationOptions = Apollo.BaseMutationOptions<UpdateCourseMutation, UpdateCourseMutationVariables>;
export const CreateUniversityDocument = gql`
    mutation CreateUniversity($data: CreateUniversityInput!, $logo: Upload) {
  createUniversity(data: $data, logo: $logo) {
    ...UniversityFields
  }
}
    ${UniversityFieldsFragmentDoc}`;
export type CreateUniversityMutationFn = Apollo.MutationFunction<CreateUniversityMutation, CreateUniversityMutationVariables>;

/**
 * __useCreateUniversityMutation__
 *
 * To run a mutation, you first call `useCreateUniversityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUniversityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUniversityMutation, { data, loading, error }] = useCreateUniversityMutation({
 *   variables: {
 *      data: // value for 'data'
 *      logo: // value for 'logo'
 *   },
 * });
 */
export function useCreateUniversityMutation(baseOptions?: Apollo.MutationHookOptions<CreateUniversityMutation, CreateUniversityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUniversityMutation, CreateUniversityMutationVariables>(CreateUniversityDocument, options);
      }
export type CreateUniversityMutationHookResult = ReturnType<typeof useCreateUniversityMutation>;
export type CreateUniversityMutationResult = Apollo.MutationResult<CreateUniversityMutation>;
export type CreateUniversityMutationOptions = Apollo.BaseMutationOptions<CreateUniversityMutation, CreateUniversityMutationVariables>;
export const UpdateUniversityDocument = gql`
    mutation UpdateUniversity($id: String!, $data: CreateUniversityInput!, $logo: Upload) {
  updateUniversity(id: $id, data: $data, logo: $logo) {
    ...UniversityFields
  }
}
    ${UniversityFieldsFragmentDoc}`;
export type UpdateUniversityMutationFn = Apollo.MutationFunction<UpdateUniversityMutation, UpdateUniversityMutationVariables>;

/**
 * __useUpdateUniversityMutation__
 *
 * To run a mutation, you first call `useUpdateUniversityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUniversityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUniversityMutation, { data, loading, error }] = useUpdateUniversityMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *      logo: // value for 'logo'
 *   },
 * });
 */
export function useUpdateUniversityMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUniversityMutation, UpdateUniversityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUniversityMutation, UpdateUniversityMutationVariables>(UpdateUniversityDocument, options);
      }
export type UpdateUniversityMutationHookResult = ReturnType<typeof useUpdateUniversityMutation>;
export type UpdateUniversityMutationResult = Apollo.MutationResult<UpdateUniversityMutation>;
export type UpdateUniversityMutationOptions = Apollo.BaseMutationOptions<UpdateUniversityMutation, UpdateUniversityMutationVariables>;
export const DeleteUniversityDocument = gql`
    mutation DeleteUniversity($id: String!) {
  deleteUniversity(id: $id) {
    ...UniversityFields
  }
}
    ${UniversityFieldsFragmentDoc}`;
export type DeleteUniversityMutationFn = Apollo.MutationFunction<DeleteUniversityMutation, DeleteUniversityMutationVariables>;

/**
 * __useDeleteUniversityMutation__
 *
 * To run a mutation, you first call `useDeleteUniversityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUniversityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUniversityMutation, { data, loading, error }] = useDeleteUniversityMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteUniversityMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUniversityMutation, DeleteUniversityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUniversityMutation, DeleteUniversityMutationVariables>(DeleteUniversityDocument, options);
      }
export type DeleteUniversityMutationHookResult = ReturnType<typeof useDeleteUniversityMutation>;
export type DeleteUniversityMutationResult = Apollo.MutationResult<DeleteUniversityMutation>;
export type DeleteUniversityMutationOptions = Apollo.BaseMutationOptions<DeleteUniversityMutation, DeleteUniversityMutationVariables>;
export const LeaveUniversityDocument = gql`
    mutation LeaveUniversity($id: String!) {
  leaveUniversity(id: $id) {
    ...UniversityFields
  }
}
    ${UniversityFieldsFragmentDoc}`;
export type LeaveUniversityMutationFn = Apollo.MutationFunction<LeaveUniversityMutation, LeaveUniversityMutationVariables>;

/**
 * __useLeaveUniversityMutation__
 *
 * To run a mutation, you first call `useLeaveUniversityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLeaveUniversityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [leaveUniversityMutation, { data, loading, error }] = useLeaveUniversityMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useLeaveUniversityMutation(baseOptions?: Apollo.MutationHookOptions<LeaveUniversityMutation, LeaveUniversityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LeaveUniversityMutation, LeaveUniversityMutationVariables>(LeaveUniversityDocument, options);
      }
export type LeaveUniversityMutationHookResult = ReturnType<typeof useLeaveUniversityMutation>;
export type LeaveUniversityMutationResult = Apollo.MutationResult<LeaveUniversityMutation>;
export type LeaveUniversityMutationOptions = Apollo.BaseMutationOptions<LeaveUniversityMutation, LeaveUniversityMutationVariables>;
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
        ...UniversityFields
      }
    }
  }
}
    ${UniversityFieldsFragmentDoc}`;

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