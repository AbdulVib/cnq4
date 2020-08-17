import React, { useState, useContext, useEffect } from 'react'

import { Link, NavLink, useHistory } from 'react-router-dom'

import AppContext from '../../store/context/context'

export default function Navbar() {
    // const [load, setLoad] = useState(false)
    const { state, clearAll } = useContext(AppContext) 

    const history = useHistory()

    const handleLogOut = _ => {
        clearAll()
        history.push('/signin')
    }

    const renderList = () => {
        if(state.user){
            return [
                <li key="home"><Link to='/'><i className="material-icons">home</i></Link></li>,
                <li key="profile"><Link to="/profile"><i className="material-icons">account_circle</i></Link></li>,
                <li key="create-post"><Link to="/create-post"><i className="material-icons">add_circle_outline</i></Link></li>,

                <li key="logout">
                    <button onClick={ handleLogOut } className="btn waves-effect waves-light red loaderBtn">Log Out</button>
                </li>
            ]
        }
    
        else{
            return [
                <li key="signin"><Link to="/signin">Signin</Link></li>,
                <li key="signup"><Link to="/signup">SignUp</Link></li>
            ]
        }
    }
    return (
        <div>
            <nav style={{ background: 'white'}}>
                <div style={{ padding: '0 10px', width: '70%', margin: '0 auto' }} className="nav-wrapper white">
                    <Link style={{fontFamily: `Grand Hotel, cursive`, color: 'black'}} to={ state.user ? '/' : '/signin' } className="brand-logo left">Instagram</Link>
                    <ul id="nav-mobile" className="right">
                        { renderList() }
                    </ul>
                </div>
            </nav>
        </div>
    )
}
