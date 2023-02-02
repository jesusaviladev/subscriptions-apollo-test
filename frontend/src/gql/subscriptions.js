import { gql } from '@apollo/client'

export const GET_CURRENT_USERS = gql`
    subscription GetLiveUsers {
        getUsers {
            id
            name
            email
        }
    }
`
