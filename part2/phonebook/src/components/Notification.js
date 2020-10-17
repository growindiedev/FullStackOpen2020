import React from 'react'

function Notification({message, error}) {
    if (message === null) {
        return null
    }
    return (
        <div className={ error ? "error": "alert"}>
            {message}
        </div>
    )
}

export default Notification
