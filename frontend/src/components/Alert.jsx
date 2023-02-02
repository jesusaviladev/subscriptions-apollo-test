const Alert = ({ onClick: handleClick }) => {
    return (
        <div
            style={{
                backgroundColor: 'gray',
                color: '#eee',
                padding: '10px',
            }}
        >
            <h2>Hubo un error en la conexion</h2>
            <button
                style={{
                    border: '1px solid #111',
                }}
                onClick={handleClick}
            >
                Aceptar
            </button>
        </div>
    )
}

export default Alert
