import React from 'react'
interface courseParts { courseParts: { name: string; exerciseCount: number; }[]; }

const Total: React.FC<courseParts> = ({courseParts}) => {
    return (
        <div>
            <p>
             Number of exercises{" "}
            {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
            </p>
        </div>
    )
}

export default Total

