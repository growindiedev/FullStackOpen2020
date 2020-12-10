import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'


test('<BlogForm /> updates parent state and calls onSubmit', () => {
    const createBlog = jest.fn()
    const setError = jest.fn()
    const setErrorMessage = jest.fn()

    const component = render(
        <BlogForm createBlog={createBlog} render={{setError, setErrorMessage}}/>
    )

    const inputTitle = component.getByLabelText('title')
    const inputAuthor = component.getByLabelText('author')
    const inputURL = component.getByLabelText('url')
    const form = component.container.querySelector('form')

    fireEvent.change(inputTitle, {
        target: {value: '-title'}
    })
    fireEvent.change(inputAuthor, {
        target: {value: '-author'}
    })
    fireEvent.change(inputURL, {
        target: {value: '-url'}
    })
    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('-title')
    expect(createBlog.mock.calls[0][0].author).toBe('-author')
    expect(createBlog.mock.calls[0][0].url).toBe('-url')


})