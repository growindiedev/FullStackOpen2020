import React, { useState } from 'react'
import Select from 'react-select'
import {useMutation, gql} from '@apollo/client'
import {UPDATE_AUTHOR, ALL_AUTHORS} from '../queries'



const UpdateAuthor = ({authors}) => {


    const options = authors.map(author => ({value: author.name, label: author.name}))
    let [born, setBorn] = useState('')
    const [updateAuthor] = useMutation(UPDATE_AUTHOR, {refetchQueries: [{query: ALL_AUTHORS}]})
    const [selectedOption, setSelectedOption] = useState(null);


    const submit = async (event) => {
        event.preventDefault()
        born = Number(born);
        updateAuthor({variables: {name: selectedOption.value, born}})
        setBorn('')
      }



    return (
        <div>
            <h2>Set birthyear</h2>
            <form onSubmit={submit}>
               <Select
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
               />

                <div>
                    born
                    <input value={born}
                    onChange={({ target }) => setBorn(target.value)}
                    />
                </div>
                <button type='submit'>update author</button>
            </form>
        </div>
    )
}

export default UpdateAuthor
