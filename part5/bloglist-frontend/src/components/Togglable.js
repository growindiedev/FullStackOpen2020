import React, {useState} from 'react'
import PropTypes from 'prop-types'

function Togglable(props) {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    return (
        <div>
            <div style={hideWhenVisible}>
            <button onClick={toggleVisibility}>{props.label1}</button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button onClick={toggleVisibility}>{props.label2}</button>
            </div>
        </div>
    )
}

Togglable.propTypes = {
    label1: PropTypes.string.isRequired,
    label2: PropTypes.string.isRequired

}

export default Togglable
