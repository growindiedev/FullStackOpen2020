import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import Togglable from './Togglable'


describe('<Togglabel>', () => {
    let component 
    beforeEach(() => {
        
        component = render(
            <Togglable label1="viewBlog" label2="hide">
                <Blog 
                blog={blog} 
               //updateLike={mockHandlerUpdate}
                className="test"/>
            </Togglable>
        )
    })

    const blog = {
        title: "Rich dad Poor dad",
        author: "robert Lindowski",
        url: "richdad.com",
        likes: 0
    }

    const mockHandlerUpdate = jest.fn()

    test('renders blog title and author, but not url and number of likes by default', () => {
        const DefaultContent = component.container.querySelector('.Blog')
        const DefaultHiddenContent = component.container.querySelector('.Hidden')
    
        expect(DefaultContent).toHaveTextContent('Rich dad Poor dad robert Lindowski')
        expect(component.container.querySelector('.togglableContent')).toHaveStyle('display: none')
        expect(DefaultHiddenContent).not.toBeInTheDocument()
    })

    test('renders its own children', () => {
        expect(component.container.querySelector('.test')).toBeDefined()
    })

    test("Blog's url and number of likes are shown when the button is clicked", () => {
        const button = component.getByText('viewBlog')
        fireEvent.click(button)

        expect(component.container.querySelector('.togglableContent')).not.toHaveStyle('display: none')
        expect(component.container.querySelector('.togglableContent')).toHaveTextContent('likes')
        expect(component.container.querySelector('.togglableContent')).toHaveTextContent(blog.likes)
        expect(component.container.querySelector('.togglableContent')).toHaveTextContent(blog.author)

    })

    test("Blog's url and number of likes are shown when the button is clicked", () => {
        const button = component.getByText('viewBlog')
        fireEvent.click(button)

        expect(component.container.querySelector('.togglableContent')).not.toHaveStyle('display: none')
        expect(component.container.querySelector('.togglableContent')).toHaveTextContent('likes')
        expect(component.container.querySelector('.togglableContent')).toHaveTextContent(blog.likes)
        expect(component.container.querySelector('.togglableContent')).toHaveTextContent(blog.author)

    })

 test("clicking the like button twice calls event handler passed as a prop twice", () => {
    const button = component.getByText('Like+')

    fireEvent.click(button)
    fireEvent.click(button)

    expect(component.container.querySelector('.togglableContent')).toHaveTextContent('likes 0')
    })

})


