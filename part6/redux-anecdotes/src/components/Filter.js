import React from 'react'
import {search} from '../reducers/filterReducer'
import { connect } from 'react-redux'


const Filter = (props) => {
    //const dispatch = useDispatch()
    //const state = useSelector(state => state.filterReducer)
    const handleChange = (event) => {
    props.search(event.target.value)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}



const ConnectedFilter = connect(null, {search})(Filter)

export default ConnectedFilter