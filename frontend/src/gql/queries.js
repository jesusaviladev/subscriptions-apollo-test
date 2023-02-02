import { gql } from '@apollo/client'

export const GET_USERS = gql`
    #graphql
    query GetUsers {
        users {
            id
            name
            email
        }
    }
`
