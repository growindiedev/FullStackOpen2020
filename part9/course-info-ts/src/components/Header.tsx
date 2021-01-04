import React from 'react'

const Header: React.FC<{coursename: string}> = ({coursename}) => {
    return (
        <div>
            <h1>{coursename}</h1>
        </div>
    )
}

export default Header
