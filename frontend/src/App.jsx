import { useSubscription } from '@apollo/client'
import { useState } from 'react'
import { GET_CURRENT_USERS } from './gql/subscriptions'

function App() {
    const [numberOfCalls, setNumberOfCalls] = useState(0)

    useSubscription(GET_CURRENT_USERS, {
        onData: (data) => {
            console.log(data)
            setNumberOfCalls((prev) => prev + 1)
        },
        onError: (error) => {
            console.log(error)
            setNumberOfCalls(0)
        },
    })

    return (
        <div className="App">
            <h1>Test subscripciones GraphQL</h1>
            <p>Número de veces que se llama la subscripción: {numberOfCalls}</p>
        </div>
    )
}

export default App
