import { useApolloClient, useSubscription } from '@apollo/client'
import { useEffect, useState } from 'react'
import Alert from './components/Alert.jsx'
import { GET_CURRENT_USERS } from './gql/subscriptions'

function App() {
    const [numberOfCalls, setNumberOfCalls] = useState(0)
    const [showAlert, setShowAlert] = useState(false)
    const [online, setOnline] = useState(null)
    const client = useApolloClient()

    const handleClick = () => setShowAlert(false)

    // useEffect(() => {
    //     if (!online) {
    //         // let resetObserver
    //         const resetInterval = setInterval(() => {
    //             client
    //                 .subscribe({
    //                     query: GET_CURRENT_USERS,
    //                 })
    //                 .subscribe(
    //                     (x) => console.log(x),
    //                     (err) => console.log(`Finished with error: ${err}`),
    //                     () => console.log('Finished')
    //                 )
    //         }, 3000)

    //         return () => {
    //             console.log('second cleaner')
    //             clearInterval(resetInterval)
    //             // resetObserver.unsubscribe()
    //         }
    //     }
    //     console.log('solo una vez')
    //     const resetObserver = client
    //         .subscribe({
    //             query: GET_CURRENT_USERS,
    //         })
    //         .subscribe({
    //             next(data) {
    //                 console.log(data)
    //             },
    //             error(err) {
    //                 console.error('err', err)
    //                 setOnline(false)
    //             },
    //         })

    //     return () => {
    //         console.log('first cleaner')
    //         resetObserver.unsubscribe()
    //     }
    // }, [online])

    // useEffect(() => {
    //     const resetInterval = setInterval(() => {
    //         client
    //             .subscribe({
    //                 query: GET_CURRENT_USERS,
    //             })
    //             .subscribe(
    //                 (x) => {
    //                     console.log(x)
    //                     clearInterval(resetInterval)
    //                     setOnline(true)
    //                 },
    //                 (err) => {
    //                     console.log(`Finished with error: ${err}`)
    //                     setOnline(false)
    //                 },
    //                 () => console.log('Finished')
    //             )
    //     }, 3000)

    //     return () => clearInterval(resetInterval)
    // }, [online])

    useSubscription(GET_CURRENT_USERS, {
        onData: (data) => {
            console.log(data.data.data.getUsers)
            setOnline(true)
            setNumberOfCalls((prev) => prev + 1)
        },
        onError: (error) => {
            // console.log(error)
            setNumberOfCalls(0)
            setShowAlert(true)
            setOnline(false)
        },
        shouldResubscribe: true,
        variables: {
            online,
        },
    })

    useEffect(() => {
        if (online || online === null) return

        const resetInterval = setTimeout(() => {
            console.log('hay bugs')
            setOnline(true)
        }, 5000)

        return () => clearTimeout(resetInterval)
    }, [online])

    return (
        <div className="App">
            <h1>Test subscripciones GraphQL</h1>
            <p>Número de veces que se llama la subscripción: {numberOfCalls}</p>
            {showAlert && <Alert onClick={handleClick} />}
        </div>
    )
}

export default App
