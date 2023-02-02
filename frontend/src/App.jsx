import { useState } from 'react'
import Alert from './components/Alert.jsx'
import Monitoring from './components/Monitoring.jsx'

function App() {
    const [isOnline, setIsOnline] = useState(true)

    const setOnline = () => setIsOnline(true)

    const setOffline = () => setIsOnline(false)

    return (
        <div className="App">
            <h1>Test subscripciones GraphQL</h1>
            {isOnline ? (
                <Monitoring setOffline={setOffline} />
            ) : (
                <Alert onClick={setOnline} />
            )}
        </div>
    )
}

export default App
