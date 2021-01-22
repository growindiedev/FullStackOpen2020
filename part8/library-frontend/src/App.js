
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notify from './components/Notify'
import LoginForm from './components/LoginForm'

import { gql, useQuery, useApolloClient } from '@apollo/client';
import {ALL_AUTHORS, ALL_BOOKS} from './queries'



const App = () => {
  const [page, setPage] = useState('authors')
  const allAuthorsQuery = useQuery(ALL_AUTHORS)
  const allBooksQuery = useQuery(ALL_BOOKS)
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  if (allAuthorsQuery.loading || allBooksQuery.loading)  {
    return <div>loading...</div>
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('login')}>login</button>
      </div>
      <Authors
        authors={allAuthorsQuery.data.allAuthors}
        setError={notify}
        show={page=== 'authors'}
      />

      <Books
        books={allBooksQuery.data.allBooks}
        show={page === 'books'}
      />

      <NewBook
      show={page === 'add'}
      setError={notify}
      />
      <LoginForm
          show={page === 'login'}
          setToken={setToken}
          setError={notify}
          setPage={setPage}
      />
      

    </div>
  )
}

export default App