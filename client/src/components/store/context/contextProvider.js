import React, { useReducer } from 'react';
import Context from './context'
import { useHistory } from 'react-router-dom'

import axios from 'axios'

//reducer
import reducer, { initialState } from '../reducers/reducer'


export default function contextProvider(props) {
    
    const history = useHistory()

    const [ state, dispatch ] = useReducer(reducer, initialState)

    const userData = data => {
        dispatch( { type: 'USER', payload: data } )
    }

    // const allPost = _ => {
    //     axios.get('http://localhost:5000/allpost', {
    //         headers: {
    //             'Authorization': localStorage.getItem('jwt')
    //         }
    //     })
    //     .then(res => dispatch({ type: 'ALL_POST', payload: res.data.data }))
    //         // .then(res => console.log(res, ' alllll'))
    // }

    const clearAll = _ => {
        localStorage.clear()
        dispatch({ type: 'CLEAR_ALL' })
    }

    // console.log(prop, ' propsss')
    return (
        <Context.Provider value={{ state, dispatch, userData, clearAll }}>
            { props.children }
        </Context.Provider>
    )
}

