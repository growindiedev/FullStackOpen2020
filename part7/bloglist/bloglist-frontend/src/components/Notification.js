import React from 'react'
import { useSelector} from 'react-redux'


function Notification() {

    const error = useSelector(state => state.errorReducer)
    const errorMessage = useSelector(state => state.errorMessageReducer)

    if (errorMessage === null) {
        return null
    }
    return (
        <div className={ error ? "error": "alert"}>
            {errorMessage}
        </div>
    )
}

export default Notification