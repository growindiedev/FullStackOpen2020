import React from 'react'
import { CoursePart } from "../types";
import Part from './Part'
import {assertNever} from '../utils'

interface ContentProps {
    courseParts : CoursePart[]
}



const Content: React.FC<ContentProps> = ({courseParts}) => {
    
    const parts  = courseParts.map(coursePart => {
        switch (coursePart.name) {
            case "Fundamentals": 
                return <Part key={coursePart.name} coursePart={coursePart} />;
            case "Using props to pass data":
                return <Part key={coursePart.name} coursePart={coursePart} />;
            case "Deeper type usage":
                return <Part key={coursePart.name} coursePart={coursePart} />;
            case "Special newly created course":
                return <Part key={coursePart.name} coursePart={coursePart} />;
            default: return assertNever(coursePart)
        }
    });

    return <div>{parts}</div>;

}

export default Content

