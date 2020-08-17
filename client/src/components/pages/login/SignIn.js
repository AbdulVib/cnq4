import React, { useState, useContext } from 'react'

import { Link, useHistory } from 'react-router-dom'

import axios from 'axios'

//
// import M from 'materialize-css'

import AppContext from '../../store/context/context'

export default function Login() {
    
    const { state, userData } = useContext(AppContext)

    // console.log(state, ' sttaaaa')

    const history = useHistory()

    const [ data, setData ] = useState({
        email: '',
        password: ''
    })
    
    const handleChange = e => {
        setData({
            ...data,
            [ e.target.name ]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        // console.log(data, ' data')
        setData({
            email: '',
            password: ''
        })

        const { email, password } = data
        const obj = { email, password }

        // console.log(obj, ' objjjj')

        axios.post('http://localhost:5000/signin', obj)
        .then(res => {
            // console.log(res, ' ress')
            userData(res.data.user)
            localStorage.setItem('jwt', res.data.token)
            localStorage.setItem('user', JSON.stringify(res.data.user))
            M.toast({html: res.data.message, classes: '#43a047 green darken-1' });
            history.push('/')
        })
        //  .catch(err => console.log(err.response, ' err'))   
         .catch(err => err && M.toast({html: err.response.data.message, classes: '#c62828 red darken' }))   
    }
    // console.log(localStorage.getItem('user'))
    return (
        <div>

            <div className="card mx-auto" style={{ width: '60%', margin: '20px auto', padding: '20px' }}>
                <h2 style={{ fontFamily: `Grand Hotel, cursive` }} className="center">PIC's Valley</h2>

                {/* form */}
                <div className="row mx-auto col-sm-12">
                    <form className="col-sm-12 col-md-12" onSubmit={ handleSubmit }>

                        <div className="input-field col-sm-12">
                            <input id="email" type="email" className="validate" name="email" value={ data.email} onChange={ handleChange } />
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className="input-field col-sm-12">
                            <input id="password" type="password" className="validate"  name="password" value={ data.password } onChange={ handleChange } />
                            <label htmlFor="password">Password</label>
                        </div>

                        <button className="btn waves-effect waves-light" type="submit" name="action">SIGNIN
                                <i className="material-icons right">send</i>
                        </button>

                    </form>
                </div>

                <Link to="/signup" className="center" style={{ display: 'block'}}>New user ? Please signUp</Link>

            </div>

        </div>
    )
}
// 