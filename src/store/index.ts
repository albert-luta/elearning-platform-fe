import { ApolloClient } from '@apollo/client';
import { cache } from './cache';
import { link } from './link';

export const client = new ApolloClient({
	uri: process.env.NEXT_PUBLIC_BACKEND_URL,
	cache,
	link
});
