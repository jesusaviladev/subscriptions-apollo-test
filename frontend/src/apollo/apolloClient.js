import { ApolloClient, InMemoryCache } from '@apollo/client'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'
import { split, HttpLink } from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'

const httpLink = new HttpLink({
    uri: 'http://localhost:4000/graphql',
})

const wsLink = new GraphQLWsLink(
    createClient({
        url: 'ws://localhost:4000/graphql',
        retryWait: () =>
            new Promise((resolve) => {
                setTimeout(() => resolve(), 2000)
            }),
    })
)

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query)
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        )
    },
    wsLink,
    httpLink
)

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    link: splitLink,
    cache: new InMemoryCache(),
})

export default client
