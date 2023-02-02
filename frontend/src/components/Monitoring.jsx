import { useSubscription } from '@apollo/client'
import { useState } from 'react'
import { GET_CURRENT_USERS } from '../gql/subscriptions'

const Monitoring = ({ setOffline }) => {
    const [numberOfCalls, setNumberOfCalls] = useState(0)

    useSubscription(GET_CURRENT_USERS, {
        onData: (data) => {
            console.log(data.data.data.getUsers)
            setNumberOfCalls((prev) => prev + 1)
        },
        onError: (error) => {
            // console.log(error)
            setNumberOfCalls(0)
            setOffline()
        },
    })

    return (
        <div>
            <h2>Monitoreo</h2>
            <p>Número de veces que se llama la subscripción: {numberOfCalls}</p>
        </div>
    )
}

export default Monitoring
