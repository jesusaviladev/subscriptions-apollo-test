import { useApolloClient, useSubscription } from '@apollo/client'
import { useEffect, useState } from 'react'
import Alert from './components/Alert.jsx'
import { GET_CURRENT_USERS } from './gql/subscriptions'

function App() {
    const [numberOfCalls, setNumberOfCalls] = useState(0)
    const [showAlert, setShowAlert] = useState(false)

    const handleClick = () => setShowAlert(false)

    useSubscription(GET_CURRENT_USERS, {
        onData: (data) => {
            console.log(data.data.data.getUsers)
            setNumberOfCalls((prev) => prev + 1)
        },
        onError: (error) => {
            // console.log(error)
            setNumberOfCalls(0)
            setShowAlert(true)
        },
    })

    return (
        <div className="App">
            <h1>Test subscripciones GraphQL</h1>
            <p>Número de veces que se llama la subscripción: {numberOfCalls}</p>
            {showAlert && <Alert onClick={handleClick} />}
        </div>
    )
}

export default App
