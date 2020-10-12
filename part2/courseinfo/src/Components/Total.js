import React from 'react'

const Total = ({ course }) => {
    const sum = course.parts.map(item => item.exercises).reduce((acc, current) => acc + current, 0)
    return(
      <p>Number of exercises {sum}</p>
    ) 
  }

export default Total
